import type { Mat } from "./matrix.js";
import { zeros } from "./matrix.js";

export function relu(z: Mat): Mat {
  const r = zeros(z.length, z[0].length);
  for (let i = 0; i < z.length; i++) {
    for (let j = 0; j < z[0].length; j++) r[i][j] = z[i][j] > 0 ? z[i][j] : 0;
  }
  return r;
}

export function reluGrad(z: Mat): Mat {
  const r = zeros(z.length, z[0].length);
  for (let i = 0; i < z.length; i++) {
    for (let j = 0; j < z[0].length; j++) r[i][j] = z[i][j] > 0 ? 1 : 0;
  }
  return r;
}

export function softmax(z: Mat): Mat {
  let max = -Infinity;
  for (let i = 0; i < z.length; i++) {
    for (let j = 0; j < z[0].length; j++) {
      if (z[i][j] > max) max = z[i][j];
    }
  }
  const exps = zeros(z.length, z[0].length);
  let sum = 0;
  for (let i = 0; i < z.length; i++) {
    for (let j = 0; j < z[0].length; j++) {
      const e = Math.exp(z[i][j] - max);
      exps[i][j] = e;
      sum += e;
    }
  }
  const r = zeros(z.length, z[0].length);
  for (let i = 0; i < z.length; i++) {
    for (let j = 0; j < z[0].length; j++) r[i][j] = exps[i][j] / sum;
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
