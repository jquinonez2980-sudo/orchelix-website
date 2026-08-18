"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false },
);

/* Analytics is not LCP. Keep it off the first-load JS budget. */
export default function DeferredAnalytics() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;
    const start = () => setOn(true);
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(start, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 2500);
    return () => window.clearTimeout(id);
  }, []);

  if (!on) return null;
  return <Analytics />;
}
