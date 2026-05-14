import type { StoredModel } from '../app/core/model.types';
import type {
  MnistTrainingRowMajor,
  TrainConfig,
  TrainEpochSummary,
  TrainingRunLastBatch,
  TrainSnapshot,
} from '../train/trainer';

export type NeuronalTrainWorkerHostToWorkerMessage =
  | {
      type: 'trainRun';
      storedModel: StoredModel;
      trainingRows: MnistTrainingRowMajor;
      trainConfig: TrainConfig;
    }
  | { type: 'trainControl'; pause: boolean; stop: boolean };

export type NeuronalTrainWorkerWorkerToHostMessage =
  | { type: 'trainWorkerReady' }
  | ({ type: 'trainSnapshot' } & TrainSnapshot & { weights: number[][][] })
  | { type: 'trainEpochEnd'; summary: TrainEpochSummary }
  | {
      type: 'trainFinished';
      runMetrics: TrainingRunLastBatch;
      storedModel: StoredModel;
    }
  | { type: 'trainFailed'; message: string };
