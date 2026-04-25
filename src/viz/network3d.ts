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
  private readonly edgeLines: THREE.LineSegments[] = [];
  private readonly edgeFromTo: Array<Array<{ from: number; to: number }>> = [];
  private readonly edgeWeightScale: number[] = [];
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
    for (let L = 0; L < this.layerSizes.length - 1; L++) {
      const fromCount = this.layerSizes[L];
      const toCount = this.layerSizes[L + 1];
      const segCount = fromCount * toCount;
      const positions = new Float32Array(segCount * 2 * 3);
      const colors = new Float32Array(segCount * 2 * 3);
      const fromTo: Array<{ from: number; to: number }> = new Array(segCount);
      let k = 0;
      for (let to = 0; to < toCount; to++) {
        const pTo = this.positions[L + 1][to];
        for (let from = 0; from < fromCount; from++) {
          const pFrom = this.positions[L][from];
          const i = k * 6;
          positions[i + 0] = pFrom.x;
          positions[i + 1] = pFrom.y;
          positions[i + 2] = pFrom.z;
          positions[i + 3] = pTo.x;
          positions[i + 4] = pTo.y;
          positions[i + 5] = pTo.z;
          colors[i + 0] = 0.35;
          colors[i + 1] = 0.35;
          colors[i + 2] = 0.38;
          colors[i + 3] = 0.35;
          colors[i + 4] = 0.35;
          colors[i + 5] = 0.38;
          fromTo[k] = { from, to };
          k++;
        }
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: L === 0 ? 0.25 : 0.55,
      });
      const lines = new THREE.LineSegments(geom, mat);
      this.edgeLines.push(lines);
      this.edgeFromTo.push(fromTo);
      this.edgeWeightScale.push(0);
      this.root.add(lines);
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

  setWeights(weights: number[][][]): void {
    for (let L = 0; L < this.edgeLines.length; L++) {
      const layerW = weights[L];
      if (!layerW || layerW.length === 0) continue;
      const lines = this.edgeLines[L];
      const colorAttr = lines.geometry.getAttribute("color") as THREE.BufferAttribute;
      const arr = colorAttr.array as Float32Array;
      const map = this.edgeFromTo[L];
      let mx = 1e-12;
      for (let r = 0; r < layerW.length; r++) {
        for (let c = 0; c < layerW[r].length; c++) {
          const a = Math.abs(layerW[r][c]);
          if (a > mx) mx = a;
        }
      }
      const prevScale = this.edgeWeightScale[L];
      const nextScale = prevScale <= 0 ? mx : Math.max(mx, prevScale * 0.995);
      this.edgeWeightScale[L] = Math.max(nextScale, 1e-6);
      for (let k = 0; k < map.length; k++) {
        const ref = map[k];
        const w = layerW[ref.to][ref.from] ?? 0;
        const t = Math.min(1, Math.pow(Math.abs(w) / this.edgeWeightScale[L], 0.65));
        let r = 0;
        let g = 0;
        let b = 0;
        if (w >= 0) {
          r = 0.25 + 0.75 * t;
          g = 0.14 + 0.58 * t;
          b = 0.07 + 0.16 * t;
        } else {
          r = 0.06 + 0.28 * t;
          g = 0.22 + 0.48 * t;
          b = 0.32 + 0.68 * t;
        }
        const i = k * 6;
        arr[i + 0] = r;
        arr[i + 1] = g;
        arr[i + 2] = b;
        arr[i + 3] = r;
        arr[i + 4] = g;
        arr[i + 5] = b;
      }
      colorAttr.needsUpdate = true;
    }
  }

  dispose(): void {
    for (const m of this.meshes) {
      m.geometry.dispose();
      if (Array.isArray(m.material)) m.material.forEach((mat: THREE.Material) => mat.dispose());
      else m.material.dispose();
    }
    for (const l of this.edgeLines) {
      l.geometry.dispose();
      if (Array.isArray(l.material)) l.material.forEach((mat: THREE.Material) => mat.dispose());
      else l.material.dispose();
    }
  }
}
