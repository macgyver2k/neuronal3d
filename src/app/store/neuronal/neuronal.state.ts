import {
  ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT,
  HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
  INPUT_LAYER_PIXELS_LAYOUT,
  type HiddenLayerVizLayout,
  type InputLayerVizLayout,
} from '../../../viz/network3d';
import {
  DEFAULT_VIZ_LIGHT_COLORS,
  DEFAULT_VIZ_SCENE_COLORS,
  type VizLightColorSettings,
  type VizSceneColorSettings,
} from '../../../viz/viz-appearance';
import type {
  PersistedEpochRow,
  StoredModelCollection,
} from '../../core/model.types';

const emptyModelCollection = (): StoredModelCollection => ({
  version: 3,
  activeModelId: null,
  models: [],
});

export type Viz3dState = {
  inputLayerLayout: InputLayerVizLayout;
  inputLayerScale: number;
  hiddenLayerLayouts: readonly [HiddenLayerVizLayout, HiddenLayerVizLayout];
  hiddenLayerScales: readonly [number, number];
  activeNeuronMaxScaleMul: number;
  sceneColors: VizSceneColorSettings;
  lightColors: VizLightColorSettings;
};

export function createInitialViz3dState(): Viz3dState {
  return {
    inputLayerLayout: INPUT_LAYER_PIXELS_LAYOUT,
    inputLayerScale: HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
    hiddenLayerLayouts: ['ring', 'ring'],
    hiddenLayerScales: [
      HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
      HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
    ],
    activeNeuronMaxScaleMul: ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT,
    sceneColors: { ...DEFAULT_VIZ_SCENE_COLORS },
    lightColors: { ...DEFAULT_VIZ_LIGHT_COLORS },
  };
}

export type NeuronalState = {
  modelCollection: StoredModelCollection;
  modelStoreHydrated: boolean;
  epochByModelId: Record<string, PersistedEpochRow[]>;
  epochDisplayRows: PersistedEpochRow[];
  viz3d: Viz3dState;
  training: {
    running: boolean;
    pause: boolean;
    shouldStop: boolean;
    currentRun: number;
    currentRunStartedAt: string;
    currentRunStartedMs: number;
  };
  lastTrainLoss: number;
  lastTrainBatchAcc: number;
  modelDropdownOpen: boolean;
  /** Nur 3D-Canvas: linke Viz-Einstellungen, rechte Seitenleiste und Kopfzeile ausgeblendet. */
  vizImmersiveUi: boolean;
};

export function initialEpochDisplay(
  by: Record<string, PersistedEpochRow[]>,
  col: StoredModelCollection,
): PersistedEpochRow[] {
  const id = col.activeModelId;
  if (!id) return [];
  return [...(by[id] ?? [])];
}

export function createInitialNeuronalState(): NeuronalState {
  const modelCollection = emptyModelCollection();
  const epochByModelId: Record<string, PersistedEpochRow[]> = {};
  return {
    modelCollection,
    modelStoreHydrated: false,
    epochByModelId,
    epochDisplayRows: initialEpochDisplay(epochByModelId, modelCollection),
    viz3d: createInitialViz3dState(),
    training: {
      running: false,
      pause: false,
      shouldStop: false,
      currentRun: 0,
      currentRunStartedAt: '',
      currentRunStartedMs: 0,
    },
    lastTrainLoss: 0,
    lastTrainBatchAcc: 0,
    modelDropdownOpen: false,
    vizImmersiveUi: false,
  };
}
