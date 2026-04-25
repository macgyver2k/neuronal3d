import type { TrainSnapshot } from "../train/trainer.js";
import type { Network3D } from "./network3d.js";

export function applySnapshotToNetwork(net3d: Network3D, snap: TrainSnapshot): void {
  net3d.setActivations(snap.activations);
}
