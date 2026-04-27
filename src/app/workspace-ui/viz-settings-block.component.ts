import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-viz-settings-block",
  standalone: true,
  template: `
    <section
      class="min-w-0 rounded-lg border border-border/80 bg-background/40 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      <h3
        class="mb-2.5 w-full border-b border-border/60 pb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted"
      >
        {{ heading() }}
      </h3>
      <div class="flex flex-col gap-3">
        <ng-content />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VizSettingsBlockComponent {
  readonly heading = input.required<string>();
}
