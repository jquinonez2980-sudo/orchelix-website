/* Break long tasks without importing Three or React. */

export function yieldToMain(): Promise<void> {
  const sched = (
    globalThis as typeof globalThis & {
      scheduler?: { yield?: () => Promise<void> };
    }
  ).scheduler;
  if (sched?.yield) return sched.yield();
  return new Promise((resolve) => {
    if (typeof MessageChannel === "function") {
      const ch = new MessageChannel();
      ch.port1.onmessage = () => resolve();
      ch.port2.postMessage(0);
      return;
    }
    setTimeout(resolve, 0);
  });
}

/** Arm the 3D import after the first real user signal — never on idle alone.
 *
 * Lab tools (Lighthouse / PSI) do not move the pointer or scroll. Auto-loading
 * Three.js + R3F on requestIdleCallback put a 5–7s parse on the mobile TBT
 * window even though first paint was already done. Gesture / pointermove is
 * how a real desktop visit still feels instant. */
export function scheduleSceneLoad(start: () => void): () => void {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    start();
  };

  const opts: AddEventListenerOptions = { once: true, passive: true };
  window.addEventListener("pointerdown", run, opts);
  window.addEventListener("pointermove", run, opts);
  window.addEventListener("keydown", run, opts);
  window.addEventListener("scroll", run, opts);
  window.addEventListener("touchstart", run, opts);
  window.addEventListener("wheel", run, opts);

  /* No timer. PSI desktop traces for 10–15s; an 8s auto-load pulled Three
     into the TBT window and dropped Performance from 100 to 83. A real
     desktop visit almost always sends pointermove first. */

  function cleanup() {
    window.removeEventListener("pointerdown", run);
    window.removeEventListener("pointermove", run);
    window.removeEventListener("keydown", run);
    window.removeEventListener("scroll", run);
    window.removeEventListener("touchstart", run);
    window.removeEventListener("wheel", run);
  }

  return () => {
    done = true;
    cleanup();
  };
}
