import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-workspace-brand',
  standalone: true,
  template: `
    <div class="flex items-center gap-3 min-w-0">
      <div
        class="from-primary to-secondary h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br shadow-lg shadow-primary/30"
        aria-hidden="true"
      ></div>
      <div class="flex min-w-0 flex-col gap-0.5">
        <span class="text-base-content text-[1.05rem] font-bold tracking-tight">{{
          title()
        }}</span>
        <span class="text-base-content/60 text-[0.7rem] tracking-wide">{{
          subtitle()
        }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceBrandComponent {
  readonly title = input<string>('Neuronal3D');
  readonly subtitle = input<string>('MNIST · MLP 784 → 64 → 32 → 10');
}
