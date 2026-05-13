import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  DAISYUI_DEFAULT_THEME,
  DAISYUI_THEME_STORAGE_KEY,
  DAISYUI_THEMES,
  isDaisyUiThemeName,
} from './daisy-theme';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  template: `
    <label class="flex flex-wrap items-center justify-end gap-2">
      <span
        class="text-[0.65rem] font-semibold uppercase tracking-widest opacity-70"
        >Theme</span
      >
      <select
        class="select select-bordered select-sm max-w-[11.5rem] text-sm"
        [value]="currentTheme()"
        (change)="onThemePick($event)"
      >
        @for (t of themes; track t) {
          <option [value]="t">{{ t }}</option>
        }
      </select>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly store = inject(Store<AppState>);
  readonly themes = DAISYUI_THEMES;
  readonly currentTheme = signal(
    this.doc.documentElement.getAttribute('data-theme') ??
      DAISYUI_DEFAULT_THEME,
  );

  onThemePick(ev: Event): void {
    const el = ev.target as HTMLSelectElement;
    const next = el.value;
    if (!isDaisyUiThemeName(next)) return;
    this.doc.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(DAISYUI_THEME_STORAGE_KEY, next);
    } catch {
      void 0;
    }
    this.currentTheme.set(next);
    this.store.dispatch(
      NeuronalActions.daisyUiAppThemeChanged({ theme: next }),
    );
  }
}
