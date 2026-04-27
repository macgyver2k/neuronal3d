import { createSelector } from "@ngrx/store";
import { selectNeuronal } from "./neuronal-root.selectors";

export const model = createSelector(selectNeuronal, (s) => s.viz3d);
