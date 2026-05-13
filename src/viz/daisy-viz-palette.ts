import type { DaisyUiThemeName } from '../app/workspace-ui/daisy-theme';
import {
  DEFAULT_VIZ_NETWORK_COLORS,
  DEFAULT_VIZ_POST_PROCESS,
  mergeVizNetworkColors,
  relativeLuminanceHex,
  type VizLightColorSettings,
  type VizNetworkColorSettings,
  type VizPostProcessSettings,
  type VizSceneColorSettings,
} from './viz-appearance';

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parseRgbChannel(raw: string): number {
  const t = raw.trim();
  if (t.endsWith('%')) {
    return clamp255((parseFloat(t) / 100) * 255);
  }
  return clamp255(parseFloat(t));
}

function cssColorToHex6(cssColor: string): string | null {
  const s = cssColor.trim();
  const rgbComma = s.match(
    /^rgba?\(\s*([\d.%]+)\s*,\s*([\d.%]+)\s*,\s*([\d.%]+)(?:\s*,\s*([\d.]+))?\s*\)$/i,
  );
  if (rgbComma) {
    const r = parseRgbChannel(rgbComma[1]);
    const g = parseRgbChannel(rgbComma[2]);
    const b = parseRgbChannel(rgbComma[3]);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  const rgbSpace = s.match(
    /^rgba?\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)(?:\s*\/\s*([\d.%]+))?\s*\)$/i,
  );
  if (rgbSpace) {
    const r = parseRgbChannel(rgbSpace[1]);
    const g = parseRgbChannel(rgbSpace[2]);
    const b = parseRgbChannel(rgbSpace[3]);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  const srgb = s.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);
  if (srgb) {
    const r = clamp255(parseFloat(srgb[1]) * 255);
    const g = clamp255(parseFloat(srgb[2]) * 255);
    const b = clamp255(parseFloat(srgb[3]) * 255);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  if (/^#[0-9A-Fa-f]{6}$/i.test(s)) return s.toLowerCase();
  if (/^#[0-9A-Fa-f]{8}$/i.test(s)) return s.slice(0, 7).toLowerCase();
  return null;
}

/**
 * `getComputedStyle` liefert oft `oklch(...)`; `fillStyle`-Rückgabe kann dasselbe sein.
 * Zuverlässig: ein Pixel rendern und RGB auslesen.
 */
function tryCanvasSampleToHex6(doc: Document, cssColor: string): string | null {
  const trimmed = cssColor.trim();
  if (!trimmed) return null;
  const canvas = doc.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = trimmed;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    if (d[3] < 16) return null;
    const r = d[0];
    const g = d[1];
    const bl = d[2];
    return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
  } catch {
    return null;
  }
}

function tryConvertCssColorString(doc: Document, css: string): string | null {
  const trimmed = css.trim();
  if (!trimmed) return null;
  const parsed = cssColorToHex6(trimmed);
  if (parsed) return parsed;
  return tryCanvasSampleToHex6(doc, trimmed);
}

function mixHex(a: string, colorB: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(colorB.slice(1), 16);
  const ar = (pa >> 16) & 255;
  const ag = (pa >> 8) & 255;
  const ab = pa & 255;
  const br = (pb >> 16) & 255;
  const bg = (pb >> 8) & 255;
  const bb = pb & 255;
  const u = Math.max(0, Math.min(1, t));
  const r = clamp255(ar + (br - ar) * u);
  const g = clamp255(ag + (bg - ag) * u);
  const bl = clamp255(ab + (bb - ab) * u);
  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}

function darkenHex(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) * factor;
  const g = ((n >> 8) & 255) * factor;
  const b = (n & 255) * factor;
  return `#${((1 << 24) + (clamp255(r) << 16) + (clamp255(g) << 8) + clamp255(b)).toString(16).slice(1)}`;
}

