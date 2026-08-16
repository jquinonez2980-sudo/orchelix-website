"use client";

import SettingsPanels from "./SettingsPanels";
import PageTitle, { PageLede } from "../PageTitle";
import { useDashI18n } from "../i18n";

export default function SettingsPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>
          {t.pages.settingsTitle}
        </PageTitle>
        <PageLede>{t.pages.settingsLede}</PageLede>
      </div>
      <SettingsPanels />
    </main>
  );
}
