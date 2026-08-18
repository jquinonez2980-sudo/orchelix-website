"use client";

/* Client boundary so `dynamic(..., { ssr: false })` is legal in the App Router.
   Server Components cannot pass ssr:false to next/dynamic (Next.js 16). */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/i18n/config";

const HeroProof = dynamic(() => import("./HeroProof"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-10 max-w-[34rem]"
      style={{ minHeight: 120 }}
      aria-hidden
    />
  ),
});

export default function HeroProofLazy({
  locale,
  playerOnly = false,
  hideLabel = false,
}: {
  locale?: Locale;
  playerOnly?: boolean;
  hideLabel?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setNear(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {near ? (
        <HeroProof locale={locale} playerOnly={playerOnly} hideLabel={hideLabel} />
      ) : (
        <div className="mt-10 max-w-[34rem]" style={{ minHeight: 120 }} aria-hidden />
      )}
    </div>
  );
}
