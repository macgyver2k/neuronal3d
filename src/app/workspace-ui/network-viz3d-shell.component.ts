import { DecimalPipe, DOCUMENT } from '@angular/common';
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
  VizNetworkColorSettings,
  VizSceneColorSettings,
} from '../../viz/viz-appearance';
import { NeuronalAppService } from '../core/neuronal-app.service';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectVizImmersiveUi,
  model as selectVizModel,
} from '../store/neuronal/neuronal.selectors';
import {
  DAISYUI_THEMES,
  isDaisyUiThemeName,
  readCurrentDaisyThemeFromDocument,
  writeDaisyUiAppThemeToDocument,
} from './daisy-theme';
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
          <app-viz-settings-block heading="Neuronen (Leuchten)">
            <div class="flex flex-col gap-2.5">
              <div class="flex min-w-0 items-center justify-between gap-2">
                <label
                  for="vizNeuronEmissive"
                  class="text-[0.68rem] font-medium leading-snug text-base-content"
                  >Emissive</label
                >
                <input
                  id="vizNeuronEmissive"
                  type="color"
                  class="border-base-300 bg-base-100 h-9 w-[min(100%,4.5rem)] shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.neuronEmissive"
                  (change)="onNetworkColorHex('neuronEmissive', $event)"
                  title="Leuchtfarbe der Neuronen"
                />
              </div>
              <div class="min-w-0">
                <label
                  for="vizNeuronEmissiveAct"
                  class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
                  >Intensität (aktiv)</label
                >
                <div class="flex min-w-0 items-center gap-2">
                  <input
                    id="vizNeuronEmissiveAct"
                    type="range"
                    min="0.05"
                    max="4"
                    step="0.05"
                    [value]="
                      model().networkColors.neuronEmissiveIntensityActive
                    "
                    (input)="
                      onNetworkNumber('neuronEmissiveIntensityActive', $event)
                    "
                    class="range range-primary flex-1 min-w-0"
                  />
                  <span
                    class="text-base-content/60 w-10 shrink-0 text-right text-[0.65rem] tabular-nums"
                    >{{
                      model().networkColors.neuronEmissiveIntensityActive
                        | number: '1.0-2'
                    }}</span
                  >
                </div>
              </div>
              <div class="min-w-0">
                <label
                  for="vizNeuronEmissiveIdle"
                  class="mb-1 block w-full text-[0.68rem] font-medium leading-snug text-base-content"
                  >Intensität (ruhend)</label
                >
                <div class="flex min-w-0 items-center gap-2">
                  <input
                    id="vizNeuronEmissiveIdle"
                    type="range"
                    min="0"
                    max="2"
                    step="0.02"
                    [value]="model().networkColors.neuronEmissiveIntensityIdle"
                    (input)="
                      onNetworkNumber('neuronEmissiveIntensityIdle', $event)
                    "
                    class="range range-primary flex-1 min-w-0"
                  />
                  <span
                    class="text-base-content/60 w-10 shrink-0 text-right text-[0.65rem] tabular-nums"
                    >{{
                      model().networkColors.neuronEmissiveIntensityIdle
                        | number: '1.0-2'
                    }}</span
                  >
                </div>
              </div>
            </div>
          </app-viz-settings-block>
          <app-viz-settings-block heading="Neuronen (Aktivität)">
            <div class="flex flex-col gap-2.5">
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Zwischenlagen kalt</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.neuronHiddenCold"
                  (change)="onNetworkColorHex('neuronHiddenCold', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Zwischenlagen warm</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.neuronHiddenHot"
                  (change)="onNetworkColorHex('neuronHiddenHot', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Eingabe kalt</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.neuronInputCold"
                  (change)="onNetworkColorHex('neuronInputCold', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Eingabe warm</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.neuronInputHot"
                  (change)="onNetworkColorHex('neuronInputHot', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Ausgabe kalt</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.neuronOutputCold"
                  (change)="onNetworkColorHex('neuronOutputCold', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Ausgabe warm</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.neuronOutputHot"
                  (change)="onNetworkColorHex('neuronOutputHot', $event)"
                />
              </div>
            </div>
          </app-viz-settings-block>
          <app-viz-settings-block heading="Kanten (Gewichte)">
            <div class="flex flex-col gap-2.5">
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Positiv schwach</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.edgePositiveCold"
                  (change)="onNetworkColorHex('edgePositiveCold', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Positiv stark</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.edgePositiveHot"
                  (change)="onNetworkColorHex('edgePositiveHot', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Negativ schwach</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.edgeNegativeCold"
                  (change)="onNetworkColorHex('edgeNegativeCold', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Negativ stark</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.edgeNegativeHot"
                  (change)="onNetworkColorHex('edgeNegativeHot', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Inferenz ausgeblendet</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.edgeInferMuted"
                  (change)="onNetworkColorHex('edgeInferMuted', $event)"
                />
              </div>
              <div
                class="flex min-w-0 flex-wrap items-center justify-between gap-2"
              >
                <span class="text-[0.65rem] text-base-content/80"
                  >Training (zuletzt)</span
                >
                <input
                  type="color"
                  class="border-base-300 bg-base-100 h-8 w-14 shrink-0 cursor-pointer rounded border p-0.5"
                  [value]="model().networkColors.edgeTrainRecent"
                  (change)="onNetworkColorHex('edgeTrainRecent', $event)"
                />
              </div>
            </div>
          </app-viz-settings-block>
          <app-viz-settings-block heading="Nachbearbeitung">
            <div class="flex flex-col gap-3">
              <label
                class="flex cursor-pointer items-center justify-between gap-2"
              >
                <span class="text-[0.68rem] font-medium text-base-content"
                  >Bloom (Glow)</span
                >
                <input
                  type="checkbox"
                  class="toggle toggle-primary toggle-sm"
                  [checked]="model().postProcess.bloomEnabled"
                  (change)="onPostBool('bloomEnabled', $event)"
                />
              </label>
              <div class="min-w-0">
                <label
                  class="mb-1 block text-[0.65rem] font-medium text-base-content/90"
                  >Bloom-Stärke</label
                >
                <div class="flex min-w-0 items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.02"
                    [value]="model().postProcess.bloomStrength"
                    (input)="onPostNumber('bloomStrength', $event)"
                    class="range range-secondary flex-1 min-w-0"
                  />
                  <span
                    class="text-base-content/60 w-9 shrink-0 text-right text-[0.65rem] tabular-nums"
                    >{{
                      model().postProcess.bloomStrength | number: '1.0-2'
                    }}</span
                  >
                </div>
              </div>
              <div class="min-w-0">
                <label
                  class="mb-1 block text-[0.65rem] font-medium text-base-content/90"
                  >Bloom-Radius</label
                >
                <div class="flex min-w-0 items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    [value]="model().postProcess.bloomRadius"
                    (input)="onPostNumber('bloomRadius', $event)"
                    class="range range-secondary flex-1 min-w-0"
                  />
                  <span
                    class="text-base-content/60 w-9 shrink-0 text-right text-[0.65rem] tabular-nums"
                    >{{
                      model().postProcess.bloomRadius | number: '1.0-2'
                    }}</span
                  >
                </div>
              </div>
              <div class="min-w-0">
                <label
                  class="mb-1 block text-[0.65rem] font-medium text-base-content/90"
                  >Bloom-Schwelle</label
                >
                <div class="flex min-w-0 items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    [value]="model().postProcess.bloomThreshold"
                    (input)="onPostNumber('bloomThreshold', $event)"
                    class="range range-secondary flex-1 min-w-0"
                  />
                  <span
                    class="text-base-content/60 w-9 shrink-0 text-right text-[0.65rem] tabular-nums"
                    >{{
                      model().postProcess.bloomThreshold | number: '1.0-2'
                    }}</span
                  >
                </div>
              </div>
              <label
                class="flex cursor-pointer items-center justify-between gap-2"
              >
                <span class="text-[0.68rem] font-medium text-base-content"
                  >FXAA (Kantenglättung)</span
                >
                <input
                  type="checkbox"
                  class="toggle toggle-primary toggle-sm"
                  [checked]="model().postProcess.fxaaEnabled"
                  (change)="onPostBool('fxaaEnabled', $event)"
                />
              </label>
              <div class="min-w-0">
                <label
                  class="mb-1 block text-[0.65rem] font-medium text-base-content/90"
                  >Belichtung (Tone mapping)</label
                >
                <div class="flex min-w-0 items-center gap-2">
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.02"
                    [value]="model().postProcess.toneMappingExposure"
                    (input)="onPostNumber('toneMappingExposure', $event)"
                    class="range range-accent flex-1 min-w-0"
                  />
                  <span
                    class="text-base-content/60 w-9 shrink-0 text-right text-[0.65rem] tabular-nums"
                    >{{
                      model().postProcess.toneMappingExposure | number: '1.0-2'
                    }}</span
                  >
                </div>
              </div>
            </div>
          </app-viz-settings-block>
          <app-viz-settings-block heading="3D-Farbschema (DaisyUI)">
            <div class="flex flex-col gap-2">
              <label
                for="viz3dColorPreset"
                class="text-[0.68rem] font-medium text-base-content/90"
                >Vorlage für Szene, Licht und Netzwerkfarben</label
              >
              <select
                id="viz3dColorPreset"
                class="select select-bordered select-sm w-full max-w-full text-sm"
                [value]="colorPresetSelectValue()"
                (change)="onColorPresetSelect($event)"
              >
                @if (model().colorPresetMode === 'custom') {
                  <option value="__custom__" disabled>
                    Benutzerdefiniert (Farben manuell geändert)
                  </option>
                }
                <option value="followUi">Wie App-Theme</option>
                @for (t of daisyThemeNames; track t) {
                  <option [value]="t">{{ t }}</option>
                }
              </select>
              <p class="text-[0.62rem] leading-snug text-base-content/55">
                Die Werte werden aus den DaisyUI-Theme-Variablen abgeleitet. Bei
                „Wie App-Theme“ aktualisiert sich die 3D-Palette automatisch,
                wenn du das App-Theme wechselst.
              </p>
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
          <button
            type="button"
            class="pointer-events-auto btn btn-accent btn-sm shadow-lg"
            [attr.aria-pressed]="themeRotateOn()"
            (click)="toggleThemeRotate()"
          >
            {{ themeRotateOn() ? 'Theme-Rotation aus' : 'Theme-Rotation' }}
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkViz3dShellComponent implements OnDestroy {
  private static readonly THEME_ROTATE_MS = 4200;

  private readonly doc = inject(DOCUMENT);
  private readonly store = inject(Store<AppState>);
  private readonly ngZone = inject(NgZone);
  private readonly neuronalApp = inject(NeuronalAppService);
  /** DaisyUI-Themenamen für das 3D-Farbschema-Dropdown. */
  protected readonly daisyThemeNames = [...DAISYUI_THEMES];
  protected readonly vibeCameraOn = signal(true);
  protected readonly themeRotateOn = signal(false);
  private themeRotateTimer: number | null = null;
  private themeRotateIndex = 0;
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

  onNetworkColorHex(
    key: Exclude<
      keyof VizNetworkColorSettings,
      'neuronEmissiveIntensityActive' | 'neuronEmissiveIntensityIdle'
    >,
    ev: Event,
  ): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'color') return;
    this.store.dispatch(
      NeuronalActions.vizNetworkColorsPatch({
        patch: { [key]: t.value } as Partial<VizNetworkColorSettings>,
      }),
    );
  }

  onNetworkNumber(
    key: 'neuronEmissiveIntensityActive' | 'neuronEmissiveIntensityIdle',
    ev: Event,
  ): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'range') return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(
      NeuronalActions.vizNetworkColorsPatch({ patch: { [key]: v } }),
    );
  }

  onPostBool(key: 'bloomEnabled' | 'fxaaEnabled', ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'checkbox') return;
    this.store.dispatch(
      NeuronalActions.vizPostProcessPatch({ patch: { [key]: t.checked } }),
    );
  }

  onPostNumber(
    key:
      | 'bloomStrength'
      | 'bloomRadius'
      | 'bloomThreshold'
      | 'toneMappingExposure',
    ev: Event,
  ): void {
    const t = ev.target;
    if (!(t instanceof HTMLInputElement) || t.type !== 'range') return;
    const v = parseFloat(t.value);
    if (!Number.isFinite(v)) return;
    this.store.dispatch(
      NeuronalActions.vizPostProcessPatch({ patch: { [key]: v } }),
    );
  }

  protected colorPresetSelectValue(): string {
    const m = this.model();
    if (m.colorPresetMode === 'custom') return '__custom__';
    if (m.colorPresetMode === 'followUi') return 'followUi';
    return m.colorPresetFixedTheme;
  }

  onColorPresetSelect(ev: Event): void {
    const t = ev.target;
    if (!(t instanceof HTMLSelectElement)) return;
    const v = t.value;
    if (v === '__custom__') return;
    if (v === 'followUi') {
      this.store.dispatch(
        NeuronalActions.viz3dColorPresetModeChanged({ mode: 'followUi' }),
      );
      return;
    }
    if (isDaisyUiThemeName(v)) {
      this.store.dispatch(
        NeuronalActions.viz3dColorPresetModeChanged({
          mode: 'fixedTheme',
          fixedTheme: v,
        }),
      );
    }
  }

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
    this.clearThemeRotateTimer();
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

  toggleThemeRotate(): void {
    if (this.themeRotateOn()) {
      this.clearThemeRotateTimer();
      this.themeRotateOn.set(false);
      return;
    }
    this.themeRotateOn.set(true);
    const current = readCurrentDaisyThemeFromDocument(this.doc);
    const idx = DAISYUI_THEMES.indexOf(current);
    this.themeRotateIndex = idx >= 0 ? idx : 0;
    const tick = (): void => {
      this.themeRotateIndex =
        (this.themeRotateIndex + 1) % DAISYUI_THEMES.length;
      const next = DAISYUI_THEMES[this.themeRotateIndex];
      writeDaisyUiAppThemeToDocument(this.doc, next);
      this.ngZone.run(() => {
        this.store.dispatch(
          NeuronalActions.daisyUiAppThemeChanged({ theme: next }),
        );
      });
    };
    this.themeRotateTimer = window.setInterval(
      tick,
      NetworkViz3dShellComponent.THEME_ROTATE_MS,
    );
  }

  private clearThemeRotateTimer(): void {
    if (this.themeRotateTimer === null) return;
    window.clearInterval(this.themeRotateTimer);
    this.themeRotateTimer = null;
  }
}
