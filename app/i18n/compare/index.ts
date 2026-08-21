import type { Locale } from "@/app/i18n/config";

/* Comparison pages.

   Scope decision worth recording, because the obvious version of this feature
   is the wrong one: these compare Esmi against ALTERNATIVES (a hire, a
   voicemail box, a call centre), not against NAMED COMPETITORS. Named-brand
   comparison pages rank well and convert well, and they are also the fastest
   way to publish a claim about another company's pricing that was true when
   it was written and defamatory six months later. If those pages get built,
   they need verified, dated, cited figures per competitor and a review
   cadence — a different piece of work from this one.

   Every external figure below is attributed inline, with its date. The BLS
   median is the only third-party number on these pages and it appears with
   its source in the visible copy, not just in a comment. */

export type CompareRow = { label: string; esmi: string; other: string };
export type CompareCost = { label: string; value: string; note?: string };

export type ComparePage = {
  slug: string;
  /** What Esmi is being compared against, as a noun phrase. */
  other: string;
  title: string;
  description: string;
  hero: { headline: string; sub: string };
  rowsHeading: string;
  rows: CompareRow[];
  costHeading: string;
  costLede: string;
  costs: CompareCost[];
  /** The section that makes the rest believable. Required, not optional. */
  honestHeading: string;
  honestBody: string;
  honestCases: string[];
  faqs: { q: string; a: string }[];
  schema: { about: string };
};

type Chrome = {
  hubTitle: string;
  hubDescription: string;
  hubHeading: string;
  hubLede: string;
  esmiLabel: string;
  closeHeading: string;
  closeBody: string;
  otherComparisons: string;
  sourceNote: string;
};

const CHROME: Record<Locale, Chrome> = {
  en: {
    hubTitle: "Esmi compared",
    hubDescription:
      "Honest comparisons between an AI receptionist and the alternatives — hiring, voicemail, and a call centre — including where the alternative is the better call.",
    hubHeading: "What you would otherwise do",
    hubLede:
      "Three comparisons, each with a section saying when the other option wins. A comparison page that always concludes in favour of the company that wrote it is an advertisement wearing a lab coat.",
    esmiLabel: "Esmi",
    closeHeading: "Hear it before you decide",
    closeBody:
      "There is a real recording on the demo page and the same agent in a chat you can type into. No form, no scheduling — the product doing its job.",
    otherComparisons: "Other comparisons",
    sourceNote: "Source",
  },
  es: {
    hubTitle: "Esmi comparado",
    hubDescription:
      "Comparaciones honestas entre una recepcionista con IA y las alternativas —contratar, buzón de voz y call center—, incluyendo cuándo la alternativa es la mejor decisión.",
    hubHeading: "Lo que haría en su lugar",
    hubLede:
      "Tres comparaciones, cada una con una sección que dice cuándo gana la otra opción. Una página de comparación que siempre concluye a favor de quien la escribió es publicidad con bata de laboratorio.",
    esmiLabel: "Esmi",
    closeHeading: "Escúchelo antes de decidir",
    closeBody:
      "Hay una grabación real en la página de demostración y el mismo agente en un chat donde puede escribir. Sin formulario y sin agendar: el producto haciendo su trabajo.",
    otherComparisons: "Otras comparaciones",
    sourceNote: "Fuente",
  },
};

