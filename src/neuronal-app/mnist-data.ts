import type { MnistSample } from '../data/mnist';

let trainData: MnistSample[] = [];
let testData: MnistSample[] = [];

export function getMnistTrainSampleCount(): number {
  return trainData.length;
}

export function getMnistTrainSampleAt(index: number): MnistSample | null {
  if (!Number.isFinite(index)) return null;
  const i = Math.floor(index);
  if (i < 0 || i >= trainData.length) return null;
  return trainData[i]!;
}

export function getMnistTrainDataRef(): MnistSample[] {
  return trainData;
}

export function getMnistTestDataRef(): MnistSample[] {
  return testData;
}

export function setMnistRuntimeDatasets(
  train: MnistSample[],
  test: MnistSample[],
): void {
  trainData = train;
  testData = test;
}
