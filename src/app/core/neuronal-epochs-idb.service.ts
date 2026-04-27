import { Injectable } from '@angular/core';
import type { EpochTrackStore, PersistedEpochRow } from './model.types';
import { EPOCH_TRACK_MAX_ROWS_PER_MODEL } from './epoch-storage';
import {
  NEURONAL_IDB_STORE_EPOCH_TRACKS,
  getNeuronalIdb,
  idbRequest,
  idbTransactionDone,
} from './neuronal-indexed-db';

type EpochTrackDoc = {
  modelId: string;
  rows: PersistedEpochRow[];
};

@Injectable({ providedIn: 'root' })
export class NeuronalEpochsIdbService {
  async getEpochsForModel(modelId: string): Promise<PersistedEpochRow[]> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_EPOCH_TRACKS, 'readonly');
    const os = tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS);
    const doc = await idbRequest<EpochTrackDoc | undefined>(os.get(modelId));
    return doc?.rows ?? [];
  }

  async setEpochsForModel(modelId: string, rows: PersistedEpochRow[]): Promise<void> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_EPOCH_TRACKS, 'readwrite');
    const os = tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS);
    await idbRequest(os.put({ modelId, rows }));
    await idbTransactionDone(tx);
  }

  async appendEpoch(modelId: string, row: PersistedEpochRow): Promise<void> {
    const rows = await this.getEpochsForModel(modelId);
    rows.push(row);
    const trimmed = rows.slice(-EPOCH_TRACK_MAX_ROWS_PER_MODEL);
    await this.setEpochsForModel(modelId, trimmed);
  }

  async deleteEpochTrack(modelId: string): Promise<void> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_EPOCH_TRACKS, 'readwrite');
    const os = tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS);
    await idbRequest(os.delete(modelId));
    await idbTransactionDone(tx);
  }

  async listModelIdsWithEpochTracks(): Promise<string[]> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_EPOCH_TRACKS, 'readonly');
    const os = tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS);
    const keys = await idbRequest<IDBValidKey[]>(os.getAllKeys());
    return keys.map((k) => String(k));
  }

  async epochTrackCount(): Promise<number> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_EPOCH_TRACKS, 'readonly');
    const os = tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS);
    return idbRequest<number>(os.count());
  }

  async loadEpochStore(): Promise<EpochTrackStore> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_EPOCH_TRACKS, 'readonly');
    const os = tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS);
    const docs = await idbRequest<EpochTrackDoc[]>(os.getAll());
    const byModelId: Record<string, PersistedEpochRow[]> = {};
    for (const d of docs) {
      byModelId[d.modelId] = [...d.rows];
    }
    return { version: 1, byModelId };
  }

  async saveEpochStore(epochStore: EpochTrackStore): Promise<void> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_EPOCH_TRACKS, 'readwrite');
    const os = tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS);
    const existingKeys = await idbRequest<IDBValidKey[]>(os.getAllKeys());
    const nextIds = new Set(Object.keys(epochStore.byModelId));
    for (const key of existingKeys) {
      const sid = String(key);
      if (!nextIds.has(sid)) {
        await idbRequest(os.delete(key));
      }
    }
    for (const [modelId, rows] of Object.entries(epochStore.byModelId)) {
      await idbRequest(os.put({ modelId, rows }));
    }
    await idbTransactionDone(tx);
  }
}
