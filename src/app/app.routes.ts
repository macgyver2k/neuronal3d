import { inject } from "@angular/core";
import { Routes, type ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import type { AppState } from "./store/app.state";
import { NeuronalActions } from "./store/neuronal/neuronal.actions";
import { AppShellComponent } from "./app-shell/app-shell.component";
import { ModelListComponent } from "./model-list/model-list.component";
import { NeuronalWorkspaceComponent } from "./neuronal-workspace/neuronal-workspace.component";

export const routes: Routes = [
  {
    path: "",
    component: AppShellComponent,
    children: [
      { path: "", pathMatch: "full", component: ModelListComponent },
      {
        path: "model/:modelId",
        canActivate: [
          (route: ActivatedRouteSnapshot) => {
            inject(Store<AppState>).dispatch(
              NeuronalActions.modelRouteParamReceived({
                segment: route.params["modelId"] ?? "",
              }),
            );
            return true;
          },
        ],
        component: NeuronalWorkspaceComponent,
      },
    ],
  },
  { path: "**", redirectTo: "" },
];
