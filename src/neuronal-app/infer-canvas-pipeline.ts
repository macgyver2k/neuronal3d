import { drawMnistPixelsOntoCanvas, MNIST_PIXEL_COUNT } from '../data/mnist';
import { matFromColVec } from '../nn/matrix';
import { activationSlices } from '../nn/network';
import {
  LIVE_INFER_STATUS_MIN_MS,
  liveInferMinIntervalMs,
} from '../viz/mobile-quality';
import { MNIST_DRAW_GRID, VIZ_DEBUG_INFER } from './constants';
import { resetCanvas2dPaintExtras } from './draw-canvas-ops';
import type { InferWorkerOutcome } from './neuronal-infer-worker-host';
import { RT } from './runtime-state';
import { setStatus } from './store-dispatch';
import { fmtInt } from './text-format';
import { publishVizState } from './viz-sync';

function inferLayerMaxDiffs(prev: number[][], cur: number[][]): string {
  if (prev.length !== cur.length) return '';
  const parts: string[] = [];
  for (let layerIndex = 0; layerIndex < cur.length; layerIndex++) {
    const currentLayer = cur[layerIndex];
    const previousLayer = prev[layerIndex];
    if (!currentLayer || !previousLayer) continue;
    if (currentLayer.length !== previousLayer.length) continue;
    let maxDiff = 0;
    for (
      let neuronIndex = 0;
      neuronIndex < currentLayer.length;
      neuronIndex++
    ) {
      maxDiff = Math.max(
        maxDiff,
        Math.abs(currentLayer[neuronIndex]! - previousLayer[neuronIndex]!),
      );
    }
    parts.push(`${layerIndex}:${maxDiff.toExponential(2)}`);
  }
  return parts.length ? `  Δmax ${parts.join(' ')}` : '';
}

let lastLiveStatusAt = 0;

function formatProbSummary(prob: number[]): {
  probStr: string;
  top: string;
} {
  const probs = prob.map((value, digit) => ({ digit, probability: value }));
  const probStr = probs.map((entry) => entry.probability.toFixed(4)).join(' ');
  const top = [...probs]
    .sort((left, right) => right.probability - left.probability)
    .slice(0, 3)
    .map((entry) => `${entry.digit}:${(entry.probability * 100).toFixed(2)}%`)
    .join(' ');
  return { probStr, top };
}

function applyInferOutcome(
  outcome: InferWorkerOutcome,
  label: number | undefined,
  sampleIndex: number | undefined,
  pixels: number[],
  live: boolean,
): void {
  if (!RT.net3d) return;
  let diffStr = '';
  if (VIZ_DEBUG_INFER && RT.lastInferActsDebug) {
    diffStr = inferLayerMaxDiffs(RT.lastInferActsDebug, outcome.activations);
  }
  if (VIZ_DEBUG_INFER) {
    RT.lastInferActsDebug = outcome.activations.map((layer) => [...layer]);
  }
  publishVizState('infer', outcome.activations, undefined, {
    predictedDigit: outcome.predictedDigit,
    expectedDigit: label ?? null,
  });
  if (sampleIndex !== undefined) paintMnistPixelsToInferCanvas(pixels);
  if (!live) RT.renderDisplayBound();
  const { probStr, top } = formatProbSummary(outcome.prob);
  const now = performance.now();
  const shouldUpdateStatus =
    !live || now - lastLiveStatusAt >= LIVE_INFER_STATUS_MIN_MS;
  if (!shouldUpdateStatus) return;
  if (live) lastLiveStatusAt = now;
  if (label !== undefined) {
    if (outcome.invalidProb) {
      setStatus(
        `Infer #${fmtInt(RT.inferCounter, 4)}: ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`,
      );
      return;
    }
    const indexStr =
      sampleIndex === undefined ? '' : ` idx=${fmtInt(sampleIndex, 5)} `;
    setStatus(
      `Infer #${fmtInt(RT.inferCounter, 4)}:${indexStr}wahr=${label} pred=${outcome.predictedDigit}  softmax ${probStr}  top ${top}${diffStr}`,
    );
    return;
  }
  if (outcome.invalidProb) {
    setStatus(
      live
        ? 'Canvas (live): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren'
        : `Infer #${fmtInt(RT.inferCounter, 4)} (Canvas): ungültige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`,
    );
    return;
  }
  setStatus(
    live
      ? `Canvas (live): pred=${outcome.predictedDigit}  softmax ${probStr}  top ${top}${diffStr}`
      : `Infer #${fmtInt(RT.inferCounter, 4)} (Canvas): pred=${outcome.predictedDigit}  softmax ${probStr}  top ${top}${diffStr}`,
  );
}

