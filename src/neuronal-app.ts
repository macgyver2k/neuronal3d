import { Store } from "@ngrx/store";
import { type PersistedEpochRow, type StoredModel, type StoredModelEntry, EXPECTED_LAYER_HIDDEN } from "./app/core/model.types";
import { modelMatchesExpectedLayout } from "./app/core/model-storage";
import { parseMnistCsvAsync, yieldToMain, type MnistSample } from "./data/mnist";
import { matFromColVec } from "./nn/matrix";
import { activationSlices, MLP } from "./nn/network";
import { trainLoop } from "./train/trainer";
import { Network3D } from "./viz/network3d";
import { animateLoop, createScene } from "./viz/scene";
import type { AppState } from "./app/store/app.state";
import { NeuronalActions } from "./app/store/neuronal/neuronal.actions";
import { selectNeuronalState } from "./app/store/neuronal/neuronal.selectors";
import type { NeuronalState } from "./app/store/neuronal/neuronal.state";

const LAYER_SIZES = [784, 64, 32, 10];
const HIDDEN: number[] = [...EXPECTED_LAYER_HIDDEN];
const TRAIN_DEFAULTS = {
  lr: 0.02,
  batchSize: 32,
  epochs: 1,
  vizEveryNBatches: 4,
} as const;
const METRICS_YIELD_EVERY = 150;
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
let appStore!: Store<AppState>;
let nLatest!: NeuronalState;
let net: MLP | null = null;
let net3d: Network3D | null = null;
let inferCounter = 0;
let lastInferSampleIndex = -1;
let lastInferActsDebug: number[][] | null = null;

type VizMode = "idle" | "train" | "infer";

type VizState = {
  stamp: number;
  mode: VizMode;
  activations: number[][];
};

let neuronalUiRaf: number = 0;

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
  if (nLatest.modelDropdownOpen === open) return;
  appStore.dispatch(NeuronalActions.modelDropdownSetOpen({ open }));
}

