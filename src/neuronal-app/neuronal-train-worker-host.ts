import type { StoredModel } from '../app/core/model.types';
import type { NeuronalState } from '../app/store/neuronal/neuronal.state';
import type { MnistSample } from '../data/mnist';
import type {
  TrainConfig,
  TrainEpochSummary,
  TrainingRunLastBatch,
} from '../train/trainer';
import type {
  NeuronalTrainWorkerHostToWorkerMessage,
  NeuronalTrainWorkerWorkerToHostMessage,
} from './neuronal-train-worker.protocol';

export type NeuronalTrainWorkerRunCallbacks = {
  onSnapshot: (
    message: Extract<
      NeuronalTrainWorkerWorkerToHostMessage,
      { type: 'trainSnapshot' }
    >,
  ) => void;
  onEpochEnd: (summary: TrainEpochSummary) => void;
};

export type NeuronalTrainWorkerRunOutcome = {
  runMetrics: TrainingRunLastBatch;
  storedModel: StoredModel;
};

export class NeuronalTrainWorkerHost {
  private worker: Worker | null = null;

  private busy = false;

  private callbacks: NeuronalTrainWorkerRunCallbacks | null = null;

  private pending: {
    resolve: (outcome: NeuronalTrainWorkerRunOutcome) => void;
    reject: (error: Error) => void;
  } | null = null;

  private lastControl = { pause: false, stop: false };

  private readonly onMessage = (
    event: MessageEvent<NeuronalTrainWorkerWorkerToHostMessage>,
  ): void => {
    const message = event.data;
    if (!message || typeof message !== 'object') return;
    switch (message.type) {
      case 'trainWorkerReady':
        return;
      case 'trainSnapshot':
        this.callbacks?.onSnapshot(message);
        return;
      case 'trainEpochEnd':
        this.callbacks?.onEpochEnd(message.summary);
        return;
      case 'trainFinished': {
        this.busy = false;
        this.callbacks = null;
        this.pending?.resolve({
          runMetrics: message.runMetrics,
          storedModel: message.storedModel,
        });
        this.pending = null;
        return;
      }
      case 'trainFailed': {
        this.busy = false;
        this.callbacks = null;
        const error = new Error(message.message);
        this.pending?.reject(error);
        this.pending = null;
        return;
      }
      default:
        return;
    }
  };

  async whenReady(): Promise<void> {
    if (this.worker) return;
    const worker = new Worker(
      new URL('./neuronal-train.worker.ts', import.meta.url),
      { type: 'module', name: 'neuronal-train' },
    );
    this.worker = worker;
    worker.addEventListener('message', this.onMessage);
    await new Promise<void>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        reject(new Error('Train-Worker: Timeout beim Start'));
      }, 20000);
      const onReady = (
        messageEvent: MessageEvent<NeuronalTrainWorkerWorkerToHostMessage>,
      ): void => {
        if (messageEvent.data?.type === 'trainWorkerReady') {
          window.clearTimeout(timeoutId);
          worker.removeEventListener('message', onReady);
          resolve();
        }
      };
      worker.addEventListener('message', onReady);
    });
  }

  syncControlFromState(previous: NeuronalState, next: NeuronalState): void {
    if (!next.training.running || !this.busy) return;
    const pause = next.training.pause;
    const stop = next.training.shouldStop;
    if (
      previous.training.pause === pause &&
      previous.training.shouldStop === stop
    ) {
      return;
    }
    this.postTrainControl(pause, stop);
  }

  runTrain(
    storedModel: StoredModel,
    samples: MnistSample[],
    trainConfig: TrainConfig,
    callbacks: NeuronalTrainWorkerRunCallbacks,
  ): Promise<NeuronalTrainWorkerRunOutcome> {
    if (!this.worker || this.busy) {
      return Promise.reject(new Error('Train-Worker nicht bereit'));
    }
    this.busy = true;
    this.lastControl = { pause: false, stop: false };
    this.callbacks = callbacks;
    return new Promise((resolve, reject) => {
      this.pending = { resolve, reject };
      this.worker!.postMessage({
        type: 'trainRun',
        storedModel,
        samples,
        trainConfig,
      } satisfies NeuronalTrainWorkerHostToWorkerMessage);
    });
  }

  dispose(): void {
    const worker = this.worker;
    this.worker = null;
    this.busy = false;
    this.callbacks = null;
    if (this.pending) {
      this.pending.reject(new Error('Train-Worker beendet'));
      this.pending = null;
    }
    worker?.removeEventListener('message', this.onMessage);
    worker?.terminate();
  }

  private postTrainControl(pause: boolean, stop: boolean): void {
    if (this.lastControl.pause === pause && this.lastControl.stop === stop) {
      return;
    }
    this.lastControl = { pause, stop };
    this.worker?.postMessage({
      type: 'trainControl',
      pause,
      stop,
    } satisfies NeuronalTrainWorkerHostToWorkerMessage);
  }
}
