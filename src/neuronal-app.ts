import { parseMnistCsv, type MnistSample } from "./data/mnist";
import { matFromColVec } from "./nn/matrix";
import { activationSlices, MLP } from "./nn/network";
import { trainLoop, type TrainEpochSummary } from "./train/trainer";
import { Network3D } from "./viz/network3d";
import { animateLoop, createScene } from "./viz/scene";

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
const VIZ_DEBUG_INFER =
  typeof globalThis.location !== "undefined" &&
  new URLSearchParams(globalThis.location.search).has("vizdebug");

const MNIST_TRAIN_CSV = "/data/csv/mnist_train.csv";
const MNIST_TEST_CSV = "/data/csv/mnist_test.csv";
const MNIST_LABEL = "MNIST";

type ElRefs = {
  app: HTMLElement;
  dockTrain: HTMLElement;
  dockInfer: HTMLElement;
  btnNewModel: HTMLButtonElement;
  btnTrain: HTMLButtonElement;
  btnPause: HTMLButtonElement;
  modelSelect: HTMLSelectElement;
  modelDropdownButton: HTMLButtonElement;
  modelDropdownLabel: HTMLSpanElement;
  modelDropdownLabelName: HTMLSpanElement;
  modelDropdownLabelMeta: HTMLSpanElement;
  modelDropdownMenu: HTMLDivElement;
  modelLibraryList: HTMLDivElement;
  activeModelTitle: HTMLParagraphElement;
  activeModelDetail: HTMLParagraphElement;
  inferModelContext: HTMLParagraphElement;
  datasetRibbon: HTMLParagraphElement;
  epochStepHint: HTMLParagraphElement;
  btnSaveModelAs: HTMLButtonElement;
  btnResetModel: HTMLButtonElement;
  epochsInput: HTMLInputElement;
  lrInput: HTMLInputElement;
  batchSizeInput: HTMLInputElement;
  vizEveryInput: HTMLInputElement;
  btnInferRandom: HTMLButtonElement;
  btnInferDraw: HTMLButtonElement;
  btnClearDraw: HTMLButtonElement;
  status: HTMLSpanElement;
  epochTrackList: HTMLUListElement;
  viz: HTMLElement;
  drawCanvas: HTMLCanvasElement;
};

let el!: ElRefs;
let ctx2d!: CanvasRenderingContext2D;
const canvasLineWidthDraw = 14;
const canvasLineWidthErase = 32;

function bindEl(): ElRefs {
  const m = <T extends HTMLElement>(id: string) => {
    const e = document.getElementById(id);
    if (!e) throw new Error(`#${id}`);
    return e as T;
  };
  return {
    app: m("app"),
    dockTrain: m("dockTrain"),
    dockInfer: m("dockInfer"),
    btnNewModel: m("btnNewModel"),
    btnTrain: m("btnTrain"),
    btnPause: m("btnPause"),
    modelSelect: m("modelSelect"),
    modelDropdownButton: m("modelDropdownButton"),
    modelDropdownLabel: m("modelDropdownLabel"),
    modelDropdownLabelName: m("modelDropdownLabelName"),
    modelDropdownLabelMeta: m("modelDropdownLabelMeta"),
    modelDropdownMenu: m("modelDropdownMenu"),
    modelLibraryList: m("modelLibraryList"),
    activeModelTitle: m("activeModelTitle"),
    activeModelDetail: m("activeModelDetail"),
    inferModelContext: m("inferModelContext"),
    datasetRibbon: m("datasetRibbon"),
    epochStepHint: m("epochStepHint"),
    btnSaveModelAs: m("btnSaveModelAs"),
    btnResetModel: m("btnResetModel"),
    epochsInput: m("epochsInput"),
    lrInput: m("lrInput"),
    batchSizeInput: m("batchSizeInput"),
    vizEveryInput: m("vizEveryInput"),
    btnInferRandom: m("btnInferRandom"),
    btnInferDraw: m("btnInferDraw"),
    btnClearDraw: m("btnClearDraw"),
    status: m("status"),
    epochTrackList: m("epochTrackList"),
    viz: m("viz"),
    drawCanvas: m("drawCanvas"),
  };
}

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
let modelDropdownOpen = false;
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
function setStatus(t: string): void {
  el.status.textContent = t;
}

function setModelDropdownOpen(open: boolean): void {
  modelDropdownOpen = open;
  el.modelDropdownButton.setAttribute("aria-expanded", open ? "true" : "false");
  el.modelDropdownMenu.hidden = !open;
}

