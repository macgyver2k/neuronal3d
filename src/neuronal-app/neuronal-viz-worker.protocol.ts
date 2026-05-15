import type {
  HiddenLayerVizLayout,
  InputLayerVizLayout,
} from '../viz/network3d';
import type { VibeCameraTuning } from '../viz/vibe-camera-settings';
import type {
  VizLightColorSettings,
  VizNetworkColorSettings,
  VizPostProcessSettings,
  VizSceneColorSettings,
} from '../viz/viz-appearance';

export type VizWorkerHostToWorkerMessage =
  | {
      type: 'init';
      canvas: OffscreenCanvas;
      width: number;
      height: number;
      pixelRatio: number;
      layerSizes: readonly number[];
    }
  | { type: 'resize'; width: number; height: number; pixelRatio: number }
  | { type: 'dispose' }
  | { type: 'setVibeCameraMode'; enabled: boolean }
  | { type: 'applyVibeCameraSettings'; tuning: VibeCameraTuning }
  | { type: 'applyVizSceneColors'; colors: VizSceneColorSettings }
  | { type: 'applyVizLightColors'; colors: VizLightColorSettings }
  | { type: 'applyVizPostProcess'; settings: VizPostProcessSettings }
  | { type: 'setWeights'; weights: number[][][] }
  | { type: 'setIdleDim'; dim: boolean }
  | {
      type: 'setInferResult';
      predictedDigit: number | null;
      expectedDigit: number | null;
    }
  | {
      type: 'setEdgeFocus';
      mode: 'off' | 'infer' | 'trainRecent';
      activations: number[][] | null;
    }
  | { type: 'setActivations'; activations: number[][] }
  | {
      type: 'setHiddenLayerLayout';
      index: number;
      layout: HiddenLayerVizLayout;
    }
  | { type: 'setHiddenLayerLayoutScale'; index: number; scale: number }
  | { type: 'setInputLayerLayout'; layout: InputLayerVizLayout }
  | { type: 'setInputLayerLayoutScale'; scale: number }
  | { type: 'setActiveNeuronMaxScaleMul'; mul: number }
  | { type: 'applyVizNetworkColors'; colors: VizNetworkColorSettings }
  | {
      type: 'canvasPointer';
      eventType: string;
      initDict: PointerEventInit;
    }
  | { type: 'canvasWheel'; initDict: WheelEventInit }
  | { type: 'canvasContextMenu'; initDict: MouseEventInit }
  | { type: 'navKeyDown'; code: string }
  | { type: 'navKeyUp'; code: string }
  | { type: 'navKeysClear' }
  | { type: 'documentVisibilityHidden'; hidden: boolean }
  | { type: 'setFpsOverlayEnabled'; enabled: boolean };

export type VizWorkerWorkerToHostMessage =
  | { type: 'vizWorkerReady' }
  | { type: 'vizWorkerGlReady' }
  | { type: 'vizWorkerDisposed' }
  | { type: 'vizWorkerFpsSample'; fps: number };
