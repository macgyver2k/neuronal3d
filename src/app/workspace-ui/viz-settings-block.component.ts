import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-viz-settings-block",
  standalone: true,
  template: `
    <section
      class="border-base-300/80 bg-base-200/50 min-w-0 rounded-lg border p-2.5 shadow-inner"
    >
      <h3
        class="border-base-300/60 text-base-content/60 mb-2.5 w-full border-b pb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
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
