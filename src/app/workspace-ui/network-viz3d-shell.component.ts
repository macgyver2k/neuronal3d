import { DecimalPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { NeuronalAppService } from "../core/neuronal-app.service";
import {
  HIDDEN_LAYER_VIZ_SCALE_DEFAULT,
  HIDDEN_LAYER_VIZ_SCALE_MAX,
  HIDDEN_LAYER_VIZ_SCALE_MIN,
  HIDDEN_LAYER_VIZ_SCALE_STEP,
} from "../../viz/network3d";

@Component({
  selector: "app-network-viz3d-shell",
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <div
      class="n3-vizshell relative h-full min-h-0 w-full bg-background bg-[radial-gradient(100%_80%_at_50%_0%,rgba(54,211,166,0.09),transparent_58%)]"
    >
      <div
        class="absolute left-2 top-2 z-10 flex max-w-[min(100%,20rem)] flex-col gap-2 rounded-md border border-border bg-background/85 px-2 py-1.5 text-foreground shadow-sm backdrop-blur-sm"
        aria-label="Anordnung der Hidden-Layer"
      >
        <div class="flex min-w-0 flex-col gap-1">
          <div class="flex flex-wrap items-center gap-2">
            <label
              for="hiddenLayerVizLayout0"
              class="w-8 shrink-0 text-[0.7rem] font-medium text-muted"
              >H1</label
            >
            <select
              id="hiddenLayerVizLayout0"
              class="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1 text-sm text-foreground"
              (change)="onHiddenLayout(0, $event)"
            >
              <option value="ring" selected>Ring</option>
              <option value="grid">Raster</option>
              <option value="line">Linie</option>
              <option value="arc">Bogen, Richtung 1</option>
              <option value="arcAlt">Bogen, Richtung 2</option>
            </select>
          </div>
          <div class="flex min-w-0 items-center gap-1.5 pl-8">
            <label
              for="hiddenLayerVizScale0"
              class="shrink-0 text-[0.65rem] text-muted"
              >Skala</label
            >
            <input
              id="hiddenLayerVizScale0"
              type="range"
              [min]="scaleMin"
              [max]="scaleMax"
              [step]="scaleStep"
              [value]="scale0()"
              (input)="onScale(0, $event)"
              class="h-1.5 min-w-0 flex-1 cursor-pointer accent-primary"
            />
            <span class="w-7 shrink-0 text-right text-[0.65rem] tabular-nums text-muted"
              >{{ scale0() | number : "1.0-2" }}</span
            >
          </div>
        </div>
        <div class="flex min-w-0 flex-col gap-1">
          <div class="flex flex-wrap items-center gap-2">
            <label
              for="hiddenLayerVizLayout1"
              class="w-8 shrink-0 text-[0.7rem] font-medium text-muted"
              >H2</label
            >
            <select
              id="hiddenLayerVizLayout1"
              class="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1 text-sm text-foreground"
              (change)="onHiddenLayout(1, $event)"
            >
              <option value="ring" selected>Ring</option>
              <option value="grid">Raster</option>
              <option value="line">Linie</option>
              <option value="arc">Bogen, Richtung 1</option>
              <option value="arcAlt">Bogen, Richtung 2</option>
            </select>
          </div>
          <div class="flex min-w-0 items-center gap-1.5 pl-8">
            <label
              for="hiddenLayerVizScale1"
              class="shrink-0 text-[0.65rem] text-muted"
              >Skala</label
            >
            <input
              id="hiddenLayerVizScale1"
              type="range"
              [min]="scaleMin"
              [max]="scaleMax"
              [step]="scaleStep"
              [value]="scale1()"
              (input)="onScale(1, $event)"
              class="h-1.5 min-w-0 flex-1 cursor-pointer accent-primary"
            />
            <span class="w-7 shrink-0 text-right text-[0.65rem] tabular-nums text-muted"
              >{{ scale1() | number : "1.0-2" }}</span
            >
          </div>
        </div>
      </div>
      <div id="viz" class="absolute inset-0 min-h-0"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkViz3dShellComponent {
  private readonly app = inject(NeuronalAppService);
  protected readonly scaleMin = HIDDEN_LAYER_VIZ_SCALE_MIN;
  protected readonly scaleMax = HIDDEN_LAYER_VIZ_SCALE_MAX;
  protected readonly scaleStep = HIDDEN_LAYER_VIZ_SCALE_STEP;
  readonly scale0 = signal(HIDDEN_LAYER_VIZ_SCALE_DEFAULT);
  readonly scale1 = signal(HIDDEN_LAYER_VIZ_SCALE_DEFAULT);

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
}
