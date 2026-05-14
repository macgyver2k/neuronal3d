import type {
  HiddenLayerVizLayout,
  InputLayerVizLayout,
} from '../viz/network3d';
import type {
  VizLightColorSettings,
  VizNetworkColorSettings,
  VizPostProcessSettings,
  VizSceneColorSettings,
} from '../viz/viz-appearance';
import { LAYER_SIZES } from './constants';
import type {
  VizWorkerHostToWorkerMessage,
  VizWorkerWorkerToHostMessage,
} from './neuronal-viz-worker.protocol';
import type { NeuronalVizSurface } from './viz-neuronal-surface';
import { tickViz } from './viz-sync';

const NAV_KEY_CODES = new Set([
  'KeyW',
  'KeyS',
  'KeyA',
  'KeyD',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
]);

function isTypingFocusTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    target.closest("input, textarea, [contenteditable='true']") !== null
  );
}

function pointerInitLocal(
  canvas: HTMLCanvasElement,
  source: PointerEvent,
): PointerEventInit {
  const rect = canvas.getBoundingClientRect();
  return {
    pointerId: source.pointerId,
    pointerType: source.pointerType,
    clientX: source.clientX - rect.left,
    clientY: source.clientY - rect.top,
    buttons: source.buttons,
    button: source.button,
    ctrlKey: source.ctrlKey,
    shiftKey: source.shiftKey,
    altKey: source.altKey,
    metaKey: source.metaKey,
    bubbles: true,
    cancelable: true,
    isPrimary: source.isPrimary,
    pressure: source.pressure,
  };
}

function wheelInitLocal(
  canvas: HTMLCanvasElement,
  source: WheelEvent,
): WheelEventInit {
  const rect = canvas.getBoundingClientRect();
  return {
    deltaX: source.deltaX,
    deltaY: source.deltaY,
    deltaZ: source.deltaZ,
    deltaMode: source.deltaMode,
    clientX: source.clientX - rect.left,
    clientY: source.clientY - rect.top,
    ctrlKey: source.ctrlKey,
    shiftKey: source.shiftKey,
    altKey: source.altKey,
    metaKey: source.metaKey,
    bubbles: true,
    cancelable: true,
  };
}

function contextMenuInitLocal(
  canvas: HTMLCanvasElement,
  source: MouseEvent,
): MouseEventInit {
  const rect = canvas.getBoundingClientRect();
  return {
    clientX: source.clientX - rect.left,
    clientY: source.clientY - rect.top,
    button: source.button,
    buttons: source.buttons,
    ctrlKey: source.ctrlKey,
    shiftKey: source.shiftKey,
    altKey: source.altKey,
    metaKey: source.metaKey,
    bubbles: true,
    cancelable: true,
  };
}

class NeuronalVizWorkerSurfaceBridge implements NeuronalVizSurface {
  constructor(
    private readonly postToWorker: (
      message: VizWorkerHostToWorkerMessage,
    ) => void,
  ) {}

  setWeights(weights: number[][][]): void {
    this.postToWorker({ type: 'setWeights', weights });
  }

  setIdleDim(dim: boolean): void {
    this.postToWorker({ type: 'setIdleDim', dim });
  }

  setInferResult(
    predictedDigit: number | null,
    expectedDigit: number | null,
  ): void {
    this.postToWorker({
      type: 'setInferResult',
      predictedDigit,
      expectedDigit,
    });
  }

  setEdgeFocus(
    mode: 'off' | 'infer' | 'trainRecent',
    activations: number[][] | null,
  ): void {
    this.postToWorker({ type: 'setEdgeFocus', mode, activations });
  }

  setActivations(activations: number[][]): void {
    this.postToWorker({ type: 'setActivations', activations });
  }

  setHiddenLayerLayout(index: number, layout: HiddenLayerVizLayout): void {
    this.postToWorker({ type: 'setHiddenLayerLayout', index, layout });
  }

  setHiddenLayerLayoutScale(index: number, scale: number): void {
    this.postToWorker({ type: 'setHiddenLayerLayoutScale', index, scale });
  }

  setInputLayerLayout(layout: InputLayerVizLayout): void {
    this.postToWorker({ type: 'setInputLayerLayout', layout });
  }

  setInputLayerLayoutScale(scale: number): void {
    this.postToWorker({ type: 'setInputLayerLayoutScale', scale });
  }

  setActiveNeuronMaxScaleMul(mul: number): void {
    this.postToWorker({ type: 'setActiveNeuronMaxScaleMul', mul });
  }

  applyVizNetworkColors(colors: VizNetworkColorSettings): void {
    this.postToWorker({ type: 'applyVizNetworkColors', colors });
  }

