import * as THREE from 'three';

/** Schrittweite der Pfad-Vorausintegration (Sekunden). */
export const VIBE_GRAVITY_SIM_STEP_SEC = 1 / 90;

/** Ellipsoid-Grenze relativ zu den Horizont-Radien (0–1). */
export const VIBE_GRAVITY_HORIZON_LIMIT = 0.94;

/** Richtungs-Zug zum Pfad-Schwerpunkt (nicht federnd über Distanz). */
export const VIBE_GRAVITY_STRENGTH = 0.34;

/** Exponent für Stärke ∝ 1/s^exp bei skaliertem Horizont. */
export const VIBE_GRAVITY_RADIUS_STRENGTH_EXPONENT = 2.5;

/** Untere Geschwindigkeitsgrenze relativ zur Reisegeschwindigkeit. */
export const VIBE_COASTER_MIN_SPEED_RATIO = 0.36;

/** Obere Geschwindigkeitsgrenze relativ zur Reisegeschwindigkeit. */
export const VIBE_COASTER_MAX_SPEED_RATIO = 1.78;

/** Räumliche Pfadlage relativ zum Modell-Schwerpunkt. */
export type VibePathElevationPass = 'side' | 'over' | 'under';

export type VibeGravityPathState = {
  velocity: THREE.Vector3;
  segmentStartVelocity: THREE.Vector3;
  initialized: boolean;
  orbitSign: 1 | -1;
  elevationPass: VibePathElevationPass;
  segmentPathLength: number;
  segmentStartSpeed: number;
  segmentEndSpeed: number;
};

export function createVibeGravityPathState(): VibeGravityPathState {
  return {
    velocity: new THREE.Vector3(),
    segmentStartVelocity: new THREE.Vector3(),
    initialized: false,
    orbitSign: 1,
    elevationPass: 'side',
    segmentPathLength: 0,
    segmentStartSpeed: 0,
    segmentEndSpeed: 0,
  };
}

/** Fortschritt entlang der Strecke bei linearer Zeit (Achterbahn-Beschleunigung). */
export function vibeCoasterDistanceFraction(
  linearTime: number,
  startSpeed: number,
  endSpeed: number,
): number {
  const time = linearTime < 0 ? 0 : linearTime > 1 ? 1 : linearTime;
  const start = Math.max(startSpeed, 1e-3);
  const end = Math.max(endSpeed, 1e-3);
  return (2 * start * time + (end - start) * time * time) / (start + end);
}

const projectOffsetToEllipsoidShell = (
  offset: THREE.Vector3,
  horizonRadii: THREE.Vector3,
  horizonLimit: number,
): void => {
  const ellipsoidY = horizonRadii.y * 1.18;
  const normX = offset.x / horizonRadii.x;
  const normY = offset.y / ellipsoidY;
  const normZ = offset.z / horizonRadii.z;
  const distance = Math.sqrt(normX * normX + normY * normY + normZ * normZ);
  if (distance > 1e-8) {
    offset.multiplyScalar((horizonLimit * 0.96) / distance);
  }
};

/** Kamera auf obere/untere Bahn legen (Pfad geht über/unter dem Modell). */
export function snapVibePositionToElevationPass(
  position: THREE.Vector3,
  focus: THREE.Vector3,
  horizonRadii: THREE.Vector3,
  horizonLimit: number,
  elevationPass: VibePathElevationPass,
): void {
  if (elevationPass === 'side') return;

  _scratchOffset.copy(position).sub(focus);
  const yMagnitude =
    horizonRadii.y *
    (elevationPass === 'over'
      ? THREE.MathUtils.lerp(0.58, 0.88, 0.55 + Math.random() * 0.45)
      : THREE.MathUtils.lerp(0.5, 0.78, 0.55 + Math.random() * 0.45));

  if (elevationPass === 'over') {
    if (_scratchOffset.y < yMagnitude) _scratchOffset.y = yMagnitude;
  } else if (_scratchOffset.y > -yMagnitude) {
    _scratchOffset.y = -yMagnitude;
  }

  const horizontalLength = Math.hypot(_scratchOffset.x, _scratchOffset.z);
  if (horizontalLength < horizonRadii.x * 0.2) {
    const orbitAngle = Math.random() * Math.PI * 2;
    _scratchOffset.x = Math.cos(orbitAngle) * horizonRadii.x * 0.62;
    _scratchOffset.z = Math.sin(orbitAngle) * horizonRadii.z * 0.62;
  }

  projectOffsetToEllipsoidShell(_scratchOffset, horizonRadii, horizonLimit);
  position.copy(focus).add(_scratchOffset);
}

