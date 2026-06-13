import type { Action, MetaReducer } from '@ngrx/store';
import { saveViz3dToStorageSync } from '../core/viz3d-storage';
import type { AppState } from './app.state';

export const viz3dLocalStorageMeta: MetaReducer<AppState, Action> =
  (reducer) => (state, action) => {
    const next = reducer(state, action);
    const previousViz3d = state?.neuronal.viz3d;
    const nextViz3d = next.neuronal.viz3d;

    if (previousViz3d !== nextViz3d) {
      saveViz3dToStorageSync(nextViz3d);
    }

    return next;
  };
