import { MNIST_DRAW_GRID, SOFT_DAB_REF_SIDE } from './constants';
import { inferDrawBrushSoftScale } from './infer-brush';
import { RT } from './runtime-state';

export function resetCanvas2dShadow(): void {
  RT.ctx2d.shadowBlur = 0;
  RT.ctx2d.shadowColor = 'transparent';
}

/** Nach weichem Radierer / Pinsel: Standard-Komposit wiederherstellen. */
export function resetCanvas2dPaintExtras(): void {
  resetCanvas2dShadow();
  RT.ctx2d.globalCompositeOperation = 'source-over';
  RT.ctx2d.globalAlpha = 1;
}

function drawCanvasMinSide(): number {
  return Math.min(RT.surfaceDrawCanvas.width, RT.surfaceDrawCanvas.height);
}

function softPenDabRadius(): number {
  return (
    Math.max(2, (36 * drawCanvasMinSide()) / SOFT_DAB_REF_SIDE) *
    inferDrawBrushSoftScale()
  );
}

function softEraserDabRadius(): number {
  return (
    Math.max(2.2, (42 * drawCanvasMinSide()) / SOFT_DAB_REF_SIDE) *
    inferDrawBrushSoftScale()
  );
}

function softDabStepPx(): number {
  const base = Math.max(0.3, (2.5 * drawCanvasMinSide()) / SOFT_DAB_REF_SIDE);
  return base / Math.sqrt(inferDrawBrushSoftScale());
}

export function drawSoftPenDab(x: number, y: number): void {
  RT.ctx2d.globalCompositeOperation = 'source-over';
  RT.ctx2d.globalAlpha = 1;
  resetCanvas2dShadow();
  const r = softPenDabRadius();
  const g = RT.ctx2d.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.1, 'rgba(255,255,255,1)');
  g.addColorStop(0.22, 'rgba(255,255,255,0.88)');
  g.addColorStop(0.38, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.32)');
  g.addColorStop(0.72, 'rgba(255,255,255,0.14)');
  g.addColorStop(0.88, 'rgba(255,255,255,0.05)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  RT.ctx2d.fillStyle = g;
  RT.ctx2d.beginPath();
  RT.ctx2d.arc(x, y, r, 0, Math.PI * 2);
  RT.ctx2d.fill();
}

/** Weiches Wegradieren per Alpha-Maske (weicher Rand). */
export function drawSoftEraseDab(x: number, y: number): void {
  resetCanvas2dShadow();
  RT.ctx2d.globalAlpha = 1;
  const r = softEraserDabRadius();
  RT.ctx2d.globalCompositeOperation = 'destination-out';
  const g = RT.ctx2d.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, 'rgba(255,255,255,0.94)');
  g.addColorStop(0.22, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.48, 'rgba(255,255,255,0.22)');
  g.addColorStop(0.72, 'rgba(255,255,255,0.08)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  RT.ctx2d.fillStyle = g;
  RT.ctx2d.beginPath();
  RT.ctx2d.arc(x, y, r, 0, Math.PI * 2);
  RT.ctx2d.fill();
  RT.ctx2d.globalCompositeOperation = 'source-over';
}

export function stampSoftBrushAlongSegment(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  pen: boolean,
): void {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  const step = softDabStepPx();
  const n = Math.max(1, Math.ceil(len / step));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = x0 + dx * t;
    const y = y0 + dy * t;
    if (pen) drawSoftPenDab(x, y);
    else drawSoftEraseDab(x, y);
  }
}

function drawCanvasCellSize(): { cellW: number; cellH: number } {
  const cw = RT.surfaceDrawCanvas.width;
  const ch = RT.surfaceDrawCanvas.height;
  return { cellW: cw / MNIST_DRAW_GRID, cellH: ch / MNIST_DRAW_GRID };
}

export function canvasPos(ev: PointerEvent): { x: number; y: number } {
  const r = RT.surfaceDrawCanvas.getBoundingClientRect();
  const sx = RT.surfaceDrawCanvas.width / r.width;
  const sy = RT.surfaceDrawCanvas.height / r.height;
  return { x: (ev.clientX - r.left) * sx, y: (ev.clientY - r.top) * sy };
}

