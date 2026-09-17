/* Competitive truth overlay — 2026-09-16. Deep-merged onto the ES catalogue. */
import type { Messages } from "../en";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const patch = {
  common: {
    startWithOneWorkflowBody:
      "Un piloto de $149 en tu línea real por catorce días. Fuera de horario, Google Calendar + SMS, inglés y español incluidos.",
    journey: [
      { title: "Escucha", body: "Una grabación real de Esmi en este sitio" },
      { title: "Agenda", body: "Un piloto de $149 en tu línea real" },
      { title: "Mapa", body: "Atención fuera de horario en un solo proceso" },
      { title: "Opera", body: "Cada acción en el registro del operador" },
    ],
  },
  home: {
    heroLede:
      "Fuera de horario en tu línea — Esmi contesta, agenda en Google Calendar y confirma por SMS. Inglés y español incluidos.",
    exploreEsmiBody:
      "Atención de llamadas 24/7 que agenda citas, deriva las urgentes y trabaja en inglés y español — una recepcionista con IA, no una persona.",
    esmiBody:
      "Atención telefónica 24/7 que agenda citas, deriva lo urgente y trabaja en inglés y español — una recepcionista con IA, no una persona. Cada llamada termina con una transcripción completa y un motivo.",
    stages: [
      {
        day: "Día 1",
        title: "Documentar el proceso",
        desc: "Un consultor senior se sienta con tu equipo y escribe el proceso que vamos a automatizar primero. El documento se queda contigo.",
      },
      {
        day: "Día 14",
        title: "Primer agente en operación",
        desc: "Tu agente entra en operación en tu línea telefónica y en Google Calendar — con un tablero que puedes leer el lunes por la mañana.",
      },
      {
        day: "Continuo",
        title: "Cada acción auditada",
        desc: "Cada llamada, correo y línea conciliada queda registrada. Aprueba, revierte o corrige con un clic.",
      },
      {
        day: "Cuando decidas",
        title: "Suma el siguiente agente",
        desc: "Solo cuando el primero se haya ganado el lugar. Misma consola, mismo consultor, mismo registro.",
      },
    ],
  },
  pages: {
    solutions: {
      esmiCapabilities: [
        ["Disponibilidad", "Noches, fines de semana y feriados — la línea nunca queda sola"],
        ["Idiomas", "Inglés y español incluidos de forma nativa; francés como adicional; cambia a media llamada"],
        ["Agendamiento", "Google Calendar en vivo (agendar/reprogramar), con confirmación por SMS"],
        ["Derivación", "Las emergencias fuera de horario llegan a la persona de guardia, no al buzón"],
        ["Registro", "Cada llamada cierra con transcripción, motivo y estado"],
        ["Ajustes", "Se corrige editando un documento — sin necesidad de un programador"],
      ] as [string, string][],
      revopsCapabilities: [
        ["Captación", "Formularios, llamadas, redes pagadas y referidos en un solo pipeline"],
        ["Calificación", "Un puntaje defendible, según perfil, señales de intención e historial"],
        ["Seguimiento", "Secuencias de correo, SMS y llamada escritas con tu voz, no una plantilla"],
        ["Entrega", "Tus vendedores reciben un resumen con puntos de conversación, no un registro vacío"],
        ["CRM", "Entrega al CRM que ya usas — cableado por proyecto (hoja de ruta, no un catálogo de conectores nativos)"],
        ["Reportes", "Un tablero de los lunes: qué avanzó, qué se detuvo y por qué"],
      ] as [string, string][],
    },
    verticals: {
      homeServices: {
        description:
          "Hecho para negocios en Jobber que pierden trabajos cuando suena el teléfono y nadie contesta. Esmi contesta llamadas de climatización, plomería, techado y electricidad fuera de horario — inglés y español — y agenda en Google Calendar.",
        lede: "Hecho para negocios en Jobber que pierden trabajos cuando suena el teléfono y nadie contesta. Una recepcionista bilingüe para negocios de servicios del hogar. Esmi contesta fuera de horario, los fines de semana y mientras tu cuadrilla está en un trabajo — califica el servicio y lo agenda en Google Calendar con confirmación por SMS.",
      },
    },
    pricing: {
      description:
        "Esmi Local / Starter cuesta $299/mes + $499 de implementación. Un piloto de 14 días cuesta $149. Esmi contesta fuera de horario, agenda en Google Calendar con SMS y deja cada llamada, cita y prospecto en un solo tablero.",
      lede: "Esmi Local / Starter cubre fuera de horario en una línea — $299/mes + $499 de implementación. Esmi contesta el teléfono y el chat web, agenda en Google Calendar con confirmación por SMS y deja cada llamada, cita y prospecto en un solo tablero. La configuración la hacemos nosotros.",
      startPilot: "Empieza un piloto de $149",
      startThePilot: "Empieza un piloto de $149",
      startPilotShort: "Piloto $149",
      scheduleLede:
        "Local / Starter es el paquete fuera de horario: una línea, noches y fines de semana contestados, inglés y español incluidos. Growth y Scale suman capacidad — todos los planes incluyen el tablero completo.",
      values: {
        starterChannels: "Voz · fuera de horario",
        starterBooking: "1 Google Calendar + SMS",
      },
      finePrint:
        "Esmi Local / Starter cuesta $299/mes + $499 de implementación. Disponible mes a mes. Con facturación anual: dos meses sin costo y sin cargo de implementación. La implementación cubre número, Google Calendar, base de conocimiento y puesta en marcha. El piloto son $149 por 14 días con implementación incluida, acreditados a tu primera factura si continúas. Inglés y español están incluidos en todos los planes — no son un adicional. Los minutos son de voz y no se acumulan. Impuestos aparte donde apliquen.",
      pilotHeading: "Fuera de horario en tu línea, por catorce días",
      pilotBody:
        "$149 por 14 días, con implementación completa incluida, acreditados a tu primer mes si continúas. Un número, hasta 75 minutos, atención fuera de horario, un Google Calendar + SMS, inglés y español incluidos, el tablero completo y una revisión de cierre con tu consultor.",
      included: [
        "Voz de IA natural, 24/7 — no es una recepcionista humana",
        "Atención fuera de horario",
        "Inglés y español incluidos",
        "Google Calendar (agendar/reprogramar) + confirmación por SMS",
        "Escalamiento a tu equipo con contexto",
        "Grabaciones y transcripciones",
        "Bandeja de citas y prospectos",
        "Actividad fuera de horario en el resumen",
      ],
      addOns: [
        ["Número adicional", "$49 / mes"],
        ["500 minutos adicionales", "$99"],
        ["Paquete de francés", "A medida"],
        ["Integración CRM / HighLevel", "A medida"],
      ] as [string, string][],
      afterStart: [
        ["Paso uno", "Aprendemos tus horarios, reglas de derivación, servicios y Google Calendar."],
        ["Paso dos", "Entra en operación — número, agente fuera de horario, agenda, acceso al tablero."],
        ["Paso tres", "Ves cada llamada fuera de horario, cita, prospecto y grabación."],
      ] as [string, string][],
      faq: [
        {
          q: "¿Necesito personal técnico para implementarlo?",
          a: "No. La implementación la hacemos nosotros: Orchelix configura tu número, el agente, la base de conocimiento y el calendario. Tú lo revisas antes de que entre en operación; no construyes nada.",
        },
        {
          q: "¿Esmi agenda citas reales o solo toma mensajes?",
          a: "Citas reales. Esmi lee la disponibilidad de tu Google Calendar en vivo y agenda, reprograma o cancela directamente ahí, luego confirma por SMS — hoy no hay Calendly, Acuity ni Microsoft 365 como agenda en vivo, y no queda un mensaje para capturar a mano.",
        },
        {
          q: "¿Local / Starter es solo para fuera de horario?",
          a: "Está pensado para fuera de horario en una línea: noches, fines de semana, feriados y las llamadas que tu recepción no puede tomar. En horario de atención puede quedar detrás de tu recepcionista o contestar la línea de frente. Mismo número, mismo Google Calendar, mismo tablero. Un piloto de 14 días cuesta $149.",
        },
        {
          q: "¿Qué pasa cuando Esmi no puede resolver algo?",
          a: "Escala a una persona — por transferencia o notificación, según tu configuración — con el contexto de la conversación hasta ese punto, para que nadie tenga que repetir nada.",
        },
        {
          q: "¿Puedo conservar mi número actual?",
          a: "Cada plan incluye números locales nuevos para Esmi. Desviar tu número actual hacia él, o portarlo, suele ser posible — cuéntanos tu configuración y lo confirmamos durante la puesta en marcha.",
        },
        {
          q: "¿Hay contrato?",
          a: "No. Todos los planes son mes a mes, cancelas cuando quieras — más un cargo único de implementación que cubre número, calendario, base de conocimiento y puesta en marcha. Si pagas anual, son dos meses sin costo y la implementación queda sin cargo.",
        },
        {
          q: "¿Qué pasa si excedo mis minutos incluidos?",
          a: "Se factura la tarifa de excedente por minuto de tu plan. Esmi nunca deja de contestar por haber llegado a un límite — el excedente es una línea en la factura, no una interrupción del servicio.",
        },
      ],
      scheduleCaption: "Tarifario de planes Orchelix — Local / Starter, Growth y Scale",
    },
  },
} as const satisfies DeepPartial<Messages>;

export default patch;
