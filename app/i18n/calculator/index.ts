import type { Locale } from "@/app/i18n/config";

/* Copy for the missed-call calculator.

   A note on the numbers, because this is the page where a marketing site is
   most tempted to invent research: nothing here asserts an industry statistic.
   Every figure the page produces comes from the four values the visitor types
   in, and the defaults are labelled as a starting point rather than a finding.
   The one external number is Orchelix's own Starter price, which we can state
   because it is ours.

   The arithmetic is deliberately simple enough to check by hand — missed calls
   times close rate times job value. A model that a caller cannot verify on the
   back of an envelope is a model they are being asked to take on faith, and
   the whole point of this page is that they should not have to. */

export type CalculatorCopy = {
  title: string;
  description: string;
  heading: string;
  lede: string;
  /* Inputs */
  callsLabel: string;
  callsHelp: string;
  missedLabel: string;
  missedHelp: string;
  valueLabel: string;
  valueHelp: string;
  closeLabel: string;
  closeHelp: string;
  /* Results */
  resultHeading: string;
  perMonth: string;
  perYear: string;
  missedPerMonth: string;
  jobsLost: string;
  costOfCover: string;
  costOfCoverNote: string;
  netHeading: string;
  netPositive: string;
  netNegative: string;
  currency: string;
  /* Method */
  methodHeading: string;
  methodBody: string;
  methodSteps: [string, string][];
  assumptionsHeading: string;
  assumptions: string[];
  /* FAQ + close */
  faqHeading: string;
  faqs: { q: string; a: string }[];
  closeHeading: string;
  closeBody: string;
  ctaHear: string;
  ctaBook: string;
  resetLabel: string;
};

const EN: CalculatorCopy = {
  title: "Missed call calculator — what unanswered calls cost you",
  description:
    "Work out what missed calls are costing your business per month and per year. Four numbers you already know, arithmetic you can check by hand, no email required.",
  heading: "What are your missed calls actually costing you",
  lede:
    "Four numbers you already know, and arithmetic simple enough to check on the back of an envelope. Nothing you type is sent anywhere, and nothing is required to see the answer.",
  callsLabel: "Inbound calls a week",
  callsHelp: "Everything that rings your business line, answered or not.",
  missedLabel: "Share you do not answer",
  missedHelp: "After hours, on another line, or nobody free to pick up.",
  valueLabel: "Average value of a job or client",
  valueHelp: "What one closed customer is worth to you, first sale or first year.",
  closeLabel: "Share of enquiries you close",
  closeHelp: "Of the callers you do speak to, how many become customers.",
  resultHeading: "What that comes to",
  perMonth: "Revenue not captured, per month",
  perYear: "Per year",
  missedPerMonth: "Calls unanswered per month",
  jobsLost: "Jobs those calls would have become",
  costOfCover: "Esmi Starter, per month",
  costOfCoverNote:
    "The published Starter price. Setup is done for you; a fourteen-day pilot is $149 and credits to your first invoice.",
  netHeading: "The comparison",
  netPositive:
    "On your own numbers, the unanswered calls cost more per month than covering them would.",
  netNegative:
    "On your own numbers, the unanswered calls cost less per month than covering them would. Worth knowing before you spend anything — come back when your volume changes.",
  currency: "$",
  methodHeading: "How this is worked out",
  methodBody:
    "No model, no benchmark, no industry study. Your four numbers, multiplied. Here it is in full so you can disagree with it precisely rather than generally.",
  methodSteps: [
    ["Missed a month", "Weekly calls × the share you miss × 4.33 weeks"],
    ["Lost jobs", "Missed calls × the share you close"],
    ["Lost revenue", "Lost jobs × your average job value"],
    ["Compared to", "Esmi Starter at $299 a month"],
  ],
  assumptionsHeading: "Where this is generous, and where it is not",
  assumptions: [
    "It assumes a missed caller does not call back. Some do. That makes the figure high.",
    "It assumes missed callers close at the same rate as answered ones. In most businesses they close lower, which also makes the figure high.",
    "It counts only first-sale value, not repeat business or referrals. That makes the figure low.",
    "It ignores the calls you answer badly because you were rushed. That also makes the figure low.",
  ],
  faqHeading: "Questions people ask first",
  faqs: [
    {
      q: "How do I know how many calls I actually miss?",
      a: "Most phone systems and mobile carriers report it. If yours does not, count the missed-call notifications on your business phone for one ordinary week and multiply. A week is enough to get the order of magnitude right, which is all this needs.",
    },
    {
      q: "Is this figure real, or a sales tool?",
      a: "It is your four numbers multiplied together, and the arithmetic is printed on the page so you can check it. The assumptions section lists where the estimate runs high and where it runs low, including the two ways it is generous to us and the two ways it is not.",
    },
    {
      q: "Do I have to give you my email to see the result?",
      a: "No. The result appears as you type and your numbers never leave your browser. There is no gate and no follow-up unless you ask for one.",
    },
    {
      q: "What would it take to actually capture those calls?",
      a: "Esmi answers your existing line — every call, after-hours only, or on no-answer, whichever you choose — qualifies the caller in English or Spanish, books into your live calendar, and leaves a transcript. Fourteen days from first call to answering.",
    },
    {
      q: "What if the number comes out small?",
      a: "Then you have your answer and it did not cost you anything to get it. A business missing four calls a month on low-value work should not buy a receptionist, artificial or otherwise.",
    },
  ],
  closeHeading: "Hear what those callers would have heard",
  closeBody:
    "There is a real recording on the demo page and the same agent in a chat you can type into. Two minutes, no form.",
  ctaHear: "Hear a real call",
  ctaBook: "Book a pilot",
  resetLabel: "Reset to the starting numbers",
};

