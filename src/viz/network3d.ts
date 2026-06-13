import * as THREE from 'three';
import {
  createNetworkEdgeLineLayer,
  disposeNetworkEdgeLineLayer,
  fillNetworkEdgeLineDefaults,
  updateNetworkEdgeLineBounds,
  type NetworkEdgeLineLayer,
} from './network-edge-lines';
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

export type Network3DOptions = {
  /** Erste Kantenschicht (784→64) nicht rendern — spart ~50k Segmente. */
  omitHeavyInputEdges?: boolean;
  /** Weniger Kugelsegmente pro Neuron. */
  lowNeuronMeshDetail?: boolean;
};

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
  private readonly edgeLayers: Array<NetworkEdgeLineLayer | null> = [];
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
  private vibeLookWanderSpeed = 0.055;
  private vibeLookEqualLayerBlend = 0.34;

  constructor(layerSizes: number[], options: Network3DOptions = {}) {
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
    const neuronWidthSegments = options.lowNeuronMeshDetail ? 6 : 10;
    const neuronHeightSegments = options.lowNeuronMeshDetail ? 4 : 8;
    const geom = new THREE.SphereGeometry(
      0.09,
      neuronWidthSegments,
      neuronHeightSegments,
    );
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
      const omitLayer = options.omitHeavyInputEdges === true && L === 0;
      const segCount = omitLayer ? 0 : fromCount * toCount;
      const fromTo: Array<{ from: number; to: number }> = new Array(segCount);
      if (!omitLayer) {
        let edgeIndex = 0;
        for (let to = 0; to < toCount; to++) {
          for (let from = 0; from < fromCount; from++) {
            fromTo[edgeIndex] = { from, to };
            edgeIndex++;
          }
        }
      }
      const baseOpacity = L === 0 ? 0.25 : 0.55;
      const edgeLayer = createNetworkEdgeLineLayer(segCount, baseOpacity);
      if (edgeLayer) {
        fillNetworkEdgeLineDefaults(edgeLayer);
        this.edgeLayers.push(edgeLayer);
        this.root.add(edgeLayer.mesh);
      } else {
        this.edgeLayers.push(null);
      }
      this.edgeBaseOpacity.push(baseOpacity);
      this.edgeFromTo.push(fromTo);
      this.edgeWeightScale.push(0);
      this.edgeRecentLastWeight.push(new Float32Array(segCount));
      this.edgeRecentDelta.push(new Float32Array(segCount));
      const eAge = new Uint16Array(segCount);
      eAge.fill(this.edgeRecentWindow + 1);
      this.edgeRecentAge.push(eAge);
      this.edgeRecentHighlightT.push(new Float32Array(segCount));
    }
    for (
      let layerIndex = 0;
      layerIndex < this.edgeLayers.length;
      layerIndex++
    ) {
      this.refreshEdgeEndpoints(layerIndex);
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

  private refreshEdgeEndpoints(edgeLayerIndex: number): void {
    const edgeLayer = this.edgeLayers[edgeLayerIndex];
    if (!edgeLayer) return;
    const map = this.edgeFromTo[edgeLayerIndex];
    if (!map || map.length === 0) return;
    const startArray = edgeLayer.instanceStart.array as Float32Array;
    const endArray = edgeLayer.instanceEnd.array as Float32Array;
    const fromLayer = this.positions[edgeLayerIndex];
    const toLayer = this.positions[edgeLayerIndex + 1];
    if (!fromLayer || !toLayer) return;
    for (let edgeIndex = 0; edgeIndex < map.length; edgeIndex++) {
      const ref = map[edgeIndex]!;
      const fromPoint = fromLayer[ref.from];
      const toPoint = toLayer[ref.to];
      if (!fromPoint || !toPoint) continue;
      const startOffset = edgeIndex * 3;
      startArray[startOffset + 0] = fromPoint.x;
      startArray[startOffset + 1] = fromPoint.y;
      startArray[startOffset + 2] = fromPoint.z;
      endArray[startOffset + 0] = toPoint.x;
      endArray[startOffset + 1] = toPoint.y;
      endArray[startOffset + 2] = toPoint.z;
    }
    edgeLayer.instanceStart.needsUpdate = true;
    edgeLayer.instanceEnd.needsUpdate = true;
    updateNetworkEdgeLineBounds(edgeLayer);
  }

  private refreshEdgesTouchingNeuronLayer(neuronLayerIndex: number): void {
    if (neuronLayerIndex > 0) {
      this.refreshEdgeEndpoints(neuronLayerIndex - 1);
    }
    if (neuronLayerIndex < this.edgeLayers.length) {
      this.refreshEdgeEndpoints(neuronLayerIndex);
    }
  }

  setHiddenLayerLayout(index: number, layout: HiddenLayerVizLayout): void {
    if (index < 0 || index >= this.hiddenLayouts.length) return;
    if (this.hiddenLayouts[index] === layout) return;
    this.hiddenLayouts[index] = layout;
    const layerIndex = index + 1;
    const neuronCount = this.layerSizes[layerIndex]!;
    const layerX = layerIndex * LAYER_SPACING;
    const scale =
      this.hiddenLayoutScales[index] ?? HIDDEN_LAYER_VIZ_SCALE_DEFAULT;
    placeHiddenLayerPoints(
      neuronCount,
      layerX,
      layout,
      this.positions[layerIndex]!,
      scale,
    );
    this.refreshEdgesTouchingNeuronLayer(layerIndex);
  }

  setInputLayerLayout(layout: InputLayerVizLayout): void {
    if (this.layerSizes[0] !== 784) return;
    if (this.inputLayerLayout === layout) return;
    this.inputLayerLayout = layout;
    placeInputLayer784(this.positions[0]!, 0, layout, this.inputLayerScale);
    this.refreshEdgesTouchingNeuronLayer(0);
  }

  setInputLayerLayoutScale(scale: number): void {
    if (this.layerSizes[0] !== 784) return;
    const clampedScale = clampHiddenLayerVizScale(scale);
    if (this.inputLayerScale === clampedScale) return;
    this.inputLayerScale = clampedScale;
    placeInputLayer784(
      this.positions[0]!,
      0,
      this.inputLayerLayout,
      clampedScale,
    );
    this.refreshEdgesTouchingNeuronLayer(0);
  }

  setHiddenLayerLayoutScale(index: number, scale: number): void {
    if (index < 0 || index >= this.hiddenLayoutScales.length) return;
    const clampedScale = clampHiddenLayerVizScale(scale);
    if (this.hiddenLayoutScales[index] === clampedScale) return;
    this.hiddenLayoutScales[index] = clampedScale;
    const layerIndex = index + 1;
    const neuronCount = this.layerSizes[layerIndex]!;
    const layerX = layerIndex * LAYER_SPACING;
    const layout = this.hiddenLayouts[index]!;
    placeHiddenLayerPoints(
      neuronCount,
      layerX,
      layout,
      this.positions[layerIndex]!,
      clampedScale,
    );
    this.refreshEdgesTouchingNeuronLayer(layerIndex);
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
    const edgeOpacityScale = dim ? 0.33 : 1;
    for (
      let layerIndex = 0;
      layerIndex < this.edgeLayers.length;
      layerIndex++
    ) {
      const edgeLayer = this.edgeLayers[layerIndex];
      if (!edgeLayer) continue;
      edgeLayer.material.uniforms['opacityMul']!.value =
        this.edgeBaseOpacity[layerIndex]! * edgeOpacityScale;
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
   * Mittelpunkt der Bounding-Box aller sichtbaren Netz-Elemente
   * (Neuronen und Ausgabe-Ziffern-Sprites), ohne Neuronen-pro-Schicht-Bias.
   */
  fillSceneDisplayCenter(out: THREE.Vector3): void {
    const extentMin = this.scratchV3a;
    const extentMax = this.scratchV3b;
    if (!this.fillSceneDisplayExtent(extentMin, extentMax)) {
      out.set(4, 0, 0);
      return;
    }
    out.set(
      (extentMin.x + extentMax.x) * 0.5,
      (extentMin.y + extentMax.y) * 0.5,
      (extentMin.z + extentMax.z) * 0.5,
    );
  }

  /**
   * Achsenparalleles Extent aller sichtbaren Netz-Elemente (ohne Padding).
   * @returns `false` wenn keine Punkte vorhanden sind
   */
  fillSceneDisplayExtent(min: THREE.Vector3, max: THREE.Vector3): boolean {
    let hasPoint = false;
    let minX = 0;
    let minY = 0;
    let minZ = 0;
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;
    const includePoint = (x: number, y: number, z: number): void => {
      if (!hasPoint) {
        minX = maxX = x;
        minY = maxY = y;
        minZ = maxZ = z;
        hasPoint = true;
        return;
      }
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      minZ = Math.min(minZ, z);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      maxZ = Math.max(maxZ, z);
    };
    for (const layer of this.positions) {
      for (const point of layer) {
        includePoint(point.x, point.y, point.z);
      }
    }
    for (const sprite of this.outputDigitSprites) {
      const position = sprite.position;
      includePoint(position.x, position.y, position.z);
    }
    if (!hasPoint) return false;
    min.set(minX, minY, minZ);
    max.set(maxX, maxY, maxZ);
    return true;
  }

  /**
   * Achsenparalleles Layout-Rechteck (Weltkoordinaten) für Kamera-Pfad-Clamping.
   * Mit Rand um Neuronen und typischen Pull-Out der Vibe-Kamera.
   */
  fillLayoutBounds(min: THREE.Vector3, max: THREE.Vector3): void {
    let hasPoint = false;
    let minX = 0;
    let minY = 0;
    let minZ = 0;
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;
    for (const layer of this.positions) {
      for (const point of layer) {
        if (!hasPoint) {
          minX = maxX = point.x;
          minY = maxY = point.y;
          minZ = maxZ = point.z;
          hasPoint = true;
          continue;
        }
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        minZ = Math.min(minZ, point.z);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
        maxZ = Math.max(maxZ, point.z);
      }
    }
    if (!hasPoint) {
      min.set(0, -2.2, -4.5);
      max.set(8.5, 2.8, 4.5);
      return;
    }
    const padX = Math.max(2.8, (maxX - minX) * 0.42 + 2.4);
    const padY = Math.max(2.4, (maxY - minY) * 0.55 + 2.6);
    const padZ = Math.max(2.8, (maxZ - minZ) * 0.42 + 2.4);
    min.set(minX - padX, minY - padY, minZ - padZ);
    max.set(maxX + padX, maxY + padY, maxZ + padZ);
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

  setVibeLookTuning(wanderSpeed: number, equalLayerBlend: number): void {
    this.vibeLookWanderSpeed = wanderSpeed;
    this.vibeLookEqualLayerBlend = equalLayerBlend;
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
    let u = timeSec * this.vibeLookWanderSpeed;
    u %= n;
    if (u < 0) u += n;
    const L0 = Math.floor(u) % n;
    const L1 = (L0 + 1) % n;
    const f = u - Math.floor(u);
    this.fillLayerCentroid(L0, this.scratchV3a);
    this.fillLayerCentroid(L1, this.scratchV3b);
    out.lerpVectors(this.scratchV3a, this.scratchV3b, f);
    out.lerp(this.scratchV3c, this.vibeLookEqualLayerBlend);
  }

  setWeights(weights: number[][][]): void {
    for (
      let layerIndex = 0;
      layerIndex < this.edgeLayers.length;
      layerIndex++
    ) {
      const layerWeights = weights[layerIndex];
      if (!layerWeights || layerWeights.length === 0) continue;
      const edgeLayer = this.edgeLayers[layerIndex];
      if (!edgeLayer) continue;
      const colorArray = edgeLayer.instanceColor.array as Float32Array;
      const alphaArray = edgeLayer.instanceAlpha.array as Float32Array;
      const map = this.edgeFromTo[layerIndex];
      if (!map || map.length === 0) continue;
      const lastWeight = this.edgeRecentLastWeight[layerIndex];
      const deltaArray = this.edgeRecentDelta[layerIndex];
      let weightMax = 1e-12;
      let contribMax = 1e-12;
      let deltaMax = 1e-12;
      const fromActivations =
        this.edgeFocusMode === 'infer' &&
        this.edgeFocusActivations &&
        this.edgeFocusActivations[layerIndex]
          ? this.edgeFocusActivations[layerIndex]
          : null;
      const threshold =
        layerIndex === 0
          ? this.edgeFocusThresholdFirstLayer
          : this.edgeFocusThreshold;
      const inferReuseScale =
        this.edgeFocusMode === 'infer' &&
        fromActivations !== null &&
        this.edgeWeightScale[layerIndex]! > 1e-9;
      if (inferReuseScale) {
        for (let edgeIndex = 0; edgeIndex < map.length; edgeIndex++) {
          const ref = map[edgeIndex]!;
          const weightRaw = layerWeights[ref.to]![ref.from] ?? 0;
          const weightValue = Number.isFinite(weightRaw) ? weightRaw : 0;
          if (ref.from < fromActivations!.length) {
            const activation = Number.isFinite(fromActivations![ref.from])
              ? Math.max(0, fromActivations![ref.from]!)
              : 0;
            const contribution = Math.abs(weightValue) * activation;
            if (contribution > contribMax) contribMax = contribution;
          }
        }
      } else {
        for (let row = 0; row < layerWeights.length; row++) {
          for (let column = 0; column < layerWeights[row]!.length; column++) {
            const weightRaw = Number.isFinite(layerWeights[row]![column])
              ? layerWeights[row]![column]!
              : 0;
            const magnitude = Math.abs(weightRaw);
            if (magnitude > weightMax) weightMax = magnitude;
            const flatIndex = row * layerWeights[row]!.length + column;
            const delta = Math.abs(weightRaw - lastWeight![flatIndex]!);
            deltaArray![flatIndex] = delta;
            if (delta > deltaMax) deltaMax = delta;
            if (fromActivations && column < fromActivations.length) {
              const activation = Number.isFinite(fromActivations[column])
                ? Math.max(0, fromActivations[column]!)
                : 0;
              const contribution = Math.abs(weightRaw) * activation;
              if (contribution > contribMax) contribMax = contribution;
            }
          }
        }
        const previousScale = this.edgeWeightScale[layerIndex]!;
        const nextScale =
          previousScale <= 0
            ? weightMax
            : Math.max(weightMax, previousScale * 0.995);
        this.edgeWeightScale[layerIndex] = Math.max(nextScale, 1e-6);
      }
      const ageArray = this.edgeRecentAge[layerIndex];
      const highlightArray = this.edgeRecentHighlightT[layerIndex];
      for (let edgeIndex = 0; edgeIndex < map.length; edgeIndex++) {
        const ref = map[edgeIndex]!;
        const weightRaw = layerWeights[ref.to]![ref.from] ?? 0;
        const weightValue = Number.isFinite(weightRaw) ? weightRaw : 0;
        const flatIndex = ref.to * layerWeights[ref.to]!.length + ref.from;
        const delta = deltaArray![flatIndex]!;
        if (this.edgeFocusMode === 'trainRecent') {
          if (deltaMax > 1e-12 && delta >= this.edgeRecentDeltaAbsMin) {
            ageArray![edgeIndex] = 0;
            highlightArray![edgeIndex] = Math.min(
              1,
              Math.pow(delta / deltaMax, 0.52),
            );
          } else {
            ageArray![edgeIndex] = Math.min(
              this.edgeRecentWindow + 1,
              (ageArray![edgeIndex] ?? 0) + 1,
            );
          }
        }
        lastWeight![flatIndex] = weightValue;
        let visible = true;
        let contribNorm = 1;
        if (fromActivations && ref.from < fromActivations.length) {
          const activation = Number.isFinite(fromActivations[ref.from])
            ? Math.max(0, fromActivations[ref.from]!)
            : 0;
          contribNorm =
            (Math.abs(weightValue) * activation) / Math.max(1e-9, contribMax);
          visible = contribNorm >= threshold;
        }
        if (this.edgeFocusMode === 'trainRecent') {
          visible = ageArray![edgeIndex]! <= this.edgeRecentWindow;
        }
        const weightTone = Math.min(
          1,
          Math.pow(
            Math.abs(weightValue) / this.edgeWeightScale[layerIndex]!,
            0.65,
          ),
        );
        const inferTone =
          fromActivations && visible
            ? Math.min(
                1,
                Math.max(
                  0,
                  (contribNorm - threshold) / Math.max(1e-9, 1 - threshold),
                ),
              )
            : 0;
        const tone =
          this.edgeFocusMode === 'trainRecent'
            ? visible
              ? 1
              : 0
            : fromActivations
              ? visible
                ? inferTone
                : 0
              : weightTone;
        let red = 0;
        let green = 0;
        let blue = 0;
        let alpha = 0;
        if (visible) {
          alpha = 1;
          if (this.edgeFocusMode === 'trainRecent') {
            const highlightTone = 0.15 + 0.85 * highlightArray![edgeIndex]!;
            const ageTone =
              1 - ageArray![edgeIndex]! / (this.edgeRecentWindow + 1);
            const multiplier = Math.pow(ageTone, 0.7);
            this.scratchNeuronColor
              .copy(this.colEdgeTrainRecent)
              .multiplyScalar(highlightTone * multiplier);
            red = Math.min(1, this.scratchNeuronColor.r);
            green = Math.min(1, this.scratchNeuronColor.g);
            blue = Math.min(1, this.scratchNeuronColor.b);
          } else if (weightValue >= 0) {
            this.scratchNeuronColor
              .copy(this.colEdgePosCold)
              .lerp(this.colEdgePosHot, tone);
            red = this.scratchNeuronColor.r;
            green = this.scratchNeuronColor.g;
            blue = this.scratchNeuronColor.b;
          } else {
            this.scratchNeuronColor
              .copy(this.colEdgeNegCold)
              .lerp(this.colEdgeNegHot, tone);
            red = this.scratchNeuronColor.r;
            green = this.scratchNeuronColor.g;
            blue = this.scratchNeuronColor.b;
          }
        } else if (this.edgeFocusMode === 'infer') {
          alpha = 0.55;
          red = this.colEdgeInferMuted.r;
          green = this.colEdgeInferMuted.g;
          blue = this.colEdgeInferMuted.b;
        }
        const colorOffset = edgeIndex * 3;
        colorArray[colorOffset + 0] = red;
        colorArray[colorOffset + 1] = green;
        colorArray[colorOffset + 2] = blue;
        alphaArray[edgeIndex] = alpha;
      }
      edgeLayer.instanceColor.needsUpdate = true;
      edgeLayer.instanceAlpha.needsUpdate = true;
    }
  }

  dispose(): void {
    for (const mesh of this.meshes) {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material: THREE.Material) => material.dispose());
      } else mesh.material.dispose();
    }
    for (const edgeLayer of this.edgeLayers) {
      if (edgeLayer) disposeNetworkEdgeLineLayer(edgeLayer);
    }
    for (const s of this.outputDigitSprites) {
      const mat = s.material as THREE.SpriteMaterial;
      mat.map?.dispose();
      mat.dispose();
    }
  }
}
