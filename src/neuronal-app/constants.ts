import { EXPECTED_LAYER_HIDDEN } from '../app/core/model.types';

export const LAYER_SIZES = [784, 64, 32, 10];
export const HIDDEN: number[] = [...EXPECTED_LAYER_HIDDEN];
export const METRICS_YIELD_EVERY = 150;
export const VIZ_DEBUG_INFER =
  typeof globalThis.location !== 'undefined' &&
  new URLSearchParams(globalThis.location.search).has('vizdebug');

export const MNIST_TRAIN_CSV = 'data/csv/mnist_train.csv.gz';
export const MNIST_TEST_CSV = 'data/csv/mnist_test.csv.gz';
export const MNIST_LABEL = 'MNIST';

/** Zeichen-Canvas: Bitmap exakt MNIST 28×28 (1 Pixel = 1 Eingabe); Anzeige skaliert per CSS. */
export const MNIST_DRAW_GRID = 28;

/** UI-Stufe 1…7: Stift-Chebyshev-Radius = `stufe − 1` (0…6), Radierer = Stift + 1 (max. 6). */
export const INFER_DRAW_BRUSH_SIZE_MIN = 1;
export const INFER_DRAW_BRUSH_SIZE_MAX = 7;

/** Referenz-Canvas-Kante (früher 320px) — weiche Pinselradien skalieren davon auf aktuelle `drawCanvas`-Größe. */
export const SOFT_DAB_REF_SIDE = 320;

/** @deprecated Nutze liveInferMinIntervalMs() aus mobile-quality. */
export const LIVE_INFER_MIN_MS = 48;
