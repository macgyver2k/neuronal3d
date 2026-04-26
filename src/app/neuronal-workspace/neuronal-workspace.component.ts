import { AfterViewInit, Component, OnDestroy, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { bootstrapNeuronalApp } from "../../neuronal-app";
import type { AppState } from "../store/app.state";

@Component({
  selector: "app-neuronal-workspace",
  standalone: true,
  imports: [],
  templateUrl: "./neuronal-workspace.component.html",
  styleUrl: "./neuronal-workspace.component.scss",
})
export class NeuronalWorkspaceComponent implements AfterViewInit, OnDestroy {
  private readonly store = inject(Store<AppState>);
  private teardown: (() => void) | null = null;

  ngAfterViewInit(): void {
    this.teardown = bootstrapNeuronalApp(this.store);
  }

  ngOnDestroy(): void {
    this.teardown?.();
    this.teardown = null;
  }
}
