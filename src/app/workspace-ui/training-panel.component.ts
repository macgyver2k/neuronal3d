import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import type { AppState } from "../store/app.state";
import { NeuronalActions } from "../store/neuronal/neuronal.actions";

@Component({
  selector: "app-training-panel",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article id="dockTrain" class="n3-panel n3-panel--train">
      <div class="n3-panelhead shrink-0">
        <h2 class="n3-paneltitle text-foreground">Training</h2>
        <p class="n3-panelsub text-muted">Weiterlernen mit dem aktuell gewählten Modell</p>
      </div>
      <p id="datasetRibbon" class="n3-ribbon text-muted" aria-live="polite"></p>
      <div class="n3-active flex flex-col gap-1">
        <p id="activeModelTitle" class="n3-active-title text-foreground"></p>
        <p id="activeModelDetail" class="n3-active-detail text-muted"></p>
        <div class="n3-row flex flex-wrap items-center gap-2">
          <button
            id="btnSaveModelAs"
            type="button"
            class="n3-btn border-border"
            disabled
            (click)="saveAs()"
          >
            Als neuen Stand speichern
          </button>
          <button
            id="btnResetModel"
            type="button"
            class="n3-btn n3-btn--ghost"
            disabled
            (click)="reset()"
          >
            Gewichte zurücksetzen
          </button>
        </div>
      </div>
      <div class="n3-field flex flex-col gap-1.5">
        <span
          class="n3-label font-semibold uppercase tracking-widest text-muted text-[0.65rem]"
          >Epochen</span
        >
        <div class="n3-chips flex flex-wrap gap-1.5" id="epochPresetRow">
          <button type="button" class="epochPresetBtn" [attr.data-epochs]="1" (click)="epochPreset(1)">
            1
          </button>
          <button type="button" class="epochPresetBtn" [attr.data-epochs]="3" (click)="epochPreset(3)">
            3
          </button>
          <button type="button" class="epochPresetBtn" [attr.data-epochs]="10" (click)="epochPreset(10)">
            10
          </button>
          <button type="button" class="epochPresetBtn" [attr.data-epochs]="30" (click)="epochPreset(30)">
            30
          </button>
        </div>
        <label class="n3-labelrow text-[0.72rem] text-muted" for="epochsInput">Anzahl (1–200)</label>
        <input
          id="epochsInput"
          type="number"
          min="1"
          max="200"
          step="1"
          value="1"
          (input)="epochsInput()"
        />
      </div>
      <p id="epochStepHint" class="n3-hint text-muted" aria-live="polite"></p>
      <div class="n3-row n3-row--grow flex flex-wrap items-center gap-2">
        <button
          id="btnTrain"
          type="button"
          class="n3-btn n3-btn--primary"
          disabled
          (click)="trainStart()"
        >
          Training starten
        </button>
        <button id="btnPause" type="button" class="n3-btn border-border" disabled (click)="pauseToggle()">
          Anhalten
        </button>
      </div>
      <details class="n3-advanced border-border-soft" id="trainAdvanced">
        <summary class="cursor-pointer text-[0.74rem] text-muted">Erweitert</summary>
        <div class="n3-advancedgrid mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
          <label for="lrInput" class="text-[0.68rem] text-muted">Lernrate</label>
          <input id="lrInput" type="number" min="0.0001" max="1" step="0.0001" value="0.02" />
          <label for="batchSizeInput" class="text-[0.68rem] text-muted">Batch</label>
          <input
            id="batchSizeInput"
            type="number"
            min="1"
            max="512"
            step="1"
            value="32"
            (input)="batchSizeInput()"
          />
          <label for="vizEveryInput" class="text-[0.68rem] text-muted">3D alle N Batches</label>
          <input id="vizEveryInput" type="number" min="1" max="1000" step="1" value="4" />
        </div>
      </details>
    </article>
  `,
})
export class TrainingPanelComponent {
  private readonly store = inject(Store<AppState>);

  saveAs(): void {
    this.store.dispatch(NeuronalActions.uiSaveAsRequested());
  }

  reset(): void {
    this.store.dispatch(NeuronalActions.uiResetRequested());
  }

  epochPreset(epochs: number): void {
    this.store.dispatch(NeuronalActions.uiEpochPresetRequested({ epochs }));
  }

  epochsInput(): void {
    this.store.dispatch(NeuronalActions.uiEpochsInputChanged());
  }

  batchSizeInput(): void {
    this.store.dispatch(NeuronalActions.uiBatchSizeInputChanged());
  }

  trainStart(): void {
    this.store.dispatch(NeuronalActions.uiTrainStartRequested());
  }

  pauseToggle(): void {
    this.store.dispatch(NeuronalActions.trainingPauseToggled());
  }
}
