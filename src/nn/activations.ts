import type { Mat } from "./matrix";
import { zeros } from "./matrix";

export function leakyRelu(z: Mat, alpha = 0.01): Mat {
  const r = zeros(z.length, z[0].length);
  for (let i = 0; i < z.length; i++) {
    for (let j = 0; j < z[0].length; j++) r[i][j] = z[i][j] > 0 ? z[i][j] : alpha * z[i][j];
  }
  return r;
}

export function leakyReluGrad(z: Mat, alpha = 0.01): Mat {
  const r = zeros(z.length, z[0].length);
  for (let i = 0; i < z.length; i++) {
    for (let j = 0; j < z[0].length; j++) r[i][j] = z[i][j] > 0 ? 1 : alpha;
  }
  return r;
}

export function softmax(z: Mat): Mat {
  const zr = z.length;
  const zc = z[0].length;
  const r = zeros(zr, zc);
  for (let j = 0; j < zc; j++) {
    let max = -Infinity;
    for (let i = 0; i < zr; i++) {
      const zij = Number.isFinite(z[i][j]) ? z[i][j] : 0;
      if (zij > max) max = zij;
    }
    if (!Number.isFinite(max)) max = 0;
    const exps: number[] = new Array(zr);
    let sum = 0;
    for (let i = 0; i < zr; i++) {
      const zij = Number.isFinite(z[i][j]) ? z[i][j] : 0;
      const shifted = Math.max(-60, Math.min(60, zij - max));
      const e = Math.exp(shifted);
      exps[i] = e;
      sum += e;
    }
    if (!Number.isFinite(sum) || sum <= 0) {
      const uniform = 1 / Math.max(1, zr);
      for (let i = 0; i < zr; i++) r[i][j] = uniform;
    } else {
      for (let i = 0; i < zr; i++) r[i][j] = exps[i]! / sum;
    }
  }
  return r;
}

export function softmaxCrossEntropyGrad(prob: Mat, yOneHot: Mat): Mat {
  const r = zeros(prob.length, prob[0].length);
  for (let i = 0; i < prob.length; i++) {
    for (let j = 0; j < prob[0].length; j++) r[i][j] = prob[i][j] - yOneHot[i][j];
  }
  return r;
}
