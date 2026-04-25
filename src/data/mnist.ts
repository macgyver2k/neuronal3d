export type MnistSample = {
  label: number;
  pixels: number[];
};

function parseCsvLine(line: string): number[] {
  const parts = line.split(",");
  const nums: number[] = [];
  for (const p of parts) {
    const t = p.trim();
    if (t.length === 0) continue;
    nums.push(Number(t));
  }
  return nums;
}

export function parseMnistCsv(text: string): MnistSample[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const out: MnistSample[] = [];
  for (const line of lines) {
    const nums = parseCsvLine(line);
    if (nums.length !== 785) continue;
    const rawLabel = nums[0];
    if (!Number.isFinite(rawLabel)) continue;
    const label = Math.round(rawLabel);
    if (!Number.isInteger(label) || label < 0 || label > 9) continue;
    const rawPixels = nums.slice(1, 785);
    if (rawPixels.some((v) => !Number.isFinite(v))) continue;
    const pixels = rawPixels.map((v) => Math.max(0, Math.min(1, v / 255)));
    out.push({ label, pixels });
  }
  return out;
}

export function oneHot(label: number, dim = 10): number[] {
  const v = new Array<number>(dim).fill(0);
  v[label] = 1;
  return v;
}

export function shuffleInPlace<T>(arr: T[], rng: () => number = Math.random): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
}

export function batchIndices(n: number, batchSize: number): number[][] {
  const out: number[][] = [];
  for (let i = 0; i < n; i += batchSize) {
    const row: number[] = [];
    for (let j = i; j < Math.min(i + batchSize, n); j++) row.push(j);
    out.push(row);
  }
  return out;
}
