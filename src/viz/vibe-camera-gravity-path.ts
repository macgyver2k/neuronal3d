import * as THREE from 'three';

/** Schrittweite der Pfad-Vorausintegration (Sekunden). */
export const VIBE_GRAVITY_SIM_STEP_SEC = 1 / 90;

/** Ellipsoid-Grenze relativ zu den Horizont-Radien (0–1). */
export const VIBE_GRAVITY_HORIZON_LIMIT = 0.94;

/** Beschleunigung skaliert mit Abstand: a = strength · (focus − pos). */
export const VIBE_GRAVITY_STRENGTH = 0.44;

export type VibeGravityPathState = {
  velocity: THREE.Vector3;
  segmentStartVelocity: THREE.Vector3;
  initialized: boolean;
};

export function createVibeGravityPathState(): VibeGravityPathState {
  return {
    velocity: new THREE.Vector3(),
    segmentStartVelocity: new THREE.Vector3(),
    initialized: false,
  };
}

export function refreshVibeGravityHorizonRadii(
  focus: THREE.Vector3,
  layoutMin: THREE.Vector3,
  layoutMax: THREE.Vector3,
  outRadii: THREE.Vector3,
): void {
  const spanX = Math.min(focus.x - layoutMin.x, layoutMax.x - focus.x);
  const spanZ = Math.min(focus.z - layoutMin.z, layoutMax.z - focus.z);
  const spanY = (layoutMax.y - layoutMin.y) * 0.5;
  const inset = 0.74;
  outRadii.set(
    Math.max(1.35, spanX * inset),
    Math.max(0.75, spanY * inset * 0.52),
    Math.max(1.35, spanZ * inset),
  );
  outRadii.x *= 1.14;
  outRadii.z *= 0.86;
}

export function initVibeGravityVelocityFromPosition(
  position: THREE.Vector3,
  focus: THREE.Vector3,
  flightSpeed: number,
  orbitSign: 1 | -1,
  outVelocity: THREE.Vector3,
): void {
  const radial = _scratchRadial.copy(position).sub(focus);
  if (radial.lengthSq() < 1e-5) {
    outVelocity.set(0, 0, orbitSign * flightSpeed);
    return;
  }
  radial.normalize();
  outVelocity.set(0, 1, 0);
  outVelocity.crossVectors(outVelocity, radial);
  if (outVelocity.lengthSq() < 1e-6) {
    outVelocity.set(orbitSign * flightSpeed, 0, 0);
    return;
  }
  outVelocity.normalize().multiplyScalar(orbitSign * flightSpeed);
}

function ellipsoidDistance(
  offset: THREE.Vector3,
  radii: THREE.Vector3,
): number {
  const ellipsoidY = radii.y * 1.18;
  const normX = offset.x / radii.x;
  const normY = offset.y / ellipsoidY;
  const normZ = offset.z / radii.z;
  return Math.sqrt(normX * normX + normY * normY + normZ * normZ);
}

export function clampVibeGravityHorizon(
  focus: THREE.Vector3,
  position: THREE.Vector3,
  velocity: THREE.Vector3,
  horizonRadii: THREE.Vector3,
): void {
  const offset = _scratchOffset.copy(position).sub(focus);
  const ellipsoidY = horizonRadii.y * 1.18;
  const distance = ellipsoidDistance(offset, horizonRadii);
  if (distance <= VIBE_GRAVITY_HORIZON_LIMIT) return;

  const normal = _scratchNormal.set(
    offset.x / (horizonRadii.x * horizonRadii.x),
    offset.y / (ellipsoidY * ellipsoidY),
    offset.z / (horizonRadii.z * horizonRadii.z),
  );
  if (normal.lengthSq() < 1e-8) return;
  normal.normalize();

  const scale = (VIBE_GRAVITY_HORIZON_LIMIT * 0.98) / distance;
  position.copy(focus).addScaledVector(offset, scale);

  const outwardSpeed = velocity.dot(normal);
  if (outwardSpeed > 0) velocity.addScaledVector(normal, -outwardSpeed);
}

export function simulateVibeGravitySegmentEnd(
  start: THREE.Vector3,
  focus: THREE.Vector3,
  segmentDurationSec: number,
  flightSpeed: number,
  gravityStrength: number,
  horizonRadii: THREE.Vector3,
  state: VibeGravityPathState,
  outEnd: THREE.Vector3,
): void {
  if (!state.initialized) {
    const orbitSign: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
    initVibeGravityVelocityFromPosition(
      start,
      focus,
      flightSpeed,
      orbitSign,
      state.velocity,
    );
    state.initialized = true;
  }

  state.segmentStartVelocity.copy(state.velocity);

  const position = _scratchPosition.copy(start);
  const velocity = _scratchVelocity.copy(state.velocity);
  const toCenter = _scratchToCenter;
  const duration = Math.max(segmentDurationSec, 1 / 120);
  let elapsed = 0;

  while (elapsed < duration - 1e-9) {
    const step = Math.min(VIBE_GRAVITY_SIM_STEP_SEC, duration - elapsed);
    toCenter.copy(focus).sub(position);
    if (toCenter.lengthSq() > 1e-8) {
      velocity.addScaledVector(toCenter, gravityStrength * step);
    }

    const speed = velocity.length();
    if (speed > 1e-6) velocity.multiplyScalar(flightSpeed / speed);
    else {
      initVibeGravityVelocityFromPosition(
        position,
        focus,
        flightSpeed,
        1,
        velocity,
      );
    }

    position.addScaledVector(velocity, step);
    clampVibeGravityHorizon(focus, position, velocity, horizonRadii);
    elapsed += step;
  }

  outEnd.copy(position);
  state.velocity.copy(velocity);
}

const _scratchRadial = new THREE.Vector3();
const _scratchOffset = new THREE.Vector3();
const _scratchNormal = new THREE.Vector3();
const _scratchPosition = new THREE.Vector3();
const _scratchVelocity = new THREE.Vector3();
const _scratchToCenter = new THREE.Vector3();
