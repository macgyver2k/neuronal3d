import {
  isMobileQualityProfile,
  MOBILE_POINTER_MOVE_MIN_MS,
  mobilePixelRatioCap,
} from '../viz/mobile-quality';
import type {
  HiddenLayerVizLayout,
  InputLayerVizLayout,
} from '../viz/network3d';
import type { VibeCameraTuning } from '../viz/vibe-camera-settings';
import type {
  VizLightColorSettings,
  VizNetworkColorSettings,
  VizPostProcessSettings,
  VizSceneColorSettings,
} from '../viz/viz-appearance';
import { LAYER_SIZES } from './constants';
import type {
  VizCanvasPointerInit,
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
): VizCanvasPointerInit {
  const rect = canvas.getBoundingClientRect();
  const localX = source.clientX - rect.left;
  const localY = source.clientY - rect.top;

  return {
    pointerId: source.pointerId,
    pointerType: source.pointerType,
    clientX: localX,
    clientY: localY,
    pageX: localX,
    pageY: localY,
    offsetX: localX,
    offsetY: localY,
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

function isVizTouchLikePointer(event: PointerEvent): boolean {
  return event.pointerType === 'touch' || event.pointerType === 'pen';
}

function preventTouchScroll(event: PointerEvent): void {
  if (!isVizTouchLikePointer(event)) return;
  event.preventDefault();
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

  applyVizState(
    mode: 'idle' | 'train' | 'infer',
    activations: number[][],
    predictedDigit: number | null,
    expectedDigit: number | null,
    weightsForViz?: number[][][],
  ): void {
    this.postToWorker({
      type: 'applyVizState',
      mode,
      activations,
      predictedDigit,
      expectedDigit,
      weightsForViz,
    });
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

  private readonly onWorkerSideMessage = (
    event: MessageEvent<VizWorkerWorkerToHostMessage>,
  ): void => {
    if (event.data?.type !== 'vizWorkerFpsSample') return;
    this.fpsSampleListener?.(event.data.fps);
  };

  private worker: Worker | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private resizeObserverRaf = 0;
  private stopMainVizTick: (() => void) | null = null;
  private detachCanvasListeners: (() => void) | null = null;
  private readonly surfaceBridge: NeuronalVizWorkerSurfaceBridge;
  private latestPixelRatio = 1;
  private fpsSampleListener: ((framesPerSecond: number) => void) | null = null;
  private pointerMoveRaf = 0;
  private pointerMoveFlushAt = 0;
  private pendingPointerMove: VizCanvasPointerInit | null = null;
  private readonly mobileQuality = isMobileQualityProfile();

  constructor(private readonly container: HTMLElement) {
    this.surfaceBridge = new NeuronalVizWorkerSurfaceBridge((message) =>
      this.postToWorker(message),
    );
    this.vizSurface = this.surfaceBridge;
  }

  private postPointerMove(initDict: VizCanvasPointerInit): void {
    if (!this.mobileQuality) {
      this.postToWorker({
        type: 'canvasPointer',
        eventType: 'pointermove',
        initDict,
      });
      return;
    }
    this.pendingPointerMove = initDict;
    const now = performance.now();
    if (now - this.pointerMoveFlushAt >= MOBILE_POINTER_MOVE_MIN_MS) {
      this.flushPendingPointerMove();
      return;
    }
    if (this.pointerMoveRaf !== 0) return;
    this.pointerMoveRaf = requestAnimationFrame(() => {
      this.pointerMoveRaf = 0;
      this.flushPendingPointerMove();
    });
  }

  private flushPendingPointerMove(): void {
    if (!this.pendingPointerMove) return;
    const initDict = this.pendingPointerMove;
    this.pendingPointerMove = null;
    this.pointerMoveFlushAt = performance.now();
    this.postToWorker({
      type: 'canvasPointer',
      eventType: 'pointermove',
      initDict,
    });
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
    this.latestPixelRatio = mobilePixelRatioCap();
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
    applyVibeCameraSettings: (tuning: VibeCameraTuning) => void;
    applyVizSceneColors: (next: VizSceneColorSettings) => void;
    applyVizLightColors: (next: VizLightColorSettings) => void;
    applyVizPostProcess: (next: VizPostProcessSettings) => void;
  }> {
    const worker = new Worker(
      new URL('./neuronal-viz.worker.ts', import.meta.url),
      { type: 'module', name: 'neuronal-viz' },
    );
    this.worker = worker;
    worker.addEventListener('message', this.onWorkerSideMessage);
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
    canvas.style.touchAction = 'none';
    this.container.appendChild(canvas);

    const { width, height } = this.measureDrawable();
    this.latestPixelRatio = mobilePixelRatioCap();
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
          mobileQuality: this.mobileQuality,
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
      preventTouchScroll(event);
      if (isVizTouchLikePointer(event)) {
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch {
          /* ignore capture errors on unsupported platforms */
        }
      }
      this.postToWorker({
        type: 'canvasPointer',
        eventType: 'pointerdown',
        initDict: pointerInitLocal(canvas, event),
      });
    };
    const onPointerMove = (event: PointerEvent): void => {
      if (
        isVizTouchLikePointer(event) &&
        canvas.hasPointerCapture(event.pointerId)
      ) {
        event.preventDefault();
      }
      this.postPointerMove(pointerInitLocal(canvas, event));
    };
    const onPointerUp = (event: PointerEvent): void => {
      if (canvas.hasPointerCapture(event.pointerId)) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }
      this.postToWorker({
        type: 'canvasPointer',
        eventType: 'pointerup',
        initDict: pointerInitLocal(canvas, event),
      });
    };
    const onPointerCancel = (event: PointerEvent): void => {
      if (canvas.hasPointerCapture(event.pointerId)) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }
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

    const pointerListenerOptions: AddEventListenerOptions = { passive: false };
    canvas.addEventListener(
      'pointerdown',
      onPointerDown,
      pointerListenerOptions,
    );
    canvas.addEventListener(
      'pointermove',
      onPointerMove,
      pointerListenerOptions,
    );
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
      canvas.removeEventListener(
        'pointerdown',
        onPointerDown,
        pointerListenerOptions,
      );
      canvas.removeEventListener(
        'pointermove',
        onPointerMove,
        pointerListenerOptions,
      );
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

    const applyVibeCameraSettings = (tuning: VibeCameraTuning): void => {
      this.postToWorker({ type: 'applyVibeCameraSettings', tuning });
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
      applyVibeCameraSettings,
      applyVizSceneColors,
      applyVizLightColors,
      applyVizPostProcess,
    };
  }

  setFpsReporting(
    enabled: boolean,
    onSample: ((framesPerSecond: number) => void) | null,
  ): void {
    this.fpsSampleListener = enabled && onSample ? onSample : null;
    this.postToWorker({
      type: 'setFpsOverlayEnabled',
      enabled,
    } satisfies VizWorkerHostToWorkerMessage);
  }

  private onWindowResize = (): void => {
    this.pushResize();
  };

  stopMainVizTickOnly(): void {
    this.stopMainVizTick?.();
    this.stopMainVizTick = null;
  }

  destroy(): void {
    this.setFpsReporting(false, null);
    this.stopMainVizTickOnly();
    if (this.pointerMoveRaf !== 0) {
      cancelAnimationFrame(this.pointerMoveRaf);
      this.pointerMoveRaf = 0;
    }
    this.pendingPointerMove = null;
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
    worker?.removeEventListener('message', this.onWorkerSideMessage);
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
