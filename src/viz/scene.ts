import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import {
  clampVibeGravityHorizon,
  createVibeGravityPathState,
  refreshVibeGravityHorizonRadii,
  resolveVibeGravityHorizonLimit,
  resolveVibeGravityStrength,
  simulateVibeGravitySegmentEnd,
  snapVibePositionToElevationPass,
  VIBE_GRAVITY_STRENGTH,
  vibeCoasterDistanceFraction,
  type VibePathElevationPass,
} from './vibe-camera-gravity-path';
import {
  DEFAULT_VIBE_CAMERA_TUNING,
  normalizeVibeCameraTuning,
  resolveVibeCameraParams,
  type ResolvedVibeCameraParams,
  type VibeCameraControlMode,
  type VibeCameraTuning,
  type VibePathPreviewThemeColor,
} from './vibe-camera-settings';
import {
  DEFAULT_VIZ_LIGHT_COLORS,
  DEFAULT_VIZ_POST_PROCESS,
  DEFAULT_VIZ_SCENE_COLORS,
  isValidHexColor6,
  mergeVizSceneColors,
  relativeLuminanceHex,
  type VizLightColorSettings,
  type VizPostProcessSettings,
  type VizSceneColorSettings,
} from './viz-appearance';
import { WorkerCanvasDomSurfaceStub } from './worker-canvas-dom-surface-stub';

export type NeuronalGlSceneDomMount = {
  mode: 'dom';
  container: HTMLElement;
};

export type NeuronalGlSceneWorkerMount = {
  mode: 'worker';
  offscreenCanvas: OffscreenCanvas;
  orbitDomSurface: WorkerCanvasDomSurfaceStub;
  /** Aktuelles Geräte-Pixelverhältnis (vom Hauptthread gespiegelt). */
  getPixelRatio: () => number;
};

export type NeuronalGlSceneMount =
  | NeuronalGlSceneDomMount
  | NeuronalGlSceneWorkerMount;

function colorFromHex6(hex: string): THREE.Color {
  return new THREE.Color(parseInt(hex.slice(1), 16));
}

/** Referenz-Intensitäten (dunkle Szene); bei hellen Lichtfarben runterskalieren */
const LIGHT_INTENSITY_BASE = {
  hemi: 1.7,
  ambient: 0.95,
  key: 2.8,
  fill: 1.6,
  rim: 1.2,
  point: 14,
};

/**
 * Wenn Hemisphären-Boden und Himmel alle sehr hell sind (typisch helles Daisy-Theme),
 * sonst würden die hohen Three-Intensitäten + Bloom alles ausfressen.
 */
function intensityScaleForLights(lc: VizLightColorSettings): number {
  if (!isValidHexColor6(lc.hemiGround)) return 1;
  const g = relativeLuminanceHex(lc.hemiGround);
  if (g < 0.34) return 1;
  const sky = isValidHexColor6(lc.hemiSky)
    ? relativeLuminanceHex(lc.hemiSky)
    : g;
  const amb = isValidHexColor6(lc.ambient)
    ? relativeLuminanceHex(lc.ambient)
    : g;
  const mx = Math.max(sky, amb, g);
  if (mx < 0.52) return 1;
  if (mx > 0.9) return 0.32;
  return 1 - ((mx - 0.52) / (0.9 - 0.52)) * (1 - 0.32);
}

/** Optional: Netz-Blickziel für Vibe-Kamera (Viz-Worker / Network3D). */
export type VibeNetworkLookFocusSampler = {
  /**
   * @param out Zielvektor
   * @param elapsedSec Zeit seit Vibe-Start (Three.js-Clock), z. B. für wandernde Foci
   */
  fillLayoutCentroid: (out: THREE.Vector3, elapsedSec?: number) => void;
  /** Schwerpunkt für Gravitations-Pfad (ohne Wanderung). */
  fillPathGravityFocus: (out: THREE.Vector3) => void;
  fillLayoutBounds: (min: THREE.Vector3, max: THREE.Vector3) => void;
};

