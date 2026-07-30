import type { Metadata } from "next";
import Billing from "./Billing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Billing | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function BillingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Billing</h1>
        <p className="mt-1 text-sm text-ink-2">
          Your plan, this month&apos;s usage, and how to reach us about billing.
        </p>
      </div>
      <Billing />
    </main>
  );
}
