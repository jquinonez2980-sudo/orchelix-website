"use client";

import CallLog from "./CallLog";
import { useDashI18n } from "../i18n";

export default function CallsPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-[1.85rem] font-bold uppercase leading-[1.02] tracking-[-0.022em] text-ink">
          {t.calls.title}
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-2">{t.calls.lede}</p>
      </div>
      <CallLog />
    </main>
  );
}
