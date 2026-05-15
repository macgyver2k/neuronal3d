import * as THREE from 'three';
import {
  DEFAULT_VIZ_NETWORK_COLORS,
  isValidHexColor6,
  type VizNetworkColorSettings,
} from './viz-appearance';

function createDigitTexture(digit: number): THREE.CanvasTexture {
  const canvas = new OffscreenCanvas(128, 128);
  const graphics = canvas.getContext('2d');
  if (!graphics) throw new Error('canvas2d');
  graphics.clearRect(0, 0, 128, 128);
  graphics.fillStyle = '#ffffff';
  graphics.textAlign = 'center';
  graphics.textBaseline = 'middle';
  graphics.font = 'bold 92px system-ui, sans-serif';
  graphics.fillText(String(digit), 64, 68);
  const texture = new THREE.CanvasTexture(
    canvas as unknown as HTMLCanvasElement,
  );
  texture.needsUpdate = true;
  return texture;
}

const OUTPUT_DIGIT_SPRITE_MUL = 4;
const outputDigitSpriteBase = 0.34 * OUTPUT_DIGIT_SPRITE_MUL;
const outputDigitSpritePred = 0.46 * OUTPUT_DIGIT_SPRITE_MUL;
const outputDigitSpriteWrongExpected = 0.48 * OUTPUT_DIGIT_SPRITE_MUL;
const outputDigitRowStep = 0.42 * OUTPUT_DIGIT_SPRITE_MUL;
const LAYER_SPACING = 3.2;
const OUTPUT_LABEL_X_OFFSET = 1.8;
const OUTPUT_LABEL_Y = 2.4;
const OUTPUT_NEURON_Y_BELOW_LABEL = 0.92;

const digitSpriteColA = new THREE.Color();
const digitSpriteColB = new THREE.Color();

export const HIDDEN_LAYER_VIZ_LAYOUTS = [
  'ring',
  'grid',
  'line',
  'arc',
  'arcAlt',
] as const;
export type HiddenLayerVizLayout = (typeof HIDDEN_LAYER_VIZ_LAYOUTS)[number];

export const INPUT_LAYER_PIXELS_LAYOUT = 'pixels' as const;
export const INPUT_LAYER_VIZ_LAYOUTS = [
  INPUT_LAYER_PIXELS_LAYOUT,
  ...HIDDEN_LAYER_VIZ_LAYOUTS,
] as const;
export type InputLayerVizLayout = (typeof INPUT_LAYER_VIZ_LAYOUTS)[number];

export const HIDDEN_LAYER_VIZ_SCALE_MIN = 0.25;
export const HIDDEN_LAYER_VIZ_SCALE_MAX = 2.5;
export const HIDDEN_LAYER_VIZ_SCALE_STEP = 0.05;
export const HIDDEN_LAYER_VIZ_SCALE_DEFAULT = 1;

export function clampHiddenLayerVizScale(v: number): number {
  return Math.min(
    HIDDEN_LAYER_VIZ_SCALE_MAX,
    Math.max(HIDDEN_LAYER_VIZ_SCALE_MIN, v),
  );
}

export const ACTIVE_NEURON_MAX_SCALE_MUL_MIN = 0.05;
export const ACTIVE_NEURON_MAX_SCALE_MUL_MAX = 2.5;
export const ACTIVE_NEURON_MAX_SCALE_MUL_STEP = 0.05;
export const ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT = 1;

const NEURON_BASE_DISPLAY_SCALE = 0.17;

const ACTIVE_NEURON_HIDDEN_MIN = 0.06;
const ACTIVE_NEURON_HIDDEN_RANGE = 0.98;
const ACTIVE_NEURON_OUTPUT_MIN = 0.07;
const ACTIVE_NEURON_OUTPUT_RANGE = 1.28;

export function clampActiveNeuronMaxScaleMul(v: number): number {
  return Math.min(
    ACTIVE_NEURON_MAX_SCALE_MUL_MAX,
    Math.max(ACTIVE_NEURON_MAX_SCALE_MUL_MIN, v),
  );
}

function placeHiddenLayerPoints(
  n: number,
  x: number,
  mode: HiddenLayerVizLayout,
  pts: THREE.Vector3[],
  scale: number,
): void {
  const ringR = 0.35 + Math.min(1.4, n * 0.018);
  if (mode === 'ring') {
    for (let i = 0; i < n; i++) {
      const t = (i / Math.max(1, n)) * Math.PI * 2;
      pts[i]!.set(x, Math.sin(t) * ringR, Math.cos(t) * ringR);
    }
  } else if (mode === 'grid') {
    const side = Math.ceil(Math.sqrt(n));
    let k = 0;
    for (let a = 0; a < side && k < n; a++) {
      for (let b = 0; b < side && k < n; b++) {
        const fy = (a / Math.max(1, side - 1) - 0.5) * 2.2;
        const fz = (b / Math.max(1, side - 1) - 0.5) * 2.2;
        pts[k]!.set(x, fy, fz);
        k++;
      }
    }
  } else if (mode === 'line') {
    const minStep = 0.34;
    const span = Math.max(ringR * 3.5, 1.4, minStep * Math.max(0, n - 1));
    const step = n > 1 ? span / (n - 1) : 0;
    const z0 = -((n - 1) * 0.5) * step;
    for (let i = 0; i < n; i++) {
      pts[i]!.set(x, 0, z0 + i * step);
    }
  } else {
    const t0 = mode === 'arc' ? 0 : Math.PI;
    for (let i = 0; i < n; i++) {
      const t = n <= 1 ? t0 + Math.PI * 0.5 : t0 + (i / (n - 1)) * Math.PI;
      pts[i]!.set(x, Math.sin(t) * ringR, Math.cos(t) * ringR);
    }
  }
  if (scale !== 1) {
    for (let i = 0; i < n; i++) {
      const p = pts[i]!;
      p.set(p.x, p.y * scale, p.z * scale);
    }
  }
}

