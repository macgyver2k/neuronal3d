import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import type { PersistedEpochRow } from '../core/model.types';
import type { AppState } from '../store/app.state';
import { selectEpochTrackView } from '../store/neuronal/neuronal.selectors';

@Component({
  selector: 'app-epoch-track-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="n3-panel n3-panel--epochs">
      <div class="n3-epochwrap">
        <p class="n3-epochhead">Epochs ({{ view().epochsTotal }})</p>
        <ul class="n3-epochlist">
          @if (view().rows.length === 0) {
            <li class="epochEmpty">Noch kein Training</li>
          } @else {
            @for (r of view().rows; track rowKey(r)) {
              <li class="epochRow">
                <span class="epochRun">R{{ runLabel(r.run) }}</span>
                <span class="epochNum">Ep {{ r.epoch + 1 }}</span>
                <span class="epochLoss">loss {{ r.loss.toFixed(4) }}</span>
                <span class="epochAcc"
                  >{{ (r.trainAcc * 100).toFixed(2) }}%</span
                >
                <span class="epochMeta"
                  >{{ timeLabel(r.savedAt) }} | Dauer
                  {{ durationLabel(r.runElapsedMs) }}</span
                >
              </li>
            }
          }
        </ul>
      </div>
    </article>
  `,
})
export class EpochTrackListComponent {
  private readonly store = inject(Store<AppState>);
  readonly view = toSignal(this.store.select(selectEpochTrackView), {
    requireSync: true,
  });

  rowKey(r: PersistedEpochRow): string {
    return `${r.run}-${r.epoch}-${r.savedAt}`;
  }

  runLabel(n: number): string {
    return String(n).padStart(2, '0');
  }

  timeLabel(iso: string): string {
    const d = new Date(iso);
    if (!Number.isFinite(d.getTime())) return '--:--:--';
    return d.toLocaleTimeString('de-DE', { hour12: false });
  }

  durationLabel(ms: number): string {
    const totalSec = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0)
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}
