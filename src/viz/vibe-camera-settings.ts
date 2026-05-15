export type VibeCameraProfileId = 'smooth' | 'balanced' | 'funky' | 'rocket';

export type VibeCameraProfileMode = VibeCameraProfileId | 'custom';

export type VibeCameraTuning = {
  profileMode: VibeCameraProfileMode;
  /** 0 = langsam, {@link VIBE_SPEED_MAX} = schnell */
  speed: number;
  /** 0 = nah, 1 = weiter raus */
  pullOut: number;
  /** 0 = ruhige Kurven, 1 = wild */
  pathWildness: number;
  /** 0 = ruhiger Blick, 1 = schnellere Schicht-Wanderung */
  lookWander: number;
  /** Anzahl vorausgeplanter Pfad-Segmente (1–1000) */
  pathQueueSize: number;
  /** Maximale Sehnenlänge p0→p3 (Welt-Einheiten) */
  maxSegmentChord: number;
  pathPreview: boolean;
  /** Kugeln an Segmentanfängen in der Pfad-Vorschau */
  pathPreviewMarkers: boolean;
  /** Kugelradius (Welt-Einheiten) */
  pathPreviewMarkerSize: number;
};

export const VIBE_SPEED_MAX = 100;

/** Bis hier entspricht das Tempo dem früheren Maximum (Slider 0–10). */
export const VIBE_SPEED_REFERENCE = 10;

export const DEFAULT_VIBE_CAMERA_TUNING: VibeCameraTuning = {
  profileMode: 'balanced',
  speed: 50,
  pullOut: 0.5,
  pathWildness: 0.5,
  lookWander: 0.5,
  pathQueueSize: 2,
  maxSegmentChord: 4,
  pathPreview: true,
  pathPreviewMarkers: true,
  pathPreviewMarkerSize: 0.16,
};

export const VIBE_CAMERA_PROFILE_TUNING: Record<
  VibeCameraProfileId,
  Omit<VibeCameraTuning, 'profileMode'>
> = {
  smooth: {
    speed: 25,
    pullOut: 0.4,
    pathWildness: 0.2,
    lookWander: 0.3,
    pathQueueSize: 2,
    maxSegmentChord: 4,
    pathPreview: true,
    pathPreviewMarkers: true,
    pathPreviewMarkerSize: 0.16,
  },
  balanced: {
    speed: 50,
    pullOut: 0.5,
    pathWildness: 0.5,
    lookWander: 0.5,
    pathQueueSize: 2,
    maxSegmentChord: 4,
    pathPreview: true,
    pathPreviewMarkers: true,
    pathPreviewMarkerSize: 0.16,
  },
  funky: {
    speed: 55,
    pullOut: 0.52,
    pathWildness: 0.75,
    lookWander: 0.7,
    pathQueueSize: 2,
    maxSegmentChord: 4,
    pathPreview: true,
    pathPreviewMarkers: true,
    pathPreviewMarkerSize: 0.16,
  },
  rocket: {
    speed: 100,
    pullOut: 0.38,
    pathWildness: 0.65,
    lookWander: 0.55,
    pathQueueSize: 6,
    maxSegmentChord: 14,
    pathPreview: true,
    pathPreviewMarkers: true,
    pathPreviewMarkerSize: 0.14,
  },
};

export const VIBE_CAMERA_PROFILE_LABELS: Record<VibeCameraProfileId, string> = {
  smooth: 'Ruhig',
  balanced: 'Ausgewogen',
  funky: 'Funky',
  rocket: 'Rakete',
};

