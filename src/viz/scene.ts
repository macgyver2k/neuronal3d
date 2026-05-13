import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

export function createScene(container: HTMLElement): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  render: () => void;
  renderDisplay: () => void;
  setVibeCameraMode: (enabled: boolean) => void;
  dispose: () => void;
} {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a3140);
  scene.fog = new THREE.Fog(0x2a3140, 12, 40);

  const camera = new THREE.PerspectiveCamera(
    55,
    Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
    0.1,
    200,
  );
  camera.position.set(-8, 4, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  const hemi = new THREE.HemisphereLight(0xd6e2ff, 0x4b5668, 1.7);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff7ef, 2.8);
  key.position.set(7, 10, 8);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xaec3ff, 1.6);
  fill.position.set(-6, 4, -3);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0x9df0ff, 1.2);
  rim.position.set(-2, 7, 12);
  scene.add(rim);

  const backAccent = new THREE.PointLight(0x5fd3ff, 14, 24, 2);
  backAccent.position.set(-4, 3, -10);
  scene.add(backAccent);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(60, 96),
    new THREE.MeshBasicMaterial({ color: 0x3d4658 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.2;
  scene.add(floor);

  const controls = new OrbitControls(camera, renderer.domElement);
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

  const applyVibeCamera = () => {
    if (!vibeCameraMode) return;
    const t = vibeClock.getElapsedTime();
    const tx =
      4 +
      2.6 * Math.sin(t * 0.14) +
      1.15 * Math.sin(t * 0.33 + 0.4) +
      0.65 * Math.sin(t * 0.52 + 0.2) +
      0.4 * Math.sin(t * 0.71);
    const ty =
      0.55 +
      1.55 * Math.sin(t * 0.18) +
      0.95 * Math.sin(t * 0.31 + 0.9) +
      0.45 * Math.cos(t * 0.47) +
      0.28 * Math.sin(t * 0.63 + 0.4);
    const tz =
      0.4 +
      2.35 * Math.cos(t * 0.12) +
      1.05 * Math.sin(t * 0.26 + 1.1) +
      0.55 * Math.sin(t * 0.44);
    controls.target.set(tx, ty, tz);

    const theta =
      t * 0.175 +
      0.95 * Math.sin(t * 0.055) +
      0.52 * Math.sin(t * 0.1 + 0.3) +
      0.28 * Math.sin(t * 0.17 + 0.8);
    const phi =
      Math.PI * 0.36 +
      0.52 * Math.sin(t * 0.075 + 0.6) +
      0.28 * Math.sin(t * 0.13) +
      0.14 * Math.sin(t * 0.21 + 1.2);
    const r =
      12.5 +
      4.8 * Math.sin(t * 0.042) +
      2.4 * Math.sin(t * 0.095 + 0.8) +
      1.35 * Math.sin(t * 0.16) +
      0.85 * Math.sin(t * 0.24 + 0.3);

    const sinPhi = Math.sin(phi);
    camera.position.set(
      tx + r * sinPhi * Math.cos(theta),
      ty + r * Math.cos(phi),
      tz + r * sinPhi * Math.sin(theta),
    );

    const jx =
      0.62 * Math.sin(t * 0.22 + 0.2) + 0.28 * Math.sin(t * 0.51 + 0.6);
    const jy = 0.52 * Math.sin(t * 0.28 + 0.5) + 0.22 * Math.cos(t * 0.46);
    const jz = 0.48 * Math.cos(t * 0.25) + 0.26 * Math.sin(t * 0.39 + 1.0);
    camera.up
      .set(0.32 * Math.sin(t * 0.19 + 0.35), 1, 0.28 * Math.cos(t * 0.17 + 0.2))
      .normalize();
    camera.lookAt(tx + jx, ty + jy, tz + jz);
  };

  const setVibeCameraMode = (enabled: boolean) => {
    if (enabled === vibeCameraMode) return;
    if (enabled) {
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

  const isTypingFocus = (t: EventTarget | null) =>
    t instanceof HTMLElement &&
    t.closest("input, textarea, [contenteditable='true']") !== null;

  const onKeyNavDown = (event: KeyboardEvent) => {
    if (!navCodes.has(event.code) || isTypingFocus(event.target)) return;
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
    if (document.hidden) clearKeys();
  };
  const onPageHide = () => {
    clearKeys();
  };
  window.addEventListener('keydown', onKeyNavDown);
  window.addEventListener('keyup', onKeyNavUp);
  window.addEventListener('blur', clearKeys);
  window.addEventListener('focus', clearKeys);
  window.addEventListener('pagehide', onPageHide);
  document.addEventListener('visibilitychange', onVisibility);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(
      Math.max(1, container.clientWidth),
      Math.max(1, container.clientHeight),
    ),
    0.55,
    0.45,
    0.22,
  );
  composer.addPass(bloom);
  const fxaaPass = new ShaderPass(FXAAShader);
  const outputPass = new OutputPass();
  const updateFxaaResolution = () => {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    const pr = renderer.getPixelRatio();
    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (w * pr),
      1 / (h * pr),
    );
  };
  updateFxaaResolution();
  composer.addPass(fxaaPass);
  composer.addPass(outputPass);

  container.appendChild(renderer.domElement);

  const onResize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
    updateFxaaResolution();
  };
  window.addEventListener('resize', onResize);

  const dispose = () => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKeyNavDown);
    window.removeEventListener('keyup', onKeyNavUp);
    window.removeEventListener('blur', clearKeys);
    window.removeEventListener('focus', clearKeys);
    window.removeEventListener('pagehide', onPageHide);
    document.removeEventListener('visibilitychange', onVisibility);
    controls.dispose();
    floor.geometry.dispose();
    (floor.material as THREE.Material).dispose();
    fxaaPass.dispose();
    outputPass.dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
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

  return {
    scene,
    camera,
    renderer,
    controls,
    render,
    renderDisplay,
    setVibeCameraMode,
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
