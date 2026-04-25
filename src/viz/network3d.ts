import * as THREE from "three";

function createDigitTexture(digit: number): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const g = c.getContext("2d");
  if (!g) throw new Error("canvas2d");
  g.clearRect(0, 0, 128, 128);
  g.fillStyle = "#ffffff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "bold 92px system-ui, sans-serif";
  g.fillText(String(digit), 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

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
        const v = 27 - Math.floor(i / 28);
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
  private readonly activationScale: number[] = [];
  private readonly dummy = new THREE.Object3D();
  private readonly layerSizes: number[];
  private readonly positions: THREE.Vector3[][];
  private readonly outputDigitSprites: THREE.Sprite[] = [];
  private edgeFocusMode: "off" | "infer" | "trainRecent" = "off";
  private edgeFocusActivations: number[][] | null = null;
  private readonly edgeFocusThreshold = 0.22;
  private readonly edgeFocusThresholdFirstLayer = 0.38;
  private readonly edgeRecentLastWeight: Float32Array[] = [];
  private readonly edgeRecentDelta: Float32Array[] = [];
  private readonly edgeRecentAge: Uint16Array[] = [];
  private readonly edgeRecentDeltaThreshold = 0.18;
  private readonly edgeRecentDeltaAbsMin = 0.0008;
  private readonly edgeRecentWindow = 10;
  private readonly edgeBaseOpacity: number[] = [];
  private idleDimmed = false;

  constructor(layerSizes: number[]) {
    this.layerSizes = [...layerSizes];
    this.positions = layoutPositions(this.layerSizes);
    const geom = new THREE.SphereGeometry(0.09, 10, 8);
    for (let L = 0; L < this.layerSizes.length; L++) {
      const n = this.layerSizes[L];
      const mat = new THREE.MeshPhongMaterial({
        shininess: 0,
        specular: 0x000000,
        emissive: 0x2a6bff,
        emissiveIntensity: 1.9,
        toneMapped: false,
        vertexColors: true,
      });
      const mesh = new THREE.InstancedMesh(geom, mat, n);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const colors = new Float32Array(n * 3);
      const colorAttr = new THREE.InstancedBufferAttribute(colors, 3);
      colorAttr.setUsage(THREE.DynamicDrawUsage);
      mesh.instanceColor = colorAttr;
      const pos = this.positions[L];
      for (let i = 0; i < n; i++) {
        this.dummy.position.copy(pos[i]);
        const s = 0.35;
        this.dummy.scale.setScalar(s);
        this.dummy.updateMatrix();
        mesh.setMatrixAt(i, this.dummy.matrix);
        colors[i * 3 + 0] = 0.18;
        colors[i * 3 + 1] = 0.5;
        colors[i * 3 + 2] = 1.0;
      }
      mesh.instanceMatrix.needsUpdate = true;
      colorAttr.needsUpdate = true;
      this.meshes.push(mesh);
      this.activationScale.push(1);
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
      const edgeColors = new THREE.BufferAttribute(colors, 3);
      edgeColors.setUsage(THREE.DynamicDrawUsage);
      geom.setAttribute("color", edgeColors);
      const baseOpacity = L === 0 ? 0.25 : 0.55;
      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: baseOpacity,
      });
      const lines = new THREE.LineSegments(geom, mat);
      this.edgeLines.push(lines);
      this.edgeBaseOpacity.push(baseOpacity);
      this.edgeFromTo.push(fromTo);
      this.edgeWeightScale.push(0);
      this.edgeRecentLastWeight.push(new Float32Array(segCount));
      this.edgeRecentDelta.push(new Float32Array(segCount));
      const age = new Uint16Array(segCount);
      age.fill(this.edgeRecentWindow + 1);
      this.edgeRecentAge.push(age);
      this.root.add(lines);
    }
    const outIdx = this.layerSizes.length - 1;
    const outCount = this.layerSizes[outIdx];
    const outX = this.positions[outIdx][0]?.x ?? (outIdx * 3.2);
    const labelX = outX + 1.8;
    const labelR = 1.75;
    const labelYOffset = 2.4;
    for (let i = 0; i < outCount; i++) {
      const t = (i / Math.max(1, outCount)) * Math.PI * 2;
      const tex = createDigitTexture(i);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.16,
        color: 0x5f6770,
        depthWrite: false,
      });
      const spr = new THREE.Sprite(mat);
      spr.position.set(labelX, labelYOffset + Math.sin(t) * labelR, Math.cos(t) * labelR);
      spr.scale.setScalar(0.34);
      this.outputDigitSprites.push(spr);
      this.root.add(spr);
    }
    this.setIdleDim(true);
  }

  resetActivationScaling(): void {
    for (let i = 0; i < this.activationScale.length; i++) this.activationScale[i] = 1;
  }

  setEdgeFocus(mode: "off" | "infer" | "trainRecent", activations: number[][] | null): void {
    this.edgeFocusMode = mode;
    this.edgeFocusActivations = activations ? activations.map((a) => [...a]) : null;
  }

  setIdleDim(dim: boolean): void {
    if (this.idleDimmed === dim) return;
    this.idleDimmed = dim;
    const emissiveIntensity = dim ? 0.28 : 1.9;
    for (const mesh of this.meshes) {
      const mat = mesh.material as THREE.MeshPhongMaterial;
      mat.emissiveIntensity = emissiveIntensity;
    }
    const edgeScale = dim ? 0.33 : 1;
    for (let i = 0; i < this.edgeLines.length; i++) {
      const mat = this.edgeLines[i].material as THREE.LineBasicMaterial;
      mat.opacity = this.edgeBaseOpacity[i] * edgeScale;
    }
    for (const s of this.outputDigitSprites) {
      const mat = s.material as THREE.SpriteMaterial;
      if (mat.opacity <= 0.16) mat.opacity = dim ? 0.05 : 0.16;
    }
  }

  setActivations(activations: number[][]): void {
    for (let L = 0; L < this.meshes.length; L++) {
      const mesh = this.meshes[L];
      const pos = this.positions[L];
      const v = activations[L];
      if (!v || v.length !== this.layerSizes[L]) continue;
      const colorAttr = mesh.instanceColor as THREE.InstancedBufferAttribute;
      const arr = colorAttr.array as Float32Array;
      const isOutput = L === this.meshes.length - 1;
      if (isOutput) {
        let mean = 0;
        let mx = -Infinity;
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : 0;
          mean += vi;
          if (vi > mx) mx = vi;
        }
        mean /= Math.max(1, v.length);
        const denom = Math.max(1e-6, mx - mean);
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : 0;
          const raw = (vi - mean) / denom;
          const t = Math.min(1, Math.max(0, Math.pow(raw, 0.65)));
          this.dummy.position.copy(pos[i]);
          const s = 0.18 + 1.28 * t;
          this.dummy.scale.setScalar(s);
          this.dummy.updateMatrix();
          mesh.setMatrixAt(i, this.dummy.matrix);
          arr[i * 3 + 0] = 0.2 + 0.4 * t;
          arr[i * 3 + 1] = 0.45 + 0.4 * t;
          arr[i * 3 + 2] = 0.85 + 0.15 * t;
        }
        let best = 0;
        let bestVal = -Infinity;
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : -Infinity;
          if (vi > bestVal) {
            bestVal = vi;
            best = i;
          }
        }
        for (let i = 0; i < this.outputDigitSprites.length; i++) {
          const s = this.outputDigitSprites[i];
          const mat = s.material as THREE.SpriteMaterial;
          if (this.edgeFocusMode === "infer" && i === best) {
            mat.opacity = 0.95;
            mat.color.setHex(0xffcc4d);
            s.scale.setScalar(0.46);
          } else {
            mat.opacity = 0.16;
            mat.color.setHex(0x5f6770);
            s.scale.setScalar(0.34);
          }
        }
      } else {
        let mx = 1e-12;
        for (let i = 0; i < v.length; i++) {
          const t = Number.isFinite(v[i]) ? v[i] : 0;
          if (t > mx) mx = t;
        }
        const scale = Math.max(mx, 1e-6);
        this.activationScale[L] = scale;
        for (let i = 0; i < v.length; i++) {
          const vi = Number.isFinite(v[i]) ? v[i] : 0;
          const raw = Math.max(0, vi / scale);
          const t = Math.min(1, Math.pow(raw, 0.7));
          this.dummy.position.copy(pos[i]);
          const s = 0.16 + 0.98 * t;
          this.dummy.scale.setScalar(s);
          this.dummy.updateMatrix();
          mesh.setMatrixAt(i, this.dummy.matrix);
          arr[i * 3 + 0] = 0.12 + 0.25 * t;
          arr[i * 3 + 1] = 0.35 + 0.45 * t;
          arr[i * 3 + 2] = 0.8 + 0.2 * t;
        }
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
      const posAttr = lines.geometry.getAttribute("position") as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const map = this.edgeFromTo[L];
      const lastWeight = this.edgeRecentLastWeight[L];
      const deltaArr = this.edgeRecentDelta[L];
      const ageArr = this.edgeRecentAge[L];
      let mx = 1e-12;
      let contribMx = 1e-12;
      let deltaMx = 1e-12;
      const fromActs =
        this.edgeFocusMode === "infer" && this.edgeFocusActivations && this.edgeFocusActivations[L]
          ? this.edgeFocusActivations[L]
          : null;
      const threshold = L === 0 ? this.edgeFocusThresholdFirstLayer : this.edgeFocusThreshold;
      for (let r = 0; r < layerW.length; r++) {
        for (let c = 0; c < layerW[r].length; c++) {
          const wrc = Number.isFinite(layerW[r][c]) ? layerW[r][c] : 0;
          const a = Math.abs(wrc);
          if (a > mx) mx = a;
          const idx = r * layerW[r].length + c;
          const delta = Math.abs(wrc - lastWeight[idx]);
          deltaArr[idx] = delta;
          if (delta > deltaMx) deltaMx = delta;
          if (fromActs && c < fromActs.length) {
            const fa = Number.isFinite(fromActs[c]) ? Math.max(0, fromActs[c]) : 0;
            const contrib = Math.abs(wrc) * fa;
            if (contrib > contribMx) contribMx = contrib;
          }
        }
      }
      const prevScale = this.edgeWeightScale[L];
      const nextScale = prevScale <= 0 ? mx : Math.max(mx, prevScale * 0.995);
      this.edgeWeightScale[L] = Math.max(nextScale, 1e-6);
      for (let k = 0; k < map.length; k++) {
        const ref = map[k];
        const wRaw = layerW[ref.to][ref.from] ?? 0;
        const w = Number.isFinite(wRaw) ? wRaw : 0;
        const idx = ref.to * layerW[ref.to].length + ref.from;
        lastWeight[idx] = w;
        let visible = true;
        let contribNorm = 1;
        let recentNorm = 0;
        if (fromActs && ref.from < fromActs.length) {
          const fa = Number.isFinite(fromActs[ref.from]) ? Math.max(0, fromActs[ref.from]) : 0;
          contribNorm = (Math.abs(w) * fa) / Math.max(1e-9, contribMx);
          visible = contribNorm >= threshold;
        }
        if (this.edgeFocusMode === "trainRecent") {
          recentNorm = deltaArr[idx] / Math.max(1e-9, deltaMx);
          const changedEnough =
            deltaArr[idx] >= this.edgeRecentDeltaAbsMin &&
            recentNorm >= this.edgeRecentDeltaThreshold;
          if (changedEnough) {
            ageArr[k] = 0;
          } else {
            ageArr[k] = Math.min(this.edgeRecentWindow + 1, ageArr[k] + 1);
          }
          visible = ageArr[k] <= this.edgeRecentWindow;
        }
        const tBase = Math.min(1, Math.pow(Math.abs(w) / this.edgeWeightScale[L], 0.65));
        const tInfer =
          fromActs && visible
            ? Math.min(1, Math.max(0, (contribNorm - threshold) / Math.max(1e-9, 1 - threshold)))
            : 0;
        const tTrainRecent =
          this.edgeFocusMode === "trainRecent" && visible
            ? 1 - ageArr[k] / Math.max(1, this.edgeRecentWindow)
            : 0;
        const t = this.edgeFocusMode === "trainRecent" ? tTrainRecent : (fromActs ? (visible ? tInfer : 0) : tBase);
        const tRecentVis = this.edgeFocusMode === "trainRecent" ? Math.pow(Math.max(0, tTrainRecent), 1.6) : 0;
        if (this.edgeFocusMode === "trainRecent") visible = visible && tRecentVis >= 0.06;
        let r = 0;
        let g = 0;
        let b = 0;
        if (visible) {
          if (this.edgeFocusMode === "trainRecent") {
            r = 0.95 * tRecentVis;
            g = 0.62 * tRecentVis;
            b = 0.18 * tRecentVis;
          } else if (w >= 0) {
            r = 0.25 + 0.75 * t;
            g = 0.14 + 0.58 * t;
            b = 0.07 + 0.16 * t;
          } else {
            r = 0.06 + 0.28 * t;
            g = 0.22 + 0.48 * t;
            b = 0.32 + 0.68 * t;
          }
        } else if (this.edgeFocusMode === "infer") {
          r = 0.05;
          g = 0.07;
          b = 0.09;
        }
        const i = k * 6;
        const pFrom = this.positions[L][ref.from];
        const pTo = this.positions[L + 1][ref.to];
        if ((this.edgeFocusMode === "infer" || this.edgeFocusMode === "trainRecent") && !visible) {
          posArr[i + 0] = pFrom.x;
          posArr[i + 1] = pFrom.y;
          posArr[i + 2] = pFrom.z;
          posArr[i + 3] = pFrom.x;
          posArr[i + 4] = pFrom.y;
          posArr[i + 5] = pFrom.z;
        } else {
          posArr[i + 0] = pFrom.x;
          posArr[i + 1] = pFrom.y;
          posArr[i + 2] = pFrom.z;
          posArr[i + 3] = pTo.x;
          posArr[i + 4] = pTo.y;
          posArr[i + 5] = pTo.z;
        }
        arr[i + 0] = r;
        arr[i + 1] = g;
        arr[i + 2] = b;
        arr[i + 3] = r;
        arr[i + 4] = g;
        arr[i + 5] = b;
      }
      posAttr.needsUpdate = true;
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
    for (const s of this.outputDigitSprites) {
      const mat = s.material as THREE.SpriteMaterial;
      mat.map?.dispose();
      mat.dispose();
    }
  }
}