export type ResolvedVibeCameraParams = {
  segDurMin: number;
  segDurMax: number;
  firstDurBase: number;
  firstDurSpan: number;
  firstDurBoostChance: number;
  firstDurBoostMin: number;
  firstDurBoostSpan: number;
  chainDurMul: number;
  chordRatioMin: number;
  chordRatioMax: number;
  legatoMin: number;
  legatoMax: number;
  durRelLow: number;
  durRelHigh: number;
  chordDurFloorMul: number;
  chordDurFloorAdd: number;
  chordDurFloorCap: number;
  pullOutFallbackMin: number;
  pullOutFallbackSpan: number;
  pullOutChanceMain: number;
  pullOutPushMainMin: number;
  pullOutPushMainSpan: number;
  pullOutChanceBoost: number;
  pullOutPushBoostMin: number;
  pullOutPushBoostSpan: number;
  pullOutNearDist: number;
  pullOutNearChance: number;
  pullOutNearRefDist: number;
  pullOutNearFactorMin: number;
  pullOutNearFactorSpan: number;
  pullOutScaleChance: number;
  pullOutScaleMin: number;
  pullOutScaleSpan: number;
  pathWildnessMul: number;
  p3Jitter: number;
  handleOutMin: number;
  handleOutSpan: number;
  handleInNegMin: number;
  handleInNegSpan: number;
  p2LerpMin: number;
  p2LerpSpan: number;
  lookWanderSpeed: number;
  lookEqualLayerBlend: number;
  queueMin: number;
  maxSegmentChord: number;
  pathPreviewMaxSegments: number;
  pathPreview: boolean;
  pathPreviewMarkers: boolean;
  pathPreviewMarkerRadius: number;
};

const lerp = (low: number, high: number, t: number): number =>
  low + (high - low) * t;

const clamp01 = (value: number): number =>
  value < 0 ? 0 : value > 1 ? 1 : value;

const clampVibeSpeed = (value: number): number =>
  Math.min(VIBE_SPEED_MAX, Math.max(0, value));

/** Segmentdauern bei Tempo 100 vs. Referenz-Maximum (Tempo 10). */
const VIBE_SPEED_OVERDRIVE_DUR_FLOOR = 0.05;

/** >1: mehr Auflösung im langsamen Bereich (Tempo 1 ≈ Schneckentempo). */
const VIBE_SPEED_SLOW_EXPONENT = 3;

/** Zusätzlicher Faktor auf Segmentdauern bei Tempo unter Referenz. */
const VIBE_SPEED_CRAWL_DUR_CEILING = 7;

const vibeSpeedOverdriveMul = (
  value: number,
  overdrive: number,
  floorMul = VIBE_SPEED_OVERDRIVE_DUR_FLOOR,
): number => value * lerp(1, floorMul, overdrive);

const vibeSpeedCrawlMul = (value: number, crawl: number): number =>
  value * lerp(1, VIBE_SPEED_CRAWL_DUR_CEILING, crawl * crawl);

const vibeSpeedDuration = (
  base: number,
  overdrive: number,
  crawl: number,
  overdriveFloor = VIBE_SPEED_OVERDRIVE_DUR_FLOOR,
): number =>
  vibeSpeedCrawlMul(
    vibeSpeedOverdriveMul(base, overdrive, overdriveFloor),
    crawl,
  );

const resolveVibeSpeedFactors = (
  speedSetting: number,
): { speed: number; overdrive: number; crawl: number } => {
  const referenceRatio = clamp01(speedSetting / VIBE_SPEED_REFERENCE);
  const referenceLinear = Math.pow(referenceRatio, VIBE_SPEED_SLOW_EXPONENT);
  const speed = referenceLinear * referenceLinear * (3 - 2 * referenceLinear);
  const overdrive =
    speedSetting <= VIBE_SPEED_REFERENCE
      ? 0
      : clamp01(
          (speedSetting - VIBE_SPEED_REFERENCE) /
            (VIBE_SPEED_MAX - VIBE_SPEED_REFERENCE),
        );
  const crawl = speedSetting < VIBE_SPEED_REFERENCE ? 1 - referenceRatio : 0;
  return { speed, overdrive, crawl };
};

const PATH_QUEUE_SIZE_MIN = 1;
const PATH_QUEUE_SIZE_MAX = 1000;
const MAX_SEGMENT_CHORD_MIN = 2;
const MAX_SEGMENT_CHORD_MAX = 80;
const PATH_PREVIEW_MAX_SEGMENTS = 96;
const PATH_PREVIEW_MARKER_SIZE_MIN = 0.04;
const PATH_PREVIEW_MARKER_SIZE_MAX = 0.8;

