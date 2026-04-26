import { loadEpochTrackStoreFromStorage } from "../../core/epoch-storage";
import type { PersistedEpochRow, StoredModelCollection } from "../../core/model.types";

const emptyModelCollection = (): StoredModelCollection => ({
  version: 2,
  activeModelId: null,
  models: [],
});

export type NeuronalState = {
  modelCollection: StoredModelCollection;
  modelStoreHydrated: boolean;
  epochByModelId: Record<string, PersistedEpochRow[]>;
  epochDisplayRows: PersistedEpochRow[];
  training: {
    running: boolean;
    pause: boolean;
    shouldStop: boolean;
    currentRun: number;
    currentRunStartedAt: string;
    currentRunStartedMs: number;
  };
  lastTrainLoss: number;
  lastTrainBatchAcc: number;
  modelDropdownOpen: boolean;
};

export function initialEpochDisplay(
  by: Record<string, PersistedEpochRow[]>,
  col: StoredModelCollection,
): PersistedEpochRow[] {
  const id = col.activeModelId;
  if (!id) return [];
  return [...(by[id] ?? [])];
}

export function createInitialNeuronalState(): NeuronalState {
  const modelCollection = emptyModelCollection();
  const epochByModelId = { ...loadEpochTrackStoreFromStorage().byModelId };
  return {
    modelCollection,
    modelStoreHydrated: false,
    epochByModelId,
    epochDisplayRows: initialEpochDisplay(epochByModelId, modelCollection),
    training: {
      running: false,
      pause: false,
      shouldStop: false,
      currentRun: 0,
      currentRunStartedAt: "",
      currentRunStartedMs: 0,
    },
    lastTrainLoss: 0,
    lastTrainBatchAcc: 0,
    modelDropdownOpen: false,
  };
}
