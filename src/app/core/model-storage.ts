import {
  type StoredModel,
  type StoredModelCollection,
  EXPECTED_LAYER_HIDDEN,
  INPUT_DIM,
  OUTPUT_DIM,
} from './model.types';

const MODEL_STORAGE_KEY_V2 = 'neuronal3d:models:v3';

function modelMatchesExpectedLayout(data: StoredModel): boolean {
  return (
    data.version === 1 &&
    data.inputDim === INPUT_DIM &&
    data.outputDim === OUTPUT_DIM &&
    data.hidden.length === EXPECTED_LAYER_HIDDEN.length &&
    data.hidden.every((v, i) => v === EXPECTED_LAYER_HIDDEN[i])
  );
}

export function saveModelStoreToStorageSync(
  store: StoredModelCollection,
): void {
  try {
    localStorage.setItem(MODEL_STORAGE_KEY_V2, JSON.stringify(store));
  } catch {}
}

export function saveModelStoreToStorage(
  store: StoredModelCollection,
): Promise<void> {
  saveModelStoreToStorageSync(store);
  return Promise.resolve();
}

export function loadModelStoreFromStorage(): StoredModelCollection {
  const rawV2 = localStorage.getItem(MODEL_STORAGE_KEY_V2);
  if (rawV2) {
    const parsed = JSON.parse(rawV2) as StoredModelCollection;
    if (parsed.version === 3 && Array.isArray(parsed.models)) return parsed;
  }
  return {
    version: 3,
    activeModelId: null,
    models: [],
  };
}

export { modelMatchesExpectedLayout };
