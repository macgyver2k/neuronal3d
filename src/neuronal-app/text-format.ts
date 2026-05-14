export function fmtInt(n: number, width: number): string {
  return String(n).padStart(width, ' ');
}

export function fmtFloat(n: number, width: number, digits: number): string {
  return n.toFixed(digits).padStart(width, ' ');
}

export function fmtPct(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return '-';
  return `${(v * 100).toFixed(2)}%`;
}

export function defaultModelName(): string {
  return `Modell ${new Date().toLocaleString('de-DE', { hour12: false })}`;
}