function syncModelDropdownLabel(): void {
  if (modelStore.models.length === 0) {
    el.modelDropdownLabelName.textContent = "Kein Modell";
    el.modelDropdownLabelMeta.textContent = "Lege ein neues Modell an";
    return;
  }
  const id = activeModelId ?? el.modelSelect.value;
  const entry = id ? modelStore.models.find((m) => m.id === id) : null;
  if (!entry) {
    el.modelDropdownLabelName.textContent = "Modell wählen";
    el.modelDropdownLabelMeta.textContent = "";
    return;
  }
  el.modelDropdownLabelName.textContent = entry.name;
  el.modelDropdownLabelMeta.textContent =
    `${entry.metrics.epochsTrained} Ep · Acc ${fmtPct(entry.metrics.testAcc)} · Err ${fmtPct(entry.metrics.errorRate)}`;
}

function renderModelDropdownMenu(): void {
  el.modelDropdownMenu.replaceChildren();
  if (modelStore.models.length === 0) {
    const empty = document.createElement("div");
    empty.className = "n3-modelbar-empty";
    empty.textContent = "Keine Modelle vorhanden";
    el.modelDropdownMenu.append(empty);
    return;
  }
  const activeId = activeModelId ?? el.modelSelect.value;
  for (const entry of modelStore.models) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "n3-modelbar-option" + (entry.id === activeId ? " n3-modelbar-option--active" : "");
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", entry.id === activeId ? "true" : "false");
    const name = document.createElement("span");
    name.className = "n3-modelbar-option-name";
    name.textContent = entry.name;
    const meta = document.createElement("span");
    meta.className = "n3-modelbar-option-meta";
    const chipEp = document.createElement("span");
    chipEp.className = "n3-modelbar-chip";
    chipEp.textContent = `${entry.metrics.epochsTrained} Ep`;
    const chipAcc = document.createElement("span");
    chipAcc.className = "n3-modelbar-chip";
    chipAcc.textContent = `Acc ${fmtPct(entry.metrics.testAcc)}`;
    const chipErr = document.createElement("span");
    chipErr.className = "n3-modelbar-chip";
    chipErr.textContent = `Err ${fmtPct(entry.metrics.errorRate)}`;
    meta.append(chipEp, chipAcc, chipErr);
    item.append(name, meta);
    item.disabled = trainingRunning;
    item.addEventListener("click", () => {
      if (selectModelById(entry.id, "Aktives Modell")) {
        setModelDropdownOpen(false);
      }
    });
    el.modelDropdownMenu.append(item);
  }
}

function selectModelById(id: string, statusPrefix = "Aktiv"): boolean {
  if (!id) return false;
  if (!loadSelectedModelIntoNet(id)) {
    setStatus("Modell konnte nicht geladen werden.");
    return false;
  }
  const entry = modelStore.models.find((m) => m.id === id);
  setStatus(`${statusPrefix}: ${entry?.name ?? id}`);
  return true;
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
          typeof o["epoch"] !== "number" ||
          typeof o["loss"] !== "number" ||
          typeof o["trainAcc"] !== "number"
        ) {
          continue;
        }
        norm.push({
          epoch: o["epoch"] as number,
          loss: o["loss"] as number,
          trainAcc: o["trainAcc"] as number,
          savedAt: typeof o["savedAt"] === "string" ? (o["savedAt"] as string) : "",
          run: typeof o["run"] === "number" ? (o["run"] as number) : 0,
          runStartedAt: typeof o["runStartedAt"] === "string" ? (o["runStartedAt"] as string) : "",
          runElapsedMs: typeof o["runElapsedMs"] === "number" ? (o["runElapsedMs"] as number) : 0,
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
  el.btnTrain.disabled = !hasTrain || trainingRunning;
  el.btnPause.disabled = !trainingRunning;
  el.modelSelect.disabled = trainingRunning;
  el.modelDropdownButton.disabled = trainingRunning || modelStore.models.length === 0;
  if (trainingRunning) setModelDropdownOpen(false);
  el.btnSaveModelAs.disabled = !net || trainingRunning;
  el.btnResetModel.disabled = !net || trainingRunning;
  el.btnInferRandom.disabled = !net || !hasTest;
  el.btnInferDraw.disabled = !net;
  el.btnNewModel.disabled = trainingRunning;
  el.epochsInput.disabled = trainingRunning;
  el.lrInput.disabled = trainingRunning;
  el.batchSizeInput.disabled = trainingRunning;
  el.vizEveryInput.disabled = trainingRunning;
  for (const btn of document.querySelectorAll<HTMLButtonElement>(".epochPresetBtn")) {
    btn.disabled = trainingRunning;
  }
  syncEpochPresetHighlight();
  updateRunHint();
  updateActiveModelPanel();
  renderModelDropdownMenu();
  syncModelDropdownLabel();
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
  if (modelStore.models.length === 0) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Kein Modell";
    empty.selected = true;
    el.modelSelect.append(empty);
    applyEpochHistoryToUi(null);
    syncModelDropdownLabel();
    renderModelDropdownMenu();
    setModelDropdownOpen(false);
    renderModelLibrary();
    updateActiveModelPanel();
    updateRunHint();
    syncEpochPresetHighlight();
    return;
  }
  for (const entry of modelStore.models) {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = `${entry.name} | err ${fmtPct(entry.metrics.errorRate)} | acc ${fmtPct(entry.metrics.testAcc)} | ep ${entry.metrics.epochsTrained}`;
    el.modelSelect.append(option);
  }
  if (selected && modelStore.models.some((m) => m.id === selected)) {
    el.modelSelect.value = selected;
  } else if (modelStore.models.length > 0) {
    el.modelSelect.value = modelStore.models[0].id;
  }
  applyEpochHistoryToUi(el.modelSelect.value || null);
  syncModelDropdownLabel();
  renderModelDropdownMenu();
  renderModelLibrary();
  updateActiveModelPanel();
  updateRunHint();
  syncEpochPresetHighlight();
}

