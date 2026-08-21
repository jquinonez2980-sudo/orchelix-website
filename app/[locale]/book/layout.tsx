import type { Metadata } from "next";

/* Fallback metadata only — see the note in ../pricing/layout.tsx. The
   hardcoded `canonical: "/book"` that used to sit here was locale-blind in a
   layout serving both locales; page.tsx emits the locale-aware one. */
export const metadata: Metadata = {
  title: "Book a pilot",
  description:
    "Thirty minutes with a senior Orchelix consultant. Bring one workflow; leave with a one-page proposal — scope, timeline, and the scorecard we would both grade success against.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