const EN: ComparePage[] = [
  {
    slug: "hiring-a-receptionist",
    other: "hiring a receptionist",
    title: "AI receptionist vs hiring a receptionist — the real cost",
    description:
      "What a receptionist actually costs against what an AI receptionist costs, using the US median wage. Includes the three situations where hiring a person is clearly the better decision.",
    hero: {
      headline: "One of these takes holidays, and it is not the cheap one",
      sub: "A fair comparison has to price the whole hire — not the wage, the wage plus the hours nobody is at the desk. Here is that arithmetic, and here is where a person still wins.",
    },
    rowsHeading: "What each one actually covers",
    rows: [
      {
        label: "Hours covered",
        esmi: "Every hour. Nights, weekends, holidays, and the fortnight in July.",
        other: "Roughly 2,000 working hours a year, of the 8,760 that exist.",
      },
      {
        label: "Calls at once",
        esmi: "All of them. Simultaneous calls are not a capacity tier.",
        other: "One. The second caller holds, and a share of them hang up.",
      },
      {
        label: "Languages",
        esmi: "English and Spanish natively, switching mid-call. French as an add-on.",
        other: "Whatever that person speaks, which is usually one language well.",
      },
      {
        label: "Consistency",
        esmi: "Asks the same qualifying questions on call four hundred as on call one.",
        other: "Human, which is better on the good days and worse at 4:45 on a Friday.",
      },
      {
        label: "Judgement",
        esmi: "Escalates when a call needs a person, with the conversation attached.",
        other: "Reads the room, hears the hesitation, and handles the angry client.",
      },
      {
        label: "The record",
        esmi: "Transcript, disposition, and reason on every call, reviewable.",
        other: "What got written on the pad, when there was time to write it.",
      },
      {
        label: "Ramp",
        esmi: "Fourteen days from the first call.",
        other: "Weeks to hire, then weeks to train, then again when they leave.",
      },
    ],
    costHeading: "The arithmetic",
    costLede:
      "Wage alone understates a hire and everyone knows it, so this counts what an employer actually spends. The wage figure is the US median rather than a number we chose.",
    costs: [
      {
        label: "Receptionist, median annual wage (US)",
        value: "$37,230",
        note: "US Bureau of Labor Statistics, Occupational Outlook Handbook, May 2024 — $17.90 an hour.",
      },
      {
        label: "Employer payroll taxes and insurance",
        value: "+ 10–15%",
        note: "Varies by state and coverage. Not optional, and not in the wage.",
      },
      {
        label: "Coverage for holiday, sickness, and turnover",
        value: "Variable",
        note: "BLS records roughly 128,500 receptionist openings a year against essentially flat employment — that churn is a recurring cost, not a one-off.",
      },
      {
        label: "Hours of the year covered",
        value: "~2,000 of 8,760",
        note: "A full-time hire covers under a quarter of the hours your line can ring.",
      },
      {
        label: "Esmi Starter",
        value: "$299 / month",
        note: "$3,588 a year, setup included, covering all 8,760 hours. A fourteen-day pilot is $149, credited to your first invoice.",
      },
    ],
    honestHeading: "When hiring a person is the right call",
    honestBody:
      "There are businesses that should not buy this, and pretending otherwise would make everything above less believable. Three cases where a hire is the better decision:",
    honestCases: [
      "Your front desk does more than answer the phone. If the same person greets walk-ins, handles payments, chases records, and manages the room, you are not comparing like with like — you are pricing a receptionist against a phone line.",
      "Your calls are emotionally loaded. Bereavement, medical distress, a client in crisis. Esmi escalates these rather than handling them, and if most of your inbound looks like this the escalation is the whole job.",
      "Your volume is genuinely low. A dozen calls a week on modest jobs does not justify either option. Run the calculator; if the number is small, believe it.",
    ],
    faqs: [
      {
        q: "Is this meant to replace my front desk?",
        a: "Usually not. The common configuration is that Esmi takes what the desk cannot — after hours, overflow, the second and third simultaneous caller — and the person keeps the work that needs a person. Replacing a good front desk is rarely the argument that makes sense.",
      },
      {
        q: "Where does the $37,230 come from?",
        a: "The US Bureau of Labor Statistics Occupational Outlook Handbook, median annual wage for receptionists as of May 2024. It is a national median, so your local figure will differ — in higher-cost metros, upward.",
      },
      {
        q: "What about a part-time hire?",
        a: "Fairer on cost and worse on coverage: part-time narrows the hours further, and the calls you miss are already concentrated in the hours nobody is there. It solves the price objection by making the original problem larger.",
      },
      {
        q: "What happens when Esmi cannot handle a call?",
        a: "It escalates to your team with the full conversation attached — who called, what they need, what was already said — so the person taking over is not starting cold.",
      },
    ],
    schema: { about: "AI receptionist compared with hiring an in-house receptionist" },
  },

  {
    slug: "voicemail",
    other: "voicemail",
    title: "AI receptionist vs voicemail — what the beep costs you",
    description:
      "Voicemail is free and that is the entire argument for it. What it costs in unreturned calls, and the two situations where it is still the right answer.",
    hero: {
      headline: "Voicemail is free, which is a different thing from cheap",
      sub: "A voicemail box does not answer the question, book the appointment, or stop the caller dialling the next number. It records that you were not there.",
    },
    rowsHeading: "What each one actually does",
    rows: [
      {
        label: "What the caller gets",
        esmi: "A conversation, an answer, and usually an appointment.",
        other: "A beep, and the job of explaining themselves to nobody.",
      },
      {
        label: "What you get",
        esmi: "A qualified caller, booked, with a transcript and a reason.",
        other: "A name, a number, and a callback you now owe.",
      },
      {
        label: "Booking",
        esmi: "Into your live calendar, on the call, with a confirmation sent.",
        other: "None. The booking happens later, if you reach them.",
      },
      {
        label: "The callback",
        esmi: "Not required. The transaction already finished.",
        other: "Required, and it is the step where most of the loss happens.",
      },
      {
        label: "Out of hours",
        esmi: "Identical to business hours — the caller cannot tell.",
        other: "Identical to business hours, which is the problem.",
      },
      {
        label: "Cost",
        esmi: "From $299 a month.",
        other: "Free, plus every caller who dialled the next result instead.",
      },
    ],
    costHeading: "Where the cost actually sits",
    costLede:
      "Voicemail has no invoice, so its cost has to be counted in the calls it does not convert. These are the three places it leaks.",
    costs: [
      {
        label: "Callers who do not leave a message",
        value: "The largest share",
        note: "Someone comparing three providers does not narrate their problem to a machine. They hang up and call the next one — and you never learn this happened.",
      },
      {
        label: "Callers who leave a message and go elsewhere anyway",
        value: "The second largest",
        note: "The message was insurance, not a commitment. Whoever answers live first usually keeps the job.",
      },
      {
        label: "The callback you owe",
        value: "Your time, at your rate",
        note: "Every message is unpaid admin work transferred from the caller to you, performed at the end of a day already full.",
      },
      {
        label: "What your own numbers say",
        value: "Calculate it",
        note: "The missed-call calculator turns this into a figure using your call volume, close rate, and job value rather than ours.",
      },
    ],
    honestHeading: "When voicemail is genuinely fine",
    honestBody:
      "Two cases where adding anything would be spending money to solve a problem you do not have:",
    honestCases: [
      "Your inbound is almost entirely existing clients on scheduled matters. They will leave a message, they will wait, and the relationship is not decided on the phone.",
      "Your volume is low and your work is high-touch enough that you would rather call everyone back personally. That is a real strategy, and automating the first touch would make it worse.",
    ],
    faqs: [
      {
        q: "Can I keep voicemail as a fallback?",
        a: "Yes, and most operators do. Esmi answers first; anything it cannot handle escalates, and voicemail stays underneath as the last resort rather than the first response.",
      },
      {
        q: "Do callers hate talking to AI more than voicemail?",
        a: "Listen to the demo and decide for yourself rather than take a vendor's word for it. What we would say is that the comparison is not against a person — it is against a beep, which nobody has ever preferred.",
      },
      {
        q: "How would I even know how many callers hang up on voicemail?",
        a: "Most phone systems report missed calls separately from messages left. The gap between those two numbers is the leak, and it is usually larger than people expect.",
      },
      {
        q: "What if I only want it after hours?",
        a: "That is a supported configuration. You forward on no-answer or by schedule, and your daytime handling stays exactly as it is.",
      },
    ],
    schema: { about: "AI receptionist compared with voicemail" },
  },

  {
    slug: "call-center",
    other: "a call centre",
    title: "AI receptionist vs a call centre or answering service",
    description:
      "How an AI receptionist differs from an outsourced call centre on cost structure, script depth, and what happens at 2am — plus when a call centre is the better fit.",
    hero: {
      headline: "One takes messages. The other finishes the transaction",
      sub: "A call centre is people, which is its strength and its cost structure. The question is whether the calls you are outsourcing need a person, or need to be finished.",
    },
    rowsHeading: "Where the two differ",
    rows: [
      {
        label: "What happens on the call",
        esmi: "Qualified, answered, booked into your live calendar.",
        other: "Usually captured and relayed. You still make the booking.",
      },
      {
        label: "Cost structure",
        esmi: "A flat monthly plan. Volume does not change the invoice.",
        other: "Typically per minute or per call — busy months cost more.",
      },
      {
        label: "Peak load",
        esmi: "Unlimited simultaneous calls. A storm week is unremarkable.",
        other: "Staffed capacity. Peaks queue, and overage rates apply.",
      },
      {
        label: "Script depth",
        esmi: "Trained on your services, pricing rules, and calendar.",
        other: "A script and a form, shared with the other accounts on shift.",
      },
      {
        label: "Language",
        esmi: "English and Spanish natively, switching mid-call.",
        other: "Depends on who is rostered when the call lands.",
      },
      {
        label: "Record",
        esmi: "Transcript, disposition, and reason on every call.",
        other: "A message, and recordings if your plan includes them.",
      },
      {
        label: "Judgement on hard calls",
        esmi: "Escalates to you with the conversation attached.",
        other: "A person is already there, which for some calls is the point.",
      },
    ],
    costHeading: "Reading the two invoices",
    costLede:
      "The comparison is not really price against price — it is a fixed cost against a variable one, and which is better depends on the shape of your month.",
    costs: [
      {
        label: "Esmi Starter",
        value: "$299 / month",
        note: "Flat. The busy month and the quiet month cost the same, which is the whole point in a seasonal business.",
      },
      {
        label: "Call centre, typical structure",
        value: "Per minute or per call",
        note: "Priced on usage, so cost rises exactly when volume does — in the weeks you can least afford a surprise line item.",
      },
      {
        label: "The thing to actually compare",
        value: "Cost per booked job",
        note: "Not cost per call. A cheaper call that ends in a message you still have to return is not cheaper.",
      },
    ],
    honestHeading: "When a call centre is the better choice",
    honestBody:
      "Three situations where outsourcing to people is the right answer and we would say so on the call:",
    honestCases: [
      "Your calls need real human judgement most of the time — sensitive intake, distressed callers, complex triage that changes case by case. Escalation is the wrong primary path if it is the path for most calls.",
      "You need a language we do not cover natively and cannot add. English and Spanish are native and French is an add-on; beyond that, a staffed service with the right people is genuinely better than an agent that escalates.",
      "You need a person physically dispatching, coordinating field crews live, or making judgement calls with authority you would not delegate to software.",
    ],
    faqs: [
      {
        q: "Can I use both?",
        a: "Yes, and it is a sensible pattern. Esmi takes the volume — the routine bookings and qualification — and the calls it escalates route to your staffed service. You pay per minute only for the calls that actually needed a person.",
      },
      {
        q: "Does Esmi charge per minute?",
        a: "No. Plans are flat monthly, so a busy month and a quiet month cost the same. For a seasonal business that difference tends to matter more than the headline rate.",
      },
      {
        q: "How is this different from an answering service?",
        a: "An answering service takes a message and forwards it; you still call back. Esmi finishes the interaction — answers the question, qualifies, and books on your calendar before the caller hangs up.",
      },
      {
        q: "What about accents and background noise?",
        a: "A fair question and the honest answer is that it varies by line quality. Run the demo, and better still run the pilot on your actual number for fourteen days, which is what the $149 is for.",
      },
    ],
    schema: { about: "AI receptionist compared with an outsourced call centre or answering service" },
  },
];

