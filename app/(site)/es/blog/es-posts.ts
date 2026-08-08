import type { Block } from "@/app/(site)/blog/posts";

export type EsPost = {
  slug: string;
  enSlug: string; // matching EN post slug for hreflang
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  readingMinutes: number;
  keywords: string[];
  body: Block[];
  related: { label: string; href: string }[];
};

export const ES_POSTS: EsPost[] = [
  {
    slug: "que-es-un-recepcionista-ia",
    enSlug: "what-is-an-ai-receptionist",
    title: "¿Qué Es un Recepcionista con IA? (Y Cómo Funciona)",
    description:
      "Un recepcionista con IA es un agente de voz virtual que contesta llamadas, califica prospectos y agenda citas automáticamente. Así funciona y si es adecuado para tu negocio.",
    datePublished: "2026-06-03",
    author: "Orchelix",
    readingMinutes: 6,
    keywords: [
      "qué es un recepcionista con ia",
      "recepcionista con ia",
      "cómo funciona un recepcionista con ia",
      "recepcionista virtual ia",
    ],
    body: [
      {
        type: "p",
        text: "**Un recepcionista con IA es un agente de voz virtual que contesta tus llamadas entrantes automáticamente — saluda a los clientes, responde preguntas, califica prospectos y agenda citas — sin que una persona tenga que contestar.** Funciona las 24 horas y transfiere a tu equipo cuando una llamada requiere atención humana. Piénsalo como un empleado de recepción que nunca duerme, nunca toma un descanso y nunca deja sonar el teléfono sin contestar.",
      },
      { type: "h2", text: "¿Cómo funciona un recepcionista con IA?" },
      {
        type: "p",
        text: "Un recepcionista con IA moderno combina voz natural, conocimiento de tu negocio y conexiones con tu calendario y CRM. Una llamada típica funciona así:",
      },
      {
        type: "ul",
        items: [
          "**Contesta al instante** — al primer tono, a cualquier hora del día.",
          "**Entiende al cliente** — mediante conversación natural, sin un árbol de opciones rígido.",
          "**Toma acción** — responde preguntas frecuentes, califica al prospecto y agenda una cita en tu calendario en vivo.",
          "**Confirma** — envía una confirmación por SMS y registra un resumen en tu CRM.",
          "**Transfiere cuando es necesario** — redirige llamadas complejas o sensibles a una persona con todo el contexto.",
        ],
      },
      {
        type: "p",
        text: "La configuración ocurre al inicio: el agente se entrena con tus servicios, horarios, guiones y preguntas frecuentes para sonar como tu recepción — consulta [cómo funciona Esmi](/es/recepcionista-ia) para un ejemplo concreto.",
      },
      { type: "h2", text: "¿Qué puede hacer un recepcionista con IA?" },
      {
        type: "ul",
        items: [
          "Contestar llamadas 24/7, incluyendo noches, fines de semana y desbordamiento cuando tu equipo está ocupado.",
          "Calificar prospectos haciendo las preguntas que haría tu equipo de ventas y registrándolos.",
          "Agendar, reprogramar y confirmar citas directamente en tu calendario.",
          "Responder preguntas frecuentes sobre horarios, ubicación, servicios y precios.",
          "Operar en dos idiomas — por ejemplo, cambiando entre inglés y español en la misma llamada.",
          "Capturar cada llamada como resumen y transcripción para que nada se pierda.",
        ],
      },
      { type: "h2", text: "¿En qué se diferencia de otras opciones?" },
      {
        type: "p",
        text: "A diferencia de un servicio de contestadora tradicional que solo toma mensajes, un recepcionista con IA resuelve la llamada — consulta nuestra comparación completa en [Recepcionista con IA vs. servicio de contestadora](/es/blog/recepcionista-ia-vs-servicio-de-contestadora). Y a diferencia de contratar un recepcionista de tiempo completo, cubre cada hora sin salario, prestaciones ni días de enfermedad. ¿Tienes dudas sobre el costo? Lo analizamos en [¿Cuánto cuesta un recepcionista con IA?](/es/blog/cuanto-cuesta-un-recepcionista-ia).",
      },
      { type: "h2", text: "¿Es adecuado para tu negocio?" },
      {
        type: "p",
        text: "Es una solución especialmente sólida si alguna de estas situaciones te resulta familiar:",
      },
      {
        type: "ul",
        items: [
          "Estás perdiendo llamadas — y clientes — fuera de horario o cuando tu equipo está ocupado.",
          "Una cita agendada vale mucho más que el costo de contestar la llamada.",
          "Tu volumen de llamadas varía de forma impredecible y es difícil de cubrir con personal.",
          "Atiendes clientes en más de un idioma.",
          "Quieres mayor velocidad de respuesta sin aumentar tu plantilla.",
        ],
      },
      {
        type: "callout",
        text: "Si una llamada perdida puede costarte un cliente, un recepcionista con IA suele ser la automatización de mayor impacto que puede agregar un negocio de servicios.",
      },
      { type: "h2", text: "Conoce a Esmi" },
      {
        type: "p",
        text: "Esmi es el recepcionista con IA de Orchelix — bilingüe, disponible las 24 horas y diseñado para agendar citas de principio a fin con transferencia humana cuando importa. [Descubre cómo funciona Esmi](/es/recepcionista-ia), [pruébalo en vivo](/try-esmi) o [agenda una demo](/book) para verlo con tu propio flujo de llamadas.",
      },
    ],
    related: [
      { label: "Recepcionista con IA vs. servicio de contestadora", href: "/es/blog/recepcionista-ia-vs-servicio-de-contestadora" },
      { label: "¿Cuánto cuesta un recepcionista con IA?", href: "/es/blog/cuanto-cuesta-un-recepcionista-ia" },
      { label: "Recepcionista con IA — cómo funciona Esmi", href: "/es/recepcionista-ia" },
    ],
  },

  {
    slug: "recepcionista-ia-vs-servicio-de-contestadora",
    enSlug: "ai-receptionist-vs-answering-service",
    title: "Recepcionista con IA vs. Servicio de Contestadora: ¿Cuál Es Mejor para Tu Negocio?",
    description:
      "Recepcionista con IA o servicio de contestadora tradicional: una comparación clara y honesta de costos, velocidad, agendamiento, cobertura nocturna y cuándo gana cada opción.",
    datePublished: "2026-06-03",
    author: "Orchelix",
    readingMinutes: 7,
    keywords: [
      "recepcionista ia vs servicio de contestadora",
      "alternativa a servicio de contestadora",
      "servicio de contestadora ia",
      "recepcionista virtual vs contestadora",
    ],
    body: [
      {
        type: "p",
        text: "Cuando tu teléfono suena más de lo que tu equipo puede atender, tienes dos opciones modernas: un servicio de contestadora tradicional con operadores humanos, o un [recepcionista con IA](/es/recepcionista-ia) que contesta y resuelve la llamada por sí mismo. Suenan parecido, pero resuelven problemas distintos. Así puedes saber cuál necesita realmente tu negocio.",
      },
      { type: "h2", text: "El veredicto rápido" },
      {
        type: "p",
        text: "Un **servicio de contestadora** es ideal cuando principalmente necesitas que una persona amable tome mensajes y transfiera llamadas. Un **recepcionista con IA** es ideal cuando quieres que la llamada se *resuelva* — preguntas respondidas, prospectos calificados y citas agendadas — al instante, a cualquier hora, sin necesidad de devolución de llamada.",
      },
      {
        type: "callout",
        text: "Resumen: los servicios de contestadora capturan llamadas. Los recepcionistas con IA las completan.",
      },
      { type: "h2", text: "Qué hace un servicio de contestadora tradicional" },
      {
        type: "p",
        text: "Un servicio de contestadora dirige tus llamadas fuera de horario o de desbordamiento a operadores humanos remotos. Saludan al cliente, toman un mensaje y lo reenvían, a veces siguiendo un guion básico.",
      },
      {
        type: "ul",
        items: [
          "**Ventajas:** voz humana real, bueno para llamadas sensibles o poco habituales, sin configuración de automatización.",
          "**Limitaciones:** los operadores generalmente no pueden acceder a tu calendario o sistemas, así que toman un mensaje y tú devuelves la llamada — añadiendo un retraso que pierde clientes listos para agendar.",
          "**Estructura de costo:** generalmente cobrado por minuto o por llamada, por lo que un mes ocupado puede ser costoso.",
        ],
      },
      { type: "h2", text: "Qué hace un recepcionista con IA" },
      {
        type: "p",
        text: "Un recepcionista con IA contesta la llamada por sí mismo, en conversación natural. Puede consultar tus preguntas frecuentes, calificar al cliente, leer tu calendario en vivo y agendar la cita en la misma llamada — luego transferir a una persona cuando algo lo requiera.",
      },
      {
        type: "ul",
        items: [
          "**Ventajas:** atención inmediata 24/7, agenda citas de principio a fin, califica prospectos y registra todo en tu CRM.",
          "**Limitaciones:** requiere una configuración inicial para aprender tu negocio; necesitarás reglas claras para cuándo escalar a una persona.",
          "**Estructura de costo:** generalmente un precio mensual fijo, que se mantiene predecible a medida que crece el volumen. (Analizamos los números en [¿Cuánto cuesta un recepcionista con IA?](/es/blog/cuanto-cuesta-un-recepcionista-ia).)",
        ],
      },
      { type: "h2", text: "Comparación directa" },
      {
        type: "ul",
        items: [
          "**Velocidad de respuesta:** el IA contesta al primer tono, siempre. Los servicios de contestadora dependen de la disponibilidad del operador.",
          "**Agendamiento:** el IA agenda directamente en tu calendario; la mayoría de los servicios de contestadora solo toman un mensaje.",
          "**Fuera de horario:** el IA es genuinamente 24/7 sin costo adicional; los servicios humanos frecuentemente cobran más por noches y fines de semana.",
          "**Idiomas:** el IA puede ser bilingüe y cambiar de idioma en la misma llamada; la cobertura humana depende de quién esté disponible.",
          "**Escalabilidad:** el IA atiende diez llamadas simultáneas tan fácilmente como una; los servicios humanos forman cola.",
          "**Costo al crecer:** mensual fijo (IA) vs. costo por minuto creciente (servicio de contestadora).",
        ],
      },
      { type: "h2", text: "Cuándo un servicio de contestadora sigue siendo la mejor opción" },
      {
        type: "p",
        text: "Si tu volumen de llamadas es muy bajo, tus llamadas son muy sensibles o poco habituales, o específicamente necesitas una persona en cada llamada por cumplimiento normativo o comodidad del cliente, un servicio tradicional puede ser la opción correcta. No hay nada malo en mensajes y devoluciones de llamada si la velocidad de agendamiento no es tu cuello de botella.",
      },
      { type: "h2", text: "Cuándo gana el recepcionista con IA" },
      {
        type: "p",
        text: "Si las llamadas perdidas o fuera de horario te cuestan trabajo agendado, si los clientes esperan respuestas inmediatas, o si tu volumen varía de forma impredecible, un recepcionista con IA casi siempre sale adelante — convierte más llamadas en citas agendadas sin aumentar tu plantilla.",
      },
      { type: "h2", text: "No tienes que elegir solo uno" },
      {
        type: "p",
        text: "Las mejores configuraciones son híbridas. Un recepcionista con IA maneja lo rutinario — atender, calificar, agendar — y escala a tu equipo (o a un servicio humano) en el momento en que una llamada necesita una persona, pasando todo el contexto para que nadie empiece desde cero. Obtienes cobertura inmediata 24/7 *y* atención humana donde importa.",
      },
      { type: "h2", text: "Cómo lo maneja Esmi" },
      {
        type: "p",
        text: "Esmi, el recepcionista con IA de Orchelix, contesta cada llamada 24/7, agenda citas de principio a fin, opera de forma bilingüe (EN/ES) y transfiere a tu equipo con todo el contexto cuando es necesario — como un servicio mensual flexible sin contratos largos. Descubre [cómo funciona Esmi](/es/recepcionista-ia), consulta [precios](/pricing) o [agenda una demo](/book). También puedes [probar Esmi en vivo](/try-esmi) ahora mismo.",
      },
    ],
    related: [
      { label: "¿Qué es un recepcionista con IA?", href: "/es/blog/que-es-un-recepcionista-ia" },
      { label: "¿Cuánto cuesta un recepcionista con IA?", href: "/es/blog/cuanto-cuesta-un-recepcionista-ia" },
      { label: "Recepcionista con IA — cómo funciona Esmi", href: "/es/recepcionista-ia" },
    ],
  },

  {
    slug: "cuanto-cuesta-un-recepcionista-ia",
    enSlug: "how-much-does-an-ai-receptionist-cost",
    title: "¿Cuánto Cuesta un Recepcionista con IA? (Guía de Precios 2026)",
    description:
      "Precios de recepcionista con IA explicados: costos mensuales típicos, los cuatro modelos de cobro, qué impulsa el precio y cómo se compara el IA con un recepcionista humano o servicio de contestadora.",
    datePublished: "2026-06-03",
    author: "Orchelix",
    readingMinutes: 6,
    keywords: [
      "costo de recepcionista con ia",
      "precio recepcionista ia",
      "cuánto cuesta un recepcionista con ia",
      "recepcionista virtual precio",
    ],
    body: [
      {
        type: "p",
        text: "Si estás evaluando un [recepcionista con IA](/es/recepcionista-ia) para tu negocio, la primera pregunta suele ser la más simple de hacer y la más difícil de responder directamente: ¿cuánto cuesta realmente? La respuesta honesta es que depende de cómo se cobra y qué tan ocupados están tus teléfonos — pero los rangos son mucho más estrechos, y mucho más bajos, de lo que la mayoría de los dueños espera.",
      },
      { type: "h2", text: "La respuesta corta" },
      {
        type: "p",
        text: "Para la mayoría de las pequeñas y medianas empresas, un recepcionista con IA cuesta aproximadamente **$200 a $1,500 por mes**. El uso básico y de bajo volumen puede estar en el extremo inferior; un alto volumen de llamadas con integraciones profundas y cobertura nocturna empuja hacia el extremo superior. Comparado con el costo total de un recepcionista de tiempo completo, suele ser una fracción del precio con cobertura ininterrumpida.",
      },
      {
        type: "callout",
        text: "Regla general: si una sola llamada perdida puede costarte un trabajo agendado, un recepcionista con IA generalmente se paga solo antes de que termine el primer mes.",
      },
      { type: "h2", text: "Las cuatro formas en que se cobra un recepcionista con IA" },
      {
        type: "p",
        text: "Casi todos los proveedores usan uno de estos modelos. Saber cuál te están cotizando facilita comparar alternativas con precisión.",
      },
      {
        type: "ul",
        items: [
          "**Por minuto** — pagas por el tiempo de llamada (generalmente $0.50–$2.00/min). Predecible para bajo volumen, pero el costo sube rápido a medida que crecen las llamadas.",
          "**Por llamada** — una tarifa fija por llamada atendida. Simple, pero las llamadas largas o complejas cuestan lo mismo que las rápidas.",
          "**Mensual fijo** — un precio establecido por un paquete de minutos o llamadas. Lo más fácil de presupuestar; revisa las tarifas por excedente.",
          "**Servicio completamente gestionado** — un precio mensual que incluye configuración, ajuste, integraciones y optimización continua por un equipo real, no solo acceso al software.",
        ],
      },
      { type: "h2", text: "Qué impulsa realmente el precio" },
      {
        type: "p",
        text: "Dos negocios pueden recibir cotizaciones muy distintas por el mismo producto. Estos son los factores que mueven el número:",
      },
      {
        type: "ul",
        items: [
          "**Volumen de llamadas** — más llamadas equivale a más minutos, el principal impulsor de costos.",
          "**Idiomas** — el manejo bilingüe (inglés/español) puede afectar el precio, aunque generalmente se recupera rápidamente en mercados como el sur de Florida.",
          "**Integraciones** — conectar tu calendario y CRM para que el agente pueda agendar y registrar llamadas añade valor a la configuración.",
          "**Cobertura fuera de horario y desbordamiento** — la cobertura 24/7 es donde el IA más rinde, pero añade uso.",
          "**Escalación humana** — cómo se manejan las transferencias a tu equipo puede afectar el plan.",
          "**Incorporación** — algunos proveedores cobran una tarifa única de configuración para entrenar al agente con tus guiones y preguntas frecuentes.",
        ],
      },
      { type: "h2", text: "Recepcionista con IA vs. recepcionista humano vs. servicio de contestadora" },
      {
        type: "p",
        text: "Un recepcionista de tiempo completo en los EE. UU. generalmente cuesta **$3,000–$4,500+ por mes** al incluir salario, prestaciones y gastos generales — y trabaja un solo turno, no 24/7. Un servicio de contestadora tradicional es más económico pero generalmente solo toma mensajes, dejándote la tarea de devolver llamadas. Un recepcionista con IA se sitúa entre ambos en precio mientras hace más trabajo real: contesta al instante, califica al cliente y [agenda la cita](/es/recepcionista-ia) en la misma llamada.",
      },
      {
        type: "p",
        text: "La comparación real no es solo el precio nominal — es el costo por resultado. Una opción más barata que solo toma mensajes sigue dejando dinero sobre la mesa cada vez que un cliente listo para agendar no recibe respuesta a tiempo.",
      },
      { type: "h2", text: "Qué buscar más allá del precio" },
      {
        type: "ul",
        items: [
          "**Transferencia humana** — el agente debe escalar a tu equipo con todo el contexto, no atrapar a los clientes en un ciclo.",
          "**Agendamiento que funciona** — integración real con el calendario y confirmación por SMS, no solo una promesa de seguimiento.",
          "**Soporte bilingüe** — si atiendes clientes hispanohablantes, el cambio de idioma en la misma llamada es importante.",
          "**Sin contratos largos** — términos mensuales flexibles te permiten comprobar el valor antes de comprometerte.",
          "**Un equipo detrás** — ajuste y soporte continuos superan al software que tienes que administrar tú mismo.",
        ],
      },
      { type: "h2", text: "Cómo está estructurado Esmi" },
      {
        type: "p",
        text: "Esmi, el recepcionista con IA de Orchelix, se ofrece como un servicio mensual gestionado — monitoreo, optimización y un consultor senior incluidos, sin contratos a largo plazo. Puedes comenzar solo con Esmi y agregar más agentes a medida que creces. Consulta los paquetes actuales en la [página de precios](/pricing) o [agenda una demo](/book) para obtener una cotización adaptada a tu volumen de llamadas.",
      },
      {
        type: "p",
        text: "¿Quieres escucharlo primero? Puedes [probar Esmi en vivo](/try-esmi) antes de hablar con nadie.",
      },
    ],
    related: [
      { label: "¿Qué es un recepcionista con IA?", href: "/es/blog/que-es-un-recepcionista-ia" },
      { label: "Recepcionista con IA vs. servicio de contestadora", href: "/es/blog/recepcionista-ia-vs-servicio-de-contestadora" },
      { label: "Recepcionista con IA — cómo funciona Esmi", href: "/es/recepcionista-ia" },
    ],
  },
];

export function getAllEsSlugs(): string[] {
  return ES_POSTS.map((p) => p.slug);
}

export function getEsPost(slug: string): EsPost | undefined {
  return ES_POSTS.find((p) => p.slug === slug);
}

export function getSortedEsPosts(): EsPost[] {
  return [...ES_POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
