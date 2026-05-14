import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import type { AppState } from '../store/app.state';
import { NeuronalActions } from '../store/neuronal/neuronal.actions';
import {
  selectDatasetRibbonPlain,
  selectEpochStepHintPlain,
  selectTrainHyperparams,
  selectTrainingActiveModelDetail,
  selectTrainingActiveModelTitle,
  selectTrainingPanelModel,
  selectTrainingUiControls,
} from '../store/neuronal/neuronal.selectors';

@Component({
  selector: 'app-training-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      id="dockTrain"
      class="card border-base-300 bg-base-200 rounded-box flex shrink-0 flex-col gap-3 border shadow-xl"
    >
      <div class="card-body gap-3 p-5">
        <div class="shrink-0">
          <h2 class="card-title text-base">Training</h2>
          <p class="text-base-content/60 text-xs">
            Weiterlernen mit dem aktuell gewählten Modell
          </p>
        </div>
        <p
          class="text-base-content/70 rounded-btn border-base-300/60 bg-base-300/30 border p-2 text-xs leading-snug"
          aria-live="polite"
        >
          {{ datasetRibbon() }}
        </p>
        <div class="flex flex-col gap-2">
          <p class="text-base-content font-semibold">
            {{ activeTitle() }}
          </p>
          <p class="text-base-content/60 text-xs leading-snug">
            {{ activeDetail() }}
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <button
              id="btnSaveModelAs"
              type="button"
              class="btn btn-outline btn-sm"
              [disabled]="ui().saveDisabled"
              (click)="saveAs()"
            >
              Als neuen Stand speichern
            </button>
            <button
              id="btnResetModel"
              type="button"
              class="btn btn-ghost btn-sm"
              [disabled]="ui().resetDisabled"
              (click)="reset()"
            >
              Gewichte zurücksetzen
            </button>
          </div>
        </div>
        <div class="form-control gap-2">
          <span
            class="text-base-content/60 text-[0.65rem] font-semibold uppercase tracking-widest"
            >Epochen</span
          >
          <div class="join join-horizontal flex-wrap" id="epochPresetRow">
            <button
              type="button"
              class="epochPresetBtn btn join-item btn-outline btn-sm"
              [class.btn-primary]="hp().epochs === 1"
              [class.btn-outline]="hp().epochs !== 1"
              [disabled]="ui().trainFormLocked"
              (click)="epochPreset(1)"
            >
              1
            </button>
            <button
              type="button"
              class="epochPresetBtn btn join-item btn-outline btn-sm"
              [class.btn-primary]="hp().epochs === 3"
              [class.btn-outline]="hp().epochs !== 3"
              [disabled]="ui().trainFormLocked"
              (click)="epochPreset(3)"
            >
              3
            </button>
            <button
              type="button"
              class="epochPresetBtn btn join-item btn-outline btn-sm"
              [class.btn-primary]="hp().epochs === 10"
              [class.btn-outline]="hp().epochs !== 10"
              [disabled]="ui().trainFormLocked"
              (click)="epochPreset(10)"
            >
              10
            </button>
            <button
              type="button"
              class="epochPresetBtn btn join-item btn-outline btn-sm"
              [class.btn-primary]="hp().epochs === 30"
              [class.btn-outline]="hp().epochs !== 30"
              [disabled]="ui().trainFormLocked"
              (click)="epochPreset(30)"
            >
              30
            </button>
          </div>
          <label class="label py-0" for="epochsInput">
            <span class="label-text text-base-content/60 text-xs"
              >Anzahl (1–200)</span
            >
          </label>
          <input
            id="epochsInput"
            type="number"
            min="1"
            max="200"
            step="1"
            class="input input-bordered w-full"
            [disabled]="ui().trainFormLocked"
            [value]="hp().epochs"
            (input)="epochsInput($event)"
          />
        </div>
        <p class="text-base-content/60 text-xs" aria-live="polite">
          {{ epochHint() }}
        </p>
        <div class="flex flex-wrap items-center gap-2 max-sm:flex-col">
          <button
            id="btnTrain"
            type="button"
            class="btn btn-primary min-w-[8rem] flex-1 sm:flex-none"
            [disabled]="ui().trainDisabled"
            (click)="trainStart()"
          >
            Training starten
          </button>
          <button
            id="btnPause"
            type="button"
            class="btn btn-outline flex-1 sm:flex-none"
            [disabled]="ui().pauseDisabled"
            (click)="pauseToggle()"
          >
            {{ panel().pause ? 'Fortsetzen' : 'Anhalten' }}
          </button>
        </div>
        <details
          class="rounded-box border-base-300/60 bg-base-300/30 border"
          id="trainAdvanced"
        >
          <summary
            class="text-base-content/70 cursor-pointer px-3 py-2.5 text-sm"
          >
            Erweitert
          </summary>
          <div
            class="grid grid-cols-2 gap-x-3 gap-y-2 border-base-300/40 border-t px-3 pb-3 pt-2 text-sm"
          >
            <label
              for="lrInput"
              class="text-base-content/60 self-center text-xs"
              >Lernrate</label
            >
            <input
              id="lrInput"
              type="number"
              min="0.0001"
              max="1"
              step="0.0001"
              class="input input-bordered input-sm w-full"
              [disabled]="ui().trainFormLocked"
              [value]="hp().lr"
              (input)="lrInput($event)"
            />
            <label
              for="batchSizeInput"
              class="text-base-content/60 self-center text-xs"
              >Batch</label
            >
            <input
              id="batchSizeInput"
              type="number"
              min="1"
              max="512"
              step="1"
              class="input input-bordered input-sm w-full"
              [disabled]="ui().trainFormLocked"
              [value]="hp().batchSize"
              (input)="batchSizeInput($event)"
            />
            <label
              for="vizEveryInput"
              class="text-base-content/60 self-center text-xs"
              >3D alle N Batches</label
            >
            <input
              id="vizEveryInput"
              type="number"
              min="1"
              max="1000"
              step="1"
              class="input input-bordered input-sm w-full"
              [disabled]="ui().trainFormLocked"
              [value]="hp().vizEveryNBatches"
              (input)="vizEveryInput($event)"
            />
          </div>
        </details>
      </div>
    </article>
  `,
})
export class TrainingPanelComponent {
  private readonly store = inject(Store<AppState>);

  protected readonly hp = toSignal(this.store.select(selectTrainHyperparams), {
    requireSync: true,
  });
  protected readonly ui = toSignal(
    this.store.select(selectTrainingUiControls),
    {
      requireSync: true,
    },
  );
  protected readonly panel = toSignal(
    this.store.select(selectTrainingPanelModel),
    { requireSync: true },
  );
  protected readonly datasetRibbon = toSignal(
    this.store.select(selectDatasetRibbonPlain),
    { requireSync: true },
  );
  protected readonly activeTitle = toSignal(
    this.store.select(selectTrainingActiveModelTitle),
    { requireSync: true },
  );
  protected readonly activeDetail = toSignal(
    this.store.select(selectTrainingActiveModelDetail),
    { requireSync: true },
  );
  protected readonly epochHint = toSignal(
    this.store.select(selectEpochStepHintPlain),
    { requireSync: true },
  );

  saveAs(): void {
    this.store.dispatch(NeuronalActions.uiSaveAsRequested());
  }

  reset(): void {
    this.store.dispatch(NeuronalActions.uiResetRequested());
  }

  epochPreset(epochs: number): void {
    this.store.dispatch(NeuronalActions.uiEpochPresetRequested({ epochs }));
  }

  epochsInput(ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value;
    this.store.dispatch(NeuronalActions.uiEpochsInputChanged({ raw }));
  }

  batchSizeInput(ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value;
    this.store.dispatch(NeuronalActions.uiBatchSizeInputChanged({ raw }));
  }

  lrInput(ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value;
    this.store.dispatch(NeuronalActions.uiTrainLrInputChanged({ raw }));
  }

  vizEveryInput(ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value;
    this.store.dispatch(NeuronalActions.uiTrainVizEveryInputChanged({ raw }));
  }

  trainStart(): void {
    this.store.dispatch(NeuronalActions.uiTrainStartRequested());
  }

  pauseToggle(): void {
    this.store.dispatch(NeuronalActions.trainingPauseToggled());
  }
}
