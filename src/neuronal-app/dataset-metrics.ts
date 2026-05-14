import type { MnistSample } from '../data/mnist';
import { yieldToMain } from '../data/mnist';
import { matFromColVec } from '../nn/matrix';
import type { MLP } from '../nn/network';
import { METRICS_YIELD_EVERY } from './constants';

export async function computeDatasetMetrics(
  model: MLP,
  data: MnistSample[],
): Promise<{ accuracy: number; errorRate: number; loss: number } | null> {
  if (data.length === 0) return null;
  let lossSum = 0;
  let correct = 0;
  for (let i = 0; i < data.length; i++) {
    const s = data[i]!;
    const x = matFromColVec(s.pixels);
    const fwd = model.forward(x);
    const y = new Array<number>(10).fill(0);
    y[s.label] = 1;
    lossSum += model.crossEntropyLoss(fwd.prob, matFromColVec(y));
    if (model.predictClass(fwd.prob) === s.label) correct += 1;
    if (i > 0 && i % METRICS_YIELD_EVERY === 0) {
      await yieldToMain();
    }
  }
  const accuracy = correct / data.length;
  return { accuracy, errorRate: 1 - accuracy, loss: lossSum / data.length };
}
