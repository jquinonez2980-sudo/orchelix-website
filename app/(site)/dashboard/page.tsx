"use client";

import Overview from "./Overview";
import { useDashI18n } from "./i18n";

export default function OverviewPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p
          className="lg-fig text-xs uppercase tracking-wide text-ink-3"
          style={{ letterSpacing: "0.12em" }}
        >
          {t.overview.kicker}
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
          {t.overview.title}
        </h1>
        <p className="mt-1 max-w-xl text-sm leading-6 text-ink-2">{t.overview.lede}</p>
      </div>
      <Overview />
    </main>
  );
}