  dispose(): void {}
}

export class NeuronalVizRenderWorkerHost {
  readonly vizSurface: NeuronalVizSurface;

  private worker: Worker | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private resizeObserverRaf = 0;
  private stopMainVizTick: (() => void) | null = null;
  private detachCanvasListeners: (() => void) | null = null;
  private readonly surfaceBridge: NeuronalVizWorkerSurfaceBridge;
  private latestPixelRatio = 1;

  constructor(private readonly container: HTMLElement) {
    this.surfaceBridge = new NeuronalVizWorkerSurfaceBridge((message) =>
      this.postToWorker(message),
    );
    this.vizSurface = this.surfaceBridge;
  }

  private postToWorker(message: VizWorkerHostToWorkerMessage): void {
    this.worker?.postMessage(message);
  }

  private measureDrawable(): { width: number; height: number } {
    const width = Math.max(1, Math.floor(this.container.clientWidth));
    const height = Math.max(1, Math.floor(this.container.clientHeight));
    return { width, height };
  }

  private pushResize(): void {
    if (!this.worker || !this.canvas) return;
    const { width, height } = this.measureDrawable();
    this.latestPixelRatio = Math.min(window.devicePixelRatio, 2);
    this.worker.postMessage({
      type: 'resize',
      width,
      height,
      pixelRatio: this.latestPixelRatio,
    } satisfies VizWorkerHostToWorkerMessage);
  }

  private startMainThreadVizTick(): () => void {
    let mainRafId = 0;
    let stopped = false;
    const tickMain = (): void => {
      if (stopped) return;
      tickViz();
      mainRafId = window.requestAnimationFrame(tickMain);
    };
    mainRafId = window.requestAnimationFrame(tickMain);
    return () => {
      stopped = true;
      window.cancelAnimationFrame(mainRafId);
    };
  }

