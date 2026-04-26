import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import type { AppState } from "../store/app.state";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";
import { selectNeuronalModelBar } from "../store/neuronal/neuronal.selectors";

@Component({
  selector: "app-neuronal-model-bar",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="n3-modelbar flex min-w-0 flex-col gap-1.5">
      <span
        class="n3-modelbar-label font-semibold uppercase tracking-widest text-muted text-[0.62rem]"
        >Aktives Modell</span
      >
      <div class="n3-modelbar-row flex min-w-0 items-stretch gap-2">
        <div
          class="n3-modelbar-dropdown relative z-[60] min-w-0 flex-1"
          (pointerdown)="$event.stopPropagation()"
        >
          <button
            id="modelDropdownButton"
            type="button"
            class="n3-modelbar-button"
            aria-haspopup="listbox"
            [disabled]="model().dropdownDisabled"
            [attr.aria-expanded]="model().dropdownOpen ? 'true' : 'false'"
            (click)="dropdownToggle()"
          >
            @if (model().label; as label) {
              <span class="n3-modelbar-selected flex min-w-0 flex-col gap-0.5">
                <span class="n3-modelbar-selected-name">{{ label.name }}</span>
                <span class="n3-modelbar-selected-meta">{{ label.meta }}</span>
              </span>
            }
          </button>
          <div
            id="modelDropdownMenu"
            class="n3-modelbar-menu"
            role="listbox"
            [hidden]="!model().dropdownOpen"
          >
            @if (model().menu; as menu) {
              @switch (menu.phase) {
                @case ("loading") {
                  <div class="n3-modelbar-empty">Modelle werden geladen …</div>
                }
                @case ("empty") {
                  <div class="n3-modelbar-empty">Keine Modelle vorhanden</div>
                }
                @case ("list") {
                  @for (item of menu.items; track item.id) {
                    <button
                      type="button"
                      class="n3-modelbar-option"
                      [class.n3-modelbar-option--active]="item.active"
                      role="option"
                      [attr.aria-selected]="item.active ? 'true' : 'false'"
                      [disabled]="menu.trainingRunning"
                      (click)="pickActiveModel(item.id)"
                    >
                      <span class="n3-modelbar-option-name">{{ item.name }}</span>
                      <span class="n3-modelbar-option-meta flex flex-wrap gap-1">
                        <span class="n3-modelbar-chip">{{ item.chipEp }}</span>
                        <span class="n3-modelbar-chip">{{ item.chipAcc }}</span>
                        <span class="n3-modelbar-chip">{{ item.chipErr }}</span>
                      </span>
                    </button>
                  }
                }
              }
            }
          </div>
        </div>
        <button
          id="btnNewModel"
          type="button"
          class="n3-btn n3-btn--accent shrink-0"
          (click)="newModel()"
        >
          Neues Modell starten
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
  readonly model = toSignal(this.store.select(selectNeuronalModelBar), { requireSync: true });

  dropdownToggle(): void {
    this.store.dispatch(NeuronalActions.uiModelDropdownToggleRequested());
  }

  newModel(): void {
    this.store.dispatch(NeuronalActions.newModelFromToolbarRequested());
  }

  pickActiveModel(id: string): void {
    this.store.dispatch(NeuronalActions.activeModelFromToolbarRequested({ id }));
  }

  modelSelectChanged(): void {
    this.store.dispatch(NeuronalActions.uiModelSelectChanged());
  }
}
