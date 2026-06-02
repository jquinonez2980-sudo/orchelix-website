import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for Orchelix AI agents and AI receptionist services. Start with Esmi or the full Firm OS — flexible monthly managed service, no long-term contracts.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
