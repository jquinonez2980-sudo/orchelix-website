"use client";

import LeadsInbox from "./LeadsInbox";
import PageTitle, { PageLede } from "../PageTitle";
import { useDashI18n } from "../i18n";

export default function LeadsPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>
          {t.pages.leadsTitle}
        </PageTitle>
        <PageLede>{t.pages.leadsLede}</PageLede>
      </div>
      <LeadsInbox />
    </main>
  );
}
