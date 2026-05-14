import type {
  PersistedEpochRow,
  StoredModelEntry,
} from '../app/core/model.types';
import { NeuronalActions } from '../app/store/neuronal/neuronal.actions';
import { getMnistTestDataRef, getMnistTrainDataRef } from './mnist-data';
import { RT } from './runtime-state';

export function setStatus(t: string): void {
  RT.appStore.dispatch(NeuronalActions.runtimeStatusPlainSet({ plain: t }));
}

export function publishKernelCaps(): void {
  const trainData = getMnistTrainDataRef();
  const testData = getMnistTestDataRef();
  RT.appStore.dispatch(
    NeuronalActions.runtimeKernelCapsUpdated({
      caps: {
        hasNet: RT.net !== null,
        mnistTrainCount: trainData.length,
        mnistTestCount: testData.length,
      },
    }),
  );
}

export function setModelDropdownOpen(open: boolean): void {
  if (RT.nLatest.modelDropdownOpen === open) return;
  RT.appStore.dispatch(NeuronalActions.modelDropdownSetOpen({ open }));
}

export function applyEpochHistoryToUi(modelId: string | null): void {
  RT.appStore.dispatch(
    NeuronalActions.epochViewSyncFromModel({ modelId: modelId ?? '' }),
  );
}

export function clearEpochHistoryForModel(modelId: string): void {
  RT.appStore.dispatch(NeuronalActions.epochHistoryCleared({ modelId }));
}

export function upsertModelEntry(entry: StoredModelEntry): void {
  RT.appStore.dispatch(NeuronalActions.modelEntryUpserted({ entry }));
}

export function getTrainConfig(): {
  lr: number;
  batchSize: number;
  epochs: number;
  vizEveryNBatches: number;
} {
  const h = RT.nLatest.trainHyperparams;
  return {
    lr: h.lr,
    batchSize: h.batchSize,
    epochs: h.epochs,
    vizEveryNBatches: h.vizEveryNBatches,
  };
}

export function nextRunSeq(
  modelId: string,
  by: Record<string, PersistedEpochRow[]>,
): number {
  const rows = by[modelId] ?? [];
  if (rows.length === 0) return 1;
  let mx = 0;
  for (const r of rows) mx = Math.max(mx, r.run);
  return mx + 1;
}
