import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { modelCollectionLocalStorageMeta } from './store/model-collection-localstorage.meta';
import { NeuronalEffects } from './store/neuronal/neuronal.effects';
import { neuronalReducer } from './store/neuronal/neuronal.reducer';
import { viz3dLocalStorageMeta } from './store/viz3d-localstorage.meta';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(undefined, {
      metaReducers: [modelCollectionLocalStorageMeta, viz3dLocalStorageMeta],
    }),
    provideState('neuronal', neuronalReducer),
    provideState('router', routerReducer),
    provideEffects([NeuronalEffects]),
    ...(isDevMode()
      ? [provideStoreDevtools({ maxAge: 30, trace: false })]
      : []),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouterStore(),
  ],
};
