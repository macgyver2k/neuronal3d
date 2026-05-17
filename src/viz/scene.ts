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
  type VibeCameraControlMode,
  type VibeCameraTuning,
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
  const vibePathLinePool: THREE.Line[] = [];
  const vibePathMarkerPool: THREE.Mesh[] = [];
  const vibePathMarkerGeometry = new THREE.SphereGeometry(1, 12, 10);
  const vibePathScratchColor = new THREE.Color();

  const vibePathEval = new THREE.Vector3();

  function vibePathSegColorHex(colorIndex: number): number {
    return VIBE_PATH_SEG_PALETTE[colorIndex % VIBE_PATH_SEG_PALETTE.length]!;
  }

  let vibeNextPathColorIndex = 0;

  const vibeAllocatePathPreviewColor = (): number => {
    const colorHex = vibePathSegColorHex(vibeNextPathColorIndex);
    vibeNextPathColorIndex++;
    return colorHex;
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
    u0: THREE.Vector3;
    u3: THREE.Vector3;
  };

  /** Ab hier gilt elliptische Orbit-Pfadplanung (darunter: Bezier + Zentrum-Bias). */
  const VIBE_ORBIT_PATH_BLEND_MIN = 0.6;

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

  function vibeRandomPerpendicularTo(
    reference: THREE.Vector3,
    out: THREE.Vector3,
  ): void {
    vibeRandomUnit(out);
    out.addScaledVector(reference, -out.dot(reference));
    if (out.lengthSq() < 1e-8) {
      out.set(0, 1, 0);
      out.addScaledVector(reference, -out.dot(reference));
    }
    if (out.lengthSq() < 1e-8) {
      out.set(1, 0, 0);
      out.crossVectors(out, reference);
    }
    out.normalize();
  }

  /** C¹ am Nahtpunkt: gemeinsame Tangente und gleiche Handle-Länge (kein Ruckeln). */
  function vibeEnforceBezierJoinContinuity(
    segment: VibeCamCurveSeg,
    previous: VibeCamCurveSeg | null,
  ): void {
    const chord = Math.max(segment.p0.distanceTo(segment.p3), 1e-5);
    const bend = vibeCamParams.pathIntraCurve;
    const handleSpan = chord * THREE.MathUtils.lerp(0.42, 0.52, bend);
    const handleMin = chord * THREE.MathUtils.lerp(0.28, 0.18, bend);

    if (bend < 0.04) {
      vibeScratchDir.copy(segment.p3).sub(segment.p0);
      if (vibeScratchDir.lengthSq() < 1e-6) return;
      vibeScratchDir.normalize();
    } else if (previous && vibeJointOutgoingTangent(previous, vibeScratchDir)) {
      /* Naht-Tangente = Ausgangsrichtung des Vorgängers */
    } else {
      vibeScratchDir.copy(segment.p1).sub(segment.p0);
      if (vibeScratchDir.lengthSq() < 1e-6) {
        vibeScratchDir.copy(segment.p3).sub(segment.p0);
      }
      if (vibeScratchDir.lengthSq() < 1e-6) return;
      vibeScratchDir.normalize();
    }

    const dotCheck = vibeScratchDir.dot(
      vibeIdealUp.copy(segment.p3).sub(segment.p0),
    );
    if (dotCheck < 0) vibeScratchDir.negate();

    const segmentEndLength = THREE.MathUtils.clamp(
      segment.p3.distanceTo(segment.p2),
      handleMin,
      handleSpan,
    );
    segment.p2
      .copy(segment.p3)
      .addScaledVector(vibeScratchDir, -segmentEndLength);

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
      Math.max(
        previous.p3.distanceTo(previous.p2),
        segment.p1.distanceTo(segment.p0),
      ),
      handleMin,
      handleSpan,
    );
    previous.p2.copy(previous.p3).addScaledVector(vibeScratchDir, -jointLength);
    segment.p1.copy(segment.p0).addScaledVector(vibeScratchDir, jointLength);
  }

  /** Seg-Endpunkt leicht nach außen ziehen (Weitwinkel, moderat). */
  function vibeBiasP3AwayFromFocus(
    p3: THREE.Vector3,
    focus: THREE.Vector3,
  ): void {
    const params = vibeCamParams;
    const pullScale = params.pathPullOutScale;
    vibeScratchDir.copy(p3).sub(focus);
    const d0 = vibeScratchDir.length();
    if (d0 < 1e-5) {
      vibeRandomUnit(vibeScratchDir);
      p3.addScaledVector(
        vibeScratchDir,
        (params.pullOutFallbackMin +
          Math.random() * params.pullOutFallbackSpan) *
          pullScale,
      );
      return;
    }
    vibeScratchDir.multiplyScalar(1 / d0);
    if (Math.random() < params.pullOutChanceMain) {
      p3.addScaledVector(
        vibeScratchDir,
        (params.pullOutPushMainMin +
          Math.random() * params.pullOutPushMainSpan) *
          pullScale,
      );
    }
    if (Math.random() < params.pullOutChanceBoost) {
      p3.addScaledVector(
        vibeScratchDir,
        (params.pullOutPushBoostMin +
          Math.random() * params.pullOutPushBoostSpan) *
          pullScale,
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
            Math.random() * params.pullOutNearFactorSpan) *
          pullScale,
      );
    }
    if (Math.random() < params.pullOutScaleChance * pullScale) {
      const k =
        params.pullOutScaleMin + Math.random() * params.pullOutScaleSpan;
      const scaledK = 1 + (k - 1) * pullScale;
      p3.sub(focus).multiplyScalar(scaledK).add(focus);
    }
  }

  function vibeOrbitTangentAt(
    origin: THREE.Vector3,
    focus: THREE.Vector3,
    yawRadians: number,
    out: THREE.Vector3,
  ): void {
    vibeScratchDir.copy(origin).sub(focus);
    const radialLength = vibeScratchDir.length();
    if (radialLength < 1e-5) vibeScratchDir.set(0, 0, 1);
    else vibeScratchDir.multiplyScalar(1 / radialLength);

    vibeIdealCam.set(0, 1, 0);
    out.crossVectors(vibeIdealCam, vibeScratchDir);
    if (out.lengthSq() < 1e-6) {
      out.set(1, 0, 0);
      out.crossVectors(out, vibeScratchDir);
    }
    out.normalize();
    if (Math.abs(yawRadians) > 1e-5)
      out.applyAxisAngle(vibeScratchDir, yawRadians);
  }

  function vibePlaceSegmentEndOrbit(
    start: THREE.Vector3,
    end: THREE.Vector3,
    focus: THREE.Vector3,
    calm: number,
    targetChord: number,
  ): void {
    vibeRefreshOrbitRadii(focus);
    if (!vibeOrbitState.initialized) vibeInitOrbitFromPosition(start, focus);

    vibeOrbitState.segmentStartAngle = vibeOrbitState.angle;
    const averageRadius =
      (vibeOrbitState.radii.x + vibeOrbitState.radii.z) * 0.5;
    const angleStep =
      (targetChord / Math.max(averageRadius, 1.05)) *
      vibeOrbitState.sign *
      (0.88 + Math.random() * 0.14 * (1 - calm));
    vibeOrbitState.angle += angleStep;
    vibeOrbitPointAtAngle(vibeOrbitState.angle, focus, end);
    vibeBiasP3AwayFromFocus(end, focus);
    vibeSoftClampInsideOrbitEllipsoid(focus, end);
  }

  function vibePlaceSegmentEndChaotic(
    start: THREE.Vector3,
    end: THREE.Vector3,
    focus: THREE.Vector3,
    previous: VibeCamCurveSeg | null,
    firstSegment: boolean,
    targetChord: number,
  ): void {
    const params = vibeCamParams;
    const wild = params.pathIntraCurve;
    const jitter = params.p3Jitter;
    const calm = params.pathContinuity;
    const hasJointTangent =
      previous != null && vibeJointOutgoingTangent(previous, vibeScratchLerp);

    if (!hasJointTangent) vibeOrbitTangentAt(start, focus, 0, vibeScratchLerp);

    const yaw =
      (Math.random() - 0.5) * 2 * params.pathHeadingYawMax * (1 - calm);
    vibeOrbitTangentAt(start, focus, yaw, vibeIdealUp);
    const orbitTangentMix =
      params.pathOrbitBlend * Math.max(0, 1 - wild * 1.05);
    vibeScratchDir.copy(vibeScratchLerp).lerp(vibeIdealUp, orbitTangentMix);
    if (vibeScratchDir.lengthSq() < 1e-8) vibeScratchDir.copy(vibeIdealUp);
    vibeScratchDir.normalize();

    end.copy(start).addScaledVector(vibeScratchDir, targetChord);
    if (wild > 0.02) {
      vibeIdealCam.set(
        start.x + 0.55 + Math.random() * 8.2 * jitter,
        start.y - 1.45 + Math.random() * 4.5 * jitter,
        start.z - 3.9 + Math.random() * 7.8 * jitter,
      );
      if (firstSegment) {
        vibeIdealCam.set(
          0.65 + Math.random() * 8 * jitter,
          -1.35 + Math.random() * 4.4 * jitter,
          -3.85 + Math.random() * 7.7 * jitter,
        );
      }
      vibeIdealUp.copy(vibeIdealCam).sub(start);
      if (vibeIdealUp.lengthSq() > 1e-8) {
        vibeIdealUp.normalize();
        vibeRandomPerpendicularTo(vibeScratchDir, vibeScratchLerp);
        vibeScratchDir
          .lerp(vibeScratchLerp, wild * 0.55 * (1 - calm))
          .normalize();
        end.copy(start).addScaledVector(vibeScratchDir, targetChord);
      }
    }
    vibeBiasP3AwayFromFocus(end, focus);

    if (wild > 0.08) {
      vibeScratchLerp.copy(end).sub(focus);
      const distance = vibeScratchLerp.length();
      vibeRefreshOrbitRadii(focus);
      const outerRadius =
        (vibeOrbitState.radii.x + vibeOrbitState.radii.z) * 0.5;
      const distanceRatio = THREE.MathUtils.clamp(
        distance / Math.max(outerRadius, 1),
        0,
        1,
      );
      end.lerp(focus, wild * (0.06 + 0.24 * distanceRatio));
      const nearCenter =
        1 - THREE.MathUtils.clamp(distance / (outerRadius * 0.45), 0, 1);
      if (nearCenter > 0.04) {
        const orbitYaw =
          (Math.random() - 0.5) * params.pathHeadingYawMax * nearCenter * 1.35;
        vibeOrbitTangentAt(start, focus, orbitYaw, vibeIdealUp);
        vibeScratchDir.copy(end).sub(start);
        const segmentLength = vibeScratchDir.length();
        if (segmentLength > 1e-5) {
          vibeScratchDir.multiplyScalar(1 / segmentLength);
          vibeScratchDir.lerp(vibeIdealUp, nearCenter * wild * 0.9).normalize();
          end.copy(start).addScaledVector(vibeScratchDir, segmentLength);
        }
      }
    }
  }

  function vibePlaceSegmentEnd(
    start: THREE.Vector3,
    end: THREE.Vector3,
    focus: THREE.Vector3,
    previous: VibeCamCurveSeg | null,
    firstSegment: boolean,
  ): void {
    const params = vibeCamParams;
    const wild = params.pathIntraCurve;
    const calm = params.pathContinuity;
    const useOrbitPath = params.pathOrbitBlend >= VIBE_ORBIT_PATH_BLEND_MIN;
    const maxChord = params.maxSegmentChord;
    const targetChord =
      maxChord * (0.55 + Math.random() * (0.45 - wild * 0.12));

    if (useOrbitPath) {
      vibePlaceSegmentEndOrbit(start, end, focus, calm, targetChord);
    } else {
      vibePlaceSegmentEndChaotic(
        start,
        end,
        focus,
        previous,
        firstSegment,
        targetChord,
      );
      clampVibePointToLayoutBounds(end, focus);
    }

    clampVibeSegmentEndToMaxChord(start, end);
    if (useOrbitPath) vibeSoftClampInsideOrbitEllipsoid(focus, end);
  }

  function vibePlaceCurveHandles(
    segment: VibeCamCurveSeg,
    previous: VibeCamCurveSeg | null,
    focus: THREE.Vector3,
  ): void {
    const params = vibeCamParams;
    const bend = params.pathIntraCurve;
    const wild = params.pathWildnessMul;
    const useOrbitPath = params.pathOrbitBlend >= VIBE_ORBIT_PATH_BLEND_MIN;

    vibeScratchDir.copy(segment.p3).sub(segment.p0);
    const chord = vibeScratchDir.length();
    if (chord < 1e-5) return;
    vibeScratchDir.multiplyScalar(1 / chord);

    const calmP1 = vibeEntranceBlend.fromCam;
    const calmP2 = vibeEntranceBlend.fromLook;
    const handleAlongChord = chord * THREE.MathUtils.lerp(0.33, 0.38, bend);

    if (useOrbitPath && vibeOrbitState.initialized && bend >= 0.04) {
      vibeOrbitTangentAtAngle(
        vibeOrbitState.segmentStartAngle,
        vibeScratchLerp,
      );
      calmP1
        .copy(segment.p0)
        .addScaledVector(vibeScratchLerp, handleAlongChord);
      vibeOrbitTangentAtAngle(vibeOrbitState.angle, vibeScratchLerp);
      calmP2
        .copy(segment.p3)
        .addScaledVector(vibeScratchLerp, -handleAlongChord);
    } else {
      calmP1.copy(segment.p0).addScaledVector(vibeScratchDir, handleAlongChord);
      calmP2
        .copy(segment.p3)
        .addScaledVector(vibeScratchDir, -handleAlongChord);
      if (previous && bend >= 0.04) {
        calmP1.copy(previous.p3).sub(previous.p2).add(segment.p0);
        if (calmP1.distanceToSquared(segment.p0) < 1e-6) {
          calmP1
            .copy(segment.p0)
            .addScaledVector(vibeScratchDir, handleAlongChord);
        }
      }
    }

    vibeRandomUnit(vibeScratchLerp);
    vibeScratchLerp.addScaledVector(
      vibeScratchDir,
      -vibeScratchLerp.dot(vibeScratchDir),
    );
    if (vibeScratchLerp.lengthSq() < 1e-8) vibeScratchLerp.set(0, 1, 0);
    else vibeScratchLerp.normalize();

    const bendAmount =
      (params.pathHandlePerpMin + Math.random() * params.pathHandlePerpSpan) *
      bend;
    const handleOut =
      (params.handleOutMin + Math.random() * params.handleOutSpan) * wild;
    const handleIn =
      (params.handleInNegMin + Math.random() * params.handleInNegSpan) * wild;
    const alongOut = chord * THREE.MathUtils.lerp(0.34, 0.22, bend);
    const alongIn = chord * THREE.MathUtils.lerp(-0.34, -0.22, bend);

    const wildP1 = vibeEntranceBlend.fromUp;
    wildP1
      .copy(segment.p0)
      .addScaledVector(vibeScratchDir, alongOut)
      .addScaledVector(vibeScratchLerp, bendAmount)
      .addScaledVector(vibeScratchLerp, handleOut * (0.35 + bend * 0.45));
    const wildP2 = vibePathEval;
    wildP2
      .copy(segment.p3)
      .addScaledVector(vibeScratchDir, alongIn)
      .addScaledVector(
        vibeScratchLerp,
        -bendAmount * (0.7 + Math.random() * 0.55),
      )
      .addScaledVector(vibeScratchLerp, -handleIn * 0.25 * bend);

    segment.p1.copy(calmP1).lerp(wildP1, bend);
    segment.p2.copy(calmP2).lerp(wildP2, bend);

    if (!previous && bend > 0.35) {
      const p2Pull =
        (params.p2LerpMin + Math.random() * params.p2LerpSpan) * bend;
      segment.p2.lerp(segment.p1, Math.min(0.42, p2Pull));
    }

    if (useOrbitPath) {
      vibeSoftClampInsideOrbitEllipsoid(focus, segment.p1);
    } else {
      clampVibePointToLayoutBounds(segment.p1, focus);
    }

    vibeEnforceBezierJoinContinuity(segment, previous);

    if (!previous) {
      if (useOrbitPath) {
        vibeSoftClampInsideOrbitEllipsoid(focus, segment.p2);
      } else {
        clampVibePointToLayoutBounds(segment.p2, focus);
      }
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
  const vibeLayoutMin = new THREE.Vector3(0, -2.2, -4.5);
  const vibeLayoutMax = new THREE.Vector3(8.5, 2.8, 4.5);
  const vibeOrbitState = {
    angle: 0,
    segmentStartAngle: 0,
    sign: 1 as 1 | -1,
    tiltPhase: 0,
    radii: new THREE.Vector3(3, 1.1, 2.6),
    initialized: false,
  };
  let vibeNetLookFill:
    | ((out: THREE.Vector3, elapsedSec: number) => void)
    | null = null;
  let vibeNetBoundsFill:
    | ((min: THREE.Vector3, max: THREE.Vector3) => void)
    | null = null;

  function refreshVibeLayoutBounds(): void {
    if (vibeNetBoundsFill) vibeNetBoundsFill(vibeLayoutMin, vibeLayoutMax);
  }

  function vibeRefreshOrbitRadii(focus: THREE.Vector3): void {
    const spanX = Math.min(
      focus.x - vibeLayoutMin.x,
      vibeLayoutMax.x - focus.x,
    );
    const spanZ = Math.min(
      focus.z - vibeLayoutMin.z,
      vibeLayoutMax.z - focus.z,
    );
    const spanY = (vibeLayoutMax.y - vibeLayoutMin.y) * 0.5;
    const inset = 0.74;
    vibeOrbitState.radii.set(
      Math.max(1.35, spanX * inset),
      Math.max(0.75, spanY * inset * 0.52),
      Math.max(1.35, spanZ * inset),
    );
    vibeOrbitState.radii.x *= 1.14;
    vibeOrbitState.radii.z *= 0.86;
  }

  function vibeInitOrbitFromPosition(
    position: THREE.Vector3,
    focus: THREE.Vector3,
  ): void {
    vibeRefreshOrbitRadii(focus);
    vibeScratchDir.copy(position).sub(focus);
    const radii = vibeOrbitState.radii;
    if (vibeScratchDir.lengthSq() < 1e-5) {
      vibeOrbitState.angle = Math.random() * Math.PI * 2;
    } else {
      vibeOrbitState.angle = Math.atan2(
        vibeScratchDir.z / Math.max(radii.z, 0.35),
        vibeScratchDir.x / Math.max(radii.x, 0.35),
      );
    }
    vibeOrbitState.segmentStartAngle = vibeOrbitState.angle;
    vibeOrbitState.sign = Math.random() < 0.5 ? 1 : -1;
    vibeOrbitState.tiltPhase = Math.random() * Math.PI * 2;
    vibeOrbitState.initialized = true;
  }

  function vibeOrbitPointAtAngle(
    angle: number,
    focus: THREE.Vector3,
    out: THREE.Vector3,
  ): void {
    const radii = vibeOrbitState.radii;
    const verticalBob =
      Math.sin(angle * 0.55 + vibeOrbitState.tiltPhase) * radii.y * 0.26;
    out.set(
      focus.x + radii.x * Math.cos(angle),
      focus.y + verticalBob,
      focus.z + radii.z * Math.sin(angle),
    );
  }

  function vibeOrbitTangentAtAngle(angle: number, out: THREE.Vector3): void {
    const radii = vibeOrbitState.radii;
    const verticalDeriv =
      Math.cos(angle * 0.55 + vibeOrbitState.tiltPhase) * 0.55 * radii.y * 0.26;
    out.set(
      -radii.x * Math.sin(angle),
      verticalDeriv,
      radii.z * Math.cos(angle),
    );
    if (out.lengthSq() < 1e-8) out.set(0, 0, 1);
    else out.normalize();
  }

  function vibeSoftClampInsideOrbitEllipsoid(
    focus: THREE.Vector3,
    point: THREE.Vector3,
  ): void {
    vibeRefreshOrbitRadii(focus);
    vibeScratchDir.copy(point).sub(focus);
    const radii = vibeOrbitState.radii;
    const ellipsoidY = radii.y * 1.18;
    const normX = vibeScratchDir.x / radii.x;
    const normY = vibeScratchDir.y / ellipsoidY;
    const normZ = vibeScratchDir.z / radii.z;
    const ellipsoidDistance = Math.sqrt(
      normX * normX + normY * normY + normZ * normZ,
    );
    if (ellipsoidDistance > 0.94) {
      const scale = 0.92 / ellipsoidDistance;
      point.copy(focus).addScaledVector(vibeScratchDir, scale);
    }
  }

  function clampVibePointToLayoutBounds(
    point: THREE.Vector3,
    focus: THREE.Vector3 = vibeNetFocus,
  ): void {
    if (vibeCamParams.pathOrbitBlend >= VIBE_ORBIT_PATH_BLEND_MIN) {
      vibeSoftClampInsideOrbitEllipsoid(focus, point);
      return;
    }
    point.x = THREE.MathUtils.clamp(point.x, vibeLayoutMin.x, vibeLayoutMax.x);
    point.y = THREE.MathUtils.clamp(point.y, vibeLayoutMin.y, vibeLayoutMax.y);
    point.z = THREE.MathUtils.clamp(point.z, vibeLayoutMin.z, vibeLayoutMax.z);
  }

  function setVibeNetworkLookFocus(
    sampler: VibeNetworkLookFocusSampler | null,
  ): void {
    vibeNetLookFill = sampler
      ? (out, elapsedSec) => sampler.fillLayoutCentroid(out, elapsedSec)
      : null;
    vibeNetBoundsFill = sampler
      ? (min, max) => sampler.fillLayoutBounds(min, max)
      : null;
    refreshVibeLayoutBounds();
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
      u0: new THREE.Vector3(),
      u3: new THREE.Vector3(),
    };
    const jitter = params.p3Jitter;
    const lookChaos = params.pathIntraCurve;

    vibePlaceSegmentEnd(seg.p0, seg.p3, look, null, true);
    vibePlaceCurveHandles(seg, null, look);

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
    seg.l3.x += (Math.random() - 0.5) * 2.6 * jitter * lookChaos;
    seg.l3.y += (Math.random() - 0.5) * 2.1 * jitter * lookChaos;
    seg.l3.z += (Math.random() - 0.5) * 2.6 * jitter * lookChaos;
    clampVibePointToLayoutBounds(seg.l3, look);
    vibeRandomUnit(vibeScratchDir);
    seg.l1
      .copy(look)
      .addScaledVector(
        vibeScratchDir,
        (1.05 + Math.random() * 2.5) * lookChaos,
      );
    vibeRandomUnit(vibeScratchDir);
    seg.l2
      .copy(seg.l3)
      .addScaledVector(
        vibeScratchDir,
        -(1.1 + Math.random() * 2.7) * lookChaos,
      );

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
      u0: new THREE.Vector3().copy(prev.u3),
      u3: new THREE.Vector3(),
    };
    const jitter = params.p3Jitter;
    const lookChaos = params.pathIntraCurve;

    vibePlaceSegmentEnd(seg.p0, seg.p3, vibeNetFocus, prev, false);
    vibePlaceCurveHandles(seg, prev, vibeNetFocus);

    seg.l1.copy(prev.l3).add(vibeScratchLerp.copy(prev.l3).sub(prev.p2));
    seg.l3.copy(seg.p3);
    seg.l3.x += (Math.random() - 0.5) * 2.8 * jitter * lookChaos;
    seg.l3.y += (Math.random() - 0.5) * 2.2 * jitter * lookChaos;
    seg.l3.z += (Math.random() - 0.5) * 2.8 * jitter * lookChaos;
    clampVibePointToLayoutBounds(seg.l3, vibeNetFocus);
    vibeRandomUnit(vibeScratchDir);
    seg.l2
      .copy(seg.l3)
      .addScaledVector(
        vibeScratchDir,
        -(1.15 + Math.random() * 2.75) * lookChaos,
      );

    seg.u3
      .set((Math.random() - 0.5) * 0.52, 1, (Math.random() - 0.5) * 0.52)
      .normalize();

    const chordPrev = Math.max(0.52, prev.p0.distanceTo(prev.p3));
    const chordNew = seg.p0.distanceTo(seg.p3);
    const legato =
      params.legatoMin + Math.random() * (params.legatoMax - params.legatoMin);
    const ratioMin = THREE.MathUtils.lerp(
      params.pathChordRatioMin,
      params.chordRatioMin,
      lookChaos,
    );
    const ratioMax = THREE.MathUtils.lerp(
      params.pathChordRatioMax,
      params.chordRatioMax,
      lookChaos,
    );
    let ratio = chordNew / chordPrev;
    ratio = THREE.MathUtils.clamp(ratio, ratioMin, ratioMax);
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
    refreshVibeLayoutBounds();
    if (vibeNetLookFill) vibeNetLookFill(vibeNetFocus, 0);
    vibeOrbitState.initialized = false;
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
    let progress = vibeSegElapsed / head.dur;
    if (progress > 1) progress = 1;
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

  const vibePreviewOnlyParamKeys: ReadonlySet<keyof ResolvedVibeCameraParams> =
    new Set([
      'pathPreview',
      'pathPreviewMaxSegments',
      'pathPreviewMarkers',
      'pathPreviewMarkerRadius',
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

    if (vibeEntranceBlend.active || vibeSegQueue.length === 0) {
      refillVibeSegQueueFromScene();
    } else if (maxSegmentChordChanged) {
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

      vibePathScratchColor.setHex(seg.previewColorHex);

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
        refillVibeSegQueueFromScene();
      }
      syncVibeSegQueueLength();
    }

    const head = vibeSegQueue[0];
    if (!head) {
      refillVibeSegQueueFromScene();
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

    if (vibeCamControlMode === 'freeLook') {
      updateVibePathCameraRig();
      updateVibePathPreview();
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
    scene.remove(vibePathCameraRig);
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