function vibeElevationPassSteerTarget(
  position: THREE.Vector3,
  focus: THREE.Vector3,
  horizonRadii: THREE.Vector3,
  horizonLimit: number,
  elevationPass: VibePathElevationPass,
  out: THREE.Vector3,
): void {
  _scratchOffset.copy(position).sub(focus);
  const ySign = elevationPass === 'over' ? 1 : -1;
  const yMagnitude = horizonRadii.y * (elevationPass === 'over' ? 0.72 : 0.62);

  if (_scratchOffset.lengthSq() < 1e-8) {
    out.set(horizonRadii.x * 0.65, ySign * yMagnitude, 0);
  } else {
    out.copy(_scratchOffset);
    out.y = ySign * Math.max(Math.abs(out.y), yMagnitude);
    const horizontalLength = Math.hypot(out.x, out.z);
    if (horizontalLength < horizonRadii.x * 0.18) {
      out.x += horizonRadii.x * 0.35 * (out.x >= 0 ? 1 : -1);
      out.z += horizonRadii.z * 0.28 * (out.z >= 0 ? 1 : -1);
    }
  }

  projectOffsetToEllipsoidShell(out, horizonRadii, horizonLimit);
  out.add(focus);
}

function applyElevationPassSteering(
  position: THREE.Vector3,
  focus: THREE.Vector3,
  horizonRadii: THREE.Vector3,
  horizonLimit: number,
  elevationPass: VibePathElevationPass,
  flightSpeed: number,
  step: number,
  velocity: THREE.Vector3,
): void {
  if (elevationPass === 'side') return;

  vibeElevationPassSteerTarget(
    position,
    focus,
    horizonRadii,
    horizonLimit,
    elevationPass,
    _scratchDesired,
  );

  _scratchToCenter.copy(_scratchDesired).sub(position);
  const distance = _scratchToCenter.length();
  if (distance < 1e-8) return;

  const currentSpeed = Math.max(
    velocity.length(),
    flightSpeed * VIBE_COASTER_MIN_SPEED_RATIO,
  );
  const steerBlend = 1 - Math.exp(-5.8 * step);
  velocity.addScaledVector(
    _scratchToCenter,
    (currentSpeed * steerBlend * 0.85) / distance,
  );
}

function initElevationPassVelocity(
  start: THREE.Vector3,
  focus: THREE.Vector3,
  flightSpeed: number,
  orbitSign: 1 | -1,
  elevationPass: VibePathElevationPass,
  outVelocity: THREE.Vector3,
): void {
  initVibeGravityVelocityFromPosition(
    start,
    focus,
    flightSpeed,
    orbitSign,
    outVelocity,
  );
  if (elevationPass === 'side') return;

  _scratchOffset.copy(start).sub(focus);
  const horizontalLength = Math.hypot(_scratchOffset.x, _scratchOffset.z);
  if (horizontalLength < 1e-6) {
    outVelocity.set(orbitSign * flightSpeed, 0, 0);
    return;
  }

  _scratchTangent.set(-_scratchOffset.z, 0, _scratchOffset.x).normalize();
  outVelocity.copy(_scratchTangent).multiplyScalar(orbitSign * flightSpeed);
  if (elevationPass === 'over') {
    outVelocity.y += flightSpeed * 0.12;
  } else {
    outVelocity.y -= flightSpeed * 0.12;
  }
  outVelocity.normalize().multiplyScalar(flightSpeed);
}

