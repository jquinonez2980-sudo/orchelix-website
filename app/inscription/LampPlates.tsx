"use client";

import { useEffect } from "react";
import { lampScreen } from "./lampScreenState";
import { inscription, subscribeInscription } from "./store";

function bindPlate(img: HTMLImageElement) {
  if (img.closest("[data-ins-lamp]")) return;
  const parent = img.parentElement;
  if (!parent) return;
  const wrap = document.createElement("span");
  wrap.dataset.insLamp = "";
  wrap.className = "ins-lamp-plate";
  const wash = document.createElement("span");
  wash.className = "ins-lamp-wash";
  wash.setAttribute("aria-hidden", "true");
  parent.insertBefore(wrap, img);
  wrap.append(img, wash);
}

function liftFor(rect: DOMRect, lampX: number, lampY: number, live: number) {
  if (live <= 0.01) return 0;
  const cx = Math.min(rect.right, Math.max(rect.left, lampX));
  const cy = Math.min(rect.bottom, Math.max(rect.top, lampY));
  const dx = lampX - cx;
  const dy = lampY - cy;
  const reach = Math.max(280, Math.max(rect.width, rect.height) * 0.95);
  const falloff = Math.exp(-((dx * dx + dy * dy) / (reach * reach)));
  return Math.min(1, falloff * live);
}

export default function LampPlates() {
  useEffect(() => {
    const root = document.querySelector("[data-inscription]");
    if (!root) return;

    let raf = 0;
    let loop = 0;
    let last = 0;

    const bindNew = () => {
      const images = root.querySelectorAll<HTMLImageElement>("img.lg-settle-media");
      for (const img of images) bindPlate(img);
    };

    const paint = (now: number) => {
      raf = 0;
      if (now - last < 66) return;
      last = now;
      if (document.hidden || inscription.mode !== "dark") return;

      bindNew();
      let lampX = lampScreen.x * window.innerWidth;
      let lampY = lampScreen.y * window.innerHeight;
      let live = lampScreen.live;
      if (live < 0.05) {
        live = 0.88;
        lampX = window.innerWidth * 0.62;
        lampY = window.innerHeight * 0.44;
      }

      const plates = root.querySelectorAll<HTMLElement>("[data-ins-lamp]");
      if (!plates.length) return;

      /* Read all layout, then write. Mixing them per plate is the forced reflow. */
      const reads: { plate: HTMLElement; img: HTMLImageElement; rect: DOMRect }[] = [];
      for (const plate of plates) {
        const img = plate.querySelector("img");
        if (!img) continue;
        reads.push({ plate, img, rect: img.getBoundingClientRect() });
      }

      const vh = window.innerHeight;
      for (const { plate, img, rect } of reads) {
        if (rect.bottom < -80 || rect.top > vh + 80) {
          plate.style.setProperty("--ins-lift", "0");
          continue;
        }
        const target = liftFor(rect, lampX, lampY, live);
        const prev = Number.parseFloat(plate.style.getPropertyValue("--ins-lift") || "0");
        const lift = target >= prev ? target : prev + (target - prev) * 0.06;
        const rawX = ((lampX - rect.left) / Math.max(1, rect.width)) * 100;
        const rawY = ((lampY - rect.top) / Math.max(1, rect.height)) * 100;
        plate.style.setProperty("--ins-lift", lift.toFixed(3));
        plate.style.setProperty("--ins-lx", `${Math.min(108, Math.max(-8, rawX)).toFixed(1)}%`);
        plate.style.setProperty("--ins-ly", `${Math.min(108, Math.max(-8, rawY)).toFixed(1)}%`);
        img.style.filter = `brightness(${(1 + lift * 0.16).toFixed(3)})`;
      }
    };

    const request = () => {
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    const shouldLoop = () =>
      inscription.ready && inscription.mode === "dark" && !document.hidden;

    const pump = (now: number) => {
      paint(now);
      loop = shouldLoop() ? window.requestAnimationFrame(pump) : 0;
    };

    const syncLoop = () => {
      if (shouldLoop()) {
        if (!loop) loop = window.requestAnimationFrame(pump);
      } else if (loop) {
        window.cancelAnimationFrame(loop);
        loop = 0;
        const plates = root.querySelectorAll<HTMLElement>("[data-ins-lamp]");
        for (const plate of plates) {
          plate.style.setProperty("--ins-lift", "0");
          const img = plate.querySelector("img");
          if (img) img.style.filter = "";
        }
      } else {
        request();
      }
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    document.addEventListener("visibilitychange", syncLoop);
    const unsub = subscribeInscription(syncLoop);
    bindNew();
    syncLoop();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (loop) window.cancelAnimationFrame(loop);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      document.removeEventListener("visibilitychange", syncLoop);
      unsub();
    };
  }, []);

  return null;
}