function placeInputLayer784(
  pts: THREE.Vector3[],
  x: number,
  layout: InputLayerVizLayout,
  scale: number,
): void {
  const n = 784;
  if (layout === 'pixels') {
    for (let i = 0; i < n; i++) {
      const u = i % 28;
      const v = 27 - Math.floor(i / 28);
      pts[i]!.set(x, (v - 13.5) * 0.12, (u - 13.5) * 0.12);
    }
    if (scale !== 1) {
      for (let i = 0; i < n; i++) {
        const p = pts[i]!;
        p.set(p.x, p.y * scale, p.z * scale);
      }
    }
  } else {
    placeHiddenLayerPoints(n, x, layout, pts, scale);
  }
}

function layoutPositions(
  layerSizes: number[],
  hiddenLayouts: HiddenLayerVizLayout[],
  hiddenScales: number[],
  inputLayout: InputLayerVizLayout,
  inputScale: number,
): THREE.Vector3[][] {
  const out: THREE.Vector3[][] = [];
  const outIdx = layerSizes.length - 1;
  for (let L = 0; L < layerSizes.length; L++) {
    const n = layerSizes[L];
    const x = L * LAYER_SPACING;
    const pts: THREE.Vector3[] = [];
    if (L === 0 && n === 784) {
      for (let i = 0; i < 784; i++) {
        pts.push(new THREE.Vector3());
      }
      placeInputLayer784(pts, x, inputLayout, inputScale);
    } else if (L === outIdx && L > 0) {
      const labelX = outIdx * LAYER_SPACING + OUTPUT_LABEL_X_OFFSET;
      const ny = OUTPUT_LABEL_Y - OUTPUT_NEURON_Y_BELOW_LABEL;
      for (let i = 0; i < n; i++) {
        const z = (i - (n - 1) * 0.5) * outputDigitRowStep;
        pts.push(new THREE.Vector3(labelX, ny, z));
      }
    } else {
      for (let i = 0; i < n; i++) {
        pts.push(new THREE.Vector3());
      }
      const h = L - 1;
      const mode = hiddenLayouts[h] ?? 'ring';
      const sc = hiddenScales[h] ?? HIDDEN_LAYER_VIZ_SCALE_DEFAULT;
      placeHiddenLayerPoints(n, x, mode, pts, sc);
    }
    out.push(pts);
  }
  return out;
}

function defaultHiddenLayouts(layerSizes: number[]): HiddenLayerVizLayout[] {
  return new Array<HiddenLayerVizLayout>(
    Math.max(0, layerSizes.length - 2),
  ).fill('ring');
}

function defaultHiddenScales(layerSizes: number[]): number[] {
  return new Array(Math.max(0, layerSizes.length - 2)).fill(
    HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
  ) as number[];
}

export class Network3D {
  readonly root = new THREE.Group();
  private readonly meshes: THREE.InstancedMesh[] = [];
  private readonly edgeLines: THREE.LineSegments[] = [];
  private readonly edgeFromTo: Array<Array<{ from: number; to: number }>> = [];
  private readonly edgeWeightScale: number[] = [];
  private readonly activationScale: number[] = [];
  private readonly dummy = new THREE.Object3D();
  private readonly layerSizes: number[];
  private readonly positions: THREE.Vector3[][];
  private readonly outputDigitSprites: THREE.Sprite[] = [];
  private edgeFocusMode: 'off' | 'infer' | 'trainRecent' = 'off';
  private edgeFocusActivations: number[][] | null = null;
  private readonly edgeFocusThreshold = 0.22;
  private readonly edgeFocusThresholdFirstLayer = 0.38;
  private readonly edgeRecentLastWeight: Float32Array[] = [];
  private readonly edgeRecentDelta: Float32Array[] = [];
  private readonly edgeRecentAge: Uint16Array[] = [];
  private readonly edgeRecentHighlightT: Float32Array[] = [];
  private readonly edgeRecentDeltaAbsMin = 0.0008;
  private readonly edgeRecentWindow = 12;
  private trainPrevActivations: number[][] | null = null;
  private readonly trainActStepEps = 1e-4;
  private readonly edgeBaseOpacity: number[] = [];
  private idleDimmed = false;
  private inferPredictedDigit: number | null = null;
  private inferExpectedDigit: number | null = null;
  private hiddenLayouts: HiddenLayerVizLayout[] = [];
  private hiddenLayoutScales: number[] = [];
  private inputLayerLayout: InputLayerVizLayout = INPUT_LAYER_PIXELS_LAYOUT;
  private inputLayerScale = HIDDEN_LAYER_VIZ_SCALE_DEFAULT;
  private activeNeuronMaxScaleMul = ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT;
  private networkColors: VizNetworkColorSettings = {
    ...DEFAULT_VIZ_NETWORK_COLORS,
  };
  private readonly colNeuronHiddenCold = new THREE.Color();
  private readonly colNeuronHiddenHot = new THREE.Color();
  private readonly colNeuronInputCold = new THREE.Color();
  private readonly colNeuronInputHot = new THREE.Color();
  private readonly colNeuronOutputCold = new THREE.Color();
  private readonly colNeuronOutputHot = new THREE.Color();
  private readonly colEdgePosCold = new THREE.Color();
  private readonly colEdgePosHot = new THREE.Color();
  private readonly colEdgeNegCold = new THREE.Color();
  private readonly colEdgeNegHot = new THREE.Color();
  private readonly colEdgeInferMuted = new THREE.Color();
  private readonly colEdgeTrainRecent = new THREE.Color();
  private readonly colNeuronEmissive = new THREE.Color();
  private readonly scratchNeuronColor = new THREE.Color();
  private readonly scratchV3a = new THREE.Vector3();
  private readonly scratchV3b = new THREE.Vector3();
  private readonly scratchV3c = new THREE.Vector3();

