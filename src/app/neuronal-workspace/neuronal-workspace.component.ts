import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { NeuronalAppInstance } from "../core/neuronal-app-instance";
import { NeuronalAppService } from "../core/neuronal-app.service";
import type { AppState } from "../store/app.state";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";
import { EpochTrackListComponent } from "../workspace-ui/epoch-track-list.component";
import { InferPanelComponent } from "../workspace-ui/infer-panel.component";
import { NeuronalModelBarComponent } from "../workspace-ui/neuronal-model-bar.component";
import { NetworkViz3dShellComponent } from "../workspace-ui/network-viz3d-shell.component";
import { TrainingPanelComponent } from "../workspace-ui/training-panel.component";
import { WorkspaceBrandComponent } from "../workspace-ui/workspace-brand.component";
import { WorkspaceStatusComponent } from "../workspace-ui/workspace-status.component";

@Component({
  selector: "app-neuronal-workspace",
  standalone: true,
  imports: [
    WorkspaceBrandComponent,
    NeuronalModelBarComponent,
    WorkspaceStatusComponent,
    NetworkViz3dShellComponent,
    TrainingPanelComponent,
    EpochTrackListComponent,
    InferPanelComponent,
  ],
  styleUrl: "./neuronal-workspace.component.scss",
  template: `
    <div #appRoot id="app" class="n3-root">
      <header class="n3-topbar">
        <app-workspace-brand />
        <div class="n3-topcontrols">
          <app-neuronal-model-bar />
          <app-workspace-status />
        </div>
      </header>

      <div class="n3-layout">
        <main class="n3-main">
          <section class="n3-stagecard" aria-label="Netzwerk-Visualisierung">
            <app-network-viz3d-shell />
          </section>
        </main>

        <section class="n3-sidebar" aria-label="Training, Epochen und Inferenz">
          <div class="n3-sidebartabs" role="tablist" aria-label="Seitenleiste">
            <button
              type="button"
              class="n3-sidebartab"
              role="tab"
              id="tab-sidebar-train"
              aria-controls="panel-sidebar-train"
              [attr.aria-selected]="sidebarTab() === 'train'"
              [class.n3-sidebartab--active]="sidebarTab() === 'train'"
              (click)="sidebarTab.set('train')"
            >
              Training
            </button>
            <button
              type="button"
              class="n3-sidebartab"
              role="tab"
              id="tab-sidebar-infer"
              aria-controls="panel-sidebar-infer"
              [attr.aria-selected]="sidebarTab() === 'infer'"
              [class.n3-sidebartab--active]="sidebarTab() === 'infer'"
              (click)="sidebarTab.set('infer')"
            >
              Inferenz
            </button>
          </div>
          <div class="n3-sidebarbody">
            <div
              id="panel-sidebar-train"
              class="n3-sidebarpanel n3-sidebarpanel--train"
              role="tabpanel"
              aria-labelledby="tab-sidebar-train"
              [hidden]="sidebarTab() !== 'train'"
            >
              <app-training-panel />
              <app-epoch-track-list />
            </div>
            <div
              id="panel-sidebar-infer"
              class="n3-sidebarpanel n3-sidebarpanel--infer"
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
  @ViewChild("appRoot", { read: ElementRef }) appRoot!: ElementRef<HTMLElement>;
  readonly sidebarTab = signal<"train" | "infer">("train");
  private readonly store = inject(Store<AppState>);
  private readonly neuronalApp = inject(NeuronalAppService);
  private readonly appInstance = inject(NeuronalAppInstance);
  private teardown: (() => void) | null = null;

  ngAfterViewInit(): void {
    this.teardown = this.neuronalApp.start(this.appRoot.nativeElement, this.appInstance);
  }

  ngOnDestroy(): void {
    this.teardown?.();
    this.teardown = null;
  }

  @HostListener("document:pointerdown", ["$event"])
  onDocumentPointerDown(ev: PointerEvent): void {
    this.store.dispatch(NeuronalActions.uiDocumentPointerDown({ event: ev }));
  }

  @HostListener("document:keydown", ["$event"])
  onDocumentKeydown(ev: KeyboardEvent): void {
    if (ev.key === "Escape") {
      this.store.dispatch(NeuronalActions.modelDropdownSetOpen({ open: false }));
    }
  }
}
