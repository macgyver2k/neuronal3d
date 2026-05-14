import { drawMnistPixelsOntoCanvas, MNIST_PIXEL_COUNT } from '../data/mnist';
import { matFromColVec } from '../nn/matrix';
import { activationSlices } from '../nn/network';
import {
  LIVE_INFER_MIN_MS,
  MNIST_DRAW_GRID,
  VIZ_DEBUG_INFER,
} from './constants';
import { resetCanvas2dPaintExtras } from './draw-canvas-ops';
import { RT } from './runtime-state';
import { setStatus } from './store-dispatch';
import { fmtInt } from './text-format';
import { publishVizState } from './viz-sync';

function inferLayerMaxDiffs(prev: number[][], cur: number[][]): string {
  if (prev.length !== cur.length) return '';
  const parts: string[] = [];
  for (let L = 0; L < cur.length; L++) {
    const a = cur[L];
    const b = prev[L];
    if (!a || !b || a.length !== b.length) continue;
    let mx = 0;
    for (let i = 0; i < a.length; i++)
      mx = Math.max(mx, Math.abs(a[i]! - b[i]!));
    parts.push(`${L}:${mx.toExponential(2)}`);
  }
  return parts.length ? `  Δmax ${parts.join(' ')}` : '';
}

export function cancelLiveCanvasInferRaf(): void {
  if (RT.liveCanvasInferRaf !== null) {
    cancelAnimationFrame(RT.liveCanvasInferRaf);
    RT.liveCanvasInferRaf = null;
  }
}

export function runLiveCanvasInferNow(): void {
  cancelLiveCanvasInferRaf();
  if (!RT.net || !RT.net3d) return;
  RT.liveInferLastRun = performance.now();
  const pixels = canvasToMnistPixels();
  inferWithPixels(pixels, undefined, undefined, { live: true });
}

export function scheduleLiveCanvasInfer(): void {
  if (RT.liveCanvasInferRaf !== null) return;
  const step = (): void => {
    RT.liveCanvasInferRaf = null;
    if (!RT.net || !RT.net3d) return;
    const now = performance.now();
    if (now - RT.liveInferLastRun < LIVE_INFER_MIN_MS) {
      RT.liveCanvasInferRaf = requestAnimationFrame(step);
      return;
    }
    RT.liveInferLastRun = now;
    const pixels = canvasToMnistPixels();
    inferWithPixels(pixels, undefined, undefined, { live: true });
  };
  RT.liveCanvasInferRaf = requestAnimationFrame(step);
}

export function canvasToMnistPixels(): number[] {
  const w = RT.surfaceDrawCanvas.width;
  const h = RT.surfaceDrawCanvas.height;
  const img = RT.ctx2d.getImageData(0, 0, w, h);
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
      const v = (d[i]! + d[i + 1]! + d[i + 2]!) / 3;
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
          sum += (d[i]! + d[i + 1]! + d[i + 2]!) / 3;
          cnt++;
        }
      }
      out[k++] = cnt > 0 ? sum / cnt / 255 : 0;
    }
  }
  return out;
}

/** MNIST 28×28 (0…1) direkt aufs Zeichen-Canvas (Bitmap 28×28 = kein Hochskalieren nötig). */
export function paintMnistPixelsToInferCanvas(pixels: number[]): void {
  if (pixels.length !== MNIST_PIXEL_COUNT) return;
  cancelLiveCanvasInferRaf();
  resetCanvas2dPaintExtras();
  drawMnistPixelsOntoCanvas(RT.surfaceDrawCanvas, pixels);
}

export function inferWithPixels(
  pixels: number[],
  label?: number,
  sampleIndex?: number,
  opts?: { live?: boolean },
): void {
  if (!RT.net || !RT.net3d) return;
  const live = opts?.live === true;
  try {
    if (!live) RT.inferCounter += 1;
    const x = matFromColVec(pixels);
    const fwd = RT.net.forward(x);
    const pred = RT.net.predictClass(fwd.prob);
    const invalidProb = fwd.prob.some((row) => !Number.isFinite(row[0]));
    const acts = activationSlices(x, fwd);
    let diffStr = '';
    if (VIZ_DEBUG_INFER && RT.lastInferActsDebug)
      diffStr = inferLayerMaxDiffs(RT.lastInferActsDebug, acts);
    if (VIZ_DEBUG_INFER) RT.lastInferActsDebug = acts.map((row) => [...row]);
    RT.net3d.setInferResult(pred, label ?? null);
    publishVizState('infer', acts);
    if (sampleIndex !== undefined) {
      paintMnistPixelsToInferCanvas(pixels);
    }
    if (!live) RT.renderDisplayBound();
    const probs = fwd.prob.map((row, i) => ({ digit: i, p: row[0]! }));
    const probStr = probs.map((x) => x.p.toFixed(4)).join(' ');
    const top = [...probs]
      .sort((a, b) => b.p - a.p)
      .slice(0, 3)
      .map((x) => `${x.digit}:${(x.p * 100).toFixed(2)}%`)
      .join(' ');
    if (label !== undefined) {
      if (invalidProb) {
        setStatus(
          `Infer #${fmtInt(RT.inferCounter, 4)}: ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`,
        );
      } else {
        const idxStr =
          sampleIndex === undefined ? '' : ` idx=${fmtInt(sampleIndex, 5)} `;
        setStatus(
          `Infer #${fmtInt(RT.inferCounter, 4)}:${idxStr}wahr=${label} pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`,
        );
      }
    } else if (invalidProb) {
      setStatus(
        live
          ? 'Canvas (live): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren'
          : `Infer #${fmtInt(RT.inferCounter, 4)} (Canvas): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`,
      );
    } else {
      setStatus(
        live
          ? `Canvas (live): pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`
          : `Infer #${fmtInt(RT.inferCounter, 4)} (Canvas): pred=${pred}  softmax ${probStr}  top ${top}${diffStr}`,
      );
    }
  } catch (err) {
    setStatus(`Infer-Fehler: ${String(err)}`);
  }
}
