import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  concatMap,
  debounceTime,
  exhaustMap,
  filter,
  from,
  of,
  skip,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { downloadJsonFile } from '../../core/download-json';
import { clearEpochTrackLocalStorageSync } from '../../core/epoch-storage';
import { clearModelStoreLocalStorageSync } from '../../core/model-storage';
import { createFreshStoredModelEntry } from '../../core/create-fresh-model-entry';
import { ensureNeuronalDataLayout } from '../../core/neuronal-indexed-db';
import { NeuronalAppInstance } from '../../core/neuronal-app-instance';
import { NeuronalAppService } from '../../core/neuronal-app.service';
import { NeuronalEpochsIdbService } from '../../core/neuronal-epochs-idb.service';
import { NeuronalModelsIdbService } from '../../core/neuronal-models-idb.service';
import type { AppState } from '../app.state';
import { NeuronalActions } from './neuronal.actions';
import {
  selectEpochByModelId,
  selectModelCollection,
  selectModelStoreHydrated,
  selectNeuronalState,
  selectTrainingRunning,
} from './neuronal.selectors';

@Injectable()
export class NeuronalEffects {
  private readonly store = inject(Store<AppState>);
  private readonly actions$ = inject(Actions);
  private readonly app = inject(NeuronalAppInstance);
  private readonly neuronalApp = inject(NeuronalAppService);
  private readonly router = inject(Router);
  private readonly modelsIdb = inject(NeuronalModelsIdbService);
  private readonly epochsIdb = inject(NeuronalEpochsIdbService);

  modelStoreFromIdbLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NeuronalActions.modelStoreLoadRequested),
      exhaustMap(() =>
        from(
          (async () => {
            clearModelStoreLocalStorageSync();
            clearEpochTrackLocalStorageSync();
            await ensureNeuronalDataLayout();
            const [modelCollection, epochStore] = await Promise.all([
              this.modelsIdb.loadCollection(),
              this.epochsIdb.loadEpochStore(),
            ]);
            return { modelCollection, epochStore };
          })(),
        ).pipe(
          switchMap(({ modelCollection, epochStore }) =>
            of(
              NeuronalActions.epochStoreHydrated({
                byModelId: { ...epochStore.byModelId },
              }),
              NeuronalActions.modelStoreHydrated({ modelCollection }),
            ),
          ),
        ),
      ),
    ),
  );

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

  newModelFromListRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NeuronalActions.newModelFromListRequested),
      withLatestFrom(this.store.select(selectTrainingRunning)),
      filter(([, running]) => !running),
      concatMap(() => {
        const entry = createFreshStoredModelEntry();
        return from([
          NeuronalActions.lastTrainMetricsReset(),
          NeuronalActions.modelEntryUpserted({ entry }),
          NeuronalActions.epochViewSyncFromModel({ modelId: entry.id }),
        ]);
      }),
    ),
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

  modelRouteParamReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.modelRouteParamReceived),
        concatMap(({ segment }) =>
          this.store.select(selectModelStoreHydrated).pipe(
            filter((h): h is true => h),
            take(1),
            concatMap(() => {
              const id = segment.trim();
              if (!id) {
                return of(void 0);
              }
              return this.store.select(selectModelCollection).pipe(
                take(1),
                tap((col) => {
                  if (!col.models.some((m) => m.id === id)) {
                    void this.router.navigate(['/']);
                  } else {
                    this.store.dispatch(
                      NeuronalActions.activeModelIdFromRouteSet({ id }),
                    );
                  }
                }),
              );
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  activeModelIdFromRouteLoad$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.activeModelIdFromRouteSet),
        withLatestFrom(this.store.select(selectTrainingRunning)),
        filter(([, running]) => !running),
        tap(([{ id }]) => {
          this.app.activeModelFromToolbar(id);
        }),
      ),
    { dispatch: false },
  );

  activeModelIdSetUrlSync$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.activeModelIdSet),
        filter(({ id }) => id.length > 0),
        tap(({ id }) => {
          const path = this.router.url.split('?')[0].split('#')[0];
          const segs = path.split('/').filter(Boolean);
          if (segs[0] !== 'model') return;
          const param = segs[1];
          if (!param || param === 'new' || param === id) return;
          void this.router.navigate(['/model', id], { replaceUrl: true });
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

  vizInputLayerLayout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizInputLayerLayoutChanged),
        tap(({ raw }) => {
          this.neuronalApp.onInputLayerLayoutChange(raw);
        }),
      ),
    { dispatch: false },
  );

  vizInputLayerScale$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizInputLayerScaleChanged),
        tap(({ scale }) => {
          this.neuronalApp.onInputLayerLayoutScaleChange(scale);
        }),
      ),
    { dispatch: false },
  );

  vizHiddenLayerLayout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizHiddenLayerLayoutChanged),
        tap(({ index, raw }) => {
          this.neuronalApp.onHiddenLayerLayoutChange(index, raw);
        }),
      ),
    { dispatch: false },
  );

  vizHiddenLayerScale$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizHiddenLayerScaleChanged),
        tap(({ index, scale }) => {
          this.neuronalApp.onHiddenLayerLayoutScaleChange(index, scale);
        }),
      ),
    { dispatch: false },
  );

  vizActiveNeuronMaxScaleMul$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizActiveNeuronMaxScaleMulChanged),
        tap(({ mul }) => {
          this.neuronalApp.onActiveNeuronMaxScaleMulChange(mul);
        }),
      ),
    { dispatch: false },
  );

  uiExportBundle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.uiExportBundleRequested),
        withLatestFrom(this.store.select(selectNeuronalState)),
        tap(([, n]) => {
          downloadJsonFile('neuronal3d-models.json', n.modelCollection);
          downloadJsonFile('neuronal3d-epochs.json', {
            version: 1,
            byModelId: n.epochByModelId,
          });
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
          void this.epochsIdb.saveEpochStore({ version: 1, byModelId: by });
        }),
      ),
    { dispatch: false },
  );
}
