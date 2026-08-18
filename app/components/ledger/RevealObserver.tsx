"use client";

import { useEffect } from "react";

/* The Motion Waits Rule, implemented once for the whole site.

   One IntersectionObserver watches every `[data-lg-reveal]` block. The first
   time a block intersects it gains `data-lg-in="true"` and is unobserved, so
   nothing animates before it is looked at and nothing animates twice.

   This is the only scroll-driven mechanism on the site. Pages do not bring
   their own — a per-page observer is how a codebase ends up with five
   slightly different reveal thresholds.

   ── Why anything already on screen is left alone ──

   The observer can only run after hydration, which is after the first paint.
   A block that was already visible has therefore already been seen in its
   resting state; marking it would animate it *backwards* — a settled row
   would jump to translateY(6px) and land again. So blocks above the fold at
   mount are never observed and never marked, which leaves them in the
   resting state that is also the final state.

   The consequence is a rule worth stating plainly: content already on screen
   at load does not animate; content scrolled into view does. The call
   register is the one deliberate exception — its settle is the authored
   first-viewport moment and runs on load, which is why it is not wired
   through this observer at all.

   Reduced motion is handled entirely in CSS — the attribute is still set,
   the keyframes are simply not applied. Doing it here as well would mean the
   observer and the stylesheet could disagree about what is suppressed. */
export default function RevealObserver() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>("[data-lg-reveal]");
    if (!blocks.length) return;

    /* Engines without IntersectionObserver keep the resting state, which is
       already the final state. There is nothing to fall back to. */
    if (typeof IntersectionObserver === "undefined") return;

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!seen.has(entry.target)) {
            seen.add(entry.target);
            /* First callback is the mount snapshot. Already on screen stays
               in the resting state — marking it would animate backwards. */
            if (entry.isIntersecting) {
              io.unobserve(entry.target);
              continue;
            }
          }
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-lg-in", "true");
          io.unobserve(entry.target);
        }
      },
      /* The trigger line sits 12% up from the bottom edge so a block starts
         settling as it is being read into, not the instant its first pixel
         clears the fold. The threshold is low because a section taller than
         the viewport can never reach a high one. */
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    blocks.forEach((block) => io.observe(block));

    return () => io.disconnect();
  }, []);

  return null;
}
