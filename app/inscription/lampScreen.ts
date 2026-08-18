import * as THREE from "three";
import { lampScreen } from "./lampScreenState";

export { lampScreen, dimLamp } from "./lampScreenState";

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
