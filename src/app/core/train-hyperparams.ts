export type TrainHyperparams = {
  lr: number;
  batchSize: number;
  epochs: number;
  vizEveryNBatches: number;
};

export const TRAIN_HYPERPARAM_DEFAULTS: TrainHyperparams = {
  lr: 0.02,
  batchSize: 32,
  epochs: 1,
  vizEveryNBatches: 4,
};

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

export function normalizeTrainHyperparams(
  prev: TrainHyperparams,
  patch: Partial<TrainHyperparams>,
): TrainHyperparams {
  const next = { ...prev, ...patch };
  return {
    epochs: parseIntInRange(
      String(next.epochs),
      TRAIN_HYPERPARAM_DEFAULTS.epochs,
      1,
      200,
    ),
    lr: parseFloatInRange(
      String(next.lr),
      TRAIN_HYPERPARAM_DEFAULTS.lr,
      0.0001,
      1,
    ),
    batchSize: parseIntInRange(
      String(next.batchSize),
      TRAIN_HYPERPARAM_DEFAULTS.batchSize,
      1,
      512,
    ),
    vizEveryNBatches: parseIntInRange(
      String(next.vizEveryNBatches),
      TRAIN_HYPERPARAM_DEFAULTS.vizEveryNBatches,
      1,
      1000,
    ),
  };
}

export function epochStepHintPlain(
  trainSampleCount: number,
  hp: TrainHyperparams,
): string {
  const bs = hp.batchSize;
  const ep = hp.epochs;
  const n = trainSampleCount;
  if (n <= 0) {
    return 'Sobald Trainingsdaten geladen sind, erscheint hier die ungefähre Anzahl Gradientenschritte.';
  }
  const per = Math.max(1, Math.ceil(n / bs));
  const total = per * ep;
  return `Bei Batchgröße ${bs}: rund ${per} Schritte pro Epoche, etwa ${total} für ${ep} Epoche(n).`;
}
