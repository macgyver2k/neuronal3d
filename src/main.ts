import { parseMnistCsv, type MnistSample } from "./data/mnist.js";
import { matFromColVec } from "./nn/matrix.js";
import { activationSlices, MLP } from "./nn/network.js";
import { trainLoop, type TrainEpochSummary } from "./train/trainer.js";
import { Network3D } from "./viz/network3d.js";
import { animateLoop, createScene } from "./viz/scene.js";
import mnistTrainCsvUrl from "./data/csv/mnist_train.csv?url";
import mnistTestCsvUrl from "./data/csv/mnist_test.csv?url";

const LAYER_SIZES = [784, 64, 32, 10];
const HIDDEN = [64, 32];
const TRAIN_DEFAULTS = {
  lr: 0.02,
  batchSize: 32,
  epochs: 1,
  vizEveryNBatches: 4,
} as const;
const MODEL_STORAGE_KEY_V1 = "neuronal3d:model:v1";
const MODEL_STORAGE_KEY_V2 = "neuronal3d:models:v2";
const EPOCH_TRACK_STORAGE_KEY = "neuronal3d:epochTrack:v1";
const EPOCH_TRACK_MAX_ROWS_PER_MODEL = 500;
const ACTIVE_DATASET_STORAGE_KEY = "neuronal3d:activeDataset:v1";
const APP_MODE_STORAGE_KEY = "neuronal3d:appMode:v1";
const VIZ_DEBUG_INFER =
  typeof globalThis.location !== "undefined" &&
  new URLSearchParams(globalThis.location.search).has("vizdebug");

type DatasetConfig = {
  key: "mnist" | "usps" | "emnistDigits";
  label: string;
  trainPath: string;
  testPath: string;
  bundledTrainUrl?: string;
  bundledTestUrl?: string;
};

const DATASETS: DatasetConfig[] = [
  {
    key: "mnist",
    label: "MNIST",
    trainPath: "/data/csv/mnist_train.csv",
    testPath: "/data/csv/mnist_test.csv",
    bundledTrainUrl: mnistTrainCsvUrl,
    bundledTestUrl: mnistTestCsvUrl,
  },
  {
    key: "usps",
    label: "USPS",
    trainPath: "/data/csv/usps_train.csv",
    testPath: "/data/csv/usps_test.csv",
  },
  {
    key: "emnistDigits",
    label: "EMNIST Digits",
    trainPath: "/data/csv/emnist_digits_train.csv",
    testPath: "/data/csv/emnist_digits_test.csv",
  },
];

