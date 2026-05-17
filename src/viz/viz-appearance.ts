export type VizSceneColorSettings = {
  /** Hintergrund und lineare Nebelfarbe */
  backgroundFog: string;
  /** Bodenplatte */
  floor: string;
  /** Bodenplatte in der Szene anzeigen */
  floorVisible: boolean;
  /** Abstand, ab dem der Nebel einsetzt (Welt-Einheiten) */
  fogNear: number;
  /** Abstand, an dem der Nebel vollständig ist (Welt-Einheiten) */
  fogFar: number;
};

export type VizLightColorSettings = {
  hemiSky: string;
  hemiGround: string;
  ambient: string;
  key: string;
  fill: string;
  rim: string;
  backAccent: string;
};

export const DEFAULT_VIZ_SCENE_COLORS: VizSceneColorSettings = {
  backgroundFog: '#2a3140',
  floor: '#3d4658',
  floorVisible: false,
  fogNear: 12,
  fogFar: 120,
};

const FOG_NEAR_MIN = 0.5;
const FOG_NEAR_MAX = 80;
const FOG_FAR_MIN = 5;
const FOG_FAR_MAX = 200;
const FOG_NEAR_FAR_GAP = 1;

export function mergeVizSceneColors(
  base: VizSceneColorSettings,
  patch: Partial<VizSceneColorSettings>,
): VizSceneColorSettings {
  const next = { ...base };
  if (
    typeof patch.backgroundFog === 'string' &&
    isValidHexColor6(patch.backgroundFog)
  ) {
    next.backgroundFog = patch.backgroundFog;
  }
  if (typeof patch.floor === 'string' && isValidHexColor6(patch.floor)) {
    next.floor = patch.floor;
  }
  if (typeof patch.floorVisible === 'boolean') {
    next.floorVisible = patch.floorVisible;
  }
  const fogNear = patch.fogNear;
  if (typeof fogNear === 'number' && Number.isFinite(fogNear)) {
    next.fogNear = Math.min(FOG_NEAR_MAX, Math.max(FOG_NEAR_MIN, fogNear));
  }
  const fogFar = patch.fogFar;
  if (typeof fogFar === 'number' && Number.isFinite(fogFar)) {
    next.fogFar = Math.min(FOG_FAR_MAX, Math.max(FOG_FAR_MIN, fogFar));
  }
  if (next.fogFar <= next.fogNear + FOG_NEAR_FAR_GAP) {
    next.fogFar = Math.min(FOG_FAR_MAX, next.fogNear + FOG_NEAR_FAR_GAP);
  }
  return next;
}

export const DEFAULT_VIZ_LIGHT_COLORS: VizLightColorSettings = {
  hemiSky: '#d6e2ff',
  hemiGround: '#4b5668',
  ambient: '#ffffff',
  key: '#fff7ef',
  fill: '#aec3ff',
  rim: '#9df0ff',
  backAccent: '#5fd3ff',
};

export function isValidHexColor6(s: string): boolean {
  return typeof s === 'string' && /^#[0-9A-Fa-f]{6}$/.test(s);
}

