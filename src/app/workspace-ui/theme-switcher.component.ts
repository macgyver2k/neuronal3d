import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  DAISYUI_THEMES,
  isDaisyUiThemeName,
  readCurrentDaisyThemeFromDocument,
  writeDaisyUiAppThemeToDocument,
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store<AppState>);
  readonly themes = DAISYUI_THEMES;
  readonly currentTheme = signal(readCurrentDaisyThemeFromDocument(this.doc));

  constructor() {
    const obs = new MutationObserver(() => {
      this.currentTheme.set(readCurrentDaisyThemeFromDocument(this.doc));
    });
    obs.observe(this.doc.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    this.destroyRef.onDestroy(() => obs.disconnect());
  }

  onThemePick(ev: Event): void {
    const el = ev.target as HTMLSelectElement;
    const next = el.value;
    if (!isDaisyUiThemeName(next)) return;
    writeDaisyUiAppThemeToDocument(this.doc, next);
    this.store.dispatch(
      NeuronalActions.daisyUiAppThemeChanged({ theme: next }),
    );
  }
}