function renderModelLibrary(): void {
  el.modelLibraryList.replaceChildren();
  if (modelStore.models.length === 0) {
    const p = document.createElement("p");
    p.className = "modelLibEmpty";
    p.textContent =
      "Noch keine Modelle. „Neues Modell“ legt einen frischen Stand an, oder Training starten erzeugt beim ersten Lauf automatisch einen Eintrag. Nur in diesem Browser.";
    el.modelLibraryList.append(p);
    return;
  }
  for (const entry of modelStore.models) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "modelLibCard" + (entry.id === activeModelId ? " modelLibCard--active" : "");
    b.disabled = trainingRunning;
    const name = document.createElement("span");
    name.className = "modelLibCardName";
    name.textContent = entry.name;
    const meta = document.createElement("span");
    meta.className = "modelLibCardMeta";
    meta.textContent = `${entry.metrics.epochsTrained} Ep. gesamt · Test ${fmtPct(entry.metrics.testAcc)} · ${formatTimeLabel(entry.updatedAt)}`;
    b.append(name, meta);
    b.addEventListener("click", () => {
      activateModelFromLibrary(entry.id);
    });
    el.modelLibraryList.append(b);
  }
}

function activateModelFromLibrary(id: string): void {
  if (trainingRunning) return;
  const ok = loadSelectedModelIntoNet(id);
  if (!ok) {
    setStatus("Stand konnte nicht ins aktive Netz geladen werden.");
    return;
  }
  const entry = modelStore.models.find((m) => m.id === id);
  setStatus(
    `Aktiv: ${entry?.name ?? id} · Test-Treffer ${fmtPct(entry?.metrics.testAcc ?? null)} · Fehlerquote ${fmtPct(entry?.metrics.errorRate ?? null)}`,
  );
}

function updateActiveModelPanel(): void {
  if (!net) {
    el.activeModelTitle.textContent = "Noch kein Netz geladen";
    el.activeModelDetail.textContent =
      "Bibliothek: Karte wählen — oder „Training starten“ ohne vorherigen Stand legt automatisch einen ersten Stand an.";
    el.inferModelContext.textContent = "Kein aktives Modell — zuerst ein Modell wählen oder anlegen.";
    return;
  }
  const id = activeModelId ?? el.modelSelect.value;
  const entry = id ? modelStore.models.find((m) => m.id === id) : null;
  if (entry) {
    el.activeModelTitle.textContent = entry.name;
    el.activeModelDetail.textContent = `Test ${fmtPct(entry.metrics.testAcc)} · Fehlerquote ${fmtPct(entry.metrics.errorRate)} · ${entry.metrics.epochsTrained} trainierte Epochen (Summe) · zuletzt ${formatTimeLabel(entry.updatedAt)}`;
    el.inferModelContext.textContent = `Inferenz nutzt: ${entry.name} · ${entry.metrics.epochsTrained} Epochen gesamt · Test ${fmtPct(entry.metrics.testAcc)}`;
  } else {
    el.activeModelTitle.textContent = "Netz im Arbeitsspeicher";
    el.activeModelDetail.textContent = "Kein passender Eintrag in der Bibliothek gefunden.";
    el.inferModelContext.textContent = "Inferenz nutzt das Netz im Arbeitsspeicher (ohne Bibliothekseintrag).";
  }
}

