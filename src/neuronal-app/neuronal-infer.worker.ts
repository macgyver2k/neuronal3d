/// <reference lib="webworker" />

import { matFromColVec } from '../nn/matrix';
import { activationSlices, MLP } from '../nn/network';
import type {
  NeuronalInferWorkerHostToWorkerMessage,
  NeuronalInferWorkerWorkerToHostMessage,
} from './neuronal-infer-worker.protocol';
import { applyStoredModelToNet } from './stored-model-utils';

const workerScope = globalThis as unknown as DedicatedWorkerGlobalScope;

let net: MLP | null = null;

const runInfer = (requestId: number, pixels: number[]): void => {
  if (!net) {
    workerScope.postMessage({
      type: 'inferFailed',
      requestId,
      message: 'Infer-Worker: kein Modell geladen',
    } satisfies NeuronalInferWorkerWorkerToHostMessage);
    return;
  }
  try {
    const input = matFromColVec(pixels);
    const forward = net.forward(input);
    const predictedDigit = net.predictClass(forward.prob);
    const activations = activationSlices(input, forward);
    const prob = forward.prob.map((row) => row[0]!);
    const invalidProb = prob.some((value) => !Number.isFinite(value));
    workerScope.postMessage({
      type: 'inferResult',
      requestId,
      predictedDigit,
      activations,
      prob,
      invalidProb,
    } satisfies NeuronalInferWorkerWorkerToHostMessage);
  } catch (error) {
    const messageText = error instanceof Error ? error.message : String(error);
    workerScope.postMessage({
      type: 'inferFailed',
      requestId,
      message: messageText,
    } satisfies NeuronalInferWorkerWorkerToHostMessage);
  }
};

const handleMessage = (
  event: MessageEvent<NeuronalInferWorkerHostToWorkerMessage>,
): void => {
  const message = event.data;
  if (!message || typeof message !== 'object') return;
  switch (message.type) {
    case 'syncModel': {
      net = applyStoredModelToNet(message.storedModel);
      break;
    }
    case 'infer': {
      runInfer(message.requestId, message.pixels);
      break;
    }
    default:
      break;
  }
};

workerScope.addEventListener('message', handleMessage);

queueMicrotask(() => {
  workerScope.postMessage({
    type: 'inferWorkerReady',
  } satisfies NeuronalInferWorkerWorkerToHostMessage);
});
