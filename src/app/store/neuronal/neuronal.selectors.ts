import { createSelector } from '@ngrx/store';
import { selectNeuronal } from './selectors/neuronal-root.selectors';
export {
  selectEpochByModelId,
  selectEpochDisplayRows,
  selectEpochTrackListModel,
  selectEpochTrackView,
} from './selectors/neuronal-epoch.selectors';
export type {
  EpochTrackRowModel,
  EpochTrackView,
} from './selectors/neuronal-epoch.selectors';
export {
  selectActiveModelId,
  selectModelCollection,
  selectModelDropdownButtonDisabled,
  selectModelDropdownLabel,
  selectModelDropdownMenu,
  selectModelDropdownOpen,
  selectModelStoreHydrated,
  selectNeuronalModelBar,
  selectShellHeaderActiveModel,
} from './selectors/neuronal-model.selectors';
export type {
  ModelBarMenuItem,
  ModelDropdownMenu,
  NeuronalModelBarModel,
} from './selectors/neuronal-model.selectors';
export { selectNeuronal } from './selectors/neuronal-root.selectors';
export {
  selectLastTrainBatchAcc,
  selectLastTrainLoss,
  selectPauseTraining,
  selectStopTraining,
  selectTraining,
  selectTrainingPanelModel,
  selectTrainingRunning,
} from './selectors/neuronal-training.selectors';
export type { TrainingPanelModel } from './selectors/neuronal-training.selectors';
export { selectInferPanelModel } from './selectors/neuronal-ui.selectors';
export type { InferPanelModel } from './selectors/neuronal-ui.selectors';
export {
  model,
  selectVizImmersiveUi,
} from './selectors/neuronal-viz.selectors';

export const selectNeuronalState = createSelector(selectNeuronal, (s) => s);
