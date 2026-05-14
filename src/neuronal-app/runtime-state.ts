import { Store } from '@ngrx/store';
import type { AppState } from '../app/store/app.state';
import type { NeuronalState } from '../app/store/neuronal/neuronal.state';
import type { MLP } from '../nn/network';
import type { Network3D } from '../viz/network3d';
import type { ReconcileWorkspaceUrlForModelSelection } from './types';

/**
 * Gemeinsamer Laufzeit-Zustand (ein mutierbares Objekt).
 * Felder werden in `createNeuronalAppRuntime` gesetzt; Typen sind non-null,
 * damit Module ohne `?.`-Spam arbeiten können (wie früher bei Top-level-`let`).
 */
export const RT = {
  surfaceVizMount: null as unknown as HTMLElement,
  surfaceDrawCanvas: null as unknown as HTMLCanvasElement,
  ctx2d: null as unknown as CanvasRenderingContext2D,
  appStore: null as unknown as Store<AppState>,
  reconcileWorkspaceUrlForModelSelection: undefined as
    | ReconcileWorkspaceUrlForModelSelection
    | undefined,
  nLatest: null as unknown as NeuronalState,
  net: null as MLP | null,
  net3d: null as Network3D | null,
  inferCounter: 0,
  lastInferSampleIndex: -1,
  lastInferActsDebug: null as number[][] | null,
  drawing: false,
  liveCanvasInferRaf: null as number | null,
  liveInferLastRun: 0,
  drawLastCell: null as { gx: number; gy: number } | null,
  drawLastSoftPoint: null as { x: number; y: number } | null,
  drawSoftIsPen: true,
  drawInk: '#ffffff',
  drawBrushChebR: 0,
  renderSceneBound: (): void => {},
  renderDisplayBound: (): void => {},
  disposeSceneBound: null as (() => void) | null,
  stopAnimCleanup: null as (() => void) | null,
};
