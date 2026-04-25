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
const TRAIN_CFG = {
  lr: 0.02,
  batchSize: 32,
  epochs: 8,
  vizEveryNBatches: 4,
} as const;
const MODEL_STORAGE_KEY_V1 = "neuronal3d:model:v1";
const MODEL_STORAGE_KEY_V2 = "neuronal3d:models:v2";
const VIZ_DEBUG_INFER =
  typeof globalThis.location !== "undefined" &&
  new URLSearchParams(globalThis.location.search).has("vizdebug");

const el = {
  btnTrain: document.getElementById("btnTrain") as HTMLButtonElement,
  btnPause: document.getElementById("btnPause") as HTMLButtonElement,
  modelSelect: document.getElementById("modelSelect") as HTMLSelectElement,
  btnLoadModel: document.getElementById("btnLoadModel") as HTMLButtonElement,
  btnSaveModelAs: document.getElementById("btnSaveModelAs") as HTMLButtonElement,
  btnResetModel: document.getElementById("btnResetModel") as HTMLButtonElement,
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

type StoredModelMetrics = {
  lastLoss: number;
  lastBatchAcc: number;
  testAcc: number | null;
  errorRate: number | null;
  epochsTrained: number;
};

type StoredModelEntry = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  model: StoredModel;
  metrics: StoredModelMetrics;
};

type StoredModelCollection = {
  version: 2;
  activeModelId: string | null;
  models: StoredModelEntry[];
};

type VizMode = "idle" | "train" | "infer";

type VizState = {
  stamp: number;
  mode: VizMode;
  activations: number[][];
};

let saveModelTimer: ReturnType<typeof setTimeout> | null = null;
let modelStore: StoredModelCollection = { version: 2, activeModelId: null, models: [] };
let activeModelId: string | null = null;
let lastTrainLoss = 0;
let lastTrainBatchAcc = 0;

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
  const hasSelectedModel = !!el.modelSelect.value;
  el.btnTrain.disabled = !hasTrain || trainingRunning;
  el.btnPause.disabled = !trainingRunning;
  el.btnLoadModel.disabled = !hasSelectedModel || trainingRunning;
  el.btnSaveModelAs.disabled = !net || trainingRunning;
  el.btnResetModel.disabled = !net || trainingRunning;
  el.btnInferRandom.disabled = !net || !hasTest;
  el.btnInferDraw.disabled = !net;
}

function fmtPct(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return "-";
  return `${(v * 100).toFixed(2)}%`;
}

function defaultModelName(): string {
  return `Modell ${new Date().toLocaleString("de-DE", { hour12: false })}`;
}

function cloneStoredModel(model: MLP): StoredModel {
  return {
    version: 1,
    inputDim: model.inputDim,
    hidden: [...model.hidden],
    outputDim: model.outputDim,
    weights: model.weights.map((m) => m.map((row) => [...row])),
    biases: model.biases.map((m) => m.map((row) => [...row])),
  };
}

function applyStoredModelToNet(data: StoredModel): MLP {
  const model = new MLP(data.inputDim, data.hidden, data.outputDim);
  model.weights = data.weights.map((m) => m.map((row) => [...row]));
  model.biases = data.biases.map((m) => m.map((row) => [...row]));
  return model;
}

function modelMatchesExpectedLayout(data: StoredModel): boolean {
  return (
    data.version === 1 &&
    data.inputDim === 784 &&
    data.outputDim === 10 &&
    data.hidden.length === HIDDEN.length &&
    data.hidden.every((v, i) => v === HIDDEN[i])
  );
}

function saveModelStoreToStorage(store: StoredModelCollection): void {
  localStorage.setItem(MODEL_STORAGE_KEY_V2, JSON.stringify(store));
}

function refreshModelSelect(): void {
  const selected = activeModelId ?? el.modelSelect.value;
  el.modelSelect.innerHTML = "";
  for (const entry of modelStore.models) {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = `${entry.name} | err ${fmtPct(entry.metrics.errorRate)} | acc ${fmtPct(entry.metrics.testAcc)} | ep ${entry.metrics.epochsTrained}`;
    el.modelSelect.append(option);
  }
  if (selected && modelStore.models.some((m) => m.id === selected)) {
    el.modelSelect.value = selected;
  }
}

function upsertModelEntry(entry: StoredModelEntry): void {
  const idx = modelStore.models.findIndex((m) => m.id === entry.id);
  if (idx >= 0) modelStore.models[idx] = entry;
  else modelStore.models.unshift(entry);
  modelStore.activeModelId = entry.id;
  activeModelId = entry.id;
  saveModelStoreToStorage(modelStore);
  refreshModelSelect();
  updateButtons();
}

function computeDatasetMetrics(model: MLP, data: MnistSample[]): { accuracy: number; errorRate: number; loss: number } | null {
  if (data.length === 0) return null;
  let lossSum = 0;
  let correct = 0;
  for (const s of data) {
    const x = matFromColVec(s.pixels);
    const fwd = model.forward(x);
    const y = new Array<number>(10).fill(0);
    y[s.label] = 1;
    lossSum += model.crossEntropyLoss(fwd.prob, matFromColVec(y));
    if (model.predictClass(fwd.prob) === s.label) correct += 1;
  }
  const accuracy = correct / data.length;
  return { accuracy, errorRate: 1 - accuracy, loss: lossSum / data.length };
}

