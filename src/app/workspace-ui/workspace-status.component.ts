import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-workspace-status",
  standalone: true,
  template: `
    <span
      id="status"
      class="n3-status text-muted border-border bg-surface-2/80"
      role="status"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceStatusComponent {}
