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
    <article
      id="dockInfer"
      class="card border-base-300 bg-base-200 rounded-box flex min-h-0 flex-1 flex-col gap-3 border shadow-xl"
    >
      <div class="card-body min-h-0 flex flex-1 flex-col gap-3 p-5">
        <div class="shrink-0">
          <h2 class="card-title text-base">Inferenz</h2>
          <p class="text-base-content/60 text-xs">Direkt mit dem aktiven Modell testen</p>
        </div>
        <p
          id="inferModelContext"
          class="text-info rounded-btn border-info/30 bg-info/10 border p-2 text-xs leading-snug"
          aria-live="polite"
        ></p>
        <div class="flex flex-wrap gap-2">
          <button
            id="btnInferRandom"
            type="button"
            class="btn btn-outline btn-sm"
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
          class="border-base-300/60 aspect-square max-w-[290px] w-full touch-none self-center rounded-xl border bg-black shadow-xl"
          (contextmenu)="$event.preventDefault()"
          (pointerdown)="drawDown($event)"
          (pointermove)="drawMove($event)"
          (pointerup)="drawUp()"
          (pointercancel)="drawCancel()"
          (pointerleave)="drawLeave()"
        ></canvas>
        <div
          id="drawActions"
          class="grid w-full max-w-[290px] grid-cols-2 gap-2 self-center"
        >
          <button id="btnInferDraw" type="button" class="btn btn-outline btn-sm" disabled (click)="inferDraw()">
            Zeichnung auswerten
          </button>
          <button id="btnClearDraw" type="button" class="btn btn-ghost btn-sm" (click)="clearDraw()">
            Leeren
          </button>
        </div>
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
