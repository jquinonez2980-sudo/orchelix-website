import type { Metadata } from "next";
import CallLog from "./CallLog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Calls | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function CallsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Calls</h1>
        <p className="mt-1 text-sm text-ink-2">
          Every phone call Esmi has answered for your business — with outcome,
          summary, transcript, and recording.
        </p>
      </div>
      <CallLog />
    </main>
  );
}
