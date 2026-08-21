import type { Metadata } from "next";

/* Fallback metadata only.

   `page.tsx` exports `generateMetadata` and Next merges layout metadata with
   the page's, page winning. This file used to also declare
   `alternates: { canonical: "/pricing" }` — a hardcoded English path, in a
   layout that serves BOTH locales. It happened to be harmless because the
   page overrides it, but it was one deleted line in page.tsx away from
   telling Google that /es/pricing is a duplicate of /pricing and should not
   be indexed. A locale-blind canonical does not belong in a [locale] layout,
   so it is gone; the locale-aware one in page.tsx is the only one now. */
export const metadata: Metadata = {
  title: "Pricing | Esmi by Orchelix",
  description:
    "Esmi AI receptionist plans from $299/mo — voice and web chat, live calendar booking, and a full call/appointment/leads dashboard. Try a 14-day pilot for $149.",
  robots: { index: true, follow: true },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
