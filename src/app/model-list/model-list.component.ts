import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import type { AppState } from "../store/app.state";
import { NeuronalAppService } from "../core/neuronal-app.service";
import {
  selectModelCollection,
  selectModelStoreHydrated,
} from "../store/neuronal/neuronal.selectors";
import { ThemeSwitcherComponent } from "../workspace-ui/theme-switcher.component";
import { WorkspaceBrandComponent } from "../workspace-ui/workspace-brand.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

@Component({
  selector: "app-model-list",
  standalone: true,
  imports: [RouterLink, WorkspaceBrandComponent, ThemeSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-base-100 text-base-content flex min-h-full flex-col"
    >
      <header
        class="border-base-300 bg-base-200/80 flex shrink-0 flex-col gap-3 border-b px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
      >
        <app-workspace-brand
          [subtitle]="'Modelle verwalten und öffnen'"
        />
        <div class="flex items-center gap-2">
          <app-theme-switcher />
        </div>
      </header>
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
              Noch keine gespeicherten Modelle. Lege ein neues Netz an —
              danach öffnet sich die Arbeitsfläche mit 3D-Ansicht und Training.
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
                      <span>{{ m.metrics.epochsTrained }} Epochen</span>
                      <span
                        >Test:
                        {{ fmtPct(m.metrics.testAcc) }}</span
                      >
                      <span
                        >Fehlerrate:
                        {{ fmtPct(m.metrics.errorRate) }}</span
                      >
                    </div>
                  </div>
                </a>
              </li>
            }
          </ul>
        }
      </main>
    </div>
  `,
})
export class ModelListComponent {
  private readonly neuronalApp = inject(NeuronalAppService);
  private readonly router = inject(Router);
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

  createNew(): void {
    void this.router.navigate(["/model", "new"]);
  }
}
