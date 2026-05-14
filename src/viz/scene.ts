import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
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

/** Deterministischer PRNG für Vibe-Kamera-Parameter pro Aktivierung */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rollVibeCameraParams(): {
  tScale: number;
  tShift: number;
  ph: number[];
} {
  const seed = ((Math.random() * 0xffffffff) ^ (Date.now() & 0xffffffff)) >>> 0;
  const rnd = mulberry32(seed);
  const ph = Array.from({ length: 32 }, () => rnd() * Math.PI * 2);
  return {
    tScale: 0.88 + rnd() * 0.24,
    tShift: rnd() * 900,
    ph,
  };
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

export function createScene(mount: NeuronalGlSceneMount): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  render: () => void;
  renderDisplay: () => void;
  setVibeCameraMode: (enabled: boolean) => void;
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
  let vibeCamParams = rollVibeCameraParams();

  const applyVibeCamera = () => {
    if (!vibeCameraMode) return;
    const rawT = vibeClock.getElapsedTime();
    const t = rawT * vibeCamParams.tScale + vibeCamParams.tShift;
    const ph = vibeCamParams.ph;
    const tx =
      4 +
      2.6 * Math.sin(t * 0.14 + ph[0]!) +
      1.15 * Math.sin(t * 0.33 + ph[1]!) +
      0.65 * Math.sin(t * 0.52 + ph[2]!) +
      0.4 * Math.sin(t * 0.71 + ph[3]!);
    const ty =
      0.55 +
      1.55 * Math.sin(t * 0.18 + ph[4]!) +
      0.95 * Math.sin(t * 0.31 + ph[5]!) +
      0.45 * Math.cos(t * 0.47 + ph[6]!) +
      0.28 * Math.sin(t * 0.63 + ph[7]!);
    const tz =
      0.4 +
      2.35 * Math.cos(t * 0.12 + ph[8]!) +
      1.05 * Math.sin(t * 0.26 + ph[9]!) +
      0.55 * Math.sin(t * 0.44 + ph[10]!);
    controls.target.set(tx, ty, tz);

    const theta =
      t * 0.175 +
      0.95 * Math.sin(t * 0.055 + ph[11]!) +
      0.52 * Math.sin(t * 0.1 + ph[12]!) +
      0.28 * Math.sin(t * 0.17 + ph[13]!);
    const phi =
      Math.PI * 0.36 +
      0.52 * Math.sin(t * 0.075 + ph[14]!) +
      0.28 * Math.sin(t * 0.13 + ph[15]!) +
      0.14 * Math.sin(t * 0.21 + ph[16]!);
    const r =
      12.5 +
      4.8 * Math.sin(t * 0.042 + ph[17]!) +
      2.4 * Math.sin(t * 0.095 + ph[18]!) +
      1.35 * Math.sin(t * 0.16 + ph[19]!) +
      0.85 * Math.sin(t * 0.24 + ph[20]!);

    const sinPhi = Math.sin(phi);
    camera.position.set(
      tx + r * sinPhi * Math.cos(theta),
      ty + r * Math.cos(phi),
      tz + r * sinPhi * Math.sin(theta),
    );

    const jx =
      0.62 * Math.sin(t * 0.22 + ph[21]!) + 0.28 * Math.sin(t * 0.51 + ph[22]!);
    const jy =
      0.52 * Math.sin(t * 0.28 + ph[23]!) + 0.22 * Math.cos(t * 0.46 + ph[24]!);
    const jz =
      0.48 * Math.cos(t * 0.25 + ph[25]!) + 0.26 * Math.sin(t * 0.39 + ph[26]!);
    camera.up
      .set(
        0.32 * Math.sin(t * 0.19 + ph[27]!),
        1,
        0.28 * Math.cos(t * 0.17 + ph[28]!),
      )
      .normalize();
    camera.lookAt(tx + jx, ty + jy, tz + jz);
  };

  const setVibeCameraMode = (enabled: boolean) => {
    if (enabled === vibeCameraMode) return;
    if (enabled) {
      vibeCamParams = rollVibeCameraParams();
      vibeSavedCam.copy(camera.position);
      vibeSavedTarget.copy(controls.target);
      vibeSavedEnableDamping = controls.enableDamping;
      controls.enableDamping = false;
      controls.enabled = false;
      vibeClock.start();
      vibeCameraMode = true;
    } else {
      vibeCameraMode = false;
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
