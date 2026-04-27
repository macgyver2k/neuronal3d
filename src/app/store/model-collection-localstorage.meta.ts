import type { Action, MetaReducer } from "@ngrx/store";
import { NeuronalModelsIdbService } from "../core/neuronal-models-idb.service";
import { saveModelStoreToStorageSync } from "../core/model-storage";
import type { AppState } from "./app.state";
import { NeuronalActions } from "./neuronal/neuronal.actions";

const modelsIdb = new NeuronalModelsIdbService();

export const modelCollectionLocalStorageMeta: MetaReducer<AppState, Action> = (reducer) => (state, action) => {
  const next = reducer(state, action);
  if (
    action.type === NeuronalActions.modelStoreHydrated.type ||
    action.type === NeuronalActions.modelEntryUpserted.type ||
    action.type === NeuronalActions.activeModelIdSet.type ||
    action.type === NeuronalActions.activeModelIdFromRouteSet.type
  ) {
    saveModelStoreToStorageSync(next.neuronal.modelCollection);
    void modelsIdb.saveCollection(next.neuronal.modelCollection);
  }
  return next;
};