const clampPathQueueSize = (value: number): number =>
  Math.round(
    Math.min(PATH_QUEUE_SIZE_MAX, Math.max(PATH_QUEUE_SIZE_MIN, value)),
  );

const clampMaxSegmentChord = (value: number): number =>
  Math.min(MAX_SEGMENT_CHORD_MAX, Math.max(MAX_SEGMENT_CHORD_MIN, value));

const clampPathPreviewMarkerSize = (value: number): number =>
  Math.min(
    PATH_PREVIEW_MARKER_SIZE_MAX,
    Math.max(PATH_PREVIEW_MARKER_SIZE_MIN, value),
  );

export function normalizeVibeCameraTuning(
  tuning: Partial<VibeCameraTuning> | null | undefined,
): VibeCameraTuning {
  const base = tuning ?? {};
  return {
    profileMode: base.profileMode ?? DEFAULT_VIBE_CAMERA_TUNING.profileMode,
    speed: clampVibeSpeed(base.speed ?? DEFAULT_VIBE_CAMERA_TUNING.speed),
    pullOut: clamp01(base.pullOut ?? DEFAULT_VIBE_CAMERA_TUNING.pullOut),
    pathWildness: clamp01(
      base.pathWildness ?? DEFAULT_VIBE_CAMERA_TUNING.pathWildness,
    ),
    lookWander: clamp01(
      base.lookWander ?? DEFAULT_VIBE_CAMERA_TUNING.lookWander,
    ),
    pathQueueSize: clampPathQueueSize(
      base.pathQueueSize ?? DEFAULT_VIBE_CAMERA_TUNING.pathQueueSize,
    ),
    maxSegmentChord: clampMaxSegmentChord(
      base.maxSegmentChord ?? DEFAULT_VIBE_CAMERA_TUNING.maxSegmentChord,
    ),
    pathPreview: base.pathPreview ?? DEFAULT_VIBE_CAMERA_TUNING.pathPreview,
    pathPreviewMarkers:
      base.pathPreviewMarkers ?? DEFAULT_VIBE_CAMERA_TUNING.pathPreviewMarkers,
    pathPreviewMarkerSize: clampPathPreviewMarkerSize(
      base.pathPreviewMarkerSize ??
        DEFAULT_VIBE_CAMERA_TUNING.pathPreviewMarkerSize,
    ),
  };
}

export function vibeCameraTuningFromProfile(
  profile: VibeCameraProfileId,
): VibeCameraTuning {
  return normalizeVibeCameraTuning({
    profileMode: profile,
    ...VIBE_CAMERA_PROFILE_TUNING[profile],
  });
}

export function vibeCameraProfileMatchesTuning(
  profile: VibeCameraProfileId,
  tuning: Omit<VibeCameraTuning, 'profileMode'>,
): boolean {
  const base = VIBE_CAMERA_PROFILE_TUNING[profile];
  const eps = 0.6;
  const near = (a: number, b: number) => Math.abs(a - b) < eps;
  return (
    near(tuning.speed, base.speed) &&
    near(tuning.pullOut, base.pullOut) &&
    near(tuning.pathWildness, base.pathWildness) &&
    near(tuning.lookWander, base.lookWander) &&
    tuning.pathQueueSize === base.pathQueueSize &&
    near(tuning.maxSegmentChord, base.maxSegmentChord) &&
    tuning.pathPreview === base.pathPreview &&
    tuning.pathPreviewMarkers === base.pathPreviewMarkers &&
    near(tuning.pathPreviewMarkerSize, base.pathPreviewMarkerSize)
  );
}