export function canvasPosToDrawCell(p: { x: number; y: number }): {
  gx: number;
  gy: number;
} {
  const { cellW, cellH } = drawCanvasCellSize();
  return {
    gx: Math.max(0, Math.min(MNIST_DRAW_GRID - 1, Math.floor(p.x / cellW))),
    gy: Math.max(0, Math.min(MNIST_DRAW_GRID - 1, Math.floor(p.y / cellH))),
  };
}

/**
 * Raster-Zelle: exaktes 28×28-Rechteck (hart am Gitter), plus nur ein äußerer Ring
 * mit Grau in die Nachbarzellen (Radial mit innerem „Loch“, kein weicher Vollkreis).
 */
function fillDrawCanvasCell(gx: number, gy: number, style: string): void {
  resetCanvas2dPaintExtras();
  const { cellW, cellH } = drawCanvasCellSize();
  const x0 = gx * cellW;
  const y0 = gy * cellH;
  const w = Math.ceil(cellW);
  const h = Math.ceil(cellH);
  const cx = x0 + cellW * 0.5;
  const cy = y0 + cellH * 0.5;
  const base = Math.max(cellW, cellH);
  /** Innerer Kreis knapp außerhalb der Zellecken → Kern bleibt kantengleich zum Gitter */
  const rHole = Math.hypot(cellW, cellH) * 0.505;
  const rAura = base * 2.18;
  const isErase = style === '#000000' || style.toLowerCase() === '#000000';

  if (!isErase) {
    RT.ctx2d.fillStyle = '#ffffff';
    RT.ctx2d.fillRect(x0, y0, w, h);

    /** Nur Weiß+Alpha (kein graues RGB): überlagert es andere weiße Kerne nicht ab. */
    const g = RT.ctx2d.createRadialGradient(cx, cy, rHole, cx, cy, rAura);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.06, 'rgba(255,255,255,0.38)');
    g.addColorStop(0.18, 'rgba(255,255,255,0.24)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.14)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.07)');
    g.addColorStop(0.78, 'rgba(255,255,255,0.03)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    RT.ctx2d.fillStyle = g;
    RT.ctx2d.beginPath();
    RT.ctx2d.arc(cx, cy, rAura, 0, Math.PI * 2);
    RT.ctx2d.fill();
    RT.ctx2d.fillStyle = '#ffffff';
    RT.ctx2d.fillRect(x0, y0, w, h);
  } else {
    RT.ctx2d.globalCompositeOperation = 'destination-out';
    RT.ctx2d.fillStyle = 'rgba(255,255,255,1)';
    RT.ctx2d.fillRect(x0, y0, w, h);

    const g = RT.ctx2d.createRadialGradient(
      cx,
      cy,
      rHole,
      cx,
      cy,
      rAura * 1.06,
    );
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.08, 'rgba(255,255,255,0.38)');
    g.addColorStop(0.26, 'rgba(255,255,255,0.2)');
    g.addColorStop(0.48, 'rgba(255,255,255,0.1)');
    g.addColorStop(0.72, 'rgba(255,255,255,0.04)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    RT.ctx2d.fillStyle = g;
    RT.ctx2d.beginPath();
    RT.ctx2d.arc(cx, cy, rAura * 1.06, 0, Math.PI * 2);
    RT.ctx2d.fill();
    RT.ctx2d.globalCompositeOperation = 'source-over';
  }
}

export function stampDrawCells(
  cx: number,
  cy: number,
  chebR: number,
  style: string,
): void {
  for (let dy = -chebR; dy <= chebR; dy++) {
    for (let dx = -chebR; dx <= chebR; dx++) {
      const gx = cx + dx;
      const gy = cy + dy;
      if (gx >= 0 && gx < MNIST_DRAW_GRID && gy >= 0 && gy < MNIST_DRAW_GRID) {
        fillDrawCanvasCell(gx, gy, style);
      }
    }
  }
}

export function strokeDrawCellsBresenham(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  chebR: number,
  style: string,
): void {
  let x = x0;
  let y = y0;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  for (;;) {
    stampDrawCells(x, y, chebR, style);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}
