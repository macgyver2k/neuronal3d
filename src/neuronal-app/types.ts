import type {
  VizLightColorSettings,
  VizNetworkColorSettings,
  VizPostProcessSettings,
  VizSceneColorSettings,
} from '../viz/viz-appearance';

export type InferDrawBrushMode = 'pixels' | 'soft';

export type ReconcileWorkspaceUrlForModelSelection = (
  selectedModelId: string,
) => string | null;

export type NeuronalAppRuntime = {
  destroy: () => void;
  onTrain: () => void;
  onPause: () => void;
  onNewModel: () => void;
  onSaveAs: () => void;
  onReset: () => void;
  onInferRandom: () => void;
  onInferTrainSample: (index: number) => void;
  onInferDraw: () => void;
  onClearDraw: () => void;
  onDrawPointerDown: (e: PointerEvent) => void;
  onDrawPointerMove: (e: PointerEvent) => void;
  onDrawPointerUp: () => void;
  onDrawPointerCancel: () => void;
  onDrawPointerLeave: () => void;
  onHiddenLayerLayoutChange: (index: number, raw: string) => void;
  onHiddenLayerLayoutScaleChange: (index: number, scale: number) => void;
  onInputLayerLayoutChange: (raw: string) => void;
  onInputLayerLayoutScaleChange: (scale: number) => void;
  onActiveNeuronMaxScaleMulChange: (mul: number) => void;
  onVizSceneColorsApply: (colors: VizSceneColorSettings) => void;
  onVizLightColorsApply: (colors: VizLightColorSettings) => void;
  onVizNetworkColorsApply: (colors: VizNetworkColorSettings) => void;
  onVizPostProcessApply: (pp: VizPostProcessSettings) => void;
  previewVizSceneColor: (
    key: keyof VizSceneColorSettings,
    color: string,
  ) => void;
  previewVizLightColor: (
    key: keyof VizLightColorSettings,
    color: string,
  ) => void;
  cancelPendingVizColorPreviews: () => void;
  setVibeCameraMode: (enabled: boolean) => void;
  setTestImageCarouselMode: (enabled: boolean) => boolean;
  setVizFpsOverlay: (
    enabled: boolean,
    onSample: ((framesPerSecond: number) => void) | null,
  ) => void;
};

export type NeuronalRuntimeMountSurfaces = {
  vizMount: HTMLElement;
  inferDrawCanvas: HTMLCanvasElement;
};
