export type VibeCameraProfileId = 'smooth' | 'balanced' | 'funky' | 'rocket';

export type VibeCameraProfileMode = VibeCameraProfileId | 'custom';

/** `followPath`: Ansicht folgt dem Vibe-Pfad; `freeLook`: frei steuern, Pfad-Kamera als Modell. */
export type VibeCameraControlMode = 'followPath' | 'freeLook';

export type VibeCameraTuning = {
  profileMode: VibeCameraProfileMode;
  controlMode: VibeCameraControlMode;
  /** 0 = langsam, {@link VIBE_SPEED_MAX} = schnell */
  speed: number;
  /** 0 = nah, 1 = weiter raus */
  pullOut: number;
  /** 0 = ruhig, orbit-artig; 1 = sehr wilde Kurven */
  pathWildness: number;
  /**
   * 0 = vor allem Außenorbit; 1 = häufige Durchquerung durch die Szene.
   */
  pathTraverse: number;
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
  /**
   * Skalierung des Gravitations-Horizonts (Ellipsoid um den Pfad-Schwerpunkt).
   * 1 = automatisch aus Layout.
   */
  pathHorizonRadiusScale: number;
  /** Ellipsoid-Vorschau für den Pfad-Horizont in der Szene */
  pathHorizonSpherePreview: boolean;
};

export const VIBE_SPEED_MAX = 100;

/** Bis hier entspricht das Tempo dem früheren Maximum (Slider 0–10). */
export const VIBE_SPEED_REFERENCE = 10;

export const VIBE_CAMERA_CONTROL_MODE_LABELS: Record<
  VibeCameraControlMode,
  string
> = {
  followPath: 'Pfad folgen',
  freeLook: 'Frei bewegen',
};

export const DEFAULT_VIBE_CAMERA_TUNING: VibeCameraTuning = {
  profileMode: 'balanced',
  controlMode: 'freeLook',
  speed: 50,
  pullOut: 0.5,
  pathWildness: 0.5,
  pathTraverse: 0.45,
  lookWander: 0.5,
  pathQueueSize: 100,
  maxSegmentChord: 4,
  pathPreview: true,
  pathPreviewMarkers: true,
  pathPreviewMarkerSize: 0.16,
  pathHorizonRadiusScale: 1,
  pathHorizonSpherePreview: false,
};

export const VIBE_CAMERA_PROFILE_TUNING: Record<
  VibeCameraProfileId,
  Omit<VibeCameraTuning, 'profileMode'>
