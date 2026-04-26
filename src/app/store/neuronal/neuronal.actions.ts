import { createActionGroup, emptyProps, props } from "@ngrx/store";
import type { PersistedEpochRow, StoredModelEntry } from "../../core/model.types";

export const NeuronalActions = createActionGroup({
  source: "Neuronal",
  events: {
    "Active Model Id Set": props<{ id: string }>(),
    "Model Entry Upserted": props<{ entry: StoredModelEntry }>(),
    "Epoch View Sync From Model": props<{ modelId: string }>(),
    "Epoch History Cleared": props<{ modelId: string }>(),
    "Training Started": props<{
      modelId: string;
      run: number;
      runStartedAt: string;
      runStartedMs: number;
    }>(),
    "Training Epoch Appended": props<{ modelId: string; row: PersistedEpochRow }>(),
    "Training Finished": props<{ lastTrainLoss: number; lastTrainBatchAcc: number }>(),
    "Training Stop Requested": emptyProps(),
    "Training Pause Toggled": emptyProps(),
    "Model Dropdown Set Open": props<{ open: boolean }>(),
    "Last Train Metrics Reset": emptyProps(),
  },
});
