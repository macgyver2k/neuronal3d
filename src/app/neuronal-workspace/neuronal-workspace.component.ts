import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { bootstrapNeuronalApp } from "../../neuronal-app";

@Component({
  selector: "app-neuronal-workspace",
  standalone: true,
  imports: [],
  templateUrl: "./neuronal-workspace.component.html",
  styleUrl: "./neuronal-workspace.component.scss",
})
export class NeuronalWorkspaceComponent implements AfterViewInit, OnDestroy {
  private teardown: (() => void) | null = null;

  ngAfterViewInit(): void {
    this.teardown = bootstrapNeuronalApp();
  }

  ngOnDestroy(): void {
    this.teardown?.();
    this.teardown = null;
  }
}