export function createScene(mount: NeuronalGlSceneMount): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  render: () => void;
  renderDisplay: () => void;
  setVibeCameraMode: (enabled: boolean) => void;
  applyVibeCameraSettings: (tuning: VibeCameraTuning) => void;
  setVibeNetworkLookFocus: (
    sampler: VibeNetworkLookFocusSampler | null,
  ) => void;
  applyVizSceneColors: (next: VizSceneColorSettings) => void;
  applyVizLightColors: (next: VizLightColorSettings) => void;
  applyVizPostProcess: (next: VizPostProcessSettings) => void;
  syncLayoutFromMount: () => void;
  dispose: () => void;
} {
  const isDom = mount.mode === 'dom';
  const domContainer = isDom ? mount.container : null;
  const orbitDomSurface = isDom ? null : mount.orbitDomSurface;

  const drawableSize = (): { w: number; h: number } => {
    if (isDom && domContainer) {
      const w = Math.max(1, Math.floor(domContainer.clientWidth));
      const h = Math.max(1, Math.floor(domContainer.clientHeight));
      return { w, h };
    }
    if (orbitDomSurface) {
      return {
        w: Math.max(1, Math.floor(orbitDomSurface.clientWidth)),
        h: Math.max(1, Math.floor(orbitDomSurface.clientHeight)),
      };
    }
    return { w: 1, h: 1 };
  };

  const effectivePixelRatio = (): number => {
    if (isDom) return Math.min(window.devicePixelRatio, 2);
    return Math.min(mount.getPixelRatio(), 2);
  };

  const scene = new THREE.Scene();
  scene.background = colorFromHex6(DEFAULT_VIZ_SCENE_COLORS.backgroundFog);
  scene.fog = new THREE.Fog(
    parseInt(DEFAULT_VIZ_SCENE_COLORS.backgroundFog.slice(1), 16),
    DEFAULT_VIZ_SCENE_COLORS.fogNear,
    DEFAULT_VIZ_SCENE_COLORS.fogFar,
  );

  const camera = new THREE.PerspectiveCamera(
    55,
    (() => {
      const { w, h } = drawableSize();
      return w / h;
    })(),
    0.1,
    200,
  );
  camera.position.set(-8, 4, 4);

  const renderer = new THREE.WebGLRenderer(
    isDom
      ? { antialias: true, alpha: true }
      : { antialias: true, alpha: true, canvas: mount.offscreenCanvas },
  );
  const updateCanvasDomStyle = isDom;
  renderer.setPixelRatio(effectivePixelRatio());
  {
    const { w, h } = drawableSize();
    renderer.setSize(w, h, updateCanvasDomStyle);
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  const hemi = new THREE.HemisphereLight(
    parseInt(DEFAULT_VIZ_LIGHT_COLORS.hemiSky.slice(1), 16),
    parseInt(DEFAULT_VIZ_LIGHT_COLORS.hemiGround.slice(1), 16),
    1.7,
  );
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(
    parseInt(DEFAULT_VIZ_LIGHT_COLORS.ambient.slice(1), 16),
    0.95,
  );
  scene.add(ambient);

  const key = new THREE.DirectionalLight(
    parseInt(DEFAULT_VIZ_LIGHT_COLORS.key.slice(1), 16),
    2.8,
  );
  key.position.set(7, 10, 8);
  scene.add(key);

  const fill = new THREE.DirectionalLight(
    parseInt(DEFAULT_VIZ_LIGHT_COLORS.fill.slice(1), 16),
    1.6,
  );
  fill.position.set(-6, 4, -3);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(
    parseInt(DEFAULT_VIZ_LIGHT_COLORS.rim.slice(1), 16),
    1.2,
  );
  rim.position.set(-2, 7, 12);
  scene.add(rim);

  const backAccent = new THREE.PointLight(
    parseInt(DEFAULT_VIZ_LIGHT_COLORS.backAccent.slice(1), 16),
    14,
    24,
    2,
  );
  backAccent.position.set(-4, 3, -10);
  scene.add(backAccent);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(60, 96),
    new THREE.MeshBasicMaterial({
      color: parseInt(DEFAULT_VIZ_SCENE_COLORS.floor.slice(1), 16),
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.2;
  floor.visible = DEFAULT_VIZ_SCENE_COLORS.floorVisible;
  scene.add(floor);

  const VIBE_PATH_SAMPLES_FULL = 26;
  const VIBE_PATH_SAMPLES_CURRENT = 32;

  const VIBE_PATH_SEG_PALETTE = [
    0x5ec8ff, 0xff935f, 0x92f06a, 0xca7dff, 0xffe45c, 0x5ff5d1, 0xff6b9d,
  ];
  const vibePathPreviewRoot = new THREE.Group();
  vibePathPreviewRoot.visible = false;
  vibePathPreviewRoot.frustumCulled = false;
  scene.add(vibePathPreviewRoot);

  const vibePathCameraRig = new THREE.Group();
  vibePathCameraRig.visible = false;
  vibePathCameraRig.frustumCulled = false;
  const vibePathCameraBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.24, 0.52),
    new THREE.MeshBasicMaterial({
      color: 0x6a8aaa,
      transparent: true,
      opacity: 0.88,
      depthTest: true,
      depthWrite: false,
    }),
  );
  vibePathCameraBody.position.set(0, 0, -0.12);
  const vibePathCameraLens = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.18, 0.2),
    new THREE.MeshBasicMaterial({
      color: 0xa8c8ee,
      transparent: true,
      opacity: 0.92,
      depthTest: true,
      depthWrite: false,
    }),
  );
  vibePathCameraLens.position.set(0, 0, 0.3);
  vibePathCameraRig.add(vibePathCameraBody, vibePathCameraLens);
  scene.add(vibePathCameraRig);

  const vibeHorizonSphereRoot = new THREE.Group();
  vibeHorizonSphereRoot.visible = false;
  vibeHorizonSphereRoot.frustumCulled = false;
  const vibeHorizonSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 28),
    new THREE.MeshBasicMaterial({
      color: 0x6eb8ff,
      transparent: true,
      opacity: 0.14,
      wireframe: true,
      depthTest: true,
      depthWrite: false,
    }),
  );
  vibeHorizonSphereRoot.add(vibeHorizonSphere);
  scene.add(vibeHorizonSphereRoot);

  const vibePathLinePool: THREE.Line[] = [];
  const vibePathMarkerPool: THREE.Mesh[] = [];
  const vibePathMarkerGeometry = new THREE.SphereGeometry(1, 12, 10);
  const vibePathScratchColor = new THREE.Color();
  const vibePathFadeTargetColor = new THREE.Color();
  let vibePathThemeLightColors: VizLightColorSettings = {
    ...DEFAULT_VIZ_LIGHT_COLORS,
  };

  const vibePathEval = new THREE.Vector3();

  const VIBE_PATH_THEME_LIGHT_KEY: Record<
    VibePathPreviewThemeColor,
    keyof VizLightColorSettings
  > = {
    primary: 'key',
    accent: 'rim',
    secondary: 'fill',
    info: 'backAccent',
  };

  function vibePathSegColorHex(colorIndex: number): number {
    return VIBE_PATH_SEG_PALETTE[colorIndex % VIBE_PATH_SEG_PALETTE.length]!;
  }

  let vibeNextPathColorIndex = 0;

  const vibeResolvePathThemeColorHex = (): number => {
    const lightKey =
      VIBE_PATH_THEME_LIGHT_KEY[vibeCamParams.pathPreviewThemeColor];
    const hex = vibePathThemeLightColors[lightKey];
    if (!isValidHexColor6(hex)) return VIBE_PATH_SEG_PALETTE[0]!;
    return parseInt(hex.slice(1), 16);
  };

  const vibeAllocatePathPreviewColor = (): number => {
    if (vibeCamParams.pathPreviewColorMode === 'themeGradient') {
      return vibeResolvePathThemeColorHex();
    }
    const colorHex = vibePathSegColorHex(vibeNextPathColorIndex);
    vibeNextPathColorIndex++;
    return colorHex;
  };

  const vibeApplyPathPreviewAppearance = (
    segIndex: number,
    previewSegmentCount: number,
    isCurrent: boolean,
    segmentColorHex: number,
  ): number => {
    if (vibeCamParams.pathPreviewColorMode === 'random') {
      vibePathScratchColor.setHex(segmentColorHex);
      return isCurrent ? 0.82 : 0.48;
    }

    vibePathScratchColor.setHex(vibeResolvePathThemeColorHex());
    const depthMax = Math.max(1, previewSegmentCount - 1);
    const depth = segIndex / depthMax;
    vibePathFadeTargetColor.setHex(0x000000);
    vibePathScratchColor.lerp(vibePathFadeTargetColor, depth * 0.72);
    const opacityNear = isCurrent ? 0.88 : 0.8;
    const opacityFar = 0.18;
    return opacityNear + (opacityFar - opacityNear) * depth;
  };

  function acquireVibePathLine(lineIndex: number): THREE.Line {
    while (vibePathLinePool.length <= lineIndex) {
      const positions = new Float32Array((VIBE_PATH_SAMPLES_CURRENT + 1) * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      );
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          transparent: true,
          opacity: 0.58,
          depthTest: true,
          depthWrite: false,
        }),
      );
      line.frustumCulled = false;
      vibePathPreviewRoot.add(line);
      vibePathLinePool.push(line);
    }
    return vibePathLinePool[lineIndex]!;
  }

  function acquireVibePathMarker(markerIndex: number): THREE.Mesh {
    while (vibePathMarkerPool.length <= markerIndex) {
      const marker = new THREE.Mesh(
        vibePathMarkerGeometry,
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0.9,
          depthTest: true,
          depthWrite: false,
        }),
      );
      marker.frustumCulled = false;
      vibePathPreviewRoot.add(marker);
      vibePathMarkerPool.push(marker);
    }
    return vibePathMarkerPool[markerIndex]!;
  }

  function hideUnusedVibePathPreview(
    lineCount: number,
    markerCount: number,
  ): void {
    for (let index = lineCount; index < vibePathLinePool.length; index++) {
      vibePathLinePool[index]!.visible = false;
    }
    for (let index = markerCount; index < vibePathMarkerPool.length; index++) {
      vibePathMarkerPool[index]!.visible = false;
    }
  }

  function disposeVibePathPreviewPools(): void {
    vibePathLinePool.forEach((line) => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    });
    vibePathLinePool.length = 0;
    vibePathMarkerPool.forEach((marker) => {
      (marker.material as THREE.Material).dispose();
    });
    vibePathMarkerPool.length = 0;
    vibePathMarkerGeometry.dispose();
  }

  const controlsTarget = isDom
    ? renderer.domElement
    : (orbitDomSurface as unknown as HTMLElement);
  const controls = new OrbitControls(camera, controlsTarget);
  controls.enableDamping = true;
  controls.target.set(4, 0, 0);

  const navCodes = new Set([
    'KeyW',
    'KeyS',
    'KeyA',
    'KeyD',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
  ]);
  const keysDown = new Set<string>();
  const inputClock = new THREE.Clock();
  const vRight = new THREE.Vector3();
  const vForward = new THREE.Vector3();
  const vMove = new THREE.Vector3();
  const moveSpeed = 12;

  let vibeCameraMode = false;
  let vibeCamControlMode: VibeCameraControlMode =
    DEFAULT_VIBE_CAMERA_TUNING.controlMode;
  const vibeClock = new THREE.Clock();
  const vibeSavedCam = new THREE.Vector3();
  const vibeSavedTarget = new THREE.Vector3();
  let vibeSavedEnableDamping = true;

  let vibeCamParams = resolveVibeCameraParams(DEFAULT_VIBE_CAMERA_TUNING);

  const syncVibeCameraControls = (): void => {
    if (!vibeCameraMode) return;
    const freeLook = vibeCamControlMode === 'freeLook';
    controls.enabled = freeLook;
    controls.enableDamping = freeLook ? vibeSavedEnableDamping : false;
    vibePathCameraRig.visible = freeLook;
  };

  const updateVibePathCameraRig = (): void => {
    vibePathCameraRig.position.copy(vibeIdealCam);
    vibePathCameraRig.up.copy(vibeIdealUp).normalize();
    vibePathCameraRig.lookAt(vibeNetFocus);
  };

  type VibeCamCurveSeg = {
    dur: number;
    previewColorHex: number;
    p0: THREE.Vector3;
    p1: THREE.Vector3;
    p2: THREE.Vector3;
    p3: THREE.Vector3;
    l0: THREE.Vector3;
    l1: THREE.Vector3;
    l2: THREE.Vector3;
    l3: THREE.Vector3;
    elevationPass: VibePathElevationPass;
    simPathLength: number;
    startSpeed: number;
    endSpeed: number;
    arcLengthTotal: number;
    arcLengthTable: Float32Array | null;
  };

  const VIBE_ARC_LENGTH_SAMPLES = 28;

  function vibeBezierEvalPoint(
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
    d: THREE.Vector3,
    s: number,
    out: THREE.Vector3,
  ): void {
    const om = 1 - s;
    const t0 = om * om * om;
    const t1 = 3 * om * om * s;
    const t2 = 3 * om * s * s;
    const t3 = s * s * s;
    out.set(0, 0, 0);
    out.addScaledVector(a, t0);
    out.addScaledVector(b, t1);
    out.addScaledVector(c, t2);
    out.addScaledVector(d, t3);
  }

  function buildVibeSegmentArcLengthTable(segment: VibeCamCurveSeg): void {
    const sampleCount = VIBE_ARC_LENGTH_SAMPLES;
    const table = new Float32Array(sampleCount + 1);
    table[0] = 0;
    vibePathEval.copy(segment.p0);
    for (let sampleIndex = 1; sampleIndex <= sampleCount; sampleIndex++) {
      const parameter = sampleIndex / sampleCount;
      vibeBezierEvalPoint(
        segment.p0,
        segment.p1,
        segment.p2,
        segment.p3,
        parameter,
        vibeScratchLerp,
      );
      table[sampleIndex] =
        table[sampleIndex - 1]! + vibePathEval.distanceTo(vibeScratchLerp);
      vibePathEval.copy(vibeScratchLerp);
    }
    segment.arcLengthTable = table;
    segment.arcLengthTotal = table[sampleCount]!;
  }

  function vibeBezierWFromArcFraction(
    segment: VibeCamCurveSeg,
    arcFraction: number,
  ): number {
    const fraction = arcFraction < 0 ? 0 : arcFraction > 1 ? 1 : arcFraction;
    const table = segment.arcLengthTable;
    const totalLength = segment.arcLengthTotal;
    if (!table || totalLength < 1e-6) return fraction;

    const targetDistance = fraction * totalLength;
    let lowIndex = 0;
    let highIndex = table.length - 1;
    while (lowIndex < highIndex - 1) {
      const midIndex = (lowIndex + highIndex) >> 1;
      if (table[midIndex]! < targetDistance) lowIndex = midIndex;
      else highIndex = midIndex;
    }

    const lowDistance = table[lowIndex]!;
    const highDistance = table[highIndex]!;
    const span = highDistance - lowDistance;
    const segmentBlend =
      span < 1e-8 ? 0 : (targetDistance - lowDistance) / span;
    const lowParameter = lowIndex / VIBE_ARC_LENGTH_SAMPLES;
    const highParameter = highIndex / VIBE_ARC_LENGTH_SAMPLES;
    return THREE.MathUtils.lerp(lowParameter, highParameter, segmentBlend);
  }

  function vibeSegmentBezierProgress(
    segment: VibeCamCurveSeg,
    linearTime: number,
  ): number {
    const time = linearTime < 0 ? 0 : linearTime > 1 ? 1 : linearTime;
    const cruiseSpeed = Math.max(vibeResolveFlightSpeed(), 1e-3);
    const startSpeed =
      segment.startSpeed > 1e-5 ? segment.startSpeed : cruiseSpeed;
    const endSpeed = segment.endSpeed > 1e-5 ? segment.endSpeed : cruiseSpeed;
    const arcFraction = vibeCoasterDistanceFraction(time, startSpeed, endSpeed);
    return vibeBezierWFromArcFraction(segment, arcFraction);
  }

  function refreshVibeSegmentMotionMetadata(segment: VibeCamCurveSeg): void {
    const cruiseSpeed = Math.max(vibeResolveFlightSpeed(), 1e-3);
    segment.simPathLength = vibeGravityPathState.segmentPathLength;
    segment.startSpeed =
      vibeGravityPathState.segmentStartSpeed > 1e-5
        ? vibeGravityPathState.segmentStartSpeed
        : cruiseSpeed;
    segment.endSpeed =
      vibeGravityPathState.segmentEndSpeed > 1e-5
        ? vibeGravityPathState.segmentEndSpeed
        : cruiseSpeed;
    buildVibeSegmentArcLengthTable(segment);
  }

  function vibeRandomUnit(out: THREE.Vector3): void {
    out.set(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    );
    if (out.lengthSq() < 1e-8) out.set(0, 1, 0);
    else out.normalize();
  }

  function vibePickPathElevationPass(): VibePathElevationPass {
    const params = vibeCamParams;
    const roll = Math.random();
    if (roll < params.pathViewOverChance) return 'over';
    if (roll < params.pathViewOverChance + params.pathViewUnderChance) {
      return 'under';
    }
    return 'side';
  }

  function vibeSegmentViewDirection(
    cameraPosition: THREE.Vector3,
    lookTarget: THREE.Vector3,
    out: THREE.Vector3,
  ): void {
    out.copy(lookTarget).sub(cameraPosition);
    if (out.lengthSq() < 1e-8) out.set(0, -1, 0);
    else out.normalize();
  }

  /**
   * Up aus Welt-Y (bzw. Welt-Z bei steilem Blick) – kein Roll um die Blickachse.
   * right = view × refUp, up = right × view
   */
  function vibeResolveCameraUp(
    cameraPosition: THREE.Vector3,
    lookTarget: THREE.Vector3,
    out: THREE.Vector3,
  ): void {
    vibeSegmentViewDirection(cameraPosition, lookTarget, vibeScratchLerp);

    const worldUpReference =
      Math.abs(vibeScratchLerp.y) > 0.92
        ? vibeScratchDir.set(0, 0, 1)
        : vibeScratchDir.set(0, 1, 0);

    out.crossVectors(vibeScratchLerp, worldUpReference);
    if (out.lengthSq() < 1e-8) {
      worldUpReference.set(1, 0, 0);
      out.crossVectors(vibeScratchLerp, worldUpReference);
    }
    out.normalize();
    out.crossVectors(out, vibeScratchLerp).normalize();
  }

  function vibeSnapSegmentEndToElevationPass(
    end: THREE.Vector3,
    focus: THREE.Vector3,
    elevationPass: VibePathElevationPass,
  ): void {
    if (elevationPass === 'side') return;

    refreshVibeHorizonRadiiForFocus(focus);
    snapVibePositionToElevationPass(
      end,
      focus,
      vibeHorizonRadii,
      resolveVibeGravityHorizonLimit(vibeCamParams.pathTraverse),
      elevationPass,
    );
  }

  function vibeArcSegmentHandlesForElevation(
    segment: VibeCamCurveSeg,
    previous: VibeCamCurveSeg | null,
    focus: THREE.Vector3,
    elevationPass: VibePathElevationPass,
    lockPreviousEndHandle: boolean,
  ): void {
    if (elevationPass === 'side') return;

    refreshVibeHorizonRadiiForFocus(focus);
    const arcLift =
      vibeHorizonRadii.y *
      (elevationPass === 'over'
        ? THREE.MathUtils.lerp(0.42, 0.62, 0.5 + Math.random() * 0.5)
        : -THREE.MathUtils.lerp(0.38, 0.56, 0.5 + Math.random() * 0.5));
    const arcMidY = focus.y + arcLift;

    vibeScratchLerp.copy(segment.p0).lerp(segment.p3, 0.5);
    vibeScratchLerp.y = arcMidY;
    const handleBlend = 0.58;
    segment.p1.y = THREE.MathUtils.lerp(
      segment.p1.y,
      vibeScratchLerp.y,
      handleBlend,
    );
    segment.p2.y = THREE.MathUtils.lerp(
      segment.p2.y,
      vibeScratchLerp.y,
      handleBlend,
    );
    vibeEnforceBezierJoinContinuity(segment, previous, lockPreviousEndHandle);
  }

  function vibeJointOutgoingTangent(
    previous: VibeCamCurveSeg,
    out: THREE.Vector3,
  ): boolean {
    out.copy(previous.p3).sub(previous.p2);
    if (out.lengthSq() < 1e-6) out.copy(previous.p3).sub(previous.p0);
    if (out.lengthSq() < 1e-6) return false;
    out.normalize();
    return true;
  }

  /** Naht-Tangente: Bezier-Ausgang des Vorgängers, optional mit Simulationsrichtung gemischt. */
  function vibeResolveJointTangent(
    previous: VibeCamCurveSeg,
    out: THREE.Vector3,
  ): boolean {
    if (!vibeJointOutgoingTangent(previous, out)) return false;

    const continuity = vibeCamParams.pathContinuity;
    if (continuity >= 0.995) return true;

    const startVelocity = vibeGravityPathState.segmentStartVelocity;
    if (startVelocity.lengthSq() < 1e-6) return true;

    vibeScratchLerp.copy(startVelocity).normalize();
    out
      .multiplyScalar(continuity)
      .addScaledVector(vibeScratchLerp, 1 - continuity);
    if (out.lengthSq() < 1e-8) return vibeJointOutgoingTangent(previous, out);
    out.normalize();
    return true;
  }

  function vibeShouldLockPreviousEndHandle(
    previous: VibeCamCurveSeg | null,
  ): boolean {
    if (!previous || vibeSegQueue.length === 0) return false;
    if (previous !== vibeSegQueue[0]) return false;
    return vibeSegElapsed > 1e-4;
  }

  function vibeAlignTangentWithChord(
    tangent: THREE.Vector3,
    chordDirection: THREE.Vector3,
  ): void {
    if (tangent.dot(chordDirection) < 0) tangent.negate();
  }

  /** Eingang p1: Naht-Tangente; Ausgang p2: Simulations-/Sehnenrichtung (nicht identisch). */
  function vibeResolveSegmentStartTangent(
    segment: VibeCamCurveSeg,
    previous: VibeCamCurveSeg | null,
    out: THREE.Vector3,
  ): boolean {
    if (previous && vibeResolveJointTangent(previous, out)) return true;

    if (vibeGravityPathState.segmentStartVelocity.lengthSq() > 1e-6) {
      out.copy(vibeGravityPathState.segmentStartVelocity).normalize();
      return true;
    }

    out.copy(segment.p1).sub(segment.p0);
    if (out.lengthSq() < 1e-6) out.copy(segment.p3).sub(segment.p0);
    if (out.lengthSq() < 1e-6) return false;
    out.normalize();
    return true;
  }

  function vibeResolveSegmentEndTangent(
    segment: VibeCamCurveSeg,
    out: THREE.Vector3,
  ): boolean {
    const chordDirection = vibeIdealUp.copy(segment.p3).sub(segment.p0);
    const chordLength = chordDirection.length();
    if (chordLength < 1e-5) return false;
    chordDirection.multiplyScalar(1 / chordLength);

    if (vibeGravityPathState.velocity.lengthSq() > 1e-6) {
      out.copy(vibeGravityPathState.velocity).normalize();
    } else {
      out.copy(segment.p3).sub(segment.p2);
      if (out.lengthSq() < 1e-6) out.copy(chordDirection);
      else out.normalize();
    }

    const chordAlignment = out.dot(chordDirection);
    if (chordAlignment < 0.35) {
      const blend = THREE.MathUtils.clamp(1 - chordAlignment * 1.4, 0.35, 0.92);
      out.lerp(chordDirection, blend).normalize();
    }
    return true;
  }

  /** C¹ am Nahtpunkt; p2 entlang Ausgangstangente (vermeidet „gerade dann Knick“). */
  function vibeEnforceBezierJoinContinuity(
    segment: VibeCamCurveSeg,
    previous: VibeCamCurveSeg | null,
    lockPreviousEndHandle = false,
  ): void {
    const chord = Math.max(segment.p0.distanceTo(segment.p3), 1e-5);
    const handleSpan = chord * 0.48;
    const handleMin = chord * 0.24;
    const chordDirection = vibeScratchLerp.copy(segment.p3).sub(segment.p0);
    chordDirection.multiplyScalar(1 / chord);

    if (!vibeResolveSegmentStartTangent(segment, previous, vibeScratchDir))
      return;
    if (!previous) {
      vibeAlignTangentWithChord(vibeScratchDir, chordDirection);
    }

    if (!vibeResolveSegmentEndTangent(segment, vibeIdealUp)) return;

    const segmentEndLength = THREE.MathUtils.clamp(
      segment.p3.distanceTo(segment.p2),
      handleMin,
      handleSpan,
    );
    segment.p2.copy(segment.p3).addScaledVector(vibeIdealUp, -segmentEndLength);

    if (!previous) {
      const segmentStartLength = THREE.MathUtils.clamp(
        segment.p1.distanceTo(segment.p0),
        handleMin,
        handleSpan,
      );
      segment.p1
        .copy(segment.p0)
        .addScaledVector(vibeScratchDir, segmentStartLength);
      return;
    }

    const jointLength = THREE.MathUtils.clamp(
      lockPreviousEndHandle
        ? segment.p1.distanceTo(segment.p0)
        : Math.max(
            previous.p3.distanceTo(previous.p2),
            segment.p1.distanceTo(segment.p0),
          ),
      handleMin,
      handleSpan,
    );
    if (!lockPreviousEndHandle) {
      previous.p2
        .copy(previous.p3)
        .addScaledVector(vibeScratchDir, -jointLength);
    }
    segment.p1.copy(segment.p0).addScaledVector(vibeScratchDir, jointLength);
  }

  function vibeResolveFlightSpeed(): number {
    const params = vibeCamParams;
    const averageDuration = (params.segDurMin + params.segDurMax) * 0.5;
    return (
      (params.maxSegmentChord * 0.82) / Math.max(averageDuration * 0.52, 0.35)
    );
  }

  function refreshVibeHorizonRadiiForFocus(focus: THREE.Vector3): void {
    refreshVibeGravityHorizonRadii(
      focus,
      vibeLayoutMin,
      vibeLayoutMax,
      vibeHorizonRadii,
      vibeCamParams.horizonRadiusScale,
    );
  }

  /** Segment-Ende per Gravitations-Vorausintegration. */
  function vibePlaceSegmentEnd(
    start: THREE.Vector3,
    end: THREE.Vector3,
    focus: THREE.Vector3,
    segmentDurationSec: number,
  ): void {
    const pathTraverse = vibeCamParams.pathTraverse;
    refreshVibeHorizonRadiiForFocus(focus);
    simulateVibeGravitySegmentEnd(
      start,
      focus,
      segmentDurationSec,
      vibeResolveFlightSpeed(),
      resolveVibeGravityStrength(
        VIBE_GRAVITY_STRENGTH,
        vibeCamParams.horizonRadiusScale,
        pathTraverse,
      ),
      vibeHorizonRadii,
      pathTraverse,
      vibeGravityPathState,
      end,
    );
    clampVibeSegmentEndToMaxChord(start, end);
    clampVibeGravityHorizon(
      focus,
      end,
      vibeGravityPathState.velocity,
      vibeHorizonRadii,
      resolveVibeGravityHorizonLimit(pathTraverse),
    );
  }

  function vibePlaceCurveHandles(
    segment: VibeCamCurveSeg,
    previous: VibeCamCurveSeg | null,
    focus: THREE.Vector3,
  ): void {
    vibeScratchDir.copy(segment.p3).sub(segment.p0);
    const chord = vibeScratchDir.length();
    if (chord < 1e-5) return;

    const handleLength = chord * 0.44;
    segment.p1
      .copy(segment.p0)
      .addScaledVector(vibeGravityPathState.segmentStartVelocity, handleLength);
    segment.p2
      .copy(segment.p3)
      .addScaledVector(vibeGravityPathState.velocity, -handleLength);

    const lockPreviousEndHandle = vibeShouldLockPreviousEndHandle(previous);
    vibeEnforceBezierJoinContinuity(segment, previous, lockPreviousEndHandle);
    const horizonLimit = resolveVibeGravityHorizonLimit(
      vibeCamParams.pathTraverse,
    );
    clampVibeGravityHorizon(
      focus,
      segment.p1,
      vibeGravityPathState.segmentStartVelocity,
      vibeHorizonRadii,
      horizonLimit,
    );
    clampVibeGravityHorizon(
      focus,
      segment.p2,
      vibeGravityPathState.velocity,
      vibeHorizonRadii,
      horizonLimit,
    );
    vibeEnforceBezierJoinContinuity(segment, previous, lockPreviousEndHandle);
  }

  function clampVibeSegmentEndToMaxChord(
    start: THREE.Vector3,
    end: THREE.Vector3,
  ): void {
    const maxChord = vibeCamParams.maxSegmentChord;
    vibeScratchDir.copy(end).sub(start);
    const distance = vibeScratchDir.length();
    if (distance <= maxChord || distance < 1e-5) return;
    vibeScratchDir.multiplyScalar(maxChord / distance);
    end.copy(start).add(vibeScratchDir);
  }

  const vibeSegQueue: VibeCamCurveSeg[] = [];
  let vibeSegElapsed = 0;
  let vibeLastRawT = -1;

  const vibeScratchDir = new THREE.Vector3();
  const vibeScratchLerp = new THREE.Vector3();
  const vibeIdealCam = new THREE.Vector3();
  const vibeIdealUp = new THREE.Vector3();
  const vibeNetFocus = new THREE.Vector3(4, 0, 0);
  const vibePathGravityFocus = new THREE.Vector3(4, 0, 0);
  const vibeLayoutMin = new THREE.Vector3(0, -2.2, -4.5);
  const vibeLayoutMax = new THREE.Vector3(8.5, 2.8, 4.5);
  const vibeGravityPathState = createVibeGravityPathState();
  const vibeHorizonRadii = new THREE.Vector3(3, 1.1, 2.6);
  let vibeNetLookFill:
    | ((out: THREE.Vector3, elapsedSec: number) => void)
    | null = null;
  let vibePathGravityFill: ((out: THREE.Vector3) => void) | null = null;
  let vibeNetBoundsFill:
    | ((min: THREE.Vector3, max: THREE.Vector3) => void)
    | null = null;

  function refreshVibePathGravityFocus(): void {
    if (vibePathGravityFill) vibePathGravityFill(vibePathGravityFocus);
    else vibePathGravityFocus.set(4, 0, 0);
  }

  function refreshVibeLayoutBounds(): void {
    if (vibeNetBoundsFill) vibeNetBoundsFill(vibeLayoutMin, vibeLayoutMax);
  }

  function clampVibePointToLayoutBounds(
    point: THREE.Vector3,
    focus: THREE.Vector3 = vibeNetFocus,
  ): void {
    refreshVibeHorizonRadiiForFocus(focus);
    clampVibeGravityHorizon(
      focus,
      point,
      vibeGravityPathState.velocity,
      vibeHorizonRadii,
    );
  }

  function setVibeNetworkLookFocus(
    sampler: VibeNetworkLookFocusSampler | null,
  ): void {
    vibeNetLookFill = sampler
      ? (out, elapsedSec) => sampler.fillLayoutCentroid(out, elapsedSec)
      : null;
    vibePathGravityFill = sampler
      ? (out) => sampler.fillPathGravityFocus(out)
      : null;
    vibeNetBoundsFill = sampler
      ? (min, max) => sampler.fillLayoutBounds(min, max)
      : null;
    refreshVibeLayoutBounds();
    refreshVibePathGravityFocus();
  }

  const vibeEntranceBlend = {
    active: false,
    t0: 0,
    dur: 1.1,
    fromCam: new THREE.Vector3(),
    fromLook: new THREE.Vector3(),
    fromUp: new THREE.Vector3(),
  };

  function startVibeEntranceBlend(rawT: number, dur: number): void {
    vibeEntranceBlend.fromCam.copy(camera.position);
    camera.getWorldDirection(vibeScratchDir);
    vibeEntranceBlend.fromLook
      .copy(camera.position)
      .addScaledVector(vibeScratchDir, 1.85);
    vibeEntranceBlend.fromUp.copy(camera.up);
    vibeEntranceBlend.t0 = rawT;
    vibeEntranceBlend.dur = Math.max(0.2, dur);
    vibeEntranceBlend.active = true;
  }

  function createFirstVibeSeg(
    cam: THREE.Vector3,
    look: THREE.Vector3,
  ): VibeCamCurveSeg {
    const params = vibeCamParams;
    const seg: VibeCamCurveSeg = {
      dur: params.firstDurBase + Math.random() * params.firstDurSpan,
      previewColorHex: vibeAllocatePathPreviewColor(),
      p0: new THREE.Vector3().copy(cam),
      p1: new THREE.Vector3(),
      p2: new THREE.Vector3(),
      p3: new THREE.Vector3(),
      l0: new THREE.Vector3().copy(look),
      l1: new THREE.Vector3(),
      l2: new THREE.Vector3(),
      l3: new THREE.Vector3(),
      elevationPass: 'side',
      simPathLength: 0,
      startSpeed: 0,
      endSpeed: 0,
      arcLengthTotal: 0,
      arcLengthTable: null,
    };
    const lookScatter = params.lookWanderSpeed * 32;

    let segmentDuration =
      params.firstDurBase + Math.random() * params.firstDurSpan;
    if (Math.random() < params.firstDurBoostChance) {
      segmentDuration *=
        params.firstDurBoostMin + Math.random() * params.firstDurBoostSpan;
    }
    seg.dur = THREE.MathUtils.clamp(
      segmentDuration,
      params.segDurMin,
      params.segDurMax,
    );

    const elevationPass = vibePickPathElevationPass();
    seg.elevationPass = elevationPass;
    vibeGravityPathState.elevationPass = elevationPass;
    vibePlaceSegmentEnd(seg.p0, seg.p3, vibePathGravityFocus, seg.dur);
    vibeSnapSegmentEndToElevationPass(
      seg.p3,
      vibePathGravityFocus,
      elevationPass,
    );
    vibePlaceCurveHandles(seg, null, vibePathGravityFocus);
    vibeArcSegmentHandlesForElevation(
      seg,
      null,
      vibePathGravityFocus,
      elevationPass,
      false,
    );
    refreshVibeSegmentMotionMetadata(seg);

    seg.l3.copy(seg.p3);
    seg.l3.x += (Math.random() - 0.5) * 2.6 * lookScatter;
    seg.l3.y += (Math.random() - 0.5) * 2.1 * lookScatter;
    seg.l3.z += (Math.random() - 0.5) * 2.6 * lookScatter;
    clampVibePointToLayoutBounds(seg.l3, look);
    vibeRandomUnit(vibeScratchDir);
    seg.l1
      .copy(look)
      .addScaledVector(vibeScratchDir, 1.05 + Math.random() * 2.5);
    vibeRandomUnit(vibeScratchDir);
    seg.l2
      .copy(seg.l3)
      .addScaledVector(vibeScratchDir, -(1.1 + Math.random() * 2.7));

    return seg;
  }

  function createChainedVibeSeg(prev: VibeCamCurveSeg): VibeCamCurveSeg {
    const params = vibeCamParams;
    const seg: VibeCamCurveSeg = {
      dur: prev.dur,
      previewColorHex: vibeAllocatePathPreviewColor(),
      p0: new THREE.Vector3().copy(prev.p3),
      p1: new THREE.Vector3(),
      p2: new THREE.Vector3(),
      p3: new THREE.Vector3(),
      l0: new THREE.Vector3().copy(prev.l3),
      l1: new THREE.Vector3(),
      l2: new THREE.Vector3(),
      l3: new THREE.Vector3(),
      elevationPass: 'side',
      simPathLength: 0,
      startSpeed: 0,
      endSpeed: 0,
      arcLengthTotal: 0,
      arcLengthTable: null,
    };
    const lookScatter = params.lookWanderSpeed * 32;
    const joinVelocity = vibeIdealCam.copy(vibeGravityPathState.velocity);

    const chordPrev = Math.max(0.52, prev.p0.distanceTo(prev.p3));
    const joinSpeed = Math.max(joinVelocity.length(), vibeResolveFlightSpeed());
    vibeScratchLerp
      .copy(seg.p0)
      .addScaledVector(joinVelocity, joinSpeed * prev.dur * 0.82);
    const chordNew = seg.p0.distanceTo(vibeScratchLerp);
    const legato =
      params.legatoMin + Math.random() * (params.legatoMax - params.legatoMin);
    let ratio = chordNew / chordPrev;
    ratio = THREE.MathUtils.clamp(
      ratio,
      params.chordRatioMin,
      params.chordRatioMax,
    );
    const targetDur = prev.dur * ratio * legato * params.chainDurMul;
    seg.dur = THREE.MathUtils.clamp(
      THREE.MathUtils.clamp(
        targetDur,
        prev.dur * params.durRelLow,
        prev.dur * params.durRelHigh,
      ),
      params.segDurMin,
      params.segDurMax,
    );
    seg.dur = Math.max(
      seg.dur,
      Math.min(
        params.chordDurFloorCap,
        chordNew * params.chordDurFloorMul + params.chordDurFloorAdd,
      ),
    );
    seg.dur = Math.min(seg.dur, params.segDurMax);

    vibeGravityPathState.velocity.copy(joinVelocity);
    vibeGravityPathState.segmentStartVelocity.copy(joinVelocity);
    if (vibeJointOutgoingTangent(prev, vibeScratchDir)) {
      const tangentSpeed = Math.max(
        joinVelocity.length(),
        vibeResolveFlightSpeed() * 0.4,
      );
      vibeGravityPathState.segmentStartVelocity
        .copy(vibeScratchDir)
        .multiplyScalar(tangentSpeed);
    }
    const elevationPass = vibePickPathElevationPass();
    seg.elevationPass = elevationPass;
    vibeGravityPathState.elevationPass = elevationPass;
    vibePlaceSegmentEnd(seg.p0, seg.p3, vibePathGravityFocus, seg.dur);
    vibeSnapSegmentEndToElevationPass(
      seg.p3,
      vibePathGravityFocus,
      elevationPass,
    );
    const lockPreviousEndHandle = vibeShouldLockPreviousEndHandle(prev);
    vibePlaceCurveHandles(seg, prev, vibePathGravityFocus);
    vibeArcSegmentHandlesForElevation(
      seg,
      prev,
      vibePathGravityFocus,
      elevationPass,
      lockPreviousEndHandle,
    );
    refreshVibeSegmentMotionMetadata(seg);

    seg.l1.copy(prev.l3).add(vibeScratchLerp.copy(prev.l3).sub(prev.p2));
    seg.l3.copy(seg.p3);
    seg.l3.x += (Math.random() - 0.5) * 2.8 * lookScatter;
    seg.l3.y += (Math.random() - 0.5) * 2.2 * lookScatter;
    seg.l3.z += (Math.random() - 0.5) * 2.8 * lookScatter;
    clampVibePointToLayoutBounds(seg.l3, vibeNetFocus);
    vibeRandomUnit(vibeScratchDir);
    seg.l2
      .copy(seg.l3)
      .addScaledVector(vibeScratchDir, -(1.15 + Math.random() * 2.75));

    return seg;
  }

  function refillVibeSegQueue(cam: THREE.Vector3, look: THREE.Vector3): void {
    refreshVibeLayoutBounds();
    refreshVibePathGravityFocus();
    if (vibeNetLookFill) vibeNetLookFill(vibeNetFocus, 0);
    vibeGravityPathState.initialized = false;
    vibeNextPathColorIndex = 0;
    vibeSegQueue.length = 0;
    vibeSegElapsed = 0;
    const s0 = createFirstVibeSeg(cam, look);
    vibeSegQueue.push(s0, createChainedVibeSeg(s0));
    syncVibeSegQueueLength();
  }

  function currentVibePathCameraPosition(out: THREE.Vector3): void {
    const head = vibeSegQueue[0];
    if (!head) {
      out.copy(camera.position);
      return;
    }
    if (vibeEntranceBlend.active) {
      out.copy(head.p0);
      return;
    }
    const linearTime = vibeSegElapsed / head.dur;
    const progress = vibeSegmentBezierProgress(
      head,
      linearTime > 1 ? 1 : linearTime,
    );
    vibeBezierEvalPoint(head.p0, head.p1, head.p2, head.p3, progress, out);
  }

  const refillVibeSegQueueFromScene = (): void => {
    if (vibeCamControlMode === 'freeLook' && vibeSegQueue.length > 0) {
      currentVibePathCameraPosition(vibeScratchDir);
      refillVibeSegQueue(vibeScratchDir, vibeNetFocus);
      return;
    }
    refillVibeSegQueue(camera.position, controls.target);
  };

  const replanVibeSegQueuePreservingProgress = (): void => {
    const progressRatio =
      vibeSegQueue.length > 0 &&
      !vibeEntranceBlend.active &&
      vibeSegQueue[0]!.dur > 1e-6
        ? Math.min(1, vibeSegElapsed / vibeSegQueue[0]!.dur)
        : 0;
    refillVibeSegQueueFromScene();
    if (vibeSegQueue.length > 0 && progressRatio > 0) {
      vibeSegElapsed = progressRatio * vibeSegQueue[0]!.dur;
    }
  };

  function syncVibeSegQueueLength(): void {
    const targetLength = vibeCamParams.queueMin;
    while (vibeSegQueue.length < targetLength && vibeSegQueue.length > 0) {
      vibeSegQueue.push(
        createChainedVibeSeg(vibeSegQueue[vibeSegQueue.length - 1]!),
      );
    }
    while (vibeSegQueue.length > targetLength) vibeSegQueue.pop();
  }

  /** Nur ab dem nächsten Segment neu planen — laufendes Segment + Fortschritt bleiben. */
  function replenishVibeSegQueueTail(): void {
    const head = vibeSegQueue[0];
    if (!head) return;
    refreshVibeLayoutBounds();
    vibeSegQueue.length = 1;
    vibeSegQueue.push(createChainedVibeSeg(head));
    syncVibeSegQueueLength();
  }

  function updateVibeHorizonSpherePreview(): void {
    const show = vibeCameraMode && vibeCamParams.pathHorizonSpherePreview;
    vibeHorizonSphereRoot.visible = show;
    if (!show) return;
    refreshVibeLayoutBounds();
    refreshVibePathGravityFocus();
    refreshVibeHorizonRadiiForFocus(vibePathGravityFocus);
    vibeHorizonSphereRoot.position.copy(vibePathGravityFocus);
    const ellipsoidY = vibeHorizonRadii.y * 1.18;
    vibeHorizonSphere.scale.set(
      vibeHorizonRadii.x,
      ellipsoidY,
      vibeHorizonRadii.z,
    );
  }

  const vibePreviewOnlyParamKeys: ReadonlySet<keyof ResolvedVibeCameraParams> =
    new Set([
      'pathPreview',
      'pathPreviewMaxSegments',
      'pathPreviewMarkers',
      'pathPreviewMarkerRadius',
      'pathHorizonSpherePreview',
      'pathPreviewColorMode',
      'pathPreviewThemeColor',
    ]);

  const vibeResolvedParamsAffectPathPlanExceptQueueSize = (
    previous: ResolvedVibeCameraParams,
    next: ResolvedVibeCameraParams,
  ): boolean =>
    (Object.keys(previous) as (keyof ResolvedVibeCameraParams)[]).some(
      (key) =>
        key !== 'queueMin' &&
        !vibePreviewOnlyParamKeys.has(key) &&
        previous[key] !== next[key],
    );

  const applyVibeCameraSettings = (tuning: VibeCameraTuning): void => {
    const normalized = normalizeVibeCameraTuning(tuning);
    const previousControlMode = vibeCamControlMode;
    const previousParams = vibeCamParams;
    vibeCamControlMode = normalized.controlMode;
    vibeCamParams = resolveVibeCameraParams(normalized);
    if (!vibeCameraMode) {
      vibePathPreviewRoot.visible = vibeCamParams.pathPreview;
      return;
    }
    if (previousControlMode !== vibeCamControlMode) {
      syncVibeCameraControls();
      if (vibeCamControlMode === 'followPath') {
        startVibeEntranceBlend(
          vibeClock.getElapsedTime(),
          0.85 + Math.random() * 0.45,
        );
      } else {
        vibeEntranceBlend.active = false;
      }
    }
    const maxSegmentChordChanged =
      previousParams.maxSegmentChord !== vibeCamParams.maxSegmentChord;
    const pathPhysicsChanged =
      previousParams.pathTraverse !== vibeCamParams.pathTraverse ||
      previousParams.pathIntraCurve !== vibeCamParams.pathIntraCurve ||
      previousParams.horizonRadiusScale !== vibeCamParams.horizonRadiusScale;

    if (vibeEntranceBlend.active || vibeSegQueue.length === 0) {
      refillVibeSegQueueFromScene();
    } else if (maxSegmentChordChanged || pathPhysicsChanged) {
      replanVibeSegQueuePreservingProgress();
    } else if (
      vibeResolvedParamsAffectPathPlanExceptQueueSize(
        previousParams,
        vibeCamParams,
      )
    ) {
      replenishVibeSegQueueTail();
    } else if (previousParams.queueMin !== vibeCamParams.queueMin) {
      syncVibeSegQueueLength();
    }
    updateVibePathPreview();
    updateVibeHorizonSpherePreview();
  };

  function updateVibePathPreview(): void {
    if (
      !vibeCameraMode ||
      !vibeCamParams.pathPreview ||
      vibeSegQueue.length === 0
    ) {
      vibePathPreviewRoot.visible = false;
      hideUnusedVibePathPreview(0, 0);
      return;
    }

    let lineCount = 0;
    let markerCount = 0;
    const previewSegmentCount = Math.min(
      vibeSegQueue.length,
      vibeCamParams.pathPreviewMaxSegments,
    );

    for (let segIndex = 0; segIndex < previewSegmentCount; segIndex++) {
      const seg = vibeSegQueue[segIndex]!;
      const isCurrent = segIndex === 0;
      let s0 = 0;
      let s1 = 1;
      let steps = VIBE_PATH_SAMPLES_FULL;
      if (isCurrent) {
        if (vibeEntranceBlend.active) {
          s0 = 0;
          s1 = 1;
        } else {
          const linearTime = vibeSegElapsed / seg.dur;
          s0 = vibeSegmentBezierProgress(seg, linearTime > 1 ? 1 : linearTime);
          s1 = 1;
        }
        steps = VIBE_PATH_SAMPLES_CURRENT;
      }

      const lineOpacity = vibeApplyPathPreviewAppearance(
        segIndex,
        previewSegmentCount,
        isCurrent,
        seg.previewColorHex,
      );

      const line = acquireVibePathLine(lineCount);
      const lineMaterial = line.material as THREE.LineBasicMaterial;
      lineMaterial.color.copy(vibePathScratchColor);
      lineMaterial.opacity = lineOpacity;

      const positionAttribute = line.geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute;
      const positionArray = positionAttribute.array as Float32Array;
      let vertexCount = 0;
      for (let sampleIndex = 0; sampleIndex <= steps; sampleIndex++) {
        const t = steps <= 0 ? 0 : sampleIndex / steps;
        const s = s0 + (s1 - s0) * t;
        vibeBezierEvalPoint(seg.p0, seg.p1, seg.p2, seg.p3, s, vibePathEval);
        const offset = vertexCount * 3;
        if (offset + 3 > positionArray.length) break;
        positionArray[offset] = vibePathEval.x;
        positionArray[offset + 1] = vibePathEval.y;
        positionArray[offset + 2] = vibePathEval.z;
        vertexCount++;
      }
      if (vertexCount < 2) {
        line.visible = false;
      } else {
        positionAttribute.needsUpdate = true;
        line.geometry.setDrawRange(0, vertexCount);
        line.geometry.computeBoundingSphere();
        line.visible = true;
        lineCount++;
      }

      if (vibeCamParams.pathPreviewMarkers) {
        const marker = acquireVibePathMarker(markerCount);
        marker.position.copy(seg.p0);
        const markerMaterial = marker.material as THREE.MeshBasicMaterial;
        markerMaterial.color.copy(vibePathScratchColor);
        markerMaterial.opacity = Math.min(1, lineOpacity + 0.08);
        const markerScale =
          vibeCamParams.pathPreviewMarkerRadius * (isCurrent ? 1.15 : 1);
        marker.scale.setScalar(markerScale);
        marker.visible = true;
        markerCount++;
      }
    }

    hideUnusedVibePathPreview(lineCount, markerCount);
    vibePathPreviewRoot.visible = lineCount > 0;
  }

  const applyVibeCamera = () => {
    if (!vibeCameraMode) return;
    const rawT = vibeClock.getElapsedTime();
    refreshVibePathGravityFocus();
    if (vibeNetLookFill) vibeNetLookFill(vibeNetFocus, rawT);
    else vibeNetFocus.set(4, 0, 0);

    let dt = vibeLastRawT < 0 ? 0.016 : rawT - vibeLastRawT;
    if (dt > 0.085) dt = 0.016;
    if (dt < 0) dt = 0;
    vibeLastRawT = rawT;

    if (!vibeEntranceBlend.active) {
      vibeSegElapsed += dt;
      while (
        vibeSegQueue.length > 0 &&
        vibeSegElapsed >= vibeSegQueue[0]!.dur
      ) {
        vibeSegElapsed -= vibeSegQueue[0]!.dur;
        vibeSegQueue.shift();
      }
      if (vibeSegQueue.length === 0) {
        refillVibeSegQueueFromScene();
      }
      syncVibeSegQueueLength();
    }

    const head = vibeSegQueue[0];
    if (!head) {
      refillVibeSegQueueFromScene();
      updateVibePathPreview();
      updateVibeHorizonSpherePreview();
      return;
    }

    if (vibeEntranceBlend.active) {
      vibeIdealCam.copy(head.p0);
    } else {
      const linearTime = vibeSegElapsed / head.dur;
      const progress = vibeSegmentBezierProgress(
        head,
        linearTime > 1 ? 1 : linearTime,
      );
      vibeBezierEvalPoint(
        head.p0,
        head.p1,
        head.p2,
        head.p3,
        progress,
        vibeIdealCam,
      );
    }

    vibeResolveCameraUp(vibeIdealCam, vibeNetFocus, vibeIdealUp);

    if (vibeCamControlMode === 'freeLook') {
      updateVibePathCameraRig();
      updateVibePathPreview();
      updateVibeHorizonSpherePreview();
      return;
    }

    if (vibeEntranceBlend.active) {
      let u = (rawT - vibeEntranceBlend.t0) / vibeEntranceBlend.dur;
      if (u >= 1) {
        vibeEntranceBlend.active = false;
        camera.position.copy(vibeIdealCam);
        camera.up.copy(vibeIdealUp).normalize();
        camera.lookAt(vibeNetFocus);
        controls.target.copy(vibeNetFocus);
      } else {
        u = u * u * (3 - 2 * u);
        camera.position.lerpVectors(vibeEntranceBlend.fromCam, vibeIdealCam, u);
        vibeScratchLerp.lerpVectors(
          vibeEntranceBlend.fromLook,
          vibeNetFocus,
          u,
        );
        vibeResolveCameraUp(camera.position, vibeScratchLerp, camera.up);
        camera.lookAt(vibeScratchLerp);
        controls.target.copy(vibeScratchLerp);
      }
    } else {
      camera.position.copy(vibeIdealCam);
      camera.up.copy(vibeIdealUp).normalize();
      camera.lookAt(vibeNetFocus);
      controls.target.copy(vibeNetFocus);
    }

    updateVibePathPreview();
    updateVibeHorizonSpherePreview();
  };

  const setVibeCameraMode = (enabled: boolean) => {
    if (enabled === vibeCameraMode) return;
    if (enabled) {
      refillVibeSegQueue(camera.position, controls.target);
      vibeLastRawT = -1;

      vibeSavedCam.copy(camera.position);
      vibeSavedTarget.copy(controls.target);
      vibeSavedEnableDamping = controls.enableDamping;
      vibeClock.start();
      vibeCameraMode = true;
      syncVibeCameraControls();
      if (vibeCamControlMode === 'followPath') {
        startVibeEntranceBlend(0, 1.02 + Math.random() * 0.58);
      } else {
        vibeEntranceBlend.active = false;
      }
    } else {
      vibeCameraMode = false;
      vibePathCameraRig.visible = false;
      vibeEntranceBlend.active = false;
      vibeSegQueue.length = 0;
      vibeLastRawT = -1;
      vibePathPreviewRoot.visible = false;
      vibeHorizonSphereRoot.visible = false;
      hideUnusedVibePathPreview(0, 0);
      camera.position.copy(vibeSavedCam);
      controls.target.copy(vibeSavedTarget);
      camera.up.set(0, 1, 0);
      controls.enableDamping = vibeSavedEnableDamping;
      controls.enabled = true;
      camera.lookAt(controls.target);
    }
  };

  const isTypingFocus = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    target.closest("input, textarea, [contenteditable='true']") !== null;

  const onKeyNavDown = (event: KeyboardEvent) => {
    if (!navCodes.has(event.code)) return;
    if (isDom && isTypingFocus(event.target)) return;
    keysDown.add(event.code);
    event.preventDefault();
  };
  const onKeyNavUp = (event: KeyboardEvent) => {
    if (!navCodes.has(event.code)) return;
    keysDown.delete(event.code);
    event.preventDefault();
  };
  const clearKeys = () => {
    keysDown.clear();
  };
  const onVisibility = () => {
    if (typeof document !== 'undefined' && document.hidden) clearKeys();
  };
  const onPageHide = () => {
    clearKeys();
  };

  const navKeyTarget: EventTarget = isDom
    ? window
    : (orbitDomSurface as unknown as EventTarget);
  navKeyTarget.addEventListener('keydown', onKeyNavDown as EventListener);
  navKeyTarget.addEventListener('keyup', onKeyNavUp as EventListener);
  if (isDom) {
    window.addEventListener('blur', clearKeys);
    window.addEventListener('focus', clearKeys);
    window.addEventListener('pagehide', onPageHide);
    document.addEventListener('visibilitychange', onVisibility);
  }

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomInit = drawableSize();
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(bloomInit.w, bloomInit.h),
    0.55,
    0.45,
    0.22,
  );
  composer.addPass(bloom);
  const fxaaPass = new ShaderPass(FXAAShader);
  const outputPass = new OutputPass();
  const updateFxaaResolution = () => {
    const { w, h } = drawableSize();
    const pr = renderer.getPixelRatio();
    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (w * pr),
      1 / (h * pr),
    );
  };
  updateFxaaResolution();
  composer.addPass(fxaaPass);
  composer.addPass(outputPass);

  const applyVizPostProcess = (next: VizPostProcessSettings): void => {
    bloom.enabled = next.bloomEnabled;
    bloom.strength = next.bloomStrength;
    bloom.radius = next.bloomRadius;
    bloom.threshold = next.bloomThreshold;
    fxaaPass.enabled = next.fxaaEnabled;
    renderer.toneMappingExposure = next.toneMappingExposure;
  };
  applyVizPostProcess({ ...DEFAULT_VIZ_POST_PROCESS });

  if (isDom && domContainer) {
    domContainer.appendChild(renderer.domElement);
  }

  const onResize = () => {
    renderer.setPixelRatio(effectivePixelRatio());
    const { w, h } = drawableSize();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, updateCanvasDomStyle);
    composer.setSize(w, h);
    updateFxaaResolution();
  };

  let containerResizeRaf = 0;
  const scheduleResizeFromContainer = () => {
    if (containerResizeRaf !== 0) {
      cancelAnimationFrame(containerResizeRaf);
    }
    containerResizeRaf = requestAnimationFrame(() => {
      containerResizeRaf = 0;
      onResize();
    });
  };

  let resizeObserver: ResizeObserver | null = null;
  if (isDom && domContainer) {
    window.addEventListener('resize', onResize);
    resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            scheduleResizeFromContainer();
          })
        : null;
    resizeObserver?.observe(domContainer);
  }

  const syncLayoutFromMount = (): void => {
    onResize();
  };

  const dispose = () => {
    vibeNetLookFill = null;
    vibePathGravityFill = null;
    vibeNetBoundsFill = null;
    if (containerResizeRaf !== 0) {
      cancelAnimationFrame(containerResizeRaf);
      containerResizeRaf = 0;
    }
    resizeObserver?.disconnect();
    if (isDom) {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('blur', clearKeys);
      window.removeEventListener('focus', clearKeys);
      window.removeEventListener('pagehide', onPageHide);
      document.removeEventListener('visibilitychange', onVisibility);
    }
    navKeyTarget.removeEventListener('keydown', onKeyNavDown as EventListener);
    navKeyTarget.removeEventListener('keyup', onKeyNavUp as EventListener);
    if (!isDom) orbitDomSurface?.removeAllListeners();
    controls.dispose();
    scene.remove(vibePathPreviewRoot);
    scene.remove(vibeHorizonSphereRoot);
    scene.remove(vibePathCameraRig);
    vibeHorizonSphere.geometry.dispose();
    (vibeHorizonSphere.material as THREE.Material).dispose();
    vibePathCameraBody.geometry.dispose();
    (vibePathCameraBody.material as THREE.Material).dispose();
    vibePathCameraLens.geometry.dispose();
    (vibePathCameraLens.material as THREE.Material).dispose();
    disposeVibePathPreviewPools();
    floor.geometry.dispose();
    (floor.material as THREE.Material).dispose();
    fxaaPass.dispose();
    outputPass.dispose();
    renderer.dispose();
    if (
      isDom &&
      domContainer &&
      renderer.domElement.parentElement === domContainer
    ) {
      domContainer.removeChild(renderer.domElement);
    }
  };

  const applyCameraRelativePan = () => {
    const dt = inputClock.getDelta();
    if ((vibeCameraMode && vibeCamControlMode !== 'freeLook') || dt <= 0) {
      return;
    }
    const w = keysDown.has('KeyW') || keysDown.has('ArrowUp');
    const s = keysDown.has('KeyS') || keysDown.has('ArrowDown');
    const a = keysDown.has('KeyA') || keysDown.has('ArrowLeft');
    const d = keysDown.has('KeyD') || keysDown.has('ArrowRight');
    if (!w && !s && !a && !d) return;
    const step = moveSpeed * Math.min(dt, 0.1);
    camera.updateMatrixWorld();
    vRight.setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    camera.getWorldDirection(vForward);
    vMove.set(0, 0, 0);
    if (w) vMove.addScaledVector(vForward, step);
    if (s) vMove.addScaledVector(vForward, -step);
    if (d) vMove.addScaledVector(vRight, step);
    if (a) vMove.addScaledVector(vRight, -step);
    if (vMove.lengthSq() > 1e-10) {
      camera.position.add(vMove);
      controls.target.add(vMove);
    }
  };

  const renderDisplay = () => {
    composer.render();
  };

  const render = () => {
    applyCameraRelativePan();
    applyVibeCamera();
    renderDisplay();
  };

  const applyVizSceneColors = (next: VizSceneColorSettings): void => {
    const colors = mergeVizSceneColors(DEFAULT_VIZ_SCENE_COLORS, next);
    const fog = scene.fog;
    if (fog instanceof THREE.Fog) {
      fog.near = colors.fogNear;
      fog.far = colors.fogFar;
    }
    if (isValidHexColor6(colors.backgroundFog)) {
      const h = parseInt(colors.backgroundFog.slice(1), 16);
      (scene.background as THREE.Color).setHex(h);
      if (fog instanceof THREE.Fog) fog.color.setHex(h);
    }
    floor.visible = colors.floorVisible;
    if (isValidHexColor6(colors.floor)) {
      (floor.material as THREE.MeshBasicMaterial).color.setHex(
        parseInt(colors.floor.slice(1), 16),
      );
    }
  };

  const applyVizLightColors = (next: VizLightColorSettings): void => {
    vibePathThemeLightColors = { ...next };
    const sc = intensityScaleForLights(next);
    hemi.intensity = LIGHT_INTENSITY_BASE.hemi * sc;
    ambient.intensity = LIGHT_INTENSITY_BASE.ambient * sc;
    key.intensity = LIGHT_INTENSITY_BASE.key * sc;
    fill.intensity = LIGHT_INTENSITY_BASE.fill * sc;
    rim.intensity = LIGHT_INTENSITY_BASE.rim * sc;
    const pt = Math.min(
      8.5,
      LIGHT_INTENSITY_BASE.point * sc * (0.45 + 0.55 * sc),
    );
    backAccent.intensity = pt;
    if (isValidHexColor6(next.hemiSky)) {
      hemi.color.setHex(parseInt(next.hemiSky.slice(1), 16));
    }
    if (isValidHexColor6(next.hemiGround)) {
      hemi.groundColor.setHex(parseInt(next.hemiGround.slice(1), 16));
    }
    if (isValidHexColor6(next.ambient)) {
      ambient.color.setHex(parseInt(next.ambient.slice(1), 16));
    }
    if (isValidHexColor6(next.key)) {
      key.color.setHex(parseInt(next.key.slice(1), 16));
    }
    if (isValidHexColor6(next.fill)) {
      fill.color.setHex(parseInt(next.fill.slice(1), 16));
    }
    if (isValidHexColor6(next.rim)) {
      rim.color.setHex(parseInt(next.rim.slice(1), 16));
    }
    if (isValidHexColor6(next.backAccent)) {
      backAccent.color.setHex(parseInt(next.backAccent.slice(1), 16));
    }
    if (
      vibeCamParams.pathPreviewColorMode === 'themeGradient' &&
      vibeCamParams.pathPreview
    ) {
      updateVibePathPreview();
    }
  };

  return {
    scene,
    camera,
    renderer,
    controls,
    render,
    renderDisplay,
    setVibeCameraMode,
    applyVibeCameraSettings,
    setVibeNetworkLookFocus,
    applyVizSceneColors,
    applyVizLightColors,
    applyVizPostProcess,
    syncLayoutFromMount,
    dispose,
  };
}

export function animateLoop(
  renderScene: () => void,
  controls: OrbitControls,
  onFrame?: () => void,
): () => void {
  let id = 0;
  const tick = () => {
    id = requestAnimationFrame(tick);
    onFrame?.();
    controls.update();
    renderScene();
  };
  tick();
  return () => cancelAnimationFrame(id);
}
