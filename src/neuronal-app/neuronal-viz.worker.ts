/// <reference lib="webworker" />

import { Network3D } from '../viz/network3d';
import { animateLoop, createScene } from '../viz/scene';
import {
  normalizeVibeCameraTuning,
  resolveVibeCameraParams,
} from '../viz/vibe-camera-settings';
import { WorkerCanvasDomSurfaceStub } from '../viz/worker-canvas-dom-surface-stub';
import type {
  VizWorkerHostToWorkerMessage,
  VizWorkerWorkerToHostMessage,
} from './neuronal-viz-worker.protocol';

type WorkerScope = DedicatedWorkerGlobalScope & {
  requestAnimationFrame: typeof globalThis.requestAnimationFrame;
};

const workerScope = globalThis as unknown as WorkerScope;

type SceneBundle = ReturnType<typeof createScene>;

let stopAnimCleanup: (() => void) | null = null;
let sceneBundle: SceneBundle | null = null;
let disposeScene: (() => void) | null = null;
let orbitSurface: WorkerCanvasDomSurfaceStub | null = null;
let latestPixelRatio = 1;
let syncLayoutFromMount: (() => void) | null = null;
let net3d: Network3D | null = null;
let fpsOverlayEnabled = false;
let lastFpsSampleTimeMs = 0;

/** DOM-Event-Konstruktoren fehlen im Worker; reicht für Stub + OrbitControls. */
const createSyntheticEventFromInit = <Init extends object>(
  eventType: string,
  init: Init,
): Event => {
  const initRecord = init as Record<string, unknown>;
  const base = new Event(eventType, {
    bubbles: (initRecord['bubbles'] as boolean | undefined) ?? true,
    cancelable: (initRecord['cancelable'] as boolean | undefined) ?? true,
  });
  return (Object.keys(initRecord) as string[]).reduce(
    (eventTarget, propertyKey) => {
      if (propertyKey === 'bubbles' || propertyKey === 'cancelable') {
        return eventTarget;
      }
      const value = initRecord[propertyKey];
      if (value === undefined) return eventTarget;
      Object.defineProperty(eventTarget, propertyKey, {
        value,
        enumerable: true,
        configurable: true,
      });
      return eventTarget;
    },
    base as Event & Record<string, unknown>,
  ) as unknown as Event;
};

const createSyntheticKeyboardEvent = (
  eventType: 'keydown' | 'keyup',
  code: string,
): Event => {
  const base = new Event(eventType, { bubbles: true });
  Object.defineProperty(base, 'code', {
    value: code,
    enumerable: true,
    configurable: true,
  });
  return base;
};

const dispatchOnSurface = (domEvent: Event): void => {
  orbitSurface?.dispatchForwardedEvent(domEvent);
};

