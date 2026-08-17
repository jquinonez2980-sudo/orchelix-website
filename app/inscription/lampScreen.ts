import * as THREE from "three";

/* Screen-space reading lamp. The 3D desk light / filament head is
   projected here so homepage plates can brighten as it passes. */

export const lampScreen = {
  x: 0.62,
  y: 0.42,
  live: 0,
};

const ndc = new THREE.Vector3();

export function setLampFromWorld(camera: THREE.Camera, world: THREE.Vector3, live: number) {
  ndc.copy(world).project(camera);
  if (ndc.z < -1 || ndc.z > 1) {
    lampScreen.live = 0;
    return;
  }
  lampScreen.x = ndc.x * 0.5 + 0.5;
  lampScreen.y = -ndc.y * 0.5 + 0.5;
  lampScreen.live = live;
}

export function dimLamp() {
  lampScreen.live = 0;
}
