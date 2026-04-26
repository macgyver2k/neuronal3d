import type { MnistSample } from "../data/mnist";
import { batchIndices, shuffleInPlace } from "../data/mnist";
import { zeros } from "../nn/matrix";
import { activationSlices, MLP } from "../nn/network";

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

export async function trainLoop(
  net: MLP,
  data: MnistSample[],
  cfg: TrainConfig,
  onSnapshot: (s: TrainSnapshot) => void,
  onEpochEnd: (s: TrainEpochSummary) => void,
  isPaused: () => boolean,
  shouldStop: () => boolean,
): Promise<void> {
  const idx = data.map((_, i) => i);
  for (let e = 0; e < cfg.epochs; e++) {
    shuffleInPlace(idx);
    const batches = batchIndices(data.length, cfg.batchSize);
    let batchCounter = 0;
    let epochLossSum = 0;
    let epochCorrect = 0;
    let epochSeen = 0;
    for (const bi of batches) {
      while (isPaused() && !shouldStop()) {
        await sleep(50);
      }
      if (shouldStop()) return;
      const bs = bi.length;
      const X = zeros(net.inputDim, bs);
      const Y = zeros(net.outputDim, bs);
      const labels: number[] = new Array(bs);
      for (let k = 0; k < bs; k++) {
        const s = data[idx[bi[k]!]];
        labels[k] = s.label;
        for (let i = 0; i < net.inputDim; i++) X[i][k] = s.pixels[i];
        Y[s.label][k] = 1;
      }
      const fwd = net.forward(X);
      const meanBatchLoss = net.crossEntropyLoss(fwd.prob, Y);
      const loss = meanBatchLoss;
      const correct = net.countCorrectInBatch(fwd.prob, labels);
      const { dW, db } = net.backward(X, Y, fwd);
      const lastActs = activationSlices(X, fwd, bs - 1);
      net.applyGradients(dW, db, cfg.lr, bs);
      const trainAccBatch = correct / bs;
      epochLossSum += meanBatchLoss * bs;
      epochCorrect += correct;
      epochSeen += bs;
      if (batchCounter % cfg.vizEveryNBatches === 0) {
        onSnapshot({
          epoch: e,
          batchIndex: batchCounter,
          loss,
          trainAccBatch,
          activations: lastActs,
        });
      }
      batchCounter += 1;
      await sleep(0);
    }
    onEpochEnd({
      epoch: e,
      loss: epochLossSum / Math.max(1, epochSeen),
      trainAcc: epochCorrect / Math.max(1, epochSeen),
    });
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
