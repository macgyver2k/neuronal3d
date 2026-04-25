import type { Mat } from "./matrix.js";
import {
  colVecFromMat,
  matAdd,
  matMul,
  matScale,
  matSubInPlace,
  randnMat,
  transpose,
  zeros,
} from "./matrix.js";
import { leakyRelu, leakyReluGrad, softmax, softmaxCrossEntropyGrad } from "./activations.js";

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

  forward(xCol: Mat): ForwardResult {
    const layers: LayerCache[] = [];
    let a = xCol;
    for (let L = 0; L < this.weights.length - 1; L++) {
      const z = matAdd(matMul(this.weights[L], a), this.biases[L]);
      const an = leakyRelu(z);
      layers.push({ z, a: an });
      a = an;
    }
    const Llast = this.weights.length - 1;
    const logits = matAdd(matMul(this.weights[Llast], a), this.biases[Llast]);
    const prob = softmax(logits);
    layers.push({ z: logits, a: prob });
    return { layers, logits, prob };
  }

  crossEntropyLoss(prob: Mat, yOneHot: Mat): number {
    let s = 0;
    for (let i = 0; i < prob.length; i++) {
      const p = Math.max(prob[i][0], 1e-12);
      s -= yOneHot[i][0] * Math.log(p);
    }
    return s;
  }

  backward(
    xCol: Mat,
    yOneHot: Mat,
    fwd: ForwardResult,
  ): { dW: Mat[]; db: Mat[] } {
    const dW: Mat[] = this.weights.map((w) => zeros(w.length, w[0].length));
    const db: Mat[] = this.biases.map((b) => zeros(b.length, b[0].length));
    const Ln = this.weights.length - 1;
    let delta = softmaxCrossEntropyGrad(fwd.prob, yOneHot);
    let aPrev = Ln === 0 ? xCol : fwd.layers[Ln - 1].a;
    this.accumGradOuter(delta, aPrev, dW[Ln], db[Ln]);
    for (let L = Ln - 1; L >= 0; L--) {
      delta = matMul(transpose(this.weights[L + 1]), delta);
      const rg = leakyReluGrad(fwd.layers[L].z);
      for (let i = 0; i < delta.length; i++) {
        for (let j = 0; j < delta[0].length; j++) delta[i][j] *= rg[i][j];
      }
      aPrev = L === 0 ? xCol : fwd.layers[L - 1].a;
      this.accumGradOuter(delta, aPrev, dW[L], db[L]);
    }
    return { dW, db };
  }

  accumGradOuter(deltaCol: Mat, aPrevCol: Mat, dW: Mat, db: Mat): void {
    const rows = deltaCol.length;
    const cols = aPrevCol.length;
    for (let i = 0; i < rows; i++) {
      const di = deltaCol[i][0];
      db[i][0] += di;
      for (let j = 0; j < cols; j++) dW[i][j] += di * aPrevCol[j][0];
    }
  }

  applyGradients(dW: Mat[], db: Mat[], lr: number, batchSize: number): void {
    const inv = 1 / batchSize;
    for (let L = 0; L < this.weights.length; L++) {
      matSubInPlace(this.weights[L], matScale(dW[L], inv), lr);
      matSubInPlace(this.biases[L], matScale(db[L], inv), lr);
    }
  }

  predictClass(prob: Mat): number {
    let best = 0;
    let bestv = prob[0][0];
    for (let i = 1; i < prob.length; i++) {
      if (prob[i][0] > bestv) {
        bestv = prob[i][0];
        best = i;
      }
    }
    return best;
  }
}

export function activationSlices(xCol: Mat, fwd: ForwardResult): number[][] {
  const s: number[][] = [colVecFromMat(xCol)];
  for (const lc of fwd.layers) s.push(colVecFromMat(lc.a));
  return s;
}
