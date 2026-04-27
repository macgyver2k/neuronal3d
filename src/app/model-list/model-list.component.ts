import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import type { AppState } from "../store/app.state";
import { NeuronalAppService } from "../core/neuronal-app.service";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";
import {
  selectModelCollection,
  selectModelStoreHydrated,
} from "../store/neuronal/neuronal.selectors";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

@Component({
  selector: "app-model-list",
  standalone: true,
  imports: [RouterLink],
  host: {
    class: "flex min-h-0 flex-1 flex-col",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <main class="flex min-h-0 flex-1 flex-col gap-4 p-4">
        @if (!ready()) {
          <div
            class="text-base-content/70 border-base-300/50 bg-base-200/50 rounded-box border border-dashed p-6 text-sm"
          >
            Wird geladen …
          </div>
        } @else if (!hydrated()) {
          <div
            class="text-base-content/70 border-base-300/50 bg-base-200/50 rounded-box border border-dashed p-6 text-sm"
          >
            Modelle werden vorbereitet …
          </div>
        } @else if (models().length === 0) {
          <div
            class="flex flex-col gap-4 rounded-box border border-dashed border-base-300/60 bg-base-200/40 p-6"
          >
            <p class="text-base-content/80 text-sm">
              Noch keine gespeicherten Modelle. Lege ein neues Netz an — es
              erscheint in der Liste; öffne es dort für die Arbeitsfläche.
            </p>
            <button
              type="button"
              class="btn btn-accent w-fit"
              (click)="createNew()"
            >
              Neues Modell anlegen
            </button>
          </div>
        } @else {
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 class="text-lg font-semibold tracking-tight">
              Gespeicherte Modelle
            </h1>
            <button
              type="button"
              class="btn btn-accent shrink-0"
              (click)="createNew()"
            >
              Neues Modell anlegen
            </button>
          </div>
          <ul class="flex flex-col gap-2" role="list">
            @for (m of models(); track m.id) {
              <li>
                <a
                  class="card border-base-300 bg-base-200 hover:border-primary/50 hover:bg-base-200/90 block rounded-box border shadow-sm transition-colors"
                  [routerLink]="['/model', m.id]"
                >
                  <div class="card-body gap-1 p-4">
                    <span class="card-title text-base">{{ m.name }}</span>
                    <div
                      class="text-base-content/65 flex flex-wrap gap-x-4 gap-y-1 text-xs"
                    >
                      <span
                        >Test:
                        {{ fmtPct(m.metrics.testAcc) }}</span
                      >
                      <span
                        >Fehlerrate:
                        {{ fmtPct(m.metrics.errorRate) }}</span
                      >
                    </div>
                    <div class="mt-2.5 flex flex-col gap-1.5">
                      <div
                        class="text-base-content/50 flex items-baseline justify-between gap-2 text-[0.65rem] font-medium uppercase tracking-wider"
                        aria-hidden="true"
                      >
                        <span>Trainierte Epochen</span>
                        <span class="text-base-content/70 tabular-nums normal-case">{{
                          m.metrics.epochsTrained
                        }}</span>
                      </div>
                      <div
                        class="bg-base-300/40 h-2.5 w-full overflow-hidden rounded-full"
                        role="img"
                        [attr.aria-label]="
                          'Epochen ' +
                          m.metrics.epochsTrained +
                          ' im Vergleich zur Liste'
                        "
                      >
                        <div
                          class="from-primary to-secondary bg-gradient-to-r h-full min-h-full min-w-0 rounded-full shadow-sm shadow-primary/25 transition-[width] duration-500 ease-out"
                          [style.width.%]="
                            epochBarRelativePct(m.metrics.epochsTrained)
                          "
                        ></div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            }
          </ul>
        }
      </main>
  `,
})
export class ModelListComponent {
  private readonly neuronalApp = inject(NeuronalAppService);
  private readonly store = inject(Store<AppState>);
  readonly ready = signal(false);
  readonly hydrated = toSignal(this.store.select(selectModelStoreHydrated), {
    initialValue: false,
  });
  readonly models = toSignal(
    this.store.select(selectModelCollection).pipe(map((c) => c.models)),
    { initialValue: [] },
  );

  constructor() {
    void this.neuronalApp.ensureStoreHydrated().then(() => {
      this.ready.set(true);
    });
  }

  fmtPct(v: number | null): string {
    if (v === null || !Number.isFinite(v)) return "—";
    return `${(v * 100).toFixed(2)} %`;
  }

  epochBarRelativePct(epochsTrained: number): number {
    const list = this.models();
    let max = 0;
    for (const e of list) {
      const n = e.metrics.epochsTrained;
      if (Number.isFinite(n) && n > max) max = n;
    }
    const denom = Math.max(1, max);
    const e = Number.isFinite(epochsTrained) ? Math.max(0, epochsTrained) : 0;
    return Math.min(100, (e / denom) * 100);
  }

  createNew(): void {
    this.store.dispatch(NeuronalActions.newModelFromListRequested());
  }
}
