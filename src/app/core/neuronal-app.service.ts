import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  asyncScheduler,
  filter,
  firstValueFrom,
  take,
  withLatestFrom,
} from 'rxjs';
import {
  createNeuronalAppRuntime,
  getInferDrawBrushModeGlobal,
  getInferDrawBrushSizeGlobal,
  setInferDrawBrushModeGlobal,
  setInferDrawBrushSizeGlobal,
  type InferDrawBrushMode,
  type NeuronalAppRuntime,
} from '../../neuronal-app';
import type {
  VizLightColorSettings,
  VizNetworkColorSettings,
  VizPostProcessSettings,
  VizSceneColorSettings,
} from '../../viz/viz-appearance';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectModelStoreHydrated,
  selectTrainingRunning,
} from '../store/neuronal/neuronal.selectors';
import { NeuronalAppInstance } from './neuronal-app-instance';
import { routerUrlModelIdFromPath } from './router-model-url';

@Injectable({ providedIn: 'root' })
export class NeuronalAppService {
  /** Grenzen für den Pinselgrößen-Schieberegler (Stufe 1…7). */
  readonly inferDrawBrushSizeUi = { min: 1, max: 7 } as const;

  readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly appInstance = inject(NeuronalAppInstance);
  private readonly actions$ = inject(Actions);
  private runtime: NeuronalAppRuntime | null = null;
  private hydrateOnce: Promise<void> | null = null;

  constructor() {
    this.actions$
      .pipe(
        ofType(NeuronalActions.activeModelIdFromRouteSet),
        withLatestFrom(this.store.select(selectTrainingRunning)),
        filter(([, running]) => !running),
      )
      .subscribe(([{ id }]) => {
        asyncScheduler.schedule(() =>
          this.appInstance.activeModelFromToolbar(id),
        );
      });
  }

  async ensureStoreHydrated(): Promise<void> {
    if (!this.hydrateOnce) {
      this.hydrateOnce = firstValueFrom(
        this.store.select(selectModelStoreHydrated).pipe(
          filter((h): h is true => h),
          take(1),
        ),
      ).then(() => {});
    }
    await this.hydrateOnce;
  }

  async bindRuntime(
    root: HTMLElement,
    appInstance: NeuronalAppInstance,
  ): Promise<() => void> {
    await this.ensureStoreHydrated();
    this.runtime?.destroy();
    const next = createNeuronalAppRuntime(
      this.store,
      root,
      appInstance,
      (selectedModelId) => {
        const before = routerUrlModelIdFromPath(this.router.url);
        if (before != null && before !== selectedModelId) {
          void this.router.navigate(['/model', selectedModelId], {
            replaceUrl: true,
          });
        }
        return before;
      },
    );
    this.runtime = next;
    return () => {
      if (this.runtime === next) {
        next.destroy();
        this.runtime = null;
      } else {
        next.destroy();
      }
    };
  }

  dispatch(a: { type: string } & object): void {
    this.store.dispatch(a as never);
  }

