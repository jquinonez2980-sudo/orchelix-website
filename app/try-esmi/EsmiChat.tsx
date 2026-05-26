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

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripSlotLines(text: string): string {
  return text
    .replace(/\n\s*[-•]\s*\d{1,2}:\d{2}\s*(?:AM|PM)\s*[–-]\s*\d{1,2}:\d{2}\s*(?:AM|PM)/g, "")
    .replace(/\n\s*\d{1,2}:\d{2}\s*(?:AM|PM)\s*[–-]\s*\d{1,2}:\d{2}\s*(?:AM|PM)/g, "")
    .replace(/Which of these works best for you\?\s*/g, "")
    .trim();
}

// ── Constants ─────────────────────────────────────────────────────────────────

const WELCOME_TEXT =
  "Hi there! I'm Esmi, your AI receptionist at Orchelix. I can book appointments, check availability, and answer any questions about our services or pricing. How can I help you today?";

const WELCOME_TEXT_ES =
  "¡Hola! Soy Esmi, tu recepcionista virtual de Orchelix. Puedo agendar citas, verificar disponibilidad y responder preguntas sobre nuestros servicios y precios. ¿En qué te puedo ayudar?";

const calIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>
  </svg>
);
const clockIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const dollarIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const checkIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const QUICK_REPLIES = [
  { label: "Book an appointment",  value: "Book an appointment",          icon: calIcon   },
  { label: "Check availability",   value: "What's available this week?",  icon: clockIcon },
  { label: "Pricing",              value: "What are your pricing packages?", icon: dollarIcon },
  { label: "Services",             value: "What services do you offer?",  icon: checkIcon },
];

const QUICK_REPLIES_ES = [
  { label: "Agendar una cita",     value: "Quiero agendar una cita",                icon: calIcon   },
  { label: "Ver disponibilidad",   value: "¿Qué disponibilidad hay esta semana?",   icon: clockIcon },
  { label: "Precios",              value: "¿Cuáles son sus paquetes de precios?",   icon: dollarIcon },
  { label: "Servicios",            value: "¿Qué servicios ofrecen?",                icon: checkIcon },
];

const TOOL_LABELS: Record<string, string> = {
  list_available_slots:  "Checking your calendar…",
  book_appointment:      "Booking your appointment…",
  search_knowledge_base: "Looking that up…",
};

