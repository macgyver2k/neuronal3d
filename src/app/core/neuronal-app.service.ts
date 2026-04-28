import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, firstValueFrom, take, withLatestFrom } from "rxjs";
import { createNeuronalAppRuntime, type NeuronalAppRuntime } from "../../neuronal-app";
import { routerUrlModelIdFromPath } from "./router-model-url";
import { NeuronalAppInstance } from "./neuronal-app-instance";
import type { AppState } from "../store/app.state";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";
import { selectModelStoreHydrated, selectTrainingRunning } from "../store/neuronal/neuronal.selectors";

@Injectable({ providedIn: "root" })
export class NeuronalAppService {
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
        this.appInstance.activeModelFromToolbar(id);
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

  async bindRuntime(root: HTMLElement, appInstance: NeuronalAppInstance): Promise<() => void> {
    await this.ensureStoreHydrated();
    this.runtime?.destroy();
    const next = createNeuronalAppRuntime(
      this.store,
      root,
      appInstance,
      (selectedModelId) => {
        const before = routerUrlModelIdFromPath(this.router.url);
        if (before != null && before !== selectedModelId) {
          void this.router.navigate(["/model", selectedModelId], {
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
    this.store.dispatch(NeuronalActions.activeModelFromToolbarRequested({ id }));
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
}
