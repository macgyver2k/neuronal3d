import type { StoredModel } from '../app/core/model.types';
import type {
  NeuronalInferWorkerHostToWorkerMessage,
  NeuronalInferWorkerWorkerToHostMessage,
} from './neuronal-infer-worker.protocol';

export type InferWorkerOutcome = {
  predictedDigit: number;
  activations: number[][];
  prob: number[];
  invalidProb: boolean;
};

export class NeuronalInferWorkerHost {
  private worker: Worker | null = null;

  private ready = false;

  private nextRequestId = 0;

  private latestLiveRequestId = 0;

  private readonly pendingByRequestId = new Map<
    number,
    {
      resolve: (outcome: InferWorkerOutcome) => void;
      reject: (error: Error) => void;
    }
  >();

  private readonly onMessage = (
    event: MessageEvent<NeuronalInferWorkerWorkerToHostMessage>,
  ): void => {
    const message = event.data;
    if (!message || typeof message !== 'object') return;
    switch (message.type) {
      case 'inferWorkerReady': {
        this.ready = true;
        return;
      }
      case 'inferResult': {
        const pending = this.pendingByRequestId.get(message.requestId);
        this.pendingByRequestId.delete(message.requestId);
        pending?.resolve({
          predictedDigit: message.predictedDigit,
          activations: message.activations,
          prob: message.prob,
          invalidProb: message.invalidProb,
        });
        return;
      }
      case 'inferFailed': {
        const pending = this.pendingByRequestId.get(message.requestId);
        this.pendingByRequestId.delete(message.requestId);
        pending?.reject(new Error(message.message));
        return;
      }
      default:
        return;
    }
  };

  async whenReady(): Promise<void> {
    if (this.worker) return;
    const worker = new Worker(
      new URL('./neuronal-infer.worker.ts', import.meta.url),
      { type: 'module', name: 'neuronal-infer' },
    );
    this.worker = worker;
    worker.addEventListener('message', this.onMessage);
    await new Promise<void>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        reject(new Error('Infer-Worker: Timeout beim Start'));
      }, 20000);
      const onReady = (
        messageEvent: MessageEvent<NeuronalInferWorkerWorkerToHostMessage>,
      ): void => {
        if (messageEvent.data?.type === 'inferWorkerReady') {
          window.clearTimeout(timeoutId);
          worker.removeEventListener('message', onReady);
          resolve();
        }
      };
      worker.addEventListener('message', onReady);
    });
  }

  isReady(): boolean {
    return this.ready && this.worker !== null;
  }

  syncModel(storedModel: StoredModel): void {
    this.worker?.postMessage({
      type: 'syncModel',
      storedModel,
    } satisfies NeuronalInferWorkerHostToWorkerMessage);
  }

  inferAsync(
    pixels: number[],
    opts?: { live?: boolean },
  ): Promise<InferWorkerOutcome> {
    if (!this.worker) {
      return Promise.reject(new Error('Infer-Worker nicht gestartet'));
    }
    const requestId = ++this.nextRequestId;
    if (opts?.live === true) this.latestLiveRequestId = requestId;
    return new Promise((resolve, reject) => {
      this.pendingByRequestId.set(requestId, {
        resolve: (outcome) => {
          if (opts?.live === true && requestId !== this.latestLiveRequestId) {
            return;
          }
          resolve(outcome);
        },
        reject: (error) => {
          if (opts?.live === true && requestId !== this.latestLiveRequestId) {
            return;
          }
          reject(error);
        },
      });
      this.worker!.postMessage({
        type: 'infer',
        requestId,
        pixels,
      } satisfies NeuronalInferWorkerHostToWorkerMessage);
    });
  }

  destroy(): void {
    this.pendingByRequestId.clear();
    this.worker?.removeEventListener('message', this.onMessage);
    this.worker?.terminate();
    this.worker = null;
    this.ready = false;
  }
}
