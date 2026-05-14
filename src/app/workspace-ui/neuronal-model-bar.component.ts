import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import { selectNewModelDisabled } from '../store/neuronal/neuronal.selectors';

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
          [disabled]="newModelDisabled()"
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
    </div>
  `,
})
export class NeuronalModelBarComponent {
  private readonly store = inject(Store<AppState>);

  protected readonly newModelDisabled = toSignal(
    this.store.select(selectNewModelDisabled),
    { requireSync: true },
  );

  newModel(): void {
    this.store.dispatch(NeuronalActions.newModelFromToolbarRequested());
  }

  exportJson(): void {
    this.store.dispatch(NeuronalActions.uiExportBundleRequested());
  }
}
