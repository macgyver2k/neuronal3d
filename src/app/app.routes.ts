import { Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { ModelListComponent } from './model-list/model-list.component';
import { modelWorkspaceCanActivate } from './model-workspace.guard';
import { NeuronalWorkspaceComponent } from './neuronal-workspace/neuronal-workspace.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', pathMatch: 'full', component: ModelListComponent },
      { path: 'model/new', pathMatch: 'full', redirectTo: '' },
      {
        path: 'model/:modelId',
        canActivate: [modelWorkspaceCanActivate],
        component: NeuronalWorkspaceComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
