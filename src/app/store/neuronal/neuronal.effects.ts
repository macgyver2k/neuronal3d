import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, debounceTime, skip, tap, withLatestFrom } from "rxjs";
import { NeuronalAppInstance } from "../../core/neuronal-app-instance";
import { saveEpochTrackStoreToStorageSync } from "../../core/epoch-storage";
import { saveModelStoreToStorageSync } from "../../core/model-storage";
import type { AppState } from "../app.state";
import { NeuronalActions } from "./neuronal.actions";
import { selectEpochByModelId, selectModelCollection, selectTrainingRunning } from "./neuronal.selectors";

@Injectable()
export class NeuronalEffects {
  private readonly store = inject(Store<AppState>);
  private readonly actions$ = inject(Actions);
  private readonly app = inject(NeuronalAppInstance);

  newModelFromToolbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.newModelFromToolbarRequested),
        withLatestFrom(this.store.select(selectTrainingRunning)),
        filter(([, running]) => !running),
        tap(() => {
          this.app.newModelFromToolbar();
        }),
      ),
    { dispatch: false },
  );

  activeModelFromToolbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.activeModelFromToolbarRequested),
        withLatestFrom(this.store.select(selectTrainingRunning)),
        filter(([a, running]) => !running && a.id.length > 0),
        tap(([a]) => {
          this.app.activeModelFromToolbar(a.id);
        }),
      ),
    { dispatch: false },
  );

  persistModelCollection$ = createEffect(
    () =>
      this.store.select(selectModelCollection).pipe(
        skip(1),
        debounceTime(200),
        tap((c) => {
          saveModelStoreToStorageSync(c);
        }),
      ),
    { dispatch: false },
  );

  persistEpoch$ = createEffect(
    () =>
      this.store.select(selectEpochByModelId).pipe(
        skip(1),
        debounceTime(200),
        tap((by) => {
          saveEpochTrackStoreToStorageSync({ version: 1, byModelId: by });
        }),
      ),
    { dispatch: false },
  );
}
