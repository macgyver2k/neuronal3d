import { createFeatureSelector, createSelector } from "@ngrx/store";
import type { NeuronalState } from "./neuronal.state";

const selectNeuronal = createFeatureSelector<NeuronalState>("neuronal");

function fmtPct(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return "-";
  return `${(v * 100).toFixed(2)}%`;
}

export type ModelBarMenuItemVm = {
  id: string;
  name: string;
  chipEp: string;
  chipAcc: string;
  chipErr: string;
  active: boolean;
};

export type ModelDropdownMenuVm =
  | { phase: "loading" }
  | { phase: "empty" }
  | { phase: "list"; items: ModelBarMenuItemVm[]; trainingRunning: boolean };

export const selectModelCollection = createSelector(
  selectNeuronal,
  (s) => s.modelCollection,
);

export const selectModelStoreHydrated = createSelector(
  selectNeuronal,
  (s) => s.modelStoreHydrated,
);

export const selectModelDropdownLabel = createSelector(selectNeuronal, (s) => {
  if (!s.modelStoreHydrated) {
    return { name: "Modelle werden geladen …", meta: "" };
  }
  if (s.modelCollection.models.length === 0) {
    return { name: "Kein Modell", meta: "Lege ein neues Modell an" };
  }
  const id = s.modelCollection.activeModelId;
  const entry = id ? s.modelCollection.models.find((m) => m.id === id) : null;
  if (!entry) {
    return { name: "Modell wählen", meta: "" };
  }
  return {
    name: entry.name,
    meta: `${entry.metrics.epochsTrained} Ep · Acc ${fmtPct(entry.metrics.testAcc)} · Err ${fmtPct(entry.metrics.errorRate)}`,
  };
});

export const selectModelDropdownMenuVm = createSelector(selectNeuronal, (s): ModelDropdownMenuVm => {
  if (!s.modelStoreHydrated) {
    return { phase: "loading" };
  }
  if (s.modelCollection.models.length === 0) {
    return { phase: "empty" };
  }
  const activeId = s.modelCollection.activeModelId;
  const items: ModelBarMenuItemVm[] = s.modelCollection.models.map((entry) => ({
    id: entry.id,
    name: entry.name,
    chipEp: `${entry.metrics.epochsTrained} Ep`,
    chipAcc: `Acc ${fmtPct(entry.metrics.testAcc)}`,
    chipErr: `Err ${fmtPct(entry.metrics.errorRate)}`,
    active: entry.id === activeId,
  }));
  return { phase: "list", items, trainingRunning: s.training.running };
});

export const selectModelDropdownButtonDisabled = createSelector(
  selectNeuronal,
  (s) =>
    s.training.running || !s.modelStoreHydrated || s.modelCollection.models.length === 0,
);
export const selectActiveModelId = createSelector(
  selectNeuronal,
  (s) => s.modelCollection.activeModelId,
);
export const selectEpochByModelId = createSelector(
  selectNeuronal,
  (s) => s.epochByModelId,
);
export const selectEpochDisplayRows = createSelector(
  selectNeuronal,
  (s) => s.epochDisplayRows,
);
export const selectTraining = createSelector(
  selectNeuronal,
  (s) => s.training,
);
export const selectLastTrainLoss = createSelector(
  selectNeuronal,
  (s) => s.lastTrainLoss,
);
export const selectLastTrainBatchAcc = createSelector(
  selectNeuronal,
  (s) => s.lastTrainBatchAcc,
);
export const selectModelDropdownOpen = createSelector(
  selectNeuronal,
  (s) => s.modelDropdownOpen,
);
export const selectNeuronalState = createSelector(
  selectNeuronal,
  (s) => s,
);
export const selectPauseTraining = createSelector(
  selectNeuronal,
  (s) => s.training.pause,
);
export const selectStopTraining = createSelector(
  selectNeuronal,
  (s) => s.training.shouldStop,
);
export const selectTrainingRunning = createSelector(
  selectNeuronal,
  (s) => s.training.running,
);
