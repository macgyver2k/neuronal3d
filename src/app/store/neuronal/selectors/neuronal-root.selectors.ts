import { createFeatureSelector } from "@ngrx/store";
import type { NeuronalState } from "../neuronal.state";

export const selectNeuronal = createFeatureSelector<NeuronalState>("neuronal");
