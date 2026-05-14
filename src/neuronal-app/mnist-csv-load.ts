import {
  fetchCsvText,
  parseMnistCsvAsync,
  type MnistSample,
} from '../data/mnist';
import { MNIST_LABEL, MNIST_TEST_CSV, MNIST_TRAIN_CSV } from './constants';
import {
  getMnistTestDataRef,
  getMnistTrainDataRef,
  setMnistRuntimeDatasets,
} from './mnist-data';
import { RT } from './runtime-state';
import { publishKernelCaps, setStatus } from './store-dispatch';

export async function loadCsvData(): Promise<void> {
  const trainSources = [MNIST_TRAIN_CSV];
  const testSources = [MNIST_TEST_CSV];
  try {
    setStatus(`${MNIST_LABEL}: Train-CSV wird geladen …`);
    let trainErr = '';
    let loadedTrain: MnistSample[] = [];
    for (const src of trainSources) {
      try {
        const text = await fetchCsvText(src);
        const parsed = await parseMnistCsvAsync(text);
        if (parsed.length === 0) {
          trainErr = 'Train-CSV enthält keine gültigen Zeilen';
          continue;
        }
        loadedTrain = parsed;
        break;
      } catch (e) {
        trainErr = String(e);
      }
    }
    if (loadedTrain.length === 0)
      throw new Error(trainErr || 'Train-CSV konnte nicht geladen werden');
    setMnistRuntimeDatasets(loadedTrain, getMnistTestDataRef());
    setStatus(
      `${MNIST_LABEL}: Train geladen (${getMnistTrainDataRef().length} Zeilen)`,
    );
  } catch (e) {
    setStatus(`${MNIST_LABEL}: Fehler Train-CSV: ${e}`);
    setMnistRuntimeDatasets([], getMnistTestDataRef());
  }
  try {
    setStatus(`${MNIST_LABEL}: Test-CSV wird geladen …`);
    let testErr = '';
    let loadedTest: MnistSample[] = [];
    for (const src of testSources) {
      try {
        const text = await fetchCsvText(src);
        const parsed = await parseMnistCsvAsync(text);
        if (parsed.length === 0) {
          testErr = 'Test-CSV enthält keine gültigen Zeilen';
          continue;
        }
        loadedTest = parsed;
        break;
      } catch (e) {
        testErr = String(e);
      }
    }
    if (loadedTest.length === 0)
      throw new Error(testErr || 'Test-CSV konnte nicht geladen werden');
    setMnistRuntimeDatasets(getMnistTrainDataRef(), loadedTest);
    setStatus(
      `${MNIST_LABEL}: Train ${getMnistTrainDataRef().length} | Test ${loadedTest.length} geladen`,
    );
  } catch (e) {
    setStatus(`${MNIST_LABEL}: Fehler Test-CSV: ${e}`);
    setMnistRuntimeDatasets(getMnistTrainDataRef(), []);
  }
  RT.lastInferSampleIndex = -1;
  publishKernelCaps();
}
