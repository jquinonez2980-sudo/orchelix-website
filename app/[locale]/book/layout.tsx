import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a pilot",
  description:
    "Thirty minutes with a senior Orchelix consultant. Bring one workflow; leave with a one-page proposal — scope, timeline, and the scorecard we would both grade success against.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
