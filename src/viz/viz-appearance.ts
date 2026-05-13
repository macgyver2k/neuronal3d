export type VizSceneColorSettings = {
  /** Hintergrund und lineare Nebelfarbe */
  backgroundFog: string;
  /** Bodenplatte */
  floor: string;
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
};

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
