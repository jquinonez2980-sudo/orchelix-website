"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { inscription, setInscription } from "./store";

/* A failed WebGL init must not take the page with it. Drop to the poster. */

export default class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[inscription] scene failed, using poster.", error, info.componentStack);
    setInscription("quality", {
      ...inscription.quality,
      tier: "off",
      transmission: false,
      env: false,
      fps: 0,
    });
    setInscription("ready", false);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
