import { parseMnistCsv, type MnistSample } from "./data/mnist.js";
import { matFromColVec } from "./nn/matrix.js";
import { activationSlices, MLP } from "./nn/network.js";
import { trainLoop, type TrainSnapshot } from "./train/trainer.js";
import { applySnapshotToNetwork } from "./viz/bridge.js";
import { Network3D } from "./viz/network3d.js";
import { animateLoop, createScene } from "./viz/scene.js";

const LAYER_SIZES = [784, 64, 32, 10];
const HIDDEN = [64, 32];

const el = {
  trainFile: document.getElementById("trainFile") as HTMLInputElement,
  testFile: document.getElementById("testFile") as HTMLInputElement,
  btnTrain: document.getElementById("btnTrain") as HTMLButtonElement,
  btnPause: document.getElementById("btnPause") as HTMLButtonElement,
  btnInferRandom: document.getElementById("btnInferRandom") as HTMLButtonElement,
  btnInferDraw: document.getElementById("btnInferDraw") as HTMLButtonElement,
  btnClearDraw: document.getElementById("btnClearDraw") as HTMLButtonElement,
  status: document.getElementById("status") as HTMLSpanElement,
  viz: document.getElementById("viz") as HTMLElement,
  drawCanvas: document.getElementById("drawCanvas") as HTMLCanvasElement,
};

let trainData: MnistSample[] = [];
let testData: MnistSample[] = [];
let net: MLP | null = null;
let net3d: Network3D | null = null;
let latestSnap: TrainSnapshot | null = null;
let trainingRunning = false;
let pauseTraining = false;
let stopTraining = false;

const ctxDraw = el.drawCanvas.getContext("2d");
if (!ctxDraw) throw new Error("canvas");
const ctx2d = ctxDraw;
ctx2d.fillStyle = "#000000";
ctx2d.fillRect(0, 0, el.drawCanvas.width, el.drawCanvas.height);
ctx2d.lineWidth = 14;
ctx2d.lineCap = "round";
ctx2d.lineJoin = "round";
ctx2d.strokeStyle = "#ffffff";

let drawing = false;
function canvasPos(ev: PointerEvent): { x: number; y: number } {
  const r = el.drawCanvas.getBoundingClientRect();
  const sx = el.drawCanvas.width / r.width;
  const sy = el.drawCanvas.height / r.height;
  return { x: (ev.clientX - r.left) * sx, y: (ev.clientY - r.top) * sy };
}
el.drawCanvas.addEventListener("pointerdown", (e) => {
  drawing = true;
  el.drawCanvas.setPointerCapture(e.pointerId);
  const p = canvasPos(e);
  ctx2d.beginPath();
  ctx2d.moveTo(p.x, p.y);
});
el.drawCanvas.addEventListener("pointermove", (e) => {
  if (!drawing) return;
  const p = canvasPos(e);
  ctx2d.lineTo(p.x, p.y);
  ctx2d.stroke();
});
el.drawCanvas.addEventListener("pointerup", () => {
  drawing = false;
});
el.drawCanvas.addEventListener("pointerleave", () => {
  drawing = false;
});
el.btnClearDraw.addEventListener("click", () => {
  ctx2d.fillStyle = "#000000";
  ctx2d.fillRect(0, 0, el.drawCanvas.width, el.drawCanvas.height);
});

function readFileText(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result ?? ""));
    r.onerror = () => reject(r.error);
    r.readAsText(f);
  });
}

function setStatus(t: string): void {
  el.status.textContent = t;
}

function updateButtons(): void {
  const hasTrain = trainData.length > 0;
  const hasTest = testData.length > 0;
  el.btnTrain.disabled = !hasTrain || trainingRunning;
  el.btnPause.disabled = !trainingRunning;
  el.btnInferRandom.disabled = !net || !hasTest;
  el.btnInferDraw.disabled = !net;
}

async function onTrainFile(ev: Event): Promise<void> {
  const t = (ev.target as HTMLInputElement).files?.[0];
  if (!t) return;
  try {
    setStatus("Train-CSV wird gelesen …");
    const text = await readFileText(t);
    trainData = parseMnistCsv(text);
    setStatus(`Train: ${trainData.length} Zeilen`);
  } catch (e) {
    setStatus(`Fehler Train-CSV: ${e}`);
    trainData = [];
  }
  updateButtons();
}

