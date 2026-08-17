"use client";

import { useEffect } from "react";
import { inscription } from "./store";
import { lampScreen } from "./lampScreen";

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
    let raf = 0;
    const tick = () => {
      const root = document.querySelector("[data-inscription]");
      if (root) {
        const images = root.querySelectorAll<HTMLImageElement>("img.lg-settle-media");
        for (const img of images) bindPlate(img);

        const night = inscription.mode === "dark";
        let lampX = lampScreen.x * window.innerWidth;
        let lampY = lampScreen.y * window.innerHeight;
        let live = night ? lampScreen.live : 0;
        if (night && live < 0.05) {
          live = 0.88;
          lampX = window.innerWidth * 0.62;
          lampY = window.innerHeight * 0.44;
        }
        const plates = root.querySelectorAll<HTMLElement>("[data-ins-lamp]");

        for (const plate of plates) {
          const img = plate.querySelector("img");
          if (!img) continue;
          const rect = img.getBoundingClientRect();
          if (rect.bottom < -80 || rect.top > window.innerHeight + 80) {
            plate.style.setProperty("--ins-lift", "0");
            continue;
          }
          const target = liftFor(rect, lampX, lampY, live);
          const prev = Number.parseFloat(plate.style.getPropertyValue("--ins-lift") || "0");
          const lift = target >= prev ? target : prev + (target - prev) * 0.06;
          const rawX = ((lampX - rect.left) / Math.max(1, rect.width)) * 100;
          const rawY = ((lampY - rect.top) / Math.max(1, rect.height)) * 100;
          const lx = Math.min(108, Math.max(-8, rawX));
          const ly = Math.min(108, Math.max(-8, rawY));
          plate.style.setProperty("--ins-lift", lift.toFixed(3));
          plate.style.setProperty("--ins-lx", `${lx.toFixed(1)}%`);
          plate.style.setProperty("--ins-ly", `${ly.toFixed(1)}%`);
          if (night) {
            img.style.filter = `brightness(${(1 + lift * 0.16).toFixed(3)})`;
          } else {
            img.style.filter = "";
          }
        }
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return null;
}