const el = {
  app: document.getElementById("app") as HTMLElement,
  modeTabTrain: document.getElementById("modeTabTrain") as HTMLButtonElement,
  modeTabInfer: document.getElementById("modeTabInfer") as HTMLButtonElement,
  dockTrain: document.getElementById("dockTrain") as HTMLElement,
  dockInfer: document.getElementById("dockInfer") as HTMLElement,
  btnTrain: document.getElementById("btnTrain") as HTMLButtonElement,
  btnPause: document.getElementById("btnPause") as HTMLButtonElement,
  modelSelect: document.getElementById("modelSelect") as HTMLSelectElement,
  btnLoadModel: document.getElementById("btnLoadModel") as HTMLButtonElement,
  btnSaveModelAs: document.getElementById("btnSaveModelAs") as HTMLButtonElement,
  btnResetModel: document.getElementById("btnResetModel") as HTMLButtonElement,
  datasetSelect: document.getElementById("datasetSelect") as HTMLSelectElement,
  epochsInput: document.getElementById("epochsInput") as HTMLInputElement,
  lrInput: document.getElementById("lrInput") as HTMLInputElement,
  batchSizeInput: document.getElementById("batchSizeInput") as HTMLInputElement,
  vizEveryInput: document.getElementById("vizEveryInput") as HTMLInputElement,
  btnInferRandom: document.getElementById("btnInferRandom") as HTMLButtonElement,
  btnInferDraw: document.getElementById("btnInferDraw") as HTMLButtonElement,
  btnClearDraw: document.getElementById("btnClearDraw") as HTMLButtonElement,
  status: document.getElementById("status") as HTMLSpanElement,
  epochTrackList: document.getElementById("epochTrackList") as HTMLUListElement,
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
type PersistedEpochRow = TrainEpochSummary & {
  savedAt: string;
  run: number;
  runStartedAt: string;
  runElapsedMs: number;
};
let epochTrackRows: PersistedEpochRow[] = [];
let currentEpochRun = 0;
let currentEpochRunStartedAt = "";
let currentEpochRunStartedMs = 0;
let activeDatasetKey: DatasetConfig["key"] = "mnist";

const ctxDraw = el.drawCanvas.getContext("2d");
if (!ctxDraw) throw new Error("canvas");
const ctx2d = ctxDraw;
ctx2d.fillStyle = "#000000";
ctx2d.fillRect(0, 0, el.drawCanvas.width, el.drawCanvas.height);
const canvasLineWidthDraw = 14;
const canvasLineWidthErase = 32;
ctx2d.lineWidth = canvasLineWidthDraw;
ctx2d.lineCap = "round";
ctx2d.lineJoin = "round";
ctx2d.strokeStyle = "#ffffff";

let drawing = false;
let liveCanvasInferRaf: number | null = null;
function canvasPos(ev: PointerEvent): { x: number; y: number } {
  const r = el.drawCanvas.getBoundingClientRect();
  const sx = el.drawCanvas.width / r.width;
  const sy = el.drawCanvas.height / r.height;
  return { x: (ev.clientX - r.left) * sx, y: (ev.clientY - r.top) * sy };
}
function scheduleLiveCanvasInfer(): void {
  if (liveCanvasInferRaf !== null) return;
  liveCanvasInferRaf = requestAnimationFrame(() => {
    liveCanvasInferRaf = null;
    if (!net || !net3d) return;
    const pixels = canvasToMnistPixels();
    inferWithPixels(pixels, undefined, undefined, { live: true });
  });
}
el.drawCanvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
el.drawCanvas.addEventListener("pointerdown", (e) => {
  if (e.button !== 0 && e.button !== 2) return;
  if (e.button === 2) e.preventDefault();
  drawing = true;
  ctx2d.strokeStyle = e.button === 2 ? "#000000" : "#ffffff";
  ctx2d.lineWidth = e.button === 2 ? canvasLineWidthErase : canvasLineWidthDraw;
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
  scheduleLiveCanvasInfer();
});
el.drawCanvas.addEventListener("pointerup", () => {
  drawing = false;
  scheduleLiveCanvasInfer();
});
el.drawCanvas.addEventListener("pointercancel", () => {
  drawing = false;
  scheduleLiveCanvasInfer();
});
el.drawCanvas.addEventListener("pointerleave", () => {
  drawing = false;
  scheduleLiveCanvasInfer();
});
el.btnClearDraw.addEventListener("click", () => {
  ctx2d.fillStyle = "#000000";
  ctx2d.fillRect(0, 0, el.drawCanvas.width, el.drawCanvas.height);
  scheduleLiveCanvasInfer();
});

el.modeTabTrain.addEventListener("click", () => {
  setAppMode("train");
});

el.modeTabInfer.addEventListener("click", () => {
  setAppMode("infer");
});

window.addEventListener("keydown", (e: KeyboardEvent) => {
  if (!e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.code !== "Digit1" && e.code !== "Digit2") return;
  const t = e.target;
  if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement) return;
  if (t instanceof HTMLElement && t.isContentEditable) return;
  e.preventDefault();
  setAppMode(e.code === "Digit1" ? "train" : "infer");
});

function setStatus(t: string): void {
  el.status.textContent = t;
}

function readStoredAppMode(): "train" | "infer" {
  try {
    const raw = localStorage.getItem(APP_MODE_STORAGE_KEY);
    if (raw === "infer" || raw === "train") return raw;
  } catch {
  }
  return "train";
}

function setAppMode(mode: "train" | "infer"): void {
  el.app.dataset.appMode = mode;
  el.modeTabTrain.setAttribute("aria-selected", mode === "train" ? "true" : "false");
  el.modeTabInfer.setAttribute("aria-selected", mode === "infer" ? "true" : "false");
  el.modeTabTrain.tabIndex = mode === "train" ? 0 : -1;
  el.modeTabInfer.tabIndex = mode === "infer" ? 0 : -1;
  el.dockTrain.toggleAttribute("hidden", mode !== "train");
  el.dockInfer.toggleAttribute("hidden", mode !== "infer");
  el.dockTrain.inert = mode !== "train";
  el.dockInfer.inert = mode !== "infer";
  try {
    localStorage.setItem(APP_MODE_STORAGE_KEY, mode);
  } catch {
  }
  queueMicrotask(() => {
    window.dispatchEvent(new Event("resize"));
  });
}