const ES: CalculatorCopy = {
  title: "Calculadora de llamadas perdidas — cuánto le cuestan",
  description:
    "Calcule cuánto le cuestan las llamadas sin contestar al mes y al año. Cuatro números que usted ya conoce, aritmética que puede verificar a mano y sin dar correo electrónico.",
  heading: "Cuánto le están costando de verdad las llamadas perdidas",
  lede:
    "Cuatro números que usted ya conoce y una aritmética lo bastante simple para verificarla en una servilleta. No se envía a ningún lado nada de lo que usted escribe, y no hace falta nada para ver el resultado.",
  callsLabel: "Llamadas entrantes por semana",
  callsHelp: "Todo lo que suena en su línea de negocio, contestado o no.",
  missedLabel: "Porcentaje que no contesta",
  missedHelp: "Fuera de horario, en otra línea, o sin nadie libre para atender.",
  valueLabel: "Valor promedio de un trabajo o cliente",
  valueHelp: "Lo que vale un cliente cerrado: la primera venta o el primer año.",
  closeLabel: "Porcentaje de consultas que cierra",
  closeHelp: "De la gente con la que sí habla, cuántos se vuelven clientes.",
  resultHeading: "A cuánto sale",
  perMonth: "Ingreso no capturado, por mes",
  perYear: "Por año",
  missedPerMonth: "Llamadas sin contestar al mes",
  jobsLost: "Trabajos en que se habrían convertido",
  costOfCover: "Esmi Starter, por mes",
  costOfCoverNote:
    "El precio publicado del plan Starter. La configuración la hacemos nosotros; el piloto de catorce días son $149 y se acreditan a su primera factura.",
  netHeading: "La comparación",
  netPositive:
    "Con sus propios números, las llamadas sin contestar cuestan más al mes de lo que costaría cubrirlas.",
  netNegative:
    "Con sus propios números, las llamadas sin contestar cuestan menos al mes de lo que costaría cubrirlas. Vale la pena saberlo antes de gastar nada: vuelva cuando cambie su volumen.",
  currency: "$",
  methodHeading: "Cómo se calcula esto",
  methodBody:
    "Sin modelo, sin referencia de mercado, sin estudio del sector. Sus cuatro números, multiplicados. Aquí está completo para que pueda estar en desacuerdo con precisión y no en general.",
  methodSteps: [
    ["Perdidas al mes", "Llamadas por semana × el porcentaje que pierde × 4.33 semanas"],
    ["Trabajos perdidos", "Llamadas perdidas × el porcentaje que cierra"],
    ["Ingreso perdido", "Trabajos perdidos × su valor promedio por trabajo"],
    ["Comparado con", "Esmi Starter a $299 al mes"],
  ],
  assumptionsHeading: "Dónde es generoso este cálculo y dónde no",
  assumptions: [
    "Supone que quien no fue atendido no vuelve a llamar. Algunos vuelven. Eso hace que la cifra salga alta.",
    "Supone que las llamadas perdidas cerrarían al mismo ritmo que las contestadas. En la mayoría de los negocios cierran menos, lo que también sube la cifra.",
    "Cuenta solo el valor de la primera venta, no la recompra ni los referidos. Eso hace que la cifra salga baja.",
    "No cuenta las llamadas que contesta mal por ir con prisa. Eso también la hace salir baja.",
  ],
  faqHeading: "Preguntas que hacen primero",
  faqs: [
    {
      q: "¿Cómo sé cuántas llamadas pierdo realmente?",
      a: "La mayoría de las centrales telefónicas y de las operadoras móviles lo reportan. Si la suya no, cuente los avisos de llamada perdida en su teléfono de negocio durante una semana normal y multiplique. Una semana basta para acertar el orden de magnitud, que es todo lo que hace falta aquí.",
    },
    {
      q: "¿Esta cifra es real o es una herramienta de venta?",
      a: "Son sus cuatro números multiplicados, y la aritmética está impresa en la página para que la verifique. La sección de supuestos dice dónde el cálculo sale alto y dónde sale bajo, incluidas las dos formas en que nos favorece y las dos en que no.",
    },
    {
      q: "¿Tengo que dar mi correo para ver el resultado?",
      a: "No. El resultado aparece mientras escribe y sus números nunca salen de su navegador. No hay muro ni seguimiento a menos que usted lo pida.",
    },
    {
      q: "¿Qué haría falta para capturar de verdad esas llamadas?",
      a: "Esmi contesta su línea actual —todas las llamadas, solo fuera de horario, o solo cuando nadie atiende, como usted elija—, califica al cliente en español o inglés, agenda en su calendario real y deja transcripción. Catorce días desde la primera llamada hasta que empieza a contestar.",
    },
    {
      q: "¿Y si el número sale pequeño?",
      a: "Entonces ya tiene su respuesta y no le costó nada obtenerla. Un negocio que pierde cuatro llamadas al mes en trabajos de bajo valor no debería contratar una recepcionista, ni artificial ni de las otras.",
    },
  ],
  closeHeading: "Escuche lo que habrían escuchado esos clientes",
  closeBody:
    "Hay una grabación real en la página de demostración y el mismo agente en un chat donde puede escribir. Dos minutos, sin formulario.",
  ctaHear: "Escuche una llamada real",
  ctaBook: "Agendar un piloto",
  resetLabel: "Volver a los números iniciales",
};

const BY_LOCALE: Record<Locale, CalculatorCopy> = { en: EN, es: ES };

export function getCalculatorCopy(locale: Locale): CalculatorCopy {
  return BY_LOCALE[locale];
}

/** Orchelix Starter, published price. The one number on the page that is ours. */
export const STARTER_MONTHLY = 299;

/** Weeks in an average month. 52 / 12, not 4 — the difference is 8% a year. */
export const WEEKS_PER_MONTH = 4.33;

export const DEFAULTS = {
  callsPerWeek: 60,
  missedPct: 25,
  jobValue: 450,
  closePct: 35,
};
