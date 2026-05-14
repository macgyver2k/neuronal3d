import {
  AfterViewInit,
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom, take } from 'rxjs';
import type { NeuronalRuntimeMountSurfaces } from '../../neuronal-app';
import { NeuronalAppInstance } from '../core/neuronal-app-instance';
import { NeuronalAppService } from '../core/neuronal-app.service';
import { routerUrlIsModelWorkspace } from '../core/router-model-url';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectShellHeaderActiveModel,
  selectVizImmersiveUi,
} from '../store/neuronal/neuronal.selectors';
import { EpochTrackListComponent } from '../workspace-ui/epoch-track-list.component';
import { InferPanelComponent } from '../workspace-ui/infer-panel.component';
import { NetworkViz3dShellComponent } from '../workspace-ui/network-viz3d-shell.component';
import { NeuronalModelBarComponent } from '../workspace-ui/neuronal-model-bar.component';
import { TrainingPanelComponent } from '../workspace-ui/training-panel.component';
import { WorkspaceBrandComponent } from '../workspace-ui/workspace-brand.component';
import { WorkspaceStatusComponent } from '../workspace-ui/workspace-status.component';

@Component({
  selector: 'app-neuronal-workspace',
  standalone: true,
  imports: [
    RouterLink,
    WorkspaceBrandComponent,
    NeuronalModelBarComponent,
    WorkspaceStatusComponent,
    NetworkViz3dShellComponent,
    TrainingPanelComponent,
    EpochTrackListComponent,
    InferPanelComponent,
  ],
  styleUrl: './neuronal-workspace.component.scss',
  template: `
    <div
      id="app"
      class="bg-base-100 text-base-content flex min-h-0 flex-1 flex-col"
    >
      @if (!immersive()) {
        <div
          role="region"
          aria-label="Modell-Arbeitsbereich"
          class="border-base-300/60 bg-base-100 flex shrink-0 flex-col gap-2 border-b px-3 py-2 sm:px-4 sm:py-3"
        >
          <div class="flex flex-col gap-2">
            <app-workspace-status />
          </div>
        </div>
      }
      <div [class]="workspaceContentGridClass()">
        <main
          class="grid h-full min-h-0 min-w-0 grid-rows-[minmax(0,1fr)] gap-3"
        >
          <section
            class="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
            [class.card]="!immersive()"
            [class.border-base-300]="!immersive()"
            [class.bg-base-200]="!immersive()"
            [class.rounded-box]="!immersive()"
            [class.border]="!immersive()"
            [class.shadow-xl]="!immersive()"
            aria-label="Netzwerk-Visualisierung"
          >
            <div class="card-body flex min-h-0 flex-1 flex-col p-0">
              <app-network-viz3d-shell />
            </div>
          </section>
        </main>

        @if (!immersive()) {
          <section
            class="flex min-h-0 flex-col gap-2"
            aria-label="Training, Epochen und Inferenz"
          >
            <div
              role="tablist"
              aria-label="Seitenleiste"
              class="tabs tabs-boxed bg-base-200/80 p-1"
            >
              <button
                type="button"
                class="tab flex-1"
                role="tab"
                id="tab-sidebar-train"
                aria-controls="panel-sidebar-train"
                [attr.aria-selected]="sidebarTab() === 'train'"
                [class.tab-active]="sidebarTab() === 'train'"
                (click)="sidebarTab.set('train')"
              >
                Training
              </button>
              <button
                type="button"
                class="tab flex-1"
                role="tab"
                id="tab-sidebar-infer"
                aria-controls="panel-sidebar-infer"
                [attr.aria-selected]="sidebarTab() === 'infer'"
                [class.tab-active]="sidebarTab() === 'infer'"
                (click)="sidebarTab.set('infer')"
              >
                Inferenz
              </button>
            </div>
            <div class="relative flex min-h-0 flex-1 flex-col">
              <div
                id="panel-sidebar-train"
                class="grid min-h-0 flex-1 grid-rows-[auto_minmax(12rem,1fr)] gap-3 overflow-hidden"
                role="tabpanel"
                aria-labelledby="tab-sidebar-train"
                [hidden]="sidebarTab() !== 'train'"
              >
                <app-training-panel />
                <app-epoch-track-list />
              </div>
              <div
                id="panel-sidebar-infer"
                class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
                role="tabpanel"
                aria-labelledby="tab-sidebar-infer"
                [hidden]="sidebarTab() !== 'infer'"
              >
                <app-infer-panel />
              </div>
            </div>
          </section>
        }
      </div>
    </div>
  `,
})
export class NeuronalWorkspaceComponent implements AfterViewInit, OnDestroy {
  @ViewChild(NetworkViz3dShellComponent)
  private vizShell?: NetworkViz3dShellComponent;
  @ViewChild(InferPanelComponent) private inferPanel?: InferPanelComponent;