function renderEpochTracking(): void {
  el.epochTrackList.innerHTML = "";
  if (epochTrackRows.length === 0) {
    const empty = document.createElement("li");
    empty.className = "epochEmpty";
    empty.textContent = "Noch kein Training";
    el.epochTrackList.append(empty);
    return;
  }
  const rows = epochTrackRows.slice(-200);
  for (const r of rows) {
    const item = document.createElement("li");
    item.className = "epochRow";
    const run = document.createElement("span");
    run.className = "epochRun";
    run.textContent = `R${String(r.run).padStart(2, "0")}`;
    const ep = document.createElement("span");
    ep.className = "epochNum";
    ep.textContent = `Ep ${r.epoch + 1}`;
    const loss = document.createElement("span");
    loss.className = "epochLoss";
    loss.textContent = `loss ${r.loss.toFixed(4)}`;
    const acc = document.createElement("span");
    acc.className = "epochAcc";
    acc.textContent = `${(r.trainAcc * 100).toFixed(2)}%`;
    const meta = document.createElement("span");
    meta.className = "epochMeta";
    const at = formatTimeLabel(r.savedAt);
    const dur = formatDurationLabel(r.runElapsedMs);
    meta.textContent = `${at}  |  Dauer ${dur}`;
    item.append(run, ep, loss, acc, meta);
    el.epochTrackList.append(item);
  }
}

function formatTimeLabel(iso: string): string {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "--:--:--";
  return d.toLocaleTimeString("de-DE", { hour12: false });
}

