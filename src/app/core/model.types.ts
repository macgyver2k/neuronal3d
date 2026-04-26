import type { TrainEpochSummary } from '../../train/trainer';

export const EXPECTED_LAYER_HIDDEN = [64, 32] as const;
export const INPUT_DIM = 784;
export const OUTPUT_DIM = 10;

export type StoredModel = {
  version: 1;
  inputDim: number;
  hidden: number[];
  outputDim: number;
  weights: number[][][];
  biases: number[][][];
};

export type StoredModelMetrics = {
  lastLoss: number;
  lastBatchAcc: number;
  testAcc: number | null;
  errorRate: number | null;
  epochsTrained: number;
};

export type StoredModelEntry = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  model: StoredModel;
  metrics: StoredModelMetrics;
};

export type StoredModelCollection = {
  version: 3;
  activeModelId: string | null;
  models: StoredModelEntry[];
};

export type PersistedEpochRow = TrainEpochSummary & {
  savedAt: string;
  run: number;
  runStartedAt: string;
  runElapsedMs: number;
};

export type EpochTrackStore = {
  version: 1;
  byModelId: Record<string, PersistedEpochRow[]>;
};
