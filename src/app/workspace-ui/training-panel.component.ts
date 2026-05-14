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
      class="border-base-300 bg-base-200 rounded-box flex w-full min-w-0 shrink-0
        flex-wrap items-center gap-x-3 gap-y-2 border px-3 py-2 shadow-sm"
      aria-label="Training"
    >
      <p
        class="text-base-content/70 max-w-[11rem] truncate text-xs sm:max-w-[14rem]"
        aria-live="polite"
        [attr.title]="datasetRibbon()"
      >
        {{ datasetRibbon() }}
      </p>
      <div
        class="border-base-300/50 flex min-w-0 max-w-[14rem] flex-col gap-0.5
          border-l pl-3 sm:max-w-[18rem]"
      >
        <p class="text-base-content truncate text-sm font-semibold">
          {{ activeTitle() }}
        </p>
        <p
          class="text-base-content/60 truncate text-xs leading-snug"
          [attr.title]="activeDetail()"
        >
          {{ activeDetail() }}
        </p>
      </div>
      <div
        class="border-base-300/50 flex flex-wrap items-center gap-2 border-l pl-3"
      >
        <button
          id="btnSaveModelAs"
          type="button"
          class="btn btn-outline btn-xs sm:btn-sm"
          title="Als neuen Stand speichern"
          [disabled]="ui().saveDisabled"
          (click)="saveAs()"
        >
          Speichern
        </button>
        <button
          id="btnResetModel"
          type="button"
          class="btn btn-ghost btn-xs sm:btn-sm"
          title="Gewichte zurücksetzen"
          [disabled]="ui().resetDisabled"
          (click)="reset()"
        >
          Zurücksetzen
        </button>
      </div>
      <div
        class="border-base-300/50 flex flex-wrap items-center gap-2 border-l pl-3"
        [attr.title]="epochHint()"
      >
        <span
          class="text-base-content/60 text-[0.65rem] font-semibold uppercase
            tracking-wide"
          >Epochen</span
        >
        <div class="join join-horizontal flex-wrap" id="epochPresetRow">
          <button
            type="button"
            class="epochPresetBtn btn join-item btn-outline btn-xs sm:btn-sm"
            [class.btn-primary]="hp().epochs === 1"
            [class.btn-outline]="hp().epochs !== 1"
            [disabled]="ui().trainFormLocked"
            (click)="epochPreset(1)"
          >
            1
          </button>
          <button
            type="button"
            class="epochPresetBtn btn join-item btn-outline btn-xs sm:btn-sm"
            [class.btn-primary]="hp().epochs === 3"
            [class.btn-outline]="hp().epochs !== 3"
            [disabled]="ui().trainFormLocked"
            (click)="epochPreset(3)"
          >
            3
          </button>
          <button
            type="button"
            class="epochPresetBtn btn join-item btn-outline btn-xs sm:btn-sm"
            [class.btn-primary]="hp().epochs === 10"
            [class.btn-outline]="hp().epochs !== 10"
            [disabled]="ui().trainFormLocked"
            (click)="epochPreset(10)"
          >
            10
          </button>
          <button
            type="button"
            class="epochPresetBtn btn join-item btn-outline btn-xs sm:btn-sm"
            [class.btn-primary]="hp().epochs === 30"
            [class.btn-outline]="hp().epochs !== 30"
            [disabled]="ui().trainFormLocked"
            (click)="epochPreset(30)"
          >
            30
          </button>
        </div>
        <label class="sr-only" for="epochsInput">Anzahl Epochen (1–200)</label>
        <input
          id="epochsInput"
          type="number"
          min="1"
          max="200"
          step="1"
          class="input input-bordered input-xs w-14 sm:input-sm sm:w-16"
          [disabled]="ui().trainFormLocked"
          [value]="hp().epochs"
          (input)="epochsInput($event)"
        />
        <p
          class="text-base-content/60 hidden max-w-[10rem] truncate text-[0.65rem]
            lg:block xl:max-w-[14rem]"
          aria-live="polite"
          [attr.title]="epochHint()"
        >
          {{ epochHint() }}
        </p>
      </div>
      <div
        class="border-base-300/50 flex flex-wrap items-center gap-2 border-l pl-3"
      >
        <button
          id="btnTrain"
          type="button"
          class="btn btn-primary btn-sm"
          [disabled]="ui().trainDisabled"
          (click)="trainStart()"
        >
          Starten
        </button>
        <button
          id="btnPause"
          type="button"
          class="btn btn-outline btn-sm"
          [disabled]="ui().pauseDisabled"
          (click)="pauseToggle()"
        >
          {{ panel().pause ? 'Weiter' : 'Pause' }}
        </button>
      </div>
      <details
        class="border-base-300/60 bg-base-300/30 rounded-btn border"
        id="trainAdvanced"
      >
        <summary
          class="text-base-content/70 cursor-pointer px-2 py-1.5 text-xs sm:px-3
            sm:py-2 sm:text-sm"
        >
          Erweitert
        </summary>
        <div
          class="border-base-300/40 grid grid-cols-2 gap-x-3 gap-y-2 border-t px-2
            pb-2 pt-2 text-sm sm:px-3 sm:pb-3"
        >
          <label for="lrInput" class="text-base-content/60 self-center text-xs"
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