/** WCAG-relative sRGB-Luminanz (0…1), für Belichtungsheuristik */
export function relativeLuminanceHex(hex: string): number {
  if (!isValidHexColor6(hex)) return 0;
  const n = parseInt(hex.slice(1), 16);
  const lin = (c8: number): number => {
    const x = c8 / 255;
    return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  const r = lin((n >> 16) & 255);
  const g = lin((n >> 8) & 255);
  const b = lin(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Farben für Neuronen (Körper über Aktivität) und Kanten (Gewichte / Fokus). */
export type VizNetworkColorSettings = {
  /** Emissive Grundton der Neuron-Kugeln (wirkt wie Leuchten). */
  neuronEmissive: string;
  neuronEmissiveIntensityActive: number;
  neuronEmissiveIntensityIdle: number;
  neuronHiddenCold: string;
  neuronHiddenHot: string;
  neuronInputCold: string;
  neuronInputHot: string;
  neuronOutputCold: string;
  neuronOutputHot: string;
  edgePositiveCold: string;
  edgePositiveHot: string;
  edgeNegativeCold: string;
  edgeNegativeHot: string;
  edgeInferMuted: string;
  edgeTrainRecent: string;
};

export type VizPostProcessSettings = {
  bloomEnabled: boolean;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  fxaaEnabled: boolean;
  toneMappingExposure: number;
};

/** Entspricht den früher fest codierten Standardwerten in `network3d.ts`. */
export const DEFAULT_VIZ_NETWORK_COLORS: VizNetworkColorSettings = {
  neuronEmissive: '#2a6bff',
  neuronEmissiveIntensityActive: 1.9,
  neuronEmissiveIntensityIdle: 0.28,
  neuronHiddenCold: '#1f59cc',
  neuronHiddenHot: '#5eccff',
  neuronInputCold: '#1f59cc',
  neuronInputHot: '#ffffff',
  neuronOutputCold: '#3373d9',
  neuronOutputHot: '#99d9ff',
  edgePositiveCold: '#40240f',
  edgePositiveHot: '#ffb83a',
  edgeNegativeCold: '#0f3852',
  edgeNegativeHot: '#57b3ff',
  edgeInferMuted: '#0d1217',
  edgeTrainRecent: '#f29e2e',
};

export const DEFAULT_VIZ_POST_PROCESS: VizPostProcessSettings = {
  bloomEnabled: true,
  bloomStrength: 0.55,
  bloomRadius: 0.45,
  bloomThreshold: 0.22,
  fxaaEnabled: true,
  toneMappingExposure: 1.35,
};

export const VIZ_NETWORK_COLOR_HEX_KEYS = [
  'neuronEmissive',
  'neuronHiddenCold',
  'neuronHiddenHot',
  'neuronInputCold',
  'neuronInputHot',
  'neuronOutputCold',
  'neuronOutputHot',
  'edgePositiveCold',
  'edgePositiveHot',
  'edgeNegativeCold',
  'edgeNegativeHot',
  'edgeInferMuted',
  'edgeTrainRecent',
] as const satisfies readonly (keyof VizNetworkColorSettings)[];

export function vizNetworkPatchHasHexColor(
  patch: Partial<VizNetworkColorSettings>,
): boolean {
  for (const k of VIZ_NETWORK_COLOR_HEX_KEYS) {
    if (typeof patch[k] === 'string') return true;
  }
  return false;
}

export function mergeVizNetworkColors(
  base: VizNetworkColorSettings,
  patch: Partial<VizNetworkColorSettings>,
): VizNetworkColorSettings {
  const next = { ...base };
  for (const k of VIZ_NETWORK_COLOR_HEX_KEYS) {
    const v = patch[k];
    if (typeof v === 'string' && isValidHexColor6(v)) next[k] = v;
  }
  const ia = patch.neuronEmissiveIntensityActive;
  if (typeof ia === 'number' && Number.isFinite(ia)) {
    next.neuronEmissiveIntensityActive = Math.min(4, Math.max(0.05, ia));
  }
  const ii = patch.neuronEmissiveIntensityIdle;
  if (typeof ii === 'number' && Number.isFinite(ii)) {
    next.neuronEmissiveIntensityIdle = Math.min(2, Math.max(0, ii));
  }
  return next;
}

export function mergeVizPostProcess(
  base: VizPostProcessSettings,
  patch: Partial<VizPostProcessSettings>,
): VizPostProcessSettings {
  const next = { ...base };
  if (typeof patch.bloomEnabled === 'boolean')
    next.bloomEnabled = patch.bloomEnabled;
  if (typeof patch.fxaaEnabled === 'boolean')
    next.fxaaEnabled = patch.fxaaEnabled;
  const bs = patch.bloomStrength;
  if (typeof bs === 'number' && Number.isFinite(bs)) {
    next.bloomStrength = Math.min(3, Math.max(0, bs));
  }
  const br = patch.bloomRadius;
  if (typeof br === 'number' && Number.isFinite(br)) {
    next.bloomRadius = Math.min(1, Math.max(0, br));
  }
  const bt = patch.bloomThreshold;
  if (typeof bt === 'number' && Number.isFinite(bt)) {
    next.bloomThreshold = Math.min(1, Math.max(0, bt));
  }
  const te = patch.toneMappingExposure;
  if (typeof te === 'number' && Number.isFinite(te)) {
    next.toneMappingExposure = Math.min(3, Math.max(0.2, te));
  }
  return next;
}
