import { Store } from '@ngrx/store';
import { createFreshStoredModelEntry } from '../app/core/create-fresh-model-entry';
import type { PersistedEpochRow, StoredModel } from '../app/core/model.types';
import { NeuronalAppInstance } from '../app/core/neuronal-app-instance';
import { NeuronalEpochsIdbService } from '../app/core/neuronal-epochs-idb.service';
import { NeuronalModelsIdbService } from '../app/core/neuronal-models-idb.service';
import type { AppState } from '../app/store/app.state';
import { NeuronalActions } from '../app/store/neuronal/neuronal.actions';
import { selectNeuronalState } from '../app/store/neuronal/neuronal.selectors';
import type { NeuronalState } from '../app/store/neuronal/neuronal.state';
import { MLP } from '../nn/network';
import type { TrainingRunLastBatch } from '../train/trainer';
import {
  isValidHexColor6,
  type VizLightColorSettings,
  type VizNetworkColorSettings,
  type VizPostProcessSettings,
  type VizSceneColorSettings,
} from '../viz/viz-appearance';
import { HIDDEN, MNIST_DRAW_GRID } from './constants';
import { computeDatasetMetrics } from './dataset-metrics';
import {
  canvasPos,
  canvasPosToDrawCell,
  drawSoftEraseDab,
  drawSoftPenDab,
  resetCanvas2dPaintExtras,
  stampDrawCells,
  stampSoftBrushAlongSegment,
  strokeDrawCellsBresenham,
} from './draw-canvas-ops';
import {
  drawEraserChebRFromBrushSize,
  drawPenChebRFromBrushSize,
  getInferDrawBrushModeGlobal,
} from './infer-brush';
import {
  cancelLiveCanvasInferRaf,
  canvasToMnistPixels,
  inferWithPixels,
  runLiveCanvasInferNow,
  scheduleLiveCanvasInfer,
} from './infer-canvas-pipeline';
import { loadCsvData } from './mnist-csv-load';
import { getMnistTestDataRef, getMnistTrainDataRef } from './mnist-data';
import { packMnistTrainForTransfer } from './mnist-train-pack';
import { loadSelectedModelIntoNet, selectModelById } from './model-selection';
import { NeuronalTrainWorkerHost } from './neuronal-train-worker-host';
import { NeuronalVizRenderWorkerHost } from './neuronal-viz-worker-host';
import { RT } from './runtime-state';
import {
  applyEpochHistoryToUi,
  clearEpochHistoryForModel,
  getTrainConfig,
  nextRunSeq,
  publishKernelCaps,
  setModelDropdownOpen,
  setStatus,
  upsertModelEntry,
} from './store-dispatch';
import { applyStoredModelToNet, cloneStoredModel } from './stored-model-utils';
import { defaultModelName, fmtFloat, fmtInt, fmtPct } from './text-format';
import type {
  NeuronalAppRuntime,
  NeuronalRuntimeMountSurfaces,
  ReconcileWorkspaceUrlForModelSelection,
} from './types';
import {
  parseHiddenLayerVizLayout,
  parseInputLayerVizLayout,
  publishVizState,
  reapplyViz3dAfterLayoutChange,
  zeroActivationsForLayout,
} from './viz-sync';

function renderFrame(): void {
  RT.renderDisplayBound();
}

