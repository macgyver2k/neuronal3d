import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { NeuronalAppService } from '../core/neuronal-app.service';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import { selectTrainingRunning } from '../store/neuronal/neuronal.selectors';

@Component({
  selector: 'app-infer-panel',
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
          <p class="text-base-content/60 text-xs">
            Direkt mit dem aktiven Modell testen
          </p>
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
          <button
            id="btnTestCarousel"
            type="button"
            class="btn btn-outline btn-sm"
            disabled
            [attr.aria-pressed]="testCarouselOn()"
            (click)="toggleTestCarousel()"
          >
            {{
              testCarouselOn() ? 'Testbild-Karussell aus' : 'Testbild-Karussell'
            }}
          </button>
        </div>
        <div
          class="flex w-full max-w-[min(280px,100%)] flex-col gap-1 self-center"
        >
          <div
            class="text-base-content/70 flex items-center justify-between gap-2 text-xs"
          >
            <span class="text-base-content font-medium">Pinselgröße</span>
            <span class="tabular-nums"
              >Stift {{ penStampCells() }}×{{ penStampCells() }}</span
            >
          </div>
          <input
            type="range"
            class="range range-primary range-sm w-full"
            [min]="neuronalApp.inferDrawBrushSizeUi.min"
            [max]="neuronalApp.inferDrawBrushSizeUi.max"
            step="1"
            [value]="brushSize()"
            [attr.aria-valuetext]="'Pinselstufe ' + brushSize()"
            (input)="onBrushSizeInput($event)"
          />
        </div>
        <canvas
          id="drawCanvas"
          width="28"
          height="28"
          class="border-base-300/60 h-auto w-[min(280px,100%)] touch-none self-center rounded-xl border bg-black shadow-xl [image-rendering:pixelated]"
          (contextmenu)="$event.preventDefault()"
          (pointerdown)="drawDown($event)"
          (pointermove)="drawMove($event)"
          (pointerup)="drawUp()"
          (pointercancel)="drawCancel()"
          (pointerleave)="drawLeave()"
        ></canvas>
        <div
          id="drawActions"
          class="flex w-full max-w-[290px] flex-col gap-2 self-center"
        >
          <div class="grid grid-cols-2 gap-2">
            <button
              id="btnInferDraw"
              type="button"
              class="btn btn-outline btn-sm"
              disabled
              (click)="inferDraw()"
            >
              Zeichnung auswerten
            </button>
            <button
              id="btnClearDraw"
              type="button"
              class="btn btn-ghost btn-sm"
              (click)="clearDraw()"
            >
              Leeren
            </button>
          </div>
          <button
            type="button"
            class="btn btn-ghost btn-sm w-full"
            [attr.aria-pressed]="softBrushOn()"
            (click)="toggleSoftBrush()"
          >
            {{ softBrushOn() ? 'Pinsel: weich (AA)' : 'Pinsel: Pixel-Raster' }}
          </button>
        </div>
      </div>
    </article>
  `,
})
export class InferPanelComponent implements AfterViewInit, OnDestroy {
  private readonly store = inject(Store<AppState>);
  protected readonly neuronalApp = inject(NeuronalAppService);

  protected readonly testCarouselOn = signal(false);
  protected readonly softBrushOn = signal(false);
  protected readonly brushSize = signal(4);

  protected readonly penStampCells = computed(() => {
    const cheb = Math.min(6, Math.max(0, this.brushSize() - 1));
    return 2 * cheb + 1;
  });

  private readonly trainingRunning = toSignal(
    this.store.select(selectTrainingRunning),
    { initialValue: false },
  );

  constructor() {
    effect(() => {
      if (this.trainingRunning()) {
        this.neuronalApp.stopTestImageCarousel();
        this.testCarouselOn.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.softBrushOn.set(this.neuronalApp.getInferDrawBrushMode() === 'soft');
      this.brushSize.set(this.neuronalApp.getInferDrawBrushSize());
    });
  }
  ngOnDestroy(): void {
    this.neuronalApp.stopTestImageCarousel();
    this.testCarouselOn.set(false);
  }

  inferRandom(): void {
    this.store.dispatch(NeuronalActions.uiInferRandomRequested());
  }

  toggleTestCarousel(): void {
    const next = this.neuronalApp.toggleTestImageCarouselState(
      this.testCarouselOn(),
    );
    if (next === null) return;
    this.testCarouselOn.set(next);
  }

  toggleSoftBrush(): void {
    const next = !this.softBrushOn();
    this.neuronalApp.setInferDrawBrushMode(next ? 'soft' : 'pixels');
    this.softBrushOn.set(next);
  }

  onBrushSizeInput(ev: Event): void {
    const raw = Number((ev.target as HTMLInputElement).value);
    this.brushSize.set(raw);
    this.neuronalApp.setInferDrawBrushSize(raw);
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
