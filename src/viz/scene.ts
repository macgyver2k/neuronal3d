import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export function createScene(container: HTMLElement): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  render: () => void;
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

  const accent = new THREE.PointLight(0xb18cff, 18, 30, 2);
  accent.position.set(10, -2, 6);
  scene.add(accent);

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

  const glowGeom = new THREE.SphereGeometry(0.08, 10, 8);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xb18cff });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  accent.add(glow);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(4, 0, 0);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight)),
    1.05,
    0.65,
    0.12,
  );
  composer.addPass(bloom);

  container.appendChild(renderer.domElement);

  const onResize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  const dispose = () => {
    window.removeEventListener("resize", onResize);
    controls.dispose();
    glowGeom.dispose();
    glowMat.dispose();
    floor.geometry.dispose();
    (floor.material as THREE.Material).dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }
  };

  const render = () => {
    composer.render();
  };

  return { scene, camera, renderer, controls, render, dispose };
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
