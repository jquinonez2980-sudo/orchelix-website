"use client";

import Overview from "./Overview";
import PageTitle, { PageLede } from "./PageTitle";
import { useDashI18n } from "./i18n";

export default function OverviewPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>
          {t.overview.title}
        </PageTitle>
        <PageLede>{t.overview.lede}</PageLede>
      </div>
      <Overview />
    </main>
  );
}
