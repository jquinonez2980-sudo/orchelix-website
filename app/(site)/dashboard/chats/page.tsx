"use client";

import ChatLog from "./ChatLog";
import PageTitle, { PageLede } from "../PageTitle";
import { useDashI18n } from "../i18n";

export default function ChatsPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>
          {t.pages.chatsTitle}
        </PageTitle>
        <PageLede>{t.pages.chatsLede}</PageLede>
      </div>
      <ChatLog />
    </main>
  );
}
