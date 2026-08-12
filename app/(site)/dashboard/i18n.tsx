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
  /** Shared list/filter/form chrome for Work surfaces */
  ui: {
    status: string;
    search: string;
    clearFilters: string;
    previous: string;
    next: string;
    of: string;
    tryAgain: string;
    saving: string;
    save: string;
    saveChanges: string;
    saved: string;
    failedRetry: string;
    unsaved: string;
    noContact: string;
    phone: string;
    webChat: string;
    allStatuses: string;
    searchContact: string;
    searchNamePhone: string;
    updated: string;
    source: string;
    contact: string;
    summary: string;
    leadScore: string;
    call: string;
    leadStatusNew: string;
    leadStatusContacted: string;
    leadStatusWon: string;
    leadStatusLost: string;
    noLeads: string;
    noLeadsFilter: string;
    noLeadsHint: string;
    noLeadsFilterHint: string;
    loadLeadsFail: string;
    outcome: string;
    allOutcomes: string;
    from: string;
    to: string;
    language: string;
    allLanguages: string;
    english: string;
    spanish: string;
    recording: string;
    any: string;
    hasRecording: string;
    noRecording: string;
    review: string;
    allReviews: string;
    needsReview: string;
    needsFollowup: string;
    reviewed: string;
    time: string;
    caller: string;
    duration: string;
    loadCallsFail: string;
    noCalls: string;
    noCallsFilter: string;
    all: string;
    upcoming: string;
    past: string;
    loadApptsFail: string;
    noAppts: string;
    noApptsFilter: string;
    noApptsHint: string;
    noApptsFilterHint: string;
    questionOptional: string;
    answerNote: string;
    addEntry: string;
    adding: string;
    addedOk: string;
    delete: string;
    deleting: string;
    currentEntries: string;
    noEntries: string;
    uploadedPdfs: string;
    businessProfile: string;
    businessName: string;
    timezone: string;
    timezoneHint: string;
    greeting: string;
    greetingDesc: string;
    greetingPlaceholder: string;
    escalation: string;
    escalationDesc: string;
    transferPhone: string;
    escalationEmail: string;
    bookingNotifications: string;
    bookingTo: string;
    locationsHours: string;
    hours: string;
    openDays: string;
    services: string;
    noServices: string;
    addService: string;
    confirmTz: string;
    open: string;
    close: string;
    transcript: string;
    visitor: string;
    loadChatsFail: string;
    noChats: string;
    noChatsFilter: string;
    inProgress: string;
    closed: string;
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
  ui: {
    status: "Status",
    search: "Search",
    clearFilters: "Clear filters",
    previous: "Previous",
    next: "Next",
    of: "of",
    tryAgain: "Try again",
    saving: "Saving…",
    save: "Save",
    saveChanges: "Save changes",
    saved: "Saved — live within a minute.",
    failedRetry: "Failed — try again",
    unsaved: "Unsaved changes",
    noContact: "No contact on file",
    phone: "Phone",
    webChat: "Web chat",
    allStatuses: "All statuses",
    searchContact: "Search contact or summary…",
    searchNamePhone: "Search name or phone…",
    updated: "Updated",
    source: "Source",
    contact: "Contact",
    summary: "Summary",
    leadScore: "Lead score (0–100)",
    call: "Call",
    leadStatusNew: "New",
    leadStatusContacted: "Contacted",
    leadStatusWon: "Won",
    leadStatusLost: "Lost",
    noLeads: "No leads yet",
    noLeadsFilter: "No leads match these filters",
    noLeadsHint:
      "When Esmi qualifies a web chat, or flags a phone caller for follow-up, they show up here.",
    noLeadsFilterHint: "Try a different search or switch the status filter back to All.",
    loadLeadsFail: "Couldn't load leads",
    outcome: "Outcome",
    allOutcomes: "All outcomes",
    from: "From",
    to: "To",
    language: "Language",
    allLanguages: "All languages",
    english: "English",
    spanish: "Spanish",
    recording: "Recording",
    any: "Any",
    hasRecording: "Has recording",
    noRecording: "No recording",
    review: "Review",
    allReviews: "All reviews",
    needsReview: "Needs review",
    needsFollowup: "Needs follow-up",
    reviewed: "Reviewed",
    time: "Time",
    caller: "Caller",
    duration: "Duration",
    loadCallsFail: "Couldn't load calls",
    noCalls: "No calls yet",
    noCallsFilter: "No calls match these filters",
    all: "All",
    upcoming: "Upcoming",
    past: "Past",
    loadApptsFail: "Couldn't load appointments",
    noAppts: "No appointments booked yet",
    noApptsFilter: "No appointments match",
    noApptsHint:
      "The first time Esmi books a customer in — by phone or from your website — it appears right here.",
    noApptsFilterHint: "Try a different search or switch the filter back to All.",
    questionOptional: "Question (optional)",
    answerNote: "Answer / note",
    addEntry: "Add entry",
    adding: "Adding…",
    addedOk: "Added — Esmi can use this right away.",
    delete: "Delete",
    deleting: "Deleting…",
    currentEntries: "Current entries",
    noEntries: "No entries yet. Add a quick FAQ above and Esmi can start using it right away.",
    uploadedPdfs: "Uploaded PDFs",
    businessProfile: "Business profile",
    businessName: "Business name",
    timezone: "Timezone",
    timezoneHint: "Used to interpret your opening hours and to schedule appointments.",
    greeting: "Greeting",
    greetingDesc:
      "Esmi opens with this line on the first reply of a new conversation. Leave it blank to use the default opening.",
    greetingPlaceholder: "Thanks for calling — how can I help today?",
    escalation: "Escalation",
    escalationDesc:
      "What happens when Esmi hands a caller off to your team instead of handling it alone.",
    transferPhone: "Transfer phone number",
    escalationEmail: "Escalation email",
    bookingNotifications: "Booking notifications",
    bookingTo: "Booking confirmations to",
    locationsHours: "Locations & hours",
    hours: "Hours",
    openDays: "Open days",
    services: "Services",
    noServices: "No services yet.",
    addService: "+ Add service",
    confirmTz: "Confirm the timezone change above to save.",
    open: "Open",
    close: "Close",
    transcript: "Transcript",
    visitor: "Visitor",
    loadChatsFail: "Couldn't load chats",
    noChats: "No chats yet",
    noChatsFilter: "No chats match these filters",
    inProgress: "In progress",
    closed: "Closed",
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
  ui: {
    status: "Estado",
    search: "Buscar",
    clearFilters: "Limpiar filtros",
    previous: "Anterior",
    next: "Siguiente",
    of: "de",
    tryAgain: "Reintentar",
    saving: "Guardando…",
    save: "Guardar",
    saveChanges: "Guardar cambios",
    saved: "Guardado — en vivo en un minuto.",
    failedRetry: "Falló — reintenta",
    unsaved: "Cambios sin guardar",
    noContact: "Sin contacto",
    phone: "Teléfono",
    webChat: "Chat web",
    allStatuses: "Todos los estados",
    searchContact: "Buscar contacto o resumen…",
    searchNamePhone: "Buscar nombre o teléfono…",
    updated: "Actualizado",
    source: "Origen",
    contact: "Contacto",
    summary: "Resumen",
    leadScore: "Puntaje (0–100)",
    call: "Llamada",
    leadStatusNew: "Nuevo",
    leadStatusContacted: "Contactado",
    leadStatusWon: "Ganado",
    leadStatusLost: "Perdido",
    noLeads: "Aún no hay prospectos",
    noLeadsFilter: "Ningún prospecto coincide con estos filtros",
    noLeadsHint:
      "Cuando Esmi califica un chat web o marca una llamada para seguimiento, aparecen aquí.",
    noLeadsFilterHint: "Prueba otra búsqueda o vuelve el filtro de estado a Todos.",
    loadLeadsFail: "No se pudieron cargar los prospectos",
    outcome: "Resultado",
    allOutcomes: "Todos los resultados",
    from: "Desde",
    to: "Hasta",
    language: "Idioma",
    allLanguages: "Todos los idiomas",
    english: "Inglés",
    spanish: "Español",
    recording: "Grabación",
    any: "Cualquiera",
    hasRecording: "Con grabación",
    noRecording: "Sin grabación",
    review: "Revisión",
    allReviews: "Todas las revisiones",
    needsReview: "Necesitan revisión",
    needsFollowup: "Requiere seguimiento",
    reviewed: "Revisada",
    time: "Hora",
    caller: "Llamante",
    duration: "Duración",
    loadCallsFail: "No se pudieron cargar las llamadas",
    noCalls: "Aún no hay llamadas",
    noCallsFilter: "Ninguna llamada coincide con estos filtros",
    all: "Todas",
    upcoming: "Próximas",
    past: "Pasadas",
    loadApptsFail: "No se pudieron cargar las citas",
    noAppts: "Aún no hay citas agendadas",
    noApptsFilter: "Ninguna cita coincide",
    noApptsHint:
      "La primera vez que Esmi agenda un cliente — por teléfono o en la web — aparece aquí.",
    noApptsFilterHint: "Prueba otra búsqueda o vuelve el filtro a Todas.",
    questionOptional: "Pregunta (opcional)",
    answerNote: "Respuesta / nota",
    addEntry: "Agregar entrada",
    adding: "Agregando…",
    addedOk: "Agregada — Esmi puede usarla de inmediato.",
    delete: "Eliminar",
    deleting: "Eliminando…",
    currentEntries: "Entradas actuales",
    noEntries:
      "Aún no hay entradas. Agrega un FAQ arriba y Esmi puede usarlo de inmediato.",
    uploadedPdfs: "PDFs subidos",
    businessProfile: "Perfil del negocio",
    businessName: "Nombre del negocio",
    timezone: "Zona horaria",
    timezoneHint: "Se usa para interpretar horarios y agendar citas.",
    greeting: "Saludo",
    greetingDesc:
      "Esmi abre con esta frase en la primera respuesta de una conversación nueva. Déjalo en blanco para el saludo predeterminado.",
    greetingPlaceholder: "Gracias por llamar — ¿en qué puedo ayudarle?",
    escalation: "Escalamiento",
    escalationDesc:
      "Qué pasa cuando Esmi pasa una llamada a tu equipo en lugar de resolverla sola.",
    transferPhone: "Teléfono de transferencia",
    escalationEmail: "Correo de escalamiento",
    bookingNotifications: "Avisos de reserva",
    bookingTo: "Confirmaciones de reserva a",
    locationsHours: "Ubicaciones y horarios",
    hours: "Horario",
    openDays: "Días abiertos",
    services: "Servicios",
    noServices: "Aún no hay servicios.",
    addService: "+ Agregar servicio",
    confirmTz: "Confirma el cambio de zona horaria arriba para guardar.",
    open: "Abre",
    close: "Cierra",
    transcript: "Transcripción",
    visitor: "Visitante",
    loadChatsFail: "No se pudieron cargar los chats",
    noChats: "Aún no hay chats",
    noChatsFilter: "Ningún chat coincide con estos filtros",
    inProgress: "En curso",
    closed: "Cerrado",
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
