import { modelMatchesExpectedLayout } from '../app/core/model-storage';
import { NeuronalActions } from '../app/store/neuronal/neuronal.actions';
import { RT } from './runtime-state';
import { publishKernelCaps, setStatus } from './store-dispatch';
import { applyStoredModelToNet } from './stored-model-utils';
import { publishVizState, zeroActivationsForLayout } from './viz-sync';

export function loadSelectedModelIntoNet(id: string): boolean {
  const entry = RT.nLatest.modelCollection.models.find((m) => m.id === id);
  if (!entry) return false;
  if (!modelMatchesExpectedLayout(entry.model)) return false;
  const numW = 1 + entry.model.hidden.length;
  if (entry.model.weights.length !== numW || entry.model.biases.length !== numW)
    return false;
  RT.net = applyStoredModelToNet(entry.model);
  RT.lastInferActsDebug = null;
  const routeSegment =
    RT.reconcileWorkspaceUrlForModelSelection?.(entry.id) ?? null;
  RT.appStore.dispatch(
    NeuronalActions.activeModelIdSet({
      id: entry.id,
      routeModelSegmentFromUrl: routeSegment,
    }),
  );
  publishVizState('idle', zeroActivationsForLayout());
  publishKernelCaps();
  return true;
}

export function selectModelById(id: string, statusPrefix = 'Aktiv'): boolean {
  if (!id) return false;
  if (!loadSelectedModelIntoNet(id)) {
    setStatus('Modell konnte nicht geladen werden.');
    return false;
  }
  const entry = RT.nLatest.modelCollection.models.find((m) => m.id === id);
  setStatus(`${statusPrefix}: ${entry?.name ?? id}`);
  return true;
}
