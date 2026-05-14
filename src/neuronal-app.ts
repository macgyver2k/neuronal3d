import { Store } from '@ngrx/store';
import { createFreshStoredModelEntry } from './app/core/create-fresh-model-entry';
import { modelMatchesExpectedLayout } from './app/core/model-storage';
import {
  EXPECTED_LAYER_HIDDEN,
  type PersistedEpochRow,
  type StoredModel,
  type StoredModelEntry,
} from './app/core/model.types';
import { NeuronalAppInstance } from './app/core/neuronal-app-instance';
import { NeuronalEpochsIdbService } from './app/core/neuronal-epochs-idb.service';
import { NeuronalModelsIdbService } from './app/core/neuronal-models-idb.service';
import type { AppState } from './app/store/app.state';
import { NeuronalActions } from './app/store/neuronal/neuronal.actions';
import { selectNeuronalState } from './app/store/neuronal/neuronal.selectors';
import type { NeuronalState } from './app/store/neuronal/neuronal.state';
import {
  drawMnistPixelsOntoCanvas,
  fetchCsvText,
  MNIST_PIXEL_COUNT,
  parseMnistCsvAsync,
  yieldToMain,
  type MnistSample,
} from './data/mnist';
import { matFromColVec } from './nn/matrix';
import { activationSlices, MLP } from './nn/network';
import { trainLoop } from './train/trainer';
import {
  HIDDEN_LAYER_VIZ_LAYOUTS,
  INPUT_LAYER_VIZ_LAYOUTS,
  Network3D,
  type HiddenLayerVizLayout,
  type InputLayerVizLayout,
} from './viz/network3d';
import { animateLoop, createScene } from './viz/scene';
import {
  isValidHexColor6,
  type VizLightColorSettings,
  type VizNetworkColorSettings,
  type VizPostProcessSettings,
  type VizSceneColorSettings,
} from './viz/viz-appearance';

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
  typeof globalThis.location !== 'undefined' &&
  new URLSearchParams(globalThis.location.search).has('vizdebug');

const MNIST_TRAIN_CSV = 'data/csv/mnist_train.csv.gz';
const MNIST_TEST_CSV = 'data/csv/mnist_test.csv.gz';
const MNIST_LABEL = 'MNIST';

type ElRefs = {
  app: HTMLElement;
  dockTrain: HTMLElement;
  dockInfer: HTMLElement;
  btnNewModel: HTMLButtonElement;
  btnTrain: HTMLButtonElement;
  btnPause: HTMLButtonElement;
  modelSelect: HTMLSelectElement;
  modelDropdownButton: HTMLButtonElement;
  modelDropdownMenu: HTMLDivElement;
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
  btnTestCarousel: HTMLButtonElement;
  btnInferDraw: HTMLButtonElement;
  btnClearDraw: HTMLButtonElement;
  status: HTMLSpanElement;
  viz: HTMLElement;
  drawCanvas: HTMLCanvasElement;
};

let el!: ElRefs;
let ctx2d!: CanvasRenderingContext2D;
/** Zeichen-Canvas: Bitmap exakt MNIST 28×28 (1 Pixel = 1 Eingabe); Anzeige skaliert per CSS. */
const MNIST_DRAW_GRID = 28;

/** UI-Stufe 1…7: Stift-Chebyshev-Radius = `stufe − 1` (0…6), Radierer = Stift + 1 (max. 6). */
const INFER_DRAW_BRUSH_SIZE_MIN = 1;
const INFER_DRAW_BRUSH_SIZE_MAX = 7;
let inferDrawBrushSize = 4;

function drawPenChebRFromBrushSize(): number {
  return Math.min(6, Math.max(0, inferDrawBrushSize - 1));
}

function drawEraserChebRFromBrushSize(): number {
  return Math.min(6, drawPenChebRFromBrushSize() + 1);
}

/** Referenz-Canvas-Kante (früher 320px) — weiche Pinselradien skalieren davon auf aktuelle `drawCanvas`-Größe. */
const SOFT_DAB_REF_SIDE = 320;

function inferDrawBrushSoftScale(): number {
  return 0.52 + inferDrawBrushSize * 0.11;
}

function drawCanvasMinSide(): number {
  return Math.min(el.drawCanvas.width, el.drawCanvas.height);
}

function softPenDabRadius(): number {
  return (
    Math.max(2, (36 * drawCanvasMinSide()) / SOFT_DAB_REF_SIDE) *
    inferDrawBrushSoftScale()
  );
}

function softEraserDabRadius(): number {
  return (
    Math.max(2.2, (42 * drawCanvasMinSide()) / SOFT_DAB_REF_SIDE) *
    inferDrawBrushSoftScale()
  );
}

function softDabStepPx(): number {
  const base = Math.max(0.3, (2.5 * drawCanvasMinSide()) / SOFT_DAB_REF_SIDE);
  return base / Math.sqrt(inferDrawBrushSoftScale());
}

export type InferDrawBrushMode = 'pixels' | 'soft';

let inferDrawBrushMode: InferDrawBrushMode = 'pixels';

function bindFromHost(root: HTMLElement): ElRefs {
  const m = <T extends HTMLElement>(id: string) => {
    let e: T | null =
      root.id === id
        ? (root as T)
        : (root.querySelector(`#${CSS.escape(id)}`) as T | null);
    if (!e) e = document.getElementById(id) as T | null;
    if (!e) throw new Error(`#${id}`);
    return e;
  };
  return {
    app: m('app'),
    dockTrain: m('dockTrain'),
    dockInfer: m('dockInfer'),
    btnNewModel: m('btnNewModel'),
    btnTrain: m('btnTrain'),
    btnPause: m('btnPause'),
    modelSelect: m('modelSelect'),
    modelDropdownButton: m('modelDropdownButton'),
    modelDropdownMenu: m('modelDropdownMenu'),
    activeModelTitle: m('activeModelTitle'),
    activeModelDetail: m('activeModelDetail'),
    inferModelContext: m('inferModelContext'),
    datasetRibbon: m('datasetRibbon'),
    epochStepHint: m('epochStepHint'),
    btnSaveModelAs: m('btnSaveModelAs'),
    btnResetModel: m('btnResetModel'),
    epochsInput: m('epochsInput'),
    lrInput: m('lrInput'),
    batchSizeInput: m('batchSizeInput'),
    vizEveryInput: m('vizEveryInput'),
    btnInferRandom: m('btnInferRandom'),
    btnTestCarousel: m('btnTestCarousel'),
    btnInferDraw: m('btnInferDraw'),
    btnClearDraw: m('btnClearDraw'),
    status: m('status'),
    viz: m('viz'),
    drawCanvas: m('drawCanvas'),
  };
}

let trainData: MnistSample[] = [];
let testData: MnistSample[] = [];

export function getMnistTrainSampleCount(): number {
  return trainData.length;
}

