import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map, startWith } from "rxjs";
import type { AppState } from "../store/app.state";
import { NeuronalModelBarComponent } from "../workspace-ui/neuronal-model-bar.component";
import { ThemeSwitcherComponent } from "../workspace-ui/theme-switcher.component";
import { WorkspaceBrandComponent } from "../workspace-ui/workspace-brand.component";
import { WorkspaceStatusComponent } from "../workspace-ui/workspace-status.component";
import { routerUrlIsModelWorkspace } from "../core/router-model-url";
import { selectShellHeaderActiveModel } from "../store/neuronal/neuronal.selectors";

@Component({
  selector: "app-shell-header",
  standalone: true,
  imports: [
    RouterLink,
    WorkspaceBrandComponent,
    ThemeSwitcherComponent,
    NeuronalModelBarComponent,
    WorkspaceStatusComponent,
  ],
  template: `
    @if (modelWorkspace()) {
      <header
        class="border-base-300 bg-base-200/80 flex shrink-0 flex-col gap-3 border-b px-4 py-3 backdrop-blur-md sm:flex-row sm:items-start sm:justify-between"
      >
        <div class="flex min-w-0 flex-wrap items-center gap-3">
          <a
            routerLink="/"
            class="link link-hover shrink-0 text-sm font-medium"
            >Modelle</a
          >
          @if (headerModel(); as hm) {
            <app-workspace-brand [title]="hm.title" [subtitle]="hm.subtitle" />
          } @else {
            <app-workspace-brand />
          }
        </div>
        <div
          class="flex w-full min-w-0 max-w-5xl flex-1 flex-col gap-2 sm:ml-auto"
        >
          <div class="flex w-full justify-end">
            <app-theme-switcher />
          </div>
          <app-neuronal-model-bar />
          <app-workspace-status />
        </div>
      </header>
    } @else {
      <header
        class="border-base-300 bg-base-200/80 flex shrink-0 flex-col gap-3 border-b px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
      >
        <app-workspace-brand
          [subtitle]="'Modelle verwalten und öffnen'"
        />
        <div class="flex items-center gap-2">
          <app-theme-switcher />
        </div>
      </header>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellHeaderComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);
  readonly headerModel = toSignal(this.store.select(selectShellHeaderActiveModel), {
    initialValue: null,
  });
  readonly modelWorkspace = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => routerUrlIsModelWorkspace(this.router.url)),
    ),
    { initialValue: routerUrlIsModelWorkspace(this.router.url) },
  );
}