export function refreshVibeGravityHorizonRadii(
  focus: THREE.Vector3,
  layoutMin: THREE.Vector3,
  layoutMax: THREE.Vector3,
  outRadii: THREE.Vector3,
  radiusScale = 1,
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
  if (radiusScale !== 1) outRadii.multiplyScalar(radiusScale);
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

const smoothstep01 = (value: number): number => {
  const clamped = value < 0 ? 0 : value > 1 ? 1 : value;
  return clamped * clamped * (3 - 2 * clamped);
};

const clampTraverse = (pathTraverse: number): number =>
  pathTraverse < 0 ? 0 : pathTraverse > 1 ? 1 : pathTraverse;

function vibeGravityOrbitTangentAt(
  position: THREE.Vector3,
  focus: THREE.Vector3,
  orbitSign: 1 | -1,
  out: THREE.Vector3,
): void {
  _scratchRadial.copy(position).sub(focus);
  if (_scratchRadial.lengthSq() < 1e-8) {
    out.set(0, 0, orbitSign);
    return;
  }
  _scratchRadial.normalize();
  out.set(0, 1, 0);
  out.crossVectors(out, _scratchRadial);
  if (out.lengthSq() < 1e-6) {
    out.set(orbitSign, 0, 0);
    return;
  }
  out.normalize().multiplyScalar(orbitSign);
}

/** Unterhalb davon reiner Außenorbit (voller Radius). */
const TRAVERSE_ONSET = 0.34;

/** 0 = aus, 1 = volle Durchquerung (erst ab TRAVERSE_ONSET am Slider). */
const traverseFactor = (pathTraverse: number): number =>
  smoothstep01(
    (clampTraverse(pathTraverse) - TRAVERSE_ONSET) / (1 - TRAVERSE_ONSET),
  );

const traverseStrength = (pathTraverse: number): number => {
  const factor = traverseFactor(pathTraverse);
  return factor * factor;
};

/**
 * Zielrichtung: Außenhülle = Orbit; Durchquerung nur bei hohem traverse-Faktor.
 */
function vibeGravitySteerDirection(
  position: THREE.Vector3,
  focus: THREE.Vector3,
  horizonRadii: THREE.Vector3,
  pathTraverse: number,
  orbitSign: 1 | -1,
  out: THREE.Vector3,
): void {
  const traverse = traverseFactor(pathTraverse);
  const strength = traverseStrength(pathTraverse);
  vibeGravityOrbitTangentAt(position, focus, orbitSign, _scratchTangent);
  if (traverse < 0.02) {
    out.copy(_scratchTangent);
    return;
  }

  _scratchOffset.copy(position).sub(focus);
  const ellipsoidDist = ellipsoidDistance(_scratchOffset, horizonRadii);
  const radialLength = _scratchOffset.length();
  if (radialLength < 1e-8) {
    out.copy(_scratchTangent);
    return;
  }

  _scratchRadial.copy(_scratchOffset).multiplyScalar(1 / radialLength);
  _scratchToCenter.copy(focus).sub(position).normalize();

  const outerShell = 0.84;
  const innerCore = THREE.MathUtils.lerp(0.5, 0.3, traverse);

  if (ellipsoidDist >= outerShell) {
    const farShell = smoothstep01(
      (ellipsoidDist - outerShell) / Math.max(0.96 - outerShell, 0.04),
    );
    const inwardMix = strength * farShell * 0.72;
    out.copy(_scratchTangent).multiplyScalar(1 - inwardMix);
    out.addScaledVector(_scratchToCenter, inwardMix);
  } else if (ellipsoidDist <= innerCore) {
    const coreBlend =
      1 - smoothstep01(ellipsoidDist / Math.max(innerCore, 0.05));
    const outwardMix = traverse * THREE.MathUtils.lerp(0.7, 0.96, coreBlend);
    _scratchDesired
      .copy(_scratchRadial)
      .negate()
      .addScaledVector(_scratchTangent, 0.12)
      .normalize();
    out.copy(_scratchTangent).multiplyScalar(1 - outwardMix);
    out.addScaledVector(_scratchDesired, outwardMix);
  } else {
    const crossingMix = strength * 0.42;
    out.copy(_scratchTangent).multiplyScalar(1 - crossingMix);
    out.addScaledVector(_scratchToCenter, crossingMix);
  }

  if (out.lengthSq() < 1e-8) out.copy(_scratchTangent);
  else out.normalize();
}

export function resolveVibeGravityStrength(
  baseStrength: number,
  horizonRadiusScale: number,
  pathTraverse = 0,
): number {
  const scale = Math.max(horizonRadiusScale, 1e-3);
  const traverse = traverseFactor(pathTraverse);
  const radiusScaled =
    baseStrength / Math.pow(scale, VIBE_GRAVITY_RADIUS_STRENGTH_EXPONENT);
  return radiusScaled * THREE.MathUtils.lerp(0.85, 2.2, traverse);
}

/** Tiefere Eindringtiefe erst bei hoher Durchquerung (sonst voller Radius). */
export function resolveVibeGravityHorizonLimit(pathTraverse = 0): number {
  const depth = Math.pow(traverseFactor(pathTraverse), 1.65);
  return THREE.MathUtils.lerp(VIBE_GRAVITY_HORIZON_LIMIT, 0.24, depth);
}

export function clampVibeGravityHorizon(
  focus: THREE.Vector3,
  position: THREE.Vector3,
  velocity: THREE.Vector3,
  horizonRadii: THREE.Vector3,
  horizonLimit = VIBE_GRAVITY_HORIZON_LIMIT,
): void {
  const offset = _scratchOffset.copy(position).sub(focus);
  const ellipsoidY = horizonRadii.y * 1.18;
  const distance = ellipsoidDistance(offset, horizonRadii);
  if (distance <= horizonLimit) return;

  const normal = _scratchNormal.set(
    offset.x / (horizonRadii.x * horizonRadii.x),
    offset.y / (ellipsoidY * ellipsoidY),
    offset.z / (horizonRadii.z * horizonRadii.z),
  );
  if (normal.lengthSq() < 1e-8) return;
  normal.normalize();

  const scale = (horizonLimit * 0.98) / distance;
  position.copy(focus).addScaledVector(offset, scale);

  const outwardSpeed = velocity.dot(normal);
  if (outwardSpeed > 0) velocity.addScaledVector(normal, -outwardSpeed);
}

function blendVibeGravityVelocityTowardInwardStart(
  start: THREE.Vector3,
  focus: THREE.Vector3,
  flightSpeed: number,
  pathTraverse: number,
  velocity: THREE.Vector3,
): void {
  const traverse = traverseFactor(pathTraverse);
  if (traverse < 0.45) return;

  _scratchToCenter.copy(focus).sub(start);
  if (_scratchToCenter.lengthSq() < 1e-8) return;

  const currentSpeed = Math.max(velocity.length(), flightSpeed * 0.55);
  _scratchToCenter.normalize().multiplyScalar(currentSpeed);
  const blend = traverseStrength(pathTraverse) * 0.55;
  velocity.lerp(_scratchToCenter, blend);
}

function vibeCoasterPotential(
  position: THREE.Vector3,
  focus: THREE.Vector3,
  horizonRadii: THREE.Vector3,
): number {
  _scratchOffset.copy(position).sub(focus);
  const ellipsoidDist = ellipsoidDistance(_scratchOffset, horizonRadii);
  return _scratchOffset.y * 0.52 + ellipsoidDist * horizonRadii.y * 0.28;
}

function applyVibeCoasterSpeed(
  velocity: THREE.Vector3,
  steerDirection: THREE.Vector3,
  flightSpeed: number,
  potentialDrop: number,
  steerBlend: number,
  step: number,
  outPathLengthDelta: { value: number },
): void {
  let speed = velocity.length();
  if (speed < 1e-5) speed = flightSpeed * 0.68;

  const alignment = speed > 1e-5 ? velocity.dot(steerDirection) / speed : 1;
  const directionBlend = steerBlend * (1 + (1 - Math.abs(alignment)) * 0.32);
  velocity.lerp(
    _scratchNormal.copy(steerDirection).multiplyScalar(speed),
    directionBlend,
  );

  const downhillPush =
    Math.max(potentialDrop, 0) * VIBE_GRAVITY_STRENGTH * flightSpeed * 2.6;
  const climbDrag =
    Math.max(-potentialDrop, 0) * VIBE_GRAVITY_STRENGTH * flightSpeed * 1.05;
  const cruisePull = (speed - flightSpeed) * 0.82;
  const curveBrake =
    (1 - THREE.MathUtils.clamp(alignment, -1, 1)) *
    flightSpeed *
    2.8 *
    steerBlend;

  speed += (downhillPush - climbDrag - cruisePull - curveBrake) * step;
  speed = THREE.MathUtils.clamp(
    speed,
    flightSpeed * VIBE_COASTER_MIN_SPEED_RATIO,
    flightSpeed * VIBE_COASTER_MAX_SPEED_RATIO,
  );

  if (velocity.lengthSq() > 1e-8) velocity.normalize().multiplyScalar(speed);
  else velocity.copy(steerDirection).multiplyScalar(speed);

  outPathLengthDelta.value += speed * step;
}

export function simulateVibeGravitySegmentEnd(
  start: THREE.Vector3,
  focus: THREE.Vector3,
  segmentDurationSec: number,
  flightSpeed: number,
  gravityStrength: number,
  horizonRadii: THREE.Vector3,
  pathTraverse: number,
  state: VibeGravityPathState,
  outEnd: THREE.Vector3,
): void {
  const traverse = traverseFactor(pathTraverse);
  const strength = traverseStrength(pathTraverse);

  if (!state.initialized) {
    state.orbitSign = Math.random() < 0.5 ? 1 : -1;
    initElevationPassVelocity(
      start,
      focus,
      flightSpeed,
      state.orbitSign,
      state.elevationPass,
      state.velocity,
    );
    blendVibeGravityVelocityTowardInwardStart(
      start,
      focus,
      flightSpeed,
      pathTraverse,
      state.velocity,
    );
    state.initialized = true;
  }

  state.segmentStartVelocity.copy(state.velocity);
  state.segmentStartSpeed = Math.max(
    state.velocity.length(),
    flightSpeed * 0.55,
  );
  state.segmentPathLength = 0;
  const pathLengthDelta = { value: 0 };

  const position = _scratchPosition.copy(start);
  const velocity = _scratchVelocity.copy(state.velocity);
  const duration = Math.max(segmentDurationSec, 1 / 120);
  const horizonLimit = resolveVibeGravityHorizonLimit(pathTraverse);
  let elapsed = 0;
  const innerFlipDist = THREE.MathUtils.lerp(0.42, 0.24, traverse);
  let wasBeyondInner =
    ellipsoidDistance(_scratchOffset.copy(start).sub(focus), horizonRadii) >
    innerFlipDist;
  let previousPotential = vibeCoasterPotential(start, focus, horizonRadii);

  while (elapsed < duration - 1e-9) {
    const step = Math.min(VIBE_GRAVITY_SIM_STEP_SEC, duration - elapsed);
    _scratchOffset.copy(position).sub(focus);
    const ellipsoidDist = ellipsoidDistance(_scratchOffset, horizonRadii);

    if (traverse > 0.5 && wasBeyondInner && ellipsoidDist <= innerFlipDist) {
      state.orbitSign = state.orbitSign === 1 ? -1 : 1;
      wasBeyondInner = false;
    }
    if (ellipsoidDist > innerFlipDist + 0.06) wasBeyondInner = true;

    if (state.elevationPass === 'side') {
      vibeGravitySteerDirection(
        position,
        focus,
        horizonRadii,
        pathTraverse,
        state.orbitSign,
        _scratchDesired,
      );
    } else {
      _scratchOffset.copy(position).sub(focus);
      const horizontalLength = Math.hypot(_scratchOffset.x, _scratchOffset.z);
      if (horizontalLength > 1e-6) {
        _scratchDesired
          .set(-_scratchOffset.z, 0, _scratchOffset.x)
          .normalize()
          .multiplyScalar(state.orbitSign);
      } else {
        _scratchDesired.set(state.orbitSign, 0, 0);
      }
    }

    const currentPotential = vibeCoasterPotential(
      position,
      focus,
      horizonRadii,
    );
    const potentialDrop = previousPotential - currentPotential;
    previousPotential = currentPotential;

    const turnRate = THREE.MathUtils.lerp(2.6, 10.5, traverse);
    const steerBlend = 1 - Math.exp(-turnRate * step);
    const currentSpeed = Math.max(velocity.length(), flightSpeed * 0.4);
    _scratchTangent.copy(_scratchDesired);

    applyElevationPassSteering(
      position,
      focus,
      horizonRadii,
      horizonLimit,
      state.elevationPass,
      flightSpeed,
      step,
      velocity,
    );

    if (
      state.elevationPass === 'side' &&
      traverse > 0.55 &&
      ellipsoidDist > 0.72
    ) {
      _scratchToCenter.copy(focus).sub(position);
      const centerDistance = _scratchToCenter.length();
      if (centerDistance > 1e-8) {
        const radialBoost = strength * gravityStrength * currentSpeed * step;
        velocity.addScaledVector(
          _scratchToCenter,
          radialBoost / centerDistance,
        );
      }
    }

    if (
      state.elevationPass === 'side' &&
      traverse > 0.35 &&
      ellipsoidDist < 0.62
    ) {
      _scratchRadial.copy(position).sub(focus);
      if (_scratchRadial.lengthSq() > 1e-8) {
        _scratchRadial.normalize();
        const shellRecovery =
          strength * currentSpeed * step * (0.62 - ellipsoidDist) * 0.85;
        velocity.addScaledVector(_scratchRadial, shellRecovery);
      }
    }

    applyVibeCoasterSpeed(
      velocity,
      _scratchTangent,
      flightSpeed,
      potentialDrop,
      steerBlend,
      step,
      pathLengthDelta,
    );

    position.addScaledVector(velocity, step);
    clampVibeGravityHorizon(
      focus,
      position,
      velocity,
      horizonRadii,
      horizonLimit,
    );
    elapsed += step;
  }

  outEnd.copy(position);
  state.velocity.copy(velocity);
  state.segmentPathLength = pathLengthDelta.value;
  state.segmentEndSpeed = Math.max(velocity.length(), flightSpeed * 0.35);
}

const _scratchRadial = new THREE.Vector3();
const _scratchOffset = new THREE.Vector3();
const _scratchNormal = new THREE.Vector3();
const _scratchTangent = new THREE.Vector3();
const _scratchDesired = new THREE.Vector3();
const _scratchPosition = new THREE.Vector3();
const _scratchVelocity = new THREE.Vector3();
const _scratchToCenter = new THREE.Vector3();