const ES: ComparePage[] = [
  {
    slug: "hiring-a-receptionist",
    other: "contratar a una recepcionista",
    title: "Recepcionista con IA vs contratar a una persona — el costo real",
    description:
      "Lo que cuesta de verdad una recepcionista frente a lo que cuesta una recepcionista con IA, usando el salario mediano de EE. UU. Incluye las tres situaciones en que contratar a una persona es claramente lo mejor.",
    hero: {
      headline: "Una de las dos toma vacaciones, y no es la barata",
      sub: "Una comparación justa tiene que costear la contratación completa: no el sueldo, sino el sueldo más las horas en que no hay nadie en el escritorio. Aquí está esa cuenta, y aquí está dónde una persona sigue ganando.",
    },
    rowsHeading: "Qué cubre realmente cada una",
    rows: [
      {
        label: "Horas cubiertas",
        esmi: "Todas. Noches, fines de semana, feriados y las dos semanas de julio.",
        other: "Unas 2,000 horas laborales al año, de las 8,760 que existen.",
      },
      {
        label: "Llamadas a la vez",
        esmi: "Todas. Las llamadas simultáneas no son un nivel de plan.",
        other: "Una. El segundo cliente espera, y una parte de ellos cuelga.",
      },
      {
        label: "Idiomas",
        esmi: "Español e inglés nativos, con cambio a mitad de llamada. Francés como complemento.",
        other: "Lo que hable esa persona, que suele ser un idioma bien.",
      },
      {
        label: "Consistencia",
        esmi: "Hace las mismas preguntas de calificación en la llamada cuatrocientos que en la primera.",
        other: "Humana: mejor en los días buenos y peor a las 4:45 de un viernes.",
      },
      {
        label: "Criterio",
        esmi: "Escala cuando la llamada necesita una persona, con la conversación adjunta.",
        other: "Lee la situación, escucha la duda y aguanta al cliente molesto.",
      },
      {
        label: "El registro",
        esmi: "Transcripción, resolución y motivo en cada llamada, revisables.",
        other: "Lo que se alcanzó a anotar, cuando hubo tiempo de anotarlo.",
      },
      {
        label: "Puesta en marcha",
        esmi: "Catorce días desde la primera llamada.",
        other: "Semanas para contratar, semanas para capacitar, y otra vez cuando se va.",
      },
    ],
    costHeading: "La cuenta",
    costLede:
      "El sueldo solo subestima una contratación y todo el mundo lo sabe, así que esto cuenta lo que un empleador gasta de verdad. La cifra salarial es la mediana de EE. UU., no un número que hayamos elegido.",
    costs: [
      {
        label: "Recepcionista, salario mediano anual (EE. UU.)",
        value: "$37,230",
        note: "Oficina de Estadísticas Laborales de EE. UU. (BLS), Occupational Outlook Handbook, mayo de 2024 — $17.90 por hora.",
      },
      {
        label: "Impuestos sobre nómina y seguros del empleador",
        value: "+ 10–15%",
        note: "Varía según el estado y la cobertura. No es opcional y no está en el sueldo.",
      },
      {
        label: "Cobertura por vacaciones, incapacidad y rotación",
        value: "Variable",
        note: "El BLS registra unas 128,500 vacantes de recepcionista al año con un empleo prácticamente plano: esa rotación es un costo recurrente, no de una sola vez.",
      },
      {
        label: "Horas del año cubiertas",
        value: "~2,000 de 8,760",
        note: "Una contratación de tiempo completo cubre menos de una cuarta parte de las horas en que puede sonar su línea.",
      },
      {
        label: "Esmi Starter",
        value: "$299 / mes",
        note: "$3,588 al año, configuración incluida, cubriendo las 8,760 horas. El piloto de catorce días son $149, acreditados a su primera factura.",
      },
    ],
    honestHeading: "Cuándo contratar a una persona es lo correcto",
    honestBody:
      "Hay negocios que no deberían comprar esto, y fingir lo contrario haría menos creíble todo lo anterior. Tres casos en que contratar es la mejor decisión:",
    honestCases: [
      "Su recepción hace más que contestar el teléfono. Si la misma persona recibe a quien entra, cobra, persigue expedientes y maneja la sala, no está comparando lo mismo: está costeando una recepcionista contra una línea telefónica.",
      "Sus llamadas tienen carga emocional. Duelos, urgencias médicas, un cliente en crisis. Esmi escala esas llamadas en vez de manejarlas, y si la mayoría de lo que entra se parece a esto, la escalada es todo el trabajo.",
      "Su volumen es realmente bajo. Una docena de llamadas por semana en trabajos modestos no justifica ninguna de las dos opciones. Use la calculadora; si el número sale pequeño, créalo.",
    ],
    faqs: [
      {
        q: "¿Esto pretende reemplazar mi recepción?",
        a: "Normalmente no. La configuración común es que Esmi toma lo que la recepción no puede —fuera de horario, el desborde, el segundo y tercer cliente simultáneo— y la persona conserva el trabajo que necesita una persona. Reemplazar una buena recepción rara vez es el argumento que tiene sentido.",
      },
      {
        q: "¿De dónde sale la cifra de $37,230?",
        a: "Del Occupational Outlook Handbook de la Oficina de Estadísticas Laborales de EE. UU., salario mediano anual de recepcionistas a mayo de 2024. Es una mediana nacional, así que su cifra local será distinta: en ciudades más caras, más alta.",
      },
      {
        q: "¿Y una contratación de medio tiempo?",
        a: "Más justa en costo y peor en cobertura: el medio tiempo reduce aún más las horas, y las llamadas que pierde ya están concentradas justo en las horas en que no hay nadie. Resuelve la objeción de precio agrandando el problema original.",
      },
      {
        q: "¿Qué pasa cuando Esmi no puede con una llamada?",
        a: "Escala a su equipo con la conversación completa adjunta —quién llamó, qué necesita y qué se dijo ya—, para que quien la toma no empiece de cero.",
      },
    ],
    schema: { about: "Recepcionista con IA comparada con contratar a una recepcionista interna" },
  },

  {
    slug: "voicemail",
    other: "el buzón de voz",
    title: "Recepcionista con IA vs buzón de voz — lo que cuesta el bip",
    description:
      "El buzón de voz es gratis y ese es todo el argumento a su favor. Lo que cuesta en llamadas no devueltas, y las dos situaciones en que sigue siendo la respuesta correcta.",
    hero: {
      headline: "El buzón de voz es gratis, que no es lo mismo que barato",
      sub: "Un buzón de voz no responde la pregunta, no agenda la cita ni evita que el cliente marque el siguiente número. Solo deja constancia de que usted no estaba.",
    },
    rowsHeading: "Qué hace realmente cada uno",
    rows: [
      {
        label: "Qué recibe quien llama",
        esmi: "Una conversación, una respuesta y normalmente una cita.",
        other: "Un bip, y la tarea de explicarse ante nadie.",
      },
      {
        label: "Qué recibe usted",
        esmi: "Un cliente calificado, agendado, con transcripción y motivo.",
        other: "Un nombre, un número y una devolución de llamada que ahora debe.",
      },
      {
        label: "Agendamiento",
        esmi: "En su calendario real, durante la llamada, con confirmación enviada.",
        other: "Ninguno. La cita se hace después, si logra localizarlo.",
      },
      {
        label: "La devolución",
        esmi: "No hace falta. La transacción ya terminó.",
        other: "Obligatoria, y es el paso donde se pierde la mayor parte.",
      },
      {
        label: "Fuera de horario",
        esmi: "Igual que en horario: quien llama no nota la diferencia.",
        other: "Igual que en horario, que es justamente el problema.",
      },
      {
        label: "Costo",
        esmi: "Desde $299 al mes.",
        other: "Gratis, más cada cliente que marcó el siguiente resultado.",
      },
    ],
    costHeading: "Dónde está el costo de verdad",
    costLede:
      "El buzón de voz no tiene factura, así que su costo hay que contarlo en las llamadas que no convierte. Se fuga en tres lugares.",
    costs: [
      {
        label: "Quienes no dejan mensaje",
        value: "La mayor parte",
        note: "Alguien que está comparando tres proveedores no le narra su problema a una máquina. Cuelga y llama al siguiente, y usted nunca se entera de que eso pasó.",
      },
      {
        label: "Quienes dejan mensaje y aun así se van a otro lado",
        value: "La segunda mayor",
        note: "El mensaje era un seguro, no un compromiso. Quien conteste en vivo primero suele quedarse con el trabajo.",
      },
      {
        label: "La llamada que usted debe devolver",
        value: "Su tiempo, a su tarifa",
        note: "Cada mensaje es trabajo administrativo no pagado que se traslada del cliente a usted, hecho al final de un día que ya estaba lleno.",
      },
      {
        label: "Lo que dicen sus propios números",
        value: "Calcúlelo",
        note: "La calculadora de llamadas perdidas convierte esto en una cifra usando su volumen, su tasa de cierre y su valor por trabajo, no los nuestros.",
      },
    ],
    honestHeading: "Cuándo el buzón de voz está perfectamente bien",
    honestBody:
      "Dos casos en que agregar cualquier cosa sería gastar dinero en resolver un problema que usted no tiene:",
    honestCases: [
      "Lo que entra son casi todos clientes existentes con asuntos agendados. Van a dejar mensaje, van a esperar, y la relación no se decide en el teléfono.",
      "Su volumen es bajo y su trabajo es lo bastante personal como para que usted prefiera devolver todas las llamadas en persona. Esa es una estrategia real, y automatizar el primer contacto la empeoraría.",
    ],
    faqs: [
      {
        q: "¿Puedo dejar el buzón de voz como respaldo?",
        a: "Sí, y la mayoría lo hace. Esmi contesta primero; lo que no puede manejar lo escala, y el buzón queda debajo como último recurso en vez de como primera respuesta.",
      },
      {
        q: "¿A la gente le molesta más hablar con IA que con un buzón?",
        a: "Escuche la demostración y decida usted en vez de creerle a un proveedor. Lo que sí diríamos es que la comparación no es contra una persona: es contra un bip, y ese nunca le ha gustado a nadie.",
      },
      {
        q: "¿Cómo sabría cuántos cuelgan sin dejar mensaje?",
        a: "La mayoría de las centrales telefónicas reportan las llamadas perdidas por separado de los mensajes dejados. La diferencia entre esas dos cifras es la fuga, y suele ser mayor de lo que la gente espera.",
      },
      {
        q: "¿Y si solo lo quiero fuera de horario?",
        a: "Es una configuración soportada. Se desvía cuando nadie contesta o por horario, y su manejo diurno queda exactamente como está.",
      },
    ],
    schema: { about: "Recepcionista con IA comparada con el buzón de voz" },
  },

  {
    slug: "call-center",
    other: "un call center",
    title: "Recepcionista con IA vs call center o servicio de contestadora",
    description:
      "En qué se diferencia una recepcionista con IA de un call center externo en estructura de costos, profundidad del guion y qué pasa a las 2 de la mañana, y cuándo el call center encaja mejor.",
    hero: {
      headline: "Uno toma mensajes. La otra termina la transacción",
      sub: "Un call center son personas, que es su fortaleza y su estructura de costos. La pregunta es si las llamadas que va a tercerizar necesitan una persona o necesitan terminarse.",
    },
    rowsHeading: "En qué se diferencian",
    rows: [
      {
        label: "Qué pasa en la llamada",
        esmi: "Calificada, respondida y agendada en su calendario real.",
        other: "Normalmente capturada y transmitida. La cita la hace usted.",
      },
      {
        label: "Estructura de costos",
        esmi: "Plan mensual fijo. El volumen no cambia la factura.",
        other: "Normalmente por minuto o por llamada: los meses ocupados cuestan más.",
      },
      {
        label: "Picos de demanda",
        esmi: "Llamadas simultáneas ilimitadas. Una semana de tormenta no tiene nada de particular.",
        other: "Capacidad con personal. Los picos hacen fila y se aplican tarifas de excedente.",
      },
      {
        label: "Profundidad del guion",
        esmi: "Entrenada con sus servicios, sus reglas de precio y su calendario.",
        other: "Un guion y un formulario, compartidos con las demás cuentas del turno.",
      },
      {
        label: "Idioma",
        esmi: "Español e inglés nativos, con cambio a mitad de llamada.",
        other: "Depende de quién esté en turno cuando entre la llamada.",
      },
      {
        label: "Registro",
        esmi: "Transcripción, resolución y motivo en cada llamada.",
        other: "Un mensaje, y grabaciones si su plan las incluye.",
      },
      {
        label: "Criterio en llamadas difíciles",
        esmi: "Escala hacia usted con la conversación adjunta.",
        other: "Ya hay una persona ahí, que para ciertas llamadas es justo el punto.",
      },
    ],
    costHeading: "Cómo leer las dos facturas",
    costLede:
      "La comparación no es realmente precio contra precio: es un costo fijo contra uno variable, y cuál conviene depende de la forma de su mes.",
    costs: [
      {
        label: "Esmi Starter",
        value: "$299 / mes",
        note: "Fijo. El mes ocupado y el mes tranquilo cuestan lo mismo, que es todo el punto en un negocio estacional.",
      },
      {
        label: "Call center, estructura típica",
        value: "Por minuto o por llamada",
        note: "Se cobra por uso, así que el costo sube exactamente cuando sube el volumen, en las semanas en que menos le conviene una sorpresa en la factura.",
      },
      {
        label: "Lo que hay que comparar de verdad",
        value: "Costo por trabajo agendado",
        note: "No costo por llamada. Una llamada más barata que termina en un mensaje que usted igual tiene que devolver no es más barata.",
      },
    ],
    honestHeading: "Cuándo un call center es la mejor opción",
    honestBody:
      "Tres situaciones en que tercerizar con personas es la respuesta correcta y se lo diríamos en la llamada:",
    honestCases: [
      "Sus llamadas necesitan criterio humano real la mayor parte del tiempo: admisión sensible, personas angustiadas, triaje complejo que cambia caso por caso. La escalada es el camino equivocado como ruta principal si es la ruta de casi todas las llamadas.",
      "Necesita un idioma que no cubrimos de forma nativa y no podemos agregar. El español y el inglés son nativos y el francés es un complemento; más allá de eso, un servicio con las personas adecuadas es genuinamente mejor que un agente que escala.",
      "Necesita a alguien despachando físicamente, coordinando cuadrillas en vivo o tomando decisiones con una autoridad que usted no delegaría a un software.",
    ],
    faqs: [
      {
        q: "¿Puedo usar los dos?",
        a: "Sí, y es un patrón sensato. Esmi toma el volumen —las citas rutinarias y la calificación— y lo que escala se dirige a su servicio con personal. Así paga por minuto solo las llamadas que de verdad necesitaban una persona.",
      },
      {
        q: "¿Esmi cobra por minuto?",
        a: "No. Los planes son mensuales fijos, así que un mes ocupado y uno tranquilo cuestan lo mismo. Para un negocio estacional esa diferencia suele importar más que la tarifa de portada.",
      },
      {
        q: "¿En qué se diferencia de un servicio de contestadora?",
        a: "Un servicio de contestadora toma un mensaje y lo reenvía; usted igual devuelve la llamada. Esmi termina la interacción: responde la pregunta, califica y agenda en su calendario antes de que el cliente cuelgue.",
      },
      {
        q: "¿Y los acentos y el ruido de fondo?",
        a: "Es una pregunta justa y la respuesta honesta es que varía según la calidad de la línea. Pruebe la demostración y, mejor todavía, corra el piloto en su número real durante catorce días: para eso son los $149.",
      },
    ],
    schema: { about: "Recepcionista con IA comparada con un call center o servicio de contestadora externo" },
  },
];

const BY_LOCALE: Record<Locale, ComparePage[]> = { en: EN, es: ES };

export function getComparisons(locale: Locale): ComparePage[] {
  return BY_LOCALE[locale];
}

export function getComparison(locale: Locale, slug: string): ComparePage | undefined {
  return BY_LOCALE[locale].find((p) => p.slug === slug);
}

export function getCompareChrome(locale: Locale): Chrome {
  return CHROME[locale];
}

export const COMPARE_SLUGS = EN.map((p) => p.slug);
