import { createSelector } from "@ngrx/store";
export { selectNeuronal } from "./selectors/neuronal-root.selectors";
export type { EpochTrackRowModel, EpochTrackView } from "./selectors/neuronal-epoch.selectors";
export type {
  ModelBarMenuItem,
  ModelDropdownMenu,
  NeuronalModelBarModel,
} from "./selectors/neuronal-model.selectors";
export {
  selectActiveModelId,
  selectModelCollection,
  selectModelDropdownButtonDisabled,
  selectModelDropdownLabel,
  selectModelDropdownMenu,
  selectModelDropdownOpen,
  selectModelStoreHydrated,
  selectNeuronalModelBar,
} from "./selectors/neuronal-model.selectors";
export {
  selectEpochByModelId,
  selectEpochDisplayRows,
  selectEpochTrackListModel,
  selectEpochTrackView,
} from "./selectors/neuronal-epoch.selectors";
export type { TrainingPanelModel } from "./selectors/neuronal-training.selectors";
export {
  selectLastTrainBatchAcc,
  selectLastTrainLoss,
  selectPauseTraining,
  selectStopTraining,
  selectTraining,
  selectTrainingPanelModel,
  selectTrainingRunning,
} from "./selectors/neuronal-training.selectors";
export type { InferPanelModel } from "./selectors/neuronal-ui.selectors";
export { selectInferPanelModel } from "./selectors/neuronal-ui.selectors";
import { selectNeuronal } from "./selectors/neuronal-root.selectors";

export const selectNeuronalState = createSelector(
  selectNeuronal,
  (s) => s,
);