function updateDatasetRibbon(): void {
  if (trainData.length === 0 && testData.length === 0) {
    el.datasetRibbon.textContent = `${MNIST_LABEL}: Train 0 · Test 0 — warten auf erfolgreichen Abruf (Statuszeile).`;
    return;
  }
  if (trainData.length === 0) {
    el.datasetRibbon.textContent = `${MNIST_LABEL}: Trainingsdaten fehlen · Test ${testData.length}.`;
    return;
  }
  if (testData.length === 0) {
    el.datasetRibbon.textContent = `${MNIST_LABEL}: Train ${trainData.length} · Testdaten fehlen.`;
    return;
  }
  el.datasetRibbon.textContent = `${MNIST_LABEL}: ${trainData.length} Train-Bilder · ${testData.length} Test-Bilder bereit.`;
}

function updateRunHint(): void {
  const bs = parseIntInRange(el.batchSizeInput.value, TRAIN_DEFAULTS.batchSize, 1, 512);
  const ep = parseIntInRange(el.epochsInput.value, TRAIN_DEFAULTS.epochs, 1, 200);
  const n = trainData.length;
  if (n <= 0) {
    el.epochStepHint.textContent = "Sobald Trainingsdaten geladen sind, erscheint hier die ungefähre Anzahl Gradientenschritte.";
    return;
  }
  const per = Math.max(1, Math.ceil(n / bs));
  const total = per * ep;
  el.epochStepHint.textContent = `Bei Batchgröße ${bs}: rund ${per} Schritte pro Epoche, etwa ${total} für ${ep} Epoche(n).`;
}

