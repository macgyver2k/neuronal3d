import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import {
  DEFAULT_VIBE_CAMERA_TUNING,
  normalizeVibeCameraTuning,
  resolveVibeCameraParams,
  type ResolvedVibeCameraParams,
  type VibeCameraTuning,
} from './vibe-camera-settings';
import {
  DEFAULT_VIZ_LIGHT_COLORS,
  DEFAULT_VIZ_POST_PROCESS,
  DEFAULT_VIZ_SCENE_COLORS,
  isValidHexColor6,
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
    12,
    40,
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
  const vibePathLinePool: THREE.Line[] = [];
  const vibePathMarkerPool: THREE.Mesh[] = [];
  const vibePathMarkerGeometry = new THREE.SphereGeometry(1, 12, 10);
  const vibePathScratchColor = new THREE.Color();

  const vibePathEval = new THREE.Vector3();

  function vibePathSegColorHex(segIndex: number): number {
    return VIBE_PATH_SEG_PALETTE[segIndex % VIBE_PATH_SEG_PALETTE.length]!;
  }

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
  const vibeClock = new THREE.Clock();
  const vibeSavedCam = new THREE.Vector3();
  const vibeSavedTarget = new THREE.Vector3();
  let vibeSavedEnableDamping = true;

  let vibeCamParams = resolveVibeCameraParams(DEFAULT_VIBE_CAMERA_TUNING);

  type VibeCamCurveSeg = {
    dur: number;
    p0: THREE.Vector3;
    p1: THREE.Vector3;
    p2: THREE.Vector3;
    p3: THREE.Vector3;
    l0: THREE.Vector3;
    l1: THREE.Vector3;
    l2: THREE.Vector3;
    l3: THREE.Vector3;
    u0: THREE.Vector3;
    u3: THREE.Vector3;
  };

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

  function vibeRandomUnit(out: THREE.Vector3): void {
    out.set(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    );
    if (out.lengthSq() < 1e-8) out.set(0, 1, 0);
    else out.normalize();
  }

  /** Seg-Endpunkt leicht nach außen ziehen (Weitwinkel, moderat). */
  function vibeBiasP3AwayFromFocus(
    p3: THREE.Vector3,
    focus: THREE.Vector3,
  ): void {
    const params = vibeCamParams;
    vibeScratchDir.copy(p3).sub(focus);
    const d0 = vibeScratchDir.length();
    if (d0 < 1e-5) {
      vibeRandomUnit(vibeScratchDir);
      p3.addScaledVector(
        vibeScratchDir,
        params.pullOutFallbackMin + Math.random() * params.pullOutFallbackSpan,
      );
      return;
    }
    vibeScratchDir.multiplyScalar(1 / d0);
    if (Math.random() < params.pullOutChanceMain) {
      p3.addScaledVector(
        vibeScratchDir,
        params.pullOutPushMainMin + Math.random() * params.pullOutPushMainSpan,
      );
    }
    if (Math.random() < params.pullOutChanceBoost) {
      p3.addScaledVector(
        vibeScratchDir,
        params.pullOutPushBoostMin +
          Math.random() * params.pullOutPushBoostSpan,
      );
    }
    if (
      d0 < params.pullOutNearDist &&
      Math.random() < params.pullOutNearChance
    ) {
      p3.addScaledVector(
        vibeScratchDir,
        (params.pullOutNearRefDist - d0) *
          (params.pullOutNearFactorMin +
            Math.random() * params.pullOutNearFactorSpan),
      );
    }
    if (Math.random() < params.pullOutScaleChance) {
      const k =
        params.pullOutScaleMin + Math.random() * params.pullOutScaleSpan;
      p3.sub(focus).multiplyScalar(k).add(focus);
    }
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
  let vibeNetLookFill:
    | ((out: THREE.Vector3, elapsedSec: number) => void)
    | null = null;
  function setVibeNetworkLookFocus(
    sampler: VibeNetworkLookFocusSampler | null,
  ): void {
    vibeNetLookFill = sampler
      ? (out, elapsedSec) => sampler.fillLayoutCentroid(out, elapsedSec)
      : null;
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
    const wild = params.pathWildnessMul;
    const seg: VibeCamCurveSeg = {
      dur: params.firstDurBase + Math.random() * params.firstDurSpan,
      p0: new THREE.Vector3().copy(cam),
      p1: new THREE.Vector3(),
      p2: new THREE.Vector3(),
      p3: new THREE.Vector3(),
      l0: new THREE.Vector3().copy(look),
      l1: new THREE.Vector3(),
      l2: new THREE.Vector3(),
      l3: new THREE.Vector3(),
      u0: new THREE.Vector3(),
      u3: new THREE.Vector3(),
    };
    const jitter = params.p3Jitter;
    seg.p3.set(
      0.65 + Math.random() * 8 * jitter,
      -1.35 + Math.random() * 4.4 * jitter,
      -3.85 + Math.random() * 7.7 * jitter,
    );
    vibeRandomUnit(vibeScratchDir);
    seg.p1
      .copy(cam)
      .addScaledVector(
        vibeScratchDir,
        (params.handleOutMin + Math.random() * params.handleOutSpan) * wild,
      );
    vibeRandomUnit(vibeScratchDir);
    seg.p2
      .copy(seg.p3)
      .addScaledVector(
        vibeScratchDir,
        -(params.handleInNegMin + Math.random() * params.handleInNegSpan) *
          wild,
      );
    seg.p2.lerp(seg.p1, params.p2LerpMin + Math.random() * params.p2LerpSpan);

    vibeBiasP3AwayFromFocus(seg.p3, look);
    clampVibeSegmentEndToMaxChord(seg.p0, seg.p3);

    if (Math.random() < params.firstDurBoostChance) {
      seg.dur *=
        params.firstDurBoostMin + Math.random() * params.firstDurBoostSpan;
    }
    seg.dur = THREE.MathUtils.clamp(
      seg.dur,
      params.segDurMin,
      params.segDurMax,
    );

    seg.l3.copy(seg.p3);
    seg.l3.x += (Math.random() - 0.5) * 2.6 * jitter;
    seg.l3.y += (Math.random() - 0.5) * 2.1 * jitter;
    seg.l3.z += (Math.random() - 0.5) * 2.6 * jitter;
    vibeRandomUnit(vibeScratchDir);
    seg.l1
      .copy(look)
      .addScaledVector(vibeScratchDir, 1.05 + Math.random() * 2.5);
    vibeRandomUnit(vibeScratchDir);
    seg.l2
      .copy(seg.l3)
      .addScaledVector(vibeScratchDir, -(1.1 + Math.random() * 2.7));

    seg.u0
      .set((Math.random() - 0.5) * 0.48, 1, (Math.random() - 0.5) * 0.48)
      .normalize();
    seg.u3
      .set((Math.random() - 0.5) * 0.52, 1, (Math.random() - 0.5) * 0.52)
      .normalize();
    return seg;
  }

  function createChainedVibeSeg(prev: VibeCamCurveSeg): VibeCamCurveSeg {
    const params = vibeCamParams;
    const wild = params.pathWildnessMul;
    const seg: VibeCamCurveSeg = {
      dur: prev.dur,
      p0: new THREE.Vector3().copy(prev.p3),
      p1: new THREE.Vector3(),
      p2: new THREE.Vector3(),
      p3: new THREE.Vector3(),
      l0: new THREE.Vector3().copy(prev.l3),
      l1: new THREE.Vector3(),
      l2: new THREE.Vector3(),
      l3: new THREE.Vector3(),
      u0: new THREE.Vector3().copy(prev.u3),
      u3: new THREE.Vector3(),
    };
    seg.p1.copy(prev.p3).add(vibeScratchDir.copy(prev.p3).sub(prev.p2));
    const jitter = params.p3Jitter;
    seg.p3.set(
      0.55 + Math.random() * 8.2 * jitter,
      -1.45 + Math.random() * 4.5 * jitter,
      -3.9 + Math.random() * 7.8 * jitter,
    );
    vibeRandomUnit(vibeScratchDir);
    seg.p2
      .copy(seg.p3)
      .addScaledVector(
        vibeScratchDir,
        -(params.handleInNegMin + Math.random() * params.handleInNegSpan) *
          wild,
      );
    seg.p2.lerp(seg.p1, params.p2LerpMin + Math.random() * params.p2LerpSpan);

    vibeBiasP3AwayFromFocus(seg.p3, vibeNetFocus);
    clampVibeSegmentEndToMaxChord(seg.p0, seg.p3);

    seg.l1.copy(prev.l3).add(vibeScratchLerp.copy(prev.l3).sub(prev.l2));
    seg.l3.copy(seg.p3);
    seg.l3.x += (Math.random() - 0.5) * 2.8 * jitter;
    seg.l3.y += (Math.random() - 0.5) * 2.2 * jitter;
    seg.l3.z += (Math.random() - 0.5) * 2.8 * jitter;
    vibeRandomUnit(vibeScratchDir);
    seg.l2
      .copy(seg.l3)
      .addScaledVector(vibeScratchDir, -(1.15 + Math.random() * 2.75));

    seg.u3
      .set((Math.random() - 0.5) * 0.52, 1, (Math.random() - 0.5) * 0.52)
      .normalize();

    const chordPrev = Math.max(0.52, prev.p0.distanceTo(prev.p3));
    const chordNew = seg.p0.distanceTo(seg.p3);
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
    return seg;
  }

  function refillVibeSegQueue(cam: THREE.Vector3, look: THREE.Vector3): void {
    if (vibeNetLookFill) vibeNetLookFill(vibeNetFocus, 0);
    vibeSegQueue.length = 0;
    vibeSegElapsed = 0;
    const s0 = createFirstVibeSeg(cam, look);
    vibeSegQueue.push(s0, createChainedVibeSeg(s0));
    syncVibeSegQueueLength();
  }

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
    vibeSegQueue.length = 1;
    vibeSegQueue.push(createChainedVibeSeg(head));
    syncVibeSegQueueLength();
  }

  const vibePreviewOnlyParamKeys: ReadonlySet<keyof ResolvedVibeCameraParams> =
    new Set([
      'pathPreview',
      'pathPreviewMaxSegments',
      'pathPreviewMarkers',
      'pathPreviewMarkerRadius',
    ]);

  const vibeResolvedParamsAffectPathPlan = (
    previous: ResolvedVibeCameraParams,
    next: ResolvedVibeCameraParams,
  ): boolean =>
    (Object.keys(previous) as (keyof ResolvedVibeCameraParams)[]).some(
      (key) =>
        !vibePreviewOnlyParamKeys.has(key) && previous[key] !== next[key],
    );

  const applyVibeCameraSettings = (tuning: VibeCameraTuning): void => {
    const previousParams = vibeCamParams;
    vibeCamParams = resolveVibeCameraParams(normalizeVibeCameraTuning(tuning));
    if (!vibeCameraMode) {
      vibePathPreviewRoot.visible = vibeCamParams.pathPreview;
      return;
    }
    if (vibeEntranceBlend.active || vibeSegQueue.length === 0) {
      refillVibeSegQueue(camera.position, controls.target);
    } else if (
      vibeResolvedParamsAffectPathPlan(previousParams, vibeCamParams)
    ) {
      replenishVibeSegQueueTail();
    }
    updateVibePathPreview();
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
          let w = vibeSegElapsed / seg.dur;
          if (w > 1) w = 1;
          s0 = w;
          s1 = 1;
        }
        steps = VIBE_PATH_SAMPLES_CURRENT;
      }

      const colorHex = vibePathSegColorHex(segIndex);
      vibePathScratchColor.setHex(colorHex);

      const line = acquireVibePathLine(lineCount);
      const lineMaterial = line.material as THREE.LineBasicMaterial;
      lineMaterial.color.copy(vibePathScratchColor);
      lineMaterial.opacity = isCurrent ? 0.82 : 0.48;

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
        markerMaterial.opacity = isCurrent ? 1 : 0.88;
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
        refillVibeSegQueue(camera.position, controls.target);
      }
      syncVibeSegQueueLength();
    }

    const head = vibeSegQueue[0];
    if (!head) {
      refillVibeSegQueue(camera.position, controls.target);
      updateVibePathPreview();
      return;
    }

    if (vibeEntranceBlend.active) {
      vibeIdealCam.copy(head.p0);
      vibeIdealUp.copy(head.u0).normalize();
    } else {
      let w = vibeSegElapsed / head.dur;
      if (w > 1) w = 1;
      const s = w;
      vibeBezierEvalPoint(head.p0, head.p1, head.p2, head.p3, s, vibeIdealCam);
      vibeIdealUp.copy(head.u0).lerp(head.u3, s).normalize();
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
        camera.up
          .lerpVectors(vibeEntranceBlend.fromUp, vibeIdealUp, u)
          .normalize();
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
  };

  const setVibeCameraMode = (enabled: boolean) => {
    if (enabled === vibeCameraMode) return;
    if (enabled) {
      refillVibeSegQueue(camera.position, controls.target);
      vibeLastRawT = -1;

      vibeSavedCam.copy(camera.position);
      vibeSavedTarget.copy(controls.target);
      vibeSavedEnableDamping = controls.enableDamping;
      controls.enableDamping = false;
      controls.enabled = false;
      vibeClock.start();
      vibeCameraMode = true;
      startVibeEntranceBlend(0, 1.02 + Math.random() * 0.58);
    } else {
      vibeCameraMode = false;
      vibeEntranceBlend.active = false;
      vibeSegQueue.length = 0;
      vibeLastRawT = -1;
      vibePathPreviewRoot.visible = false;
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
    if (vibeCameraMode || dt <= 0) return;
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
    if (isValidHexColor6(next.backgroundFog)) {
      const h = parseInt(next.backgroundFog.slice(1), 16);
      (scene.background as THREE.Color).setHex(h);
      const fog = scene.fog;
      if (fog instanceof THREE.Fog) {
        fog.color.setHex(h);
      }
    }
    if (isValidHexColor6(next.floor)) {
      (floor.material as THREE.MeshBasicMaterial).color.setHex(
        parseInt(next.floor.slice(1), 16),
      );
    }
  };

  const applyVizLightColors = (next: VizLightColorSettings): void => {
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