  async start(): Promise<{
    render: () => void;
    renderDisplay: () => void;
    setVibeCameraMode: (enabled: boolean) => void;
    applyVizSceneColors: (next: VizSceneColorSettings) => void;
    applyVizLightColors: (next: VizLightColorSettings) => void;
    applyVizPostProcess: (next: VizPostProcessSettings) => void;
  }> {
    const worker = new Worker(
      new URL('./neuronal-viz.worker.ts', import.meta.url),
      { type: 'module', name: 'neuronal-viz' },
    );
    this.worker = worker;
    await new Promise<void>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        reject(new Error('3D-Render-Worker: Timeout beim Start'));
      }, 20000);
      const onReady = (
        messageEvent: MessageEvent<VizWorkerWorkerToHostMessage>,
      ): void => {
        if (messageEvent.data?.type === 'vizWorkerReady') {
          window.clearTimeout(timeoutId);
          worker.removeEventListener('message', onReady);
          resolve();
        }
      };
      worker.addEventListener('message', onReady);
    });

    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    this.container.appendChild(canvas);

    const { width, height } = this.measureDrawable();
    this.latestPixelRatio = Math.min(window.devicePixelRatio, 2);
    const offscreen = canvas.transferControlToOffscreen();
    await new Promise<void>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        reject(new Error('3D-Render-Worker: Timeout WebGL-Init'));
      }, 20000);
      const onGlReady = (
        messageEvent: MessageEvent<VizWorkerWorkerToHostMessage>,
      ): void => {
        if (messageEvent.data?.type === 'vizWorkerGlReady') {
          window.clearTimeout(timeoutId);
          worker.removeEventListener('message', onGlReady);
          resolve();
        }
      };
      worker.addEventListener('message', onGlReady);
      worker.postMessage(
        {
          type: 'init',
          canvas: offscreen,
          width,
          height,
          pixelRatio: this.latestPixelRatio,
          layerSizes: LAYER_SIZES,
        } satisfies VizWorkerHostToWorkerMessage,
        [offscreen],
      );
    });

    this.resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (this.resizeObserverRaf !== 0) {
              cancelAnimationFrame(this.resizeObserverRaf);
            }
            this.resizeObserverRaf = requestAnimationFrame(() => {
              this.resizeObserverRaf = 0;
              this.pushResize();
            });
          })
        : null;
    this.resizeObserver?.observe(this.container);

    window.addEventListener('resize', this.onWindowResize);

    const onPointerDown = (event: PointerEvent): void => {
      this.postToWorker({
        type: 'canvasPointer',
        eventType: 'pointerdown',
        initDict: pointerInitLocal(canvas, event),
      });
    };
    const onPointerMove = (event: PointerEvent): void => {
      this.postToWorker({
        type: 'canvasPointer',
        eventType: 'pointermove',
        initDict: pointerInitLocal(canvas, event),
      });
    };
    const onPointerUp = (event: PointerEvent): void => {
      this.postToWorker({
        type: 'canvasPointer',
        eventType: 'pointerup',
        initDict: pointerInitLocal(canvas, event),
      });
    };
    const onPointerCancel = (event: PointerEvent): void => {
      this.postToWorker({
        type: 'canvasPointer',
        eventType: 'pointercancel',
        initDict: pointerInitLocal(canvas, event),
      });
    };
    const onWheel = (event: WheelEvent): void => {
      event.preventDefault();
      this.postToWorker({
        type: 'canvasWheel',
        initDict: wheelInitLocal(canvas, event),
      });
    };
    const onContextMenu = (event: MouseEvent): void => {
      event.preventDefault();
      this.postToWorker({
        type: 'canvasContextMenu',
        initDict: contextMenuInitLocal(canvas, event),
      });
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerCancel);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('contextmenu', onContextMenu);

    const onKeyNavDown = (event: KeyboardEvent): void => {
      if (!NAV_KEY_CODES.has(event.code) || isTypingFocusTarget(event.target)) {
        return;
      }
      event.preventDefault();
      this.postToWorker({ type: 'navKeyDown', code: event.code });
    };
    const onKeyNavUp = (event: KeyboardEvent): void => {
      if (!NAV_KEY_CODES.has(event.code)) return;
      event.preventDefault();
      this.postToWorker({ type: 'navKeyUp', code: event.code });
    };
    const clearNavKeys = (): void => {
      this.postToWorker({ type: 'navKeysClear' });
    };
    const onVisibility = (): void => {
      this.postToWorker({
        type: 'documentVisibilityHidden',
        hidden: document.hidden,
      });
    };

    window.addEventListener('keydown', onKeyNavDown);
    window.addEventListener('keyup', onKeyNavUp);
    window.addEventListener('blur', clearNavKeys);
    window.addEventListener('focus', clearNavKeys);
    window.addEventListener('pagehide', clearNavKeys);
    document.addEventListener('visibilitychange', onVisibility);

    this.stopMainVizTick = this.startMainThreadVizTick();

    this.detachCanvasListeners = (): void => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerCancel);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyNavDown);
      window.removeEventListener('keyup', onKeyNavUp);
      window.removeEventListener('blur', clearNavKeys);
      window.removeEventListener('focus', clearNavKeys);
      window.removeEventListener('pagehide', clearNavKeys);
      document.removeEventListener('visibilitychange', onVisibility);
    };

    const render = (): void => {};
    const renderDisplay = (): void => {};

    const setVibeCameraMode = (enabled: boolean): void => {
      this.postToWorker({ type: 'setVibeCameraMode', enabled });
    };

    const applyVizSceneColors = (next: VizSceneColorSettings): void => {
      this.postToWorker({ type: 'applyVizSceneColors', colors: next });
    };

    const applyVizLightColors = (next: VizLightColorSettings): void => {
      this.postToWorker({ type: 'applyVizLightColors', colors: next });
    };

    const applyVizPostProcess = (next: VizPostProcessSettings): void => {
      this.postToWorker({ type: 'applyVizPostProcess', settings: next });
    };

    return {
      render,
      renderDisplay,
      setVibeCameraMode,
      applyVizSceneColors,
      applyVizLightColors,
      applyVizPostProcess,
    };
  }

  private onWindowResize = (): void => {
    this.pushResize();
  };

  stopMainVizTickOnly(): void {
    this.stopMainVizTick?.();
    this.stopMainVizTick = null;
  }

  destroy(): void {
    this.stopMainVizTickOnly();
    window.removeEventListener('resize', this.onWindowResize);
    if (this.resizeObserverRaf !== 0) {
      cancelAnimationFrame(this.resizeObserverRaf);
      this.resizeObserverRaf = 0;
    }
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.detachCanvasListeners?.();
    this.detachCanvasListeners = null;

    const worker = this.worker;
    this.worker = null;
    if (worker) {
      const done = new Promise<void>((resolve) => {
        const onDisposed = (
          event: MessageEvent<VizWorkerWorkerToHostMessage>,
        ): void => {
          if (event.data?.type === 'vizWorkerDisposed') {
            worker.removeEventListener('message', onDisposed);
            resolve();
          }
        };
        worker.addEventListener('message', onDisposed);
        worker.postMessage({
          type: 'dispose',
        } satisfies VizWorkerHostToWorkerMessage);
        window.setTimeout(() => resolve(), 800);
      });
      void done.then(() => worker.terminate());
    }

    this.canvas?.remove();
    this.canvas = null;
  }
}
