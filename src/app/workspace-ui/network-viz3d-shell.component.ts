import { DecimalPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { NeuronalAppService } from "../core/neuronal-app.service";
import { VizSettingsBlockComponent } from "./viz-settings-block.component";
import {
  ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT,
  ACTIVE_NEURON_MAX_SCALE_MUL_MAX,
  ACTIVE_NEURON_MAX_SCALE_MUL_MIN,
  ACTIVE_NEURON_MAX_SCALE_MUL_STEP,
  HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
  HIDDEN_LAYER_VIZ_SCALE_MAX,
  HIDDEN_LAYER_VIZ_SCALE_MIN,
  HIDDEN_LAYER_VIZ_SCALE_STEP,
  INPUT_LAYER_PIXELS_LAYOUT,
  type InputLayerVizLayout,
} from "../../viz/network3d";

@Component({
  selector: "app-network-viz3d-shell",
  standalone: true,
  imports: [DecimalPipe, VizSettingsBlockComponent],
  template: `
    <div
      class="n3-vizshell relative flex h-full min-h-0 w-full min-w-0 flex-row bg-background bg-[radial-gradient(100%_80%_at_50%_0%,rgba(54,211,166,0.09),transparent_58%)]"
    >
      <aside
        class="n3-vizpanel flex max-h-full min-h-0 w-[min(100%,22rem)] max-w-[22rem] shrink-0 flex-col gap-3 overflow-y-auto overflow-x-hidden border-r border-border bg-background/90 px-3 py-3 text-foreground shadow-sm backdrop-blur-md"
        aria-label="3D-Netz Darstellung"
      >
        <app-viz-settings-block heading="Eingabelayer">
          <div class="min-w-0">
            <label
              for="inputLayerVizLayout"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-foreground"
              >Darstellung</label
            >
            <select
              id="inputLayerVizLayout"
              class="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm outline-none ring-primary/25 focus-visible:ring-2"
              [value]="inputLayout()"
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
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-foreground"
              >Skala</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="inputLayerVizScale"
                type="range"
                [min]="scaleMin"
                [max]="scaleMax"
                [step]="scaleStep"
                [value]="inputScale()"
                (input)="onInputScale($event)"
                class="h-2 min-w-0 flex-1 cursor-pointer accent-primary"
              />
              <span class="w-8 shrink-0 text-right text-[0.65rem] tabular-nums text-muted"
                >{{ inputScale() | number : "1.0-2" }}</span
              >
            </div>
          </div>
        </app-viz-settings-block>
        <app-viz-settings-block heading="Zwischenlage 1">
          <div class="min-w-0">
            <label
              for="hiddenLayerVizLayout0"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-foreground"
              >Darstellung</label
            >
            <select
              id="hiddenLayerVizLayout0"
              class="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm outline-none ring-primary/25 focus-visible:ring-2"
              (change)="onHiddenLayout(0, $event)"
            >
              <option value="ring" selected>Ring</option>
              <option value="grid">Raster</option>
              <option value="line">Linie</option>
              <option value="arc">Bogen, Richtung 1</option>
              <option value="arcAlt">Bogen, Richtung 2</option>
            </select>
          </div>
          <div class="min-w-0">
            <label
              for="hiddenLayerVizScale0"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-foreground"
              >Skala</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="hiddenLayerVizScale0"
                type="range"
                [min]="scaleMin"
                [max]="scaleMax"
                [step]="scaleStep"
                [value]="scale0()"
                (input)="onScale(0, $event)"
                class="h-2 min-w-0 flex-1 cursor-pointer accent-primary"
              />
              <span class="w-8 shrink-0 text-right text-[0.65rem] tabular-nums text-muted"
                >{{ scale0() | number : "1.0-2" }}</span
              >
            </div>
          </div>
        </app-viz-settings-block>
        <app-viz-settings-block heading="Zwischenlage 2">
          <div class="min-w-0">
            <label
              for="hiddenLayerVizLayout1"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-foreground"
              >Darstellung</label
            >
            <select
              id="hiddenLayerVizLayout1"
              class="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm outline-none ring-primary/25 focus-visible:ring-2"
              (change)="onHiddenLayout(1, $event)"
            >
              <option value="ring" selected>Ring</option>
              <option value="grid">Raster</option>
              <option value="line">Linie</option>
              <option value="arc">Bogen, Richtung 1</option>
              <option value="arcAlt">Bogen, Richtung 2</option>
            </select>
          </div>
          <div class="min-w-0">
            <label
              for="hiddenLayerVizScale1"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-foreground"
              >Skala</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="hiddenLayerVizScale1"
                type="range"
                [min]="scaleMin"
                [max]="scaleMax"
                [step]="scaleStep"
                [value]="scale1()"
                (input)="onScale(1, $event)"
                class="h-2 min-w-0 flex-1 cursor-pointer accent-primary"
              />
              <span class="w-8 shrink-0 text-right text-[0.65rem] tabular-nums text-muted"
                >{{ scale1() | number : "1.0-2" }}</span
              >
            </div>
          </div>
        </app-viz-settings-block>
        <app-viz-settings-block heading="Aktivität">
          <div class="min-w-0">
            <label
              for="activeNeuronMaxMul"
              class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-foreground"
              >Max. Größe aktiver Neuronen</label
            >
            <div class="flex min-w-0 items-center gap-2">
              <input
                id="activeNeuronMaxMul"
                type="range"
                [min]="neuronMulMin"
                [max]="neuronMulMax"
                [step]="neuronMulStep"
                [value]="activeNeuronMaxMul()"
                (input)="onActiveNeuronMaxMul($event)"
                class="h-2 min-w-0 flex-1 cursor-pointer accent-primary"
              />
              <span class="w-8 shrink-0 text-right text-[0.65rem] tabular-nums text-muted"
                >{{ activeNeuronMaxMul() | number : "1.0-2" }}</span
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
  private readonly app = inject(NeuronalAppService);
  protected readonly scaleMin = HIDDEN_LAYER_VIZ_SCALE_MIN;
  protected readonly scaleMax = HIDDEN_LAYER_VIZ_SCALE_MAX;
  protected readonly scaleStep = HIDDEN_LAYER_VIZ_SCALE_STEP;
  readonly inputLayout = signal<InputLayerVizLayout>(INPUT_LAYER_PIXELS_LAYOUT);
  readonly inputScale = signal(HIDDEN_LAYER_VIZ_SCALE_DEFAULT);
  readonly scale0 = signal(HIDDEN_LAYER_VIZ_SCALE_DEFAULT);
  readonly scale1 = signal(HIDDEN_LAYER_VIZ_SCALE_DEFAULT);
  protected readonly neuronMulMin = ACTIVE_NEURON_MAX_SCALE_MUL_MIN;
  protected readonly neuronMulMax = ACTIVE_NEURON_MAX_SCALE_MUL_MAX;
  protected readonly neuronMulStep = ACTIVE_NEURON_MAX_SCALE_MUL_STEP;
  readonly activeNeuronMaxMul = signal(ACTIVE_NEURON_MAX_SCALE_MUL_DEFAULT);

  onInputLayout(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLSelectElement)) return;
    const v = t.value as InputLayerVizLayout;
    this.inputLayout.set(v);
    this.app.onInputLayerLayoutChange(t.value);
  }

  onInputScale(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== "range") return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.inputScale.set(v);
    this.app.onInputLayerLayoutScaleChange(v);
  }

  onHiddenLayout(index: 0 | 1, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLSelectElement)) return;
    this.app.onHiddenLayerLayoutChange(index, t.value);
  }

  onScale(index: 0 | 1, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== "range") return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    if (index === 0) this.scale0.set(v);
    else this.scale1.set(v);
    this.app.onHiddenLayerLayoutScaleChange(index, v);
  }

  onActiveNeuronMaxMul(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== "range") return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.activeNeuronMaxMul.set(v);
    this.app.onActiveNeuronMaxScaleMulChange(v);
  }
}
