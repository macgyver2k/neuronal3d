import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';

@Component({
  selector: 'app-neuronal-model-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-w-0 flex-col gap-1.5">
      <span
        class="text-base-content/60 text-[0.62rem] font-semibold uppercase tracking-widest"
        >Aktionen</span
      >
      <div class="flex min-w-0 flex-wrap items-stretch gap-2">
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

  newModel(): void {
    this.store.dispatch(NeuronalActions.newModelFromToolbarRequested());
  }

  modelSelectChanged(): void {
    this.store.dispatch(NeuronalActions.uiModelSelectChanged());
  }

  exportJson(): void {
    this.store.dispatch(NeuronalActions.uiExportBundleRequested());
  }
}
