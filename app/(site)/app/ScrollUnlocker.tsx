"use client";
import { useEffect } from "react";

/**
 * Clerk's modal SDK sets overflow:hidden on both <html> and <body> when the
 * sign-in modal opens. It doesn't always clean up after itself once the modal
 * closes (especially when the user completes sign-in and the modal unmounts).
 *
 * This component runs a MutationObserver on both elements and removes any
 * overflow:hidden inline style that appears on them while no Clerk modal is
 * present in the DOM — so the rest of the page can always scroll.
 */
export default function ScrollUnlocker() {
  useEffect(() => {
    function isClerkModalOpen(): boolean {
      return !!document.querySelector(
        '[data-clerk-modal-root], .cl-modalBackdrop, [class*="cl-modal"]',
      );
    }

    function unlock() {
      if (isClerkModalOpen()) return; // let Clerk keep its lock while modal is open
      const html = document.documentElement;
      const body = document.body;
      if (html.style.overflow === "hidden") html.style.removeProperty("overflow");
      if (body.style.overflow === "hidden") body.style.removeProperty("overflow");
      if (html.style.overflowY === "hidden") html.style.removeProperty("overflow-y");
      if (body.style.overflowY === "hidden") body.style.removeProperty("overflow-y");
    }

    // Unlock immediately on mount (catches stale state from a previous sign-in)
    unlock();

    // Watch for Clerk removing its modal (the style stays behind)
    const obs = new MutationObserver(unlock);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    obs.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    obs.observe(document.body, { childList: true, subtree: false }); // modal added/removed

    return () => obs.disconnect();
  }, []);

  return null;
}
