import { createSelector } from "@ngrx/store";
import type { PersistedEpochRow } from "../../../core/model.types";
import { selectNeuronal } from "./neuronal-root.selectors";

export const selectEpochByModelId = createSelector(
  selectNeuronal,
  (s) => s.epochByModelId,
);

export const selectEpochDisplayRows = createSelector(
  selectNeuronal,
  (s) => s.epochDisplayRows,
);

export type EpochTrackRowModel = PersistedEpochRow;

export const selectEpochTrackListModel = createSelector(
  selectEpochDisplayRows,
  (rows): EpochTrackRowModel[] => rows,
);

export type EpochTrackView = {
  epochsTotal: number;
  rows: PersistedEpochRow[];
};

export const selectEpochTrackView = createSelector(selectNeuronal, (s): EpochTrackView => {
  const id = s.modelCollection.activeModelId;
  const entry = id ? s.modelCollection.models.find((m) => m.id === id) : null;
  const epochsTotal = entry?.metrics.epochsTrained ?? 0;
  const all = s.epochDisplayRows;
  const rows = all.length === 0 ? [] : [...all].slice(-200).reverse();
  return { epochsTotal, rows };
});
