import type { MnistSample } from '../data/mnist';
import { batchIndices, shuffleInPlace } from '../data/mnist';
import { zeros } from '../nn/matrix';
import { activationSlices, MLP } from '../nn/network';

export type TrainSnapshot = {
  epoch: number;
  batchIndex: number;
  loss: number;
  trainAccBatch: number;
  activations: number[][];
};

export type TrainEpochSummary = {
  epoch: number;
  loss: number;
  trainAcc: number;
};

export type TrainConfig = {
  lr: number;
  batchSize: number;
  epochs: number;
  vizEveryNBatches: number;
};

export type TrainingRunLastBatch = {
  lastTrainLoss: number;
  lastTrainBatchAcc: number;
};

/** Zeilenweise Pixel: `pixels[zeile * inputDim + i]` */
export type MnistTrainingRowMajor = {
  kind: 'rowMajor';
  rowCount: number;
  inputDim: number;
  labels: Uint8Array;
  pixels: Float32Array;
};

export type MnistTrainingData = MnistSample[] | MnistTrainingRowMajor;

export const mnistTrainRowCount = (data: MnistTrainingData): number =>
  Array.isArray(data) ? data.length : data.rowCount;

export async function trainLoop(
  net: MLP,
  data: MnistTrainingData,
  cfg: TrainConfig,
  onSnapshot: (snapshot: TrainSnapshot) => void,
  onEpochEnd: (summary: TrainEpochSummary) => void,
  isPaused: () => boolean,
  shouldStop: () => boolean,
): Promise<TrainingRunLastBatch> {
  const rowCount = mnistTrainRowCount(data);
  const idx = Array.from({ length: rowCount }, (_, index) => index);
  let lastTrainLoss = 0;
  let lastTrainBatchAcc = 0;
  await sleep(0);
  for (let epoch = 0; epoch < cfg.epochs; epoch++) {
    await sleep(0);
    shuffleInPlace(idx);
    const batches = batchIndices(rowCount, cfg.batchSize);
    let batchCounter = 0;
    let epochLossSum = 0;
    let epochCorrect = 0;
    let epochSeen = 0;
    for (const batchIndexRow of batches) {
      await sleep(0);
      while (isPaused() && !shouldStop()) {
        await sleep(50);
      }
      if (shouldStop()) {
        return { lastTrainLoss, lastTrainBatchAcc };
      }
      const batchSize = batchIndexRow.length;
      const inputDim = net.inputDim;
      const X = zeros(inputDim, batchSize);
      const Y = zeros(net.outputDim, batchSize);
      const labels: number[] = new Array(batchSize);
      for (let column = 0; column < batchSize; column++) {
        const sampleIndex = idx[batchIndexRow[column]!]!;
        if (Array.isArray(data)) {
          const sample = data[sampleIndex]!;
          labels[column] = sample.label;
          for (let row = 0; row < inputDim; row++) {
            X[row][column] = sample.pixels[row]!;
          }
          Y[sample.label][column] = 1;
        } else {
          if (data.inputDim !== inputDim) {
            throw new Error('MNIST rowMajor: inputDim passt nicht zum Netz');
          }
          const label = data.labels[sampleIndex]!;
          labels[column] = label;
          const offset = sampleIndex * inputDim;
          for (let row = 0; row < inputDim; row++) {
            X[row][column] = data.pixels[offset + row]!;
          }
          Y[label][column] = 1;
        }
      }
      const fwd = net.forward(X);
      const meanBatchLoss = net.crossEntropyLoss(fwd.prob, Y);
      const loss = meanBatchLoss;
      const correct = net.countCorrectInBatch(fwd.prob, labels);
      const { dW, db } = net.backward(X, Y, fwd);
      const lastActs = activationSlices(X, fwd, batchSize - 1);
      net.applyGradients(dW, db, cfg.lr, batchSize);
      const trainAccBatch = correct / batchSize;
      lastTrainLoss = loss;
      lastTrainBatchAcc = trainAccBatch;
      epochLossSum += meanBatchLoss * batchSize;
      epochCorrect += correct;
      epochSeen += batchSize;
      if (batchCounter % cfg.vizEveryNBatches === 0) {
        onSnapshot({
          epoch,
          batchIndex: batchCounter,
          loss,
          trainAccBatch,
          activations: lastActs,
        });
      }
      batchCounter += 1;
    }
    onEpochEnd({
      epoch,
      loss: epochLossSum / Math.max(1, epochSeen),
      trainAcc: epochCorrect / Math.max(1, epochSeen),
    });
    await sleep(0);
  }
  return { lastTrainLoss, lastTrainBatchAcc };
}

const sleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