export function getMnistTrainSampleAt(index: number): MnistSample | null {
  if (!Number.isFinite(index)) return null;
  const i = Math.floor(index);
  if (i < 0 || i >= trainData.length) return null;
  return trainData[i]!;
}
let appStore!: Store<AppState>;

export type ReconcileWorkspaceUrlForModelSelection = (
  selectedModelId: string,
) => string | null;

let reconcileWorkspaceUrlForModelSelection:
  | ReconcileWorkspaceUrlForModelSelection
  | undefined;
let nLatest!: NeuronalState;
let net: MLP | null = null;
let net3d: Network3D | null = null;
let inferCounter = 0;
let lastInferSampleIndex = -1;
let lastInferActsDebug: number[][] | null = null;

type VizMode = 'idle' | 'train' | 'infer';

type VizState = {
  stamp: number;
  mode: VizMode;
  activations: number[][];
};

let neuronalUiRaf: number = 0;

let drawing = false;
let liveCanvasInferRaf: number | null = null;
let liveInferLastRun = 0;
const LIVE_INFER_MIN_MS = 48;
function canvasPos(ev: PointerEvent): { x: number; y: number } {
  const r = el.drawCanvas.getBoundingClientRect();
  const sx = el.drawCanvas.width / r.width;
  const sy = el.drawCanvas.height / r.height;
  return { x: (ev.clientX - r.left) * sx, y: (ev.clientY - r.top) * sy };
}

let drawLastCell: { gx: number; gy: number } | null = null;
let drawLastSoftPoint: { x: number; y: number } | null = null;
let drawSoftIsPen = true;
let drawInk = '#ffffff';
let drawBrushChebR = 0;

export function setInferDrawBrushModeGlobal(m: InferDrawBrushMode): void {
  inferDrawBrushMode = m;
  drawing = false;
  drawLastCell = null;
  drawLastSoftPoint = null;
}

export function getInferDrawBrushModeGlobal(): InferDrawBrushMode {
  return inferDrawBrushMode;
}

export function setInferDrawBrushSizeGlobal(n: number): void {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return;
  inferDrawBrushSize = Math.min(
    INFER_DRAW_BRUSH_SIZE_MAX,
    Math.max(INFER_DRAW_BRUSH_SIZE_MIN, v),
  );
}

export function getInferDrawBrushSizeGlobal(): number {
  return inferDrawBrushSize;
}

function resetCanvas2dShadow(): void {
  ctx2d.shadowBlur = 0;
  ctx2d.shadowColor = 'transparent';
}

/** Nach weichem Radierer / Pinsel: Standard-Komposit wiederherstellen. */
function resetCanvas2dPaintExtras(): void {
  resetCanvas2dShadow();
  ctx2d.globalCompositeOperation = 'source-over';
  ctx2d.globalAlpha = 1;
}

function drawSoftPenDab(x: number, y: number): void {
  ctx2d.globalCompositeOperation = 'source-over';
  ctx2d.globalAlpha = 1;
  resetCanvas2dShadow();
  const r = softPenDabRadius();
  const g = ctx2d.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.1, 'rgba(255,255,255,1)');
  g.addColorStop(0.22, 'rgba(255,255,255,0.88)');
  g.addColorStop(0.38, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.32)');
  g.addColorStop(0.72, 'rgba(255,255,255,0.14)');
  g.addColorStop(0.88, 'rgba(255,255,255,0.05)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx2d.fillStyle = g;
  ctx2d.beginPath();
  ctx2d.arc(x, y, r, 0, Math.PI * 2);
  ctx2d.fill();
}

/** Weiches Wegradieren per Alpha-Maske (weicher Rand). */
function drawSoftEraseDab(x: number, y: number): void {
  resetCanvas2dShadow();
  ctx2d.globalAlpha = 1;
  const r = softEraserDabRadius();
  ctx2d.globalCompositeOperation = 'destination-out';
  const g = ctx2d.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, 'rgba(255,255,255,0.94)');
  g.addColorStop(0.22, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.48, 'rgba(255,255,255,0.22)');
  g.addColorStop(0.72, 'rgba(255,255,255,0.08)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx2d.fillStyle = g;
  ctx2d.beginPath();
  ctx2d.arc(x, y, r, 0, Math.PI * 2);
  ctx2d.fill();
  ctx2d.globalCompositeOperation = 'source-over';
}

function stampSoftBrushAlongSegment(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  pen: boolean,
): void {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  const step = softDabStepPx();
  const n = Math.max(1, Math.ceil(len / step));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = x0 + dx * t;
    const y = y0 + dy * t;
    if (pen) drawSoftPenDab(x, y);
    else drawSoftEraseDab(x, y);
  }
}

function drawCanvasCellSize(): { cellW: number; cellH: number } {
  const cw = el.drawCanvas.width;
  const ch = el.drawCanvas.height;
  return { cellW: cw / MNIST_DRAW_GRID, cellH: ch / MNIST_DRAW_GRID };
}

function canvasPosToDrawCell(p: { x: number; y: number }): {
  gx: number;
  gy: number;
} {
  const { cellW, cellH } = drawCanvasCellSize();
  return {
    gx: Math.max(0, Math.min(MNIST_DRAW_GRID - 1, Math.floor(p.x / cellW))),
    gy: Math.max(0, Math.min(MNIST_DRAW_GRID - 1, Math.floor(p.y / cellH))),
  };
}

/**
 * Raster-Zelle: exaktes 28×28-Rechteck (hart am Gitter), plus nur ein äußerer Ring
 * mit Grau in die Nachbarzellen (Radial mit innerem „Loch“, kein weicher Vollkreis).
 */
function fillDrawCanvasCell(gx: number, gy: number, style: string): void {
  resetCanvas2dPaintExtras();
  const { cellW, cellH } = drawCanvasCellSize();
  const x0 = gx * cellW;
  const y0 = gy * cellH;
  const w = Math.ceil(cellW);
  const h = Math.ceil(cellH);
  const cx = x0 + cellW * 0.5;
  const cy = y0 + cellH * 0.5;
  const base = Math.max(cellW, cellH);
  /** Innerer Kreis knapp außerhalb der Zellecken → Kern bleibt kantengleich zum Gitter */
  const rHole = Math.hypot(cellW, cellH) * 0.505;
  const rAura = base * 2.18;
  const isErase = style === '#000000' || style.toLowerCase() === '#000000';

  if (!isErase) {
    ctx2d.fillStyle = '#ffffff';
    ctx2d.fillRect(x0, y0, w, h);

    /** Nur Weiß+Alpha (kein graues RGB): überlagert es andere weiße Kerne nicht ab. */
    const g = ctx2d.createRadialGradient(cx, cy, rHole, cx, cy, rAura);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.06, 'rgba(255,255,255,0.38)');
    g.addColorStop(0.18, 'rgba(255,255,255,0.24)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.14)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.07)');
    g.addColorStop(0.78, 'rgba(255,255,255,0.03)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx2d.fillStyle = g;
    ctx2d.beginPath();
    ctx2d.arc(cx, cy, rAura, 0, Math.PI * 2);
    ctx2d.fill();
    ctx2d.fillStyle = '#ffffff';
    ctx2d.fillRect(x0, y0, w, h);
  } else {
    ctx2d.globalCompositeOperation = 'destination-out';
    ctx2d.fillStyle = 'rgba(255,255,255,1)';
    ctx2d.fillRect(x0, y0, w, h);

    const g = ctx2d.createRadialGradient(cx, cy, rHole, cx, cy, rAura * 1.06);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.08, 'rgba(255,255,255,0.38)');
    g.addColorStop(0.26, 'rgba(255,255,255,0.2)');
    g.addColorStop(0.48, 'rgba(255,255,255,0.1)');
    g.addColorStop(0.72, 'rgba(255,255,255,0.04)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx2d.fillStyle = g;
    ctx2d.beginPath();
    ctx2d.arc(cx, cy, rAura * 1.06, 0, Math.PI * 2);
    ctx2d.fill();
    ctx2d.globalCompositeOperation = 'source-over';
  }
}