function formatDurationLabel(ms: number): string {
  const totalSec = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type EpochTrackStore = { version: 1; byModelId: Record<string, PersistedEpochRow[]> };

function loadEpochTrackStore(): EpochTrackStore {
  try {
    const raw = localStorage.getItem(EPOCH_TRACK_STORAGE_KEY);
    if (!raw) return { version: 1, byModelId: {} };
    const p = JSON.parse(raw) as EpochTrackStore;
    if (p.version !== 1 || typeof p.byModelId !== "object" || p.byModelId === null) return { version: 1, byModelId: {} };
    const byModelId: Record<string, PersistedEpochRow[]> = {};
    for (const [id, arr] of Object.entries(p.byModelId)) {
      if (!Array.isArray(arr)) continue;
      const norm: PersistedEpochRow[] = [];
      for (const x of arr) {
        if (!x || typeof x !== "object") continue;
        const o = x as Record<string, unknown>;
        if (
          typeof o.epoch !== "number" ||
          typeof o.loss !== "number" ||
          typeof o.trainAcc !== "number"
        ) {
          continue;
        }
        norm.push({
          epoch: o.epoch,
          loss: o.loss,
          trainAcc: o.trainAcc,
          savedAt: typeof o.savedAt === "string" ? o.savedAt : "",
          run: typeof o.run === "number" ? o.run : 0,
          runStartedAt: typeof o.runStartedAt === "string" ? o.runStartedAt : "",
          runElapsedMs: typeof o.runElapsedMs === "number" ? o.runElapsedMs : 0,
        });
      }
      byModelId[id] = norm;
    }
    return { version: 1, byModelId };
  } catch {
    return { version: 1, byModelId: {} };
  }
}

function saveEpochTrackStore(store: EpochTrackStore): void {
  localStorage.setItem(EPOCH_TRACK_STORAGE_KEY, JSON.stringify(store));
}

function readEpochHistoryForModel(modelId: string): PersistedEpochRow[] {
  return loadEpochTrackStore().byModelId[modelId] ?? [];
}

function nextRunSeq(modelId: string): number {
  const rows = readEpochHistoryForModel(modelId);
  if (rows.length === 0) return 1;
  let mx = 0;
  for (const r of rows) mx = Math.max(mx, r.run);
  return mx + 1;
}

function appendEpochToStorage(modelId: string, row: PersistedEpochRow): void {
  const st = loadEpochTrackStore();
  const prev = st.byModelId[modelId] ?? [];
  const next = [...prev, row];
  if (next.length > EPOCH_TRACK_MAX_ROWS_PER_MODEL) {
    next.splice(0, next.length - EPOCH_TRACK_MAX_ROWS_PER_MODEL);
  }
  st.byModelId[modelId] = next;
  saveEpochTrackStore(st);
}

function clearEpochHistoryForModel(modelId: string): void {
  const st = loadEpochTrackStore();
  delete st.byModelId[modelId];
  saveEpochTrackStore(st);
}

function applyEpochHistoryToUi(modelId: string | null): void {
  if (!modelId) {
    epochTrackRows = [];
    renderEpochTracking();
    return;
  }
  epochTrackRows = [...readEpochHistoryForModel(modelId)];
  renderEpochTracking();
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
  el.datasetSelect.disabled = trainingRunning;
  el.epochsInput.disabled = trainingRunning;
  el.lrInput.disabled = trainingRunning;
  el.batchSizeInput.disabled = trainingRunning;
  el.vizEveryInput.disabled = trainingRunning;
}

function datasetByKey(key: string): DatasetConfig | null {
  return DATASETS.find((d) => d.key === key) ?? null;
}

function applyDatasetSelectionToUi(): void {
  el.datasetSelect.innerHTML = "";
  for (const d of DATASETS) {
    const option = document.createElement("option");
    option.value = d.key;
    option.textContent = d.label;
    el.datasetSelect.append(option);
  }
  el.datasetSelect.value = activeDatasetKey;
}

function parseIntInRange(raw: string, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function parseFloatInRange(raw: string, fallback: number, min: number, max: number): number {
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function getTrainConfig(): { lr: number; batchSize: number; epochs: number; vizEveryNBatches: number } {
  const epochs = parseIntInRange(el.epochsInput.value, TRAIN_DEFAULTS.epochs, 1, 200);
  const lr = parseFloatInRange(el.lrInput.value, TRAIN_DEFAULTS.lr, 0.0001, 1);
  const batchSize = parseIntInRange(el.batchSizeInput.value, TRAIN_DEFAULTS.batchSize, 1, 512);
  const vizEveryNBatches = parseIntInRange(el.vizEveryInput.value, TRAIN_DEFAULTS.vizEveryNBatches, 1, 1000);
  el.epochsInput.value = String(epochs);
  el.lrInput.value = String(lr);
  el.batchSizeInput.value = String(batchSize);
  el.vizEveryInput.value = String(vizEveryNBatches);
  return { lr, batchSize, epochs, vizEveryNBatches };
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
  applyEpochHistoryToUi(el.modelSelect.value || null);
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
  refreshModelSelect();
  publishVizState("idle", zeroActivationsForLayout());
  updateButtons();
  return true;
}

function zeroActivationsForLayout(): number[][] {
  return LAYER_SIZES.map((n) => new Array<number>(n).fill(0));
}

async function loadCsvData(): Promise<void> {
  const ds = datasetByKey(activeDatasetKey);
  if (!ds) {
    trainData = [];
    testData = [];
    setStatus("Datensatz-Konfiguration ungültig");
    updateButtons();
    return;
  }
  const trainSources = [ds.trainPath, ds.bundledTrainUrl].filter((x): x is string => typeof x === "string" && x.length > 0);
  const testSources = [ds.testPath, ds.bundledTestUrl].filter((x): x is string => typeof x === "string" && x.length > 0);
  try {
    setStatus(`${ds.label}: Train-CSV wird geladen …`);
    let trainErr = "";
    let loadedTrain: MnistSample[] = [];
    for (const src of trainSources) {
      try {
        const resp = await fetch(src);
        if (!resp.ok) {
          trainErr = `Train-CSV nicht gefunden (${resp.status})`;
          continue;
        }
        const text = await resp.text();
        const parsed = parseMnistCsv(text);
        if (parsed.length === 0) {
          trainErr = "Train-CSV enthält keine gültigen Zeilen";
          continue;
        }
        loadedTrain = parsed;
        break;
      } catch (e) {
        trainErr = String(e);
      }
    }
    if (loadedTrain.length === 0) throw new Error(trainErr || "Train-CSV konnte nicht geladen werden");
    trainData = loadedTrain;
    setStatus(`${ds.label}: Train geladen (${trainData.length} Zeilen)`);
  } catch (e) {
    setStatus(`${ds.label}: Fehler Train-CSV: ${e}`);
    trainData = [];
  }
  try {
    setStatus(`${ds.label}: Test-CSV wird geladen …`);
    let testErr = "";
    let loadedTest: MnistSample[] = [];
    for (const src of testSources) {
      try {
        const resp = await fetch(src);
        if (!resp.ok) {
          testErr = `Test-CSV nicht gefunden (${resp.status})`;
          continue;
        }
        const text = await resp.text();
        const parsed = parseMnistCsv(text);
        if (parsed.length === 0) {
          testErr = "Test-CSV enthält keine gültigen Zeilen";
          continue;
        }
        loadedTest = parsed;
        break;
      } catch (e) {
        testErr = String(e);
      }
    }
    if (loadedTest.length === 0) throw new Error(testErr || "Test-CSV konnte nicht geladen werden");
    testData = loadedTest;
    setStatus(`${ds.label}: Train ${trainData.length} | Test ${testData.length} geladen`);
  } catch (e) {
    setStatus(`${ds.label}: Fehler Test-CSV: ${e}`);
    testData = [];
  }
  if (trainData.length === 0 && activeDatasetKey !== "mnist") {
    activeDatasetKey = "mnist";
    localStorage.setItem(ACTIVE_DATASET_STORAGE_KEY, activeDatasetKey);
    applyDatasetSelectionToUi();
    await loadCsvData();
    return;
  }
  lastInferSampleIndex = -1;
  updateButtons();
}

const { scene, renderer, controls, render: renderScene, dispose: disposeScene } = createScene(el.viz);

function renderFrame(): void {
  renderScene();
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
  if (!net3d || !pendingVizState) return;
  if (pendingVizState.stamp === lastAppliedVizStamp) return;
  net3d.setIdleDim(pendingVizState.mode === "idle");
  if (pendingVizState.mode !== "infer") net3d.setInferResult(null, null);
  net3d.setEdgeFocus(
    pendingVizState.mode === "infer" ? "infer" : (pendingVizState.mode === "train" ? "trainRecent" : "off"),
    pendingVizState.mode === "infer" ? pendingVizState.activations : null,
  );
  net3d.setActivations(pendingVizState.activations);
  lastAppliedVizStamp = pendingVizState.stamp;
}

function tickViz(): void {
  flushVizState();
  if (net3d && net) net3d.setWeights(net.weights);
}

const stopAnim = animateLoop(renderScene, controls, tickViz);

function canvasToMnistPixels(): number[] {
  const w = el.drawCanvas.width;
  const h = el.drawCanvas.height;
  const img = ctx2d.getImageData(0, 0, w, h);
  const d = img.data;
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  const inkThreshold = 20;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const v = (d[i] + d[i + 1] + d[i + 2]) / 3;
      if (v > inkThreshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX || maxY < minY) return new Array<number>(784).fill(0);
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const side = Math.max(bw, bh);
  const pad = Math.max(2, Math.floor(side * 0.2));
  const cx = (minX + maxX) * 0.5;
  const cy = (minY + maxY) * 0.5;
  const cropSide = side + pad * 2;
  const cropX0 = cx - cropSide * 0.5;
  const cropY0 = cy - cropSide * 0.5;
  const out = new Array<number>(784);
  let k = 0;
  for (let gy = 0; gy < 28; gy++) {
    for (let gx = 0; gx < 28; gx++) {
      const sx0 = cropX0 + (gx / 28) * cropSide;
      const sy0 = cropY0 + (gy / 28) * cropSide;
      const sx1 = cropX0 + ((gx + 1) / 28) * cropSide;
      const sy1 = cropY0 + ((gy + 1) / 28) * cropSide;
      const x0 = Math.max(0, Math.floor(sx0));
      const y0 = Math.max(0, Math.floor(sy0));
      const x1 = Math.min(w, Math.ceil(sx1));
      const y1 = Math.min(h, Math.ceil(sy1));
      let sum = 0;
      let cnt = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * w + x) * 4;
          sum += (d[i] + d[i + 1] + d[i + 2]) / 3;
          cnt++;
        }
      }
      out[k++] = cnt > 0 ? sum / cnt / 255 : 0;
    }
  }
  return out;
}

