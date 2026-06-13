import type { StoredModel } from '../app/core/model.types';

export type NeuronalInferWorkerHostToWorkerMessage =
  | { type: 'syncModel'; storedModel: StoredModel }
  | { type: 'infer'; requestId: number; pixels: number[] };

export type NeuronalInferWorkerWorkerToHostMessage =
  | { type: 'inferWorkerReady' }
  | {
      type: 'inferResult';
      requestId: number;
      predictedDigit: number;
      activations: number[][];
      prob: number[];
      invalidProb: boolean;
    }
  | { type: 'inferFailed'; requestId: number; message: string };
