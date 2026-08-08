import type { Metadata } from "next";
import LeadsInbox from "./LeadsInbox";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Leads</h1>
        <p className="mt-1 text-sm text-ink-2">
          Callers Esmi flagged for human follow-up — budget, timeline, or
          urgency. Mark one contacted once you&apos;ve reached out.
        </p>
      </div>
      <LeadsInbox />
    </main>
  );
}