function inferOnMainThread(
  pixels: number[],
  label: number | undefined,
  sampleIndex: number | undefined,
  live: boolean,
): void {
  if (!RT.net || !RT.net3d) return;
  const input = matFromColVec(pixels);
  const forward = RT.net.forward(input);
  const predictedDigit = RT.net.predictClass(forward.prob);
  const activations = activationSlices(input, forward);
  const prob = forward.prob.map((row) => row[0]!);
  const invalidProb = prob.some((value) => !Number.isFinite(value));
  applyInferOutcome(
    { predictedDigit, activations, prob, invalidProb },
    label,
    sampleIndex,
    pixels,
    live,
  );
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
    if (now - RT.liveInferLastRun < liveInferMinIntervalMs()) {
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
  const width = RT.surfaceDrawCanvas.width;
  const height = RT.surfaceDrawCanvas.height;
  const image = RT.ctx2d.getImageData(0, 0, width, height);
  const data = image.data;

  if (width === MNIST_DRAW_GRID && height === MNIST_DRAW_GRID) {
    const output = new Array<number>(784);
    let pixelIndex = 0;
    for (let gridY = 0; gridY < MNIST_DRAW_GRID; gridY++) {
      for (let gridX = 0; gridX < MNIST_DRAW_GRID; gridX++) {
        const channelIndex = (gridY * width + gridX) * 4;
        output[pixelIndex++] =
          (data[channelIndex]! +
            data[channelIndex + 1]! +
            data[channelIndex + 2]!) /
          3 /
          255;
      }
    }
    return output;
  }

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  const inkThreshold = 20;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const channelIndex = (y * width + x) * 4;
      const value =
        (data[channelIndex]! +
          data[channelIndex + 1]! +
          data[channelIndex + 2]!) /
        3;
      if (value > inkThreshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX || maxY < minY) return new Array<number>(784).fill(0);
  const boxWidth = maxX - minX + 1;
  const boxHeight = maxY - minY + 1;
  const side = Math.max(boxWidth, boxHeight);
  const pad = Math.max(2, Math.floor(side * 0.2));
  const centerX = (minX + maxX) * 0.5;
  const centerY = (minY + maxY) * 0.5;
  const cropSide = side + pad * 2;
  const cropX0 = centerX - cropSide * 0.5;
  const cropY0 = centerY - cropSide * 0.5;
  const output = new Array<number>(784);
  let outputIndex = 0;
  for (let gridY = 0; gridY < MNIST_DRAW_GRID; gridY++) {
    for (let gridX = 0; gridX < MNIST_DRAW_GRID; gridX++) {
      const sampleX0 = cropX0 + (gridX / MNIST_DRAW_GRID) * cropSide;
      const sampleY0 = cropY0 + (gridY / MNIST_DRAW_GRID) * cropSide;
      const sampleX1 = cropX0 + ((gridX + 1) / MNIST_DRAW_GRID) * cropSide;
      const sampleY1 = cropY0 + ((gridY + 1) / MNIST_DRAW_GRID) * cropSide;
      const x0 = Math.max(0, Math.floor(sampleX0));
      const y0 = Math.max(0, Math.floor(sampleY0));
      const x1 = Math.min(width, Math.ceil(sampleX1));
      const y1 = Math.min(height, Math.ceil(sampleY1));
      let sum = 0;
      let count = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const channelIndex = (y * width + x) * 4;
          sum +=
            (data[channelIndex]! +
              data[channelIndex + 1]! +
              data[channelIndex + 2]!) /
            3;
          count++;
        }
      }
      output[outputIndex++] = count > 0 ? sum / count / 255 : 0;
    }
  }
  return output;
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
    const inferWorker = RT.inferWorkerHost;
    if (inferWorker?.isReady()) {
      void inferWorker
        .inferAsync(pixels, { live })
        .then((outcome) =>
          applyInferOutcome(outcome, label, sampleIndex, pixels, live),
        )
        .catch((error) => setStatus(`Infer-Fehler: ${String(error)}`));
      return;
    }
    inferOnMainThread(pixels, label, sampleIndex, live);
  } catch (error) {
    setStatus(`Infer-Fehler: ${String(error)}`);
  }
}
