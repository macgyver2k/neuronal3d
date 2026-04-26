import { createFeatureSelector, createSelector } from "@ngrx/store";
import type { NeuronalState } from "./neuronal.state";

const selectNeuronal = createFeatureSelector<NeuronalState>("neuronal");

export const selectModelCollection = createSelector(
  selectNeuronal,
  (s) => s.modelCollection,
);
export const selectActiveModelId = createSelector(
  selectNeuronal,
  (s) => s.modelCollection.activeModelId,
);
export const selectEpochByModelId = createSelector(
  selectNeuronal,
  (s) => s.epochByModelId,
);
export const selectEpochDisplayRows = createSelector(
  selectNeuronal,
  (s) => s.epochDisplayRows,
);
export const selectTraining = createSelector(
  selectNeuronal,
  (s) => s.training,
);
export const selectLastTrainLoss = createSelector(
  selectNeuronal,
  (s) => s.lastTrainLoss,
);
export const selectLastTrainBatchAcc = createSelector(
  selectNeuronal,
  (s) => s.lastTrainBatchAcc,
);
export const selectModelDropdownOpen = createSelector(
  selectNeuronal,
  (s) => s.modelDropdownOpen,
);
export const selectNeuronalState = createSelector(
  selectNeuronal,
  (s) => s,
);
export const selectPauseTraining = createSelector(
  selectNeuronal,
  (s) => s.training.pause,
);
export const selectStopTraining = createSelector(
  selectNeuronal,
  (s) => s.training.shouldStop,
);
export const selectTrainingRunning = createSelector(
  selectNeuronal,
  (s) => s.training.running,
);
