import {
  HIDDEN_LAYER_VIZ_LAYOUTS,
  INPUT_LAYER_VIZ_LAYOUTS,
  type HiddenLayerVizLayout,
  type InputLayerVizLayout,
} from '../viz/network3d';
import { LAYER_SIZES } from './constants';
import { RT } from './runtime-state';

type VizMode = 'idle' | 'train' | 'infer';

type VizState = {
  stamp: number;
  mode: VizMode;
  activations: number[][];
  weightsForViz?: number[][][];
};

let vizStampCounter = 0;
let lastAppliedVizStamp = 0;
let pendingVizState: VizState | null = null;

export function zeroActivationsForLayout(): number[][] {
  return LAYER_SIZES.map((n) => new Array<number>(n).fill(0));
}

export function publishVizState(
  mode: VizMode,
  activations: number[][],
  weightsForViz?: number[][][],
): void {
  pendingVizState = {
    stamp: ++vizStampCounter,
    mode,
    activations: activations.map((a) => [...a]),
    weightsForViz:
      weightsForViz === undefined
        ? undefined
        : weightsForViz.map((matrix) => matrix.map((row) => [...row])),
  };
  void flushVizState();
}

export function flushVizState(): boolean {
  if (!RT.net3d || !pendingVizState) return false;
  if (pendingVizState.stamp === lastAppliedVizStamp) return false;
  RT.net3d.setIdleDim(pendingVizState.mode === 'idle');
  if (pendingVizState.mode !== 'infer') RT.net3d.setInferResult(null, null);
  RT.net3d.setEdgeFocus(
    pendingVizState.mode === 'infer'
      ? 'infer'
      : pendingVizState.mode === 'train'
        ? 'trainRecent'
        : 'off',
    pendingVizState.mode === 'infer' ? pendingVizState.activations : null,
  );
  RT.net3d.setActivations(pendingVizState.activations);
  const weightMatrices =
    pendingVizState.weightsForViz ?? RT.net?.weights ?? null;
  if (weightMatrices) RT.net3d.setWeights(weightMatrices);
  lastAppliedVizStamp = pendingVizState.stamp;
  return true;
}

export function parseHiddenLayerVizLayout(
  s: string,
): HiddenLayerVizLayout | null {
  return (HIDDEN_LAYER_VIZ_LAYOUTS as readonly string[]).includes(s)
    ? (s as HiddenLayerVizLayout)
    : null;
}

export function parseInputLayerVizLayout(
  s: string,
): InputLayerVizLayout | null {
  return (INPUT_LAYER_VIZ_LAYOUTS as readonly string[]).includes(s)
    ? (s as InputLayerVizLayout)
    : null;
}

export function reapplyViz3dAfterLayoutChange(): void {
  if (!RT.net3d) return;
  if (pendingVizState) {
    pendingVizState = { ...pendingVizState, stamp: ++vizStampCounter };
    flushVizState();
  } else {
    publishVizState('idle', zeroActivationsForLayout());
  }
  RT.renderDisplayBound();
}

export function tickViz(): void {
  void flushVizState();
}
