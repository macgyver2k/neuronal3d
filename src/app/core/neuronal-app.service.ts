import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { createNeuronalAppRuntime, type NeuronalAppRuntime } from "../../neuronal-app";
import { NeuronalAppInstance } from "./neuronal-app-instance";
import { loadModelStoreFromStorage } from "./model-storage";
import type { AppState } from "../store/app.state";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";

@Injectable({ providedIn: "root" })
export class NeuronalAppService {
  readonly store = inject(Store<AppState>);
  private runtime: NeuronalAppRuntime | null = null;

  start(root: HTMLElement, appInstance: NeuronalAppInstance): () => void {
    this.store.dispatch(
      NeuronalActions.modelStoreHydrated({ modelCollection: loadModelStoreFromStorage() }),
    );
    this.runtime = createNeuronalAppRuntime(this.store, root, appInstance);
    return () => {
      this.runtime?.destroy();
      this.runtime = null;
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
}
