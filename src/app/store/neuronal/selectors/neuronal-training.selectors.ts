import { createSelector } from "@ngrx/store";
import { selectNeuronal } from "./neuronal-root.selectors";

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

export type TrainingPanelModel = {
  running: boolean;
  pause: boolean;
  lastTrainLoss: number;
  lastTrainBatchAcc: number;
};

export const selectTrainingPanelModel = createSelector(
  selectNeuronal,
  (s): TrainingPanelModel => ({
    running: s.training.running,
    pause: s.training.pause,
    lastTrainLoss: s.lastTrainLoss,
    lastTrainBatchAcc: s.lastTrainBatchAcc,
  }),
);
