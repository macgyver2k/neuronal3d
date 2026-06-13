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
      <div class="flex min-w-0 flex-wrap items-stretch gap-2">
        <button
          id="btnNewModel"
          type="button"
          class="btn btn-accent btn-sm min-w-0 flex-1 whitespace-normal sm:btn-md sm:flex-none sm:whitespace-nowrap"
          [disabled]="newModelDisabled()"
          (click)="newModel()"
        >
          <span class="sm:hidden">Neues Modell</span>
          <span class="hidden sm:inline">Neues Modell starten</span>
        </button>
        <button
          id="btnExportJson"
          type="button"
          class="btn btn-outline btn-sm min-w-0 flex-1 sm:btn-md sm:flex-none"
          (click)="exportJson()"
        >
          <span class="sm:hidden">Export</span>
          <span class="hidden sm:inline">JSON exportieren</span>
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