function syncEpochPresetHighlight(): void {
  const ep = parseIntInRange(el.epochsInput.value, TRAIN_DEFAULTS.epochs, 1, 200);
  const presets = new Set([1, 3, 10, 30]);
  for (const btn of document.querySelectorAll<HTMLButtonElement>(".epochPresetBtn")) {
    const v = Number.parseInt(btn.dataset["epochs"] ?? "", 10);
    btn.classList.toggle("epochPresetBtn--active", presets.has(ep) && v === ep);
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
  refreshModelSelect();
  publishVizState("idle", zeroActivationsForLayout());
  updateButtons();
  return true;
}

function zeroActivationsForLayout(): number[][] {
  return LAYER_SIZES.map((n) => new Array<number>(n).fill(0));
}

async function loadCsvData(): Promise<void> {
  const trainSources = [MNIST_TRAIN_CSV];
  const testSources = [MNIST_TEST_CSV];
  try {
    setStatus(`${MNIST_LABEL}: Train-CSV wird geladen …`);
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
    setStatus(`${MNIST_LABEL}: Train geladen (${trainData.length} Zeilen)`);
  } catch (e) {
    setStatus(`${MNIST_LABEL}: Fehler Train-CSV: ${e}`);
    trainData = [];
  }
  try {
    setStatus(`${MNIST_LABEL}: Test-CSV wird geladen …`);
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
    setStatus(`${MNIST_LABEL}: Train ${trainData.length} | Test ${testData.length} geladen`);
  } catch (e) {
    setStatus(`${MNIST_LABEL}: Fehler Test-CSV: ${e}`);
    testData = [];
  }
  lastInferSampleIndex = -1;
  updateDatasetRibbon();
  updateButtons();
}

let renderSceneBound: () => void = () => {};
let disposeSceneBound: (() => void) | null = null;
let stopAnimCleanup: (() => void) | null = null;

function renderFrame(): void {
  renderSceneBound();
}

let vizStampCounter = 0;
let lastAppliedVizStamp = 0;
let pendingVizState: VizState | null = null;

function publishVizState(mode: VizMode, activations: number[][]): void {
  pendingVizState = {
    stamp: ++vizStampCounter,
    mode,
    activations: activations.map((a) => [...a]),
  };
  if (flushVizState() && net3d && net) {
    net3d.setWeights(net.weights);
  }
}

function flushVizState(): boolean {
  if (!net3d || !pendingVizState) return false;
  if (pendingVizState.stamp === lastAppliedVizStamp) return false;
  net3d.setIdleDim(pendingVizState.mode === "idle");
  if (pendingVizState.mode !== "infer") net3d.setInferResult(null, null);
  net3d.setEdgeFocus(
    pendingVizState.mode === "infer" ? "infer" : (pendingVizState.mode === "train" ? "trainRecent" : "off"),
    pendingVizState.mode === "infer" ? pendingVizState.activations : null,
  );
  net3d.setActivations(pendingVizState.activations);
  lastAppliedVizStamp = pendingVizState.stamp;
  return true;
}

function tickViz(): void {
  if (flushVizState() && net3d && net) {
    net3d.setWeights(net.weights);
  }
}


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

export function bootstrapNeuronalApp(): () => void {
  el = bindEl();
  setModelDropdownOpen(false);
  const ctxDraw = el.drawCanvas.getContext("2d");
  if (!ctxDraw) throw new Error("canvas");
  ctx2d = ctxDraw;
  ctx2d.fillStyle = "#000000";
  ctx2d.fillRect(0, 0, el.drawCanvas.width, el.drawCanvas.height);
  ctx2d.lineWidth = canvasLineWidthDraw;
  ctx2d.lineCap = "round";
  ctx2d.lineJoin = "round";
  ctx2d.strokeStyle = "#ffffff";

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

  const { scene, controls, render, dispose } = createScene(el.viz);
  renderSceneBound = render;
  disposeSceneBound = dispose;
  const net3dInst = new Network3D(LAYER_SIZES);
  net3d = net3dInst;
  scene.add(net3dInst.root);
  stopAnimCleanup = animateLoop(render, controls, tickViz);

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
    el.btnPause.textContent = pauseTraining ? "Fortsetzen" : "Anhalten";
  });

  el.modelDropdownButton.addEventListener("click", () => {
    if (el.modelDropdownButton.disabled) return;
    setModelDropdownOpen(!modelDropdownOpen);
  });

  el.modelSelect.addEventListener("change", () => {
    if (trainingRunning) return;
    const id = el.modelSelect.value;
    if (!id) return;
    selectModelById(id, "Aktives Modell");
  });

  const onDocPointerDown = (ev: PointerEvent) => {
    const t = ev.target;
    if (!(t instanceof Node)) return;
    if (
      t === el.modelDropdownButton ||
      el.modelDropdownButton.contains(t) ||
      el.modelDropdownMenu.contains(t)
    ) {
      return;
    }
    setModelDropdownOpen(false);
  };
  document.addEventListener("pointerdown", onDocPointerDown);

  const onDocKeydown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") setModelDropdownOpen(false);
  };
  document.addEventListener("keydown", onDocKeydown);

  el.btnNewModel.addEventListener("click", () => {
    if (trainingRunning) return;
    const fresh = new MLP(784, HIDDEN, 10);
    net = fresh;
    lastTrainLoss = 0;
    lastTrainBatchAcc = 0;
    lastInferActsDebug = null;
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    upsertModelEntry({
      id,
      name: defaultModelName(),
      createdAt: now,
      updatedAt: now,
      model: cloneStoredModel(fresh),
      metrics: {
        lastLoss: 0,
        lastBatchAcc: 0,
        testAcc: null,
        errorRate: null,
        epochsTrained: 0,
      },
    });
    applyEpochHistoryToUi(id);
    publishVizState("idle", zeroActivationsForLayout());
    setStatus(`Neues Modell: ${modelStore.models.find((m) => m.id === id)?.name ?? id}`);
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
      el.btnPause.textContent = "Anhalten";
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

  el.epochsInput.addEventListener("input", () => {
    syncEpochPresetHighlight();
    updateRunHint();
  });
  el.batchSizeInput.addEventListener("input", () => {
    updateRunHint();
  });
  for (const btn of document.querySelectorAll<HTMLButtonElement>(".epochPresetBtn")) {
    btn.addEventListener("click", () => {
      const raw = btn.dataset["epochs"];
      if (!raw) return;
      const n = Number.parseInt(raw, 10);
      if (!Number.isFinite(n)) return;
      el.epochsInput.value = String(Math.min(200, Math.max(1, n)));
      syncEpochPresetHighlight();
      updateRunHint();
    });
  }

  const onBeforeUnload = () => {
    stopTraining = true;
    stopAnimCleanup?.();
    net3d?.dispose();
    disposeSceneBound?.();
  };
  window.addEventListener("beforeunload", onBeforeUnload);

  setStatus("MNIST wird geladen …");
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
    setStatus("MNIST wird geladen …");
    applyEpochHistoryToUi(null);
  }

  return () => {
    stopTraining = true;
    document.removeEventListener("pointerdown", onDocPointerDown);
    document.removeEventListener("keydown", onDocKeydown);
    window.removeEventListener("beforeunload", onBeforeUnload);
    stopAnimCleanup?.();
    net3d?.dispose();
    disposeSceneBound?.();
    net3d = null;
    stopAnimCleanup = null;
    disposeSceneBound = null;
    renderSceneBound = () => {};
  };
}
