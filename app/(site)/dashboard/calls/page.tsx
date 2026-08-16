"use client";

import CallLog from "./CallLog";
import PageTitle, { PageLede } from "../PageTitle";
import { useDashI18n } from "../i18n";

export default function CallsPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>
          {t.calls.title}
        </PageTitle>
        <PageLede>{t.calls.lede}</PageLede>
      </div>
      <CallLog />
    </main>
  );
}
