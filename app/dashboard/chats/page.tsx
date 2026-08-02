import type { Metadata } from "next";
import ChatLog from "./ChatLog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chats | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function ChatsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Chats</h1>
        <p className="mt-1 text-sm text-ink-2">
          Every web chat conversation Esmi has had with a visitor — with
          outcome and message count.
        </p>
      </div>
      <ChatLog />
    </main>
  );
}
