import type { MnistSample } from "../data/mnist";
import { batchIndices, oneHot, shuffleInPlace } from "../data/mnist";
import { matAccInPlace, matFromColVec, zeros } from "../nn/matrix";
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
      const dW = net.weights.map((w) => zeros(w.length, w[0].length));
      const db = net.biases.map((b) => zeros(b.length, b[0].length));
      let lossSum = 0;
      let correct = 0;
      let lastActs: number[][] = [];
      for (const j of bi) {
        const s = data[idx[j]];
        const x = matFromColVec(s.pixels);
        const y = matFromColVec(oneHot(s.label));
        const fwd = net.forward(x);
        lossSum += net.crossEntropyLoss(fwd.prob, y);
        if (net.predictClass(fwd.prob) === s.label) correct += 1;
        const { dW: gW, db: gb } = net.backward(x, y, fwd);
        for (let L = 0; L < dW.length; L++) {
          matAccInPlace(dW[L], gW[L]);
          matAccInPlace(db[L], gb[L]);
        }
        lastActs = activationSlices(x, fwd);
      }
      const bs = bi.length;
      net.applyGradients(dW, db, cfg.lr, bs);
      const loss = lossSum / bs;
      const trainAccBatch = correct / bs;
      epochLossSum += lossSum;
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
