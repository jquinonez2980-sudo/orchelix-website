import type { Metadata } from "next";
import AnalyticsView from "./AnalyticsView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Analytics</h1>
        <p className="mt-1 text-sm text-ink-2">Trends in how Esmi is being called.</p>
      </div>
      <AnalyticsView />
    </main>
  );
}
