export const NEURONAL_IDB_NAME = 'neuronal3d';
export const NEURONAL_IDB_VERSION = 1;
export const NEURONAL_IDB_STORE_MODELS = 'models';
export const NEURONAL_IDB_STORE_EPOCH_TRACKS = 'epochTracks';
export const NEURONAL_IDB_STORE_META = 'meta';
export const NEURONAL_IDB_META_KEY_ACTIVE_MODEL = 'activeModelId';

let dbPromise: Promise<IDBDatabase> | null = null;

export function getNeuronalIdb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(NEURONAL_IDB_NAME, NEURONAL_IDB_VERSION);
      req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
      req.onsuccess = () => resolve(req.result);
      req.onupgradeneeded = () => {
        const db = req.result;
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
