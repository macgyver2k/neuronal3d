import type { Action, MetaReducer } from "@ngrx/store";
import { saveModelStoreToStorageSync } from "../core/model-storage";
import type { AppState } from "./app.state";
import { NeuronalActions } from "./neuronal/neuronal.actions";

export const modelCollectionLocalStorageMeta: MetaReducer<AppState, Action> = (reducer) => (state, action) => {
  const next = reducer(state, action);
  if (
    action.type === NeuronalActions.modelEntryUpserted.type ||
    action.type === NeuronalActions.activeModelIdSet.type
  ) {
    saveModelStoreToStorageSync(next.neuronal.modelCollection);
  }
  return next;
};
