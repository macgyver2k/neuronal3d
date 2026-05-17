import { DOCUMENT } from '@angular/common';
import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  asyncScheduler,
  concatMap,
  debounceTime,
  EMPTY,
  exhaustMap,
  filter,
  from,
  mergeMap,
  of,
  skip,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { sampleDaisyThemeVizPalette } from '../../../viz/daisy-viz-palette';
import { createFreshStoredModelEntry } from '../../core/create-fresh-model-entry';
import { downloadJsonFile } from '../../core/download-json';
import { clearEpochTrackLocalStorageSync } from '../../core/epoch-storage';
import { clearModelStoreLocalStorageSync } from '../../core/model-storage';
import { NeuronalAppInstance } from '../../core/neuronal-app-instance';
import { NeuronalAppService } from '../../core/neuronal-app.service';
import { NeuronalEpochsIdbService } from '../../core/neuronal-epochs-idb.service';
import { ensureNeuronalDataLayout } from '../../core/neuronal-indexed-db';
import { NeuronalModelsIdbService } from '../../core/neuronal-models-idb.service';
import { readCurrentDaisyThemeFromDocument } from '../../workspace-ui/daisy-theme';
import type { AppState } from '../app.state';
import { NeuronalActions } from './neuronal.actions';
import {
  selectEpochByModelId,
  selectNeuronalState,
  selectTrainingRunning,
  selectVibeCameraTuning,
} from './neuronal.selectors';

@Injectable()
export class NeuronalEffects {
  private readonly store = inject(Store<AppState>);
  private readonly actions$ = inject(Actions);
  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private readonly app = inject(NeuronalAppInstance);
  private readonly neuronalApp = inject(NeuronalAppService);
  private readonly modelsIdb = inject(NeuronalModelsIdbService);
  private readonly epochsIdb = inject(NeuronalEpochsIdbService);

  viz3dBootstrapDaisySync$ = createEffect(() =>
    of(NeuronalActions.viz3dColorsSyncFromDaisyRequested()),
  );

  viz3dDaisyPaletteSync$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NeuronalActions.daisyUiAppThemeChanged,
        NeuronalActions.viz3dColorsSyncFromDaisyRequested,
        NeuronalActions.viz3dColorPresetModeChanged,
      ),
      withLatestFrom(this.store.select(selectNeuronalState)),
      mergeMap(([a, n]) => {
        if (n.viz3d.colorPresetMode === 'custom') return EMPTY;
        if ('theme' in a && n.viz3d.colorPresetMode !== 'followUi') {
          return EMPTY;
        }
        const theme =
          n.viz3d.colorPresetMode === 'fixedTheme'
            ? n.viz3d.colorPresetFixedTheme
            : 'theme' in a
              ? a.theme
              : readCurrentDaisyThemeFromDocument(this.doc);
        const sampled = sampleDaisyThemeVizPalette(this.doc, theme);
        return of(
          NeuronalActions.viz3dDaisyPaletteApplied({
            sceneColors: sampled.sceneColors,
            lightColors: sampled.lightColors,
            networkColors: sampled.networkColors,
            postProcessPatch: sampled.postProcessPatch,
          }),
        );
      }),
    ),
  );

  viz3dDaisyPaletteAppliedToRuntime$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.viz3dDaisyPaletteApplied),
        withLatestFrom(this.store.select(selectNeuronalState)),
        tap(([, n]) => {
          this.zone.runOutsideAngular(() => {
            this.neuronalApp.onVizSceneColorsApply(n.viz3d.sceneColors);
            this.neuronalApp.onVizLightColorsApply(n.viz3d.lightColors);
            this.neuronalApp.onVizNetworkColorsApply(n.viz3d.networkColors);
            this.neuronalApp.onVizPostProcessApply(n.viz3d.postProcess);
          });
        }),
      ),
    { dispatch: false },
  );

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
        observeOn(asyncScheduler),
        tap(([a]) => {
          this.app.activeModelFromToolbar(a.id);
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

  vizSceneColor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizSceneColorChanged),
        withLatestFrom(this.store.select(selectNeuronalState)),
        tap(([, n]) => {
          this.zone.runOutsideAngular(() => {
            this.neuronalApp.onVizSceneColorsApply(n.viz3d.sceneColors);
          });
        }),
      ),
    { dispatch: false },
  );

  vizSceneColorsPatch$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizSceneColorsPatch),
        withLatestFrom(this.store.select(selectNeuronalState)),
        tap(([, n]) => {
          this.zone.runOutsideAngular(() => {
            this.neuronalApp.onVizSceneColorsApply(n.viz3d.sceneColors);
          });
        }),
      ),
    { dispatch: false },
  );

  vizLightColor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizLightColorChanged),
        withLatestFrom(this.store.select(selectNeuronalState)),
        tap(([, n]) => {
          this.zone.runOutsideAngular(() => {
            this.neuronalApp.onVizLightColorsApply(n.viz3d.lightColors);
          });
        }),
      ),
    { dispatch: false },
  );

  vizNetworkColors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizNetworkColorsPatch),
        withLatestFrom(this.store.select(selectNeuronalState)),
        tap(([, n]) => {
          this.zone.runOutsideAngular(() => {
            this.neuronalApp.onVizNetworkColorsApply(n.viz3d.networkColors);
          });
        }),
      ),
    { dispatch: false },
  );

  vizPostProcess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NeuronalActions.vizPostProcessPatch),
        withLatestFrom(this.store.select(selectNeuronalState)),
        tap(([, n]) => {
          this.zone.runOutsideAngular(() => {
            this.neuronalApp.onVizPostProcessApply(n.viz3d.postProcess);
          });
        }),
      ),
    { dispatch: false },
  );

  vizVibeCamera$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          NeuronalActions.vizVibeCameraProfileChanged,
          NeuronalActions.vizVibeCameraTuningPatch,
        ),
        withLatestFrom(this.store.select(selectVibeCameraTuning)),
        tap(([, tuning]) => {
          this.zone.runOutsideAngular(() => {
            this.neuronalApp.onVibeCameraSettingsApply(tuning);
          });
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
