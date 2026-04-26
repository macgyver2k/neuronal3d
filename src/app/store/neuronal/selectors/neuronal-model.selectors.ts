import { createSelector } from "@ngrx/store";
import { selectNeuronal } from "./neuronal-root.selectors";

function fmtPct(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return "-";
  return `${(v * 100).toFixed(2)}%`;
}

export type ModelBarMenuItem = {
  id: string;
  name: string;
  epochValue: string;
  accValue: string;
  errValue: string;
  active: boolean;
};

export type ModelDropdownMenu =
  | { phase: "loading" }
  | { phase: "empty" }
  | { phase: "list"; items: ModelBarMenuItem[]; trainingRunning: boolean };

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
    meta: `Epoch ${entry.metrics.epochsTrained} · Test-Genauigkeit ${fmtPct(entry.metrics.testAcc)} · Fehlerrate ${fmtPct(entry.metrics.errorRate)}`,
  };
});

export const selectModelDropdownMenu = createSelector(selectNeuronal, (s): ModelDropdownMenu => {
  if (!s.modelStoreHydrated) {
    return { phase: "loading" };
  }
  if (s.modelCollection.models.length === 0) {
    return { phase: "empty" };
  }
  const activeId = s.modelCollection.activeModelId;
  const items: ModelBarMenuItem[] = s.modelCollection.models.map((entry) => ({
    id: entry.id,
    name: entry.name,
    epochValue: String(entry.metrics.epochsTrained),
    accValue: fmtPct(entry.metrics.testAcc),
    errValue: fmtPct(entry.metrics.errorRate),
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

export const selectModelDropdownOpen = createSelector(
  selectNeuronal,
  (s) => s.modelDropdownOpen,
);

export type NeuronalModelBarModel = {
  label: { name: string; meta: string };
  menu: ModelDropdownMenu;
  dropdownOpen: boolean;
  dropdownDisabled: boolean;
};

export const selectNeuronalModelBar = createSelector(
  selectModelDropdownLabel,
  selectModelDropdownMenu,
  selectModelDropdownOpen,
  selectModelDropdownButtonDisabled,
  (label, menu, dropdownOpen, dropdownDisabled): NeuronalModelBarModel => ({
    label,
    menu,
    dropdownOpen,
    dropdownDisabled,
  }),
);
