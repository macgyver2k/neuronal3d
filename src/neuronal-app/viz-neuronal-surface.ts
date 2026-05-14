import type {
  HiddenLayerVizLayout,
  InputLayerVizLayout,
} from '../viz/network3d';
import type { VizNetworkColorSettings } from '../viz/viz-appearance';

/**
 * Alles, was die Laufzeit an der 3D-Netz-Oberfläche aufruft (main oder Worker).
 */
export interface NeuronalVizSurface {
  setWeights(weights: number[][][]): void;
  setIdleDim(dim: boolean): void;
  setInferResult(
    predictedDigit: number | null,
    expectedDigit: number | null,
  ): void;
  setEdgeFocus(
    mode: 'off' | 'infer' | 'trainRecent',
    activations: number[][] | null,
  ): void;
  setActivations(activations: number[][]): void;
  setHiddenLayerLayout(index: number, layout: HiddenLayerVizLayout): void;
  setHiddenLayerLayoutScale(index: number, scale: number): void;
  setInputLayerLayout(layout: InputLayerVizLayout): void;
  setInputLayerLayoutScale(scale: number): void;
  setActiveNeuronMaxScaleMul(mul: number): void;
  applyVizNetworkColors(colors: VizNetworkColorSettings): void;
  dispose(): void;
}
