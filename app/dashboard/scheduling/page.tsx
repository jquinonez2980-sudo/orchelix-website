import type { Metadata } from "next";
import SchedulingStatus from "./SchedulingStatus";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Scheduling | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function SchedulingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Scheduling</h1>
        <p className="mt-1 text-sm text-ink-2">
          Calendar connection and the booking hours Esmi follows.
        </p>
      </div>
      <SchedulingStatus />
    </main>
  );
}
