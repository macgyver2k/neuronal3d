import type { EpochTrackStore, PersistedEpochRow } from "./model.types";

const EPOCH_TRACK_STORAGE_KEY = "neuronal3d:epochTrack:v1";

export const EPOCH_TRACK_MAX_ROWS_PER_MODEL = 500;

export function loadEpochTrackStoreFromStorage(): EpochTrackStore {
  try {
    const raw = localStorage.getItem(EPOCH_TRACK_STORAGE_KEY);
    if (!raw) return { version: 1, byModelId: {} };
    const p = JSON.parse(raw) as EpochTrackStore;
    if (p.version !== 1 || typeof p.byModelId !== "object" || p.byModelId === null) {
      return { version: 1, byModelId: {} };
    }
    const byModelId: Record<string, PersistedEpochRow[]> = {};
    for (const [id, arr] of Object.entries(p.byModelId)) {
      if (!Array.isArray(arr)) continue;
      const norm: PersistedEpochRow[] = [];
      for (const x of arr) {
        if (!x || typeof x !== "object") continue;
        const o = x as Record<string, unknown>;
        if (
          typeof o["epoch"] !== "number" ||
          typeof o["loss"] !== "number" ||
          typeof o["trainAcc"] !== "number"
        ) {
          continue;
        }
        norm.push({
          epoch: o["epoch"] as number,
          loss: o["loss"] as number,
          trainAcc: o["trainAcc"] as number,
          savedAt: typeof o["savedAt"] === "string" ? (o["savedAt"] as string) : "",
          run: typeof o["run"] === "number" ? (o["run"] as number) : 0,
          runStartedAt: typeof o["runStartedAt"] === "string" ? (o["runStartedAt"] as string) : "",
          runElapsedMs: typeof o["runElapsedMs"] === "number" ? (o["runElapsedMs"] as number) : 0,
        });
      }
      byModelId[id] = norm;
    }
    return { version: 1, byModelId };
  } catch {
    return { version: 1, byModelId: {} };
  }
}

export function saveEpochTrackStoreToStorageSync(store: EpochTrackStore): void {
  try {
    localStorage.setItem(EPOCH_TRACK_STORAGE_KEY, JSON.stringify(store));
  } catch {
  }
}

export function saveEpochTrackStoreToStorage(store: EpochTrackStore): Promise<void> {
  saveEpochTrackStoreToStorageSync(store);
  return Promise.resolve();
}