  readonly sidebarTab = signal<'train' | 'infer'>('train');
  private readonly store = inject(Store<AppState>);
  readonly headerModel = toSignal(
    this.store.select(selectShellHeaderActiveModel),
    {
      initialValue: null,
    },
  );
  readonly immersive = toSignal(this.store.select(selectVizImmersiveUi), {
    initialValue: false,
  });
  readonly workspaceContentGridClass = computed(() =>
    this.immersive()
      ? 'grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)]'
      : 'grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] xl:grid-rows-[minmax(0,1fr)]',
  );
  private readonly neuronalApp = inject(NeuronalAppService);
  private readonly appInstance = inject(NeuronalAppInstance);
  private readonly router = inject(Router);
  private teardown: (() => void) | null = null;
  private bindGen = 0;

  ngAfterViewInit(): void {
    void this.bootstrapRuntime();
  }

  private modelWorkspacePathMatches(): boolean {
    return routerUrlIsModelWorkspace(this.router.url);
  }

  private async waitForModelWorkspaceRouterPath(gen: number): Promise<void> {
    if (gen !== this.bindGen) return;
    if (this.modelWorkspacePathMatches()) return;
    await firstValueFrom(
      this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        filter(() => gen === this.bindGen && this.modelWorkspacePathMatches()),
        take(1),
      ),
    );
  }

  private async waitForRuntimeSurfaces(
    gen: number,
  ): Promise<NeuronalRuntimeMountSurfaces> {
    const deadline = performance.now() + 8000;
    for (;;) {
      if (gen !== this.bindGen) throw new Error('aborted');
      const viz = this.vizShell?.vizMountEl()?.nativeElement;
      const canvas = this.inferPanel?.inferDrawCanvasEl()?.nativeElement;
      if (viz && canvas) return { vizMount: viz, inferDrawCanvas: canvas };
      if (performance.now() > deadline) throw new Error('surfaces-timeout');
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
    }
  }

  private async bootstrapRuntime(): Promise<void> {
    const gen = ++this.bindGen;
    try {
      await this.waitForModelWorkspaceRouterPath(gen);
      if (gen !== this.bindGen) return;
      const surfaces = await this.waitForRuntimeSurfaces(gen);
      if (gen !== this.bindGen) return;
      const td = await this.neuronalApp.bindRuntime(surfaces, this.appInstance);
      if (gen !== this.bindGen) {
        td();
        return;
      }
      this.teardown = td;
    } catch {
      void this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.bindGen++;
    this.teardown?.();
    this.teardown = null;
  }

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(ev: PointerEvent): void {
    const t = ev.target;
    if (!(t instanceof Node)) return;
    const btn = document.getElementById('modelDropdownButton');
    const menu = document.getElementById('modelDropdownMenu');
    if (btn && menu && (t === btn || btn.contains(t) || menu.contains(t))) {
      return;
    }
    this.store.dispatch(NeuronalActions.modelDropdownSetOpen({ open: false }));
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      if (this.immersive()) {
        this.store.dispatch(NeuronalActions.uiVizImmersiveToggled());
        return;
      }
      this.store.dispatch(
        NeuronalActions.modelDropdownSetOpen({ open: false }),
      );
    }
  }
}
