"use client";

import KnowledgeManager from "./KnowledgeManager";
import { useDashI18n } from "../i18n";

export default function KnowledgePage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
          {t.pages.knowledgeTitle}
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-2">
          {t.pages.knowledgeLede}
        </p>
      </div>
      <KnowledgeManager />
    </main>
  );
}
