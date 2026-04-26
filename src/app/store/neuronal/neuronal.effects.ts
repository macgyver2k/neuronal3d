import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { debounceTime, filter, skip, tap, withLatestFrom } from "rxjs";
import { NeuronalAppService } from "../../core/neuronal-app.service";
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
  private readonly neuronalApp = inject(NeuronalAppService);

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

  uiModelSelectChanged$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiModelSelectChanged),
        tap(() => {
          this.neuronalApp.onModelSelectChange();
        }),
      ),
    { dispatch: false },
  );

  uiTrainStart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiTrainStartRequested),
        tap(() => {
          this.neuronalApp.onTrain();
        }),
      ),
    { dispatch: false },
  );

  uiSaveAs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiSaveAsRequested),
        tap(() => {
          this.neuronalApp.onSaveAs();
        }),
      ),
    { dispatch: false },
  );

  uiReset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiResetRequested),
        tap(() => {
          this.neuronalApp.onReset();
        }),
      ),
    { dispatch: false },
  );

  uiInferRandom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiInferRandomRequested),
        tap(() => {
          this.neuronalApp.onInferRandom();
        }),
      ),
    { dispatch: false },
  );

  uiInferDraw$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiInferDrawRequested),
        tap(() => {
          this.neuronalApp.onInferDraw();
        }),
      ),
    { dispatch: false },
  );

  uiClearDraw$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiClearDrawRequested),
        tap(() => {
          this.neuronalApp.onClearDraw();
        }),
      ),
    { dispatch: false },
  );

  uiEpochPreset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiEpochPresetRequested),
        tap(({ epochs }) => {
          this.neuronalApp.onEpochPreset(epochs);
        }),
      ),
    { dispatch: false },
  );

  uiEpochsInput$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiEpochsInputChanged),
        tap(() => {
          this.neuronalApp.onEpochsInput();
        }),
      ),
    { dispatch: false },
  );

  uiBatchSizeInput$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiBatchSizeInputChanged),
        tap(() => {
          this.neuronalApp.onBatchSizeInput();
        }),
      ),
    { dispatch: false },
  );

  uiDocumentPointerDown$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiDocumentPointerDown),
        tap(({ event }) => {
          this.neuronalApp.onDocumentPointerDown(event);
        }),
      ),
    { dispatch: false },
  );

  uiDrawPointerDown$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiDrawPointerDown),
        tap(({ event }) => {
          this.neuronalApp.onDrawPointerDown(event);
        }),
      ),
    { dispatch: false },
  );

  uiDrawPointerMove$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiDrawPointerMove),
        tap(({ event }) => {
          this.neuronalApp.onDrawPointerMove(event);
        }),
      ),
    { dispatch: false },
  );

  uiDrawPointerUp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiDrawPointerUp),
        tap(() => {
          this.neuronalApp.onDrawPointerUp();
        }),
      ),
    { dispatch: false },
  );

  uiDrawPointerCancel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiDrawPointerCancel),
        tap(() => {
          this.neuronalApp.onDrawPointerCancel();
        }),
      ),
    { dispatch: false },
  );

  uiDrawPointerLeave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiDrawPointerLeave),
        tap(() => {
          this.neuronalApp.onDrawPointerLeave();
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
