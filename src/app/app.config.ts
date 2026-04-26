import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { NeuronalEffects } from "./store/neuronal/neuronal.effects";
import { neuronalReducer } from "./store/neuronal/neuronal.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState("neuronal", neuronalReducer),
    provideEffects([NeuronalEffects]),
    ...(isDevMode()
      ? [provideStoreDevtools({ maxAge: 30, trace: false })]
      : []),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
