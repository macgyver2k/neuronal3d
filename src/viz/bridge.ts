import type { TrainSnapshot } from "../train/trainer";
import type { Network3D } from "./network3d";

export function applySnapshotToNetwork(net3d: Network3D, snap: TrainSnapshot): void {
  net3d.setActivations(snap.activations);
}
