import { Component } from "@angular/core";
import { NeuronalWorkspaceComponent } from "./neuronal-workspace/neuronal-workspace.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NeuronalWorkspaceComponent],
  template: `<app-neuronal-workspace />`,
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
