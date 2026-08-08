import type { Metadata } from "next";
import Usage from "./Usage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Usage | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function UsagePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Usage</h1>
        <p className="mt-1 text-sm text-ink-2">
          Calls and voice minutes Esmi has handled this month.
        </p>
      </div>
      <Usage />
    </main>
  );
}
