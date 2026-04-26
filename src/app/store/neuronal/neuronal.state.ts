import { loadEpochTrackStoreFromStorage } from "../../core/epoch-storage";
import { loadModelStoreFromStorage } from "../../core/model-storage";
import type { PersistedEpochRow, StoredModelCollection } from "../../core/model.types";

export type NeuronalState = {
  modelCollection: StoredModelCollection;
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

function initialEpochDisplay(
  by: Record<string, PersistedEpochRow[]>,
  col: StoredModelCollection,
): PersistedEpochRow[] {
  const id = col.activeModelId;
  if (!id) return [];
  return [...(by[id] ?? [])];
}

export function createInitialNeuronalState(): NeuronalState {
  const modelCollection = loadModelStoreFromStorage();
  const epochByModelId = { ...loadEpochTrackStoreFromStorage().byModelId };
  return {
    modelCollection,
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
