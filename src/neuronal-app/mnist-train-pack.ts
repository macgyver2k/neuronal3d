import type { MnistSample } from '../data/mnist';
import type { MnistTrainingRowMajor } from '../train/trainer';

export type MnistTrainPackResult = {
  trainingRows: MnistTrainingRowMajor;
  transferables: Transferable[];
};

export const packMnistTrainForTransfer = (
  samples: readonly MnistSample[],
  inputDim: number,
): MnistTrainPackResult => {
  const rowCount = samples.length;
  const labels = new Uint8Array(rowCount);
  const pixels = new Float32Array(rowCount * inputDim);
  for (let row = 0; row < rowCount; row++) {
    const sample = samples[row]!;
    labels[row] = sample.label;
    if (sample.pixels.length !== inputDim) {
      throw new Error(`MNIST-Pack: erwartet ${inputDim} Pixel pro Zeile`);
    }
    pixels.set(sample.pixels, row * inputDim);
  }
  return {
    trainingRows: {
      kind: 'rowMajor',
      rowCount,
      inputDim,
      labels,
      pixels,
    },
    transferables: [labels.buffer, pixels.buffer],
  };
};
