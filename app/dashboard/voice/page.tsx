import type { Metadata } from "next";
import VoiceStudio from "./VoiceStudio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Voice | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default async function VoicePage({
  searchParams,
}: {
  searchParams: Promise<{ onboarded?: string }>;
}) {
  const { onboarded } = await searchParams;

  return (
    /* Wider than the max-w-3xl sibling dashboard pages: this one is a
       two-column workspace (transport + editor + voice rail), not a report.
       Header typography and page padding stay identical to the rest of the
       shell so it still reads as the same product. */
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-4">
          Voice Studio
        </span>
        <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
          Voice &amp; Personality
        </h1>
        <p className="mt-1 text-sm text-ink-2">
          Choose how Esmi sounds, then preview before you go live.
        </p>
      </div>
      {onboarded === "1" && (
        <div className="mb-5 rounded-lg border border-teal-200 bg-teal-50/60 px-4 py-3 text-sm text-teal-900">
          You&apos;ve heard how Esmi sounds — nice work. Keep tweaking here anytime before you
          go live.
        </div>
      )}
      <VoiceStudio />
    </main>
  );
}
