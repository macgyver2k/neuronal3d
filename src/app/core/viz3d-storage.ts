import {
  ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT,
  clampActiveNeuronMaxScaleMul,
  clampHiddenLayerVizScale,
  HIDDEN_LAYER_VIZ_LAYOUTS,
  HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
  INPUT_LAYER_PIXELS_LAYOUT,
  INPUT_LAYER_VIZ_LAYOUTS,
  type HiddenLayerVizLayout,
  type InputLayerVizLayout,
} from '../../viz/network3d';
import { normalizeVibeCameraTuning } from '../../viz/vibe-camera-settings';
import {
  DEFAULT_VIZ_LIGHT_COLORS,
  DEFAULT_VIZ_NETWORK_COLORS,
  DEFAULT_VIZ_POST_PROCESS,
  DEFAULT_VIZ_SCENE_COLORS,
  isValidHexColor6,
  mergeVizNetworkColors,
  mergeVizPostProcess,
  mergeVizSceneColors,
  type VizLightColorSettings,
  type VizNetworkColorSettings,
  type VizPostProcessSettings,
  type VizSceneColorSettings,
} from '../../viz/viz-appearance';
import type {
  Viz3dColorPresetMode,
  Viz3dState,
} from '../store/neuronal/neuronal.state';
import {
  DAISYUI_DEFAULT_THEME,
  isDaisyUiThemeName,
} from '../workspace-ui/daisy-theme';

const VIZ3D_STORAGE_KEY = 'neuronal3d:viz3d:v1';

type PersistedViz3dStore = {
  version: 1;
  viz3d: Viz3dState;
};

const parseInputLayerVizLayout = (raw: unknown): InputLayerVizLayout =>
  typeof raw === 'string' &&
  (INPUT_LAYER_VIZ_LAYOUTS as readonly string[]).includes(raw)
    ? (raw as InputLayerVizLayout)
    : INPUT_LAYER_PIXELS_LAYOUT;

const parseHiddenLayerVizLayout = (raw: unknown): HiddenLayerVizLayout =>
  typeof raw === 'string' &&
  (HIDDEN_LAYER_VIZ_LAYOUTS as readonly string[]).includes(raw)
    ? (raw as HiddenLayerVizLayout)
    : 'ring';

const parseColorPresetMode = (raw: unknown): Viz3dColorPresetMode =>
  raw === 'fixedTheme' || raw === 'custom' ? raw : 'followUi';

const parseHiddenLayerScale = (raw: unknown): number =>
  typeof raw === 'number' && Number.isFinite(raw)
    ? clampHiddenLayerVizScale(raw)
    : HIDDEN_LAYER_VIZ_SCALE_DEFAULT;

const parseHiddenLayerLayouts = (
  raw: unknown,
): readonly [HiddenLayerVizLayout, HiddenLayerVizLayout] => {
  if (!Array.isArray(raw) || raw.length < 2) return ['ring', 'ring'];
  return [parseHiddenLayerVizLayout(raw[0]), parseHiddenLayerVizLayout(raw[1])];
};

const parseHiddenLayerScales = (raw: unknown): readonly [number, number] => {
  if (!Array.isArray(raw) || raw.length < 2) {
    return [HIDDEN_LAYER_VIZ_SCALE_DEFAULT, HIDDEN_LAYER_VIZ_SCALE_DEFAULT];
  }

  return [parseHiddenLayerScale(raw[0]), parseHiddenLayerScale(raw[1])];
};

const normalizeLightColors = (raw: unknown): VizLightColorSettings => {
  const next = { ...DEFAULT_VIZ_LIGHT_COLORS };
  if (!raw || typeof raw !== 'object') return next;

  const patch = raw as Record<string, unknown>;
  for (const key of Object.keys(
    DEFAULT_VIZ_LIGHT_COLORS,
  ) as (keyof VizLightColorSettings)[]) {
    const value = patch[key];
    if (typeof value === 'string' && isValidHexColor6(value)) next[key] = value;
  }

  return next;
};

export function normalizeViz3dFromStorage(data: unknown): Viz3dState | null {
  if (!data || typeof data !== 'object') return null;

  const root = data as Record<string, unknown>;
  const version = root['version'];
  const rawViz3d = root['viz3d'];
  if (version !== 1 || !rawViz3d || typeof rawViz3d !== 'object') return null;

  const source = rawViz3d as Record<string, unknown>;

  return {
    inputLayerLayout: parseInputLayerVizLayout(source['inputLayerLayout']),
    inputLayerScale: parseHiddenLayerScale(source['inputLayerScale']),
    hiddenLayerLayouts: parseHiddenLayerLayouts(source['hiddenLayerLayouts']),
    hiddenLayerScales: parseHiddenLayerScales(source['hiddenLayerScales']),
    activeNeuronMaxScaleMul:
      typeof source['activeNeuronMaxScaleMul'] === 'number' &&
      Number.isFinite(source['activeNeuronMaxScaleMul'])
        ? clampActiveNeuronMaxScaleMul(source['activeNeuronMaxScaleMul'])
        : ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT,
    colorPresetMode: parseColorPresetMode(source['colorPresetMode']),
    colorPresetFixedTheme: (() => {
      const rawTheme = source['colorPresetFixedTheme'];
      return typeof rawTheme === 'string' && isDaisyUiThemeName(rawTheme)
        ? rawTheme
        : DAISYUI_DEFAULT_THEME;
    })(),
    sceneColors: mergeVizSceneColors(
      DEFAULT_VIZ_SCENE_COLORS,
      (source['sceneColors'] as Partial<VizSceneColorSettings>) ?? {},
    ),
    lightColors: normalizeLightColors(source['lightColors']),
    networkColors: mergeVizNetworkColors(
      DEFAULT_VIZ_NETWORK_COLORS,
      (source['networkColors'] as Partial<VizNetworkColorSettings>) ?? {},
    ),
    postProcess: mergeVizPostProcess(
      DEFAULT_VIZ_POST_PROCESS,
      (source['postProcess'] as Partial<VizPostProcessSettings>) ?? {},
    ),
    vibeCamera: normalizeVibeCameraTuning(
      source['vibeCamera'] as Partial<Viz3dState['vibeCamera']>,
    ),
  };
}

export function loadViz3dFromStorage(): Viz3dState | null {
  try {
    const raw = localStorage.getItem(VIZ3D_STORAGE_KEY);
    if (!raw) return null;
    return normalizeViz3dFromStorage(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function saveViz3dToStorageSync(viz3d: Viz3dState): void {
  const payload: PersistedViz3dStore = { version: 1, viz3d };
  try {
    localStorage.setItem(VIZ3D_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    void 0;
  }
}