function inferWithPixels(
  pixels: number[],
  label?: number,
  sampleIndex?: number,
  opts?: { live?: boolean },
): void {
  if (!net || !net3d) return;
  const live = opts?.live === true;
  try {
    if (!live) inferCounter += 1;
    const x = matFromColVec(pixels);
    const fwd = net.forward(x);
    const pred = net.predictClass(fwd.prob);
    const invalidProb = fwd.prob.some((row) => !Number.isFinite(row[0]));
    const acts = activationSlices(x, fwd);
    let diffStr = "";
    if (VIZ_DEBUG_INFER && lastInferActsDebug) diffStr = inferLayerMaxDiffs(lastInferActsDebug, acts);
    if (VIZ_DEBUG_INFER) lastInferActsDebug = acts.map((row) => [...row]);
    net3d.setInferResult(pred, label ?? null);
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
      setStatus(
        live
          ? "Canvas (live): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren"
          : `Infer #${fmtInt(inferCounter, 4)} (Canvas): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`,
      );
    } else {
      setStatus(
        live
          ? `Canvas (live): pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`
          : `Infer #${fmtInt(inferCounter, 4)} (Canvas): pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`,
      );
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
  applyEpochHistoryToUi(el.modelSelect.value || null);
  updateButtons();
});

el.datasetSelect.addEventListener("change", () => {
  const selected = datasetByKey(el.datasetSelect.value);
  if (!selected) return;
  activeDatasetKey = selected.key;
  localStorage.setItem(ACTIVE_DATASET_STORAGE_KEY, activeDatasetKey);
  void loadCsvData();
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
  clearEpochHistoryForModel(currentId);
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
  applyEpochHistoryToUi(currentId);
  publishVizState("idle", zeroActivationsForLayout());
  setStatus(`Modell neu initialisiert: ${currentEntry.name}`);
});

