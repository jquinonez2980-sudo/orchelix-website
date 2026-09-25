"use client";

/* Client boundary so `dynamic(..., { ssr: false })` is legal in the App Router.
   Server Components cannot pass ssr:false to next/dynamic (Next.js 16).
   The placeholder reserves the stage's height so nothing shifts when it
   mounts. */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/i18n/config";

const Placeholder = () => <div className="evs-placeholder" aria-hidden />;

const HeroProof = dynamic(() => import("./HeroProof"), {
  ssr: false,
  loading: Placeholder,
});

export default function HeroProofLazy({ locale }: { locale?: Locale }) {
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
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{near ? <HeroProof locale={locale} /> : <Placeholder />}</div>;
}
