import { createReducer, on } from "@ngrx/store";
import { EPOCH_TRACK_MAX_ROWS_PER_MODEL } from "../../core/epoch-storage";
import type { PersistedEpochRow, StoredModelEntry } from "../../core/model.types";
import {
  clampActiveNeuronMaxScaleMul,
  clampHiddenLayerVizScale,
  HIDDEN_LAYER_VIZ_LAYOUTS,
  INPUT_LAYER_VIZ_LAYOUTS,
  type HiddenLayerVizLayout,
  type InputLayerVizLayout,
} from "../../../viz/network3d";
import { NeuronalActions } from "./neuronal.actions";
import { createInitialNeuronalState, initialEpochDisplay, type NeuronalState } from "./neuronal.state";

function parseInputLayerVizLayout(raw: string): InputLayerVizLayout | null {
  return (INPUT_LAYER_VIZ_LAYOUTS as readonly string[]).includes(raw)
    ? (raw as InputLayerVizLayout)
    : null;
}

function parseHiddenLayerVizLayout(raw: string): HiddenLayerVizLayout | null {
  return (HIDDEN_LAYER_VIZ_LAYOUTS as readonly string[]).includes(raw)
    ? (raw as HiddenLayerVizLayout)
    : null;
}

function appendEpoch(
  by: Record<string, PersistedEpochRow[]>,
  modelId: string,
  row: PersistedEpochRow,
): Record<string, PersistedEpochRow[]> {
  const prev = by[modelId] ?? [];
  const next = [...prev, row];
  if (next.length > EPOCH_TRACK_MAX_ROWS_PER_MODEL) {
    next.splice(0, next.length - EPOCH_TRACK_MAX_ROWS_PER_MODEL);
  }
  return { ...by, [modelId]: next };
}

function upsertEntryInCollection(col: NeuronalState["modelCollection"], entry: StoredModelEntry) {
  const models = [...col.models];
  const idx = models.findIndex((m) => m.id === entry.id);
  if (idx >= 0) models[idx] = entry;
  else models.unshift(entry);
  return {
    ...col,
    activeModelId: entry.id,
    models,
  };
}

function epochRowsForId(s: NeuronalState, id: string): PersistedEpochRow[] {
  return [...(s.epochByModelId[id] ?? [])];
}

const initial = createInitialNeuronalState();

