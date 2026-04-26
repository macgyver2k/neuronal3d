import { createSelector } from "@ngrx/store";
import { selectNeuronal } from "./neuronal-root.selectors";

function fmtPct(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return "-";
  return `${(v * 100).toFixed(2)}%`;
}

export type InferPanelModel = {
  headline: string;
  detail: string;
};

export const selectInferPanelModel = createSelector(selectNeuronal, (s): InferPanelModel => {
  const id = s.modelCollection.activeModelId;
  const entry = id ? s.modelCollection.models.find((m) => m.id === id) : null;
  if (!entry) {
    return {
      headline: "Kein aktives Modell",
      detail: "Zuerst ein Modell wählen oder anlegen.",
    };
  }
  return {
    headline: entry.name,
    detail: `${entry.metrics.epochsTrained} Epochen gesamt · Test ${fmtPct(entry.metrics.testAcc)}`,
  };
});
