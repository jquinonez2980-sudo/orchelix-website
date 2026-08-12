import type { Messages } from "./en";

/* Spanish catalogue — neutral Latin American register.

   Written as Spanish, not as translated English: "Built like a consultancy,
   priced like software" becomes "Con el rigor de una consultoría, al precio de
   un software" rather than a word-for-word calque. Bilingual capability is the
   product's differentiator, so copy that reads like machine translation would
   actively disprove the claim on the page.

   NEEDS NATIVE REVIEW before launch. It is competent and idiomatic, but a
   native speaker from the target market should sign off — particularly the
   disposition labels, which are operational vocabulary a receptionist would
   actually use, and which vary by country.

   Same honesty constraints as en.ts: no latency figures, no SOC 2 claim, no
   French, no invented clients, and the production-vs-development split stays. */

const es: Messages = {
  meta: {
    localeName: "Español",
    switchTo: "English",
    switchLabel: "Switch to English",
  },

  nav: {
    products: "Productos",
    howItWorks: "Cómo funciona",
    industries: "Industrias",
    pricing: "Precios",
    about: "Nosotros",
    tryEsmi: "Escucha a Esmi",
    book: "Agenda un piloto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "Orchelix — Inicio",
  },

  common: {
    bookPilot: "Agenda un piloto",
    hearRealCall: "Escucha una llamada real",
    seePricing: "Ver precios",
    talkToConsultant: "Habla con un consultor",
    inProduction: "En producción",
    inDevelopment: "En la misma consola — en desarrollo",
    startWithOneWorkflow: "Empieza con un solo proceso",
    startWithOneWorkflowBody:
      "Un consultor senior lo documenta, tu primer agente entra en operación en catorce días, y cada acción que toma queda registrada.",
    phone: "+1 561 566 1066",
    countries: "Canadá y Estados Unidos",
  },

  home: {
    title: "Orchelix | Agentes de IA que operan tu área comercial",
    description:
      "Esmi contesta, califica y agenda 24/7 en inglés y español. Cada acción queda en un registro auditable que puedes revisar y revertir. Implementado por consultores senior en 14 días.",
    heroTitle: ["Cada llamada contestada.", "Cada acción registrada."],
    heroBody:
      "Esmi contesta, califica y agenda a toda hora — en inglés y español. Cada llamada cierra con una transcripción, un motivo y una resolución que puedes revertir.",
    registerCaption: "Registro de llamadas — una noche, una línea",
    registerWindow: "18:00 – 06:00",
    columns: {
      time: "Hora",
      lang: "Idioma",
      reason: "Motivo",
      outcome: "Resultado",
      disposition: "Estado",
    },
    dispositions: {
      BOOKED: "AGENDADA",
      ROUTED: "DERIVADA",
      ANSWERED: "RESUELTA",
      CLOSED: "CERRADA",
    },
    tallyCalls: "{n} llamadas",
    illustrative:
      "Entradas ilustrativas. Reproduce una grabación real de Esmi en la columna de al lado.",

    problemTitle: "El trabajo se hace. El problema es todo lo que se cae mientras lo haces.",
    arrears: [
      {
        entry: "Llamadas que nadie contesta",
        desc: "Las llamadas fuera de horario terminan en el buzón — y el buzón termina en un cliente que agendó con quien sí contestó.",
      },
      {
        entry: "Seguimiento que llega tarde",
        desc: "Un prospecto espera un día por la devolución. Cuando alguien responde, la decisión ya está tomada y la cotización ya está firmada.",
      },
      {
        entry: "Un cierre de mes que se alarga",
        desc: "Las conciliaciones se estiran por semanas, así que diriges el negocio con los números del mes pasado en vez de los de esta mañana.",
      },
      {
        entry: "Tu mejor gente en trabajo mecánico",
        desc: "A quienes contrataste por su criterio se les va el día recapturando las mismas cifras entre un sistema y otro.",
      },
    ],

    stackTitle: "Un sistema, una consola, un registro auditable",
    stackBody:
      "Hoy hay un agente contestando llamadas en producción. Otros dos se están construyendo sobre la misma consola y el mismo registro. Preferimos decirte cuál es cuál.",
    shared: [
      ["Consola", "Una sola vista de operación"],
      ["Registro", "Cada acción, una bitácora"],
      ["Consultor", "Con nombre, senior, localizable"],
      ["Idiomas", "Inglés y español"],
      ["Controles", "Aprobar, revertir, corregir"],
    ] as [string, string][],
    esmiName: "Esmi — Recepcionista Virtual",
    esmiBody:
      "Atención telefónica 24/7 que agenda citas, deriva lo urgente y suena natural en inglés y español. Cada llamada termina con una transcripción completa y un motivo.",
    esmiProduces: [
      ["Transcripción", "Texto completo, en ambos idiomas, con búsqueda"],
      ["Motivo", "Por qué llamó, en sus propias palabras"],
      ["Estado", "Agendada, derivada, resuelta o cerrada"],
      ["Grabación", "Conservada según tu política de retención"],
      ["Reversión", "Cualquier acción la puede revertir una persona"],
    ] as [string, string][],
    whatEsmiHandles: "Qué atiende Esmi",
    inDev: [
      {
        title: "Agentes de Revenue-Ops",
        desc: "Califica cada prospecto, da seguimiento a tiempo y mantiene el pipeline en movimiento mientras tu equipo lleva las conversaciones que importan.",
        scope: "Calificar · Dar seguimiento · Cerrar",
      },
      {
        title: "AcumenAI — Contabilidad y Finanzas",
        desc: "Contabilidad automatizada, conciliaciones y un cierre de mes confiable, con un reporte revisable cada mañana.",
        scope: "Contabilidad · Conciliación · Cierre",
      },
    ],

    pilotTitle: "Catorce días hasta el primer agente en operación",
    pilotBody:
      "Un solo proceso instrumentado de principio a fin, a cargo de un consultor al que puedes llamar por su nombre. Amplías cuando ves que se paga solo — no antes.",
    stages: [
      {
        day: "Día 1",
        title: "Documentar el proceso",
        desc: "Un consultor senior se sienta con tu equipo y escribe el proceso que vamos a automatizar primero. El documento se queda contigo.",
      },
      {
        day: "Día 14",
        title: "Primer agente en operación",
        desc: "Tu agente entra en tus herramientas — teléfono, correo, CRM, contabilidad — con un tablero que puedes leer el lunes por la mañana.",
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

    whyTitle: "Con el rigor de una consultoría. Al precio de un software.",
    commitments: [
      {
        title: "Consultores senior, no una mesa de ayuda",
        desc: "Cada implementación la lidera un operador senior al que puedes llamar por su nombre. Sin tickets de primer nivel ni respuestas a las 48 horas.",
      },
      {
        title: "Bilingüe desde la primera llamada",
        desc: "Esmi habla inglés y español de forma nativa — no es una capa de traducción encima de un agente en inglés. Los idiomas que tus clientes realmente usan.",
      },
      {
        title: "Un registro que resiste una auditoría",
        desc: "Controles de nivel operativo, reglas de retención y un historial que los auditores de tus clientes van a aceptar. Alineado con PIPEDA para operaciones en Canadá. Residencia de datos a solicitud.",
      },
      {
        title: "Siempre con una persona en el circuito",
        desc: "Aprueba, revierte o corrige cualquier agente con un clic. Tú decides qué se automatiza — y qué sigue esperándote a ti.",
      },
    ],
  },

  footer: {
    blurb:
      "Sistemas multiagente para operaciones comerciales, implementados por consultores senior. Operamos en Canadá y Estados Unidos.",
    products: "Productos",
    company: "Empresa",
    trust: "Confianza",
    links: {
      esmi: "Esmi — Recepcionista Virtual",
      revops: "Agentes de Revenue-Ops",
      acumen: "AcumenAI",
      industries: "Industrias",
      howItWorks: "Cómo funciona",
      pricing: "Precios",
      about: "Nosotros",
      blog: "Blog",
      book: "Agenda un piloto",
      privacy: "Aviso de Privacidad",
      terms: "Términos del Servicio",
      pipeda: "Alineación con PIPEDA",
      security: "Seguridad",
    },
    privacyShort: "Privacidad",
    termsShort: "Términos",
    rights: "Orchelix AI Consulting Inc.",
  },

  /* Copy por página. Los precios, nombres de plan, teléfonos y nombres de
     producto NO se traducen — son los mismos hechos comerciales en ambos
     idiomas. Vocabulario operativo fijado: workflow → proceso,
     lead → prospecto, audit trail → registro auditable,
     disposition → estado, booking → agendamiento. */
  pages: {
    solutions: {
      title: "Productos — Orchelix AI Consulting",
      description:
        "Tres agentes, una consola, un registro auditable. Esmi contesta llamadas en producción hoy; Revenue-Ops y AcumenAI están en desarrollo.",
      heading: "Tres agentes. Una consola. Un registro auditable.",
      lede: "Hoy hay uno contestando llamadas en producción. Dos se están construyendo sobre la misma consola y el mismo registro. Preferimos decirte cuál es cuál antes que dejar que una lista de funciones dé a entender otra cosa.",
      esmiCapabilities: [
        ["Disponibilidad", "Noches, fines de semana y feriados — la línea nunca queda sola"],
        ["Idiomas", "Inglés y español de forma nativa, cambiando a media llamada si el cliente lo hace"],
        ["Agendamiento", "Google, Microsoft 365, Calendly y Acuity, con confirmación por SMS"],
        ["Derivación", "Las emergencias fuera de horario llegan a la persona de guardia, no al buzón"],
        ["Registro", "Cada llamada cierra con transcripción, motivo y estado"],
        ["Ajustes", "Se corrige editando un documento — sin necesidad de un programador"],
      ] as [string, string][],
      revopsCapabilities: [
        ["Captación", "Formularios, llamadas, redes pagadas y referidos en un solo pipeline"],
        ["Calificación", "Un puntaje defendible, según perfil, señales de intención e historial"],
        ["Seguimiento", "Secuencias de correo, SMS y llamada escritas con tu voz, no una plantilla"],
        ["Entrega", "Tus vendedores reciben un resumen con puntos de conversación, no un registro vacío"],
        ["CRM", "HubSpot, Salesforce, Pipedrive y Zoho — lectura y escritura nativas"],
        ["Reportes", "Un tablero de los lunes: qué avanzó, qué se detuvo y por qué"],
      ] as [string, string][],
      acumenCapabilities: [
        ["Clasificación", "Movimientos de banco, tarjeta y cuentas por cobrar conciliados cada mañana"],
        ["Cotejo", "Orden de compra, recibo y factura cruzados; las diferencias quedan en revisión"],
        ["Cobranza", "Recordatorios con tu tono que escalan por antigüedad, no por corazonada"],
        ["Cierre", "Una lista de cierre de mes con cada paso firmado y con hora"],
        ["Contabilidad", "QuickBooks y Xero nativos — se escribe de vuelta, sin libros paralelos"],
        ["Cumplimiento", "Registro alineado con PIPEDA, cada acción atribuible, residencia a solicitud"],
      ] as [string, string][],
      inDevNote:
        "Estos dos están en desarrollo. Las capacidades de arriba describen para qué se están construyendo, no lo que corre hoy en tu cuenta. Si un piloto depende de alguno, dilo y te decimos con honestidad en qué punto está.",
      deploymentHeading: "Cómo se implementa",
      deploymentLede:
        "Cada agente entra igual: un proceso documentado por un consultor senior, en operación en catorce días, y auditado desde la primera acción.",
      deploymentBand: [
        ["Día 1", "Un consultor escribe el proceso. El documento se queda contigo."],
        ["Día 14", "El agente entra en operación en tus herramientas."],
        ["Continuo", "Cada acción registrada, reversible y atribuible."],
        ["Cuando decidas", "Suma el siguiente agente — misma consola, mismo consultor."],
      ] as [string, string][],
    },

    pricing: {
      title: "Precios",
      description:
        "Esmi contesta el teléfono y el chat web, agenda en tus calendarios reales y deja cada llamada, cita y prospecto en un solo tablero. La configuración la hacemos nosotros.",
      heading: "Al precio de un software. Implementado como una consultoría.",
      lede: "Esmi contesta el teléfono y el chat web, agenda en tus calendarios reales y deja cada llamada, cita y prospecto en un solo tablero. La configuración la hacemos nosotros.",
      startPilot: "Empieza un piloto de 14 días",
      bookWalkthrough: "Agenda una demostración",
      scheduleHeading: "El tarifario",
      scheduleLede:
        "Elige un punto de partida según tu volumen de llamadas. Todos los planes incluyen el tablero completo — lo que cambia es la capacidad, no las funciones.",
      terms: {
        monthly: "Mensual",
        setup: "Implementación, único pago",
        minutes: "Minutos incluidos",
        overage: "Excedente, por minuto",
        numbers: "Números",
        channels: "Canales",
        booking: "Agendamiento",
        knowledge: "Base de conocimiento",
        support: "Soporte",
      },
      values: {
        starterNumbers: "1 local",
        growthNumbers: "Hasta 2",
        scaleNumbers: "3 o más",
        starterChannels: "Voz",
        growthChannels: "Voz + chat web",
        scaleChannels: "Voz, chat y derivación prioritaria",
        starterBooking: "1 calendario",
        growthBooking: "Multisucursal + reprogramación",
        scaleBooking: "Multisucursal + reglas de agenda",
        starterKnowledge: "Estándar",
        growthKnowledge: "Ampliada",
        scaleKnowledge: "A medida + ajuste trimestral",
        starterSupport: "Correo",
        growthSupport: "Prioritario",
        scaleSupport: "Canal compartido",
        custom: "A medida",
      },
      startPilotShort: "Empezar piloto",
      talkToUs: "Hablemos",
      finePrint:
        "Disponible mes a mes. Con facturación anual: dos meses sin costo y sin cargo de implementación. La implementación cubre número, calendario, base de conocimiento y puesta en marcha. El piloto son $149 por 14 días con implementación incluida, acreditados a tu primera factura si continúas. Los minutos son de voz y no se acumulan. Impuestos aparte donde apliquen.",
      pilotHeading: "Prueba Esmi en tu línea real por catorce días",
      pilotBody:
        "$149, con implementación completa incluida, acreditados a tu primer mes si continúas. Un número, hasta 75 minutos, un calendario, el tablero completo y una revisión de cierre con tu consultor.",
      startThePilot: "Empezar el piloto",
      includedHeading: "En todos los planes",
      included: [
        "Voz natural, 24/7",
        "Agenda y reprograma en calendario en vivo",
        "Escalamiento a una persona con contexto",
        "Grabaciones y transcripciones",
        "Bandeja de citas y prospectos",
        "Actividad fuera de horario en el resumen",
      ],
      addOnsHeading: "Adicionales",
      addOns: [
        ["Número adicional", "$49 / mes"],
        ["500 minutos adicionales", "$99"],
        ["Bilingüe EN / ES", "$99 / mes"],
        ["Integración CRM / HighLevel", "A medida"],
      ] as [string, string][],
      afterStartHeading: "Qué pasa después de empezar",
      afterStart: [
        ["Paso uno", "Aprendemos tus horarios, servicios, preguntas frecuentes y calendarios."],
        ["Paso dos", "Entramos en operación — número, agente, agenda y acceso al tablero."],
        ["Paso tres", "Ves cada llamada fuera de horario, cita, prospecto y grabación."],
      ] as [string, string][],
      questionsHeading: "Preguntas",
      faq: [
        {
          q: "¿Necesito personal técnico para implementarlo?",
          a: "No. La implementación la hacemos nosotros: Orchelix configura tu número, el agente, la base de conocimiento y el calendario. Tú lo revisas antes de que entre en operación; no construyes nada.",
        },
        {
          q: "¿Esmi agenda citas reales o solo toma mensajes?",
          a: "Citas reales. Esmi lee la disponibilidad de tu Google Calendar en vivo y agenda, reprograma o cancela directamente ahí — no queda un mensaje para que alguien devuelva la llamada y lo capture a mano.",
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
      scheduleCaption: "Tarifario de planes Orchelix — Starter, Growth y Scale",
    },

    howItWorks: {
      title: "Cómo funciona",
      description:
        "De la primera llamada a tu primer agente en 14 días. Documentamos el proceso, implementamos en dos semanas, auditamos cada acción y creces a tu ritmo — con un consultor senior en la línea.",
      heading: "Catorce días de la primera llamada a un agente operando",
      lede: "Un solo proceso, instrumentado de principio a fin, a cargo de un consultor al que puedes llamar por su nombre. Amplías cuando ves que se paga solo — no antes.",
      scheduleHeading: "Los catorce días",
      scheduleLede:
        "Cada etapa produce algo que te queda, sigas o no después del piloto.",
      schedule: [
        {
          when: "Días 1–3",
          title: "Documentar el proceso",
          desc: "Un consultor senior se sienta con tu equipo y escribe el proceso que vamos a automatizar primero — quién llama, qué necesita y cómo se ve un buen resultado.",
          output: "Un proceso por escrito y un tablero de éxito firmado. Ambos se quedan contigo.",
        },
        {
          when: "Días 4–7",
          title: "Conectar tus herramientas",
          desc: "Conectamos el agente a lo que ya usas — la línea telefónica, el calendario, el CRM, la contabilidad. No se reconstruye nada ni se migra nada.",
          output: "Teléfono, calendario y CRM conectados en tus cuentas, no en las nuestras.",
        },
        {
          when: "Días 8–11",
          title: "Entrenar y observar",
          desc: "El agente trabaja sobre llamadas reales en modo borrador. Redacta, tú revisas, y nada llega a un cliente. Ajustamos el guion a diario con lo que realmente entró.",
          output: "Notas de revisión diarias y un guion ajustado a tu tráfico real.",
        },
        {
          when: "Días 12–14",
          title: "Entrar en operación",
          desc: "La línea se cambia con tus reglas de derivación activas. Tu consultor sigue encima durante la primera semana.",
          output: "Una línea en operación y tu primer tablero del lunes.",
        },
      ],
      rulesHeading: "Las reglas son tuyas",
      rulesLede:
        "La automatización solo es aceptable cuando puedes ver qué va a hacer antes de que lo haga. Estas son las decisiones que tomas, en lenguaje claro, y que cambias cuando quieras.",
      rules: [
        ["Urgencia", "Las emergencias del día llaman a la persona de guardia en vez de dejar mensaje"],
        ["Idioma", "Quien llama en español sigue en español hasta agendar y confirmar"],
        ["Escalamiento", "Todo lo que salga del guion pasa a una persona con la conversación completa"],
        ["Límites de agenda", "Qué calendarios, qué horarios, con cuánta anticipación y qué margen"],
        ["Retención", "Cuánto se conservan grabaciones y transcripciones, y quién puede leerlas"],
        ["Reversión", "Cualquier acción del agente la puede revertir una persona, y queda registrado"],
      ] as [string, string][],
      mondayHeading: "Lo que llega el lunes",
      mondayLede:
        "Una página, cada semana, escrita para que un dueño la lea entre trabajo y trabajo. Empieza por lo que salió mal, porque es lo que de otro modo tendrías que ir a buscar.",
      monday: [
        ["Llamadas atendidas", "Cada llamada, con el motivo por el que entró"],
        ["Resultados", "Agendada, derivada, resuelta o cerrada — y por cuál regla"],
        ["Escalamientos", "Qué llegó a una persona, y por qué el agente lo entregó"],
        ["Fallas", "Todo lo que el agente hizo mal, listado antes de que tengas que encontrarlo"],
      ] as [string, string][],
      consultantHeading: "Un consultor senior, con nombre",
      consultantLede:
        "Cada implementación la lidera un operador senior al que puedes llamar directamente. Sin tickets de primer nivel, sin respuestas a las 48 horas, y sin entregar el proyecto a alguien que no estuvo cuando se escribió el proceso.",
      consultantBand: [
        ["Antes", "Escribe el proceso junto a tu equipo"],
        ["Durante", "Ajusta el guion con tu tráfico real"],
        ["Al arrancar", "Se queda encima toda la primera semana"],
        ["Después", "Es la persona a la que llamas, no una fila de espera"],
      ] as [string, string][],
      closeHeading: "Empieza con un solo proceso",
      closeBody:
        "Catorce días, un proceso, y un registro escrito de todo lo que el agente hizo en tu nombre.",
      seeTheAgents: "Ver los agentes",
    },

    industries: {
      title: "Industrias",
      description:
        "Hecho para operadores en arquitectura y diseño, piedra y fabricación, servicio en campo, manufactura, salud y legal — donde una llamada perdida es un trabajo perdido.",
      heading: "Hecho para los negocios a los que una llamada perdida sí les cuesta",
      lede: "Negocios dirigidos por su dueño, donde el teléfono es la puerta de entrada, quien llama suele estar listo para comprar, y la mitad preferiría hablar en español.",
      indexLabel: "Sectores en esta página",
      sectors: [
        {
          id: "design-stone",
          name: "Diseño y Piedra",
          line: "Donde la plancha se encuentra con el plano.",
          desc: "Tiempos de entrega largos, conversaciones cargadas de especificaciones, y clientes que necesitan una respuesta antes de poder cotizar. Una respuesta equivocada cuesta un espacio de plantilla.",
          trades: [
            ["Despachos de arquitectura", "Llamadas de especificación · RFIs · derivación a consultores"],
            ["Estudios de interiorismo", "Consultas de showroom · muestras · cuentas de mayoreo"],
            ["Fabricación de piedra y cuarzo", "Plantillas · planos · programación de instalación"],
            ["Patios y distribuidores", "Inventario de planchas · apartados · cotización de flete"],
            ["Showrooms de cocina y baño", "Showroom · anticipos · tiempos de proveedor · instalación"],
          ] as [string, string][],
        },
        {
          id: "field-service",
          name: "Servicio en Campo y Construcción",
          line: "La central de despacho que nunca se va a casa.",
          desc: "Las emergencias no esperan al horario de oficina, y quien cae en un buzón agenda con el primero que contestó. La urgencia hay que juzgarla en la llamada, no después.",
          trades: [
            ["Plomería y climatización", "Despacho de emergencias · programación"],
            ["Servicios para el hogar", "Contratos de mantenimiento · demanda por temporada"],
            ["Constructoras a medida", "Subcontratistas · órdenes de cambio · trato con el cliente"],
            ["Oficios y contratistas", "Cotización · notas del estimador · captación bilingüe"],
          ] as [string, string][],
        },
        {
          id: "manufacturing",
          name: "Manufactura y Distribución",
          line: "Cotizar respetando tus tiempos reales.",
          desc: "Una solicitud contestada con un número que nadie puede cumplir es peor que una contestada despacio. La calificación tiene que saber qué puede entregar la planta.",
          trades: [
            ["Producción y OEM", "Calificación de solicitudes · derivación a ingeniería · CRM"],
            ["Materiales de construcción", "Mostrador · recolección · ventanas de entrega"],
          ] as [string, string][],
        },
        {
          id: "professional",
          name: "Servicios Profesionales y Salud",
          line: "Una recepción que sabe guardar una confidencia.",
          desc: "Trabajo regulado, personas que llaman por temas delicados, y un registro que tiene que resistir una revisión. Aquí la captación bilingüe es lo que más pesa — y también saber cuándo detenerse y buscar a una persona.",
          trades: [
            ["Legal y contabilidad", "Captación · revisión de conflictos · agendar consultas"],
            ["Salud y consultorios", "Agenda bilingüe · derivación urgente · inasistencias"],
            ["Bienes raíces", "Consultas de propiedades · visitas · seguimiento"],
          ] as [string, string][],
        },
      ],
      closeHeading: "¿No está tu sector?",
      closeBody:
        "El proceso importa más que el sector. Si tu teléfono es la puerta de entrada y las llamadas siguen un patrón, un consultor puede documentarlo en dos semanas.",
    },

    about: {
      title: "Nosotros",
      description:
        "Con el rigor de una consultoría, al precio de un software. Consultores senior, agentes bilingües y un registro auditable en cada acción — operando en Canadá y Estados Unidos.",
      heading: "Con el rigor de una consultoría. Al precio de un software.",
      lede: "Orchelix construye e implementa sistemas multiagente que operan el área comercial de negocios dirigidos por su dueño — el trabajo recurrente y urgente que se cae cuando un equipo pequeño está ocupado.",
      whyHeading: "Por qué existe",
      whyLede:
        "Hay tres fallas que se repiten en negocios que ya intentaron automatizar. La empresa está construida alrededor de no repetirlas.",
      failures: [
        {
          title: "Pilotos que nunca gradúan",
          desc: "La mayoría de los proyectos de IA se quedan en una prueba de concepto que impresiona en la sala de demostración pero nunca toca un prospecto real, una llamada real ni una factura real.",
        },
        {
          title: "Nadie responde después del arranque",
          desc: "El proveedor entrega el sistema y desaparece. Cuando el modelo se desvía, el volumen sube o aparecen casos raros, no hay a quién llamar.",
        },
        {
          title: "Automatización que nadie puede revisar",
          desc: "Un sistema que no puede mostrar cómo llegó ahí no se le puede confiar a un cliente, ni defender ante un auditor cuando alguien pregunta qué pasó.",
        },
      ],
      commitHeading: "A qué nos comprometemos",
      commitLede:
        "Son compromisos, no logros. Describen cómo se lleva cada proyecto, y puedes exigírnoslos desde el primer día del piloto.",
      commitments: [
        ["Responsable", "Un consultor senior es dueño de tu proyecto de principio a fin"],
        ["Idiomas", "Inglés y español de forma nativa; francés a solicitud"],
        ["Registro", "Un registro auditable completo de cada acción, revisable y reversible"],
        ["Datos", "Tus datos se quedan en tus sistemas; residencia a solicitud"],
        ["Supervisión", "Siempre con una persona en el circuito, nunca fuera de él"],
        ["Medición", "El éxito se cuenta en trabajo agendado, no en tokens procesados"],
      ] as [string, string][],
      engagementHeading: "Cómo se lleva un proyecto",
      engagement: [
        {
          title: "Documentar el proceso a fondo",
          desc: "Un consultor senior se sienta con quienes hacen el trabajo hoy y escribe lo que realmente pasa — incluidas las excepciones que nadie documentó.",
        },
        {
          title: "Diseñar el conjunto correcto de agentes",
          desc: "Elegimos el sistema más pequeño que resuelve el proceso documentado. Sumar agentes que no necesitas es como una implementación se vuelve imposible de mantener.",
        },
        {
          title: "Implementar dentro de tus herramientas",
          desc: "Los agentes corren dentro de la línea telefónica, el correo, el CRM y la contabilidad que ya usas. No se migra nada ni se crea un sistema paralelo.",
        },
        {
          title: "Seguir respondiendo después del arranque",
          desc: "El mismo consultor sigue en el proyecto. Cuando sube el volumen o aparece un caso raro, llamas a una persona que ya conoce tu configuración.",
        },
      ],
      whereHeading: "Dónde operamos",
      whereLede:
        "Orchelix trabaja a ambos lados de la frontera. Por eso también la capacidad bilingüe es nativa y no un adicional — es como hablan de verdad los clientes de nuestros clientes.",
      reach: [
        ["Operación", "Canadá y Estados Unidos"],
        ["Presencial", "Sur de Florida"],
        ["Remoto", "En ambos países"],
        ["Privacidad", "Alineado con PIPEDA para operaciones en Canadá"],
      ] as [string, string][],
      closeHeading: "Habla con un consultor",
      closeBody:
        "No es una llamada de ventas. Es una conversación sobre un proceso, si vale la pena automatizarlo, y qué tomaría hacerlo.",
    },

    book: {
      title: "Agenda un piloto",
      description:
        "Treinta minutos con un consultor senior de Orchelix. Trae un proceso; te vas con una propuesta de una página — alcance, plazos y el tablero con el que ambos mediríamos el éxito.",
      heading: "Trae un solo proceso",
      lede: "Treinta minutos con un consultor senior. Te vas con una propuesta por escrito, sigas adelante o no.",
      promises: [
        ["Duración", "Treinta minutos. Tu tiempo vale más que una llamada de descubrimiento larga."],
        ["Con quién", "Un operador senior — la misma persona que sería dueña de tu implementación."],
        ["Te llevas", "Una propuesta de una página: el proceso, el tablero de éxito y los plazos."],
        ["Idioma", "Inglés o español, el que prefieras para trabajar."],
      ] as [string, string][],
      agendaHeading: "Qué pasa en la llamada",
      agenda: [
        {
          when: "Minutos 0–5",
          title: "Tu proceso, en tus palabras",
          desc: "Un consultor senior pregunta por el proceso que hoy te cuesta más tiempo o más ingresos. Esa es toda la entrevista.",
        },
        {
          when: "Minutos 5–20",
          title: "Un agente real en una llamada real",
          desc: "Reproducimos una grabación real de Esmi y recorremos el registro que dejó — la transcripción, el motivo, el estado — en vez de un video de demostración pulido.",
        },
        {
          when: "Minutos 20–28",
          title: "Una recomendación concreta",
          desc: "Un proceso para el piloto, un plazo de catorce días, y el tablero con el que ambos mediríamos el éxito. A tu medida, no una plantilla.",
        },
        {
          when: "Después",
          title: "Una propuesta de una página, sin insistir",
          desc: "Alcance, plazos, tablero de éxito y precio en una sola página. Decides con calma. Si no es lo que necesitas, te lo decimos primero.",
        },
      ],
      dataHeading: "Qué hacemos con lo que nos cuentas",
      dataLede:
        "Estás por describir cómo funciona tu negocio de verdad. Eso merece decirse claro y no enterrarse en una página de políticas.",
      dataBand: [
        ["Quién lo lee", "El consultor que llevaría tu implementación"],
        ["Privacidad", "Alineado con PIPEDA para operaciones en Canadá"],
        ["Residencia", "Residencia de datos a solicitud"],
        ["Sin listas", "No vendemos ni compartimos tus datos, ni te metemos a una secuencia de correos"],
      ] as [string, string][],
      form: {
        fullName: "Nombre completo",
        workEmail: "Correo de trabajo",
        company: "Empresa",
        phone: "Teléfono",
        optional: "opcional",
        industry: "Industria",
        selectOne: "Elige una",
        workflow: "¿Qué te gustaría que operara un agente?",
        workflowPlaceholder:
          "Con un solo proceso basta — por ejemplo, llamadas fuera de horario que caen al buzón, o un cierre de mes que toma dos semanas.",
        bestTime: "Mejor horario para contactarte",
        times: ["Mañanas", "Tardes", "Noches", "Cualquier hora"],
        industries: [
          "Arquitectura y diseño",
          "Piedra y fabricación",
          "Servicio en campo y construcción",
          "Manufactura y distribución",
          "Salud y consultorios",
          "Legal y contabilidad",
          "Otra",
        ],
        submit: "Agenda un piloto",
        sending: "Enviando…",
        noCard: "Sin tarjeta",
        received: "Recibido",
        receivedBody:
          "Tu solicitud está con un consultor senior. Espera respuesta dentro de un día hábil — de una persona, con un horario propuesto.",
        soonerIsFine: "Si prefieres antes —",
        notSent: "No se envió",
        errorTail:
          "No se envió nada — inténtalo de nuevo, o llama al número de arriba y lo agendamos directamente.",
      },
    },

    /* Las dos páginas verticales comparten una sola forma y, por lo tanto,
       un solo contrato de copia. Ver el comentario en en.ts para la lista
       de afirmaciones eliminadas en la conversión del 2026-08-08. */
    /* /ai-receptionist — la página de producto de Esmi y la matriz de las
       siete páginas sectoriales. Ver el comentario en en.ts para lo que se
       eliminó en la conversión (tres testimonios con el prefijo literal
       «[Placeholder]») y lo que se corrigió (el plazo de puesta en marcha). */
    /* /blog — índice y estructura del artículo. Los cuerpos de artículo
       quedan fuera de este pase de forma deliberada; ver el comentario en
       en.ts. */
    /* /acumen y /missed-calls — ver el comentario en en.ts para las
       correcciones de honestidad aplicadas en la conversión. */
    acumen: {
      title: "AcumenAI — libros que se concilian solos",
      description:
        "AcumenAI es el sistema de contabilidad y finanzas: lee estados de cuenta, verifica cada transacción contra el saldo corriente del propio banco, clasifica al catálogo de cuentas y envía las excepciones a aprobación humana de un clic — con un registro auditable completo.",
      heading: "Libros que se concilian solos",
      lede: "AcumenAI lee un estado de cuenta, contrasta cada transacción con el saldo corriente del propio banco, la clasifica en la cuenta contable correcta y envía a revisión solo lo que exige criterio — con un registro auditable detrás de cada paso.",
      facts: [
        ["Estado", "En desarrollo"],
        ["Verificación", "Cadena de saldos, no inferencia"],
        ["Aprobación", "Una persona aprueba, nunca captura"],
        ["Registro", "Cada paso registrado y exportable"],
      ] as [string, string][],
      whyHeading: "Exactitud que puedes auditar, no solo creer",
      why: [
        {
          title: "Verificación por cadena de saldos",
          desc: "El importe con signo de cada transacción debe igualar el cambio en el saldo corriente del propio banco. Aritmética, no la conjetura de un modelo — así los signos invertidos y las filas perdidas salen a la luz en vez de colarse.",
        },
        {
          title: "Un registro que resiste una auditoría",
          desc: "Cada lectura, clasificación y aprobación queda registrada con fecha, hora y motivo, atribuible y exportable. La base de cumplimiento que una firma contable realmente necesita.",
        },
        {
          title: "Una persona aprueba, nunca captura",
          desc: "Las transacciones claras se clasifican solas; lo que exige criterio pasa a una cola de aprobar o rechazar con un clic. Las reglas por cliente aprenden con el tiempo, así que la cola se encoge conforme maduran los libros.",
        },
      ],
      closeHeading: "Vela correr sobre tus propios libros",
      closeBody:
        "AcumenAI hace la lectura, la aritmética y la captura. Tu equipo revisa las excepciones y aprueba — la parte que exige criterio. Un piloto de catorce días lo pone frente a tu contabilidad real.",
      openConsole: "Abrir la consola",
    },

    missedCalls: {
      title: "Deja de perder citas por llamadas no contestadas",
      description:
        "Esmi es una recepcionista de IA que contesta fuera de horario, agenda citas en tu calendario y captura prospectos — en inglés y español. Escúchala en dos minutos.",
      heading: "Deja de perder citas por llamadas fuera de horario",
      lede: "Esmi contesta cuando tú no puedes, agenda en tu calendario mientras quien llama sigue en la línea y te envía el prospecto por mensaje. Inglés y español en el mismo número.",
      bullets: [
        ["Contesta", "Cuando estás ocupado, cerrado o con un cliente"],
        ["Agenda", "Directo en tu calendario — sin “luego te llamamos”"],
        ["Registra", "Cada llamada, chat y cita en un solo tablero"],
        ["Idiomas", "Inglés y español en la misma línea"],
      ] as [string, string][],
      formHeading: "Escúchala en tu propio teléfono",
      formLede:
        "Déjanos un número y lo llamamos con Esmi en la línea, para que escuches lo que escucharían tus propios clientes.",
      closeHeading: "Escucha la llamada antes de decidir",
      closeBody:
        "Hay una grabación real en la página de demo, y el mismo agente en un chat donde puedes escribir. Dos minutos, sin formulario.",
    },

    blog: {
      title: "Blog",
      description:
        "Guías prácticas sobre recepcionistas de IA, agentes de IA y la automatización de la recepción — precios, comparativas y cómo ponerlos a trabajar en tu negocio.",
      heading: "La IA en la recepción, explicada",
      lede: "Guías sobre recepcionistas de IA, agentes de IA y la automatización de las conversaciones con clientes — escritas para dueños de negocio, no para ingenieros.",
      readingSuffix: "min de lectura",
      allArticles: "Todos los artículos",
      keepReading: "Sigue leyendo",
      closeHeading: "Leerlo no es lo mismo que escucharlo",
      closeBody:
        "Hay una grabación real de Esmi en la página de demo, y el mismo agente en un chat donde puedes escribir. Dos minutos, sin formulario.",
    },

    aiReceptionist: {
      title: "Recepcionista de IA para pequeñas empresas",
      description:
        "Esmi contesta cada llamada 24/7, califica a quien llama, agenda la cita y transfiere a una persona cuando hace falta — en inglés y español, con transcripción y motivo en cada llamada.",
      heading: "El teléfono se contesta, y la llamada queda escrita",
      lede: "Esmi es la recepcionista que no se va a casa. Contesta, califica, agenda en tu calendario real y deja un registro que puedes leer después — en inglés o español, según hable quien llama.",
      facts: [
        ["Estado", "En producción, contestando llamadas hoy"],
        ["Idiomas", "Inglés y español, de forma nativa"],
        ["Horario", "24/7, noches y fines de semana incluidos"],
        ["En vivo en", "14 días desde la primera llamada"],
      ] as [string, string][],
      doesHeading: "Qué hace durante una llamada",
      does: [
        ["Contesta", "Cada llamada, a cualquier hora, en el idioma de quien llama — ni un menú ni un buzón."],
        ["Califica", "Las preguntas que harías tú, hechas como las harías tú, antes de gastar el tiempo de nadie."],
        ["Agenda", "En tu calendario en vivo, durante la llamada, con confirmación enviada a quien llamó."],
        ["Escala", "Cuando la llamada necesita a una persona, la transfiere con toda la conversación adjunta."],
        ["Registra", "Transcripción, motivo y disposición en cada llamada — revisables y reversibles."],
      ] as [string, string][],
      sectorsHeading: "Hecho para cómo contesta el teléfono tu sector",
      sectorsLede:
        "El agente es el mismo; las preguntas, el enrutamiento y el vocabulario no lo son. Estos son los sectores para los que hemos configurado a Esmi.",
      sectorsIndexLabel: "Sectores en esta página",
      faqHeading: "Lo que preguntan primero",
      faq: [
        {
          q: "¿Qué es una recepcionista de IA?",
          a: "Una recepcionista de IA es un agente telefónico virtual que contesta tus llamadas entrantes de forma automática — saluda, responde preguntas comunes, califica prospectos y agenda citas — sin que una persona levante el teléfono. Esmi funciona 24/7 y escala a tu equipo cuando la llamada necesita a alguien.",
        },
        {
          q: "¿En qué se diferencia de un servicio de contestadora tradicional?",
          a: "Una contestadora tradicional toma mensajes y los reenvía; tú sigues devolviendo las llamadas. Esmi resuelve toda la interacción en tiempo real — responde, califica y agenda la cita en tu calendario antes de que cuelguen — así no queda nada pendiente de seguimiento.",
        },
        {
          q: "¿La recepcionista de IA puede agendar citas?",
          a: "Sí. Esmi consulta tu calendario en vivo, ofrece los espacios libres, agenda la cita y envía una confirmación por SMS — todo en la misma llamada. Sin transferencia a tu personal.",
        },
        {
          q: "¿Esmi habla español?",
          a: "Sí. Esmi es bilingüe (inglés y español) y puede cambiar de idioma a mitad de la llamada, lo que importa para atender el sur de Florida y los mercados bilingües.",
        },
        {
          q: "¿Qué pasa cuando una llamada necesita a una persona?",
          a: "Esmi escala a tu equipo y transfiere todo el contexto de la llamada — quién llama, qué necesita y un resumen — para que quien la reciba no empiece de cero.",
        },
        {
          q: "¿Cuánto tarda la puesta en marcha?",
          a: "El primer agente entra en operación catorce días después de la primera llamada. Lo configuramos con tus guiones, tu calendario y tus preguntas frecuentes, y lo probamos contigo antes de que conteste algo real.",
        },
        {
          q: "¿Quien llama sabrá que habla con una IA?",
          a: "Esmi está diseñada para ser natural y útil, y somos transparentes sobre cómo se presenta. Tú controlas el saludo y el tono para que refleje tu marca.",
        },
        {
          q: "¿Cuánto cuesta una recepcionista de IA?",
          a: "Starter cuesta $299 al mes, Growth $599 y Scale $999, con la configuración hecha por nosotros. Un piloto de catorce días cuesta $149, acreditado a tu primera factura si continúas.",
        },
      ],
      closeHeading: "Escúchala antes de contratarla",
      closeBody:
        "Hay una grabación real en la página de demo, y el mismo agente está ahí en un chat donde puedes escribir. Sin formulario, sin agendar — el producto haciendo su trabajo.",
    },

    verticals: {
      homeServices: {
        title: "Recepcionista de IA para servicios del hogar",
        description:
          "Esmi contesta cada llamada de climatización, plomería, techado y electricidad — fuera de horario, en pleno trabajo, en inglés y español — y agenda el trabajo en tu calendario.",
        heading: "La llamada de las 8 de la noche es de quien conteste",
        lede: "Una recepcionista bilingüe para negocios de servicios del hogar. Esmi contesta fuera de horario, los fines de semana y mientras tu cuadrilla está en un trabajo — califica el servicio y lo agenda directo en tu calendario.",
        facts: [
          ["Oficios", "Climatización, plomería, techado, electricidad"],
          ["Idiomas", "Inglés y español, de forma nativa"],
          ["Horario", "24/7, noches y fines de semana incluidos"],
          ["En vivo en", "14 días desde la primera llamada"],
        ] as [string, string][],
        slipsHeading: "Lo que te cuesta el teléfono",
        slips: [
          {
            title: "Las llamadas fuera de horario caen en el buzón",
            desc: "Una emergencia a las ocho de la noche se agenda con quien conteste. Un buzón de voz es una decisión que toma por ti la siguiente empresa de la lista.",
          },
          {
            title: "Tu cuadrilla no puede contestar desde un trabajo",
            desc: "Cada timbre que atiende un técnico es trabajo interrumpido. El teléfono compite con aquello por lo que realmente te pagan.",
          },
          {
            title: "Quien llama en español recibe menos",
            desc: "Una parte importante del mercado preferiría agendar en español, y casi nadie tiene personal para atenderlo fuera de horario.",
          },
        ],
        callHeading: "Cómo transcurre la llamada",
        call: [
          ["Contesta", "Esmi atiende la llamada a cualquier hora, en inglés o español."],
          ["Califica", "Emergencia o rutina, dentro o fuera del área de servicio — las preguntas que harías tú, hechas como las harías tú."],
          ["Escala", "Una emergencia real localiza tu teléfono de guardia con el resumen de la conversación adjunto."],
          ["Agenda", "Todo lo demás entra en tu calendario con nombre, dirección y problema, y una confirmación para quien llamó."],
          ["Registra", "Transcripción, motivo y disposición en cada llamada — revisables y reversibles."],
        ] as [string, string][],
        closeHeading: "En tu línea en catorce días",
        closeBody:
          "Starter cuesta $299 al mes con la configuración hecha por nosotros. Un piloto de catorce días cuesta $149, acreditado a tu primera factura si continúas.",
      },

      kitchenBath: {
        title: "Recepcionista de IA para cocina, baño y piedra",
        description:
          "Esmi contesta cada llamada de constructores de cocinas, fabricantes de piedra y firmas de diseño/construcción — cotiza los rangos que tú defines, califica a los propietarios y agenda consultas 24/7 en inglés y español.",
        heading: "Tu próximo trabajo de cocina llama mientras estás en este",
        lede: "Una recepcionista bilingüe para fabricantes, constructores de cocinas y firmas de diseño/construcción. Esmi cotiza los rangos iniciales que tú defines, separa a los propietarios serios de los curiosos y agenda la consulta en tu calendario.",
        facts: [
          ["Oficios", "Fabricación, cocina y baño, diseño/construcción"],
          ["Idiomas", "Inglés y español, de forma nativa"],
          ["Horario", "24/7, noches y fines de semana incluidos"],
          ["En vivo en", "14 días desde la primera llamada"],
        ] as [string, string][],
        slipsHeading: "Lo que te cuesta el teléfono",
        slips: [
          {
            title: "La llamada llega mientras estás en la sierra",
            desc: "Un propietario listo para gastar cae en el buzón y marca al siguiente taller de la lista antes de que te hayas limpiado las manos.",
          },
          {
            title: "El taller que contesta se lleva la visita",
            desc: "Los propietarios reúnen varias cotizaciones antes de decidir, y la visita al sitio es donde realmente se gana el trabajo.",
          },
          {
            title: "Quien llama en español recibe menos",
            desc: "Cuadrillas, oficios y muchos propietarios preferirían hablar en español. La mayoría de los talleres no puede atenderlos; Esmi lo hace de forma nativa.",
          },
        ],
        callHeading: "Cómo transcurre la llamada",
        call: [
          ["Contesta", "Esmi atiende la llamada a cualquier hora, por teléfono o chat web, en inglés o español."],
          ["Cotiza", "Tus rangos iniciales, exactamente como los defines — tus números, nunca una cifra inventada."],
          ["Califica", "Presupuesto, plazo y alcance. Diseñadores y oficios quedan marcados como prioritarios."],
          ["Agenda", "La consulta entra en tu calendario real durante la llamada, con cada detalle enviado a ti después."],
          ["Registra", "Transcripción, motivo y disposición en cada llamada — revisables y reversibles."],
        ] as [string, string][],
        closeHeading: "En tu línea en catorce días",
        closeBody:
          "Orchelix opera en Canadá y Estados Unidos, con área de servicio en el sur de Florida. Starter cuesta $299 al mes con la configuración hecha por nosotros, y un piloto de catorce días cuesta $149.",
      },
    },
  },
};

export default es;
