"use client";

/* Lightweight EN/ES for the operator console. Not the full marketing
   catalogue — only chrome and primary work surfaces so bilingual operators
   can run the product in Spanish without a full i18n migration. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DashLocale = "en" | "es";

const STORAGE_KEY = "esmi:dash-locale";

type DashMessages = {
  localeName: string;
  switchTo: string;
  groups: Record<string, string>;
  nav: Record<string, string>;
  overview: {
    kicker: string;
    title: string;
    lede: string;
    registerTitle: string;
    registerLede: string;
    allCalls: string;
    allChats: string;
    empty: string;
    afterHours: string;
    setupTitle: string;
    setupLede: string;
    languageMix: string;
    noCallsWeek: string;
  };
  calls: {
    kicker: string;
    title: string;
    lede: string;
    review: string;
    coachTitle: string;
    coachLede: string;
    question: string;
    answer: string;
    save: string;
    saving: string;
    saved: string;
    markReviewed: string;
    reviewed: string;
    knowledge: string;
    voice: string;
    settings: string;
  };
  orgGate: {
    kicker: string;
    title: string;
    body: string;
    apply: string;
    newTo: string;
  };
  byOrchelix: string;
  openMenu: string;
  closeMenu: string;
  pages: {
    leadsTitle: string;
    leadsLede: string;
    chatsTitle: string;
    chatsLede: string;
    appointmentsTitle: string;
    appointmentsLede: string;
    knowledgeTitle: string;
    knowledgeLede: string;
    settingsTitle: string;
    settingsLede: string;
    voiceTitle: string;
    voiceLede: string;
  };
};

const en: DashMessages = {
  localeName: "English",
  switchTo: "Español",
  groups: {
    work: "Work",
    configure: "Configure",
    account: "Account",
    internal: "Internal",
  },
  nav: {
    Overview: "Overview",
    Calls: "Calls",
    Chats: "Chats",
    Appointments: "Appointments",
    Leads: "Leads",
    Knowledge: "Knowledge",
    Voice: "Voice",
    Scheduling: "Scheduling",
    Settings: "Settings",
    Team: "Team",
    Usage: "Usage",
    Analytics: "Analytics",
    Billing: "Billing",
    Admin: "Admin",
    Onboarding: "Onboarding",
  },
  overview: {
    kicker: "Operator console",
    title: "Night register",
    lede: "What Esmi handled while you were busy — after-hours first, then the full activity register. Open any row to listen, read, and coach.",
    registerTitle: "Activity register",
    registerLede:
      "Live from your line — same disposition language as the marketing register.",
    allCalls: "All calls",
    allChats: "All chats",
    empty: "No calls or chats yet — the register fills as Esmi works.",
    afterHours: "After-hours calls answered",
    setupTitle: "Finish setting up Esmi",
    setupLede:
      "Same 14-day pilot path you saw on the marketing site — map, configure, then go live with a consultant.",
    languageMix: "Language mix (last 7 days)",
    noCallsWeek: "No calls in the last 7 days.",
  },
  calls: {
    kicker: "Work · Call register",
    title: "Calls",
    lede: "Every phone call Esmi answered — disposition, summary, transcript, and recording. Open a row to review and coach.",
    review: "Review",
    coachTitle: "Coach Esmi from this call",
    coachLede:
      "Writes a knowledge entry Esmi will use on the next similar call. That is a real override — not a sticky note.",
    question: "When this comes up",
    answer: "Esmi should",
    save: "Save to knowledge",
    saving: "Saving…",
    saved: "Saved to knowledge",
    markReviewed: "Mark reviewed",
    reviewed: "Reviewed",
    knowledge: "Correct knowledge →",
    voice: "Coach voice →",
    settings: "Adjust hours & routing →",
  },
  orgGate: {
    kicker: "Operator console",
    title: "Choose your business",
    body: "Your account isn't viewing a business yet. Pick one below — or, if you don't see your business, ask your Orchelix contact for an invitation.",
    apply: "Apply to get set up",
    newTo: "New to Esmi?",
  },
  byOrchelix: "by Orchelix",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  pages: {
    leadsTitle: "Leads",
    leadsLede:
      "Callers Esmi flagged for human follow-up — budget, timeline, or urgency. Mark one contacted once you've reached out.",
    chatsTitle: "Chats",
    chatsLede:
      "Every web chat conversation Esmi has had with a visitor — with outcome and message count.",
    appointmentsTitle: "Appointments",
    appointmentsLede:
      "Every appointment on your calendar — booked by Esmi over the phone, through your website, or added by hand.",
    knowledgeTitle: "Knowledge base",
    knowledgeLede:
      "FAQs and short notes Esmi can pull from when answering questions. Changes are searchable within about a minute of saving.",
    settingsTitle: "Settings",
    settingsLede: "Hours, routing, and business facts Esmi uses on every call.",
    voiceTitle: "Voice",
    voiceLede: "Preview greetings, coach tone, and quality checks for your line.",
  },
};

const es: DashMessages = {
  localeName: "Español",
  switchTo: "English",
  groups: {
    work: "Trabajo",
    configure: "Configurar",
    account: "Cuenta",
    internal: "Interno",
  },
  nav: {
    Overview: "Resumen",
    Calls: "Llamadas",
    Chats: "Chats",
    Appointments: "Citas",
    Leads: "Prospectos",
    Knowledge: "Conocimiento",
    Voice: "Voz",
    Scheduling: "Agenda",
    Settings: "Ajustes",
    Team: "Equipo",
    Usage: "Uso",
    Analytics: "Analítica",
    Billing: "Facturación",
    Admin: "Admin",
    Onboarding: "Alta",
  },
  overview: {
    kicker: "Consola de operador",
    title: "Registro de la noche",
    lede: "Lo que Esmi atendió mientras estabas ocupado — primero fuera de horario, luego el registro completo. Abre cualquier fila para escuchar, leer y entrenar.",
    registerTitle: "Registro de actividad",
    registerLede:
      "En vivo desde tu línea — el mismo lenguaje de disposiciones que en el sitio.",
    allCalls: "Todas las llamadas",
    allChats: "Todos los chats",
    empty: "Aún no hay llamadas ni chats — el registro se llena cuando Esmi trabaja.",
    afterHours: "Llamadas fuera de horario contestadas",
    setupTitle: "Termina de configurar Esmi",
    setupLede:
      "El mismo camino de piloto de 14 días — mapear, configurar, y salir al aire con un consultor.",
    languageMix: "Mezcla de idiomas (últimos 7 días)",
    noCallsWeek: "No hubo llamadas en los últimos 7 días.",
  },
  calls: {
    kicker: "Trabajo · Registro de llamadas",
    title: "Llamadas",
    lede: "Cada llamada que contestó Esmi — disposición, resumen, transcripción y grabación. Abre una fila para revisar y entrenar.",
    review: "Revisar",
    coachTitle: "Entrena a Esmi desde esta llamada",
    coachLede:
      "Guarda una entrada de conocimiento que Esmi usará en la próxima llamada similar. Es una corrección real — no una nota adhesiva.",
    question: "Cuando salga esto",
    answer: "Esmi debe",
    save: "Guardar en conocimiento",
    saving: "Guardando…",
    saved: "Guardado en conocimiento",
    markReviewed: "Marcar revisada",
    reviewed: "Revisada",
    knowledge: "Corregir conocimiento →",
    voice: "Entrenar voz →",
    settings: "Ajustar horarios y ruteo →",
  },
  orgGate: {
    kicker: "Consola de operador",
    title: "Elige tu negocio",
    body: "Tu cuenta aún no está viendo un negocio. Elige uno abajo — o, si no aparece, pide una invitación a tu contacto de Orchelix.",
    apply: "Solicitar alta",
    newTo: "¿Nuevo en Esmi?",
  },
  byOrchelix: "por Orchelix",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  pages: {
    leadsTitle: "Prospectos",
    leadsLede:
      "Llamadas que Esmi marcó para seguimiento humano — presupuesto, plazo o urgencia. Márcalo contactado cuando hayas llamado.",
    chatsTitle: "Chats",
    chatsLede:
      "Cada conversación de chat web que Esmi tuvo con un visitante — con resultado y conteo de mensajes.",
    appointmentsTitle: "Citas",
    appointmentsLede:
      "Cada cita en tu calendario — agendada por Esmi por teléfono, en tu web o a mano.",
    knowledgeTitle: "Base de conocimiento",
    knowledgeLede:
      "Preguntas frecuentes y notas cortas que Esmi puede usar al responder. Los cambios son buscables en un minuto.",
    settingsTitle: "Ajustes",
    settingsLede: "Horarios, ruteo y datos del negocio que Esmi usa en cada llamada.",
    voiceTitle: "Voz",
    voiceLede: "Vista previa del saludo, tono y controles de calidad de tu línea.",
  },
};

const catalogs: Record<DashLocale, DashMessages> = { en, es };

const DashI18nContext = createContext<{
  locale: DashLocale;
  t: DashMessages;
  setLocale: (l: DashLocale) => void;
} | null>(null);

export function DashI18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<DashLocale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: DashLocale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ locale, t: catalogs[locale], setLocale }),
    [locale, setLocale],
  );

  return (
    <DashI18nContext.Provider value={value}>{children}</DashI18nContext.Provider>
  );
}

export function useDashI18n() {
  const ctx = useContext(DashI18nContext);
  if (!ctx) {
    return {
      locale: "en" as DashLocale,
      t: en,
      setLocale: (_: DashLocale) => {},
    };
  }
  return ctx;
}

export function navLabel(t: DashMessages, englishLabel: string): string {
  return t.nav[englishLabel] ?? englishLabel;
}

export function groupLabel(
  t: DashMessages,
  id: string,
  fallback: string | null,
): string | null {
  if (!fallback) return null;
  const map = t.groups as Record<string, string>;
  return map[id] ?? fallback;
}