function stampDrawCells(
  cx: number,
  cy: number,
  chebR: number,
  style: string,
): void {
  for (let dy = -chebR; dy <= chebR; dy++) {
    for (let dx = -chebR; dx <= chebR; dx++) {
      const gx = cx + dx;
      const gy = cy + dy;
      if (gx >= 0 && gx < MNIST_DRAW_GRID && gy >= 0 && gy < MNIST_DRAW_GRID) {
        fillDrawCanvasCell(gx, gy, style);
      }
    }
  }
}

function strokeDrawCellsBresenham(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  chebR: number,
  style: string,
): void {
  let x = x0;
  let y = y0;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  for (;;) {
    stampDrawCells(x, y, chebR, style);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}

function cancelLiveCanvasInferRaf(): void {
  if (liveCanvasInferRaf !== null) {
    cancelAnimationFrame(liveCanvasInferRaf);
    liveCanvasInferRaf = null;
  }
}
function runLiveCanvasInferNow(): void {
  cancelLiveCanvasInferRaf();
  if (!net || !net3d) return;
  liveInferLastRun = performance.now();
  const pixels = canvasToMnistPixels();
  inferWithPixels(pixels, undefined, undefined, { live: true });
}
function scheduleLiveCanvasInfer(): void {
  if (liveCanvasInferRaf !== null) return;
  const step = (): void => {
    liveCanvasInferRaf = null;
    if (!net || !net3d) return;
    const now = performance.now();
    if (now - liveInferLastRun < LIVE_INFER_MIN_MS) {
      liveCanvasInferRaf = requestAnimationFrame(step);
      return;
    }
    liveInferLastRun = now;
    const pixels = canvasToMnistPixels();
    inferWithPixels(pixels, undefined, undefined, { live: true });
  };
  liveCanvasInferRaf = requestAnimationFrame(step);
}
function statusPlainToHtml(plain: string): string {
  const esc = plain
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc.replace(
    /(\d+:\d+:\d+|\d+:\d+|(?:-)?\b\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?%?)/g,
    '<span class="badge badge-primary badge-sm mx-0.5 font-semibold tabular-nums">$1</span>',
  );
}

function setStatus(t: string): void {
  el.status.innerHTML = statusPlainToHtml(t);
}

function setModelDropdownOpen(open: boolean): void {
  if (nLatest.modelDropdownOpen === open) return;
  appStore.dispatch(NeuronalActions.modelDropdownSetOpen({ open }));
}

function selectModelById(id: string, statusPrefix = 'Aktiv'): boolean {
  if (!id) return false;
  if (!loadSelectedModelIntoNet(id)) {
    setStatus('Modell konnte nicht geladen werden.');
    return false;
  }
  const entry = nLatest.modelCollection.models.find((m) => m.id === id);
  setStatus(`${statusPrefix}: ${entry?.name ?? id}`);
  return true;
}

function formatTimeLabel(iso: string): string {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return '--:--:--';
  return d.toLocaleTimeString('de-DE', { hour12: false });
}

function nextRunSeq(
  modelId: string,
  by: Record<string, PersistedEpochRow[]>,
): number {
  const rows = by[modelId] ?? [];
  if (rows.length === 0) return 1;
  let mx = 0;
  for (const r of rows) mx = Math.max(mx, r.run);
  return mx + 1;
}

function applyEpochHistoryToUi(modelId: string | null): void {
  appStore.dispatch(
    NeuronalActions.epochViewSyncFromModel({ modelId: modelId ?? '' }),
  );
}

function clearEpochHistoryForModel(modelId: string): void {
  appStore.dispatch(NeuronalActions.epochHistoryCleared({ modelId }));
}

function fmtInt(n: number, width: number): string {
  return String(n).padStart(width, ' ');
}

function fmtFloat(n: number, width: number, digits: number): string {
  return n.toFixed(digits).padStart(width, ' ');
}

function inferLayerMaxDiffs(prev: number[][], cur: number[][]): string {
  if (prev.length !== cur.length) return '';
  const parts: string[] = [];
  for (let L = 0; L < cur.length; L++) {
    const a = cur[L];
    const b = prev[L];
    if (!a || !b || a.length !== b.length) continue;
    let mx = 0;
    for (let i = 0; i < a.length; i++) mx = Math.max(mx, Math.abs(a[i] - b[i]));
    parts.push(`${L}:${mx.toExponential(2)}`);
  }
  return parts.length ? `  Δmax ${parts.join(' ')}` : '';
}

function updateButtons(): void {
  const hasTrain = trainData.length > 0;
  const hasTest = testData.length > 0;
  const tr = nLatest.training.running;
  el.btnTrain.disabled = !hasTrain || tr;
  el.btnPause.disabled = !tr;
  el.modelSelect.disabled = tr;
  if (tr && nLatest.modelDropdownOpen) setModelDropdownOpen(false);
  el.btnSaveModelAs.disabled = !net || tr;
  el.btnResetModel.disabled = !net || tr;
  el.btnInferRandom.disabled = !net || !hasTest;
  el.btnTestCarousel.disabled = !net || !hasTest || tr;
  el.btnInferDraw.disabled = !net;
  el.btnNewModel.disabled = tr || !nLatest.modelStoreHydrated;
  el.epochsInput.disabled = tr;
  el.lrInput.disabled = tr;
  el.batchSizeInput.disabled = tr;
  el.vizEveryInput.disabled = tr;
  for (const btn of document.querySelectorAll<HTMLButtonElement>(
    '.epochPresetBtn',
  )) {
    btn.disabled = tr;
  }
  syncEpochPresetHighlight();
  updateRunHint();
  updateActiveModelPanel();
}

function parseIntInRange(
  raw: string,
  fallback: number,
  min: number,
  max: number,
): number {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function parseFloatInRange(
  raw: string,
  fallback: number,
  min: number,
  max: number,
): number {
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function getTrainConfig(): {
  lr: number;
  batchSize: number;
  epochs: number;
  vizEveryNBatches: number;
} {
  const epochs = parseIntInRange(
    el.epochsInput.value,
    TRAIN_DEFAULTS.epochs,
    1,
    200,
  );
  const lr = parseFloatInRange(el.lrInput.value, TRAIN_DEFAULTS.lr, 0.0001, 1);
  const batchSize = parseIntInRange(
    el.batchSizeInput.value,
    TRAIN_DEFAULTS.batchSize,
    1,
    512,
  );
  const vizEveryNBatches = parseIntInRange(
    el.vizEveryInput.value,
    TRAIN_DEFAULTS.vizEveryNBatches,
    1,
    1000,
  );
  el.epochsInput.value = String(epochs);
  el.lrInput.value = String(lr);
  el.batchSizeInput.value = String(batchSize);
  el.vizEveryInput.value = String(vizEveryNBatches);
  return { lr, batchSize, epochs, vizEveryNBatches };
}

function fmtPct(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return '-';
  return `${(v * 100).toFixed(2)}%`;
}

function defaultModelName(): string {
  return `Modell ${new Date().toLocaleString('de-DE', { hour12: false })}`;
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
  el.modelSelect.innerHTML = '';
  if (!nLatest.modelStoreHydrated) {
    const loading = document.createElement('option');
    loading.value = '';
    loading.textContent = 'Modelle werden geladen …';
    loading.selected = true;
    el.modelSelect.append(loading);
    setModelDropdownOpen(false);
    updateActiveModelPanel();
    updateRunHint();
    syncEpochPresetHighlight();
    return;
  }
  if (col.models.length === 0) {
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = 'Kein Modell';
    empty.selected = true;
    el.modelSelect.append(empty);
    setModelDropdownOpen(false);
    updateActiveModelPanel();
    updateRunHint();
    syncEpochPresetHighlight();
    return;
  }
  for (const entry of col.models) {
    const option = document.createElement('option');
    option.value = entry.id;
    option.textContent = `${entry.name} | err ${fmtPct(entry.metrics.errorRate)} | acc ${fmtPct(entry.metrics.testAcc)} | ep ${entry.metrics.epochsTrained}`;
    el.modelSelect.append(option);
  }
  if (selected && col.models.some((m) => m.id === selected)) {
    el.modelSelect.value = selected;
  } else if (col.models.length > 0) {
    el.modelSelect.value = col.models[0].id;
  }
  updateActiveModelPanel();
  updateRunHint();
  syncEpochPresetHighlight();
}

function updateActiveModelPanel(): void {
  if (!net) {
    el.activeModelTitle.textContent = 'Noch kein Netz geladen';
    el.activeModelDetail.textContent =
      'Oben ‚Aktives Modell‘ wählen — oder „Training starten“ ohne vorherigen Stand legt automatisch einen ersten Stand an.';
    el.inferModelContext.textContent =
      'Kein aktives Modell — zuerst ein Modell wählen oder anlegen.';
    return;
  }
  const id = nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
  const entry = id
    ? nLatest.modelCollection.models.find((m) => m.id === id)
    : null;
  if (entry) {
    el.activeModelTitle.textContent = entry.name;
    el.activeModelDetail.textContent = `Test ${fmtPct(entry.metrics.testAcc)} · Fehlerquote ${fmtPct(entry.metrics.errorRate)} · ${entry.metrics.epochsTrained} trainierte Epochen (Summe) · zuletzt ${formatTimeLabel(entry.updatedAt)}`;
    el.inferModelContext.textContent = `Inferenz nutzt: ${entry.name} · ${entry.metrics.epochsTrained} Epochen gesamt · Test ${fmtPct(entry.metrics.testAcc)}`;
  } else {
    el.activeModelTitle.textContent = 'Netz im Arbeitsspeicher';
    el.activeModelDetail.textContent =
      'Kein passender Eintrag in der Bibliothek gefunden.';
    el.inferModelContext.textContent =
      'Inferenz nutzt das Netz im Arbeitsspeicher (ohne Bibliothekseintrag).';
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
  const bs = parseIntInRange(
    el.batchSizeInput.value,
    TRAIN_DEFAULTS.batchSize,
    1,
    512,
  );
  const ep = parseIntInRange(
    el.epochsInput.value,
    TRAIN_DEFAULTS.epochs,
    1,
    200,
  );
  const n = trainData.length;
  if (n <= 0) {
    el.epochStepHint.textContent =
      'Sobald Trainingsdaten geladen sind, erscheint hier die ungefähre Anzahl Gradientenschritte.';
    return;
  }
  const per = Math.max(1, Math.ceil(n / bs));
  const total = per * ep;
  el.epochStepHint.textContent = `Bei Batchgröße ${bs}: rund ${per} Schritte pro Epoche, etwa ${total} für ${ep} Epoche(n).`;
}

function syncEpochPresetHighlight(): void {
  const ep = parseIntInRange(
    el.epochsInput.value,
    TRAIN_DEFAULTS.epochs,
    1,
    200,
  );
  const presets = new Set([1, 3, 10, 30]);
  for (const btn of document.querySelectorAll<HTMLButtonElement>(
    '.epochPresetBtn',
  )) {
    const v = Number.parseInt(btn.dataset['epochs'] ?? '', 10);
    const active = presets.has(ep) && v === ep;
    btn.classList.toggle('btn-primary', active);
    btn.classList.toggle('btn-outline', !active);
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
  if (entry.model.weights.length !== numW || entry.model.biases.length !== numW)
    return false;
  net = applyStoredModelToNet(entry.model);
  lastInferActsDebug = null;
  const routeSegment =
    reconcileWorkspaceUrlForModelSelection?.(entry.id) ?? null;
  appStore.dispatch(
    NeuronalActions.activeModelIdSet({
      id: entry.id,
      routeModelSegmentFromUrl: routeSegment,
    }),
  );
  publishVizState('idle', zeroActivationsForLayout());
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
    let trainErr = '';
    let loadedTrain: MnistSample[] = [];
    for (const src of trainSources) {
      try {
        const text = await fetchCsvText(src);
        const parsed = await parseMnistCsvAsync(text);
        if (parsed.length === 0) {
          trainErr = 'Train-CSV enthält keine gültigen Zeilen';
          continue;
        }
        loadedTrain = parsed;
        break;
      } catch (e) {
        trainErr = String(e);
      }
    }
    if (loadedTrain.length === 0)
      throw new Error(trainErr || 'Train-CSV konnte nicht geladen werden');
    trainData = loadedTrain;
    setStatus(`${MNIST_LABEL}: Train geladen (${trainData.length} Zeilen)`);
  } catch (e) {
    setStatus(`${MNIST_LABEL}: Fehler Train-CSV: ${e}`);
    trainData = [];
  }
  try {
    setStatus(`${MNIST_LABEL}: Test-CSV wird geladen …`);
    let testErr = '';
    let loadedTest: MnistSample[] = [];
    for (const src of testSources) {
      try {
        const text = await fetchCsvText(src);
        const parsed = await parseMnistCsvAsync(text);
        if (parsed.length === 0) {
          testErr = 'Test-CSV enthält keine gültigen Zeilen';
          continue;
        }
        loadedTest = parsed;
        break;
      } catch (e) {
        testErr = String(e);
      }
    }
    if (loadedTest.length === 0)
      throw new Error(testErr || 'Test-CSV konnte nicht geladen werden');
    testData = loadedTest;
    setStatus(
      `${MNIST_LABEL}: Train ${trainData.length} | Test ${testData.length} geladen`,
    );
  } catch (e) {
    setStatus(`${MNIST_LABEL}: Fehler Test-CSV: ${e}`);
    testData = [];
  }
  lastInferSampleIndex = -1;
  updateDatasetRibbon();
  updateButtons();
}

let renderSceneBound: () => void = () => {};
let renderDisplayBound: () => void = () => {};
let disposeSceneBound: (() => void) | null = null;
let stopAnimCleanup: (() => void) | null = null;

function renderFrame(): void {
  renderDisplayBound();
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
  net3d.setIdleDim(pendingVizState.mode === 'idle');
  if (pendingVizState.mode !== 'infer') net3d.setInferResult(null, null);
  net3d.setEdgeFocus(
    pendingVizState.mode === 'infer'
      ? 'infer'
      : pendingVizState.mode === 'train'
        ? 'trainRecent'
        : 'off',
    pendingVizState.mode === 'infer' ? pendingVizState.activations : null,
  );
  net3d.setActivations(pendingVizState.activations);
  lastAppliedVizStamp = pendingVizState.stamp;
  return true;
}

function parseHiddenLayerVizLayout(s: string): HiddenLayerVizLayout | null {
  return (HIDDEN_LAYER_VIZ_LAYOUTS as readonly string[]).includes(s)
    ? (s as HiddenLayerVizLayout)
    : null;
}

function parseInputLayerVizLayout(s: string): InputLayerVizLayout | null {
  return (INPUT_LAYER_VIZ_LAYOUTS as readonly string[]).includes(s)
    ? (s as InputLayerVizLayout)
    : null;
}

function reapplyViz3dAfterLayoutChange(): void {
  if (!net3d) return;
  if (pendingVizState) {
    pendingVizState = { ...pendingVizState, stamp: ++vizStampCounter };
    flushVizState();
    if (net) net3d.setWeights(net.weights);
  } else {
    publishVizState('idle', zeroActivationsForLayout());
  }
  renderFrame();
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

  if (w === MNIST_DRAW_GRID && h === MNIST_DRAW_GRID) {
    const out = new Array<number>(784);
    let k = 0;
    for (let gy = 0; gy < MNIST_DRAW_GRID; gy++) {
      for (let gx = 0; gx < MNIST_DRAW_GRID; gx++) {
        const i = (gy * w + gx) * 4;
        out[k++] = (d[i]! + d[i + 1]! + d[i + 2]!) / 3 / 255;
      }
    }
    return out;
  }

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

/** MNIST 28×28 (0…1) direkt aufs Zeichen-Canvas (Bitmap 28×28 = kein Hochskalieren nötig). */
function paintMnistPixelsToInferCanvas(pixels: number[]): void {
  if (pixels.length !== MNIST_PIXEL_COUNT) return;
  cancelLiveCanvasInferRaf();
  resetCanvas2dPaintExtras();
  drawMnistPixelsOntoCanvas(el.drawCanvas, pixels);
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
    let diffStr = '';
    if (VIZ_DEBUG_INFER && lastInferActsDebug)
      diffStr = inferLayerMaxDiffs(lastInferActsDebug, acts);
    if (VIZ_DEBUG_INFER) lastInferActsDebug = acts.map((row) => [...row]);
    net3d.setInferResult(pred, label ?? null);
    publishVizState('infer', acts);
    if (sampleIndex !== undefined) {
      paintMnistPixelsToInferCanvas(pixels);
    }
    if (!live) renderFrame();
    const probs = fwd.prob.map((row, i) => ({ digit: i, p: row[0] }));
    const probStr = probs.map((x) => x.p.toFixed(4)).join(' ');
    const top = [...probs]
      .sort((a, b) => b.p - a.p)
      .slice(0, 3)
      .map((x) => `${x.digit}:${(x.p * 100).toFixed(2)}%`)
      .join(' ');
    if (label !== undefined) {
      if (invalidProb) {
        setStatus(
          `Infer #${fmtInt(inferCounter, 4)}: ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`,
        );
      } else {
        const idxStr =
          sampleIndex === undefined ? '' : ` idx=${fmtInt(sampleIndex, 5)} `;
        setStatus(
          `Infer #${fmtInt(inferCounter, 4)}:${idxStr}wahr=${label} pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`,
        );
      }
    } else if (invalidProb) {
      setStatus(
        live
          ? 'Canvas (live): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren'
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

export type NeuronalAppRuntime = {
  destroy: () => void;
  onTrain: () => void;
  onPause: () => void;
  onModelSelectChange: () => void;
  onNewModel: () => void;
  onSaveAs: () => void;
  onReset: () => void;
  onInferRandom: () => void;
  onInferTrainSample: (index: number) => void;
  onInferDraw: () => void;
  onClearDraw: () => void;
  onEpochsInput: () => void;
  onBatchSizeInput: () => void;
  onEpochPreset: (n: number) => void;
  onDocumentPointerDown: (ev: PointerEvent) => void;
  onDrawPointerDown: (e: PointerEvent) => void;
  onDrawPointerMove: (e: PointerEvent) => void;
  onDrawPointerUp: () => void;
  onDrawPointerCancel: () => void;
  onDrawPointerLeave: () => void;
  onHiddenLayerLayoutChange: (index: number, raw: string) => void;
  onHiddenLayerLayoutScaleChange: (index: number, scale: number) => void;
  onInputLayerLayoutChange: (raw: string) => void;
  onInputLayerLayoutScaleChange: (scale: number) => void;
  onActiveNeuronMaxScaleMulChange: (mul: number) => void;
  onVizSceneColorsApply: (colors: VizSceneColorSettings) => void;
  onVizLightColorsApply: (colors: VizLightColorSettings) => void;
  onVizNetworkColorsApply: (colors: VizNetworkColorSettings) => void;
  onVizPostProcessApply: (pp: VizPostProcessSettings) => void;
  previewVizSceneColor: (
    key: keyof VizSceneColorSettings,
    color: string,
  ) => void;
  previewVizLightColor: (
    key: keyof VizLightColorSettings,
    color: string,
  ) => void;
  cancelPendingVizColorPreviews: () => void;
  setVibeCameraMode: (enabled: boolean) => void;
  setTestImageCarouselMode: (enabled: boolean) => boolean;
};

export function createNeuronalAppRuntime(
  store: Store<AppState>,
  host: HTMLElement,
  appInstance: NeuronalAppInstance,
  reconcileWorkspaceUrl?: ReconcileWorkspaceUrlForModelSelection,
): NeuronalAppRuntime {
  appStore = store;
  reconcileWorkspaceUrlForModelSelection = reconcileWorkspaceUrl;
  el = bindFromHost(host);
  const unSubN = appStore
    .select(selectNeuronalState)
    .subscribe((n: NeuronalState) => {
      nLatest = n;
      el.btnPause.textContent = n.training.pause ? 'Fortsetzen' : 'Anhalten';
      if (neuronalUiRaf !== 0) {
        cancelAnimationFrame(neuronalUiRaf);
      }
      neuronalUiRaf = requestAnimationFrame(() => {
        neuronalUiRaf = 0;
        updateButtons();
        refreshModelSelect();
      });
    });
  const runNewModelFromToolbar = (): void => {
    if (nLatest.training.running) return;
    const entry = createFreshStoredModelEntry();
    net = applyStoredModelToNet(entry.model);
    lastInferActsDebug = null;
    appStore.dispatch(NeuronalActions.lastTrainMetricsReset());
    upsertModelEntry(entry);
    applyEpochHistoryToUi(entry.id);
    publishVizState('idle', zeroActivationsForLayout());
    setStatus(`Neues Modell: ${entry.name}`);
  };
  const runActiveModelFromToolbar = (id: string): void => {
    if (nLatest.training.running) return;
    if (!id) return;
    selectModelById(id, 'Aktives Modell');
  };
  setModelDropdownOpen(false);
  el.drawCanvas.width = MNIST_DRAW_GRID;
  el.drawCanvas.height = MNIST_DRAW_GRID;
  const ctxDraw = el.drawCanvas.getContext('2d');
  if (!ctxDraw) throw new Error('canvas');
  ctx2d = ctxDraw;
  resetCanvas2dPaintExtras();
  ctx2d.fillStyle = '#000000';
  ctx2d.fillRect(0, 0, el.drawCanvas.width, el.drawCanvas.height);

  const {
    scene,
    controls,
    render,
    renderDisplay,
    dispose,
    setVibeCameraMode,
    applyVizSceneColors,
    applyVizLightColors,
    applyVizPostProcess,
  } = createScene(el.viz);
  applyVizSceneColors(nLatest.viz3d.sceneColors);
  applyVizLightColors(nLatest.viz3d.lightColors);
  applyVizPostProcess(nLatest.viz3d.postProcess);
  let sceneColorBaseline: VizSceneColorSettings = {
    ...nLatest.viz3d.sceneColors,
  };
  let lightColorBaseline: VizLightColorSettings = {
    ...nLatest.viz3d.lightColors,
  };
  let networkColorBaseline: VizNetworkColorSettings = {
    ...nLatest.viz3d.networkColors,
  };
  let postProcessBaseline: VizPostProcessSettings = {
    ...nLatest.viz3d.postProcess,
  };

  let sceneColorPreviewRaf = 0;
  let sceneColorPreviewPatch: Partial<VizSceneColorSettings> = {};
  let lightColorPreviewRaf = 0;
  let lightColorPreviewPatch: Partial<VizLightColorSettings> = {};

  const flushSceneColorPreview = (): void => {
    if (Object.keys(sceneColorPreviewPatch).length === 0) return;
    const merged: VizSceneColorSettings = { ...sceneColorBaseline };
    (
      Object.keys(sceneColorPreviewPatch) as (keyof VizSceneColorSettings)[]
    ).forEach((k) => {
      const v = sceneColorPreviewPatch[k];
      if (v !== undefined && isValidHexColor6(v)) merged[k] = v;
    });
    sceneColorPreviewPatch = {};
    applyVizSceneColors(merged);
  };

  const flushLightColorPreview = (): void => {
    if (Object.keys(lightColorPreviewPatch).length === 0) return;
    const merged: VizLightColorSettings = { ...lightColorBaseline };
    (
      Object.keys(lightColorPreviewPatch) as (keyof VizLightColorSettings)[]
    ).forEach((k) => {
      const v = lightColorPreviewPatch[k];
      if (v !== undefined && isValidHexColor6(v)) merged[k] = v;
    });
    lightColorPreviewPatch = {};
    applyVizLightColors(merged);
  };

  const cancelPendingVizColorPreviews = (): void => {
    if (sceneColorPreviewRaf !== 0) {
      cancelAnimationFrame(sceneColorPreviewRaf);
      sceneColorPreviewRaf = 0;
    }
    sceneColorPreviewPatch = {};
    if (lightColorPreviewRaf !== 0) {
      cancelAnimationFrame(lightColorPreviewRaf);
      lightColorPreviewRaf = 0;
    }
    lightColorPreviewPatch = {};
  };

  const previewVizSceneColor = (
    key: keyof VizSceneColorSettings,
    color: string,
  ): void => {
    if (!isValidHexColor6(color)) return;
    sceneColorPreviewPatch = { ...sceneColorPreviewPatch, [key]: color };
    if (sceneColorPreviewRaf !== 0) return;
    sceneColorPreviewRaf = requestAnimationFrame(() => {
      sceneColorPreviewRaf = 0;
      flushSceneColorPreview();
    });
  };

  const previewVizLightColor = (
    key: keyof VizLightColorSettings,
    color: string,
  ): void => {
    if (!isValidHexColor6(color)) return;
    lightColorPreviewPatch = { ...lightColorPreviewPatch, [key]: color };
    if (lightColorPreviewRaf !== 0) return;
    lightColorPreviewRaf = requestAnimationFrame(() => {
      lightColorPreviewRaf = 0;
      flushLightColorPreview();
    });
  };

  renderSceneBound = render;
  renderDisplayBound = renderDisplay;
  disposeSceneBound = dispose;
  setVibeCameraMode(true);
  const net3dInst = new Network3D(LAYER_SIZES);
  net3dInst.applyVizNetworkColors(networkColorBaseline);
  net3d = net3dInst;
  scene.add(net3dInst.root);
  stopAnimCleanup = animateLoop(render, controls, tickViz);

  // connect erst nach net3d/Renderloop: flushPending / Modellwahl dürfen nicht
  // mitten in der synchronen Initialisierung Router + Store + Viz triggern.
  appInstance.connect({
    newModelFromToolbar: runNewModelFromToolbar,
    activeModelFromToolbar: runActiveModelFromToolbar,
  });

  const onDrawPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0 && e.button !== 2) return;
    if (e.button === 2) e.preventDefault();
    drawing = true;
    el.drawCanvas.setPointerCapture(e.pointerId);
    if (inferDrawBrushMode === 'soft') {
      resetCanvas2dPaintExtras();
      drawSoftIsPen = e.button === 0;
      const p = canvasPos(e);
      if (drawSoftIsPen) drawSoftPenDab(p.x, p.y);
      else drawSoftEraseDab(p.x, p.y);
      drawLastSoftPoint = p;
      drawLastCell = null;
      scheduleLiveCanvasInfer();
      return;
    }
    drawInk = e.button === 2 ? '#000000' : '#ffffff';
    drawBrushChebR =
      e.button === 2
        ? drawEraserChebRFromBrushSize()
        : drawPenChebRFromBrushSize();
    const c = canvasPosToDrawCell(canvasPos(e));
    drawLastCell = c;
    drawLastSoftPoint = null;
    stampDrawCells(c.gx, c.gy, drawBrushChebR, drawInk);
    scheduleLiveCanvasInfer();
  };
  const onDrawPointerMove = (e: PointerEvent): void => {
    if (!drawing) return;
    if (inferDrawBrushMode === 'soft') {
      if (drawLastSoftPoint === null) return;
      const p = canvasPos(e);
      stampSoftBrushAlongSegment(
        drawLastSoftPoint.x,
        drawLastSoftPoint.y,
        p.x,
        p.y,
        drawSoftIsPen,
      );
      drawLastSoftPoint = p;
      scheduleLiveCanvasInfer();
      return;
    }
    if (drawLastCell === null) return;
    const c = canvasPosToDrawCell(canvasPos(e));
    strokeDrawCellsBresenham(
      drawLastCell.gx,
      drawLastCell.gy,
      c.gx,
      c.gy,
      drawBrushChebR,
      drawInk,
    );
    drawLastCell = c;
    scheduleLiveCanvasInfer();
  };
  const onDrawPointerUp = (): void => {
    drawing = false;
    drawLastCell = null;
    drawLastSoftPoint = null;
    resetCanvas2dPaintExtras();
    runLiveCanvasInferNow();
  };
  const onDrawPointerCancel = (): void => {
    drawing = false;
    drawLastCell = null;
    drawLastSoftPoint = null;
    resetCanvas2dPaintExtras();
    runLiveCanvasInferNow();
  };
  const onDrawPointerLeave = (): void => {
    drawing = false;
    drawLastCell = null;
    drawLastSoftPoint = null;
    resetCanvas2dPaintExtras();
    runLiveCanvasInferNow();
  };
  const onHiddenLayerLayoutChange = (index: number, raw: string): void => {
    const layout = parseHiddenLayerVizLayout(raw);
    if (!layout || !net3d) return;
    net3d.setHiddenLayerLayout(index, layout);
    reapplyViz3dAfterLayoutChange();
  };
  const onHiddenLayerLayoutScaleChange = (
    index: number,
    scale: number,
  ): void => {
    if (!net3d || !Number.isFinite(scale)) return;
    net3d.setHiddenLayerLayoutScale(index, scale);
    reapplyViz3dAfterLayoutChange();
  };
  const onInputLayerLayoutChange = (raw: string): void => {
    const layout = parseInputLayerVizLayout(raw);
    if (!layout || !net3d) return;
    net3d.setInputLayerLayout(layout);
    reapplyViz3dAfterLayoutChange();
  };
  const onInputLayerLayoutScaleChange = (scale: number): void => {
    if (!net3d || !Number.isFinite(scale)) return;
    net3d.setInputLayerLayoutScale(scale);
    reapplyViz3dAfterLayoutChange();
  };
  const onActiveNeuronMaxScaleMulChange = (mul: number): void => {
    if (!net3d || !Number.isFinite(mul)) return;
    net3d.setActiveNeuronMaxScaleMul(mul);
    reapplyViz3dAfterLayoutChange();
  };
  const onVizSceneColorsApply = (colors: VizSceneColorSettings): void => {
    sceneColorBaseline = { ...colors };
    applyVizSceneColors(sceneColorBaseline);
  };
  const onVizLightColorsApply = (colors: VizLightColorSettings): void => {
    lightColorBaseline = { ...colors };
    applyVizLightColors(lightColorBaseline);
  };
  const onVizNetworkColorsApply = (colors: VizNetworkColorSettings): void => {
    networkColorBaseline = { ...colors };
    if (net3d) {
      net3d.applyVizNetworkColors(networkColorBaseline);
      if (net) net3d.setWeights(net.weights);
    }
    renderFrame();
  };
  const onVizPostProcessApply = (pp: VizPostProcessSettings): void => {
    postProcessBaseline = { ...pp };
    applyVizPostProcess(postProcessBaseline);
    renderFrame();
  };
  const onClearDraw = (): void => {
    resetCanvas2dPaintExtras();
    ctx2d.fillStyle = '#000000';
    ctx2d.fillRect(0, 0, el.drawCanvas.width, el.drawCanvas.height);
    runLiveCanvasInferNow();
  };

  const onInferRandom = (): void => {
    if (!net || testData.length === 0) return;
    let idx = Math.floor(Math.random() * testData.length);
    if (testData.length > 1 && idx === lastInferSampleIndex) {
      idx = (idx + 1) % testData.length;
    }
    lastInferSampleIndex = idx;
    const s = testData[idx]!;
    inferWithPixels(s.pixels, s.label, idx);
  };

  const onInferTrainSample = (index: number): void => {
    clearTestCarouselTimer();
    if (!net || trainData.length === 0) return;
    const idx = Math.max(0, Math.min(trainData.length - 1, Math.floor(index)));
    lastInferSampleIndex = idx;
    const s = trainData[idx]!;
    inferWithPixels(s.pixels, s.label, idx);
  };

  let testCarouselTimer: number | null = null;
  let testCarouselIndex = 0;
  const TEST_CAROUSEL_MS = 2800;

  const clearTestCarouselTimer = (): void => {
    if (testCarouselTimer === null) return;
    window.clearInterval(testCarouselTimer);
    testCarouselTimer = null;
  };

  const stepTestImageCarousel = (): void => {
    if (!net || testData.length === 0) {
      clearTestCarouselTimer();
      return;
    }
    const idx = testCarouselIndex % testData.length;
    const s = testData[idx]!;
    lastInferSampleIndex = idx;
    inferWithPixels(s.pixels, s.label, idx);
    testCarouselIndex = (testCarouselIndex + 1) % testData.length;
  };

  const setTestImageCarouselMode = (enabled: boolean): boolean => {
    clearTestCarouselTimer();
    if (!enabled) return false;
    if (!net || testData.length === 0) return false;
    stepTestImageCarousel();
    testCarouselTimer = window.setInterval(
      stepTestImageCarousel,
      TEST_CAROUSEL_MS,
    );
    return true;
  };

  const onInferDraw = (): void => {
    if (!net) return;
    const pixels = canvasToMnistPixels();
    inferWithPixels(pixels);
  };
  const onPause = (): void => {
    appStore.dispatch(NeuronalActions.trainingPauseToggled());
  };
  const onModelSelectChange = (): void => {
    const id = el.modelSelect.value;
    if (!id) return;
    appStore.dispatch(NeuronalActions.activeModelFromToolbarRequested({ id }));
  };
  const onDocumentPointerDown = (ev: PointerEvent): void => {
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
  const onNewModel = (): void => {
    appStore.dispatch(NeuronalActions.newModelFromToolbarRequested());
  };
  const onSaveAs = (): void => {
    if (!net) return;
    const name = (
      window.prompt('Name für den neuen Modellstand:', defaultModelName()) ?? ''
    ).trim();
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
  };
  const onReset = (): void => {
    if (nLatest.training.running) return;
    const currentId =
      nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
    if (!currentId) return;
    const currentEntry = nLatest.modelCollection.models.find(
      (m) => m.id === currentId,
    );
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
    publishVizState('idle', zeroActivationsForLayout());
    setStatus(`Modell neu initialisiert: ${currentEntry.name}`);
  };
  const onTrain = (): void => {
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
      const trainModelId =
        nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
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
      el.btnPause.textContent = 'Anhalten';
      await new Promise<void>((r) => {
        setTimeout(r, 0);
      });
      publishVizState('train', zeroActivationsForLayout());
      const runMetrics = await trainLoop(
        net!,
        trainData,
        trainCfg,
        (s) => {
          setTimeout(() => {
            if (net) publishVizState('train', s.activations);
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
          appStore.dispatch(
            NeuronalActions.trainingEpochAppended({
              modelId: trainModelId,
              row,
            }),
          );
        },
        () => nLatest.training.pause,
        () => nLatest.training.shouldStop,
      );
      appStore.dispatch(NeuronalActions.trainingFinished(runMetrics));
      if (net) {
        const testMetrics = await computeDatasetMetrics(net, testData);
        const currentId =
          nLatest.modelCollection.activeModelId ?? el.modelSelect.value;
        const currentEntry = currentId
          ? nLatest.modelCollection.models.find((m) => m.id === currentId)
          : null;
        if (currentEntry) {
          upsertModelEntry({
            ...currentEntry,
            updatedAt: new Date().toISOString(),
            model: cloneStoredModel(net),
            metrics: {
              lastLoss: runMetrics.lastTrainLoss,
              lastBatchAcc: runMetrics.lastTrainBatchAcc,
              testAcc: testMetrics
                ? testMetrics.accuracy
                : currentEntry.metrics.testAcc,
              errorRate: testMetrics
                ? testMetrics.errorRate
                : currentEntry.metrics.errorRate,
              epochsTrained:
                currentEntry.metrics.epochsTrained + trainCfg.epochs,
            },
          });
        }
      }
      if (net) publishVizState('idle', zeroActivationsForLayout());
      const act = nLatest.modelCollection.activeModelId
        ? nLatest.modelCollection.models.find(
            (m) => m.id === nLatest.modelCollection.activeModelId,
          )
        : null;
      setStatus(
        `Training beendet | aktiv: ${act?.name ?? '-'} | loss ${fmtFloat(runMetrics.lastTrainLoss, 8, 4)} | batch-acc ${fmtFloat(runMetrics.lastTrainBatchAcc * 100, 6, 2)}% | err ${fmtPct(act?.metrics.errorRate ?? null)} | acc ${fmtPct(act?.metrics.testAcc ?? null)}`,
      );
    })();
  };
  const onEpochsInput = (): void => {
    syncEpochPresetHighlight();
    updateRunHint();
  };
  const onBatchSizeInput = (): void => {
    updateRunHint();
  };
  const onEpochPreset = (n: number): void => {
    if (!Number.isFinite(n)) return;
    el.epochsInput.value = String(Math.min(200, Math.max(1, n)));
    syncEpochPresetHighlight();
    updateRunHint();
  };

  const onBeforeUnload = () => {
    void new NeuronalModelsIdbService().saveCollection(nLatest.modelCollection);
    void new NeuronalEpochsIdbService().saveEpochStore({
      version: 1,
      byModelId: nLatest.epochByModelId,
    });
    appStore.dispatch(NeuronalActions.trainingStopRequested());
    stopAnimCleanup?.();
    net3d?.dispose();
    disposeSceneBound?.();
  };
  window.addEventListener('beforeunload', onBeforeUnload);

  setStatus('MNIST wird geladen …');
  updateButtons();
  void loadCsvData();
  try {
    if (nLatest.modelStoreHydrated) {
      const toLoad = nLatest.modelCollection.activeModelId;
      if (toLoad && loadSelectedModelIntoNet(toLoad)) {
        const entry = nLatest.modelCollection.models.find(
          (m) => m.id === toLoad,
        );
        setStatus(
          `Modell aus Browser-Speicher geladen: ${entry?.name ?? toLoad}`,
        );
      } else if (nLatest.modelCollection.models.length > 0) {
        setStatus(
          `${nLatest.modelCollection.models.length} Modellstände im Browser gefunden`,
        );
      }
    }
  } catch {
    setStatus('MNIST wird geladen …');
  }

  return {
    destroy: () => {
      try {
        void new NeuronalModelsIdbService().saveCollection(
          nLatest.modelCollection,
        );
        void new NeuronalEpochsIdbService().saveEpochStore({
          version: 1,
          byModelId: nLatest.epochByModelId,
        });
      } catch {}
      cancelLiveCanvasInferRaf();
      cancelPendingVizColorPreviews();
      clearTestCarouselTimer();
      if (neuronalUiRaf !== 0) {
        cancelAnimationFrame(neuronalUiRaf);
        neuronalUiRaf = 0;
      }
      appStore.dispatch(NeuronalActions.trainingStopRequested());
      appInstance.disconnect();
      unSubN.unsubscribe();
      window.removeEventListener('beforeunload', onBeforeUnload);
      stopAnimCleanup?.();
      net3d?.dispose();
      disposeSceneBound?.();
      net3d = null;
      stopAnimCleanup = null;
      disposeSceneBound = null;
      reconcileWorkspaceUrlForModelSelection = undefined;
      renderSceneBound = () => {};
      renderDisplayBound = () => {};
    },
    onTrain,
    onPause,
    onModelSelectChange,
    onNewModel,
    onSaveAs,
    onReset,
    onInferRandom,
    onInferTrainSample,
    onInferDraw,
    onClearDraw,
    onEpochsInput,
    onBatchSizeInput,
    onEpochPreset,
    onDocumentPointerDown,
    onDrawPointerDown,
    onDrawPointerMove,
    onDrawPointerUp,
    onDrawPointerCancel,
    onDrawPointerLeave,
    onHiddenLayerLayoutChange,
    onHiddenLayerLayoutScaleChange,
    onInputLayerLayoutChange,
    onInputLayerLayoutScaleChange,
    onActiveNeuronMaxScaleMulChange,
    onVizSceneColorsApply,
    onVizLightColorsApply,
    onVizNetworkColorsApply,
    onVizPostProcessApply,
    previewVizSceneColor,
    previewVizLightColor,
    cancelPendingVizColorPreviews,
    setVibeCameraMode,
    setTestImageCarouselMode,
  };
}
