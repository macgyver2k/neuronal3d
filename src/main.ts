import { parseMnistCsv, type MnistSample } from "./data/mnist.js";
import { matFromColVec } from "./nn/matrix.js";
import { activationSlices, MLP } from "./nn/network.js";
import { trainLoop } from "./train/trainer.js";
import { Network3D } from "./viz/network3d.js";
import { animateLoop, createScene } from "./viz/scene.js";
import trainCsvUrl from "./data/csv/mnist_train.csv?url";
import testCsvUrl from "./data/csv/mnist_test.csv?url";

const LAYER_SIZES = [784, 64, 32, 10];
const HIDDEN = [64, 32];
const MODEL_STORAGE_KEY = "neuronal3d:model:v1";
const VIZ_DEBUG_INFER =
  typeof globalThis.location !== "undefined" &&
  new URLSearchParams(globalThis.location.search).has("vizdebug");

const el = {
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
let trainingRunning = false;
let pauseTraining = false;
let stopTraining = false;
let inferCounter = 0;
let lastInferSampleIndex = -1;
let lastInferActsDebug: number[][] | null = null;

type StoredModel = {
  version: 1;
  inputDim: number;
  hidden: number[];
  outputDim: number;
  weights: number[][][];
  biases: number[][][];
};

type VizMode = "idle" | "train" | "infer";

type VizState = {
  stamp: number;
  mode: VizMode;
  activations: number[][];
};

let saveModelTimer: ReturnType<typeof setTimeout> | null = null;

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

function setStatus(t: string): void {
  el.status.textContent = t;
}

function fmtInt(n: number, width: number): string {
  return String(n).padStart(width, " ");
}

function fmtFloat(n: number, width: number, digits: number): string {
  return n.toFixed(digits).padStart(width, " ");
}

function inferLayerMaxDiffs(prev: number[][], cur: number[][]): string {
  if (prev.length !== cur.length) return "";
  const parts: string[] = [];
  for (let L = 0; L < cur.length; L++) {
    const a = cur[L];
    const b = prev[L];
    if (!a || !b || a.length !== b.length) continue;
    let mx = 0;
    for (let i = 0; i < a.length; i++) mx = Math.max(mx, Math.abs(a[i] - b[i]));
    parts.push(`${L}:${mx.toExponential(2)}`);
  }
  return parts.length ? `  Δmax ${parts.join(" ")}` : "";
}

function updateButtons(): void {
  const hasTrain = trainData.length > 0;
  const hasTest = testData.length > 0;
  el.btnTrain.disabled = !hasTrain || trainingRunning;
  el.btnPause.disabled = !trainingRunning;
  el.btnInferRandom.disabled = !net || !hasTest;
  el.btnInferDraw.disabled = !net;
}

function scheduleSaveModelToStorage(model: MLP): void {
  if (saveModelTimer !== null) clearTimeout(saveModelTimer);
  saveModelTimer = setTimeout(() => {
    saveModelTimer = null;
    try {
      const payload: StoredModel = {
        version: 1,
        inputDim: model.inputDim,
        hidden: [...model.hidden],
        outputDim: model.outputDim,
        weights: model.weights.map((m) => m.map((row) => [...row])),
        biases: model.biases.map((m) => m.map((row) => [...row])),
      };
      localStorage.setItem(MODEL_STORAGE_KEY, JSON.stringify(payload));
    } catch {
    }
  }, 400);
}

function loadModelFromStorage(): MLP | null {
  const raw = localStorage.getItem(MODEL_STORAGE_KEY);
  if (!raw) return null;
  const data = JSON.parse(raw) as StoredModel;
  if (
    data.version !== 1 ||
    data.inputDim !== 784 ||
    data.outputDim !== 10 ||
    data.hidden.length !== HIDDEN.length ||
    data.hidden.some((v, i) => v !== HIDDEN[i])
  ) {
    return null;
  }
  const numW = 1 + data.hidden.length;
  if (data.weights.length !== numW || data.biases.length !== numW) return null;
  const model = new MLP(data.inputDim, data.hidden, data.outputDim);
  model.weights = data.weights.map((m) => m.map((row) => [...row]));
  model.biases = data.biases.map((m) => m.map((row) => [...row]));
  return model;
}

function zeroActivationsForLayout(): number[][] {
  return LAYER_SIZES.map((n) => new Array<number>(n).fill(0));
}

async function loadCsvData(): Promise<void> {
  try {
    setStatus("MNIST-Train-CSV wird geladen …");
    const trainResp = await fetch(trainCsvUrl);
    if (!trainResp.ok) throw new Error(`Train-CSV nicht gefunden (${trainResp.status})`);
    const trainText = await trainResp.text();
    trainData = parseMnistCsv(trainText);
    setStatus(`Train geladen: ${trainData.length} Zeilen`);
  } catch (e) {
    setStatus(`Fehler Train-CSV: ${e}`);
    trainData = [];
  }
  try {
    setStatus("MNIST-Test-CSV wird geladen …");
    const testResp = await fetch(testCsvUrl);
    if (!testResp.ok) throw new Error(`Test-CSV nicht gefunden (${testResp.status})`);
    const testText = await testResp.text();
    testData = parseMnistCsv(testText);
    setStatus(`Train ${trainData.length} | Test ${testData.length} geladen`);
  } catch (e) {
    setStatus(`Fehler Test-CSV: ${e}`);
    testData = [];
  }
  updateButtons();
}

const { scene, camera, renderer, controls, dispose: disposeScene } = createScene(el.viz);

function renderFrame(): void {
  controls.update();
  renderer.render(scene, camera);
}
const net3dInst = new Network3D(LAYER_SIZES);
net3d = net3dInst;
scene.add(net3dInst.root);

let vizStampCounter = 0;
let lastAppliedVizStamp = 0;
let pendingVizState: VizState | null = null;

function publishVizState(mode: VizMode, activations: number[][]): void {
  pendingVizState = {
    stamp: ++vizStampCounter,
    mode,
    activations: activations.map((a) => [...a]),
  };
  flushVizState();
}

function flushVizState(): void {
  if (!net3d || !pendingVizState || !net) return;
  if (pendingVizState.stamp === lastAppliedVizStamp) return;
  net3d.setActivations(pendingVizState.activations);
  lastAppliedVizStamp = pendingVizState.stamp;
}

function tickViz(): void {
  flushVizState();
  if (net3d && net) net3d.setWeights(net.weights);
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

function inferWithPixels(pixels: number[], label?: number, sampleIndex?: number): void {
  if (!net || !net3d) return;
  try {
    inferCounter += 1;
    const x = matFromColVec(pixels);
    const fwd = net.forward(x);
    const pred = net.predictClass(fwd.prob);
    const invalidProb = fwd.prob.some((row) => !Number.isFinite(row[0]));
    const acts = activationSlices(x, fwd);
    let diffStr = "";
    if (VIZ_DEBUG_INFER && lastInferActsDebug) diffStr = inferLayerMaxDiffs(lastInferActsDebug, acts);
    if (VIZ_DEBUG_INFER) lastInferActsDebug = acts.map((row) => [...row]);
    publishVizState("infer", acts);
    renderFrame();
    const probStr = fwd.prob
      .map((row) => row[0].toFixed(2))
      .join(" ");
    if (label !== undefined) {
      if (invalidProb) {
        setStatus(`Infer #${fmtInt(inferCounter, 4)}: ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);
      } else {
        const idxStr = sampleIndex === undefined ? "" : ` idx=${fmtInt(sampleIndex, 5)} `;
        setStatus(
          `Infer #${fmtInt(inferCounter, 4)}:${idxStr}wahr=${label} pred=${pred}  logits_softmax≈ ${probStr}${diffStr}`,
        );
      }
    } else if (invalidProb) {
      setStatus(`Infer #${fmtInt(inferCounter, 4)} (Canvas): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);
    } else {
      setStatus(`Infer #${fmtInt(inferCounter, 4)} (Canvas): pred=${pred}  ${probStr}${diffStr}`);
    }
  } catch (err) {
    setStatus(`Infer-Fehler: ${String(err)}`);
  }
}

el.btnInferRandom.addEventListener("click", () => {
  if (!net || testData.length === 0) return;
  let idx = Math.floor(Math.random() * testData.length);
  if (testData.length > 1 && idx === lastInferSampleIndex) {
    idx = (idx + 1) % testData.length;
  }
  lastInferSampleIndex = idx;
  const s = testData[idx];
  inferWithPixels(s.pixels, s.label, idx);
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
    updateButtons();
    net = new MLP(784, HIDDEN, 10);
    lastInferActsDebug = null;
    publishVizState("train", zeroActivationsForLayout());
    await trainLoop(
      net,
      trainData,
      {
        lr: 0.005,
        batchSize: 16,
        epochs: 3,
        vizEveryNBatches: 2,
      },
      (s) => {
        if (net) publishVizState("train", s.activations);
        setStatus(
          `Ep ${fmtInt(s.epoch + 1, 3)}  Batch ${fmtInt(s.batchIndex, 5)}  loss ${fmtFloat(s.loss, 8, 4)}  acc ${fmtFloat(s.trainAccBatch * 100, 6, 1)}%`,
        );
        if (net && s.batchIndex % 200 === 0) scheduleSaveModelToStorage(net);
      },
      () => pauseTraining,
      () => stopTraining,
    );
    trainingRunning = false;
    if (net) scheduleSaveModelToStorage(net);
    if (net) publishVizState("idle", zeroActivationsForLayout());
    updateButtons();
    setStatus("Training beendet, Modell im Browser gespeichert");
  })();
});

window.addEventListener("beforeunload", () => {
  stopTraining = true;
  stopAnim();
  net3dInst.dispose();
  disposeScene();
});

setStatus("MNIST-CSV wird automatisch geladen …");
updateButtons();
void loadCsvData();
try {
  const stored = loadModelFromStorage();
  if (stored) {
    net = stored;
    lastInferActsDebug = null;
    publishVizState("idle", zeroActivationsForLayout());
    setStatus("Modell aus Browser-Speicher geladen");
    updateButtons();
  }
} catch {
  setStatus("MNIST-CSV wird automatisch geladen …");
}
