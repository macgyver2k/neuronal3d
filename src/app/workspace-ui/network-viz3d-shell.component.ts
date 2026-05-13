import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnDestroy,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  ACTIVE_NEURON_MAX_SCALE_MUL_MAX,
  ACTIVE_NEURON_MAX_SCALE_MUL_MIN,
  ACTIVE_NEURON_MAX_SCALE_MUL_STEP,
  HIDDEN_LAYER_VIZ_SCALE_MAX,
  HIDDEN_LAYER_VIZ_SCALE_MIN,
  HIDDEN_LAYER_VIZ_SCALE_STEP,
} from '../../viz/network3d';
import type {
  VizLightColorSettings,
  VizSceneColorSettings,
} from '../../viz/viz-appearance';
import { NeuronalAppService } from '../core/neuronal-app.service';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectVizImmersiveUi,
  model as selectVizModel,
} from '../store/neuronal/neuronal.selectors';
import { VizSettingsBlockComponent } from './viz-settings-block.component';

@Component({
  selector: 'app-network-viz3d-shell',
  standalone: true,
  imports: [DecimalPipe, VizSettingsBlockComponent],
  host: {
    class: 'flex min-h-0 min-w-0 flex-1 flex-col',
  },
  template: `
    <div class="relative flex min-h-0 min-w-0 flex-1 flex-row bg-base-300/25">
      @if (!immersive()) {
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
                <span
                  class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                  >{{ model().inputLayerScale | number: '1.0-2' }}</span
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
                <span
                  class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                  >{{ model().hiddenLayerScales[0] | number: '1.0-2' }}</span
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
                <span
                  class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                  >{{ model().hiddenLayerScales[1] | number: '1.0-2' }}</span
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
                <span
                  class="text-base-content/60 w-8 shrink-0 text-right text-[0.65rem] tabular-nums"
                  >{{ model().activeNeuronMaxScaleMul | number: '1.0-2' }}</span
                >
              </div>
            </div>
          </app-viz-settings-block>
          <app-viz-settings-block heading="Szene &amp; Umgebung">
            <div class="flex flex-col gap-2.5">
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizSceneBgFog"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Hintergrund &amp; Nebel</label
                >
                <input
                  id="vizSceneBgFog"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().sceneColors.backgroundFog"
                  (input)="onSceneColorInput('backgroundFog', $event)"
                  (change)="onSceneColorCommit('backgroundFog', $event)"
                  (blur)="onVizColorPickerBlur()"
                  title="Hintergrund und Nebelfarbe"
                />
              </div>
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizSceneFloor"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Boden</label
                >
                <input
                  id="vizSceneFloor"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().sceneColors.floor"
                  (input)="onSceneColorInput('floor', $event)"
                  (change)="onSceneColorCommit('floor', $event)"
                  (blur)="onVizColorPickerBlur()"
                  title="Bodenfarbe"
                />
              </div>
            </div>
          </app-viz-settings-block>
          <app-viz-settings-block heading="Lichtfarben">
            <div class="flex flex-col gap-2.5">
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizLightHemiSky"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Hemisphäre (oben)</label
                >
                <input
                  id="vizLightHemiSky"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().lightColors.hemiSky"
                  (input)="onLightColorInput('hemiSky', $event)"
                  (change)="onLightColorCommit('hemiSky', $event)"
                  (blur)="onVizColorPickerBlur()"
                />
              </div>
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizLightHemiGrd"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Hemisphäre (unten)</label
                >
                <input
                  id="vizLightHemiGrd"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().lightColors.hemiGround"
                  (input)="onLightColorInput('hemiGround', $event)"
                  (change)="onLightColorCommit('hemiGround', $event)"
                  (blur)="onVizColorPickerBlur()"
                />
              </div>
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizLightAmb"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Umgebungslicht</label
                >
                <input
                  id="vizLightAmb"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().lightColors.ambient"
                  (input)="onLightColorInput('ambient', $event)"
                  (change)="onLightColorCommit('ambient', $event)"
                  (blur)="onVizColorPickerBlur()"
                />
              </div>
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizLightKey"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Key-Licht</label
                >
                <input
                  id="vizLightKey"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().lightColors.key"
                  (input)="onLightColorInput('key', $event)"
                  (change)="onLightColorCommit('key', $event)"
                  (blur)="onVizColorPickerBlur()"
                />
              </div>
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizLightFill"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Fill-Licht</label
                >
                <input
                  id="vizLightFill"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().lightColors.fill"
                  (input)="onLightColorInput('fill', $event)"
                  (change)="onLightColorCommit('fill', $event)"
                  (blur)="onVizColorPickerBlur()"
                />
              </div>
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizLightRim"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Rim-Licht</label
                >
                <input
                  id="vizLightRim"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().lightColors.rim"
                  (input)="onLightColorInput('rim', $event)"
                  (change)="onLightColorCommit('rim', $event)"
                  (blur)="onVizColorPickerBlur()"
                />
              </div>
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizLightBack"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Akzent hinten</label
                >
                <input
                  id="vizLightBack"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().lightColors.backAccent"
                  (input)="onLightColorInput('backAccent', $event)"
                  (change)="onLightColorCommit('backAccent', $event)"
                  (blur)="onVizColorPickerBlur()"
                />
              </div>
            </div>
          </app-viz-settings-block>
        </aside>
      }
      <div
        class="relative grid min-h-0 min-w-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)]"
      >
        <div
          id="viz"
          class="col-start-1 row-start-1 min-h-0 min-w-0 size-full max-h-full"
        ></div>
        <div
          class="pointer-events-none col-start-1 row-start-1 z-10 flex flex-col items-end gap-2 p-2"
        >
          <button
            type="button"
            class="pointer-events-auto btn btn-outline btn-sm shadow-lg"
            [attr.aria-pressed]="immersive()"
            (click)="toggleImmersive()"
          >
            {{ immersive() ? 'Leisten anzeigen' : 'Nur 3D' }}
          </button>
          <button
            type="button"
            class="pointer-events-auto btn btn-secondary btn-sm shadow-lg"
            [attr.aria-pressed]="vibeCameraOn()"
            (click)="toggleVibeCamera()"
          >
            {{ vibeCameraOn() ? 'Kamera-Vibe aus' : 'Kamera-Vibe' }}
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkViz3dShellComponent implements OnDestroy {
  private readonly store = inject(Store<AppState>);
  private readonly ngZone = inject(NgZone);
  private readonly neuronalApp = inject(NeuronalAppService);
  protected readonly vibeCameraOn = signal(true);
  protected readonly scaleMin = HIDDEN_LAYER_VIZ_SCALE_MIN;
  protected readonly scaleMax = HIDDEN_LAYER_VIZ_SCALE_MAX;
  protected readonly scaleStep = HIDDEN_LAYER_VIZ_SCALE_STEP;
  readonly model = toSignal(this.store.select(selectVizModel), {
    requireSync: true,
  });
  readonly immersive = toSignal(this.store.select(selectVizImmersiveUi), {
    initialValue: false,
  });
  protected readonly neuronMulMin = ACTIVE_NEURON_MAX_SCALE_MUL_MIN;
  protected readonly neuronMulMax = ACTIVE_NEURON_MAX_SCALE_MUL_MAX;
  protected readonly neuronMulStep = ACTIVE_NEURON_MAX_SCALE_MUL_STEP;

  onInputLayout(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLSelectElement)) return;
    this.store.dispatch(
      NeuronalActions.vizInputLayerLayoutChanged({ raw: t.value }),
    );
  }

  onInputScale(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'range') return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(
      NeuronalActions.vizInputLayerScaleChanged({ scale: v }),
    );
  }

  onHiddenLayout(index: 0 | 1, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLSelectElement)) return;
    this.store.dispatch(
      NeuronalActions.vizHiddenLayerLayoutChanged({ index, raw: t.value }),
    );
  }

  onScale(index: 0 | 1, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'range') return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(
      NeuronalActions.vizHiddenLayerScaleChanged({ index, scale: v }),
    );
  }

  onActiveNeuronMaxMul(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'range') return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(
      NeuronalActions.vizActiveNeuronMaxScaleMulChanged({ mul: v }),
    );
  }

  onSceneColorInput(key: keyof VizSceneColorSettings, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'color') return;
    const color = t.value;
    this.ngZone.runOutsideAngular(() => {
      this.neuronalApp.previewVizSceneColor(key, color);
    });
  }

  onSceneColorCommit(key: keyof VizSceneColorSettings, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'color') return;
    this.store.dispatch(
      NeuronalActions.vizSceneColorChanged({ key, color: t.value }),
    );
  }

  onLightColorInput(key: keyof VizLightColorSettings, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'color') return;
    const color = t.value;
    this.ngZone.runOutsideAngular(() => {
      this.neuronalApp.previewVizLightColor(key, color);
    });
  }

  onLightColorCommit(key: keyof VizLightColorSettings, ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'color') return;
    this.store.dispatch(
      NeuronalActions.vizLightColorChanged({ key, color: t.value }),
    );
  }

  /** Abbruch ohne Commit: Vorschau verworfen, Szene entspricht wieder dem Store. */
  onVizColorPickerBlur(): void {
    this.neuronalApp.cancelPendingVizColorPreviews();
    const m = this.model();
    this.neuronalApp.onVizSceneColorsApply(m.sceneColors);
    this.neuronalApp.onVizLightColorsApply(m.lightColors);
  }

  ngOnDestroy(): void {
    this.neuronalApp.cancelPendingVizColorPreviews();
    const m = this.model();
    this.neuronalApp.onVizSceneColorsApply(m.sceneColors);
    this.neuronalApp.onVizLightColorsApply(m.lightColors);
  }

  toggleImmersive(): void {
    this.store.dispatch(NeuronalActions.uiVizImmersiveToggled());
  }

  toggleVibeCamera(): void {
    const next = this.neuronalApp.toggleVibeCameraState(this.vibeCameraOn());
    if (next === null) return;
    this.vibeCameraOn.set(next);
  }
}
