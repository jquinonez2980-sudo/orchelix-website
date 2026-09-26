/* Demo-first copy overlay — 2026-09-25 (Jorge-approved, copy only).
   Deep-merged onto the ES catalogue AFTER the 2026-09-16 competitive overlay.
   No prices change here: every figure matches /pricing. */
import type { Messages } from "../en";
import base from "../es";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const PRICE_Q = "¿Cuánto cuesta una recepcionista de IA?";

const patch = {
  home: {
    heroTitle:
      "La llamada de las 9 pm sin calefacción se va al buzón. La del paciente nuevo suena sin respuesta en una recepción saturada.",
    heroLede:
      "Cuando la cuadrilla está en un trabajo o la recepción está saturada, las llamadas se quedan sin contestar y los clientes agendan con quien sí contesta. Esmi, la recepcionista con IA de Orchelix, contesta 24/7 en inglés y español, agenda en Google Calendar y confirma por SMS.",
  },
  pages: {
    aiReceptionist: {
      faq: base.pages.aiReceptionist.faq.map((f) =>
        f.q === PRICE_Q
          ? {
              ...f,
              a: "Esmi Local / Starter cuesta $299/mes + $499 de implementación. Growth cuesta $599/mes + $799 de implementación, y Scale $999/mes con implementación a medida — la configuración la hacemos nosotros. Un piloto de catorce días cuesta $149, acreditado a tu primera factura si continúas.",
            }
          : f,
      ),
    },
    verticals: {
      homeServices: {
        lede: "Hecho para negocios en Jobber que pierden trabajos cuando suena el teléfono y nadie contesta. Una recepcionista bilingüe con IA para negocios de servicios del hogar. Esmi contesta fuera de horario, los fines de semana y mientras tu cuadrilla está en un trabajo — califica el servicio y lo agenda en Google Calendar con confirmación por SMS.",
        closeBody:
          "¿Escuchaste a Esmi contestar? Pruébala en tu propia línea. Un piloto de 14 días cuesta $149. Después, Esmi Local cuesta $299/mes + $499 de implementación.",
      },
    },
  },
} satisfies DeepPartial<Messages>;

export default patch;
