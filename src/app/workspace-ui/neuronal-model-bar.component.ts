import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectNeuronalModelBar,
  selectTrainingRunning,
} from '../store/neuronal/neuronal.selectors';

@Component({
  selector: 'app-neuronal-model-bar',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-w-0 flex-col gap-1.5">
      <span
        class="text-base-content/60 text-[0.62rem] font-semibold uppercase tracking-widest"
        >Aktives Modell</span
      >
      <div class="flex min-w-0 flex-wrap items-stretch gap-2">
        <div
          class="dropdown z-[60] w-full min-w-0 flex-1"
          [class.dropdown-open]="model().dropdownOpen"
          (pointerdown)="$event.stopPropagation()"
        >
          <button
            id="modelDropdownButton"
            type="button"
            class="btn btn-outline h-auto min-h-12 w-full flex-nowrap justify-start gap-2 px-3 text-left font-normal normal-case"
            aria-haspopup="listbox"
            [disabled]="model().dropdownDisabled"
            [attr.aria-expanded]="model().dropdownOpen ? 'true' : 'false'"
            (click)="dropdownToggle()"
          >
            @if (model().label; as label) {
              <span class="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                <span class="truncate text-sm font-semibold">{{ label.name }}</span>
                <span class="text-base-content/60 truncate text-xs">{{
                  label.meta
                }}</span>
              </span>
            }
            <span class="text-base-content/50 shrink-0 text-xs">{{
              model().dropdownOpen ? '▴' : '▾'
            }}</span>
          </button>
          <div
            id="modelDropdownMenu"
            class="dropdown-content bg-base-200 border-base-300 mt-2 max-h-[17rem] w-full overflow-y-auto rounded-box border p-2 shadow-2xl"
            role="listbox"
            tabindex="0"
          >
            @if (model().menu; as menu) {
              @switch (menu.phase) {
                @case ('loading') {
                  <div
                    class="text-base-content/70 rounded-btn border-base-300/50 bg-base-300/20 border border-dashed p-3 text-xs"
                  >
                    Modelle werden geladen …
                  </div>
                }
                @case ('empty') {
                  <div
                    class="text-base-content/70 rounded-btn border-base-300/50 bg-base-300/20 border border-dashed p-3 text-xs"
                  >
                    Keine Modelle vorhanden
                  </div>
                }
                @case ('list') {
                  <div class="flex flex-col gap-1">
                    @for (item of menu.items; track item.id) {
                      <button
                        type="button"
                        class="btn btn-ghost relative h-auto min-h-0 w-full flex-col items-stretch gap-2 border border-transparent py-2.5 pr-9 text-left font-normal"
                        [ngClass]="{
                          'border-primary bg-primary/20 ring-1 ring-primary/40': item.active,
                        }"
                        role="option"
                        [attr.aria-selected]="item.active ? 'true' : 'false'"
                        [disabled]="menu.trainingRunning"
                        (click)="pickActiveModel(item.id)"
                      >
                        <span class="block w-full truncate text-sm font-semibold">{{
                          item.name
                        }}</span>
                        <div class="flex w-full flex-wrap gap-1">
                          <div
                            class="bg-base-100/50 border-base-300/80 flex min-w-[4.5rem] flex-1 basis-[5rem] flex-col rounded-lg border px-1.5 py-1"
                          >
                            <span
                              class="text-base-content/50 text-[0.54rem] font-medium uppercase tracking-wider"
                              >Epoch</span
                            >
                            <span
                              class="text-success text-sm font-semibold tabular-nums"
                              >{{ item.epochValue }}</span
                            >
                          </div>
                          <div
                            class="bg-base-100/50 border-base-300/80 flex min-w-[4.5rem] flex-1 basis-[5rem] flex-col rounded-lg border px-1.5 py-1"
                          >
                            <span
                              class="text-base-content/50 text-[0.54rem] font-medium uppercase tracking-wider"
                              >Test-Genauigkeit</span
                            >
                            <span
                              class="text-info text-sm font-semibold tabular-nums"
                              >{{ item.accValue }}</span
                            >
                          </div>
                          <div
                            class="bg-base-100/50 border-base-300/80 flex min-w-[4.5rem] flex-1 basis-[5rem] flex-col rounded-lg border px-1.5 py-1"
                          >
                            <span
                              class="text-base-content/50 text-[0.54rem] font-medium uppercase tracking-wider"
                              >Fehlerrate</span
                            >
                            <span
                              class="text-warning text-sm font-semibold tabular-nums"
                              >{{ item.errValue }}</span
                            >
                          </div>
                        </div>
                        @if (item.active) {
                          <span
                            class="text-primary absolute right-2.5 top-1/2 -translate-y-1/2 text-sm"
                            >✓</span
                          >
                        }
                      </button>
                    }
                  </div>
                }
              }
            }
          </div>
        </div>
        <button
          id="btnNewModel"
          type="button"
          class="btn btn-accent shrink-0"
          (click)="newModel()"
        >
          Neues Modell starten
        </button>
        <button
          id="btnExportJson"
          type="button"
          class="btn btn-outline shrink-0"
          (click)="exportJson()"
        >
          JSON exportieren
        </button>
        <button
          id="btnResetToPretrained"
          type="button"
          class="btn btn-ghost shrink-0"
          [disabled]="trainingRunning()"
          (click)="resetToPretrained()"
        >
          Auf Vorgaben zurücksetzen
        </button>
      </div>
      <select
        id="modelSelect"
        class="sr-only"
        tabindex="-1"
        aria-hidden="true"
        (change)="modelSelectChanged()"
      ></select>
    </div>
  `,
})
export class NeuronalModelBarComponent {
  private readonly store = inject(Store<AppState>);
  readonly model = toSignal(this.store.select(selectNeuronalModelBar), {
    requireSync: true,
  });
  readonly trainingRunning = toSignal(
    this.store.select(selectTrainingRunning),
    { initialValue: false },
  );

  dropdownToggle(): void {
    this.store.dispatch(NeuronalActions.uiModelDropdownToggleRequested());
  }

  newModel(): void {
    this.store.dispatch(NeuronalActions.newModelFromToolbarRequested());
  }

  pickActiveModel(id: string): void {
    this.store.dispatch(
      NeuronalActions.activeModelFromToolbarRequested({ id }),
    );
  }

  modelSelectChanged(): void {
    this.store.dispatch(NeuronalActions.uiModelSelectChanged());
  }

  exportJson(): void {
    this.store.dispatch(NeuronalActions.uiExportBundleRequested());
  }

  resetToPretrained(): void {
    this.store.dispatch(NeuronalActions.uiResetToPretrainedFilesRequested());
  }
}