> = {
  smooth: {
    ...DEFAULT_VIBE_CAMERA_TUNING,
    speed: 25,
    pullOut: 0.4,
    pathWildness: 0.2,
    pathTraverse: 0.15,
    lookWander: 0.3,
    pathPreview: true,
    pathPreviewMarkers: true,
    pathPreviewMarkerSize: 0.16,
  },
  balanced: {
    ...DEFAULT_VIBE_CAMERA_TUNING,
    speed: 50,
    pullOut: 0.5,
    pathWildness: 0.5,
    pathTraverse: 0.45,
    lookWander: 0.5,
    pathPreview: true,
    pathPreviewMarkers: true,
    pathPreviewMarkerSize: 0.16,
  },
  funky: {
    ...DEFAULT_VIBE_CAMERA_TUNING,
    speed: 55,
    pullOut: 0.52,
    pathWildness: 0.75,
    pathTraverse: 0.72,
    lookWander: 0.7,
    pathPreview: true,
    pathPreviewMarkers: true,
    pathPreviewMarkerSize: 0.16,
  },
  rocket: {
    ...DEFAULT_VIBE_CAMERA_TUNING,
    speed: 100,
    pullOut: 0.38,
    pathWildness: 0.65,
    pathTraverse: 0.58,
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
  /** 1 = lange gleichmäßige Abschnitte, 0 = abrupte Richtungswechsel */
  pathContinuity: number;
  pathOrbitBlend: number;
  /** 0 = sanft, 1 = starke Kurven innerhalb eines Segments */
  pathIntraCurve: number;
  pathHeadingYawMax: number;
  pathTangentChordMin: number;
  pathTangentChordSpan: number;
  pathHandlePerpMin: number;
  pathHandlePerpSpan: number;
  pathChordRatioMin: number;
  pathChordRatioMax: number;
  pathPullOutScale: number;
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
  horizonRadiusScale: number;
  pathHorizonSpherePreview: boolean;
  pathTraverse: number;
};

export const PATH_HORIZON_RADIUS_SCALE_MIN = 0.2;
export const PATH_HORIZON_RADIUS_SCALE_MAX = 3;

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

const clampPathHorizonRadiusScale = (value: number): number =>
  Math.min(
    PATH_HORIZON_RADIUS_SCALE_MAX,
    Math.max(PATH_HORIZON_RADIUS_SCALE_MIN, value),
  );

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
  const controlMode =
    base.controlMode ?? DEFAULT_VIBE_CAMERA_TUNING.controlMode;
  return {
    profileMode: base.profileMode ?? DEFAULT_VIBE_CAMERA_TUNING.profileMode,
    controlMode: controlMode === 'freeLook' ? 'freeLook' : 'followPath',
    speed: clampVibeSpeed(base.speed ?? DEFAULT_VIBE_CAMERA_TUNING.speed),
    pullOut: clamp01(base.pullOut ?? DEFAULT_VIBE_CAMERA_TUNING.pullOut),
    pathWildness: clamp01(
      base.pathWildness ?? DEFAULT_VIBE_CAMERA_TUNING.pathWildness,
    ),
    pathTraverse: clamp01(
      base.pathTraverse ?? DEFAULT_VIBE_CAMERA_TUNING.pathTraverse,
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
    pathHorizonRadiusScale: clampPathHorizonRadiusScale(
      base.pathHorizonRadiusScale ??
        DEFAULT_VIBE_CAMERA_TUNING.pathHorizonRadiusScale,
    ),
    pathHorizonSpherePreview:
      base.pathHorizonSpherePreview ??
      DEFAULT_VIBE_CAMERA_TUNING.pathHorizonSpherePreview,
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
    tuning.controlMode === base.controlMode &&
    near(tuning.speed, base.speed) &&
    near(tuning.pullOut, base.pullOut) &&
    near(tuning.pathWildness, base.pathWildness) &&
    near(tuning.pathTraverse, base.pathTraverse) &&
    near(tuning.lookWander, base.lookWander) &&
    tuning.pathQueueSize === base.pathQueueSize &&
    near(tuning.maxSegmentChord, base.maxSegmentChord) &&
    tuning.pathPreview === base.pathPreview &&
    tuning.pathPreviewMarkers === base.pathPreviewMarkers &&
    near(tuning.pathPreviewMarkerSize, base.pathPreviewMarkerSize) &&
    near(tuning.pathHorizonRadiusScale, base.pathHorizonRadiusScale) &&
    tuning.pathHorizonSpherePreview === base.pathHorizonSpherePreview
  );
}

export function resolveVibeCameraParams(
  tuning: Partial<VibeCameraTuning> | null | undefined,
): ResolvedVibeCameraParams {
  const normalized = normalizeVibeCameraTuning(tuning);
  const { speed, overdrive, crawl } = resolveVibeSpeedFactors(normalized.speed);
  const pull = normalized.pullOut;
  const wildLinear = clamp01(normalized.pathWildness);
  const wild = wildLinear * wildLinear * (3 - 2 * wildLinear);
  const wildHigh = Math.pow(wildLinear, 0.62);
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
    pathWildnessMul: lerp(0, 2.45, wildHigh),
    p3Jitter: lerp(0.06, 2.1, wildHigh),
    pathContinuity: lerp(1, 0, wildHigh),
    pathOrbitBlend: lerp(0.94, 0.08, wildHigh),
    pathIntraCurve: wildHigh,
    pathHeadingYawMax: lerp(0.035, 1.75, wildHigh),
    pathTangentChordMin: lerp(5.8, 0.65, wildHigh),
    pathTangentChordSpan: lerp(5.2, 5.8, wildHigh),
    pathHandlePerpMin: lerp(0.08, 1.85, wildHigh),
    pathHandlePerpSpan: lerp(0.25, 5.8, wildHigh),
    pathChordRatioMin: lerp(0.965, 0.78, wildHigh),
    pathChordRatioMax: lerp(1.035, 1.42, wildHigh),
    pathPullOutScale: lerp(0, 1, wildHigh),
    handleOutMin: lerp(0.85, 1.75, wildHigh),
    handleOutSpan: lerp(1.4, 5.2, wildHigh),
    handleInNegMin: lerp(1.2, 2.65, wildHigh),
    handleInNegSpan: lerp(2.2, 6.8, wildHigh),
    p2LerpMin: lerp(0.04, 0.2, wildHigh),
    p2LerpSpan: lerp(0.18, 0.58, wildHigh),
    lookWanderSpeed: lerp(0.034, 0.078, look),
    lookEqualLayerBlend: lerp(0.44, 0.26, look),
    queueMin: normalized.pathQueueSize,
    maxSegmentChord: normalized.maxSegmentChord,
    pathPreviewMaxSegments: PATH_PREVIEW_MAX_SEGMENTS,
    pathPreview: normalized.pathPreview,
    pathPreviewMarkers: normalized.pathPreviewMarkers,
    pathPreviewMarkerRadius: normalized.pathPreviewMarkerSize,
    horizonRadiusScale: normalized.pathHorizonRadiusScale,
    pathHorizonSpherePreview: normalized.pathHorizonSpherePreview,
    pathTraverse: normalized.pathTraverse,
  };
}
