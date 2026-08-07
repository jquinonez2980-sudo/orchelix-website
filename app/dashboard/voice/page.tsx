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
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Voice &amp; Personality</h1>
        <p className="mt-1 text-sm text-ink-2">
          Choose how Esmi sounds, then preview before you go live.
        </p>
      </div>
      {onboarded === "1" && (
        <div className="mb-6 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          You&apos;ve heard how Esmi sounds — nice work. Keep tweaking here anytime before you
          go live.
        </div>
      )}
      <VoiceStudio />
    </main>
  );
}
