import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShellHeaderComponent } from './app-shell-header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, AppShellHeaderComponent],
  template: `
    <div
      class="bg-base-100 text-base-content flex h-full min-h-dvh min-h-0 flex-col"
    >
      <app-shell-header />
      <div class="flex min-h-0 flex-1 flex-col">
        <router-outlet />
      </div>
    </div>
  `,
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {}
