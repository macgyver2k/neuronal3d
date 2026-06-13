import * as THREE from 'three';

const EDGE_LINE_VERTEX_SHADER = /* glsl */ `
#include <common>

attribute vec3 instanceStart;
attribute vec3 instanceEnd;
attribute vec3 instanceColor;
attribute float instanceAlpha;

uniform float opacityMul;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 localPosition = mix(instanceStart, instanceEnd, position.x);
  vColor = instanceColor;
  vAlpha = instanceAlpha * opacityMul;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(localPosition, 1.0);
}
`;

const EDGE_LINE_FRAGMENT_SHADER = /* glsl */ `
#include <common>

varying vec3 vColor;
varying float vAlpha;

void main() {
  if (vAlpha < 0.001) discard;
  gl_FragColor = vec4(vColor, vAlpha);
}
`;

const scratchBoundsBox = new THREE.Box3();
const scratchEndBoundsBox = new THREE.Box3();

export type NetworkEdgeLineLayer = {
  mesh: THREE.LineSegments;
  instanceStart: THREE.InstancedBufferAttribute;
  instanceEnd: THREE.InstancedBufferAttribute;
  instanceColor: THREE.InstancedBufferAttribute;
  instanceAlpha: THREE.InstancedBufferAttribute;
  material: THREE.ShaderMaterial;
};

export function createNetworkEdgeLineLayer(
  segmentCount: number,
  baseOpacity: number,
): NetworkEdgeLineLayer | null {
  if (segmentCount <= 0) return null;

  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3),
  );
  geometry.instanceCount = segmentCount;

  const instanceStart = new THREE.InstancedBufferAttribute(
    new Float32Array(segmentCount * 3),
    3,
  );
  instanceStart.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('instanceStart', instanceStart);

  const instanceEnd = new THREE.InstancedBufferAttribute(
    new Float32Array(segmentCount * 3),
    3,
  );
  instanceEnd.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('instanceEnd', instanceEnd);

  const instanceColor = new THREE.InstancedBufferAttribute(
    new Float32Array(segmentCount * 3),
    3,
  );
  instanceColor.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('instanceColor', instanceColor);

  const instanceAlpha = new THREE.InstancedBufferAttribute(
    new Float32Array(segmentCount),
    1,
  );
  instanceAlpha.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('instanceAlpha', instanceAlpha);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: true,
    toneMapped: false,
    uniforms: {
      opacityMul: { value: baseOpacity },
    },
    vertexShader: EDGE_LINE_VERTEX_SHADER,
    fragmentShader: EDGE_LINE_FRAGMENT_SHADER,
  });

  const mesh = new THREE.LineSegments(geometry, material);
  return {
    mesh,
    instanceStart,
    instanceEnd,
    instanceColor,
    instanceAlpha,
    material,
  };
}

export function updateNetworkEdgeLineBounds(layer: NetworkEdgeLineLayer): void {
  const geometry = layer.mesh.geometry;
  scratchBoundsBox.setFromBufferAttribute(layer.instanceStart);
  scratchEndBoundsBox.setFromBufferAttribute(layer.instanceEnd);
  scratchBoundsBox.union(scratchEndBoundsBox);
  geometry.boundingBox = scratchBoundsBox.clone();
  if (!geometry.boundingSphere) {
    geometry.boundingSphere = new THREE.Sphere();
  }
  scratchBoundsBox.getBoundingSphere(geometry.boundingSphere);
}

export function disposeNetworkEdgeLineLayer(layer: NetworkEdgeLineLayer): void {
  layer.mesh.geometry.dispose();
  layer.material.dispose();
}

export function fillNetworkEdgeLineDefaults(layer: NetworkEdgeLineLayer): void {
  const colorArray = layer.instanceColor.array as Float32Array;
  const alphaArray = layer.instanceAlpha.array as Float32Array;
  const segmentCount = layer.instanceAlpha.count;
  for (let edgeIndex = 0; edgeIndex < segmentCount; edgeIndex++) {
    const colorOffset = edgeIndex * 3;
    colorArray[colorOffset + 0] = 0.35;
    colorArray[colorOffset + 1] = 0.35;
    colorArray[colorOffset + 2] = 0.38;
    alphaArray[edgeIndex] = 1;
  }
  layer.instanceColor.needsUpdate = true;
  layer.instanceAlpha.needsUpdate = true;
}
