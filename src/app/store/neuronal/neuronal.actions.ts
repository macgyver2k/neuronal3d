import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type {
  VibeCameraProfileId,
  VibeCameraTuning,
} from '../../../viz/vibe-camera-settings';
import type {
  VizLightColorSettings,
  VizNetworkColorSettings,
  VizPostProcessSettings,
  VizSceneColorSettings,
} from '../../../viz/viz-appearance';
import type {
  PersistedEpochRow,
  StoredModelCollection,
  StoredModelEntry,
} from '../../core/model.types';
import type { TrainHyperparams } from '../../core/train-hyperparams';
import type { DaisyUiThemeName } from '../../workspace-ui/daisy-theme';
import type { RuntimeKernelCaps } from './neuronal.state';

export const NeuronalActions = createActionGroup({
  source: 'Neuronal',
  events: {
    'Model Store Load Requested': emptyProps(),
    'Model Store Hydrated': props<{ modelCollection: StoredModelCollection }>(),
    'Epoch Store Hydrated': props<{
      byModelId: Record<string, PersistedEpochRow[]>;
    }>(),
    'Active Model Id From Route Set': props<{ id: string }>(),
    'Active Model Id Set': props<{
      id: string;
      routeModelSegmentFromUrl: string | null;
    }>(),
    'Model Entry Upserted': props<{ entry: StoredModelEntry }>(),
    'Epoch View Sync From Model': props<{ modelId: string }>(),
    'Epoch History Cleared': props<{ modelId: string }>(),
    'Training Started': props<{
      modelId: string;
      run: number;
      runStartedAt: string;
      runStartedMs: number;
    }>(),
    'Training Epoch Appended': props<{
      modelId: string;
      row: PersistedEpochRow;
    }>(),
    'Training Finished': props<{
      lastTrainLoss: number;
      lastTrainBatchAcc: number;
    }>(),
    'Training Stop Requested': emptyProps(),
    'Training Pause Toggled': emptyProps(),
    'Model Dropdown Set Open': props<{ open: boolean }>(),
    'Last Train Metrics Reset': emptyProps(),
    'New Model From List Requested': emptyProps(),
    'New Model From Toolbar Requested': emptyProps(),
    'Active Model From Toolbar Requested': props<{ id: string }>(),
    'Ui Model Dropdown Toggle Requested': emptyProps(),
    'Runtime Status Plain Set': props<{ plain: string }>(),
    'Runtime Kernel Caps Updated': props<{ caps: RuntimeKernelCaps }>(),
    'Train Hyperparams Patch': props<{ patch: Partial<TrainHyperparams> }>(),
    'Ui Train Start Requested': emptyProps(),
    'Ui Export Bundle Requested': emptyProps(),
    'Ui Save As Requested': emptyProps(),
    'Ui Reset Requested': emptyProps(),
    'Ui Infer Random Requested': emptyProps(),
    'Ui Infer Draw Requested': emptyProps(),
    'Ui Clear Draw Requested': emptyProps(),
    'Ui Epoch Preset Requested': props<{ epochs: number }>(),
    'Ui Epochs Input Changed': props<{ raw: string }>(),
    'Ui Batch Size Input Changed': props<{ raw: string }>(),
    'Ui Train Lr Input Changed': props<{ raw: string }>(),
    'Ui Train Viz Every Input Changed': props<{ raw: string }>(),
    'Ui Draw Pointer Down': props<{ event: PointerEvent }>(),
    'Ui Draw Pointer Move': props<{ event: PointerEvent }>(),
    'Ui Draw Pointer Up': emptyProps(),
    'Ui Draw Pointer Cancel': emptyProps(),
    'Ui Draw Pointer Leave': emptyProps(),
    'Viz Input Layer Layout Changed': props<{ raw: string }>(),
    'Viz Input Layer Scale Changed': props<{ scale: number }>(),
    'Viz Hidden Layer Layout Changed': props<{ index: 0 | 1; raw: string }>(),
    'Viz Hidden Layer Scale Changed': props<{ index: 0 | 1; scale: number }>(),
    'Viz Active Neuron Max Scale Mul Changed': props<{ mul: number }>(),
    'Viz Scene Color Changed': props<{
      key: keyof VizSceneColorSettings;
      color: string;
    }>(),
    'Viz Light Color Changed': props<{
      key: keyof VizLightColorSettings;
      color: string;
    }>(),
    'Viz Network Colors Patch': props<{
      patch: Partial<VizNetworkColorSettings>;
    }>(),
    'Viz Post Process Patch': props<{
      patch: Partial<VizPostProcessSettings>;
    }>(),
    'Viz Vibe Camera Profile Changed': props<{
      profile: VibeCameraProfileId;
    }>(),
    'Viz Vibe Camera Tuning Patch': props<{
      patch: Partial<Omit<VibeCameraTuning, 'profileMode'>>;
    }>(),
    'Ui Viz Immersive Toggled': emptyProps(),
    'Daisy Ui App Theme Changed': props<{ theme: DaisyUiThemeName }>(),
    'Viz 3d Colors Sync From Daisy Requested': emptyProps(),
    'Viz 3d Color Preset Mode Changed': props<{
      mode: 'followUi' | 'fixedTheme';
      fixedTheme?: DaisyUiThemeName;
    }>(),
    'Viz 3d Daisy Palette Applied': props<{
      sceneColors: VizSceneColorSettings;
      lightColors: VizLightColorSettings;
      networkColors: VizNetworkColorSettings;
      postProcessPatch: Partial<VizPostProcessSettings>;
    }>(),
  },
});
