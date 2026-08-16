import type { Metadata } from "next";
import PageTitle, { PageLede } from "../PageTitle";
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
        <PageTitle>Billing</PageTitle>
        <PageLede>
          Your plan, this month&apos;s usage, and how to reach us about billing.
        </PageLede>
      </div>
      <Billing />
    </main>
  );
}
