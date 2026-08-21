"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false },
);

/* Client-only, but mounted on the first effect after hydration.

   This used to wait for requestIdleCallback (4s timeout, 2.5s setTimeout
   fallback) to keep analytics off the first-load JS budget. That traded
   away more than it bought: Vercel records the page view when this
   component mounts, so every visitor who left inside ~2.5s was never
   counted at all. Traffic read low and bounce rate read flattering,
   because the fastest bounces were invisible.

   The script is ~1KB and loads async, so it is not the LCP risk the
   delay was defending against. ssr:false already keeps it out of the
   server bundle, which is the part that actually mattered. */
export default function DeferredAnalytics() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;
    setOn(true);
  }, []);

  if (!on) return null;
  return <Analytics />;
}
