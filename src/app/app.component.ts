import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { bootstrapNeuronalApp } from "../neuronal-app";

@Component({
  selector: "app-root",
  imports: [],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private teardown: (() => void) | null = null;

  ngAfterViewInit(): void {
    this.teardown = bootstrapNeuronalApp();
  }

  ngOnDestroy(): void {
    this.teardown?.();
    this.teardown = null;
  }
}
