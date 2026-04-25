import * as THREE from "three";

function layoutPositions(layerSizes: number[]): THREE.Vector3[][] {
  const spacing = 3.2;
  const out: THREE.Vector3[][] = [];
  for (let L = 0; L < layerSizes.length; L++) {
    const n = layerSizes[L];
    const x = L * spacing;
    const pts: THREE.Vector3[] = [];
    if (L === 0 && n === 784) {
      for (let i = 0; i < 784; i++) {
        const u = i % 28;
        const v = Math.floor(i / 28);
        pts.push(new THREE.Vector3(x, (v - 13.5) * 0.12, (u - 13.5) * 0.12));
      }
    } else if (n <= 128) {
      const ringR = 0.35 + Math.min(1.4, n * 0.018);
      for (let i = 0; i < n; i++) {
        const t = (i / Math.max(1, n)) * Math.PI * 2;
        pts.push(new THREE.Vector3(x, Math.sin(t) * ringR, Math.cos(t) * ringR));
      }
    } else {
      const side = Math.ceil(Math.sqrt(n));
      let k = 0;
      for (let a = 0; a < side && k < n; a++) {
        for (let b = 0; b < side && k < n; b++) {
          const fy = (a / Math.max(1, side - 1) - 0.5) * 2.2;
          const fz = (b / Math.max(1, side - 1) - 0.5) * 2.2;
          pts.push(new THREE.Vector3(x, fy, fz));
          k++;
        }
      }
    }
    out.push(pts);
  }
  return out;
}

export class Network3D {
  readonly root = new THREE.Group();
  private readonly meshes: THREE.InstancedMesh[] = [];
  private readonly dummy = new THREE.Object3D();
  private readonly layerSizes: number[];
  private readonly positions: THREE.Vector3[][];

  constructor(layerSizes: number[]) {
    this.layerSizes = [...layerSizes];
    this.positions = layoutPositions(this.layerSizes);
    const geom = new THREE.SphereGeometry(0.09, 10, 8);
    for (let L = 0; L < this.layerSizes.length; L++) {
      const n = this.layerSizes[L];
      const mat = new THREE.MeshPhongMaterial({
        shininess: 110,
        specular: 0x7aa7ff,
        vertexColors: true,
      });
      const mesh = new THREE.InstancedMesh(geom, mat, n);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const colors = new Float32Array(n * 3);
      const colorAttr = new THREE.InstancedBufferAttribute(colors, 3);
      mesh.instanceColor = colorAttr;
      const pos = this.positions[L];
      for (let i = 0; i < n; i++) {
        this.dummy.position.copy(pos[i]);
        const s = 0.35;
        this.dummy.scale.setScalar(s);
        this.dummy.updateMatrix();
        mesh.setMatrixAt(i, this.dummy.matrix);
        colors[i * 3 + 0] = 0.25;
        colors[i * 3 + 1] = 0.45;
        colors[i * 3 + 2] = 0.85;
      }
      mesh.instanceMatrix.needsUpdate = true;
      colorAttr.needsUpdate = true;
      this.meshes.push(mesh);
      this.root.add(mesh);
    }
  }

  setActivations(activations: number[][]): void {
    for (let L = 0; L < this.meshes.length; L++) {
      const mesh = this.meshes[L];
      const pos = this.positions[L];
      const v = activations[L];
      if (!v || v.length !== this.layerSizes[L]) continue;
      let mx = 1e-12;
      for (let i = 0; i < v.length; i++) {
        const t = v[i];
        if (t > mx) mx = t;
      }
      const colorAttr = mesh.instanceColor as THREE.InstancedBufferAttribute;
      const arr = colorAttr.array as Float32Array;
      for (let i = 0; i < v.length; i++) {
        const t = Math.max(0, v[i] / mx);
        this.dummy.position.copy(pos[i]);
        const s = 0.25 + 0.95 * t;
        this.dummy.scale.setScalar(s);
        this.dummy.updateMatrix();
        mesh.setMatrixAt(i, this.dummy.matrix);
        arr[i * 3 + 0] = 0.08 + 0.75 * t;
        arr[i * 3 + 1] = 0.12 + 0.55 * (1 - t * 0.35);
        arr[i * 3 + 2] = 0.15 + 0.85 * (1 - t);
      }
      mesh.instanceMatrix.needsUpdate = true;
      colorAttr.needsUpdate = true;
    }
  }

  dispose(): void {
    for (const m of this.meshes) {
      m.geometry.dispose();
      if (Array.isArray(m.material)) m.material.forEach((mat: THREE.Material) => mat.dispose());
      else m.material.dispose();
    }
  }
}
