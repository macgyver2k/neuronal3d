import { Injectable } from '@angular/core';
import type { StoredModelCollection, StoredModelEntry } from './model.types';
import {
  NEURONAL_IDB_META_KEY_ACTIVE_MODEL,
  NEURONAL_IDB_STORE_META,
  NEURONAL_IDB_STORE_MODELS,
  getNeuronalIdb,
  idbRequest,
  idbTransactionDone,
} from './neuronal-indexed-db';
import { loadModelStoreFromStorage } from './model-storage';

type MetaActiveModelRecord = {
  key: string;
  value: string | null;
};

@Injectable({ providedIn: 'root' })
export class NeuronalModelsIdbService {
  async listModels(): Promise<StoredModelEntry[]> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_MODELS, 'readonly');
    const store = tx.objectStore(NEURONAL_IDB_STORE_MODELS);
    return idbRequest<StoredModelEntry[]>(store.getAll());
  }

  async getModel(id: string): Promise<StoredModelEntry | undefined> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_MODELS, 'readonly');
    const store = tx.objectStore(NEURONAL_IDB_STORE_MODELS);
    const row = await idbRequest<StoredModelEntry | undefined>(store.get(id));
    return row ?? undefined;
  }

  async upsertModel(entry: StoredModelEntry): Promise<void> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_MODELS, 'readwrite');
    const store = tx.objectStore(NEURONAL_IDB_STORE_MODELS);
    await idbRequest(store.put(entry));
  }

  async deleteModel(id: string): Promise<void> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_MODELS, 'readwrite');
    const store = tx.objectStore(NEURONAL_IDB_STORE_MODELS);
    await idbRequest(store.delete(id));
  }

  async modelCount(): Promise<number> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_MODELS, 'readonly');
    const store = tx.objectStore(NEURONAL_IDB_STORE_MODELS);
    return idbRequest<number>(store.count());
  }

  async getActiveModelId(): Promise<string | null> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_META, 'readonly');
    const store = tx.objectStore(NEURONAL_IDB_STORE_META);
    const row = await idbRequest<MetaActiveModelRecord | undefined>(
      store.get(NEURONAL_IDB_META_KEY_ACTIVE_MODEL),
    );
    return row?.value ?? null;
  }

  async setActiveModelId(id: string | null): Promise<void> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(NEURONAL_IDB_STORE_META, 'readwrite');
    const store = tx.objectStore(NEURONAL_IDB_STORE_META);
    await idbRequest(
      store.put({
        key: NEURONAL_IDB_META_KEY_ACTIVE_MODEL,
        value: id,
      } satisfies MetaActiveModelRecord),
    );
  }

  async loadCollection(): Promise<StoredModelCollection> {
    const [models, activeModelId] = await Promise.all([
      this.listModels(),
      this.getActiveModelId(),
    ]);
    return {
      version: 3,
      activeModelId,
      models,
    };
  }

  async loadCollectionWithLocalStorageFallback(): Promise<StoredModelCollection> {
    const fromIdb = await this.loadCollection();
    if (fromIdb.models.length > 0) return fromIdb;
    const fromLs = loadModelStoreFromStorage();
    if (fromLs.models.length === 0) return fromIdb;
    await this.saveCollection(fromLs);
    return fromLs;
  }

  async saveCollection(collection: StoredModelCollection): Promise<void> {
    const db = await getNeuronalIdb();
    const tx = db.transaction(
      [NEURONAL_IDB_STORE_MODELS, NEURONAL_IDB_STORE_META],
      'readwrite',
    );
    const modelsStore = tx.objectStore(NEURONAL_IDB_STORE_MODELS);
    const metaStore = tx.objectStore(NEURONAL_IDB_STORE_META);
    const existingKeys = await idbRequest<IDBValidKey[]>(modelsStore.getAllKeys());
    const nextIds = new Set(collection.models.map((m) => m.id));
    for (const key of existingKeys) {
      const sid = String(key);
      if (!nextIds.has(sid)) {
        await idbRequest(modelsStore.delete(key));
      }
    }
    for (const m of collection.models) {
      await idbRequest(modelsStore.put(m));
    }
    await idbRequest(
      metaStore.put({
        key: NEURONAL_IDB_META_KEY_ACTIVE_MODEL,
        value: collection.activeModelId,
      } satisfies MetaActiveModelRecord),
    );
    await idbTransactionDone(tx);
  }
}
