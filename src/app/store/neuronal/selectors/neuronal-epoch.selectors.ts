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
