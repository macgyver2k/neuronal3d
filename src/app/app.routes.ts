import { Routes } from "@angular/router";
import { ModelListComponent } from "./model-list/model-list.component";
import { NeuronalWorkspaceComponent } from "./neuronal-workspace/neuronal-workspace.component";

export const routes: Routes = [
  { path: "", component: ModelListComponent },
  { path: "model/:modelId", component: NeuronalWorkspaceComponent },
  { path: "**", redirectTo: "" },
];
