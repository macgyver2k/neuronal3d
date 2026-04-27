import type {
  EpochTrackStore,
  StoredModelCollection,
  StoredModelEntry,
  StoredModelMetrics,
} from "./model.types";
import { loadModelStoreFromStorage, modelMatchesExpectedLayout, saveModelStoreToStorageSync } from "./model-storage";
import { normalizeEpochTrackStore, saveEpochTrackStoreToStorageSync } from "./epoch-storage";

const PRETRAINED_MODELS_URL = "pretrained/models.json";
const PRETRAINED_EPOCHS_URL = "pretrained/epochs.json";

function isLocalModelStoreWithoutModels(): boolean {
  return loadModelStoreFromStorage().models.length === 0;
}

function parseMetrics(raw: unknown): StoredModelMetrics | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Record<string, unknown>;
  if (typeof m["lastLoss"] !== "number") return null;
  if (typeof m["lastBatchAcc"] !== "number") return null;
  const testAcc = m["testAcc"];
  if (testAcc !== null && typeof testAcc !== "number") return null;
  const errorRate = m["errorRate"];
  if (errorRate !== null && typeof errorRate !== "number") return null;
  if (typeof m["epochsTrained"] !== "number") return null;
  return {
    lastLoss: m["lastLoss"],
    lastBatchAcc: m["lastBatchAcc"],
    testAcc: testAcc as number | null,
    errorRate: errorRate as number | null,
    epochsTrained: m["epochsTrained"],
  };
}

function parseModelEntry(raw: unknown): StoredModelEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o["id"] !== "string" || o["id"].length === 0) return null;
  if (typeof o["name"] !== "string") return null;
  if (typeof o["createdAt"] !== "string") return null;
  if (typeof o["updatedAt"] !== "string") return null;
  const model = o["model"];
  if (!model || typeof model !== "object" || !modelMatchesExpectedLayout(model as never)) return null;
  const metrics = parseMetrics(o["metrics"]);
  if (!metrics) return null;
  return {
    id: o["id"],
    name: o["name"],
    createdAt: o["createdAt"],
    updatedAt: o["updatedAt"],
    model: model as StoredModelEntry["model"],
    metrics,
  };
}

function parseModelCollection(data: unknown): StoredModelCollection | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  if (o["version"] !== 3) return null;
  if (!Array.isArray(o["models"])) return null;
  const models: StoredModelEntry[] = [];
  for (const item of o["models"]) {
    const entry = parseModelEntry(item);
    if (!entry) return null;
    models.push(entry);
  }
  const activeModelId = o["activeModelId"];
  if (activeModelId !== null && typeof activeModelId !== "string") return null;
  if (activeModelId !== null && !models.some((m) => m.id === activeModelId)) return null;
  return {
    version: 3,
    activeModelId: activeModelId as string | null,
    models,
  };
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return (await r.json()) as unknown;
  } catch {
    return null;
  }
}

export type PretrainedBundle = {
  modelCollection: StoredModelCollection;
  epochStore: EpochTrackStore;
};

async function loadPretrainedBundleFromNetwork(): Promise<PretrainedBundle | null> {
  const rawModels = await fetchJson(PRETRAINED_MODELS_URL);
  const col = parseModelCollection(rawModels);
  if (!col) return null;
  const rawEpochs = await fetchJson(PRETRAINED_EPOCHS_URL);
  const epochStore = normalizeEpochTrackStore(rawEpochs) ?? { version: 1, byModelId: {} };
  return { modelCollection: col, epochStore };
}

export async function ensurePretrainedInLocalStorage(): Promise<void> {
  if (!isLocalModelStoreWithoutModels()) return;
  const bundle = await loadPretrainedBundleFromNetwork();
  if (!bundle || bundle.modelCollection.models.length === 0) return;
  saveModelStoreToStorageSync(bundle.modelCollection);
  saveEpochTrackStoreToStorageSync(bundle.epochStore);
}

export async function resetLocalStorageToPretrainedFiles(): Promise<PretrainedBundle | null> {
  const bundle = await loadPretrainedBundleFromNetwork();
  if (!bundle) return null;
  saveModelStoreToStorageSync(bundle.modelCollection);
  saveEpochTrackStoreToStorageSync(bundle.epochStore);
  return bundle;
}