  onTrain = (): void => {
    this.runtime?.onTrain();
  };
  onPause = (): void => {
    this.runtime?.onPause();
  };
  onModelSelectChange = (): void => {
    this.runtime?.onModelSelectChange();
  };
  onActiveModelFromMenu = (id: string): void => {
    this.store.dispatch(
      NeuronalActions.activeModelFromToolbarRequested({ id }),
    );
  };
  onNewModel = (): void => {
    this.runtime?.onNewModel();
  };
  onSaveAs = (): void => {
    this.runtime?.onSaveAs();
  };
  onReset = (): void => {
    this.runtime?.onReset();
  };
  onInferRandom = (): void => {
    this.runtime?.onInferRandom();
  };
  onInferTrainSample(index: number): void {
    this.runtime?.onInferTrainSample(index);
  }
  onInferDraw = (): void => {
    this.runtime?.onInferDraw();
  };
  onClearDraw = (): void => {
    this.runtime?.onClearDraw();
  };
  onEpochsInput = (): void => {
    this.runtime?.onEpochsInput();
  };
  onBatchSizeInput = (): void => {
    this.runtime?.onBatchSizeInput();
  };
  onEpochPreset = (n: number): void => {
    this.runtime?.onEpochPreset(n);
  };
  onDocumentPointerDown = (ev: PointerEvent): void => {
    this.runtime?.onDocumentPointerDown(ev);
  };
  onDrawPointerDown = (e: PointerEvent): void => {
    this.runtime?.onDrawPointerDown(e);
  };
  onDrawPointerMove = (e: PointerEvent): void => {
    this.runtime?.onDrawPointerMove(e);
  };
  onDrawPointerUp = (): void => {
    this.runtime?.onDrawPointerUp();
  };
  onDrawPointerCancel = (): void => {
    this.runtime?.onDrawPointerCancel();
  };
  onDrawPointerLeave = (): void => {
    this.runtime?.onDrawPointerLeave();
  };
  onHiddenLayerLayoutChange = (index: number, raw: string): void => {
    this.runtime?.onHiddenLayerLayoutChange(index, raw);
  };
  onHiddenLayerLayoutScaleChange = (index: number, scale: number): void => {
    this.runtime?.onHiddenLayerLayoutScaleChange(index, scale);
  };
  onInputLayerLayoutChange = (raw: string): void => {
    this.runtime?.onInputLayerLayoutChange(raw);
  };
  onInputLayerLayoutScaleChange = (scale: number): void => {
    this.runtime?.onInputLayerLayoutScaleChange(scale);
  };
  onActiveNeuronMaxScaleMulChange = (mul: number): void => {
    this.runtime?.onActiveNeuronMaxScaleMulChange(mul);
  };
  onVizSceneColorsApply = (colors: VizSceneColorSettings): void => {
    this.runtime?.onVizSceneColorsApply(colors);
  };
  onVizLightColorsApply = (colors: VizLightColorSettings): void => {
    this.runtime?.onVizLightColorsApply(colors);
  };
  onVizNetworkColorsApply = (colors: VizNetworkColorSettings): void => {
    this.runtime?.onVizNetworkColorsApply(colors);
  };
  onVizPostProcessApply = (pp: VizPostProcessSettings): void => {
    this.runtime?.onVizPostProcessApply(pp);
  };
  previewVizSceneColor = (
    key: keyof VizSceneColorSettings,
    color: string,
  ): void => {
    this.runtime?.previewVizSceneColor(key, color);
  };
  previewVizLightColor = (
    key: keyof VizLightColorSettings,
    color: string,
  ): void => {
    this.runtime?.previewVizLightColor(key, color);
  };
  cancelPendingVizColorPreviews = (): void => {
    this.runtime?.cancelPendingVizColorPreviews();
  };

  /** @returns neuer Zustand, oder `null` wenn die Runtime noch nicht gebunden ist */
  toggleVibeCameraState(current: boolean): boolean | null {
    if (!this.runtime) return null;
    const next = !current;
    this.runtime.setVibeCameraMode(next);
    return next;
  }

  /** Karussell läuft nur, wenn `enabled` true und Netz + Testdaten vorhanden sind. @returns ob das Karussell aktiv ist */
  setTestImageCarouselMode(enabled: boolean): boolean {
    return this.runtime?.setTestImageCarouselMode(enabled) ?? false;
  }

  /** @returns Karussell aktiv (`true`/`false`), oder `null` ohne Runtime */
  toggleTestImageCarouselState(current: boolean): boolean | null {
    if (!this.runtime) return null;
    const want = !current;
    return this.runtime.setTestImageCarouselMode(want);
  }

  /** Karussell stoppen (z. B. beim Verlassen des Infer-Panels). */
  stopTestImageCarousel(): void {
    this.runtime?.setTestImageCarouselMode(false);
  }

  setInferDrawBrushMode(mode: InferDrawBrushMode): void {
    setInferDrawBrushModeGlobal(mode);
  }

  getInferDrawBrushMode(): InferDrawBrushMode {
    return getInferDrawBrushModeGlobal();
  }

  setInferDrawBrushSize(n: number): void {
    setInferDrawBrushSizeGlobal(n);
  }

  getInferDrawBrushSize(): number {
    return getInferDrawBrushSizeGlobal();
  }
}
