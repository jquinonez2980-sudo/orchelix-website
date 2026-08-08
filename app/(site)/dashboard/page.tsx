import type { Metadata } from "next";
import Overview from "./Overview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Overview | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function OverviewPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Overview</h1>
        <p className="mt-1 text-sm text-ink-2">
          What Esmi handled for your business this week.
        </p>
      </div>
      <Overview />
    </main>
  );
}
