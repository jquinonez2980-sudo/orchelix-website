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

type Activity = "idle" | "thinking" | "speaking";

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripSlotLines(text: string): string {
  return text
    .replace(/\n\s*[-•]\s*\d{1,2}:\d{2}\s*(?:AM|PM)\s*[–-]\s*\d{1,2}:\d{2}\s*(?:AM|PM)/g, "")
    .replace(/\n\s*\d{1,2}:\d{2}\s*(?:AM|PM)\s*[–-]\s*\d{1,2}:\d{2}\s*(?:AM|PM)/g, "")
    .replace(/Which of these works best for you\?\s*/g, "")
    .trim();
}

// ── Constants ─────────────────────────────────────────────────────────────────

const welcomeEn = (company: string) =>
  `Hi there! I'm Esmi, your AI receptionist at ${company}. I can book appointments, check availability, and answer any questions about our services or pricing. How can I help you today?`;

const welcomeEs = (company: string) =>
  `¡Hola! Soy Esmi, la recepcionista virtual de ${company}. Puedo agendar citas, revisar disponibilidad y responder preguntas sobre nuestros servicios y precios. ¿En qué le puedo ayudar?`;

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
  { label: "Agendar una cita",     value: "Quiero agendar una cita",                      icon: calIcon   },
  { label: "Ver disponibilidad",   value: "¿Qué disponibilidad tienen esta semana?",      icon: clockIcon },
  { label: "Precios",              value: "¿Cuáles son sus paquetes de precios?",         icon: dollarIcon },
  { label: "Servicios",            value: "¿Qué servicios ofrecen?",                      icon: checkIcon },
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

/* The line held open while the first token is awaited. Named, not implied by
   an animation — a screen reader gets the same information the sighted user
   gets from the drawn rule. */
const PENDING_LABEL = { en: "Answering", es: "Respondiendo" } as const;

