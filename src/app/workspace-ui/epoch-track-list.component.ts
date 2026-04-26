import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import type { PersistedEpochRow } from '../core/model.types';
import type { AppState } from '../store/app.state';
import { selectEpochTrackView } from '../store/neuronal/neuronal.selectors';

type AxisTick = { pos: number; label: string };

type EpochChartModel = {
  vbW: number;
  vbH: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  plotW: number;
  plotH: number;
  pointsLoss: string;
  pointsAcc: string;
  leftTicks: AxisTick[];
  rightTicks: AxisTick[];
  bottomTicks: AxisTick[];
  gridYs: number[];
};

@Component({
  selector: 'app-epoch-track-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="n3-panel n3-panel--epochs">
      <div
        class="n3-sidebartabs n3-epochtabs"
        role="tablist"
        aria-label="Epoch-Ansicht"
      >
        <button
          type="button"
          class="n3-sidebartab"
          role="tab"
          id="tab-epoch-list"
          aria-controls="panel-epoch-list"
          [attr.aria-selected]="epochTab() === 'list'"
          [class.n3-sidebartab--active]="epochTab() === 'list'"
          (click)="epochTab.set('list')"
        >
          Liste
        </button>
        <button
          type="button"
          class="n3-sidebartab"
          role="tab"
          id="tab-epoch-chart"
          aria-controls="panel-epoch-chart"
          [attr.aria-selected]="epochTab() === 'chart'"
          [class.n3-sidebartab--active]="epochTab() === 'chart'"
          (click)="epochTab.set('chart')"
        >
          Diagramm
        </button>
      </div>
      <div class="n3-epochwrap">
        <p class="n3-epochhead">Epochs ({{ view().epochsTotal }})</p>
        @if (epochTab() === 'list') {
          <div
            id="panel-epoch-list"
            role="tabpanel"
            aria-labelledby="tab-epoch-list"
            class="n3-epochtabpanel"
          >
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
        } @else {
          <div
            id="panel-epoch-chart"
            role="tabpanel"
            aria-labelledby="tab-epoch-chart"
            class="n3-epochtabpanel n3-epochchart"
          >
            @if (chartModel(); as cm) {
              <svg
                class="n3-epochchart-svg"
                [attr.viewBox]="'0 0 ' + cm.vbW + ' ' + cm.vbH"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="n3-epoch-plot-clip">
                    <rect
                      [attr.x]="cm.marginLeft"
                      [attr.y]="cm.marginTop"
                      [attr.width]="cm.plotW"
                      [attr.height]="cm.plotH"
                    />
                  </clipPath>
                </defs>
                <rect
                  x="0"
                  y="0"
                  [attr.width]="cm.vbW"
                  [attr.height]="cm.vbH"
                  class="n3-epochchart-bg"
                />
                @for (gy of cm.gridYs; track gy) {
                  <line
                    class="n3-epochchart-grid"
                    [attr.x1]="cm.marginLeft"
                    [attr.y1]="gy"
                    [attr.x2]="cm.marginLeft + cm.plotW"
                    [attr.y2]="gy"
                  />
                }
                <line
                  class="n3-epochchart-axis"
                  [attr.x1]="cm.marginLeft"
                  [attr.y1]="cm.marginTop"
                  [attr.x2]="cm.marginLeft"
                  [attr.y2]="cm.marginTop + cm.plotH"
                />
                <line
                  class="n3-epochchart-axis"
                  [attr.x1]="cm.marginLeft + cm.plotW"
                  [attr.y1]="cm.marginTop"
                  [attr.x2]="cm.marginLeft + cm.plotW"
                  [attr.y2]="cm.marginTop + cm.plotH"
                />
                <line
                  class="n3-epochchart-axis"
                  [attr.x1]="cm.marginLeft"
                  [attr.y1]="cm.marginTop + cm.plotH"
                  [attr.x2]="cm.marginLeft + cm.plotW"
                  [attr.y2]="cm.marginTop + cm.plotH"
                />
                <g clip-path="url(#n3-epoch-plot-clip)">
                  <polyline
                    class="n3-epochchart-line n3-epochchart-line--loss"
                    [attr.points]="cm.pointsLoss"
                    fill="none"
                  />
                  <polyline
                    class="n3-epochchart-line n3-epochchart-line--acc"
                    [attr.points]="cm.pointsAcc"
                    fill="none"
                  />
                </g>
                @for (t of cm.leftTicks; track t.pos + t.label) {
                  <text
                    class="n3-epochchart-ticklabel n3-epochchart-ticklabel--loss"
                    [attr.x]="cm.marginLeft - 4"
                    [attr.y]="t.pos"
                    text-anchor="end"
                    dominant-baseline="middle"
                  >
                    {{ t.label }}
                  </text>
                }
                @for (t of cm.rightTicks; track t.pos + t.label) {
                  <text
                    class="n3-epochchart-ticklabel n3-epochchart-ticklabel--acc"
                    [attr.x]="cm.marginLeft + cm.plotW + 4"
                    [attr.y]="t.pos"
                    text-anchor="start"
                    dominant-baseline="middle"
                  >
                    {{ t.label }}
                  </text>
                }
                @for (t of cm.bottomTicks; track t.pos + t.label) {
                  <text
                    class="n3-epochchart-ticklabel n3-epochchart-ticklabel--x"
                    [attr.x]="t.pos"
                    [attr.y]="cm.marginTop + cm.plotH + 14"
                    text-anchor="middle"
                    dominant-baseline="middle"
                  >
                    {{ t.label }}
                  </text>
                }
                <text
                  class="n3-epochchart-axis-title"
                  [attr.x]="cm.marginLeft + cm.plotW / 2"
                  [attr.y]="cm.vbH - 2"
                  text-anchor="middle"
                  dominant-baseline="auto"
                >
                  Schritt
                </text>
              </svg>
              <div class="n3-epochchart-legend" aria-hidden="true">
                <span class="n3-epochchart-legend-item n3-epochchart-legend-item--loss"
                  >Loss</span
                >
                <span class="n3-epochchart-legend-item n3-epochchart-legend-item--acc"
                  >Train-Acc</span
                >
              </div>
            } @else {
              <p class="epochEmpty">Noch kein Training</p>
            }
          </div>
        }
      </div>
    </article>
  `,
})
export class EpochTrackListComponent {
  private readonly store = inject(Store<AppState>);
  readonly view = toSignal(this.store.select(selectEpochTrackView), {
    requireSync: true,
  });
  readonly epochTab = signal<'list' | 'chart'>('list');
  readonly chartModel = computed((): EpochChartModel | null => {
    const rows = this.view().rows;
    if (rows.length === 0) return null;
    const chrono = [...rows].reverse();
    const n = chrono.length;
    const marginLeft = 34;
    const marginRight = 38;
    const marginTop = 10;
    const marginBottom = 26;
    const plotW = 148;
    const plotH = 70;
    const vbW = marginLeft + plotW + marginRight;
    const vbH = marginTop + plotH + marginBottom;
    const losses = chrono.map((r) => r.loss);
    const minL = Math.min(...losses);
    const maxL = Math.max(...losses);
    const rangeL = Math.max(maxL - minL, 1e-9);
    const xAt = (i: number) =>
      marginLeft + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
    const yLoss = (loss: number) =>
      marginTop + (1 - (loss - minL) / rangeL) * plotH;
    const yAcc = (acc: number) => marginTop + (1 - acc) * plotH;
    const pointsLoss = chrono
      .map((r, i) => `${xAt(i)},${yLoss(r.loss)}`)
      .join(' ');
    const pointsAcc = chrono
      .map((r, i) => `${xAt(i)},${yAcc(r.trainAcc)}`)
      .join(' ');
    const fmtLoss = (v: number) => {
      const a = Math.abs(v);
      if (a >= 100) return v.toFixed(0);
      if (a >= 10) return v.toFixed(1);
      if (a >= 1) return v.toFixed(2);
      return v.toFixed(3);
    };
    const yBottom = marginTop + plotH;
    const yMid = marginTop + plotH / 2;
    const lossFlat = maxL - minL < 1e-8;
    const leftTicks: AxisTick[] = lossFlat
      ? [{ pos: yMid, label: fmtLoss(minL) }]
      : [
          { pos: marginTop, label: fmtLoss(minL) },
          { pos: yMid, label: fmtLoss((minL + maxL) / 2) },
          { pos: yBottom, label: fmtLoss(maxL) },
        ];
    const rightTicks: AxisTick[] = [
      { pos: marginTop, label: '100%' },
      { pos: yMid, label: '50%' },
      { pos: yBottom, label: '0%' },
    ];
    const gridYs = lossFlat ? [yMid] : [marginTop, yMid, yBottom];
    const bottomTicks: AxisTick[] = [];
    if (n === 1) {
      bottomTicks.push({ pos: xAt(0), label: '1' });
    } else {
      bottomTicks.push({ pos: xAt(0), label: '1' });
      if (n > 2) {
        const mid = Math.floor((n - 1) / 2);
        if (mid !== 0 && mid !== n - 1) {
          bottomTicks.push({ pos: xAt(mid), label: String(mid + 1) });
        }
      }
      bottomTicks.push({ pos: xAt(n - 1), label: String(n) });
    }
    return {
      vbW,
      vbH,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      plotW,
      plotH,
      pointsLoss,
      pointsAcc,
      leftTicks,
      rightTicks,
      bottomTicks,
      gridYs,
    };
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