function scheduleSaveModelToStorage(model: MLP): void {
  if (saveModelTimer !== null) clearTimeout(saveModelTimer);
  saveModelTimer = setTimeout(() => {
    saveModelTimer = null;
    try {
      const selectedId = activeModelId ?? el.modelSelect.value;
      if (!selectedId) return;
      const existing = modelStore.models.find((m) => m.id === selectedId);
      if (!existing) return;
      const testMetrics = computeDatasetMetrics(model, testData);
      upsertModelEntry({
        ...existing,
        updatedAt: new Date().toISOString(),
        model: cloneStoredModel(model),
        metrics: {
          lastLoss: lastTrainLoss,
          lastBatchAcc: lastTrainBatchAcc,
          testAcc: testMetrics ? testMetrics.accuracy : existing.metrics.testAcc,
          errorRate: testMetrics ? testMetrics.errorRate : existing.metrics.errorRate,
          epochsTrained: existing.metrics.epochsTrained,
        },
      });
    } catch {
    }
  }, 400);
}

function loadModelStoreFromStorage(): StoredModelCollection {
  const rawV2 = localStorage.getItem(MODEL_STORAGE_KEY_V2);
  if (rawV2) {
    const parsed = JSON.parse(rawV2) as StoredModelCollection;
    if (parsed.version === 2 && Array.isArray(parsed.models)) return parsed;
  }
  const rawV1 = localStorage.getItem(MODEL_STORAGE_KEY_V1);
  if (rawV1) {
    const legacy = JSON.parse(rawV1) as StoredModel;
    if (!modelMatchesExpectedLayout(legacy)) return { version: 2, activeModelId: null, models: [] };
    const now = new Date().toISOString();
    const migrated: StoredModelCollection = {
      version: 2,
      activeModelId: "legacy-v1",
      models: [
        {
          id: "legacy-v1",
          name: "Migriertes Modell",
          createdAt: now,
          updatedAt: now,
          model: legacy,
          metrics: {
            lastLoss: 0,
            lastBatchAcc: 0,
            testAcc: null,
            errorRate: null,
            epochsTrained: 0,
          },
        },
      ],
    };
    saveModelStoreToStorage(migrated);
    return migrated;
  }
  return { version: 2, activeModelId: null, models: [] };
}

