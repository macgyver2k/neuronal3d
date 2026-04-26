import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-workspace-status",
  standalone: true,
  template: `
    <div class="n3-statusbar">
      <span class="n3-statusbar-kicker">Aktueller Zustand</span>
      <span
        id="status"
        class="n3-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      ></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceStatusComponent {}
