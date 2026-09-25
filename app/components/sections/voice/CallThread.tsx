"use client";

/* The sample booking conversation, played out as it would happen: a typing
   indicator, then each line, then the booking landing as a confirmation
   card. Starts when it scrolls into view; can be replayed.

   It is an illustrative sample of the record shape — labelled as such — not
   a customer's call. The language follows the listening stage's EN/ES. */

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, RotateCcw } from "lucide-react";

type Lang = "en" | "es";
type Line = { who: "caller" | "esmi"; text: string };

const LINES: Record<Lang, Line[]> = {
  en: [
    { who: "caller", text: "Hi — do you have anything tomorrow morning for a kitchen template?" },
    { who: "esmi", text: "I can check that for you. What time works best?" },
    { who: "caller", text: "Around nine if you have it." },
    { who: "esmi", text: "Thursday at 9:00 is open. I'll book that and send a confirmation." },
  ],
  es: [
    { who: "caller", text: "Hola — ¿tienen algo mañana en la mañana para plantilla de cocina?" },
    { who: "esmi", text: "Claro, lo reviso. ¿Qué horario le conviene?" },
    { who: "caller", text: "Como a las nueve, si hay." },
    { who: "esmi", text: "Jueves a las 9:00 está libre. Lo agendo y le mando confirmación." },
  ],
};

const COPY = {
  en: {
    head: "Sample call",
    caller: "Caller",
    booked: "Booked",
    when: "Thursday · 9:00 AM",
    what: "Kitchen template",
    sms: "SMS confirmation sent",
    note: "Illustrative sample of the record shape — not a client call.",
    replay: "Replay",
  },
  es: {
    head: "Llamada de muestra",
    caller: "Llamante",
    booked: "Agendado",
    when: "Jueves · 9:00 AM",
    what: "Plantilla de cocina",
    sms: "Confirmación por SMS enviada",
    note: "Muestra ilustrativa de la forma del registro — no una llamada de un cliente.",
    replay: "Repetir",
  },
} as const;

const TYPE_MS = 900;
const GAP_MS = 650;

export default function CallThread({ lang = "en" }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  /* step: how many lines are shown; typing: whether the next one is "typing". */
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  const [started, setStarted] = useState(false);
  const lines = LINES[lang];
  const c = COPY[lang];
  const done = step > lines.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        /* Reduced motion: the finished conversation, no playback. */
        if (reduce) setStep(lines.length + 1);
        else setStarted(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lines.length]);

  useEffect(() => {
    if (!started || step > lines.length) return;
    const timers: number[] = [];
    if (step < lines.length) {
      timers.push(window.setTimeout(() => setTyping(true), GAP_MS));
      timers.push(
        window.setTimeout(() => {
          setTyping(false);
          setStep((s) => s + 1);
        }, GAP_MS + TYPE_MS + lines[step].text.length * 12),
      );
    } else {
      timers.push(window.setTimeout(() => setStep((s) => s + 1), GAP_MS + 200));
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [started, step, run, lines]);

  const replay = () => {
    setTyping(false);
    setStep(0);
    setRun((r) => r + 1);
    setStarted(true);
  };

  const nextWho = lines[step]?.who;

  return (
    <div ref={ref} className="evt" data-done={done ? "true" : undefined}>
      <div className="evt-head">
        <span>{c.head}</span>
        <span className="evt-state" data-on={done ? "true" : undefined}>
          {done ? c.booked : "●●●"}
        </span>
      </div>

      <ol className="evt-list" aria-live="polite">
        {lines.slice(0, step).map((l, i) => (
          <li key={`${lang}-${run}-${i}`} className="evt-msg" data-who={l.who}>
            <span className="evt-who">{l.who === "esmi" ? "Esmi" : c.caller}</span>
            <p>{l.text}</p>
          </li>
        ))}
        {typing && nextWho ? (
          <li className="evt-msg evt-msg--typing" data-who={nextWho} aria-hidden="true">
            <span className="evt-who">{nextWho === "esmi" ? "Esmi" : c.caller}</span>
            <p>
              <i />
              <i />
              <i />
            </p>
          </li>
        ) : null}
      </ol>

      {done ? (
        <div className="evt-booked" key={`b-${run}`}>
          <span className="evt-booked__icon" aria-hidden="true">
            <CalendarCheck />
          </span>
          <div>
            <p className="evt-booked__when">{c.when}</p>
            <p className="evt-booked__what">{c.what}</p>
            <p className="evt-booked__sms">
              <Check aria-hidden="true" /> {c.sms}
            </p>
          </div>
        </div>
      ) : null}

      <div className="evt-foot">
        <p>{c.note}</p>
        {done ? (
          <button type="button" onClick={replay} className="evt-replay">
            <RotateCcw aria-hidden="true" /> {c.replay}
          </button>
        ) : null}
      </div>
    </div>
  );
}
