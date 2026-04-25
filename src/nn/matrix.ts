export type Mat = number[][];

export function zeros(rows: number, cols: number): Mat {
  const m: Mat = [];
  for (let i = 0; i < rows; i++) {
    const row = new Array<number>(cols).fill(0);
    m.push(row);
  }
  return m;
}

export function matFromColVec(v: number[]): Mat {
  const m = zeros(v.length, 1);
  for (let i = 0; i < v.length; i++) m[i][0] = v[i];
  return m;
}

export function colVecFromMat(m: Mat): number[] {
  const out: number[] = [];
  for (let i = 0; i < m.length; i++) out.push(m[i][0]);
  return out;
}

export function matMul(a: Mat, b: Mat): Mat {
  const ra = a.length;
  const ca = a[0].length;
  const rb = b.length;
  const cb = b[0].length;
  if (ca !== rb) throw new Error("matMul shape");
  const c = zeros(ra, cb);
  for (let i = 0; i < ra; i++) {
    for (let k = 0; k < ca; k++) {
      const aik = a[i][k];
      for (let j = 0; j < cb; j++) c[i][j] += aik * b[k][j];
    }
  }
  return c;
}

export function matAdd(a: Mat, b: Mat): Mat {
  if (a.length !== b.length || a[0].length !== b[0].length) throw new Error("matAdd shape");
  const r = zeros(a.length, a[0].length);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) r[i][j] = a[i][j] + b[i][j];
  }
  return r;
}

export function matScale(a: Mat, s: number): Mat {
  const r = zeros(a.length, a[0].length);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) r[i][j] = a[i][j] * s;
  }
  return r;
}

export function transpose(a: Mat): Mat {
  const r = zeros(a[0].length, a.length);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) r[j][i] = a[i][j];
  }
  return r;
}

export function hadamard(a: Mat, b: Mat): Mat {
  if (a.length !== b.length || a[0].length !== b[0].length) throw new Error("hadamard shape");
  const r = zeros(a.length, a[0].length);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) r[i][j] = a[i][j] * b[i][j];
  }
  return r;
}

export function matAccInPlace(target: Mat, delta: Mat): void {
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < target[0].length; j++) target[i][j] += delta[i][j];
  }
}

export function matSubInPlace(target: Mat, grad: Mat, lr: number): void {
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < target[0].length; j++) target[i][j] -= lr * grad[i][j];
  }
}

export function randnMat(rows: number, cols: number, scale: number): Mat {
  const m = zeros(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) m[i][j] = randn() * scale;
  }
  return m;
}

function randn(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