function lightenHex(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = clamp255(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * factor);
  const g = clamp255(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * factor);
  const b = clamp255((n & 255) + (255 - (n & 255)) * factor);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/** Leicht Richtung Ziel mischen (0–1), ohne harte Aufhellung */
function nudgeToward(from: string, toward: string, t: number): string {
  return mixHex(from, toward, Math.max(0, Math.min(1, t)));
}

export function readCssColorVarToHex(
  doc: Document,
  theme: DaisyUiThemeName,
  varName: string,
): string {
  const body = doc.body;
  if (!body) return '#808080';
  const probe = doc.createElement('div');
  probe.setAttribute('data-theme', theme);
  probe.style.cssText =
    'position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none';
  probe.style.color = `var(${varName})`;
  body.appendChild(probe);
  const cs = doc.defaultView?.getComputedStyle(probe);
  const fromResolved = cs ? tryConvertCssColorString(doc, cs.color) : null;
  const rawVar = cs?.getPropertyValue(varName).trim() ?? '';
  const fromVar = rawVar ? tryConvertCssColorString(doc, rawVar) : null;
  body.removeChild(probe);
  return fromResolved ?? fromVar ?? '#808080';
}

export function sampleDaisyThemeVizPalette(
  doc: Document,
  theme: DaisyUiThemeName,
): {
  sceneColors: VizSceneColorSettings;
  lightColors: VizLightColorSettings;
  networkColors: VizNetworkColorSettings;
  /** Hell: weiches Bild; dunkel: Standard-Bloom/Exposure aus `DEFAULT_VIZ_POST_PROCESS` */
  postProcessPatch: Partial<VizPostProcessSettings>;
} {
  const base100 = readCssColorVarToHex(doc, theme, '--color-base-100');
  const base200 = readCssColorVarToHex(doc, theme, '--color-base-200');
  const base300 = readCssColorVarToHex(doc, theme, '--color-base-300');
  const baseContent = readCssColorVarToHex(doc, theme, '--color-base-content');
  const primary = readCssColorVarToHex(doc, theme, '--color-primary');
  const primaryContent = readCssColorVarToHex(
    doc,
    theme,
    '--color-primary-content',
  );
  const secondary = readCssColorVarToHex(doc, theme, '--color-secondary');
  const accent = readCssColorVarToHex(doc, theme, '--color-accent');
  const info = readCssColorVarToHex(doc, theme, '--color-info');
  const warning = readCssColorVarToHex(doc, theme, '--color-warning');
  const error = readCssColorVarToHex(doc, theme, '--color-error');
  const neutral = readCssColorVarToHex(doc, theme, '--color-neutral');
  const neutralContent = readCssColorVarToHex(
    doc,
    theme,
    '--color-neutral-content',
  );

  const lum100 = relativeLuminanceHex(base100);
  const lumContent = relativeLuminanceHex(baseContent);
  /** Dunkles App-Theme: helle Flächen sind tatsächlich dunkel */
  const darkUi = lum100 < 0.38 && lumContent > lum100 + 0.12;

  const sceneColors: VizSceneColorSettings = darkUi
    ? {
        backgroundFog: nudgeToward(
          mixHex(base300, base200, 0.35),
          mixHex(base300, primary, 0.14),
          0.55,
        ),
        floor: nudgeToward(
          mixHex(base300, base200, 0.5),
          mixHex(base300, neutral, 0.12),
          0.35,
        ),
      }
    : {
        /** Helle UI: kräftig Richtung Textfarbe ziehen + leicht abdunkeln (Szene bleibt lesbar, nicht weiß) */
        backgroundFog: darkenHex(
          nudgeToward(
            mixHex(
              mixHex(base300, baseContent, 0.26),
              mixHex(base300, neutral, 0.14),
              0.52,
            ),
            mixHex(primary, baseContent, 0.55),
            0.14,
          ),
          0.9,
        ),
        floor: darkenHex(
          mixHex(
            mixHex(base300, baseContent, 0.2),
            mixHex(base300, mixHex(neutral, primary, 0.08), 0.35),
            0.48,
          ),
          0.93,
        ),
      };

  const lightColors: VizLightColorSettings = darkUi
    ? {
        hemiSky: nudgeToward(
          mixHex(base100, mixHex(base100, info, 0.22), 0.55),
          primary,
          0.12,
        ),
        hemiGround: mixHex(base300, mixHex(base200, neutral, 0.18), 0.42),
        ambient: mixHex(
          mixHex(base300, base200, 0.35),
          mixHex(baseContent, primary, 0.1),
          0.5,
        ),
        key: nudgeToward(mixHex(primary, primaryContent, 0.38), base100, 0.22),
        fill: mixHex(
          mixHex(secondary, base300, 0.45),
          mixHex(secondary, info, 0.15),
          0.35,
        ),
        rim: mixHex(accent, mixHex(base100, accent, 0.55), 0.4),
        backAccent: mixHex(info, mixHex(primary, neutralContent, 0.25), 0.35),
      }
    : {
        /** Helle UI: Lichtfarben mittig halten (Content/300), nur Akzente aus Semantik */
        hemiSky: darkenHex(
          nudgeToward(
            mixHex(
              mixHex(base300, baseContent, 0.12),
              mixHex(base200, base300, 0.55),
              0.38,
            ),
            mixHex(info, primary, 0.4),
            0.2,
          ),
          0.94,
        ),
        hemiGround: darkenHex(
          mixHex(
            base300,
            mixHex(neutral, mixHex(baseContent, base300, 0.25), 0.28),
            0.5,
          ),
          0.92,
        ),
        ambient: darkenHex(
          mixHex(
            mixHex(base300, baseContent, 0.18),
            mixHex(neutral, mixHex(primary, base300, 0.1), 0.15),
            0.45,
          ),
          0.93,
        ),
        key: darkenHex(
          mixHex(primary, mixHex(primaryContent, base300, 0.42), 0.45),
          0.94,
        ),
        fill: darkenHex(
          mixHex(
            secondary,
            mixHex(base300, mixHex(info, baseContent, 0.12), 0.28),
            0.42,
          ),
          0.93,
        ),
        rim: darkenHex(
          mixHex(
            accent,
            mixHex(base300, mixHex(secondary, baseContent, 0.12), 0.3),
            0.4,
          ),
          0.93,
        ),
        backAccent: darkenHex(
          mixHex(
            info,
            mixHex(base300, mixHex(accent, primary, 0.22), 0.24),
            0.38,
          ),
          0.92,
        ),
      };

  const postProcessPatch: Partial<VizPostProcessSettings> = darkUi
    ? {
        toneMappingExposure: DEFAULT_VIZ_POST_PROCESS.toneMappingExposure,
        bloomStrength: DEFAULT_VIZ_POST_PROCESS.bloomStrength,
        bloomThreshold: DEFAULT_VIZ_POST_PROCESS.bloomThreshold,
        bloomRadius: DEFAULT_VIZ_POST_PROCESS.bloomRadius,
      }
    : {
        toneMappingExposure: 0.78,
        bloomStrength: 0.14,
        bloomThreshold: 0.62,
        bloomRadius: 0.32,
      };

  const networkColors = mergeVizNetworkColors(DEFAULT_VIZ_NETWORK_COLORS, {
    neuronEmissive: primary,
    neuronHiddenCold: darkenHex(primary, 0.72),
    neuronHiddenHot: lightenHex(mixHex(primary, accent, 0.45), 0.35),
    neuronInputCold: darkenHex(primary, 0.75),
    neuronInputHot: lightenHex(baseContent, 0.45),
    neuronOutputCold: darkenHex(mixHex(primary, info, 0.35), 0.82),
    neuronOutputHot: lightenHex(mixHex(accent, info, 0.5), 0.25),
    edgePositiveCold: darkenHex(warning, 0.42),
    edgePositiveHot: warning,
    edgeNegativeCold: darkenHex(info, 0.38),
    edgeNegativeHot: lightenHex(info, 0.18),
    edgeInferMuted: darkenHex(mixHex(base300, baseContent, 0.3), 0.55),
    edgeTrainRecent: mixHex(warning, error, 0.35),
  });

  return { sceneColors, lightColors, networkColors, postProcessPatch };
}