const FOIL = "var(--lg-foil)";

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid(): string {
  return typeof crypto !== "undefined"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

function getOrCreateThreadId(tenantKey: string): string {
  const storeKey = `esmi-thread-id:${tenantKey}`;
  try {
    const stored = localStorage.getItem(storeKey);
    if (stored) return stored;
    const id = uid();
    localStorage.setItem(storeKey, id);
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

export default function EsmiChat({
  defaultLocale = "en",
  tenantId,
  companyName = "Orchelix",
}: {
  defaultLocale?: "en" | "es";
  /** Tenant slug from ?tenant= — routes the backend to this customer's KB/pricing/persona. */
  tenantId?: string;
  /** Display name for the welcome bubble (from ?company= or derived from the slug). */
  companyName?: string;
}) {
  const tenantKey = tenantId || "default";
  const welcome = (loc: "en" | "es") => (loc === "es" ? welcomeEs(companyName) : welcomeEn(companyName));

  const [locale, setLocale] = useState<"en" | "es">(defaultLocale);
  const isEs = locale === "es";
  const quickReplies = isEs ? QUICK_REPLIES_ES : QUICK_REPLIES;
  const toolLabels = isEs ? TOOL_LABELS_ES : TOOL_LABELS;
  const pendingLabel = PENDING_LABEL[locale];

  const [messages, setMessages] = useState<Message[]>(() => [{ id: uid(), role: "assistant", content: welcome(defaultLocale) }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const switchLocale = useCallback((next: "en" | "es") => {
    if (next === locale) return;
    setLocale(next);
    setMessages([{ id: uid(), role: "assistant", content: next === "es" ? welcomeEs(companyName) : welcomeEn(companyName) }]);
    setInput("");
  }, [locale, companyName]);

  useEffect(() => {
    const id = getOrCreateThreadId(tenantKey);
    setThreadId(id);
    try {
      const saved = localStorage.getItem(`esmi-messages-${id}`);
      if (saved) {
        const parsed: Message[] = JSON.parse(saved);
        if (parsed.length > 0) setMessages(parsed);
      }
    } catch { /* ok */ }
  }, [tenantKey]);

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
          body: JSON.stringify({
            message: text.trim(),
            thread_id: threadId,
            // Routes the backend to this tenant's KB/pricing/persona (omitted → "default").
            ...(tenantId ? { tenant_id: tenantId } : {}),
          }),
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
    [loading, threadId, tenantId]
  );

  const resetConversation = useCallback(() => {
    try { localStorage.removeItem(`esmi-messages-${threadId}`); } catch { /* ok */ }
    const newThread = uid();
    try { localStorage.setItem(`esmi-thread-id:${tenantKey}`, newThread); } catch { /* ok */ }
    setThreadId(newThread);
    setMessages([{ id: uid(), role: "assistant", content: isEs ? "¡Empecemos de nuevo! Soy Esmi — ¿en qué te puedo ayudar hoy?" : "Fresh start! I'm Esmi — how can I help you today?" }]);
    setInput("");
    setLoading(false);
  }, [threadId, isEs, tenantKey]);

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

  // Drive the waveform from real chat activity: streaming tokens = "speaking",
  // waiting on the model / a tool = "thinking", otherwise idle.
  const activity: Activity = loading
    ? lastMsg.role === "assistant" && lastMsg.content.length > 0 && !lastMsg.toolActive
      ? "speaking"
      : "thinking"
    : "idle";

  return (
    <div
      className="flex flex-col h-full"
      style={{
        fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
        /* The console is ruled onto the field, not floated above it: a red top
           rule anchors it the way every other block in this world is anchored,
           and the surrounding Section supplies the ground. The old gradient
           painted its own darker panel, which read as a card. */
        borderTop: "2px solid var(--lg-rule)",
        borderBottom: "1px solid var(--lg-hair)",
        background: "transparent",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 flex-shrink-0"
        style={{
          padding: "13px 18px",
          background: "rgba(226,232,242,0.04)",
          borderBottom: "1px solid var(--lg-hair-2)",
        }}
      >
        {/* Avatar with online dot */}
        <div className="relative flex-shrink-0">
          <div
            style={{
              width: 36,
              height: 36,
              background: "#06122A",
              borderRadius: 0,
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(217,162,27,0.28)",
              boxShadow: "none",
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
              borderRadius: 0,
              background: "var(--lg-tick)",
              border: "2px solid var(--lg-field)",
              display: "block",
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
              color: "#EAF2FF",
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
                color: "var(--lg-ink-3)",
                letterSpacing: "0.02em",
              }}
            >
              {isEs ? "Recepcionista Virtual" : "AI Receptionist"}
            </span>
            <span style={{ color: "var(--lg-ink-3)", fontSize: 10 }}>·</span>
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
                  borderRadius: 0,
                  border: locale === lang ? "1px solid rgba(217,162,27,0.5)" : "1px solid transparent",
                  background: locale === lang ? "rgba(217,162,27,0.10)" : "transparent",
                  color: locale === lang ? FOIL : "var(--lg-ink-3)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Reactive voice waveform */}
        <VoiceWave activity={activity} />

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
            color: "var(--lg-ink-3)",
            background: "transparent",
            border: "1px solid var(--lg-hair)",
            borderRadius: 0,
            padding: "6px 10px",
            cursor: "pointer",
            transition: "color 0.15s, border-color 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#EAF2FF";
            e.currentTarget.style.borderColor = "rgba(217,162,27,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--lg-ink-3)";
            e.currentTarget.style.borderColor = "var(--lg-hair)";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
          </svg>
          <span className="hidden sm:inline">{isEs ? "Nueva conversación" : "New chat"}</span>
        </button>
      </div>

      {/* ── Messages ────────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="lg-field flex-1 overflow-y-auto"
        style={{
          padding: "20px 18px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onSlotSelect={sendMessage}
            toolLabels={toolLabels}
            pendingLabel={pendingLabel}
          />
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
          background: "rgba(226,232,242,0.04)",
          borderTop: "1px solid var(--lg-hair-2)",
          flexShrink: 0,
        }}
      >
        <label htmlFor="esmi-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
          {isEs ? "Mensaje a Esmi" : "Message Esmi"}
        </label>
        <textarea
          id="esmi-input"
          className="esmi-input"
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
            borderRadius: 0,
            border: "1px solid var(--lg-hair)",
            background: "rgba(226,232,242,0.05)",
            padding: "10px 14px",
            fontSize: 14,
            color: "#EAF2FF",
            lineHeight: 1.5,
            fontFamily: "inherit",
            outline: "none",
            maxHeight: 120,
            overflowY: "auto",
            transition: "border-color 0.15s, box-shadow 0.15s",
            cursor: loading ? "not-allowed" : "text",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(217,162,27,0.6)";
            e.currentTarget.style.boxShadow = "0 0 0 2px rgba(217,162,27,0.30)";
            e.currentTarget.style.background = "rgba(226,232,242,0.07)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--lg-hair)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "rgba(226,232,242,0.05)";
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 0,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: loading || !input.trim() ? "default" : "pointer",
            background:
              loading || !input.trim()
                ? "var(--lg-hair-2)"
                : FOIL,
            color: loading || !input.trim() ? "var(--lg-ink-3)" : "#04121A",
            boxShadow:
              loading || !input.trim()
                ? "none"
                : "none",
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

// ── VoiceWave ─────────────────────────────────────────────────────────────────
// Animated bar waveform that reacts to chat activity. Idle = gentle low pulse;
// thinking = medium bounce; speaking = bright, fast, glowing.

/* The idle state used to run `esmi-wave-idle 2.4s … infinite` — a waveform
   breathing on an empty page, forever, whether or not anyone had interacted
   with it. That is an ambient loop with no trigger, and it went.

   Bars are now static at rest and animate only while a request is actually
   in flight. The motion is the request; when there is no request there is no
   motion. The static bars still read as a waveform, so the affordance
   survives without the theatre. */
function VoiceWave({ activity }: { activity: Activity }) {
  const bars = [0, 1, 2, 3, 4];
  const idle = activity === "idle";
  const duration = activity === "speaking" ? 0.7 : 1;

  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        height: 22,
        padding: "0 4px",
        flexShrink: 0,
      }}
    >
      {bars.map((i) => (
        <span
          key={i}
          data-esmi-motion
          style={{
            width: 3,
            height: 18,
            borderRadius: 0,
            background: idle ? "rgba(217,162,27,0.45)" : FOIL,
            transformOrigin: "center",
            transform: idle ? "scaleY(0.28)" : undefined,
            transition: `background-color var(--lg-dur-state) var(--ease-standard)`,
            animation: idle
              ? undefined
              : `esmi-wave ${duration}s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── MessageBubble ─────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  onSlotSelect,
  toolLabels,
  pendingLabel,
}: {
  message: Message;
  onSlotSelect: (v: string) => void;
  toolLabels: Record<string, string>;
  pendingLabel: string;
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
            color: "#EAF2FF",
            background: "linear-gradient(135deg, rgba(217,162,27,0.16) 0%, rgba(217,162,27,0.10) 100%)",
            border: "1px solid rgba(217,162,27,0.28)",
            borderRadius: 0,
            boxShadow: "0 2px 16px rgba(217,162,27,0.10)",
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
          borderRadius: 0,
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
          border: "1px solid rgba(217,162,27,0.22)",
          boxShadow: "none",
        }}
      >
        <Image
          src="/esmi-logo.png"
          alt="Esmi"
          width={566}
          height={273}
          sizes="26px"
          style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Awaiting the first token — a line opened in the record. */}
        {isStreaming && !hasContent && !message.toolActive && (
          <div
            role="status"
            style={{
              display: "inline-flex",
              padding: "12px 16px",
              background: "rgba(226,232,242,0.05)",
              border: "1px solid var(--lg-hair-2)",
              borderRadius: 0,
              alignSelf: "flex-start",
            }}
          >
            <PendingRule label={pendingLabel} />
          </div>
        )}

        {/* A real tool call is running. Same device, the tool's own label. */}
        {message.toolActive && (
          <div
            role="status"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 12px",
              background: "rgba(217,162,27,0.08)",
              borderRadius: 0,
              alignSelf: "flex-start",
            }}
          >
            <PendingRule label={toolLabels[message.toolActive] ?? "Working…"} />
          </div>
        )}

        {/* Text content — strip slot lines during streaming so cards don't flash in as bullets first */}
        {hasContent && (
          <div
            style={{
              padding: "11px 16px",
              fontSize: 14,
              lineHeight: 1.65,
              color: "#EAF2FF",
              background: "rgba(226,232,242,0.05)",
              border: "1px solid var(--lg-hair-2)",
              borderRadius: 0,
              boxShadow: "0 2px 16px rgba(10,15,28,0.4)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxWidth: "82%",
            }}
          >
            {isStreaming ? <StruckText text={stripSlotLines(message.content)} /> : message.content}
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
          color: "var(--lg-ink-3)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-mono)",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: FOIL }}>
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
                borderRadius: 0,
                border: "1.5px solid rgba(217,162,27,0.30)",
                background: "rgba(226,232,242,0.04)",
                color: "#EAF2FF",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.2,
                cursor: "pointer",
                minWidth: 78,
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = FOIL;
                e.currentTarget.style.background = "rgba(217,162,27,0.12)";
                e.currentTarget.style.borderColor = "var(--lg-foil)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(217,162,27,0.30)";
                e.currentTarget.style.background = "rgba(226,232,242,0.04)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>{start}</span>
              {end && (
                <span style={{ fontSize: 11, fontWeight: 400, color: "var(--lg-ink-3)" }}>
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
            borderRadius: 0,
            border: "1px solid var(--lg-hair)",
            background: "rgba(226,232,242,0.04)",
            color: "var(--lg-ink-2)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(217,162,27,0.5)";
            e.currentTarget.style.background = "rgba(217,162,27,0.10)";
            e.currentTarget.style.color = FOIL;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--lg-hair)";
            e.currentTarget.style.background = "rgba(226,232,242,0.04)";
            e.currentTarget.style.color = "var(--lg-ink-2)";
          }}
        >
          <span style={{ color: FOIL, display: "flex", flexShrink: 0 }}>{chip.icon}</span>
          {chip.label}
        </button>
      ))}
    </div>
  );
}

// ── Micro-components ──────────────────────────────────────────────────────────

/* PendingRule — what replaced the three pulsing dots.

   The dots were `lg-typing 1.4s ease-in-out infinite` with an 0.18s stagger:
   a looping "AI thinking" indicator, which is the single most recognisable
   tell of an AI wrapper, and foil on a 6px dot besides — a Foil Scarcity
   violation. Both went.

   This is the Rule verb. A line is opened in the record and held open while
   the entry is awaited. It draws once, in 260ms, and then holds; there is no
   loop, because nothing is actually repeating. The real liveness signal is
   the tokens themselves, which begin arriving within a few hundred
   milliseconds and are struck in as they land. */
/* StruckText — what replaced the blinking caret.

   The caret was a 2px foil bar on `lg-typing … infinite`: the terminal-cursor
   tell that every AI wrapper ships. This renders the same real SSE stream as
   the Strike verb instead — each word group revealed left-to-right by a
   clip-path wipe as it arrives, the way a machine writes a transcript.

   There is no artificial pacing here and therefore nothing to skip: the
   cadence is the backend's actual token cadence, and each wipe is 300ms
   against a stream that is already moving. A "skip" control would have
   nothing to skip past.

   Word groups sit at stable indices, so an arriving token mounts a new span
   (which animates once) and leaves every earlier span alone (which does not
   re-animate). Whitespace stays as plain text nodes so `pre-wrap` wrapping
   is unaffected by the inline-block word boxes. */
function StruckText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, i) =>
        /^\s+$/.test(part) || part === "" ? (
          part
        ) : (
          <span key={i} className="lg-strike" style={{ display: "inline-block" }}>
            {part}
          </span>
        )
      )}
    </>
  );
}

function PendingRule({ label }: { label?: string }) {
  return (
    <span
      className="lg-fig inline-flex items-center gap-3"
      style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: FOIL }}
    >
      <span
        aria-hidden="true"
        className="lg-pending-rule"
        style={{ display: "block", width: 26, height: 1, background: FOIL }}
      />
      {label}
    </span>
  );
}