export async function createNeuronalAppRuntime(
  store: Store<AppState>,
  surfaces: NeuronalRuntimeMountSurfaces,
  appInstance: NeuronalAppInstance,
  reconcileWorkspaceUrl?: ReconcileWorkspaceUrlForModelSelection,
): Promise<NeuronalAppRuntime> {
  RT.appStore = store;
  RT.reconcileWorkspaceUrlForModelSelection = reconcileWorkspaceUrl;
  RT.surfaceVizMount = surfaces.vizMount;
  RT.surfaceDrawCanvas = surfaces.inferDrawCanvas;
  let neuronalTrainWorkerHost: NeuronalTrainWorkerHost | null = null;

  const unSubN = RT.appStore
    .select(selectNeuronalState)
    .subscribe((n: NeuronalState) => {
      const previous = RT.nLatest;
      RT.nLatest = n;
      if (previous != null) {
        neuronalTrainWorkerHost?.syncControlFromState(previous, n);
      }
    });
  const runNewModelFromToolbar = (): void => {
    if (RT.nLatest.training.running) return;
    const entry = createFreshStoredModelEntry();
    RT.net = applyStoredModelToNet(entry.model);
    RT.lastInferActsDebug = null;
    RT.appStore.dispatch(NeuronalActions.lastTrainMetricsReset());
    upsertModelEntry(entry);
    applyEpochHistoryToUi(entry.id);
    publishVizState('idle', zeroActivationsForLayout());
    setStatus(`Neues Modell: ${entry.name}`);
    publishKernelCaps();
  };
  const runActiveModelFromToolbar = (id: string): void => {
    if (RT.nLatest.training.running) return;
    if (!id) return;
    selectModelById(id, 'Aktives Modell');
  };
  setModelDropdownOpen(false);
  RT.surfaceDrawCanvas.width = MNIST_DRAW_GRID;
  RT.surfaceDrawCanvas.height = MNIST_DRAW_GRID;
  const ctxDraw = RT.surfaceDrawCanvas.getContext('2d');
  if (!ctxDraw) throw new Error('canvas');
  RT.ctx2d = ctxDraw;
  resetCanvas2dPaintExtras();
  RT.ctx2d.fillStyle = '#000000';
  RT.ctx2d.fillRect(
    0,
    0,
    RT.surfaceDrawCanvas.width,
    RT.surfaceDrawCanvas.height,
  );

  let neuronalVizHost: NeuronalVizRenderWorkerHost | null = null;
  neuronalVizHost = new NeuronalVizRenderWorkerHost(RT.surfaceVizMount);
  const {
    render,
    renderDisplay,
    setVibeCameraMode,
    applyVizSceneColors,
    applyVizLightColors,
    applyVizPostProcess,
  } = await neuronalVizHost.start();
  neuronalTrainWorkerHost = new NeuronalTrainWorkerHost();
  await neuronalTrainWorkerHost.whenReady();
  applyVizSceneColors(RT.nLatest.viz3d.sceneColors);
  applyVizLightColors(RT.nLatest.viz3d.lightColors);
  applyVizPostProcess(RT.nLatest.viz3d.postProcess);
  let sceneColorBaseline: VizSceneColorSettings = {
    ...RT.nLatest.viz3d.sceneColors,
  };
  let lightColorBaseline: VizLightColorSettings = {
    ...RT.nLatest.viz3d.lightColors,
  };
  let networkColorBaseline: VizNetworkColorSettings = {
    ...RT.nLatest.viz3d.networkColors,
  };
  let postProcessBaseline: VizPostProcessSettings = {
    ...RT.nLatest.viz3d.postProcess,
  };

  let sceneColorPreviewRaf = 0;
  let sceneColorPreviewPatch: Partial<VizSceneColorSettings> = {};
  let lightColorPreviewRaf = 0;
  let lightColorPreviewPatch: Partial<VizLightColorSettings> = {};

  const flushSceneColorPreview = (): void => {
    if (Object.keys(sceneColorPreviewPatch).length === 0) return;
    const merged: VizSceneColorSettings = { ...sceneColorBaseline };
    (
      Object.keys(sceneColorPreviewPatch) as (keyof VizSceneColorSettings)[]
    ).forEach((k) => {
      const v = sceneColorPreviewPatch[k];
      if (v !== undefined && isValidHexColor6(v)) merged[k] = v;
    });
    sceneColorPreviewPatch = {};
    applyVizSceneColors(merged);
  };

  const flushLightColorPreview = (): void => {
    if (Object.keys(lightColorPreviewPatch).length === 0) return;
    const merged: VizLightColorSettings = { ...lightColorBaseline };
    (
      Object.keys(lightColorPreviewPatch) as (keyof VizLightColorSettings)[]
    ).forEach((k) => {
      const v = lightColorPreviewPatch[k];
      if (v !== undefined && isValidHexColor6(v)) merged[k] = v;
    });
    lightColorPreviewPatch = {};
    applyVizLightColors(merged);
  };

  const cancelPendingVizColorPreviews = (): void => {
    if (sceneColorPreviewRaf !== 0) {
      cancelAnimationFrame(sceneColorPreviewRaf);
      sceneColorPreviewRaf = 0;
    }
    sceneColorPreviewPatch = {};
    if (lightColorPreviewRaf !== 0) {
      cancelAnimationFrame(lightColorPreviewRaf);
      lightColorPreviewRaf = 0;
    }
    lightColorPreviewPatch = {};
  };

  const previewVizSceneColor = (
    key: keyof VizSceneColorSettings,
    color: string,
  ): void => {
    if (!isValidHexColor6(color)) return;
    sceneColorPreviewPatch = { ...sceneColorPreviewPatch, [key]: color };
    if (sceneColorPreviewRaf !== 0) return;
    sceneColorPreviewRaf = requestAnimationFrame(() => {
      sceneColorPreviewRaf = 0;
      flushSceneColorPreview();
    });
  };

  const previewVizLightColor = (
    key: keyof VizLightColorSettings,
    color: string,
  ): void => {
    if (!isValidHexColor6(color)) return;
    lightColorPreviewPatch = { ...lightColorPreviewPatch, [key]: color };
    if (lightColorPreviewRaf !== 0) return;
    lightColorPreviewRaf = requestAnimationFrame(() => {
      lightColorPreviewRaf = 0;
      flushLightColorPreview();
    });
  };

  RT.renderSceneBound = render;
  RT.renderDisplayBound = renderDisplay;
  RT.disposeSceneBound = (): void => {
    neuronalVizHost?.destroy();
    neuronalVizHost = null;
  };
  setVibeCameraMode(true);
  const vizSurface = neuronalVizHost.vizSurface;
  RT.net3d = vizSurface;
  vizSurface.applyVizNetworkColors(networkColorBaseline);
  if (RT.net) vizSurface.setWeights(RT.net.weights);
  RT.stopAnimCleanup = (): void => {
    neuronalVizHost?.stopMainVizTickOnly();
  };

  appInstance.connect({
    newModelFromToolbar: runNewModelFromToolbar,
    activeModelFromToolbar: runActiveModelFromToolbar,
  });

  const onDrawPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0 && e.button !== 2) return;
    if (e.button === 2) e.preventDefault();
    RT.drawing = true;
    RT.surfaceDrawCanvas.setPointerCapture(e.pointerId);
    if (getInferDrawBrushModeGlobal() === 'soft') {
      resetCanvas2dPaintExtras();
      RT.drawSoftIsPen = e.button === 0;
      const p = canvasPos(e);
      if (RT.drawSoftIsPen) drawSoftPenDab(p.x, p.y);
      else drawSoftEraseDab(p.x, p.y);
      RT.drawLastSoftPoint = p;
      RT.drawLastCell = null;
      scheduleLiveCanvasInfer();
      return;
    }
    RT.drawInk = e.button === 2 ? '#000000' : '#ffffff';
    RT.drawBrushChebR =
      e.button === 2
        ? drawEraserChebRFromBrushSize()
        : drawPenChebRFromBrushSize();
    const c = canvasPosToDrawCell(canvasPos(e));
    RT.drawLastCell = c;
    RT.drawLastSoftPoint = null;
    stampDrawCells(c.gx, c.gy, RT.drawBrushChebR, RT.drawInk);
    scheduleLiveCanvasInfer();
  };
  const onDrawPointerMove = (e: PointerEvent): void => {
    if (!RT.drawing) return;
    if (getInferDrawBrushModeGlobal() === 'soft') {
      if (RT.drawLastSoftPoint === null) return;
      const p = canvasPos(e);
      stampSoftBrushAlongSegment(
        RT.drawLastSoftPoint.x,
        RT.drawLastSoftPoint.y,
        p.x,
        p.y,
        RT.drawSoftIsPen,
      );
      RT.drawLastSoftPoint = p;
      scheduleLiveCanvasInfer();
      return;
    }
    if (RT.drawLastCell === null) return;
    const c = canvasPosToDrawCell(canvasPos(e));
    strokeDrawCellsBresenham(
      RT.drawLastCell.gx,
      RT.drawLastCell.gy,
      c.gx,
      c.gy,
      RT.drawBrushChebR,
      RT.drawInk,
    );
    RT.drawLastCell = c;
    scheduleLiveCanvasInfer();
  };
  const onDrawPointerUp = (): void => {
    RT.drawing = false;
    RT.drawLastCell = null;
    RT.drawLastSoftPoint = null;
    resetCanvas2dPaintExtras();
    runLiveCanvasInferNow();
  };
  const onDrawPointerCancel = (): void => {
    RT.drawing = false;
    RT.drawLastCell = null;
    RT.drawLastSoftPoint = null;
    resetCanvas2dPaintExtras();
    runLiveCanvasInferNow();
  };
  const onDrawPointerLeave = (): void => {
    RT.drawing = false;
    RT.drawLastCell = null;
    RT.drawLastSoftPoint = null;
    resetCanvas2dPaintExtras();
    runLiveCanvasInferNow();
  };
  const onHiddenLayerLayoutChange = (index: number, raw: string): void => {
    const layout = parseHiddenLayerVizLayout(raw);
    if (!layout || !RT.net3d) return;
    RT.net3d.setHiddenLayerLayout(index, layout);
    reapplyViz3dAfterLayoutChange();
  };
  const onHiddenLayerLayoutScaleChange = (
    index: number,
    scale: number,
  ): void => {
    if (!RT.net3d || !Number.isFinite(scale)) return;
    RT.net3d.setHiddenLayerLayoutScale(index, scale);
    reapplyViz3dAfterLayoutChange();
  };
  const onInputLayerLayoutChange = (raw: string): void => {
    const layout = parseInputLayerVizLayout(raw);
    if (!layout || !RT.net3d) return;
    RT.net3d.setInputLayerLayout(layout);
    reapplyViz3dAfterLayoutChange();
  };
  const onInputLayerLayoutScaleChange = (scale: number): void => {
    if (!RT.net3d || !Number.isFinite(scale)) return;
    RT.net3d.setInputLayerLayoutScale(scale);
    reapplyViz3dAfterLayoutChange();
  };
  const onActiveNeuronMaxScaleMulChange = (mul: number): void => {
    if (!RT.net3d || !Number.isFinite(mul)) return;
    RT.net3d.setActiveNeuronMaxScaleMul(mul);
    reapplyViz3dAfterLayoutChange();
  };
  const onVizSceneColorsApply = (colors: VizSceneColorSettings): void => {
    sceneColorBaseline = { ...colors };
    applyVizSceneColors(sceneColorBaseline);
  };
  const onVizLightColorsApply = (colors: VizLightColorSettings): void => {
    lightColorBaseline = { ...colors };
    applyVizLightColors(lightColorBaseline);
  };
  const onVizNetworkColorsApply = (colors: VizNetworkColorSettings): void => {
    networkColorBaseline = { ...colors };
    if (RT.net3d) {
      RT.net3d.applyVizNetworkColors(networkColorBaseline);
      if (RT.net) RT.net3d.setWeights(RT.net.weights);
    }
    renderFrame();
  };
  const onVizPostProcessApply = (pp: VizPostProcessSettings): void => {
    postProcessBaseline = { ...pp };
    applyVizPostProcess(postProcessBaseline);
    renderFrame();
  };
  const onClearDraw = (): void => {
    resetCanvas2dPaintExtras();
    RT.ctx2d.fillStyle = '#000000';
    RT.ctx2d.fillRect(
      0,
      0,
      RT.surfaceDrawCanvas.width,
      RT.surfaceDrawCanvas.height,
    );
    runLiveCanvasInferNow();
  };

  const onInferRandom = (): void => {
    const testData = getMnistTestDataRef();
    if (!RT.net || testData.length === 0) return;
    let idx = Math.floor(Math.random() * testData.length);
    if (testData.length > 1 && idx === RT.lastInferSampleIndex) {
      idx = (idx + 1) % testData.length;
    }
    RT.lastInferSampleIndex = idx;
    const s = testData[idx]!;
    inferWithPixels(s.pixels, s.label, idx);
  };

  const onInferTrainSample = (index: number): void => {
    clearTestCarouselTimer();
    const trainData = getMnistTrainDataRef();
    if (!RT.net || trainData.length === 0) return;
    const idx = Math.max(0, Math.min(trainData.length - 1, Math.floor(index)));
    RT.lastInferSampleIndex = idx;
    const s = trainData[idx]!;
    inferWithPixels(s.pixels, s.label, idx);
  };

  let testCarouselTimer: number | null = null;
  let testCarouselIndex = 0;
  const TEST_CAROUSEL_MS = 2800;

  const clearTestCarouselTimer = (): void => {
    if (testCarouselTimer === null) return;
    window.clearInterval(testCarouselTimer);
    testCarouselTimer = null;
  };

  const stepTestImageCarousel = (): void => {
    const testData = getMnistTestDataRef();
    if (!RT.net || testData.length === 0) {
      clearTestCarouselTimer();
      return;
    }
    const idx = testCarouselIndex % testData.length;
    const s = testData[idx]!;
    RT.lastInferSampleIndex = idx;
    inferWithPixels(s.pixels, s.label, idx);
    testCarouselIndex = (testCarouselIndex + 1) % testData.length;
  };

  const setTestImageCarouselMode = (enabled: boolean): boolean => {
    clearTestCarouselTimer();
    if (!enabled) return false;
    const testData = getMnistTestDataRef();
    if (!RT.net || testData.length === 0) return false;
    stepTestImageCarousel();
    testCarouselTimer = window.setInterval(
      stepTestImageCarousel,
      TEST_CAROUSEL_MS,
    );
    return true;
  };

  const onInferDraw = (): void => {
    if (!RT.net) return;
    const pixels = canvasToMnistPixels();
    inferWithPixels(pixels);
  };
  const onPause = (): void => {
    RT.appStore.dispatch(NeuronalActions.trainingPauseToggled());
  };
  const onNewModel = (): void => {
    RT.appStore.dispatch(NeuronalActions.newModelFromToolbarRequested());
  };
  const onSaveAs = (): void => {
    if (!RT.net) return;
    const name = (
      window.prompt('Name für den neuen Modellstand:', defaultModelName()) ?? ''
    ).trim();
    if (!name) return;
    const n = RT.net;
    void (async () => {
      const now = new Date().toISOString();
      const testMetrics = await computeDatasetMetrics(n, getMnistTestDataRef());
      upsertModelEntry({
        id: crypto.randomUUID(),
        name,
        createdAt: now,
        updatedAt: now,
        model: cloneStoredModel(n),
        metrics: {
          lastLoss: RT.nLatest.lastTrainLoss,
          lastBatchAcc: RT.nLatest.lastTrainBatchAcc,
          testAcc: testMetrics ? testMetrics.accuracy : null,
          errorRate: testMetrics ? testMetrics.errorRate : null,
          epochsTrained: 0,
        },
      });
      setStatus(`Neuer Modellstand gespeichert: ${name}`);
    })();
  };
  const onReset = (): void => {
    if (RT.nLatest.training.running) return;
    const currentId = RT.nLatest.modelCollection.activeModelId;
    if (!currentId) return;
    const currentEntry = RT.nLatest.modelCollection.models.find(
      (m) => m.id === currentId,
    );
    if (!currentEntry) return;
    const fresh = new MLP(784, HIDDEN, 10);
    RT.net = fresh;
    RT.lastInferActsDebug = null;
    RT.appStore.dispatch(NeuronalActions.lastTrainMetricsReset());
    clearEpochHistoryForModel(currentId);
    upsertModelEntry({
      ...currentEntry,
      updatedAt: new Date().toISOString(),
      model: cloneStoredModel(fresh),
      metrics: {
        lastLoss: 0,
        lastBatchAcc: 0,
        testAcc: null,
        errorRate: null,
        epochsTrained: 0,
      },
    });
    applyEpochHistoryToUi(currentId);
    publishVizState('idle', zeroActivationsForLayout());
    setStatus(`Modell neu initialisiert: ${currentEntry.name}`);
    publishKernelCaps();
  };
  const onTrain = (): void => {
    void (async () => {
      await new Promise<void>((r) => {
        setTimeout(r, 0);
      });
      const trainData = getMnistTrainDataRef();
      if (trainData.length === 0) return;
      const trainCfg = getTrainConfig();
      if (!RT.net) {
        RT.net = new MLP(784, HIDDEN, 10);
        const now = new Date().toISOString();
        upsertModelEntry({
          id: crypto.randomUUID(),
          name: defaultModelName(),
          createdAt: now,
          updatedAt: now,
          model: cloneStoredModel(RT.net),
          metrics: {
            lastLoss: 0,
            lastBatchAcc: 0,
            testAcc: null,
            errorRate: null,
            epochsTrained: 0,
          },
        });
        publishKernelCaps();
      }
      RT.lastInferActsDebug = null;
      const trainModelId = RT.nLatest.modelCollection.activeModelId;
      if (!trainModelId) {
        return;
      }
      RT.appStore.dispatch(NeuronalActions.lastTrainMetricsReset());
      const t0 = Date.now();
      const t0s = new Date(t0).toISOString();
      const run = nextRunSeq(trainModelId, RT.nLatest.epochByModelId);
      RT.appStore.dispatch(
        NeuronalActions.trainingStarted({
          modelId: trainModelId,
          run,
          runStartedAt: t0s,
          runStartedMs: t0,
        }),
      );
      await new Promise<void>((r) => {
        setTimeout(r, 0);
      });
      publishVizState('train', zeroActivationsForLayout());
      let workerOutcome: {
        runMetrics: TrainingRunLastBatch;
        storedModel: StoredModel;
      } | null = null;
      try {
        if (!neuronalTrainWorkerHost) {
          throw new Error('Train-Worker nicht initialisiert');
        }
        const packedTrain = packMnistTrainForTransfer(
          trainData,
          RT.net!.inputDim,
        );
        workerOutcome = await neuronalTrainWorkerHost.runTrain(
          cloneStoredModel(RT.net!),
          packedTrain.trainingRows,
          trainCfg,
          {
            onSnapshot: (snapshot) => {
              setTimeout(() => {
                publishVizState(
                  'train',
                  snapshot.activations,
                  snapshot.weights,
                );
                setStatus(
                  `Ep ${fmtInt(snapshot.epoch + 1, 3)}  Batch ${fmtInt(snapshot.batchIndex, 5)}  loss ${fmtFloat(snapshot.loss, 8, 4)}  acc ${fmtFloat(snapshot.trainAccBatch * 100, 6, 1)}%`,
                );
              }, 0);
            },
            onEpochEnd: (epochSummary) => {
              const row: PersistedEpochRow = {
                ...epochSummary,
                run,
                savedAt: new Date().toISOString(),
                runStartedAt: t0s,
                runElapsedMs: Date.now() - t0,
              };
              RT.appStore.dispatch(
                NeuronalActions.trainingEpochAppended({
                  modelId: trainModelId,
                  row,
                }),
              );
            },
          },
          packedTrain.transferables,
        );
      } catch {
        setStatus('Training-Worker-Fehler');
      }
      if (workerOutcome) {
        RT.net = applyStoredModelToNet(workerOutcome.storedModel);
      }
      const runMetrics = workerOutcome?.runMetrics ?? {
        lastTrainLoss: 0,
        lastTrainBatchAcc: 0,
      };
      RT.appStore.dispatch(NeuronalActions.trainingFinished(runMetrics));
      if (RT.net && workerOutcome) {
        const testMetrics = await computeDatasetMetrics(
          RT.net,
          getMnistTestDataRef(),
        );
        const currentId = RT.nLatest.modelCollection.activeModelId;
        const currentEntry = currentId
          ? RT.nLatest.modelCollection.models.find((m) => m.id === currentId)
          : null;
        if (currentEntry) {
          upsertModelEntry({
            ...currentEntry,
            updatedAt: new Date().toISOString(),
            model: cloneStoredModel(RT.net),
            metrics: {
              lastLoss: runMetrics.lastTrainLoss,
              lastBatchAcc: runMetrics.lastTrainBatchAcc,
              testAcc: testMetrics
                ? testMetrics.accuracy
                : currentEntry.metrics.testAcc,
              errorRate: testMetrics
                ? testMetrics.errorRate
                : currentEntry.metrics.errorRate,
              epochsTrained:
                currentEntry.metrics.epochsTrained + trainCfg.epochs,
            },
          });
        }
      }
      if (RT.net) publishVizState('idle', zeroActivationsForLayout());
      const act = RT.nLatest.modelCollection.activeModelId
        ? RT.nLatest.modelCollection.models.find(
            (m) => m.id === RT.nLatest.modelCollection.activeModelId,
          )
        : null;
      setStatus(
        `Training beendet | aktiv: ${act?.name ?? '-'} | loss ${fmtFloat(runMetrics.lastTrainLoss, 8, 4)} | batch-acc ${fmtFloat(runMetrics.lastTrainBatchAcc * 100, 6, 2)}% | err ${fmtPct(act?.metrics.errorRate ?? null)} | acc ${fmtPct(act?.metrics.testAcc ?? null)}`,
      );
    })();
  };

  const onBeforeUnload = () => {
    void new NeuronalModelsIdbService().saveCollection(
      RT.nLatest.modelCollection,
    );
    void new NeuronalEpochsIdbService().saveEpochStore({
      version: 1,
      byModelId: RT.nLatest.epochByModelId,
    });
    RT.appStore.dispatch(NeuronalActions.trainingStopRequested());
    RT.stopAnimCleanup?.();
    RT.net3d?.dispose();
    RT.disposeSceneBound?.();
  };
  window.addEventListener('beforeunload', onBeforeUnload);

  setStatus('MNIST wird geladen …');
  publishKernelCaps();
  void loadCsvData();
  try {
    if (RT.nLatest.modelStoreHydrated) {
      const toLoad = RT.nLatest.modelCollection.activeModelId;
      if (toLoad && loadSelectedModelIntoNet(toLoad)) {
        const entry = RT.nLatest.modelCollection.models.find(
          (m) => m.id === toLoad,
        );
        setStatus(
          `Modell aus Browser-Speicher geladen: ${entry?.name ?? toLoad}`,
        );
      } else if (RT.nLatest.modelCollection.models.length > 0) {
        setStatus(
          `${RT.nLatest.modelCollection.models.length} Modellstände im Browser gefunden`,
        );
      }
    }
  } catch {
    setStatus('MNIST wird geladen …');
  }

  return {
    destroy: () => {
      try {
        void new NeuronalModelsIdbService().saveCollection(
          RT.nLatest.modelCollection,
        );
        void new NeuronalEpochsIdbService().saveEpochStore({
          version: 1,
          byModelId: RT.nLatest.epochByModelId,
        });
      } catch {}
      cancelLiveCanvasInferRaf();
      cancelPendingVizColorPreviews();
      clearTestCarouselTimer();
      RT.appStore.dispatch(NeuronalActions.trainingStopRequested());
      appInstance.disconnect();
      unSubN.unsubscribe();
      window.removeEventListener('beforeunload', onBeforeUnload);
      RT.stopAnimCleanup?.();
      RT.net3d?.dispose();
      RT.disposeSceneBound?.();
      neuronalTrainWorkerHost?.dispose();
      neuronalTrainWorkerHost = null;
      RT.net3d = null;
      RT.stopAnimCleanup = null;
      RT.disposeSceneBound = null;
      RT.reconcileWorkspaceUrlForModelSelection = undefined;
      RT.renderSceneBound = () => {};
      RT.renderDisplayBound = () => {};
    },
    onTrain,
    onPause,
    onNewModel,
    onSaveAs,
    onReset,
    onInferRandom,
    onInferTrainSample,
    onInferDraw,
    onClearDraw,
    onDrawPointerDown,
    onDrawPointerMove,
    onDrawPointerUp,
    onDrawPointerCancel,
    onDrawPointerLeave,
    onHiddenLayerLayoutChange,
    onHiddenLayerLayoutScaleChange,
    onInputLayerLayoutChange,
    onInputLayerLayoutScaleChange,
    onActiveNeuronMaxScaleMulChange,
    onVizSceneColorsApply,
    onVizLightColorsApply,
    onVizNetworkColorsApply,
    onVizPostProcessApply,
    previewVizSceneColor,
    previewVizLightColor,
    cancelPendingVizColorPreviews,
    setVibeCameraMode,
    setTestImageCarouselMode,
    setVizFpsOverlay: (
      enabled: boolean,
      onSample: ((framesPerSecond: number) => void) | null,
    ): void => {
      neuronalVizHost?.setFpsReporting(enabled, onSample);
    },
  };
}
