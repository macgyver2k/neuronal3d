import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-network-viz3d-shell",
  standalone: true,
  template: `
    <div
      class="n3-vizshell relative h-full min-h-0 w-full bg-background bg-[radial-gradient(100%_80%_at_50%_0%,rgba(54,211,166,0.09),transparent_58%)]"
    >
      <div id="viz" class="absolute inset-0 min-h-0"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkViz3dShellComponent {}
