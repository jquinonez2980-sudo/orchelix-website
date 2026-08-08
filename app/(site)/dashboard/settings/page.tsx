import type { Metadata } from "next";
import SettingsPanels from "./SettingsPanels";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Settings | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-2">
          Business profile, hours, services, and greeting. Changes go live for
          Esmi within about a minute of saving.
        </p>
      </div>
      <SettingsPanels />
    </main>
  );
}
