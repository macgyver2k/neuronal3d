/// <reference lib="webworker" />

import { Network3D } from '../viz/network3d';
import { animateLoop, createScene } from '../viz/scene';
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
      });
      sceneBundle = created;
      disposeScene = created.dispose;
      syncLayoutFromMount = created.syncLayoutFromMount;
      net3d = new Network3D([...message.layerSizes]);
      created.scene.add(net3d.root);
      stopAnimCleanup = animateLoop(created.render, created.controls, () => {});
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
      dispatchOnSurface(new PointerEvent(message.eventType, message.initDict));
      break;
    }
    case 'canvasWheel': {
      dispatchOnSurface(new WheelEvent('wheel', message.initDict));
      break;
    }
    case 'canvasContextMenu': {
      dispatchOnSurface(new MouseEvent('contextmenu', message.initDict));
      break;
    }
    case 'navKeyDown': {
      dispatchOnSurface(
        new KeyboardEvent('keydown', {
          code: message.code,
          bubbles: true,
        }),
      );
      break;
    }
    case 'navKeyUp': {
      dispatchOnSurface(
        new KeyboardEvent('keyup', {
          code: message.code,
          bubbles: true,
        }),
      );
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
        dispatchOnSurface(new KeyboardEvent('keyup', { code, bubbles: true })),
      );
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
          dispatchOnSurface(
            new KeyboardEvent('keyup', { code, bubbles: true }),
          ),
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
