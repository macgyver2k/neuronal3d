export const NEURONAL_IDB_NAME = 'neuronal3d';
export const NEURONAL_IDB_VERSION = 4;
export const NEURONAL_IDB_STORE_MODELS = 'models';
export const NEURONAL_IDB_STORE_EPOCH_TRACKS = 'epochTracks';
export const NEURONAL_IDB_STORE_META = 'meta';
export const NEURONAL_IDB_META_KEY_ACTIVE_MODEL = 'activeModelId';

const META_KEY_DATA_REVISION = 'dataRevision';

export const NEURONAL_DATA_REVISION = 2;

let dbPromise: Promise<IDBDatabase> | null = null;

type MetaKv = { key: string; value: string | null };

async function readDataRevision(db: IDBDatabase): Promise<number> {
  const tx = db.transaction(NEURONAL_IDB_STORE_META, 'readonly');
  const meta = tx.objectStore(NEURONAL_IDB_STORE_META);
  const row = await idbRequest<MetaKv | undefined>(meta.get(META_KEY_DATA_REVISION));
  if (row?.value == null || row.value === '') return 0;
  const n = Number(row.value);
  return Number.isFinite(n) ? n : 0;
}

export async function ensureNeuronalDataLayout(): Promise<void> {
  const db = await getNeuronalIdb();
  const stored = await readDataRevision(db);
  if (stored === NEURONAL_DATA_REVISION) return;
  const tx = db.transaction(
    [NEURONAL_IDB_STORE_MODELS, NEURONAL_IDB_STORE_EPOCH_TRACKS, NEURONAL_IDB_STORE_META],
    'readwrite',
  );
  await idbRequest(tx.objectStore(NEURONAL_IDB_STORE_MODELS).clear());
  await idbRequest(tx.objectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS).clear());
  const meta = tx.objectStore(NEURONAL_IDB_STORE_META);
  await idbRequest(meta.clear());
  await idbRequest(
    meta.put({
      key: NEURONAL_IDB_META_KEY_ACTIVE_MODEL,
      value: null,
    } satisfies MetaKv),
  );
  await idbRequest(
    meta.put({
      key: META_KEY_DATA_REVISION,
      value: String(NEURONAL_DATA_REVISION),
    } satisfies MetaKv),
  );
  await idbTransactionDone(tx);
}

export function getNeuronalIdb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(NEURONAL_IDB_NAME, NEURONAL_IDB_VERSION);
      req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
      req.onsuccess = () => {
        const db = req.result;
        db.onversionchange = () => {
          db.close();
          dbPromise = null;
        };
        resolve(db);
      };
      req.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = req.result;
        if (event.oldVersion < 4) {
          for (const name of [
            NEURONAL_IDB_STORE_MODELS,
            NEURONAL_IDB_STORE_EPOCH_TRACKS,
            NEURONAL_IDB_STORE_META,
          ]) {
            if (db.objectStoreNames.contains(name)) {
              db.deleteObjectStore(name);
            }
          }
        }
        if (!db.objectStoreNames.contains(NEURONAL_IDB_STORE_MODELS)) {
          db.createObjectStore(NEURONAL_IDB_STORE_MODELS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(NEURONAL_IDB_STORE_EPOCH_TRACKS)) {
          db.createObjectStore(NEURONAL_IDB_STORE_EPOCH_TRACKS, { keyPath: 'modelId' });
        }
        if (!db.objectStoreNames.contains(NEURONAL_IDB_STORE_META)) {
          db.createObjectStore(NEURONAL_IDB_STORE_META, { keyPath: 'key' });
        }
      };
    });
  }
  return dbPromise;
}

export function idbRequest<T>(request: IDBRequest): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as T);
    request.onerror = () => reject(request.error);
  });
}

export function idbTransactionDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.addEventListener('complete', () => resolve());
    tx.addEventListener('error', () =>
      reject(tx.error ?? new Error('IndexedDB transaction failed')),
    );
    tx.addEventListener('abort', () =>
      reject(tx.error ?? new Error('IndexedDB transaction aborted')),
    );
  });
}
