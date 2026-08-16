"use client";

/* Client boundary so `dynamic(..., { ssr: false })` is legal in the App Router.
   Server Components cannot pass ssr:false to next/dynamic (Next.js 16). */

import dynamic from "next/dynamic";
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
  return <HeroProof locale={locale} playerOnly={playerOnly} hideLabel={hideLabel} />;
}
