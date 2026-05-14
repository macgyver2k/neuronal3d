import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  getMnistTrainSampleAt,
  getMnistTrainSampleCount,
} from '../../neuronal-app';
import { NeuronalAppService } from '../core/neuronal-app.service';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectInferPanelModel,
  selectInferUiControls,
  selectTrainingRunning,
} from '../store/neuronal/neuronal.selectors';
import { TrainInferThumbComponent } from './train-infer-thumb.component';

@Component({
  selector: 'app-infer-panel',
  standalone: true,
  imports: [TrainInferThumbComponent],
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
        >
          <span class="font-semibold">{{ inferPanelModel().headline }}</span>
          <span class="text-base-content/80">
            — {{ inferPanelModel().detail }}</span
          >
        </p>

        <div
          role="tablist"
          aria-label="Inferenz-Modus"
          class="tabs tabs-boxed bg-base-300/50 shrink-0 p-1"
        >
          <button
            type="button"
            class="tab flex-1 text-xs sm:text-sm"
            role="tab"
            id="tab-infer-draw"
            aria-controls="panel-infer-draw"
            [attr.aria-selected]="inferUiTab() === 'draw'"
            [class.tab-active]="inferUiTab() === 'draw'"
            (click)="inferUiTab.set('draw')"
          >
            Zeichnung &amp; Test
          </button>
          <button
            type="button"
            class="tab flex-1 text-xs sm:text-sm"
            role="tab"
            id="tab-infer-train"
            aria-controls="panel-infer-train"
            [attr.aria-selected]="inferUiTab() === 'train'"
            [class.tab-active]="inferUiTab() === 'train'"
            (click)="inferUiTab.set('train')"
          >
            Trainingsbilder
          </button>
        </div>

        @if (inferUiTab() === 'draw') {
          <div
            id="panel-infer-draw"
            role="tabpanel"
            aria-labelledby="tab-infer-draw"
            class="flex min-h-0 flex-1 flex-col gap-3"
          >
            <div class="flex flex-wrap gap-2">
              <button
                id="btnInferRandom"
                type="button"
                class="btn btn-outline btn-sm"
                [disabled]="inferCtrl().inferRandomDisabled"
                (click)="inferRandom()"
              >
                Zufälliges Testbild
              </button>
              <button
                id="btnTestCarousel"
                type="button"
                class="btn btn-outline btn-sm"
                [disabled]="inferCtrl().carouselDisabled"
                [attr.aria-pressed]="testCarouselOn()"
                (click)="toggleTestCarousel()"
              >
                {{
                  testCarouselOn()
                    ? 'Testbild-Karussell aus'
                    : 'Testbild-Karussell'
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
              #inferDrawCanvas
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
                  [disabled]="inferCtrl().inferDrawDisabled"
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
                {{
                  softBrushOn() ? 'Pinsel: weich (AA)' : 'Pinsel: Pixel-Raster'
                }}
              </button>
            </div>
          </div>
        } @else {
          <div
            id="panel-infer-train"
            role="tabpanel"
            aria-labelledby="tab-infer-train"
            class="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden"
          >
            <p class="text-base-content/60 shrink-0 text-xs leading-snug">
              Alle geladenen Trainingsbilder — Klick setzt das Bild für die
              Inferenz (wie das Zeichen-Canvas) und stoppt das Test-Karussell.
            </p>
            <div class="flex shrink-0 flex-col gap-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-base-content/70 text-[11px]">Sortierung</span>
                <button
                  type="button"
                  class="btn btn-outline btn-xs sm:btn-sm"
                  [attr.aria-pressed]="trainSortBy() === 'index'"
                  (click)="setTrainSortBy('index')"
                >
                  Nummer (Index)
                </button>
                <button
                  type="button"
                  class="btn btn-outline btn-xs sm:btn-sm"
                  [attr.aria-pressed]="trainSortBy() === 'digit'"
                  (click)="setTrainSortBy('digit')"
                >
                  Ziffer zuerst
                </button>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/70 text-[11px]"
                  >Ziffer-Filter</span
                >
                <div class="flex flex-wrap gap-1">
                  <button
                    type="button"
                    class="btn btn-xs flex-1 min-w-10 sm:btn-sm"
                    [class.btn-primary]="trainFilterDigit() === null"
                    [attr.aria-pressed]="trainFilterDigit() === null"
                    (click)="setTrainFilterDigit(null)"
                  >
                    Alle
                  </button>
                  @for (d of trainDigitKeys; track d) {
                    <button
                      type="button"
                      class="btn btn-xs flex-1 min-w-9 sm:btn-sm"
                      [class.btn-primary]="trainFilterDigit() === d"
                      [attr.aria-pressed]="trainFilterDigit() === d"
                      (click)="setTrainFilterDigit(d)"
                    >
                      {{ d }}
                    </button>
                  }
                </div>
              </div>
            </div>
            @if (trainCount() === 0) {
              <p class="text-warning shrink-0 text-xs">
                Noch keine Trainingsdaten geladen …
              </p>
            }
            <div
              #trainGalleryScroll
              class="border-base-300/60 min-h-0 flex-1 overflow-y-auto rounded-lg border"
              style="max-height: min(22rem, 50vh)"
              (scroll)="onTrainGalleryScroll($event)"
            >
              <div
                class="relative w-full"
                [style.height.px]="trainGalleryTotalHeight()"
              >
                @for (row of visibleTrainGalleryRows(); track row.row) {
                  <div
                    class="absolute box-border w-full px-1 py-0.5"
                    [style.top.px]="row.row * trainRowHeight"
                    [style.height.px]="trainRowHeight"
                  >
                    <app-train-infer-thumb
                      [index]="row.sampleIndex"
                      (pick)="selectTrainForInfer(row.sampleIndex)"
                    />
                  </div>
                }
              </div>
            </div>
            <p class="text-base-content/50 shrink-0 text-[11px] tabular-nums">
              @if (trainFilterDigit() === null) {
                {{ trainOrderedCount() }} / {{ trainCount() }} Bilder
              } @else {
                {{ trainOrderedCount() }} Bilder (Ziffer
                {{ trainFilterDigit() }}, von {{ trainCount() }} gesamt)
              }
            </p>
          </div>
        }
      </div>
    </article>
  `,
})
export class InferPanelComponent implements AfterViewInit, OnDestroy {
  private readonly store = inject(Store<AppState>);
  protected readonly neuronalApp = inject(NeuronalAppService);

  protected readonly inferCtrl = toSignal(
    this.store.select(selectInferUiControls),
    { requireSync: true },
  );
  protected readonly inferPanelModel = toSignal(
    this.store.select(selectInferPanelModel),
    { requireSync: true },
  );

  protected readonly inferUiTab = signal<'draw' | 'train'>('draw');
  protected readonly testCarouselOn = signal(false);
  protected readonly softBrushOn = signal(false);
  protected readonly brushSize = signal(4);

  /** Virtuelle Liste: Zeilenhöhe in px (Thumb + Rand). */
  readonly trainRowHeight = 58;
  /** Sichtbarer Bereich der Galerie (Scroll-Container), konservativ für Fensterberechnung. */
  private readonly trainGalleryViewportPx = 280;

  protected readonly trainCount = signal(0);
  protected readonly trainScrollTop = signal(0);

  /** `index` = Zeilenposition in der Liste, `digit` = primär nach Ziffer. */
  protected readonly trainSortBy = signal<'index' | 'digit'>('index');
  /** `null` = alle Ziffern; sonst nur Einträge mit diesem Label. */
  protected readonly trainFilterDigit = signal<number | null>(null);

  protected readonly trainDigitKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  /** Reihenfolge der Datensatz-Indizes für Galerie (Filter + Sortierung). */
  protected readonly trainOrderedIndices = signal<number[]>([]);

  private readonly trainGalleryScrollEl =
    viewChild<ElementRef<HTMLElement>>('trainGalleryScroll');

  readonly inferDrawCanvasEl =
    viewChild<ElementRef<HTMLCanvasElement>>('inferDrawCanvas');

  protected readonly trainOrderedCount = computed(
    () => this.trainOrderedIndices().length,
  );

  protected readonly trainGalleryTotalHeight = computed(
    () => this.trainOrderedCount() * this.trainRowHeight,
  );

  protected readonly visibleTrainGalleryRows = computed(() => {
    const order = this.trainOrderedIndices();
    const len = order.length;
    if (len <= 0) return [];
    const st = this.trainScrollTop();
    const vh = this.trainGalleryViewportPx;
    const row = this.trainRowHeight;
    const first = Math.max(0, Math.floor(st / row) - 2);
    const last = Math.min(len - 1, Math.ceil((st + vh) / row) + 2);
    const out: { row: number; sampleIndex: number }[] = [];
    for (let r = first; r <= last; r++) {
      out.push({ row: r, sampleIndex: order[r]! });
    }
    return out;
  });

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

    effect((onCleanup) => {
      if (this.inferUiTab() !== 'train') return;
      this.refreshTrainCount();
      if (this.trainCount() > 0) return;
      const id = window.setInterval(() => {
        this.refreshTrainCount();
      }, 500);
      onCleanup(() => window.clearInterval(id));
    });

    effect(() => {
      const n = this.trainCount();
      const sortBy = this.trainSortBy();
      const filter = this.trainFilterDigit();
      if (n <= 0) {
        this.trainOrderedIndices.set([]);
        return;
      }
      let base: number[];
      if (filter === null) {
        base = Array.from({ length: n }, (_, i) => i);
      } else {
        base = [];
        for (let i = 0; i < n; i++) {
          const s = getMnistTrainSampleAt(i);
          if (s && s.label === filter) base.push(i);
        }
      }
      if (sortBy === 'digit') {
        base.sort((a, b) => {
          const sa = getMnistTrainSampleAt(a);
          const sb = getMnistTrainSampleAt(b);
          const la = sa?.label ?? -1;
          const lb = sb?.label ?? -1;
          if (la !== lb) return la - lb;
          return a - b;
        });
      }
      this.trainOrderedIndices.set(base);
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

  protected onTrainGalleryScroll(ev: Event): void {
    const t = ev.target as HTMLElement;
    this.trainScrollTop.set(t.scrollTop);
  }

  private resetTrainGalleryScroll(): void {
    this.trainScrollTop.set(0);
    const el = this.trainGalleryScrollEl()?.nativeElement;
    if (el) el.scrollTop = 0;
  }

  protected setTrainSortBy(mode: 'index' | 'digit'): void {
    if (this.trainSortBy() === mode) return;
    this.trainSortBy.set(mode);
    this.resetTrainGalleryScroll();
  }

  protected setTrainFilterDigit(d: number | null): void {
    if (this.trainFilterDigit() === d) return;
    this.trainFilterDigit.set(d);
    this.resetTrainGalleryScroll();
  }

  private refreshTrainCount(): void {
    this.trainCount.set(getMnistTrainSampleCount());
  }

  selectTrainForInfer(idx: number): void {
    this.neuronalApp.stopTestImageCarousel();
    this.testCarouselOn.set(false);
    this.neuronalApp.onInferTrainSample(idx);
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
