import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import type { AppState } from "./store/app.state";
import { NeuronalActions } from "./store/neuronal/neuronal.actions";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor() {
    inject(Store<AppState>).dispatch(NeuronalActions.modelStoreLoadRequested());
  }
}
