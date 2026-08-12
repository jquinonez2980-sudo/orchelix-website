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
        <p
          className="lg-fig text-xs uppercase tracking-wide text-ink-3"
          style={{ letterSpacing: "0.12em" }}
        >
          Operator console
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
          Night register
        </h1>
        <p className="mt-1 max-w-xl text-sm leading-6 text-ink-2">
          What Esmi handled while you were busy — after-hours first, then the
          full activity register. Open any row to listen, read, and coach.
        </p>
      </div>
      <Overview />
    </main>
  );
}
