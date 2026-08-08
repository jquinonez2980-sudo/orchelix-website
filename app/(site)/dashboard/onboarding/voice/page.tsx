import type { Metadata } from "next";
import VoiceOnboardingStep from "./VoiceOnboardingStep";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Set up your voice | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function VoiceOnboardingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <VoiceOnboardingStep />
    </main>
  );
}
