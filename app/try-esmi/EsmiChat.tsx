"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  slots?: string[];
  dateLabel?: string;
  streaming?: boolean;
  toolActive?: string | null;
};

type ChatEvent =
  | { type: "token"; content: string }
  | { type: "tool_start"; tool: string }
  | { type: "tool_end" }
  | { type: "done"; full_text: string; slots?: string[]; date_label?: string }
  | { type: "error"; message: string };

// ── Constants ─────────────────────────────────────────────────────────────────

const WELCOME_TEXT =
  "Hi there! I'm Esmi, your AI receptionist at Orchelix. I can book appointments, check availability, and answer any questions about our services. How can I help you today?";

const QUICK_REPLIES = [
  { label: "📅 Book an appointment", value: "Book an appointment" },
  { label: "🕐 Check availability",  value: "What's available this week?" },
  { label: "💰 Pricing",             value: "What are your pricing packages?" },
  { label: "📋 Services",            value: "What services do you offer?" },
];

const TOOL_LABELS: Record<string, string> = {
  list_available_slots:  "Checking calendar…",
  book_appointment:      "Booking appointment…",
  search_knowledge_base: "Looking it up…",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid(): string {
  return typeof crypto !== "undefined"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

function getOrCreateThreadId(): string {
  try {
    const stored = localStorage.getItem("esmi-thread-id");
    if (stored) return stored;
    const id = uid();
    localStorage.setItem("esmi-thread-id", id);
    return id;
  } catch {
    return uid();
  }
}

function parseSlot(slot: string): { start: string; end: string } {
  const parts = slot.split(/\s*[–\-]\s*/);
  return { start: parts[0]?.trim() ?? slot, end: parts[1]?.trim() ?? "" };
}

function welcomeMessage(): Message {
  return { id: uid(), role: "assistant", content: WELCOME_TEXT };
}

// ── Main component ────────────────────────────────────────────────────────────

export default function EsmiChat() {
  const [messages, setMessages] = useState<Message[]>(() => [welcomeMessage()]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setThreadId(getOrCreateThreadId());
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading || !threadId) return;

      const userMsg: Message = { id: uid(), role: "user", content: text.trim() };
      const assistantId = uid();
      const assistantMsg: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
        streaming: true,
        toolActive: null,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text.trim(), thread_id: threadId }),
        });

        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            let evt: ChatEvent;
            try {
              evt = JSON.parse(line.slice(6)) as ChatEvent;
            } catch {
              continue;
            }

            if (evt.type === "token") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + evt.content, toolActive: null }
                    : m
                )
              );
            } else if (evt.type === "tool_start") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, toolActive: evt.tool } : m
                )
              );
            } else if (evt.type === "tool_end") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, toolActive: null } : m
                )
              );
            } else if (evt.type === "done") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? {
                        ...m,
                        content: evt.full_text,
                        slots: evt.slots,
                        dateLabel: evt.date_label,
                        streaming: false,
                        toolActive: null,
                      }
                    : m
                )
              );
            } else if (evt.type === "error") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: evt.message, streaming: false, toolActive: null }
                    : m
                )
              );
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "Connection error — please try again.", streaming: false, toolActive: null }
              : m
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, threadId]
  );

  const resetConversation = useCallback(() => {
    const newThread = uid();
    try { localStorage.setItem("esmi-thread-id", newThread); } catch { /* ok */ }
    setThreadId(newThread);
    setMessages([{ ...welcomeMessage(), content: "Fresh start! I'm Esmi — how can I help you today?" }]);
    setInput("");
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const lastMsg = messages[messages.length - 1];
  const showQuickReplies =
    !loading &&
    messages.length === 1 &&
    lastMsg.role === "assistant";

  return (
    <div className="flex flex-col h-full bg-surface-2" style={{ fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-line flex-shrink-0">
        <div className="relative flex-shrink-0">
          <Image
            src="/esmi-logo.png"
            alt="Esmi"
            width={38}
            height={38}
            className="rounded-[10px] object-cover"
            style={{ width: 38, height: 38 }}
          />
          <span
            className="absolute bottom-[-1px] right-[-1px] w-[10px] h-[10px] rounded-full border-2 border-white bg-[#22C55E] block"
            style={{ animation: "pulse 2.2s ease infinite" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-ink leading-tight">Esmi</div>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-3">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0"
              style={{ animation: "pulse 2.2s ease infinite" }}
            />
            AI Receptionist · EN · ES
          </div>
        </div>
        <button
          type="button"
          onClick={resetConversation}
          className="flex items-center gap-1.5 text-[12px] font-medium text-ink-3 bg-transparent border border-line rounded-lg px-2.5 py-1.5 cursor-pointer transition-colors hover:text-ink hover:border-line-strong flex-shrink-0"
          title="New conversation"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
          </svg>
          New chat
        </button>
      </div>

      {/* ── Messages ────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-5 pb-3 flex flex-col gap-3"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onSlotSelect={sendMessage} />
        ))}

        {showQuickReplies && (
          <QuickReplies chips={QUICK_REPLIES} onSelect={sendMessage} />
        )}
      </div>

      {/* ── Input ───────────────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 px-4 py-3 bg-surface border-t border-line flex-shrink-0"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Esmi anything — availability, services, pricing…"
          rows={1}
          disabled={loading}
          className="flex-1 resize-none rounded-xl border border-line-strong bg-surface-2 px-3.5 py-[11px] text-sm text-ink leading-snug placeholder:text-ink-4 outline-none transition-colors focus:border-teal-500 focus:bg-surface disabled:cursor-not-allowed"
          style={{ maxHeight: 120, overflowY: "auto", fontFamily: "inherit" }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-[42px] h-[42px] rounded-xl border-none flex items-center justify-center flex-shrink-0 transition-colors"
          style={{
            background: loading || !input.trim() ? "var(--color-line)" : "var(--color-teal-500)",
            color: "#fff",
            cursor: loading || !input.trim() ? "default" : "pointer",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>
          </svg>
        </button>
      </form>
    </div>
  );
}

// ── MessageBubble ─────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  onSlotSelect,
}: {
  message: Message;
  onSlotSelect: (v: string) => void;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[72%] px-4 py-3 text-sm leading-relaxed text-white"
          style={{
            borderRadius: "18px 18px 4px 18px",
            background: "linear-gradient(135deg, #0A2540 0%, #0e3460 100%)",
            boxShadow: "0 2px 8px rgba(10,37,64,0.18)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // ── Assistant bubble ──────────────────────────────────────────────
  const isStreaming = message.streaming;
  const hasContent = message.content.length > 0;

  return (
    <div className="flex items-start gap-2.5">
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        <Image
          src="/esmi-logo.png"
          alt="Esmi"
          width={28}
          height={28}
          className="rounded-[8px] object-cover"
          style={{ width: 28, height: 28 }}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Typing dots — shown while streaming and no content yet */}
        {isStreaming && !hasContent && !message.toolActive && (
          <div
            className="inline-flex px-4 py-3 bg-surface border border-line rounded-[4px_18px_18px_18px]"
            style={{ boxShadow: "0 1px 3px rgba(10,37,64,0.05)" }}
          >
            <TypingDots />
          </div>
        )}

        {/* Tool status pill */}
        {message.toolActive && (
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 text-xs font-medium self-start">
            <Spinner />
            {TOOL_LABELS[message.toolActive] ?? "Working…"}
          </div>
        )}

        {/* Text content */}
        {hasContent && (
          <div
            className="px-4 py-3 text-sm leading-relaxed text-ink bg-surface border border-line rounded-[4px_18px_18px_18px]"
            style={{
              boxShadow: "0 1px 3px rgba(10,37,64,0.05)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {message.content}
            {isStreaming && (
              <span
                className="inline-block w-0.5 h-3.5 rounded-sm align-text-bottom ml-0.5 bg-teal-500"
                style={{ animation: "pulse 1s ease infinite" }}
              />
            )}
          </div>
        )}

        {/* Time slots */}
        {message.slots && message.slots.length > 0 && !isStreaming && (
          <SlotPicker
            dateLabel={message.dateLabel}
            slots={message.slots}
            onSelect={onSlotSelect}
          />
        )}
      </div>
    </div>
  );
}

// ── SlotPicker ────────────────────────────────────────────────────────────────

function SlotPicker({
  dateLabel,
  slots,
  onSelect,
}: {
  dateLabel?: string;
  slots: string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-2 uppercase tracking-wide">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
          <rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        {dateLabel ?? "Available slots"} — pick a time
      </div>
      <div className="flex flex-wrap gap-2">
        {slots.map((slot, i) => {
          const { start, end } = parseSlot(slot);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(slot)}
              className="flex flex-col items-center gap-0.5 px-3.5 py-2.5 rounded-xl border-[1.5px] border-teal-200 bg-surface text-ink text-[13px] font-semibold leading-tight cursor-pointer transition-all hover:border-teal-500 hover:bg-teal-50 hover:shadow-[0_4px_12px_rgba(20,184,166,0.15)] min-w-[76px]"
              style={{ fontFamily: "inherit" }}
            >
              <span>{start}</span>
              {end && <span className="text-[11px] font-normal text-ink-3">– {end}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── QuickReplies ──────────────────────────────────────────────────────────────

function QuickReplies({
  chips,
  onSelect,
}: {
  chips: { label: string; value: string }[];
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 pl-[38px]">
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          onClick={() => onSelect(chip.value)}
          className="px-3.5 py-2 rounded-full border-[1.5px] border-line-strong bg-surface text-ink-2 text-[13px] font-medium cursor-pointer transition-all hover:border-navy-600 hover:bg-navy-600 hover:text-white"
          style={{ fontFamily: "inherit" }}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

// ── Micro-components ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full bg-ink-4"
          style={{ animation: `pulse 1.2s ease ${i * 0.2}s infinite` }}
        />
      ))}
    </span>
  );
}

function Spinner() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: "esmi-spin 0.8s linear infinite" }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
