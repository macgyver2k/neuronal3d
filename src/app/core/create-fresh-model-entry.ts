import { MLP } from '../../nn/network';
import { createRandomUuid } from './create-random-uuid';
import {
  EXPECTED_LAYER_HIDDEN,
  INPUT_DIM,
  OUTPUT_DIM,
  type StoredModel,
  type StoredModelEntry,
} from './model.types';

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

export function createFreshStoredModelEntry(): StoredModelEntry {
  const fresh = new MLP(INPUT_DIM, [...EXPECTED_LAYER_HIDDEN], OUTPUT_DIM);
  const now = new Date().toISOString();
  const id = createRandomUuid();
  return {
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
  };
}