  constructor(layerSizes: number[]) {
    this.layerSizes = [...layerSizes];
    this.hiddenLayouts = defaultHiddenLayouts(this.layerSizes);
    this.hiddenLayoutScales = defaultHiddenScales(this.layerSizes);
    this.positions = layoutPositions(
      this.layerSizes,
      this.hiddenLayouts,
      this.hiddenLayoutScales,
      this.inputLayerLayout,
      this.inputLayerScale,
    );
    const geom = new THREE.SphereGeometry(0.09, 10, 8);
    for (let L = 0; L < this.layerSizes.length; L++) {
      const n = this.layerSizes[L];
      const mat = new THREE.MeshPhongMaterial({
        shininess: 0,
        specular: 0x000000,
        emissive: 0x2a6bff,
        emissiveIntensity: 1.9,
        toneMapped: false,
        vertexColors: true,
      });
      const mesh = new THREE.InstancedMesh(geom, mat, n);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const colors = new Float32Array(n * 3);
      const colorAttr = new THREE.InstancedBufferAttribute(colors, 3);
      colorAttr.setUsage(THREE.DynamicDrawUsage);
      mesh.instanceColor = colorAttr;
      const pos = this.positions[L];
      for (let i = 0; i < n; i++) {
        this.dummy.position.copy(pos[i]);
        const s = NEURON_BASE_DISPLAY_SCALE;
        this.dummy.scale.setScalar(s);
        this.dummy.updateMatrix();
        mesh.setMatrixAt(i, this.dummy.matrix);
        colors[i * 3 + 0] = 0.18;
        colors[i * 3 + 1] = 0.5;
        colors[i * 3 + 2] = 1.0;
      }
      mesh.instanceMatrix.needsUpdate = true;
      colorAttr.needsUpdate = true;
      this.meshes.push(mesh);
      this.activationScale.push(1);
      this.root.add(mesh);
    }
    for (let L = 0; L < this.layerSizes.length - 1; L++) {
      const fromCount = this.layerSizes[L];
      const toCount = this.layerSizes[L + 1];
      const segCount = fromCount * toCount;
      const positions = new Float32Array(segCount * 2 * 3);
      const colors = new Float32Array(segCount * 2 * 3);
      const fromTo: Array<{ from: number; to: number }> = new Array(segCount);
      let k = 0;
      for (let to = 0; to < toCount; to++) {
        const pTo = this.positions[L + 1][to];
        for (let from = 0; from < fromCount; from++) {
          const pFrom = this.positions[L][from];
          const i = k * 6;
          positions[i + 0] = pFrom.x;
          positions[i + 1] = pFrom.y;
          positions[i + 2] = pFrom.z;
          positions[i + 3] = pTo.x;
          positions[i + 4] = pTo.y;
          positions[i + 5] = pTo.z;
          colors[i + 0] = 0.35;
          colors[i + 1] = 0.35;
          colors[i + 2] = 0.38;
          colors[i + 3] = 0.35;
          colors[i + 4] = 0.35;
          colors[i + 5] = 0.38;
          fromTo[k] = { from, to };
          k++;
        }
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const edgeColors = new THREE.BufferAttribute(colors, 3);
      edgeColors.setUsage(THREE.DynamicDrawUsage);
      geom.setAttribute('color', edgeColors);
      const baseOpacity = L === 0 ? 0.25 : 0.55;
      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: baseOpacity,
      });
      const lines = new THREE.LineSegments(geom, mat);
      this.edgeLines.push(lines);
      this.edgeBaseOpacity.push(baseOpacity);
      this.edgeFromTo.push(fromTo);
      this.edgeWeightScale.push(0);
      this.edgeRecentLastWeight.push(new Float32Array(segCount));
      this.edgeRecentDelta.push(new Float32Array(segCount));
      const eAge = new Uint16Array(segCount);
      eAge.fill(this.edgeRecentWindow + 1);
      this.edgeRecentAge.push(eAge);
      this.edgeRecentHighlightT.push(new Float32Array(segCount));
      this.root.add(lines);
    }
    const outIdx = this.layerSizes.length - 1;
    const outCount = this.layerSizes[outIdx];
    const labelX = outIdx * LAYER_SPACING + OUTPUT_LABEL_X_OFFSET;
    const labelYOffset = OUTPUT_LABEL_Y;
    for (let i = 0; i < outCount; i++) {
      const z = (i - (outCount - 1) * 0.5) * outputDigitRowStep;
      const tex = createDigitTexture(i);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.16,
        color: 0x5f6770,
        depthWrite: false,
      });
      const spr = new THREE.Sprite(mat);
      spr.position.set(labelX, labelYOffset, z);
      spr.scale.setScalar(outputDigitSpriteBase);
      this.outputDigitSprites.push(spr);
      this.root.add(spr);
    }
    this.applyVizNetworkColors({ ...DEFAULT_VIZ_NETWORK_COLORS });
    this.setIdleDim(true);
  }

  applyVizNetworkColors(next: VizNetworkColorSettings): void {
    this.networkColors = { ...next };
    const setHex = (c: THREE.Color, hex: string, fb: string): void => {
      const h = isValidHexColor6(hex) ? hex : fb;
      c.setHex(parseInt(h.slice(1), 16));
    };
    setHex(
      this.colNeuronEmissive,
      next.neuronEmissive,
      DEFAULT_VIZ_NETWORK_COLORS.neuronEmissive,
    );
    setHex(
      this.colNeuronHiddenCold,
      next.neuronHiddenCold,
      DEFAULT_VIZ_NETWORK_COLORS.neuronHiddenCold,
    );
    setHex(
      this.colNeuronHiddenHot,
      next.neuronHiddenHot,
      DEFAULT_VIZ_NETWORK_COLORS.neuronHiddenHot,
    );
    setHex(
      this.colNeuronInputCold,
      next.neuronInputCold,
      DEFAULT_VIZ_NETWORK_COLORS.neuronInputCold,
    );
    setHex(
      this.colNeuronInputHot,
      next.neuronInputHot,
      DEFAULT_VIZ_NETWORK_COLORS.neuronInputHot,
    );
    setHex(
      this.colNeuronOutputCold,
      next.neuronOutputCold,
      DEFAULT_VIZ_NETWORK_COLORS.neuronOutputCold,
    );
    setHex(
      this.colNeuronOutputHot,
      next.neuronOutputHot,
      DEFAULT_VIZ_NETWORK_COLORS.neuronOutputHot,
    );
    setHex(
      this.colEdgePosCold,
      next.edgePositiveCold,
      DEFAULT_VIZ_NETWORK_COLORS.edgePositiveCold,
    );
    setHex(
      this.colEdgePosHot,
      next.edgePositiveHot,
      DEFAULT_VIZ_NETWORK_COLORS.edgePositiveHot,
    );
    setHex(
      this.colEdgeNegCold,
      next.edgeNegativeCold,
      DEFAULT_VIZ_NETWORK_COLORS.edgeNegativeCold,
    );
    setHex(
      this.colEdgeNegHot,
      next.edgeNegativeHot,
      DEFAULT_VIZ_NETWORK_COLORS.edgeNegativeHot,
    );
    setHex(
      this.colEdgeInferMuted,
      next.edgeInferMuted,
      DEFAULT_VIZ_NETWORK_COLORS.edgeInferMuted,
    );
    setHex(
      this.colEdgeTrainRecent,
      next.edgeTrainRecent,
      DEFAULT_VIZ_NETWORK_COLORS.edgeTrainRecent,
    );
    const emissive = this.colNeuronEmissive;
    const intensity = this.idleDimmed
      ? this.networkColors.neuronEmissiveIntensityIdle
      : this.networkColors.neuronEmissiveIntensityActive;
    for (const mesh of this.meshes) {
      const mat = mesh.material as THREE.MeshPhongMaterial;
      mat.emissive.copy(emissive);
      mat.emissiveIntensity = intensity;
    }
  }

  setHiddenLayerLayout(index: number, layout: HiddenLayerVizLayout): void {
    if (index < 0 || index >= this.hiddenLayouts.length) return;
    if (this.hiddenLayouts[index] === layout) return;
    this.hiddenLayouts[index] = layout;
    const L = index + 1;
    const n = this.layerSizes[L]!;
    const x = L * LAYER_SPACING;
    const sc = this.hiddenLayoutScales[index] ?? HIDDEN_LAYER_VIZ_SCALE_DEFAULT;
    placeHiddenLayerPoints(n, x, layout, this.positions[L]!, sc);
  }

  setInputLayerLayout(layout: InputLayerVizLayout): void {
    if (this.layerSizes[0] !== 784) return;
    if (this.inputLayerLayout === layout) return;
    this.inputLayerLayout = layout;
    const x = 0;
    placeInputLayer784(this.positions[0]!, x, layout, this.inputLayerScale);
  }

  setInputLayerLayoutScale(scale: number): void {
    if (this.layerSizes[0] !== 784) return;
    const s = clampHiddenLayerVizScale(scale);
    if (this.inputLayerScale === s) return;
    this.inputLayerScale = s;
    const x = 0;
    placeInputLayer784(this.positions[0]!, x, this.inputLayerLayout, s);
  }

  setHiddenLayerLayoutScale(index: number, scale: number): void {
    if (index < 0 || index >= this.hiddenLayoutScales.length) return;
    const s = clampHiddenLayerVizScale(scale);
    if (this.hiddenLayoutScales[index] === s) return;
    this.hiddenLayoutScales[index] = s;
    const L = index + 1;
    const n = this.layerSizes[L]!;
    const x = L * LAYER_SPACING;
    const mode = this.hiddenLayouts[index]!;
    placeHiddenLayerPoints(n, x, mode, this.positions[L]!, s);
  }

  setActiveNeuronMaxScaleMul(mul: number): void {
    const m = clampActiveNeuronMaxScaleMul(mul);
    if (this.activeNeuronMaxScaleMul === m) return;
    this.activeNeuronMaxScaleMul = m;
  }

  resetActivationScaling(): void {
    for (let i = 0; i < this.activationScale.length; i++)
      this.activationScale[i] = 1;
  }

  setEdgeFocus(
    mode: 'off' | 'infer' | 'trainRecent',
    activations: number[][] | null,
  ): void {
    const prev = this.edgeFocusMode;
    if (prev !== mode && (mode === 'trainRecent' || prev === 'trainRecent')) {
      for (let L = 0; L < this.edgeRecentAge.length; L++) {
        this.edgeRecentAge[L]!.fill(this.edgeRecentWindow + 1);
        this.edgeRecentHighlightT[L]!.fill(0);
      }
    }
    this.edgeFocusMode = mode;
    this.edgeFocusActivations = activations
      ? activations.map((a) => [...a])
      : null;
  }

  setInferResult(
    predictedDigit: number | null,
    expectedDigit: number | null,
  ): void {
    this.inferPredictedDigit = predictedDigit;
    this.inferExpectedDigit = expectedDigit;
  }

  private activationStepChanged(L: number, i: number, vi: number): boolean {
    if (this.trainPrevActivations === null) return true;
    const prev = this.trainPrevActivations[L];
    if (!prev || i >= prev.length) return true;
    const p = Number.isFinite(prev[i]) ? prev[i]! : 0;
    const v = Number.isFinite(vi) ? vi : 0;
    return Math.abs(v - p) > this.trainActStepEps;
  }

  setIdleDim(dim: boolean): void {
    if (this.idleDimmed === dim) return;
    this.idleDimmed = dim;
    const emissiveIntensity = dim
      ? this.networkColors.neuronEmissiveIntensityIdle
      : this.networkColors.neuronEmissiveIntensityActive;
    for (const mesh of this.meshes) {
      const mat = mesh.material as THREE.MeshPhongMaterial;
      mat.emissiveIntensity = emissiveIntensity;
    }
    const edgeScale = dim ? 0.33 : 1;
    for (let i = 0; i < this.edgeLines.length; i++) {
      const mat = this.edgeLines[i].material as THREE.LineBasicMaterial;
      mat.opacity = this.edgeBaseOpacity[i] * edgeScale;
    }
    for (const s of this.outputDigitSprites) {
      const mat = s.material as THREE.SpriteMaterial;
      if (mat.opacity <= 0.16) mat.opacity = dim ? 0.05 : 0.16;
    }
  }

  setActivations(activations: number[][]): void {
    const trainFilter = this.edgeFocusMode === 'trainRecent';
    if (!trainFilter) {
      this.trainPrevActivations = null;
    }
    for (let L = 0; L < this.meshes.length; L++) {
      const mesh = this.meshes[L];
      const pos = this.positions[L];
      const v = activations[L];
      if (!v || v.length !== this.layerSizes[L]) continue;
      const colorAttr = mesh.instanceColor as THREE.InstancedBufferAttribute;
      const arr = colorAttr.array as Float32Array;
      const isOutput = L === this.meshes.length - 1;
      if (isOutput) {
        let mean = 0;
        let mx = -Infinity;
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : 0;
          mean += vi;
          if (vi > mx) mx = vi;
        }
        mean /= Math.max(1, v.length);
        const denom = Math.max(1e-6, mx - mean);
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : 0;
          if (trainFilter && !this.activationStepChanged(L, i, vi)) {
            this.dummy.position.copy(pos[i]);
            this.dummy.scale.setScalar(0);
            this.dummy.updateMatrix();
            mesh.setMatrixAt(i, this.dummy.matrix);
            arr[i * 3 + 0] = 0.02;
            arr[i * 3 + 1] = 0.02;
            arr[i * 3 + 2] = 0.03;
            continue;
          }
          const raw = (vi - mean) / denom;
          const t = Math.min(1, Math.max(0, Math.pow(raw, 0.65)));
          this.dummy.position.copy(pos[i]);
          const s =
            t <= 1e-10
              ? NEURON_BASE_DISPLAY_SCALE
              : ACTIVE_NEURON_OUTPUT_MIN +
                ACTIVE_NEURON_OUTPUT_RANGE * t * this.activeNeuronMaxScaleMul;
          this.dummy.scale.setScalar(s);
          this.dummy.updateMatrix();
          mesh.setMatrixAt(i, this.dummy.matrix);
          this.scratchNeuronColor
            .copy(this.colNeuronOutputCold)
            .lerp(this.colNeuronOutputHot, t);
          arr[i * 3 + 0] = this.scratchNeuronColor.r;
          arr[i * 3 + 1] = this.scratchNeuronColor.g;
          arr[i * 3 + 2] = this.scratchNeuronColor.b;
        }
        let best = 0;
        let bestVal = -Infinity;
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : -Infinity;
          if (vi > bestVal) {
            bestVal = vi;
            best = i;
          }
        }
        for (let i = 0; i < this.outputDigitSprites.length; i++) {
          const spr = this.outputDigitSprites[i];
          const mat = spr.material as THREE.SpriteMaterial;
          const pRaw =
            i < v.length && Number.isFinite(v[i]) ? (v[i] as number) : 0;
          if (trainFilter && !this.activationStepChanged(L, i, pRaw)) {
            mat.opacity = 0;
            spr.scale.setScalar(0.0001);
            continue;
          }
          const p = Math.max(0, Math.min(1, pRaw));
          const lum = Math.pow(p, 0.48);
          const dim = this.idleDimmed;
          const opLo = dim ? 0.042 : 0.075;
          const opHi = dim ? 0.38 : 0.96;
          const op = opLo + (opHi - opLo) * lum;
          const inferPred = this.inferPredictedDigit ?? best;
          const inferExpected = this.inferExpectedDigit;
          const inferWrong =
            inferExpected !== null && inferPred !== inferExpected;
          const scPred =
            outputDigitSpriteBase +
            (outputDigitSpritePred - outputDigitSpriteBase) * lum * 0.95;
          const scWrong =
            outputDigitSpriteBase +
            (outputDigitSpriteWrongExpected - outputDigitSpriteBase) *
              lum *
              0.95;
          if (
            this.edgeFocusMode === 'infer' &&
            inferWrong &&
            i === inferExpected
          ) {
            mat.opacity = op;
            mat.color
              .copy(digitSpriteColA.setHex(0x4a4f58))
              .lerp(digitSpriteColB.setHex(0xff3b30), 0.2 + 0.8 * lum);
            spr.scale.setScalar(scWrong);
          } else if (this.edgeFocusMode === 'infer' && i === inferPred) {
            mat.opacity = op;
            mat.color
              .copy(digitSpriteColA.setHex(0x5f6770))
              .lerp(digitSpriteColB.setHex(0xffcc4d), 0.18 + 0.82 * lum);
            spr.scale.setScalar(scPred);
          } else {
            mat.opacity = op;
            mat.color
              .copy(digitSpriteColA.setHex(0x5f6770))
              .lerp(digitSpriteColB.setHex(0xe8eef8), lum);
            spr.scale.setScalar(scPred);
          }
        }
      } else {
        let mx = 1e-12;
        for (let i = 0; i < v.length; i++) {
          const t = Number.isFinite(v[i]) ? v[i] : 0;
          if (t > mx) mx = t;
        }
        const scale = Math.max(mx, 1e-6);
        this.activationScale[L] = scale;
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : 0;
          if (trainFilter && L !== 0 && !this.activationStepChanged(L, i, vi)) {
            this.dummy.position.copy(pos[i]);
            this.dummy.scale.setScalar(0);
            this.dummy.updateMatrix();
            mesh.setMatrixAt(i, this.dummy.matrix);
            arr[i * 3 + 0] = 0.02;
            arr[i * 3 + 1] = 0.02;
            arr[i * 3 + 2] = 0.03;
            continue;
          }
          const raw = Math.max(0, vi / scale);
          const t = Math.min(1, Math.pow(raw, 0.7));
          this.dummy.position.copy(pos[i]);
          const s =
            vi <= 1e-12
              ? NEURON_BASE_DISPLAY_SCALE
              : ACTIVE_NEURON_HIDDEN_MIN +
                ACTIVE_NEURON_HIDDEN_RANGE * t * this.activeNeuronMaxScaleMul;
          this.dummy.scale.setScalar(s);
          this.dummy.updateMatrix();
          mesh.setMatrixAt(i, this.dummy.matrix);
          if (L === 0) {
            this.scratchNeuronColor
              .copy(this.colNeuronInputCold)
              .lerp(this.colNeuronInputHot, t);
            const f = t * t;
            arr[i * 3 + 0] =
              this.scratchNeuronColor.r + (1 - this.scratchNeuronColor.r) * f;
            arr[i * 3 + 1] =
              this.scratchNeuronColor.g + (1 - this.scratchNeuronColor.g) * f;
            arr[i * 3 + 2] =
              this.scratchNeuronColor.b + (1 - this.scratchNeuronColor.b) * f;
          } else {
            this.scratchNeuronColor
              .copy(this.colNeuronHiddenCold)
              .lerp(this.colNeuronHiddenHot, t);
            arr[i * 3 + 0] = this.scratchNeuronColor.r;
            arr[i * 3 + 1] = this.scratchNeuronColor.g;
            arr[i * 3 + 2] = this.scratchNeuronColor.b;
          }
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
      colorAttr.needsUpdate = true;
    }
    if (trainFilter) {
      this.trainPrevActivations = activations.map((a) => [...a]);
    }
  }

  /** Schwerpunkt aller Neuron-Positionen (Layout-Weltkoordinaten). */
  fillLayoutCentroid(out: THREE.Vector3): void {
    let n = 0;
    let sx = 0;
    let sy = 0;
    let sz = 0;
    for (const layer of this.positions) {
      for (const p of layer) {
        sx += p.x;
        sy += p.y;
        sz += p.z;
        n++;
      }
    }
    if (n === 0) out.set(4, 0, 0);
    else out.set(sx / n, sy / n, sz / n);
  }

  /**
   * Mittelpunkt des Layouts mit gleichem Gewicht pro Schicht (nicht pro Neuron).
   * Verhindert, dass große Eingangsschichten den Blick-Schwerpunkt dominieren.
   */
  fillLayoutCentroidEqualLayers(out: THREE.Vector3): void {
    let lx = 0;
    let ly = 0;
    let lz = 0;
    let layerCount = 0;
    for (const layer of this.positions) {
      if (layer.length === 0) continue;
      let sx = 0;
      let sy = 0;
      let sz = 0;
      for (const p of layer) {
        sx += p.x;
        sy += p.y;
        sz += p.z;
      }
      const inv = 1 / layer.length;
      lx += sx * inv;
      ly += sy * inv;
      lz += sz * inv;
      layerCount++;
    }
    if (layerCount === 0) out.set(4, 0, 0);
    else {
      const invL = 1 / layerCount;
      out.set(lx * invL, ly * invL, lz * invL);
    }
  }

  /** Schicht-Schwerpunkt; `false` nur bei leerer Schicht. */
  fillLayerCentroid(layerIndex: number, out: THREE.Vector3): boolean {
    const layer = this.positions[layerIndex];
    if (!layer || layer.length === 0) return false;
    let sx = 0;
    let sy = 0;
    let sz = 0;
    for (const p of layer) {
      sx += p.x;
      sy += p.y;
      sz += p.z;
    }
    const inv = 1 / layer.length;
    out.set(sx * inv, sy * inv, sz * inv);
    return true;
  }

  /**
   * Blickziel für Vibe-Kamera: gleich gewichtete Schichten plus langsames Mitwandern
   * entlang der Schicht-Schwerpunkte, damit die Kamera nicht dauernd „ins erste Layer“ starrt.
   */
  fillVibeLookTarget(out: THREE.Vector3, timeSec: number): void {
    const n = this.positions.length;
    if (n === 0) {
      out.set(4, 0, 0);
      return;
    }
    this.fillLayoutCentroidEqualLayers(this.scratchV3c);
    if (n === 1) {
      out.copy(this.scratchV3c);
      return;
    }
    const speed = 0.055;
    let u = timeSec * speed;
    u %= n;
    if (u < 0) u += n;
    const L0 = Math.floor(u) % n;
    const L1 = (L0 + 1) % n;
    const f = u - Math.floor(u);
    this.fillLayerCentroid(L0, this.scratchV3a);
    this.fillLayerCentroid(L1, this.scratchV3b);
    out.lerpVectors(this.scratchV3a, this.scratchV3b, f);
    out.lerp(this.scratchV3c, 0.34);
  }

  setWeights(weights: number[][][]): void {
    for (let L = 0; L < this.edgeLines.length; L++) {
      const layerW = weights[L];
      if (!layerW || layerW.length === 0) continue;
      const lines = this.edgeLines[L];
      const colorAttr = lines.geometry.getAttribute(
        'color',
      ) as THREE.BufferAttribute;
      const arr = colorAttr.array as Float32Array;
      const posAttr = lines.geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const map = this.edgeFromTo[L];
      const lastWeight = this.edgeRecentLastWeight[L];
      const deltaArr = this.edgeRecentDelta[L];
      let mx = 1e-12;
      let contribMx = 1e-12;
      let deltaMx = 1e-12;
      const fromActs =
        this.edgeFocusMode === 'infer' &&
        this.edgeFocusActivations &&
        this.edgeFocusActivations[L]
          ? this.edgeFocusActivations[L]
          : null;
      const threshold =
        L === 0 ? this.edgeFocusThresholdFirstLayer : this.edgeFocusThreshold;
      const inferReuseScale =
        this.edgeFocusMode === 'infer' &&
        fromActs !== null &&
        this.edgeWeightScale[L] > 1e-9;
      if (inferReuseScale) {
        for (let k = 0; k < map.length; k++) {
          const ref = map[k]!;
          const wrc = layerW[ref.to]![ref.from] ?? 0;
          const w0 = Number.isFinite(wrc) ? wrc : 0;
          if (ref.from < fromActs!.length) {
            const fa = Number.isFinite(fromActs![ref.from])
              ? Math.max(0, fromActs![ref.from]!)
              : 0;
            const contrib = Math.abs(w0) * fa;
            if (contrib > contribMx) contribMx = contrib;
          }
        }
      } else {
        for (let r = 0; r < layerW.length; r++) {
          for (let c = 0; c < layerW[r].length; c++) {
            const wrc = Number.isFinite(layerW[r][c]) ? layerW[r][c] : 0;
            const a = Math.abs(wrc);
            if (a > mx) mx = a;
            const idx = r * layerW[r].length + c;
            const delta = Math.abs(wrc - lastWeight[idx]);
            deltaArr[idx] = delta;
            if (delta > deltaMx) deltaMx = delta;
            if (fromActs && c < fromActs.length) {
              const fa = Number.isFinite(fromActs[c])
                ? Math.max(0, fromActs[c])
                : 0;
              const contrib = Math.abs(wrc) * fa;
              if (contrib > contribMx) contribMx = contrib;
            }
          }
        }
        const prevScale = this.edgeWeightScale[L];
        const nextScale = prevScale <= 0 ? mx : Math.max(mx, prevScale * 0.995);
        this.edgeWeightScale[L] = Math.max(nextScale, 1e-6);
      }
      const ageArr = this.edgeRecentAge[L];
      const tMem = this.edgeRecentHighlightT[L];
      for (let k = 0; k < map.length; k++) {
        const ref = map[k];
        const wRaw = layerW[ref.to][ref.from] ?? 0;
        const w = Number.isFinite(wRaw) ? wRaw : 0;
        const idx = ref.to * layerW[ref.to].length + ref.from;
        const d = deltaArr[idx]!;
        if (this.edgeFocusMode === 'trainRecent') {
          if (deltaMx > 1e-12 && d >= this.edgeRecentDeltaAbsMin) {
            ageArr[k] = 0;
            tMem[k] = Math.min(1, Math.pow(d / deltaMx, 0.52));
          } else {
            ageArr[k] = Math.min(
              this.edgeRecentWindow + 1,
              (ageArr[k] ?? 0) + 1,
            );
          }
        }
        lastWeight[idx] = w;
        let visible = true;
        let contribNorm = 1;
        if (fromActs && ref.from < fromActs.length) {
          const fa = Number.isFinite(fromActs[ref.from])
            ? Math.max(0, fromActs[ref.from])
            : 0;
          contribNorm = (Math.abs(w) * fa) / Math.max(1e-9, contribMx);
          visible = contribNorm >= threshold;
        }
        if (this.edgeFocusMode === 'trainRecent') {
          visible = ageArr[k]! <= this.edgeRecentWindow;
        }
        const tBase = Math.min(
          1,
          Math.pow(Math.abs(w) / this.edgeWeightScale[L], 0.65),
        );
        const tInfer =
          fromActs && visible
            ? Math.min(
                1,
                Math.max(
                  0,
                  (contribNorm - threshold) / Math.max(1e-9, 1 - threshold),
                ),
              )
            : 0;
        const t =
          this.edgeFocusMode === 'trainRecent'
            ? visible
              ? 1
              : 0
            : fromActs
              ? visible
                ? tInfer
                : 0
              : tBase;
        let r = 0;
        let g = 0;
        let b = 0;
        if (visible) {
          if (this.edgeFocusMode === 'trainRecent') {
            const tI = 0.15 + 0.85 * tMem[k]!;
            const tAge = 1 - ageArr[k]! / (this.edgeRecentWindow + 1);
            const mul = Math.pow(tAge, 0.7);
            this.scratchNeuronColor
              .copy(this.colEdgeTrainRecent)
              .multiplyScalar(tI * mul);
            r = Math.min(1, this.scratchNeuronColor.r);
            g = Math.min(1, this.scratchNeuronColor.g);
            b = Math.min(1, this.scratchNeuronColor.b);
          } else if (w >= 0) {
            this.scratchNeuronColor
              .copy(this.colEdgePosCold)
              .lerp(this.colEdgePosHot, t);
            r = this.scratchNeuronColor.r;
            g = this.scratchNeuronColor.g;
            b = this.scratchNeuronColor.b;
          } else {
            this.scratchNeuronColor
              .copy(this.colEdgeNegCold)
              .lerp(this.colEdgeNegHot, t);
            r = this.scratchNeuronColor.r;
            g = this.scratchNeuronColor.g;
            b = this.scratchNeuronColor.b;
          }
        } else if (this.edgeFocusMode === 'infer') {
          r = this.colEdgeInferMuted.r;
          g = this.colEdgeInferMuted.g;
          b = this.colEdgeInferMuted.b;
        }
        const i = k * 6;
        const pFrom = this.positions[L][ref.from];
        const pTo = this.positions[L + 1][ref.to];
        if (
          (this.edgeFocusMode === 'infer' ||
            this.edgeFocusMode === 'trainRecent') &&
          !visible
        ) {
          posArr[i + 0] = pFrom.x;
          posArr[i + 1] = pFrom.y;
          posArr[i + 2] = pFrom.z;
          posArr[i + 3] = pFrom.x;
          posArr[i + 4] = pFrom.y;
          posArr[i + 5] = pFrom.z;
        } else {
          posArr[i + 0] = pFrom.x;
          posArr[i + 1] = pFrom.y;
          posArr[i + 2] = pFrom.z;
          posArr[i + 3] = pTo.x;
          posArr[i + 4] = pTo.y;
          posArr[i + 5] = pTo.z;
        }
        arr[i + 0] = r;
        arr[i + 1] = g;
        arr[i + 2] = b;
        arr[i + 3] = r;
        arr[i + 4] = g;
        arr[i + 5] = b;
      }
      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
    }
  }

  dispose(): void {
    for (const m of this.meshes) {
      m.geometry.dispose();
      if (Array.isArray(m.material))
        m.material.forEach((mat: THREE.Material) => mat.dispose());
      else m.material.dispose();
    }
    for (const l of this.edgeLines) {
      l.geometry.dispose();
      if (Array.isArray(l.material))
        l.material.forEach((mat: THREE.Material) => mat.dispose());
      else l.material.dispose();
    }
    for (const s of this.outputDigitSprites) {
      const mat = s.material as THREE.SpriteMaterial;
      mat.map?.dispose();
      mat.dispose();
    }
  }
}
