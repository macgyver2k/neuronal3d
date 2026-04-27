import {
  leakyRelu,
  leakyReluGrad,
  softmax,
  softmaxCrossEntropyGrad,
} from './activations';
import type { Mat } from './matrix';
import {
  colSliceAsVec,
  matMul,
  matMulAddRowBias,
  matScale,
  matSubInPlace,
  matSumBatchColsToCol,
  randnMat,
  transpose,
  zeros,
} from './matrix';

export type LayerCache = {
  z: Mat;
  a: Mat;
};

export type ForwardResult = {
  layers: LayerCache[];
  logits: Mat;
  prob: Mat;
};

export class MLP {
  readonly inputDim: number;
  readonly hidden: number[];
  readonly outputDim: number;
  weights: Mat[];
  biases: Mat[];

  constructor(inputDim: number, hidden: number[], outputDim: number) {
    this.inputDim = inputDim;
    this.hidden = [...hidden];
    this.outputDim = outputDim;
    const dims = [inputDim, ...hidden, outputDim];
    this.weights = [];
    this.biases = [];
    for (let i = 0; i < dims.length - 1; i++) {
      const nIn = dims[i];
      const nOut = dims[i + 1];
      const scale = Math.sqrt(2 / Math.max(1, nIn));
      this.weights.push(randnMat(nOut, nIn, scale));
      this.biases.push(zeros(nOut, 1));
    }
  }

  forward(xBatch: Mat): ForwardResult {
    const layers: LayerCache[] = [];
    let a = xBatch;
    for (let L = 0; L < this.weights.length - 1; L++) {
      const z = matMulAddRowBias(a, this.weights[L], this.biases[L]);
      const an = leakyRelu(z);
      layers.push({ z, a: an });
      a = an;
    }
    const Llast = this.weights.length - 1;
    const logits = matMulAddRowBias(a, this.weights[Llast], this.biases[Llast]);
    const prob = softmax(logits);
    layers.push({ z: logits, a: prob });
    return { layers, logits, prob };
  }

  crossEntropyLoss(prob: Mat, yOneHot: Mat): number {
    const B = prob[0].length;
    let s = 0;
    for (let j = 0; j < B; j++) {
      for (let i = 0; i < prob.length; i++) {
        const p = Math.max(prob[i][j], 1e-12);
        s -= yOneHot[i][j] * Math.log(p);
      }
    }
    return s / B;
  }

  backward(
    xBatch: Mat,
    yOneHot: Mat,
    fwd: ForwardResult,
  ): { dW: Mat[]; db: Mat[] } {
    const dW: Mat[] = this.weights.map((w) => zeros(w.length, w[0].length));
    const db: Mat[] = this.biases.map((b) => zeros(b.length, b[0].length));
    const Ln = this.weights.length - 1;
    let delta = softmaxCrossEntropyGrad(fwd.prob, yOneHot);
    let aPrev = Ln === 0 ? xBatch : fwd.layers[Ln - 1].a;
    dW[Ln] = matMul(delta, transpose(aPrev));
    db[Ln] = matSumBatchColsToCol(delta);
    for (let L = Ln - 1; L >= 0; L--) {
      delta = matMul(transpose(this.weights[L + 1]), delta);
      const rg = leakyReluGrad(fwd.layers[L].z);
      for (let i = 0; i < delta.length; i++) {
        for (let j = 0; j < delta[0].length; j++) delta[i][j] *= rg[i][j];
      }
      aPrev = L === 0 ? xBatch : fwd.layers[L - 1].a;
      dW[L] = matMul(delta, transpose(aPrev));
      db[L] = matSumBatchColsToCol(delta);
    }
    return { dW, db };
  }

  applyGradients(dW: Mat[], db: Mat[], lr: number, batchSize: number): void {
    const inv = 1 / batchSize;
    for (let L = 0; L < this.weights.length; L++) {
      matSubInPlace(this.weights[L], matScale(dW[L], inv), lr);
      matSubInPlace(this.biases[L], matScale(db[L], inv), lr);
    }
  }

  predictClass(prob: Mat, col = 0): number {
    let best = 0;
    let bestv = prob[0][col];
    for (let i = 1; i < prob.length; i++) {
      const v = prob[i][col];
      if (v > bestv) {
        bestv = v;
        best = i;
      }
    }
    return best;
  }

  countCorrectInBatch(prob: Mat, labels: number[]): number {
    const B = prob[0].length;
    let c = 0;
    for (let j = 0; j < B; j++) {
      if (this.predictClass(prob, j) === labels[j]) c += 1;
    }
    return c;
  }
}

export function activationSlices(
  x: Mat,
  fwd: ForwardResult,
  col = 0,
): number[][] {
  const s: number[][] = [colSliceAsVec(x, col)];
  for (const lc of fwd.layers) s.push(colSliceAsVec(lc.a, col));
  return s;
}