const TOOL_LABELS_ES: Record<string, string> = {
  list_available_slots:  "Consultando el calendario…",
  book_appointment:      "Agendando tu cita…",
  search_knowledge_base: "Buscando información…",
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

// ── Main component ────────────────────────────────────────────────────────────

export default function EsmiChat({ defaultLocale = "en" }: { defaultLocale?: "en" | "es" }) {
  const [locale, setLocale] = useState<"en" | "es">(defaultLocale);
  const isEs = locale === "es";
  const welcomeText = isEs ? WELCOME_TEXT_ES : WELCOME_TEXT;
  const quickReplies = isEs ? QUICK_REPLIES_ES : QUICK_REPLIES;
  const toolLabels = isEs ? TOOL_LABELS_ES : TOOL_LABELS;

  const [messages, setMessages] = useState<Message[]>(() => [{ id: uid(), role: "assistant", content: defaultLocale === "es" ? WELCOME_TEXT_ES : WELCOME_TEXT }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const switchLocale = useCallback((next: "en" | "es") => {
    if (next === locale) return;
    setLocale(next);
    setMessages([{ id: uid(), role: "assistant", content: next === "es" ? WELCOME_TEXT_ES : WELCOME_TEXT }]);
    setInput("");
  }, [locale]);

  useEffect(() => {
    const id = getOrCreateThreadId();
    setThreadId(id);
    try {
      const saved = localStorage.getItem(`esmi-messages-${id}`);
      if (saved) {
        const parsed: Message[] = JSON.parse(saved);
        if (parsed.length > 0) setMessages(parsed);
      }
    } catch { /* ok */ }
  }, []);

  useEffect(() => {
    if (!threadId || messages.some((m) => m.streaming)) return;
    try {
      const toSave = messages.slice(-30).map((m) => ({ ...m, toolActive: null }));
      localStorage.setItem(`esmi-messages-${threadId}`, JSON.stringify(toSave));
    } catch { /* ok */ }
  }, [messages, threadId]);

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

      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }

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
    try { localStorage.removeItem(`esmi-messages-${threadId}`); } catch { /* ok */ }
    const newThread = uid();
    try { localStorage.setItem("esmi-thread-id", newThread); } catch { /* ok */ }
    setThreadId(newThread);
    setMessages([{ id: uid(), role: "assistant", content: isEs ? "¡Empecemos de nuevo! Soy Esmi — ¿en qué te puedo ayudar hoy?" : "Fresh start! I'm Esmi — how can I help you today?" }]);
    setInput("");
    setLoading(false);
  }, [threadId, isEs]);

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
  const showQuickReplies = !loading && messages.length === 1 && lastMsg.role === "assistant";

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif", background: "#F7F8FA" }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 flex-shrink-0"
        style={{
          padding: "13px 18px",
          background: "#fff",
          borderBottom: "1px solid rgba(10,37,64,0.08)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        {/* Avatar with online dot */}
        <div className="relative flex-shrink-0">
          <div
            style={{
              width: 36,
              height: 36,
              background: "#06122A",
              borderRadius: 10,
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px rgba(6,18,42,0.25)",
            }}
          >
            <Image
              src="/esmi-logo.png"
              alt="Esmi"
              width={566}
              height={273}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
          <span
            style={{
              position: "absolute",
              bottom: -1,
              right: -1,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22C55E",
              border: "2px solid #fff",
              display: "block",
              animation: "esmi-pulse-ring 2s ease infinite",
            }}
          />
        </div>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
              color: "#06122A",
              lineHeight: 1.2,
            }}
          >
            Esmi
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "rgba(10,37,64,0.45)",
                letterSpacing: "0.02em",
              }}
            >
              {isEs ? "Recepcionista Virtual" : "AI Receptionist"}
            </span>
            <span style={{ color: "rgba(10,37,64,0.20)", fontSize: 10 }}>·</span>
            {(["en", "es"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => switchLocale(lang)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: locale === lang ? "1px solid rgba(20,184,166,0.5)" : "1px solid transparent",
                  background: locale === lang ? "rgba(20,184,166,0.08)" : "transparent",
                  color: locale === lang ? "#0D766B" : "rgba(10,37,64,0.35)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* New chat button */}
        <button
          type="button"
          onClick={resetConversation}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "var(--font-display)",
            fontSize: 12,
            fontWeight: 500,
            color: "rgba(10,37,64,0.45)",
            background: "transparent",
            border: "1px solid rgba(10,37,64,0.12)",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            transition: "color 0.15s, border-color 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#06122A";
            e.currentTarget.style.borderColor = "rgba(10,37,64,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(10,37,64,0.45)";
            e.currentTarget.style.borderColor = "rgba(10,37,64,0.12)";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
          </svg>
          {isEs ? "Nueva conversación" : "New chat"}
        </button>
      </div>

      {/* ── Messages ────────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{
          padding: "20px 18px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(10,37,64,0.12) transparent",
        }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onSlotSelect={sendMessage} toolLabels={toolLabels} />
        ))}

        {showQuickReplies && (
          <QuickReplies chips={quickReplies} onSelect={sendMessage} />
        )}
      </div>

      {/* ── Input ───────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          padding: "12px 16px",
          background: "#fff",
          borderTop: "1px solid rgba(10,37,64,0.08)",
          flexShrink: 0,
        }}
      >
        <label htmlFor="esmi-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
          {isEs ? "Mensaje a Esmi" : "Message Esmi"}
        </label>
        <textarea
          id="esmi-input"
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isEs ? "Escríbele a Esmi…" : "Ask Esmi anything…"}
          rows={1}
          disabled={loading}
          style={{
            flex: 1,
            resize: "none",
            borderRadius: 12,
            border: "1.5px solid rgba(10,37,64,0.14)",
            background: "#F7F8FA",
            padding: "10px 14px",
            fontSize: 14,
            color: "#06122A",
            lineHeight: 1.5,
            fontFamily: "inherit",
            outline: "none",
            maxHeight: 120,
            overflowY: "auto",
            transition: "border-color 0.15s, box-shadow 0.15s",
            cursor: loading ? "not-allowed" : "text",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#14B8A6";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20,184,166,0.12)";
            e.currentTarget.style.background = "#fff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(10,37,64,0.14)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "#F7F8FA";
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: loading || !input.trim() ? "default" : "pointer",
            background:
              loading || !input.trim()
                ? "rgba(10,37,64,0.08)"
                : "linear-gradient(135deg, #14B8A6 0%, #0EA5A0 100%)",
            color: loading || !input.trim() ? "rgba(10,37,64,0.30)" : "#fff",
            boxShadow:
              loading || !input.trim()
                ? "none"
                : "0 2px 8px rgba(20,184,166,0.35)",
            transition: "background 0.15s, box-shadow 0.15s",
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
  toolLabels,
}: {
  message: Message;
  onSlotSelect: (v: string) => void;
  toolLabels: Record<string, string>;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", animation: "esmi-msg-in 0.2s ease" }}>
        <div
          style={{
            maxWidth: "72%",
            padding: "11px 16px",
            fontSize: 14,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.92)",
            background: "linear-gradient(150deg, #0D2545 0%, #071A35 100%)",
            borderRadius: "18px 18px 4px 18px",
            boxShadow: "0 2px 12px rgba(6,18,42,0.22)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // ── Assistant ──────────────────────────────────────────────────────
  const isStreaming = message.streaming;
  const hasContent = message.content.length > 0;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, animation: "esmi-msg-in 0.2s ease" }}>
      {/* Avatar */}
      <div
        style={{
          width: 26,
          height: 26,
          background: "#06122A",
          borderRadius: 7,
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
          boxShadow: "0 1px 3px rgba(6,18,42,0.20)",
        }}
      >
        <img
          src="/esmi-logo.png"
          alt="Esmi"
          style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Typing dots */}
        {isStreaming && !hasContent && !message.toolActive && (
          <div
            style={{
              display: "inline-flex",
              padding: "12px 16px",
              background: "#fff",
              border: "1px solid rgba(10,37,64,0.08)",
              borderRadius: "4px 18px 18px 18px",
              boxShadow: "0 1px 3px rgba(10,37,64,0.05), 0 4px 12px rgba(10,37,64,0.04)",
            }}
          >
            <TypingDots />
          </div>
        )}

        {/* Tool status pill */}
        {message.toolActive && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px 8px 10px",
              background: "rgba(20,184,166,0.07)",
              borderLeft: "3px solid #14B8A6",
              borderRadius: "0 8px 8px 0",
              fontSize: 12,
              fontWeight: 500,
              color: "#0D766B",
              alignSelf: "flex-start",
            }}
          >
            <Spinner />
            {toolLabels[message.toolActive] ?? "Working…"}
          </div>
        )}

        {/* Text content — strip slot lines during streaming so cards don't flash in as bullets first */}
        {hasContent && (
          <div
            style={{
              padding: "11px 16px",
              fontSize: 14,
              lineHeight: 1.65,
              color: "#06122A",
              background: "#fff",
              border: "1px solid rgba(10,37,64,0.08)",
              borderRadius: "4px 18px 18px 18px",
              boxShadow: "0 1px 3px rgba(10,37,64,0.05), 0 4px 12px rgba(10,37,64,0.04)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxWidth: "82%",
            }}
          >
            {isStreaming ? stripSlotLines(message.content) : message.content}
            {isStreaming && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 13,
                  borderRadius: 2,
                  verticalAlign: "text-bottom",
                  marginLeft: 2,
                  background: "#14B8A6",
                  animation: "esmi-bounce 1s ease infinite",
                }}
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
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(10,37,64,0.45)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-mono)",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#14B8A6" }}>
          <rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        {dateLabel ?? "Available slots"} — choose a time
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {slots.map((slot, i) => {
          const { start, end } = parseSlot(slot);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(slot)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "9px 14px",
                borderRadius: 11,
                border: "1.5px solid rgba(20,184,166,0.30)",
                background: "#fff",
                color: "#06122A",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.2,
                cursor: "pointer",
                minWidth: 78,
                fontFamily: "inherit",
                transition: "all 0.15s",
                boxShadow: "0 1px 3px rgba(10,37,64,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#14B8A6";
                e.currentTarget.style.background = "rgba(20,184,166,0.06)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(20,184,166,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(20,184,166,0.30)";
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(10,37,64,0.06)";
              }}
            >
              <span>{start}</span>
              {end && (
                <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(10,37,64,0.45)" }}>
                  – {end}
                </span>
              )}
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
  chips: { label: string; value: string; icon: React.ReactNode }[];
  onSelect: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 36 }}>
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          onClick={() => onSelect(chip.value)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 999,
            border: "1.5px solid rgba(10,37,64,0.14)",
            background: "#fff",
            color: "rgba(10,37,64,0.65)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            boxShadow: "0 1px 2px rgba(10,37,64,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#14B8A6";
            e.currentTarget.style.background = "rgba(20,184,166,0.06)";
            e.currentTarget.style.color = "#0D766B";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(10,37,64,0.14)";
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "rgba(10,37,64,0.65)";
          }}
        >
          <span style={{ color: "#14B8A6", display: "flex", flexShrink: 0 }}>{chip.icon}</span>
          {chip.label}
        </button>
      ))}
    </div>
  );
}

// ── Micro-components ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 16 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#14B8A6",
            animation: `esmi-bounce 1.2s ease ${i * 0.18}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function Spinner() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: "esmi-spin 0.8s linear infinite", flexShrink: 0 }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
