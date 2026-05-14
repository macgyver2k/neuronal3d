import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-viz-settings-block',
  standalone: true,
  template: `
    <div
      class="collapse collapse-arrow min-w-0 border border-base-300 bg-base-100"
    >
      @if (defaultExpanded()) {
        <input type="checkbox" class="min-h-0" checked />
      } @else {
        <input type="checkbox" class="min-h-0" />
      }
      <div
        class="collapse-title py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
      >
        {{ heading() }}
      </div>
      <div class="collapse-content text-sm">
        <div class="flex min-w-0 flex-col gap-3 pb-1 pt-0">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VizSettingsBlockComponent {
  readonly heading = input.required<string>();

  /** Start offen; ohne [checked]-Binding, damit Klicks nicht von CD überschrieben werden. */
  readonly defaultExpanded = input(true);
}
