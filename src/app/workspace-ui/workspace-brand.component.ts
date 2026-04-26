import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-workspace-brand",
  standalone: true,
  template: `
    <div class="n3-brand flex items-center gap-3 min-w-0">
      <div class="n3-logo shrink-0" aria-hidden="true"></div>
      <div class="n3-brandtext flex min-w-0 flex-col gap-0.5">
        <span class="n3-brandtitle text-foreground text-[1.05rem] font-bold tracking-tight">{{ title() }}</span>
        <span class="n3-brandsub text-muted text-[0.7rem] tracking-wide">{{ subtitle() }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceBrandComponent {
  readonly title = input<string>("Neuronal3D");
  readonly subtitle = input<string>("MNIST · MLP 784 → 64 → 32 → 10");
}
