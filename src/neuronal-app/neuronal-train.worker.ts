/// <reference lib="webworker" />

import { trainLoop } from '../train/trainer';
import type {
  NeuronalTrainWorkerHostToWorkerMessage,
  NeuronalTrainWorkerWorkerToHostMessage,
} from './neuronal-train-worker.protocol';
import { applyStoredModelToNet, cloneStoredModel } from './stored-model-utils';

const workerScope = globalThis as unknown as DedicatedWorkerGlobalScope;

let trainPaused = false;

let trainShouldStop = false;

const cloneWeightMatrices = (weights: number[][][]): number[][][] =>
  weights.map((matrix) => matrix.map((row) => [...row]));

const runTrainJob = async (
  message: Extract<
    NeuronalTrainWorkerHostToWorkerMessage,
    { type: 'trainRun' }
  >,
): Promise<void> => {
  try {
    const net = applyStoredModelToNet(message.storedModel);
    const runMetrics = await trainLoop(
      net,
      message.trainingRows,
      message.trainConfig,
      (snapshot) => {
        workerScope.postMessage({
          type: 'trainSnapshot',
          ...snapshot,
          weights: cloneWeightMatrices(net.weights),
        } satisfies NeuronalTrainWorkerWorkerToHostMessage);
      },
      (summary) => {
        workerScope.postMessage({
          type: 'trainEpochEnd',
          summary,
        } satisfies NeuronalTrainWorkerWorkerToHostMessage);
      },
      () => trainPaused,
      () => trainShouldStop,
    );
    workerScope.postMessage({
      type: 'trainFinished',
      runMetrics,
      storedModel: cloneStoredModel(net),
    } satisfies NeuronalTrainWorkerWorkerToHostMessage);
  } catch (error) {
    const messageText = error instanceof Error ? error.message : String(error);
    workerScope.postMessage({
      type: 'trainFailed',
      message: messageText,
    } satisfies NeuronalTrainWorkerWorkerToHostMessage);
  }
};

const handleMessage = (
  event: MessageEvent<NeuronalTrainWorkerHostToWorkerMessage>,
): void => {
  const message = event.data;
  if (!message || typeof message !== 'object') return;
  switch (message.type) {
    case 'trainControl': {
      trainPaused = message.pause;
      trainShouldStop = message.stop;
      break;
    }
    case 'trainRun': {
      trainPaused = false;
      trainShouldStop = false;
      void runTrainJob(message);
      break;
    }
    default:
      break;
  }
};

workerScope.addEventListener('message', handleMessage);

workerScope.postMessage({
  type: 'trainWorkerReady',
} satisfies NeuronalTrainWorkerWorkerToHostMessage);
