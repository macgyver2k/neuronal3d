import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, firstValueFrom, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { NeuronalAppInstance } from '../core/neuronal-app-instance';
import { NeuronalAppService } from '../core/neuronal-app.service';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import { EpochTrackListComponent } from '../workspace-ui/epoch-track-list.component';
import { InferPanelComponent } from '../workspace-ui/infer-panel.component';
import { NetworkViz3dShellComponent } from '../workspace-ui/network-viz3d-shell.component';
import { TrainingPanelComponent } from '../workspace-ui/training-panel.component';

@Component({
  selector: 'app-neuronal-workspace',
  standalone: true,
  imports: [
    NetworkViz3dShellComponent,
    TrainingPanelComponent,
    EpochTrackListComponent,
    InferPanelComponent,
  ],
  styleUrl: './neuronal-workspace.component.scss',
  template: `
    <div
      #appRoot
      id="app"
      class="bg-base-100 text-base-content flex min-h-0 flex-1 flex-col"
    >
      <div
        class="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)]"
      >
        <main
          class="grid min-h-0 min-w-0 grid-rows-[minmax(280px,1fr)] gap-3 max-xl:grid-rows-[minmax(260px,40vh)]"
        >
          <section
            class="card border-base-300 bg-base-200 overflow-hidden rounded-box border shadow-xl"
            aria-label="Netzwerk-Visualisierung"
          >
            <div class="card-body h-full min-h-0 p-0">
              <app-network-viz3d-shell />
            </div>
          </section>
        </main>

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
      </div>
    </div>
  `,
})
export class NeuronalWorkspaceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('appRoot', { read: ElementRef }) appRoot!: ElementRef<HTMLElement>;
  readonly sidebarTab = signal<'train' | 'infer'>('train');
  private readonly store = inject(Store<AppState>);
  private readonly neuronalApp = inject(NeuronalAppService);
  private readonly appInstance = inject(NeuronalAppInstance);
  private readonly router = inject(Router);
  private teardown: (() => void) | null = null;
  private bindGen = 0;

  ngAfterViewInit(): void {
    void this.bootstrapRuntime();
  }

  private modelWorkspacePathMatches(): boolean {
    const path = this.router.url.split('?')[0].split('#')[0];
    const segs = path.split('/').filter(Boolean);
    return segs[0] === 'model' && segs.length >= 2;
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

  private async waitForModelBarDom(gen: number): Promise<void> {
    const deadline = performance.now() + 3000;
    while (gen === this.bindGen && performance.now() < deadline) {
      if (document.getElementById('btnNewModel')) return;
      await new Promise<void>((r) =>
        requestAnimationFrame(() => {
          r();
        }),
      );
    }
  }

  private async bootstrapRuntime(): Promise<void> {
    const gen = ++this.bindGen;
    try {
      await this.waitForModelWorkspaceRouterPath(gen);
      if (gen !== this.bindGen) return;
      await this.waitForModelBarDom(gen);
      if (gen !== this.bindGen) return;
      const td = await this.neuronalApp.bindRuntime(
        this.appRoot.nativeElement,
        this.appInstance,
      );
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
    this.store.dispatch(NeuronalActions.uiDocumentPointerDown({ event: ev }));
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      this.store.dispatch(
        NeuronalActions.modelDropdownSetOpen({ open: false }),
      );
    }
  }
}
