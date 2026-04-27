import { DecimalPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { VizSettingsBlockComponent } from "./viz-settings-block.component";
import {
  ACTIVE_NEURON_MAX_SCALE_MUL_MAX,
  ACTIVE_NEURON_MAX_SCALE_MUL_MIN,
  ACTIVE_NEURON_MAX_SCALE_MUL_STEP,
  HIDDEN_LAYER_VIZ_SCALE_MAX,
  HIDDEN_LAYER_VIZ_SCALE_MIN,
  HIDDEN_LAYER_VIZ_SCALE_STEP,
} from "../../viz/network3d";
import type { AppState } from "../store/app.state";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";
import { model as selectVizModel } from "../store/neuronal/neuronal.selectors";

@Component({
  selector: "app-network-viz3d-shell",
  standalone: true,
  imports: [DecimalPipe, VizSettingsBlockComponent],
  template: `
    <div
      class="relative flex h-full min-h-0 w-full min-w-0 flex-row bg-base-300/25"
    >
      <aside
        class="flex max-h-full min-h-0 w-[min(100%,22rem)] max-w-[22rem] shrink-0 flex-col gap-3 overflow-y-auto overflow-x-hidden border-r border-base-300 bg-base-200/90 px-3 py-3 text-base-content shadow-md backdrop-blur-md"
        aria-label="3D-Netz Darstellung"
      >
        <app-viz-settings-block heading="Eingabelayer">
          <div class="min-w-0">
            <label
              for="inputLayerVizLayout"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
              >Darstellung</label
            >
            <select
              id="inputLayerVizLayout"
              class="select select-bordered select-sm w-full"
              [value]="model().inputLayerLayout"
              (change)="onInputLayout($event)"
            >
              <option value="pixels">28×28 Pixel</option>
              <option value="ring">Ring</option>
              <option value="grid">Raster</option>
              <option value="line">Linie</option>
              <option value="arc">Bogen, Richtung 1</option>
              <option value="arcAlt">Bogen, Richtung 2</option>
            </select>
          </div>
          <div class="min-w-0">
            <label
              for="inputLayerVizScale"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
              >Skala</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="inputLayerVizScale"
                type="range"
                [min]="scaleMin"
                [max]="scaleMax"
                [step]="scaleStep"
                [value]="model().inputLayerScale"
                (input)="onInputScale($event)"
                class="range range-primary flex-1 min-w-0"
              />
              <span class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                >{{ model().inputLayerScale | number : "1.0-2" }}</span
              >
            </div>
          </div>
        </app-viz-settings-block>
        <app-viz-settings-block heading="Zwischenlage 1">
          <div class="min-w-0">
            <label
              for="hiddenLayerVizLayout0"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
              >Darstellung</label
            >
            <select
              id="hiddenLayerVizLayout0"
              class="select select-bordered select-sm w-full"
              [value]="model().hiddenLayerLayouts[0]"
              (change)="onHiddenLayout(0, $event)"
            >
              <option value="ring">Ring</option>
              <option value="grid">Raster</option>
              <option value="line">Linie</option>
              <option value="arc">Bogen, Richtung 1</option>
              <option value="arcAlt">Bogen, Richtung 2</option>
            </select>
          </div>
          <div class="min-w-0">
            <label
              for="hiddenLayerVizScale0"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
              >Skala</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="hiddenLayerVizScale0"
                type="range"
                [min]="scaleMin"
                [max]="scaleMax"
                [step]="scaleStep"
                [value]="model().hiddenLayerScales[0]"
                (input)="onScale(0, $event)"
                class="range range-primary flex-1 min-w-0"
              />
              <span class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                >{{ model().hiddenLayerScales[0] | number : "1.0-2" }}</span
              >
            </div>
          </div>
        </app-viz-settings-block>
        <app-viz-settings-block heading="Zwischenlage 2">
          <div class="min-w-0">
            <label
              for="hiddenLayerVizLayout1"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
              >Darstellung</label
            >
            <select
              id="hiddenLayerVizLayout1"
              class="select select-bordered select-sm w-full"
              [value]="model().hiddenLayerLayouts[1]"
              (change)="onHiddenLayout(1, $event)"
            >
              <option value="ring">Ring</option>
              <option value="grid">Raster</option>
              <option value="line">Linie</option>
              <option value="arc">Bogen, Richtung 1</option>
              <option value="arcAlt">Bogen, Richtung 2</option>
            </select>
          </div>
          <div class="min-w-0">
            <label
              for="hiddenLayerVizScale1"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
              >Skala</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="hiddenLayerVizScale1"
                type="range"
                [min]="scaleMin"
                [max]="scaleMax"
                [step]="scaleStep"
                [value]="model().hiddenLayerScales[1]"
                (input)="onScale(1, $event)"
                class="range range-primary flex-1 min-w-0"
              />
              <span class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                >{{ model().hiddenLayerScales[1] | number : "1.0-2" }}</span
              >
            </div>
          </div>
        </app-viz-settings-block>
        <app-viz-settings-block heading="Aktivität">
          <div class="min-w-0">
            <label
              for="activeNeuronMaxMul"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
              >Max. Größe aktiver Neuronen</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="activeNeuronMaxMul"
                type="range"
                [min]="neuronMulMin"
                [max]="neuronMulMax"
                [step]="neuronMulStep"
                [value]="model().activeNeuronMaxScaleMul"
                (input)="onActiveNeuronMaxMul($event)"
                class="range range-primary flex-1 min-w-0"
              />
              <span class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                >{{ model().activeNeuronMaxScaleMul | number : "1.0-2" }}</span
              >
            </div>
          </div>
        </app-viz-settings-block>
      </aside>
      <div id="viz" class="relative min-h-0 min-w-0 flex-1"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkViz3dShellComponent {
  private readonly store = inject(Store<AppState>);
  protected readonly scaleMin = HIDDEN_LAYER_VIZ_SCALE_MIN;
  protected readonly scaleMax = HIDDEN_LAYER_VIZ_SCALE_MAX;
  protected readonly scaleStep = HIDDEN_LAYER_VIZ_SCALE_STEP;
  readonly model = toSignal(this.store.select(selectVizModel), { requireSync: true });
  protected readonly neuronMulMin = ACTIVE_NEURON_MAX_SCALE_MUL_MIN;
  protected readonly neuronMulMax = ACTIVE_NEURON_MAX_SCALE_MUL_MAX;
  protected readonly neuronMulStep = ACTIVE_NEURON_MAX_SCALE_MUL_STEP;

  onInputLayout(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLSelectElement)) return;
    this.store.dispatch(NeuronalActions.vizInputLayerLayoutChanged({ raw: t.value }));
  }

  onInputScale(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== "range") return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(NeuronalActions.vizInputLayerScaleChanged({ scale: v }));
  }

  onHiddenLayout(index: 0 | 1, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLSelectElement)) return;
    this.store.dispatch(NeuronalActions.vizHiddenLayerLayoutChanged({ index, raw: t.value }));
  }

  onScale(index: 0 | 1, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== "range") return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(NeuronalActions.vizHiddenLayerScaleChanged({ index, scale: v }));
  }

  onActiveNeuronMaxMul(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== "range") return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(NeuronalActions.vizActiveNeuronMaxScaleMulChanged({ mul: v }));
  }
}
