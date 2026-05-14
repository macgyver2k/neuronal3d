import {
  INFER_DRAW_BRUSH_SIZE_MAX,
  INFER_DRAW_BRUSH_SIZE_MIN,
} from './constants';
import { RT } from './runtime-state';
import type { InferDrawBrushMode } from './types';

export type { InferDrawBrushMode };

let inferDrawBrushSize = 4;
let inferDrawBrushMode: InferDrawBrushMode = 'pixels';

export function drawPenChebRFromBrushSize(): number {
  return Math.min(6, Math.max(0, inferDrawBrushSize - 1));
}

export function drawEraserChebRFromBrushSize(): number {
  return Math.min(6, drawPenChebRFromBrushSize() + 1);
}

export function inferDrawBrushSoftScale(): number {
  return 0.52 + inferDrawBrushSize * 0.11;
}

export function setInferDrawBrushModeGlobal(m: InferDrawBrushMode): void {
  inferDrawBrushMode = m;
  RT.drawing = false;
  RT.drawLastCell = null;
  RT.drawLastSoftPoint = null;
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