async function onTestFile(ev: Event): Promise<void> {
  const t = (ev.target as HTMLInputElement).files?.[0];
  if (!t) return;
  try {
    setStatus("Test-CSV wird gelesen …");
    const text = await readFileText(t);
    testData = parseMnistCsv(text);
    setStatus(`Test: ${testData.length} Zeilen`);
  } catch (e) {
    setStatus(`Fehler Test-CSV: ${e}`);
    testData = [];
  }
  updateButtons();
}

el.trainFile.addEventListener("change", (e) => void onTrainFile(e));
el.testFile.addEventListener("change", (e) => void onTestFile(e));

const { scene, camera, renderer, controls, dispose: disposeScene } = createScene(el.viz);
const net3dInst = new Network3D(LAYER_SIZES);
net3d = net3dInst;
scene.add(net3dInst.root);

let lastFrameSnap: TrainSnapshot | null = null;
function tickViz(): void {
  const s = latestSnap;
  if (s && s !== lastFrameSnap && net3d) {
    lastFrameSnap = s;
    applySnapshotToNetwork(net3d, s);
  }
}

const stopAnim = animateLoop(renderer, scene, camera, controls, tickViz);

function canvasToMnistPixels(): number[] {
  const w = el.drawCanvas.width;
  const h = el.drawCanvas.height;
  const img = ctx2d.getImageData(0, 0, w, h);
  const d = img.data;
  const cell = w / 28;
  const out = new Array<number>(784);
  let k = 0;
  for (let gy = 0; gy < 28; gy++) {
    for (let gx = 0; gx < 28; gx++) {
      let sum = 0;
      const x0 = Math.floor(gx * cell);
      const y0 = Math.floor(gy * cell);
      const x1 = Math.floor((gx + 1) * cell);
      const y1 = Math.floor((gy + 1) * cell);
      let cnt = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * w + x) * 4;
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          sum += (r + g + b) / 3;
          cnt++;
        }
      }
      out[k++] = sum / Math.max(1, cnt) / 255;
    }
  }
  return out;
}

function inferWithPixels(pixels: number[], label?: number): void {
  if (!net || !net3d) return;
  const x = matFromColVec(pixels);
  const fwd = net.forward(x);
  const pred = net.predictClass(fwd.prob);
  const acts = activationSlices(x, fwd);
  net3d.setActivations(acts);
  const probStr = fwd.prob
    .map((row) => row[0].toFixed(2))
    .join(" ");
  if (label !== undefined) {
    setStatus(`Infer: wahr=${label} pred=${pred}  logits_softmax≈ ${probStr}`);
  } else {
    setStatus(`Infer (Canvas): pred=${pred}  ${probStr}`);
  }
}

el.btnInferRandom.addEventListener("click", () => {
  if (!net || testData.length === 0) return;
  const s = testData[Math.floor(Math.random() * testData.length)];
  inferWithPixels(s.pixels, s.label);
});

el.btnInferDraw.addEventListener("click", () => {
  if (!net) return;
  const pixels = canvasToMnistPixels();
  inferWithPixels(pixels);
});

el.btnPause.addEventListener("click", () => {
  pauseTraining = !pauseTraining;
  el.btnPause.textContent = pauseTraining ? "Weiter" : "Pause";
});

el.btnTrain.addEventListener("click", () => {
  void (async () => {
    if (trainData.length === 0) return;
    trainingRunning = true;
    stopTraining = false;
    pauseTraining = false;
    el.btnPause.textContent = "Pause";
    lastFrameSnap = null;
    updateButtons();
    net = new MLP(784, HIDDEN, 10);
    await trainLoop(
      net,
      trainData,
      {
        lr: 0.05,
        batchSize: 16,
        epochs: 1,
        vizEveryNBatches: 2,
      },
      (s) => {
        latestSnap = s;
        setStatus(
          `Epoche ${s.epoch + 1} Batch ${s.batchIndex} loss=${s.loss.toFixed(4)} acc=${(s.trainAccBatch * 100).toFixed(1)}%`,
        );
      },
      () => pauseTraining,
      () => stopTraining,
    );
    trainingRunning = false;
    updateButtons();
    setStatus("Training beendet");
  })();
});

window.addEventListener("beforeunload", () => {
  stopTraining = true;
  stopAnim();
  net3dInst.dispose();
  disposeScene();
});

setStatus("MNIST-Trainings- und Test-CSV wählen");
updateButtons();