function syncModelDropdownLabel(): void {
  if (nLatest.modelCollection.models.length === 0) {
    el.modelDropdownLabelName.textContent = "Kein Modell";
    el.modelDropdownLabelMeta.textContent = "Lege ein neues Modell an";
    return;
  }
  const id = nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
  const entry = id ? nLatest.modelCollection.models.find((m) => m.id === id) : null;
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
  if (nLatest.modelCollection.models.length === 0) {
    const empty = document.createElement("div");
    empty.className = "n3-modelbar-empty";
    empty.textContent = "Keine Modelle vorhanden";
    el.modelDropdownMenu.append(empty);
    return;
  }
  const activeId = nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
  for (const entry of nLatest.modelCollection.models) {
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
    item.disabled = nLatest.training.running;
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
  const entry = nLatest.modelCollection.models.find((m) => m.id === id);
  setStatus(`${statusPrefix}: ${entry?.name ?? id}`);
  return true;
}

function renderEpochTracking(): void {
  el.epochTrackList.innerHTML = "";
  if (nLatest.epochDisplayRows.length === 0) {
    const empty = document.createElement("li");
    empty.className = "epochEmpty";
    empty.textContent = "Noch kein Training";
    el.epochTrackList.append(empty);
    return;
  }
  const rows = nLatest.epochDisplayRows.slice(-200);
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

function nextRunSeq(modelId: string, by: Record<string, PersistedEpochRow[]>): number {
  const rows = by[modelId] ?? [];
  if (rows.length === 0) return 1;
  let mx = 0;
  for (const r of rows) mx = Math.max(mx, r.run);
  return mx + 1;
}

function applyEpochHistoryToUi(modelId: string | null): void {
  appStore.dispatch(NeuronalActions.epochViewSyncFromModel({ modelId: modelId ?? "" }));
}

function clearEpochHistoryForModel(modelId: string): void {
  appStore.dispatch(NeuronalActions.epochHistoryCleared({ modelId }));
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
  const tr = nLatest.training.running;
  el.btnTrain.disabled = !hasTrain || tr;
  el.btnPause.disabled = !tr;
  el.modelSelect.disabled = tr;
  el.modelDropdownButton.disabled = tr || nLatest.modelCollection.models.length === 0;
  if (tr && nLatest.modelDropdownOpen) setModelDropdownOpen(false);
  el.btnSaveModelAs.disabled = !net || tr;
  el.btnResetModel.disabled = !net || tr;
  el.btnInferRandom.disabled = !net || !hasTest;
  el.btnInferDraw.disabled = !net;
  el.btnNewModel.disabled = tr;
  el.epochsInput.disabled = tr;
  el.lrInput.disabled = tr;
  el.batchSizeInput.disabled = tr;
  el.vizEveryInput.disabled = tr;
  for (const btn of document.querySelectorAll<HTMLButtonElement>(".epochPresetBtn")) {
    btn.disabled = tr;
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

function refreshModelSelect(): void {
  const col = nLatest.modelCollection;
  const selected = col.activeModelId ?? el.modelSelect.value;
  el.modelSelect.innerHTML = "";
  if (col.models.length === 0) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Kein Modell";
    empty.selected = true;
    el.modelSelect.append(empty);
    syncModelDropdownLabel();
    renderModelDropdownMenu();
    setModelDropdownOpen(false);
    renderModelLibrary();
    updateActiveModelPanel();
    updateRunHint();
    syncEpochPresetHighlight();
    return;
  }
  for (const entry of col.models) {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = `${entry.name} | err ${fmtPct(entry.metrics.errorRate)} | acc ${fmtPct(entry.metrics.testAcc)} | ep ${entry.metrics.epochsTrained}`;
    el.modelSelect.append(option);
  }
  if (selected && col.models.some((m) => m.id === selected)) {
    el.modelSelect.value = selected;
  } else if (col.models.length > 0) {
    el.modelSelect.value = col.models[0].id;
  }
  syncModelDropdownLabel();
  renderModelDropdownMenu();
  renderModelLibrary();
  updateActiveModelPanel();
  updateRunHint();
  syncEpochPresetHighlight();
}

function renderModelLibrary(): void {
  el.modelLibraryList.replaceChildren();
  if (nLatest.modelCollection.models.length === 0) {
    const p = document.createElement("p");
    p.className = "modelLibEmpty";
    p.textContent =
      "Noch keine Modelle. „Neues Modell“ legt einen frischen Stand an, oder Training starten erzeugt beim ersten Lauf automatisch einen Eintrag. Nur in diesem Browser.";
    el.modelLibraryList.append(p);
    return;
  }
  for (const entry of nLatest.modelCollection.models) {
    const b = document.createElement("button");
    b.type = "button";
    b.className =
      "modelLibCard" + (entry.id === nLatest.modelCollection.activeModelId ? " modelLibCard--active" : "");
    b.disabled = nLatest.training.running;
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
  if (nLatest.training.running) return;
  const ok = loadSelectedModelIntoNet(id);
  if (!ok) {
    setStatus("Stand konnte nicht ins aktive Netz geladen werden.");
    return;
  }
  const entry = nLatest.modelCollection.models.find((m) => m.id === id);
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
  const id = nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
  const entry = id ? nLatest.modelCollection.models.find((m) => m.id === id) : null;
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
  appStore.dispatch(NeuronalActions.modelEntryUpserted({ entry }));
}

async function computeDatasetMetrics(
  model: MLP,
  data: MnistSample[],
): Promise<{ accuracy: number; errorRate: number; loss: number } | null> {
  if (data.length === 0) return null;
  let lossSum = 0;
  let correct = 0;
  for (let i = 0; i < data.length; i++) {
    const s = data[i]!;
    const x = matFromColVec(s.pixels);
    const fwd = model.forward(x);
    const y = new Array<number>(10).fill(0);
    y[s.label] = 1;
    lossSum += model.crossEntropyLoss(fwd.prob, matFromColVec(y));
    if (model.predictClass(fwd.prob) === s.label) correct += 1;
    if (i > 0 && i % METRICS_YIELD_EVERY === 0) {
      await yieldToMain();
    }
  }
  const accuracy = correct / data.length;
  return { accuracy, errorRate: 1 - accuracy, loss: lossSum / data.length };
}

function loadSelectedModelIntoNet(id: string): boolean {
  const entry = nLatest.modelCollection.models.find((m) => m.id === id);
  if (!entry) return false;
  if (!modelMatchesExpectedLayout(entry.model)) return false;
  const numW = 1 + entry.model.hidden.length;
  if (entry.model.weights.length !== numW || entry.model.biases.length !== numW) return false;
  net = applyStoredModelToNet(entry.model);
  lastInferActsDebug = null;
  appStore.dispatch(NeuronalActions.activeModelIdSet({ id: entry.id }));
  publishVizState("idle", zeroActivationsForLayout());
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
        const parsed = await parseMnistCsvAsync(text);
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
        const parsed = await parseMnistCsvAsync(text);
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

export function bootstrapNeuronalApp(store: Store<AppState>): () => void {
  appStore = store;
  el = bindEl();
  const unSubN = appStore.select(selectNeuronalState).subscribe((n: NeuronalState) => {
    nLatest = n;
    el.modelDropdownButton.setAttribute("aria-expanded", n.modelDropdownOpen ? "true" : "false");
    el.modelDropdownMenu.hidden = !n.modelDropdownOpen;
    el.btnPause.textContent = n.training.pause ? "Fortsetzen" : "Anhalten";
    if (n.training.running && n.modelDropdownOpen) {
      appStore.dispatch(NeuronalActions.modelDropdownSetOpen({ open: false }));
      return;
    }
    if (neuronalUiRaf !== 0) {
      cancelAnimationFrame(neuronalUiRaf);
    }
    neuronalUiRaf = requestAnimationFrame(() => {
      neuronalUiRaf = 0;
      updateButtons();
      renderEpochTracking();
      refreshModelSelect();
    });
  });
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
    appStore.dispatch(NeuronalActions.trainingPauseToggled());
  });

  el.modelDropdownButton.addEventListener("click", () => {
    if (el.modelDropdownButton.disabled) return;
    setModelDropdownOpen(!nLatest.modelDropdownOpen);
  });

  el.modelSelect.addEventListener("change", () => {
    if (nLatest.training.running) return;
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
    if (nLatest.training.running) return;
    const fresh = new MLP(784, HIDDEN, 10);
    net = fresh;
    lastInferActsDebug = null;
    appStore.dispatch(NeuronalActions.lastTrainMetricsReset());
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
    setStatus(`Neues Modell: ${nLatest.modelCollection.models.find((m) => m.id === id)?.name ?? id}`);
  });

  el.btnSaveModelAs.addEventListener("click", () => {
    if (!net) return;
    const name = (window.prompt("Name für den neuen Modellstand:", defaultModelName()) ?? "").trim();
    if (!name) return;
    const n = net;
    void (async () => {
      const now = new Date().toISOString();
      const testMetrics = await computeDatasetMetrics(n, testData);
      upsertModelEntry({
        id: crypto.randomUUID(),
        name,
        createdAt: now,
        updatedAt: now,
        model: cloneStoredModel(n),
        metrics: {
          lastLoss: nLatest.lastTrainLoss,
          lastBatchAcc: nLatest.lastTrainBatchAcc,
          testAcc: testMetrics ? testMetrics.accuracy : null,
          errorRate: testMetrics ? testMetrics.errorRate : null,
          epochsTrained: 0,
        },
      });
      setStatus(`Neuer Modellstand gespeichert: ${name}`);
    })();
  });

  el.btnResetModel.addEventListener("click", () => {
    if (nLatest.training.running) return;
    const currentId = nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
    if (!currentId) return;
    const currentEntry = nLatest.modelCollection.models.find((m) => m.id === currentId);
    if (!currentEntry) return;
    const fresh = new MLP(784, HIDDEN, 10);
    net = fresh;
    lastInferActsDebug = null;
    appStore.dispatch(NeuronalActions.lastTrainMetricsReset());
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
      await new Promise<void>((r) => {
        setTimeout(r, 0);
      });
      if (trainData.length === 0) return;
      const trainCfg = getTrainConfig();
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
      const trainModelId = nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
      if (!trainModelId) {
        return;
      }
      appStore.dispatch(NeuronalActions.lastTrainMetricsReset());
      const t0 = Date.now();
      const t0s = new Date(t0).toISOString();
      const run = nextRunSeq(trainModelId, nLatest.epochByModelId);
      appStore.dispatch(
        NeuronalActions.trainingStarted({
          modelId: trainModelId,
          run,
          runStartedAt: t0s,
          runStartedMs: t0,
        }),
      );
      el.btnPause.textContent = "Anhalten";
      await new Promise<void>((r) => {
        setTimeout(r, 0);
      });
      publishVizState("train", zeroActivationsForLayout());
      const runMetrics = await trainLoop(
        net!,
        trainData,
        trainCfg,
        (s) => {
          setTimeout(() => {
            if (net) publishVizState("train", s.activations);
            setStatus(
              `Ep ${fmtInt(s.epoch + 1, 3)}  Batch ${fmtInt(s.batchIndex, 5)}  loss ${fmtFloat(s.loss, 8, 4)}  acc ${fmtFloat(s.trainAccBatch * 100, 6, 1)}%`,
            );
          }, 0);
        },
        (ep) => {
          const row: PersistedEpochRow = {
            ...ep,
            run,
            savedAt: new Date().toISOString(),
            runStartedAt: t0s,
            runElapsedMs: Date.now() - t0,
          };
          appStore.dispatch(NeuronalActions.trainingEpochAppended({ modelId: trainModelId, row }));
        },
        () => nLatest.training.pause,
        () => nLatest.training.shouldStop,
      );
      appStore.dispatch(NeuronalActions.trainingFinished(runMetrics));
      if (net) {
        const testMetrics = await computeDatasetMetrics(net, testData);
        const currentId = nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
        const currentEntry = currentId ? nLatest.modelCollection.models.find((m) => m.id === currentId) : null;
        if (currentEntry) {
          upsertModelEntry({
            ...currentEntry,
            updatedAt: new Date().toISOString(),
            model: cloneStoredModel(net),
            metrics: {
              lastLoss: runMetrics.lastTrainLoss,
              lastBatchAcc: runMetrics.lastTrainBatchAcc,
              testAcc: testMetrics ? testMetrics.accuracy : currentEntry.metrics.testAcc,
              errorRate: testMetrics ? testMetrics.errorRate : currentEntry.metrics.errorRate,
              epochsTrained: currentEntry.metrics.epochsTrained + trainCfg.epochs,
            },
          });
        }
      }
      if (net) publishVizState("idle", zeroActivationsForLayout());
      const act = nLatest.modelCollection.activeModelId
        ? nLatest.modelCollection.models.find((m) => m.id === nLatest.modelCollection.activeModelId)
        : null;
      setStatus(
        `Training beendet | aktiv: ${act?.name ?? "-"} | loss ${fmtFloat(runMetrics.lastTrainLoss, 8, 4)} | batch-acc ${fmtFloat(runMetrics.lastTrainBatchAcc * 100, 6, 2)}% | err ${fmtPct(act?.metrics.errorRate ?? null)} | acc ${fmtPct(act?.metrics.testAcc ?? null)}`,
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
    appStore.dispatch(NeuronalActions.trainingStopRequested());
    stopAnimCleanup?.();
    net3d?.dispose();
    disposeSceneBound?.();
  };
  window.addEventListener("beforeunload", onBeforeUnload);

  setStatus("MNIST wird geladen …");
  updateButtons();
  void loadCsvData();
  try {
    const toLoad = nLatest.modelCollection.activeModelId;
    if (toLoad && loadSelectedModelIntoNet(toLoad)) {
      const entry = nLatest.modelCollection.models.find((m) => m.id === toLoad);
      setStatus(`Modell aus Browser-Speicher geladen: ${entry?.name ?? toLoad}`);
    } else if (nLatest.modelCollection.models.length > 0) {
      setStatus(`${nLatest.modelCollection.models.length} Modellstände im Browser gefunden`);
    }
  } catch {
    setStatus("MNIST wird geladen …");
  }

  return () => {
    if (neuronalUiRaf !== 0) {
      cancelAnimationFrame(neuronalUiRaf);
      neuronalUiRaf = 0;
    }
    appStore.dispatch(NeuronalActions.trainingStopRequested());
    unSubN.unsubscribe();
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
