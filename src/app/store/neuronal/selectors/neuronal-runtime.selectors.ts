import { createSelector } from '@ngrx/store';
import { epochStepHintPlain } from '../../../core/train-hyperparams';
import { selectNeuronal } from './neuronal-root.selectors';

const MNIST_LABEL = 'MNIST';

function fmtPct(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return '-';
  return `${(v * 100).toFixed(2)}%`;
}

function formatTimeLabel(iso: string): string {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return '--:--:--';
  return d.toLocaleTimeString('de-DE', { hour12: false });
}

export const selectRuntimeStatusPlain = createSelector(
  selectNeuronal,
  (s) => s.runtimeStatusPlain,
);

export const selectDatasetRibbonPlain = createSelector(selectNeuronal, (s) => {
  const tr = s.runtimeKernelCaps.mnistTrainCount;
  const te = s.runtimeKernelCaps.mnistTestCount;
  if (tr === 0 && te === 0) {
    return `${MNIST_LABEL}: Train 0 · Test 0 — warten auf erfolgreichen Abruf (Statuszeile).`;
  }
  if (tr === 0) {
    return `${MNIST_LABEL}: Trainingsdaten fehlen · Test ${te}.`;
  }
  if (te === 0) {
    return `${MNIST_LABEL}: Train ${tr} · Testdaten fehlen.`;
  }
  return `${MNIST_LABEL}: ${tr} Train-Bilder · ${te} Test-Bilder bereit.`;
});

export const selectTrainingActiveModelTitle = createSelector(
  selectNeuronal,
  (s) => {
    if (!s.runtimeKernelCaps.hasNet) return 'Noch kein Netz geladen';
    const id = s.modelCollection.activeModelId;
    const entry = id ? s.modelCollection.models.find((m) => m.id === id) : null;
    if (entry) return entry.name;
    return 'Netz im Arbeitsspeicher';
  },
);

export const selectTrainingActiveModelDetail = createSelector(
  selectNeuronal,
  (s) => {
    if (!s.runtimeKernelCaps.hasNet) {
      return 'Oben ‚Aktives Modell‘ wählen — oder „Training starten“ ohne vorherigen Stand legt automatisch einen ersten Stand an.';
    }
    const id = s.modelCollection.activeModelId;
    const entry = id ? s.modelCollection.models.find((m) => m.id === id) : null;
    if (entry) {
      return `Test ${fmtPct(entry.metrics.testAcc)} · Fehlerquote ${fmtPct(entry.metrics.errorRate)} · ${entry.metrics.epochsTrained} trainierte Epochen (Summe) · zuletzt ${formatTimeLabel(entry.updatedAt)}`;
    }
    return 'Kein passender Eintrag in der Bibliothek gefunden.';
  },
);

export const selectEpochStepHintPlain = createSelector(selectNeuronal, (s) =>
  epochStepHintPlain(s.runtimeKernelCaps.mnistTrainCount, s.trainHyperparams),
);

export const selectTrainHyperparams = createSelector(
  selectNeuronal,
  (s) => s.trainHyperparams,
);

export const selectRuntimeKernelCaps = createSelector(
  selectNeuronal,
  (s) => s.runtimeKernelCaps,
);

export type TrainingUiControls = {
  trainDisabled: boolean;
  pauseDisabled: boolean;
  saveDisabled: boolean;
  resetDisabled: boolean;
  trainFormLocked: boolean;
};

export const selectTrainingUiControls = createSelector(
  selectNeuronal,
  (s): TrainingUiControls => {
    const run = s.training.running;
    const tr = s.runtimeKernelCaps.mnistTrainCount;
    const hasNet = s.runtimeKernelCaps.hasNet;
    return {
      trainDisabled: tr <= 0 || run,
      pauseDisabled: !run,
      saveDisabled: !hasNet || run,
      resetDisabled: !hasNet || run,
      trainFormLocked: run,
    };
  },
);

export type InferUiControls = {
  inferRandomDisabled: boolean;
  carouselDisabled: boolean;
  inferDrawDisabled: boolean;
};

export const selectInferUiControls = createSelector(
  selectNeuronal,
  (s): InferUiControls => {
    const run = s.training.running;
    const hasNet = s.runtimeKernelCaps.hasNet;
    const te = s.runtimeKernelCaps.mnistTestCount;
    return {
      inferRandomDisabled: !hasNet || te <= 0,
      carouselDisabled: !hasNet || te <= 0 || run,
      inferDrawDisabled: !hasNet,
    };
  },
);

export const selectNewModelDisabled = createSelector(
  selectNeuronal,
  (s) => s.training.running || !s.modelStoreHydrated,
);
