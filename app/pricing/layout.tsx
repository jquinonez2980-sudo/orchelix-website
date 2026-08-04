import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Esmi by Orchelix",
  description:
    "Esmi AI receptionist plans from $299/mo — voice and web chat, live calendar booking, and a full call/appointment/leads dashboard. Try a 7-day pilot for $149.",
  alternates: { canonical: "/pricing" },
  robots: { index: true, follow: true },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
