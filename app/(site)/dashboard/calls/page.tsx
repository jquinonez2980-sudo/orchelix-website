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
        <p
          className="lg-fig text-xs uppercase tracking-wide text-ink-3"
          style={{ letterSpacing: "0.12em" }}
        >
          Work · Call register
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
          Calls
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-2">
          Every phone call Esmi answered — disposition, summary, transcript, and
          recording. Open a row to review and coach.
        </p>
      </div>
      <CallLog />
    </main>
  );
}