el.btnTrain.addEventListener("click", () => {
  void (async () => {
    if (trainData.length === 0) return;
    const trainCfg = getTrainConfig();
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
    const trainModelId = activeModelId ?? el.modelSelect.value;
    if (!trainModelId) {
      trainingRunning = false;
      updateButtons();
      return;
    }
    currentEpochRun = nextRunSeq(trainModelId);
    currentEpochRunStartedMs = Date.now();
    currentEpochRunStartedAt = new Date(currentEpochRunStartedMs).toISOString();
    epochTrackRows = [];
    renderEpochTracking();
    publishVizState("train", zeroActivationsForLayout());
    await trainLoop(
      net,
      trainData,
      trainCfg,
      (s) => {
        if (net) publishVizState("train", s.activations);
        lastTrainLoss = s.loss;
        lastTrainBatchAcc = s.trainAccBatch;
        setStatus(
          `Ep ${fmtInt(s.epoch + 1, 3)}  Batch ${fmtInt(s.batchIndex, 5)}  loss ${fmtFloat(s.loss, 8, 4)}  acc ${fmtFloat(s.trainAccBatch * 100, 6, 1)}%`,
        );
      },
      (ep) => {
        const row: PersistedEpochRow = {
          ...ep,
          run: currentEpochRun,
          savedAt: new Date().toISOString(),
          runStartedAt: currentEpochRunStartedAt,
          runElapsedMs: Date.now() - currentEpochRunStartedMs,
        };
        epochTrackRows.push(row);
        appendEpochToStorage(trainModelId, row);
        renderEpochTracking();
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
            epochsTrained: currentEntry.metrics.epochsTrained + trainCfg.epochs,
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

try {
  const savedDataset = localStorage.getItem(ACTIVE_DATASET_STORAGE_KEY);
  const ds = savedDataset ? datasetByKey(savedDataset) : null;
  if (ds) activeDatasetKey = ds.key;
} catch {
}
applyDatasetSelectionToUi();
setAppMode(readStoredAppMode());
setStatus("Datensatz wird automatisch geladen …");
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
    applyEpochHistoryToUi(el.modelSelect.value || null);
    setStatus(`${modelStore.models.length} Modellstände im Browser gefunden`);
  } else {
    applyEpochHistoryToUi(null);
  }
} catch {
  setStatus("Datensatz wird automatisch geladen …");
  applyEpochHistoryToUi(null);
}
