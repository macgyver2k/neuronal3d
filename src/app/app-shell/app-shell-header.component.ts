import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectActiveModelId,
  selectNeuronalModelBar,
  type ModelBarMenuItem,
} from '../store/neuronal/neuronal.selectors';
import { NeuronalModelBarComponent } from '../workspace-ui/neuronal-model-bar.component';
import { ThemeSwitcherComponent } from '../workspace-ui/theme-switcher.component';

@Component({
  selector: 'app-shell-header',
  standalone: true,
  imports: [RouterLink, ThemeSwitcherComponent, NeuronalModelBarComponent],
  template: `
    <header
      class="border-base-200 bg-base-100 flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2 shadow-sm sm:gap-3 sm:px-4"
    >
      <nav
        class="breadcrumbs min-w-0 flex w-full flex-col gap-2 text-sm sm:w-auto sm:flex-row sm:items-center sm:gap-3"
        aria-label="Brotkrümel"
      >
        <ul class="flex min-w-0 flex-wrap items-center gap-2">
          <li class="shrink-0">
            <a
              routerLink="/"
              class="link-hover link text-lg font-medium sm:text-2xl"
              >Modelle</a
            >
          </li>
          <li class="min-w-0 max-w-full flex-1 sm:max-w-md sm:flex-none">
            <select
              class="select select-bordered select-sm w-full min-w-0 max-w-full sm:select-md sm:min-w-40"
              aria-label="Aktives Modell"
              [disabled]="modelBar().dropdownDisabled"
              [value]="selectedModelIdValue()"
              (change)="onModelSelectChange($event)"
            >
              @switch (modelBar().menu.phase) {
                @case ('loading') {
                  <option disabled value="">Modelle werden geladen …</option>
                }
                @case ('empty') {
                  <option disabled value="">Keine Modelle vorhanden</option>
                }
                @case ('list') {
                  @if (!activeModelId()) {
                    <option disabled value="">Modell wählen</option>
                  }
                  @for (item of listMenuItems(); track item.id) {
                    <option [value]="item.id">
                      {{ item.name }} · Ep. {{ item.epochValue }} · Test
                      {{ item.accValue }}
                    </option>
                  }
                }
              }
            </select>
          </li>
        </ul>
        <div class="min-w-0 w-full sm:w-auto">
          <app-neuronal-model-bar />
        </div>
      </nav>
      <div
        class="flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto"
      >
        <app-theme-switcher />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellHeaderComponent {
  private readonly store = inject(Store<AppState>);

  readonly modelBar = toSignal(this.store.select(selectNeuronalModelBar), {
    requireSync: true,
  });

  readonly activeModelId = toSignal(this.store.select(selectActiveModelId), {
    initialValue: null,
  });

  readonly listMenuItems = computed((): ModelBarMenuItem[] => {
    const menu = this.modelBar().menu;

    return menu.phase === 'list' ? menu.items : [];
  });

  selectedModelIdValue(): string {
    return this.activeModelId() ?? '';
  }

  onModelSelectChange(event: Event): void {
    const element = event.target as HTMLSelectElement;
    const chosenModelId = element.value;
    if (!chosenModelId) return;

    this.store.dispatch(
      NeuronalActions.activeModelFromToolbarRequested({ id: chosenModelId }),
    );
  }
}