export const neuronalReducer = createReducer<NeuronalState>(
  initial,
  on(NeuronalActions.modelStoreHydrated, (s, { modelCollection }): NeuronalState => ({
    ...s,
    modelCollection,
    modelStoreHydrated: true,
    epochDisplayRows: initialEpochDisplay(s.epochByModelId, modelCollection),
  })),
  on(NeuronalActions.epochStoreHydrated, (s, { byModelId }): NeuronalState => ({
    ...s,
    epochByModelId: { ...byModelId },
    epochDisplayRows: initialEpochDisplay(byModelId, s.modelCollection),
  })),
  on(NeuronalActions.activeModelIdSet, (s, { id }): NeuronalState => ({
    ...s,
    modelCollection: { ...s.modelCollection, activeModelId: id },
    epochDisplayRows: epochRowsForId(s, id),
  })),
  on(NeuronalActions.modelEntryUpserted, (s, { entry }): NeuronalState => {
    const existed = s.modelCollection.models.some((m) => m.id === entry.id);
    const nextCol = upsertEntryInCollection(s.modelCollection, entry);
    return {
      ...s,
      modelCollection: nextCol,
      epochDisplayRows: existed ? s.epochDisplayRows : epochRowsForId(s, entry.id),
    };
  }),
  on(NeuronalActions.epochViewSyncFromModel, (s, { modelId }): NeuronalState => {
    if (!modelId) {
      return { ...s, epochDisplayRows: [] };
    }
    const rows = s.epochByModelId[modelId] ?? [];
    return { ...s, epochDisplayRows: [...rows] };
  }),
  on(NeuronalActions.epochHistoryCleared, (s, { modelId }): NeuronalState => {
    const nextBy: Record<string, PersistedEpochRow[]> = { ...s.epochByModelId };
    delete nextBy[modelId];
    const active = s.modelCollection.activeModelId;
    return {
      ...s,
      epochByModelId: nextBy,
      epochDisplayRows: active === modelId ? [] : s.epochDisplayRows,
    };
  }),
  on(NeuronalActions.trainingStarted, (s, a): NeuronalState => ({
    ...s,
    training: {
      ...s.training,
      running: true,
      shouldStop: false,
      pause: false,
      currentRun: a.run,
      currentRunStartedAt: a.runStartedAt,
      currentRunStartedMs: a.runStartedMs,
    },
    epochDisplayRows: epochRowsForId(s, a.modelId),
    modelDropdownOpen: false,
  })),
  on(NeuronalActions.trainingEpochAppended, (s, { modelId, row }): NeuronalState => {
    const epochByModelId = appendEpoch(s.epochByModelId, modelId, row);
    return {
      ...s,
      epochByModelId,
      epochDisplayRows: [...s.epochDisplayRows, row],
    };
  }),
  on(NeuronalActions.trainingFinished, (s, { lastTrainLoss, lastTrainBatchAcc }): NeuronalState => ({
    ...s,
    lastTrainLoss,
    lastTrainBatchAcc,
    training: {
      ...s.training,
      running: false,
      shouldStop: false,
      pause: false,
    },
  })),
  on(NeuronalActions.trainingStopRequested, (s): NeuronalState => ({
    ...s,
    training: { ...s.training, shouldStop: true },
  })),
  on(NeuronalActions.trainingPauseToggled, (s): NeuronalState => ({
    ...s,
    training: { ...s.training, pause: !s.training.pause },
  })),
  on(NeuronalActions.uiModelDropdownToggleRequested, (s): NeuronalState => {
    if (s.training.running) return s;
    if (!s.modelStoreHydrated || s.modelCollection.models.length === 0) return s;
    return { ...s, modelDropdownOpen: !s.modelDropdownOpen };
  }),
  on(NeuronalActions.activeModelFromToolbarRequested, (s): NeuronalState => ({
    ...s,
    modelDropdownOpen: false,
  })),
  on(NeuronalActions.modelDropdownSetOpen, (s, { open }): NeuronalState => ({
    ...s,
    modelDropdownOpen: open,
  })),
  on(NeuronalActions.lastTrainMetricsReset, (s): NeuronalState => ({
    ...s,
    lastTrainLoss: 0,
    lastTrainBatchAcc: 0,
  })),
  on(NeuronalActions.vizInputLayerLayoutChanged, (s, { raw }): NeuronalState => {
    const layout = parseInputLayerVizLayout(raw);
    if (!layout) return s;
    return {
      ...s,
      viz3d: { ...s.viz3d, inputLayerLayout: layout },
    };
  }),
  on(NeuronalActions.vizInputLayerScaleChanged, (s, { scale }): NeuronalState => {
    if (!Number.isFinite(scale)) return s;
    return {
      ...s,
      viz3d: {
        ...s.viz3d,
        inputLayerScale: clampHiddenLayerVizScale(scale),
      },
    };
  }),
  on(NeuronalActions.vizHiddenLayerLayoutChanged, (s, { index, raw }): NeuronalState => {
    const layout = parseHiddenLayerVizLayout(raw);
    if (!layout) return s;
    const nextLayouts: [HiddenLayerVizLayout, HiddenLayerVizLayout] = [
      s.viz3d.hiddenLayerLayouts[0],
      s.viz3d.hiddenLayerLayouts[1],
    ];
    nextLayouts[index] = layout;
    return {
      ...s,
      viz3d: { ...s.viz3d, hiddenLayerLayouts: nextLayouts },
    };
  }),
  on(NeuronalActions.vizHiddenLayerScaleChanged, (s, { index, scale }): NeuronalState => {
    if (!Number.isFinite(scale)) return s;
    const clamped = clampHiddenLayerVizScale(scale);
    const nextScales: [number, number] = [s.viz3d.hiddenLayerScales[0], s.viz3d.hiddenLayerScales[1]];
    nextScales[index] = clamped;
    return {
      ...s,
      viz3d: { ...s.viz3d, hiddenLayerScales: nextScales },
    };
  }),
  on(NeuronalActions.vizActiveNeuronMaxScaleMulChanged, (s, { mul }): NeuronalState => {
    if (!Number.isFinite(mul)) return s;
    return {
      ...s,
      viz3d: {
        ...s.viz3d,
        activeNeuronMaxScaleMul: clampActiveNeuronMaxScaleMul(mul),
      },
    };
  }),
);
