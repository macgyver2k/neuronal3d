import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { selectRuntimeStatusPlain } from '../store/neuronal/neuronal.selectors';
import { NeuronalStatusRichPipe } from './neuronal-status-rich.pipe';

@Component({
  selector: 'app-workspace-status',
  standalone: true,
  imports: [NeuronalStatusRichPipe],
  template: `
    <div class="flex w-full min-w-0 flex-col gap-2">
      <span
        class="text-base-content/60 text-[0.62rem] font-semibold uppercase tracking-widest"
        >Aktueller Zustand</span
      >
      <span
        id="status"
        class="rounded-box border-base-300 bg-base-300/30 font-mono text-sm leading-relaxed tracking-tight text-base-content/80 block min-h-[2.5rem] w-full whitespace-pre-wrap break-words border p-3 shadow-inner"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        [innerHTML]="statusPlain() | neuronalStatusRich"
      ></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceStatusComponent {
  private readonly store = inject(Store<AppState>);

  protected readonly statusPlain = toSignal(
    this.store.select(selectRuntimeStatusPlain),
    { requireSync: true },
  );
}