export function resolveVibeCameraParams(
  tuning: Partial<VibeCameraTuning> | null | undefined,
): ResolvedVibeCameraParams {
  const normalized = normalizeVibeCameraTuning(tuning);
  const { speed, overdrive, crawl } = resolveVibeSpeedFactors(normalized.speed);
  const pull = normalized.pullOut;
  const wild = normalized.pathWildness;
  const look = normalized.lookWander;

  return {
    segDurMin: vibeSpeedDuration(lerp(16, 1.65, speed), overdrive, crawl),
    segDurMax: vibeSpeedDuration(lerp(48, 6.4, speed), overdrive, crawl),
    firstDurBase: vibeSpeedDuration(lerp(15, 1.75, speed), overdrive, crawl),
    firstDurSpan: vibeSpeedDuration(lerp(22, 2.4, speed), overdrive, crawl),
    firstDurBoostChance: lerp(0.28, 0.08, speed),
    firstDurBoostMin: lerp(1.04, 1.01, speed),
    firstDurBoostSpan: vibeSpeedDuration(
      lerp(0.2, 0.08, speed),
      overdrive,
      crawl,
      0.35,
    ),
    chainDurMul: vibeSpeedOverdriveMul(
      lerp(1.14, 0.98, speed),
      overdrive,
      0.82,
    ),
    chordRatioMin: lerp(0.92, 0.86, speed),
    chordRatioMax: lerp(1.12, 1.26, speed),
    legatoMin: lerp(1.01, 0.97, speed),
    legatoMax: lerp(1.04, 1.08, speed),
    durRelLow: lerp(0.94, 0.84, speed),
    durRelHigh: lerp(1.1, 1.22, speed),
    chordDurFloorMul: vibeSpeedDuration(
      lerp(0.42, 0.2, speed),
      overdrive,
      crawl,
      0.25,
    ),
    chordDurFloorAdd: vibeSpeedDuration(
      lerp(2.55, 0.95, speed),
      overdrive,
      crawl,
    ),
    chordDurFloorCap: vibeSpeedDuration(
      lerp(8.2, 3.8, speed),
      overdrive,
      crawl,
    ),
    pullOutFallbackMin: lerp(2.4, 3.8, pull),
    pullOutFallbackSpan: lerp(4.2, 6.2, pull),
    pullOutChanceMain: lerp(0.28, 0.52, pull),
    pullOutPushMainMin: lerp(0.7, 1.2, pull),
    pullOutPushMainSpan: lerp(2.8, 4.4, pull),
    pullOutChanceBoost: lerp(0.06, 0.16, pull),
    pullOutPushBoostMin: lerp(1.4, 2.2, pull),
    pullOutPushBoostSpan: lerp(3.2, 5.2, pull),
    pullOutNearDist: lerp(7.2, 9.4, pull),
    pullOutNearChance: lerp(0.18, 0.34, pull),
    pullOutNearRefDist: lerp(8.4, 9.6, pull),
    pullOutNearFactorMin: lerp(0.14, 0.22, pull),
    pullOutNearFactorSpan: lerp(0.24, 0.36, pull),
    pullOutScaleChance: lerp(0.1, 0.2, pull),
    pullOutScaleMin: lerp(1.03, 1.05, pull),
    pullOutScaleSpan: lerp(0.1, 0.16, pull),
    pathWildnessMul: lerp(0.72, 1.38, wild),
    p3Jitter: lerp(0.55, 1.15, wild),
    handleOutMin: lerp(1.15, 1.55, wild),
    handleOutSpan: lerp(2.6, 4.2, wild),
    handleInNegMin: lerp(1.7, 2.2, wild),
    handleInNegSpan: lerp(3.8, 5.6, wild),
    p2LerpMin: lerp(0.08, 0.14, wild),
    p2LerpSpan: lerp(0.32, 0.48, wild),
    lookWanderSpeed: lerp(0.034, 0.078, look),
    lookEqualLayerBlend: lerp(0.44, 0.26, look),
    queueMin: normalized.pathQueueSize,
    maxSegmentChord: normalized.maxSegmentChord,
    pathPreviewMaxSegments: PATH_PREVIEW_MAX_SEGMENTS,
    pathPreview: normalized.pathPreview,
    pathPreviewMarkers: normalized.pathPreviewMarkers,
    pathPreviewMarkerRadius: normalized.pathPreviewMarkerSize,
  };
}
