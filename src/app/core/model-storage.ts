import {
  type StoredModel,
  type StoredModelCollection,
  EXPECTED_LAYER_HIDDEN,
  INPUT_DIM,
  OUTPUT_DIM,
} from "./model.types";

const MODEL_STORAGE_KEY_V1 = "neuronal3d:model:v1";
const MODEL_STORAGE_KEY_V2 = "neuronal3d:models:v2";

function modelMatchesExpectedLayout(data: StoredModel): boolean {
  return (
    data.version === 1 &&
    data.inputDim === INPUT_DIM &&
    data.outputDim === OUTPUT_DIM &&
    data.hidden.length === EXPECTED_LAYER_HIDDEN.length &&
    data.hidden.every((v, i) => v === EXPECTED_LAYER_HIDDEN[i])
  );
}

function saveModelStoreToStorageInternalSync(store: StoredModelCollection): void {
  localStorage.setItem(MODEL_STORAGE_KEY_V2, JSON.stringify(store));
}

export function runDeferredStorageWrite(run: () => void): void {
  const w = globalThis as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(() => run(), { timeout: 3000 });
    return;
  }
  setTimeout(run, 0);
}

export function saveModelStoreToStorage(store: StoredModelCollection): Promise<void> {
  return new Promise((resolve) => {
    runDeferredStorageWrite(() => {
      saveModelStoreToStorageInternalSync(store);
      resolve();
    });
  });
}

export function loadModelStoreFromStorage(): StoredModelCollection {
  const rawV2 = localStorage.getItem(MODEL_STORAGE_KEY_V2);
  if (rawV2) {
    const parsed = JSON.parse(rawV2) as StoredModelCollection;
    if (parsed.version === 2 && Array.isArray(parsed.models)) return parsed;
  }
  const rawV1 = localStorage.getItem(MODEL_STORAGE_KEY_V1);
  if (rawV1) {
    const legacy = JSON.parse(rawV1) as StoredModel;
    if (!modelMatchesExpectedLayout(legacy)) return { version: 2, activeModelId: null, models: [] };
    const now = new Date().toISOString();
    const migrated: StoredModelCollection = {
      version: 2,
      activeModelId: "legacy-v1",
      models: [
        {
          id: "legacy-v1",
          name: "Migriertes Modell",
          createdAt: now,
          updatedAt: now,
          model: legacy,
          metrics: {
            lastLoss: 0,
            lastBatchAcc: 0,
            testAcc: null,
            errorRate: null,
            epochsTrained: 0,
          },
        },
      ],
    };
    saveModelStoreToStorageInternalSync(migrated);
    return migrated;
  }
  return { version: 2, activeModelId: null, models: [] };
}

export { modelMatchesExpectedLayout };
