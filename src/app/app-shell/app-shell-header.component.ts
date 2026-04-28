import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NeuronalModelDropdownComponent } from "../workspace-ui/neuronal-model-dropdown.component";
import { ThemeSwitcherComponent } from "../workspace-ui/theme-switcher.component";
import { WorkspaceBrandComponent } from "../workspace-ui/workspace-brand.component";

@Component({
  selector: "app-shell-header",
  standalone: true,
  imports: [
    RouterLink,
    WorkspaceBrandComponent,
    NeuronalModelDropdownComponent,
    ThemeSwitcherComponent,
  ],
  template: `
    <header
      class="border-base-300 bg-base-200/80 flex shrink-0 flex-row flex-wrap items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur-md"
    >
      <div
        class="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2"
      >
        <a
          routerLink="/"
          class="link link-hover shrink-0 self-center text-sm font-medium"
          >Modelle</a
        >
        <app-workspace-brand
          class="min-w-0 shrink-0"
          [subtitle]="'Modelle verwalten und öffnen'"
        />
        <app-neuronal-model-dropdown
          class="min-w-0 w-full max-w-xl sm:w-auto sm:flex-1 sm:min-w-48"
          [showCaption]="null"
        />
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <app-theme-switcher />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellHeaderComponent {}