function loadSelectedModelIntoNet(id: string): boolean {
  const entry = modelStore.models.find((m) => m.id === id);
  if (!entry) return false;
  if (!modelMatchesExpectedLayout(entry.model)) return false;
  const numW = 1 + entry.model.hidden.length;
  if (entry.model.weights.length !== numW || entry.model.biases.length !== numW) return false;
  net = applyStoredModelToNet(entry.model);
  activeModelId = entry.id;
  modelStore.activeModelId = entry.id;
  saveModelStoreToStorage(modelStore);
  lastInferActsDebug = null;
  publishVizState("idle", zeroActivationsForLayout());
  updateButtons();
  return true;
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
    const probs = fwd.prob.map((row, i) => ({ digit: i, p: row[0] }));
    const probStr = probs.map((x) => x.p.toFixed(4)).join(" ");
    const top = [...probs]
      .sort((a, b) => b.p - a.p)
      .slice(0, 3)
      .map((x) => `${x.digit}:${(x.p * 100).toFixed(2)}%`)
      .join(" ");
    if (label !== undefined) {
      if (invalidProb) {
        setStatus(`Infer #${fmtInt(inferCounter, 4)}: ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);
      } else {
        const idxStr = sampleIndex === undefined ? "" : ` idx=${fmtInt(sampleIndex, 5)} `;
        setStatus(
          `Infer #${fmtInt(inferCounter, 4)}:${idxStr}wahr=${label} pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`,
        );
      }
    } else if (invalidProb) {
      setStatus(`Infer #${fmtInt(inferCounter, 4)} (Canvas): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);
    } else {
      setStatus(`Infer #${fmtInt(inferCounter, 4)} (Canvas): pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`);
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

el.modelSelect.addEventListener("change", () => {
  updateButtons();
});

el.btnLoadModel.addEventListener("click", () => {
  const id = el.modelSelect.value;
  if (!id) return;
  const ok = loadSelectedModelIntoNet(id);
  if (!ok) {
    setStatus("Ausgewähltes Modell konnte nicht geladen werden");
    return;
  }
  const entry = modelStore.models.find((m) => m.id === id);
  setStatus(
    `Modell geladen: ${entry?.name ?? id} | err ${fmtPct(entry?.metrics.errorRate ?? null)} | acc ${fmtPct(entry?.metrics.testAcc ?? null)}`,
  );
});

el.btnSaveModelAs.addEventListener("click", () => {
  if (!net) return;
  const name = (window.prompt("Name für den neuen Modellstand:", defaultModelName()) ?? "").trim();
  if (!name) return;
  const now = new Date().toISOString();
  const testMetrics = computeDatasetMetrics(net, testData);
  upsertModelEntry({
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
    model: cloneStoredModel(net),
    metrics: {
      lastLoss: lastTrainLoss,
      lastBatchAcc: lastTrainBatchAcc,
      testAcc: testMetrics ? testMetrics.accuracy : null,
      errorRate: testMetrics ? testMetrics.errorRate : null,
      epochsTrained: 0,
    },
  });
  setStatus(`Neuer Modellstand gespeichert: ${name}`);
});

el.btnResetModel.addEventListener("click", () => {
  if (trainingRunning) return;
  const currentId = activeModelId ?? el.modelSelect.value;
  if (!currentId) return;
  const currentEntry = modelStore.models.find((m) => m.id === currentId);
  if (!currentEntry) return;
  const fresh = new MLP(784, HIDDEN, 10);
  net = fresh;
  lastTrainLoss = 0;
  lastTrainBatchAcc = 0;
  lastInferActsDebug = null;
  upsertModelEntry({
    ...currentEntry,
    updatedAt: new Date().toISOString(),
    model: cloneStoredModel(fresh),
    metrics: {
      lastLoss: 0,
      lastBatchAcc: 0,
      testAcc: null,
      errorRate: null,
      epochsTrained: 0,
    },
  });
  publishVizState("idle", zeroActivationsForLayout());
  setStatus(`Modell neu initialisiert: ${currentEntry.name}`);
});

el.btnTrain.addEventListener("click", () => {
  void (async () => {
    if (trainData.length === 0) return;
    trainingRunning = true;
    stopTraining = false;
    pauseTraining = false;
    el.btnPause.textContent = "Pause";
    updateButtons();
    if (!net) {
      net = new MLP(784, HIDDEN, 10);
      const now = new Date().toISOString();
      upsertModelEntry({
        id: crypto.randomUUID(),
        name: defaultModelName(),
        createdAt: now,
        updatedAt: now,
        model: cloneStoredModel(net),
        metrics: {
          lastLoss: 0,
          lastBatchAcc: 0,
          testAcc: null,
          errorRate: null,
          epochsTrained: 0,
        },
      });
    }
    lastInferActsDebug = null;
    publishVizState("train", zeroActivationsForLayout());
    await trainLoop(
      net,
      trainData,
      TRAIN_CFG,
      (s) => {
        if (net) publishVizState("train", s.activations);
        lastTrainLoss = s.loss;
        lastTrainBatchAcc = s.trainAccBatch;
        setStatus(
          `Ep ${fmtInt(s.epoch + 1, 3)}  Batch ${fmtInt(s.batchIndex, 5)}  loss ${fmtFloat(s.loss, 8, 4)}  acc ${fmtFloat(s.trainAccBatch * 100, 6, 1)}%`,
        );
      },
      () => pauseTraining,
      () => stopTraining,
    );
    trainingRunning = false;
    if (net) {
      const testMetrics = computeDatasetMetrics(net, testData);
      const currentId = activeModelId ?? el.modelSelect.value;
      const currentEntry = currentId ? modelStore.models.find((m) => m.id === currentId) : null;
      if (currentEntry) {
        upsertModelEntry({
          ...currentEntry,
          updatedAt: new Date().toISOString(),
          model: cloneStoredModel(net),
          metrics: {
            lastLoss: lastTrainLoss,
            lastBatchAcc: lastTrainBatchAcc,
            testAcc: testMetrics ? testMetrics.accuracy : currentEntry.metrics.testAcc,
            errorRate: testMetrics ? testMetrics.errorRate : currentEntry.metrics.errorRate,
            epochsTrained: currentEntry.metrics.epochsTrained + TRAIN_CFG.epochs,
          },
        });
      }
      scheduleSaveModelToStorage(net);
    }
    if (net) publishVizState("idle", zeroActivationsForLayout());
    updateButtons();
    const active = activeModelId ? modelStore.models.find((m) => m.id === activeModelId) : null;
    setStatus(
      `Training beendet | aktiv: ${active?.name ?? "-"} | loss ${fmtFloat(lastTrainLoss, 8, 4)} | batch-acc ${fmtFloat(lastTrainBatchAcc * 100, 6, 2)}% | err ${fmtPct(active?.metrics.errorRate ?? null)} | acc ${fmtPct(active?.metrics.testAcc ?? null)}`,
    );
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
  modelStore = loadModelStoreFromStorage();
  activeModelId = modelStore.activeModelId;
  refreshModelSelect();
  const toLoad = activeModelId ?? el.modelSelect.value;
  if (toLoad && loadSelectedModelIntoNet(toLoad)) {
    const entry = modelStore.models.find((m) => m.id === toLoad);
    setStatus(`Modell aus Browser-Speicher geladen: ${entry?.name ?? toLoad}`);
  } else if (modelStore.models.length > 0) {
    setStatus(`${modelStore.models.length} Modellstände im Browser gefunden`);
  }
} catch {
  setStatus("MNIST-CSV wird automatisch geladen …");
}
