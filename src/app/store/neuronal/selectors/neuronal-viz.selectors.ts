import { createSelector } from '@ngrx/store';
import { normalizeVibeCameraTuning } from '../../../../viz/vibe-camera-settings';
import { selectNeuronal } from './neuronal-root.selectors';

export const model = createSelector(selectNeuronal, (s) => s.viz3d);

export const selectVibeCameraTuning = createSelector(selectNeuronal, (state) =>
  normalizeVibeCameraTuning(state.viz3d.vibeCamera),
);

export const selectVizImmersiveUi = createSelector(
  selectNeuronal,
  (s) => s.vizImmersiveUi,
);
