/* Screen-space reading lamp, without Three.js.
   The 3D path writes these fields via setLampFromWorld; LampPlates only reads. */

export const lampScreen = {
  x: 0.62,
  y: 0.42,
  live: 0,
};

export function dimLamp() {
  lampScreen.live = 0;
}
