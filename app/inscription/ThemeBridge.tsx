"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { inscription, setInscription, subscribeInscription } from "./store";
import {
  sampleScroll,
  cameraForProgress,
  bindResizeMeasure,
  dollyForAspect,
  isNarrowView,
} from "./ScrollDirector";
import { dropQualityStep } from "./QualityGovernor";
import { isRelighting, snapToMode, tickRelight } from "./relight";
import { updateWriting, writing } from "./writing/WritingDirector";

const SLOW_WINDOW = 30;
const SLOW_MS = 22;

export default function ThemeBridge() {
  const invalidate = useThree((s) => s.invalidate);
  const setFrameloop = useThree((s) => s.setFrameloop);
  const camera = useThree((s) => s.camera);
  const slow = useRef({ frames: 0, hits: 0 });
  const goal = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3(0.3, 0.08, 0));
  const lookGoal = useRef(new THREE.Vector3());
  const pending = useRef(0);
  const mode = useSyncExternalStore(
    subscribeInscription,
    () => inscription.mode,
    () => "dark" as const,
  );

  const requestFrame = (fps: number) => {
    if (pending.current || document.hidden) return;
    const wait = Math.max(0, 1000 / Math.max(12, fps));
    pending.current = window.setTimeout(() => {
      pending.current = 0;
      if (!document.hidden) invalidate();
    }, wait);
  };

  useEffect(() => {
    snapToMode(inscription.mode);
    setFrameloop("demand");
    invalidate();
  }, [mode, setFrameloop, invalidate]);

  useEffect(() => {
    const unbind = bindResizeMeasure();
    const onVis = () => {
      const hidden = document.hidden;
      setInscription("hidden", hidden);
      if (hidden) {
        setFrameloop("never");
        if (pending.current) {
          window.clearTimeout(pending.current);
          pending.current = 0;
        }
        return;
      }
      setFrameloop("demand");
      invalidate();
    };
    const onScroll = () => {
      if (!document.hidden) invalidate();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (document.visibilityState === "visible") {
      setInscription("hidden", false);
      setFrameloop("demand");
      invalidate();
    }
    return () => {
      unbind();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      if (pending.current) window.clearTimeout(pending.current);
    };
  }, [invalidate, setFrameloop]);

  useFrame((state, dt) => {
    if (document.hidden) return;

    tickRelight(dt);
    sampleScroll();
    updateWriting(dt);
    const cam = cameraForProgress(inscription.progress);
    const strike = inscription.beat === 4 || writing.stamp > 0.02;
    const impact = writing.impact > 0.2;
    const k = inscription.quality.reducedMotion || isNarrowView()
      ? 1
      : 1 - Math.exp(-dt * (impact ? 30 : strike ? 16 : 4.6));
    const aspect = "aspect" in state.camera ? (state.camera as { aspect: number }).aspect : 1;
    const dolly = dollyForAspect(aspect);
    goal.current.set(
      cam.target[0] + (cam.position[0] - cam.target[0]) * dolly,
      cam.target[1] + (cam.position[1] - cam.target[1]) * dolly,
      cam.target[2] + (cam.position[2] - cam.target[2]) * dolly,
    );
    lookGoal.current.set(cam.target[0], cam.target[1], cam.target[2]);
    look.current.lerp(lookGoal.current, k);
    camera.position.lerp(goal.current, k);
    state.camera.lookAt(look.current);
    if ("fov" in camera) {
      const persp = camera as typeof camera & { fov: number; updateProjectionMatrix: () => void };
      const next = persp.fov + (cam.fov - persp.fov) * k;
      if (Math.abs(next - persp.fov) > 0.01) {
        persp.fov = next;
        persp.updateProjectionMatrix();
      }
    }

    if (inscription.quality.tier !== "off") {
      const ms = dt * 1000;
      if (ms > SLOW_MS) slow.current.hits += 1;
      else slow.current.hits = Math.max(0, slow.current.hits - 1);
      slow.current.frames += 1;
      if (slow.current.frames > SLOW_WINDOW && slow.current.hits > 18) {
        dropQualityStep();
        slow.current.frames = 0;
        slow.current.hits = 0;
      }
    }

    const moving =
      camera.position.distanceToSquared(goal.current) > 4e-6 ||
      (!inscription.quality.reducedMotion &&
        ((writing.rows[0]?.write ?? 1) < 0.99 ||
          (writing.stamp > 0.01 && writing.stamp < 0.99) ||
          writing.impact > 0.01)) ||
      isRelighting();

    if (moving) requestFrame(inscription.quality.fps || 30);
  });

  return null;
}