const handleMessage = (
  event: MessageEvent<VizWorkerHostToWorkerMessage>,
): void => {
  const message = event.data;
  if (!message || typeof message !== 'object') return;
  switch (message.type) {
    case 'init': {
      if (!(message.canvas instanceof OffscreenCanvas)) {
        console.error('init: kein OffscreenCanvas');
        break;
      }
      latestPixelRatio = message.pixelRatio;
      orbitSurface = new WorkerCanvasDomSurfaceStub();
      orbitSurface.setLayoutSize(message.width, message.height);
      const created = createScene({
        mode: 'worker',
        offscreenCanvas: message.canvas,
        orbitDomSurface: orbitSurface,
        getPixelRatio: () => latestPixelRatio,
        mobileQuality: message.mobileQuality,
      });
      sceneBundle = created;
      disposeScene = created.dispose;
      syncLayoutFromMount = created.syncLayoutFromMount;
      net3d = new Network3D([...message.layerSizes], {
        lowNeuronMeshDetail: message.mobileQuality,
      });
      created.scene.add(net3d.root);
      created.setVibeNetworkLookFocus({
        fillLayoutCentroid: (out, elapsedSec = 0) => {
          net3d!.fillVibeLookTarget(out, elapsedSec);
        },
        fillPathGravityFocus: (out) => {
          net3d!.fillSceneDisplayCenter(out);
        },
        fillLayoutBounds: (min, max) => {
          net3d!.fillLayoutBounds(min, max);
        },
      });
      stopAnimCleanup = animateLoop(created.render, created.controls, () => {
        if (!fpsOverlayEnabled) {
          lastFpsSampleTimeMs = 0;
          return;
        }
        const nowMs = performance.now();
        if (lastFpsSampleTimeMs > 0) {
          const deltaMs = Math.max(1e-6, nowMs - lastFpsSampleTimeMs);
          const framesPerSecond = 1000 / deltaMs;
          workerScope.postMessage({
            type: 'vizWorkerFpsSample',
            fps: framesPerSecond,
          } satisfies VizWorkerWorkerToHostMessage);
        }
        lastFpsSampleTimeMs = nowMs;
      });
      syncLayoutFromMount();
      workerScope.postMessage({
        type: 'vizWorkerGlReady',
      } satisfies VizWorkerWorkerToHostMessage);
      break;
    }
    case 'resize': {
      latestPixelRatio = message.pixelRatio;
      orbitSurface?.setLayoutSize(message.width, message.height);
      syncLayoutFromMount?.();
      break;
    }
    case 'dispose': {
      stopAnimCleanup?.();
      stopAnimCleanup = null;
      disposeScene?.();
      disposeScene = null;
      sceneBundle = null;
      net3d?.dispose();
      net3d = null;
      orbitSurface?.removeAllListeners();
      orbitSurface = null;
      syncLayoutFromMount = null;
      workerScope.postMessage({
        type: 'vizWorkerDisposed',
      } satisfies VizWorkerWorkerToHostMessage);
      break;
    }
    case 'setVibeCameraMode': {
      sceneBundle?.setVibeCameraMode(message.enabled);
      break;
    }
    case 'applyVibeCameraSettings': {
      const tuning = normalizeVibeCameraTuning(message.tuning);
      const resolved = resolveVibeCameraParams(tuning);
      sceneBundle?.applyVibeCameraSettings(tuning);
      net3d?.setVibeLookTuning(
        resolved.lookWanderSpeed,
        resolved.lookEqualLayerBlend,
      );
      break;
    }
    case 'applyVizSceneColors': {
      sceneBundle?.applyVizSceneColors(message.colors);
      break;
    }
    case 'applyVizLightColors': {
      sceneBundle?.applyVizLightColors(message.colors);
      break;
    }
    case 'applyVizPostProcess': {
      sceneBundle?.applyVizPostProcess(message.settings);
      break;
    }
    case 'setWeights': {
      net3d?.setWeights(message.weights);
      break;
    }
    case 'setIdleDim': {
      net3d?.setIdleDim(message.dim);
      break;
    }
    case 'setInferResult': {
      net3d?.setInferResult(message.predictedDigit, message.expectedDigit);
      break;
    }
    case 'setEdgeFocus': {
      net3d?.setEdgeFocus(message.mode, message.activations);
      break;
    }
    case 'setActivations': {
      net3d?.setActivations(message.activations);
      break;
    }
    case 'applyVizState': {
      if (!net3d) break;
      net3d.setIdleDim(message.mode === 'idle');
      if (message.mode === 'infer') {
        net3d.setInferResult(message.predictedDigit, message.expectedDigit);
      } else {
        net3d.setInferResult(null, null);
      }
      net3d.setEdgeFocus(
        message.mode === 'infer'
          ? 'infer'
          : message.mode === 'train'
            ? 'trainRecent'
            : 'off',
        message.mode === 'infer' ? message.activations : null,
      );
      net3d.setActivations(message.activations);
      if (message.weightsForViz) net3d.setWeights(message.weightsForViz);
      break;
    }
    case 'setHiddenLayerLayout': {
      net3d?.setHiddenLayerLayout(message.index, message.layout);
      break;
    }
    case 'setHiddenLayerLayoutScale': {
      net3d?.setHiddenLayerLayoutScale(message.index, message.scale);
      break;
    }
    case 'setInputLayerLayout': {
      net3d?.setInputLayerLayout(message.layout);
      break;
    }
    case 'setInputLayerLayoutScale': {
      net3d?.setInputLayerLayoutScale(message.scale);
      break;
    }
    case 'setActiveNeuronMaxScaleMul': {
      net3d?.setActiveNeuronMaxScaleMul(message.mul);
      break;
    }
    case 'applyVizNetworkColors': {
      net3d?.applyVizNetworkColors(message.colors);
      break;
    }
    case 'canvasPointer': {
      dispatchOnSurface(
        createSyntheticEventFromInit(message.eventType, message.initDict),
      );
      break;
    }
    case 'canvasWheel': {
      dispatchOnSurface(
        createSyntheticEventFromInit('wheel', message.initDict),
      );
      break;
    }
    case 'canvasContextMenu': {
      dispatchOnSurface(
        createSyntheticEventFromInit('contextmenu', message.initDict),
      );
      break;
    }
    case 'navKeyDown': {
      dispatchOnSurface(createSyntheticKeyboardEvent('keydown', message.code));
      break;
    }
    case 'navKeyUp': {
      dispatchOnSurface(createSyntheticKeyboardEvent('keyup', message.code));
      break;
    }
    case 'navKeysClear': {
      const codes = [
        'KeyW',
        'KeyS',
        'KeyA',
        'KeyD',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
      ];
      codes.forEach((code) =>
        dispatchOnSurface(createSyntheticKeyboardEvent('keyup', code)),
      );
      break;
    }
    case 'setFpsOverlayEnabled': {
      fpsOverlayEnabled = message.enabled;
      if (!fpsOverlayEnabled) lastFpsSampleTimeMs = 0;
      break;
    }
    case 'documentVisibilityHidden': {
      if (message.hidden) {
        const codes = [
          'KeyW',
          'KeyS',
          'KeyA',
          'KeyD',
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
        ];
        codes.forEach((code) =>
          dispatchOnSurface(createSyntheticKeyboardEvent('keyup', code)),
        );
      }
      break;
    }
    default:
      break;
  }
};

workerScope.addEventListener('message', handleMessage);

queueMicrotask(() => {
  workerScope.postMessage({
    type: 'vizWorkerReady',
  } satisfies VizWorkerWorkerToHostMessage);
});
