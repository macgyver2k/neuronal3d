import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { NeuronalAppService } from "../core/neuronal-app.service";
import type { AppState } from "../store/app.state";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";

@Component({
  selector: "app-infer-panel",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article id="dockInfer" class="n3-panel n3-panel--infer">
      <div class="n3-panelhead shrink-0">
        <h2 class="n3-paneltitle text-foreground">Inferenz</h2>
        <p class="n3-panelsub text-muted">Direkt mit dem aktiven Modell testen</p>
      </div>
      <p id="inferModelContext" class="n3-inferctx" aria-live="polite"></p>
      <div class="n3-row flex flex-wrap gap-2">
        <button
          id="btnInferRandom"
          type="button"
          class="n3-btn border-border"
          disabled
          (click)="inferRandom()"
        >
          Zufälliges Testbild
        </button>
      </div>
      <canvas
        id="drawCanvas"
        width="320"
        height="320"
        class="aspect-square max-w-[290px] w-full touch-none self-center rounded-xl border border-border-soft bg-black shadow-xl"
        (contextmenu)="$event.preventDefault()"
        (pointerdown)="drawDown($event)"
        (pointermove)="drawMove($event)"
        (pointerup)="drawUp()"
        (pointercancel)="drawCancel()"
        (pointerleave)="drawLeave()"
      ></canvas>
      <div
        id="drawActions"
        class="n3-drawactions grid w-full max-w-[290px] grid-cols-2 gap-2 self-center"
      >
        <button id="btnInferDraw" type="button" class="n3-btn border-border" disabled (click)="inferDraw()">
          Zeichnung auswerten
        </button>
        <button id="btnClearDraw" type="button" class="n3-btn n3-btn--ghost" (click)="clearDraw()">
          Leeren
        </button>
      </div>
    </article>
  `,
})
export class InferPanelComponent {
  private readonly store = inject(Store<AppState>);
  private readonly neuronalApp = inject(NeuronalAppService);

  inferRandom(): void {
    this.store.dispatch(NeuronalActions.uiInferRandomRequested());
  }

  inferDraw(): void {
    this.store.dispatch(NeuronalActions.uiInferDrawRequested());
  }

  clearDraw(): void {
    this.store.dispatch(NeuronalActions.uiClearDrawRequested());
  }

  drawDown(e: PointerEvent): void {
    this.neuronalApp.onDrawPointerDown(e);
  }

  drawMove(e: PointerEvent): void {
    this.neuronalApp.onDrawPointerMove(e);
  }

  drawUp(): void {
    this.neuronalApp.onDrawPointerUp();
  }

  drawCancel(): void {
    this.neuronalApp.onDrawPointerCancel();
  }

  drawLeave(): void {
    this.neuronalApp.onDrawPointerLeave();
  }
}
