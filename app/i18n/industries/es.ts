import type { Industry } from "./types";

/* Copia sectorial para /ai-receptionist/[industry], español.

   Traducida de la versión inglesa ya corregida — ver el comentario en en.ts
   para la lista de afirmaciones eliminadas. Ninguna cifra de referencia ni
   promesa de latencia sobrevive aquí tampoco.

   Los slugs permanecen en inglés en ambos idiomas, igual que el resto del
   sitio: traducirlos duplica la superficie de rutas y rompe los enlaces
   entrantes en cada revisión. */

const INDUSTRIES_ES: Industry[] = [
  {
    slug: "hvac",
    name: "Climatización y servicios del hogar",
    title: "Recepcionista de IA para empresas de climatización | Esmi de Orchelix",
    description:
      "Esmi contesta llamadas de emergencia, agenda servicios y coordina a tus técnicos 24/7 — para que una llamada fuera de horario se conteste en lugar de quedar guardada, incluso a las 2 de la mañana.",
    hero: {
      headline: "Cada llamada contestada, incluida la de las 2 de la mañana",
      sub: "Esmi contesta cada llamada, califica el trabajo y agenda la cita — a toda hora, incluso en los picos de temporada y en las emergencias fuera de horario.",
    },
    problems: [
      {
        title: "Las emergencias fuera de horario se escapan",
        body: "Un cliente con el aire acondicionado averiado a medianoche cuelga y llama a tu competencia. Pierdes el trabajo antes siquiera de despertarte.",
      },
      {
        title: "Los picos de temporada desbordan tu oficina",
        body: "El calor del verano y el frío del invierno llegan de golpe. Tu equipo no da abasto con el volumen y quien llama encuentra la línea ocupada.",
      },
      {
        title: "Los técnicos pierden tiempo en llamadas cruzadas",
        body: "Coordinar el despacho exige llamadas de ida y vuelta. Cada minuto al teléfono es un minuto fuera de la obra.",
      },
      {
        title: "Las llamadas perdidas son ingresos perdidos",
        body: "Una instalación es un trabajo, no una consulta. Una llamada perdida no solo cuesta un prospecto — cuesta la obra.",
      },
    ],
    benefits: [
      {
        title: "Emergencias atendidas 24/7",
        body: "Esmi contesta a cualquier hora, evalúa la situación y dirige las emergencias a tu técnico de guardia en la misma llamada.",
      },
      {
        title: "Citas agendadas en tu calendario",
        body: "Quien llama elige un horario, Esmi lo agenda, envía la confirmación y tu técnico llega preparado.",
      },
      {
        title: "Calificación del trabajo antes del despacho",
        body: "Esmi hace las preguntas correctas — antigüedad del equipo, síntomas, tipo de propiedad — para que tu técnico conozca el trabajo antes de llegar.",
      },
      {
        title: "Protección ante picos de temporada",
        body: "Los picos de volumen no hacen cola detrás de una sola recepcionista. Esmi atiende llamadas simultáneas sin sumar personal.",
      },
      {
        title: "Bilingüe (EN/ES)",
        body: "Atiende a los clientes hispanohablantes del sur de Florida en su idioma, en cada llamada.",
      },
      {
        title: "Transferencia a una persona cuando hace falta",
        body: "Cuando la llamada necesita a alguien real, Esmi la escala con todo el contexto — quien llama no repite nada.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi puede atender emergencias de climatización fuera de horario?",
        a: "Sí. Esmi contesta a toda hora, evalúa la urgencia y conecta a quien llama con tu técnico de guardia en emergencias reales — o agenda la primera cita disponible si no es urgente.",
      },
      {
        q: "¿Cómo ayuda Esmi con el despacho?",
        a: "Esmi califica la llamada (ubicación, tipo de problema, datos del equipo), agenda la cita en tu calendario en vivo y envía un resumen a tu técnico — para que llegue preparado, no adivinando.",
      },
      {
        q: "¿Aguanta la temporada alta?",
        a: "Sí. Las llamadas simultáneas no hacen cola una detrás de otra, así que un día cargado no empuja a quien llama a un bucle de espera como sí lo hace una sola recepción.",
      },
      {
        q: "¿Funciona con nuestro software de agenda?",
        a: "Nos integramos con las herramientas de servicio en campo y calendario más comunes. Durante la configuración conectamos Esmi a tu sistema actual para que las citas lleguen exactamente donde deben.",
      },
      {
        q: "¿Sirve para una operación con varios técnicos?",
        a: "Sí. Esmi puede dirigir llamadas y citas según disponibilidad, territorio o tipo de servicio — configurado para reflejar cómo opera tu equipo.",
      },
    ],
    schema: {
      serviceType: "Recepcionista de IA para empresas de climatización",
      serviceDescription:
        "Atención telefónica y agendamiento con IA para empresas de climatización y servicios del hogar. Atiende emergencias fuera de horario, picos de llamadas de temporada, calificación del trabajo y despacho de técnicos — 24/7, bilingüe.",
    },
  },

  {
    slug: "dental",
    name: "Consultorios dentales y médicos",
    title: "Recepcionista de IA para consultorios dentales | Esmi de Orchelix",
    description:
      "Esmi contesta cada llamada de paciente, agenda citas, resuelve dudas de seguro y libera a tu recepción para atender en consultorio. Sin cola de espera, y las llamadas de pacientes nuevos se contestan en lugar de quedar guardadas.",
    hero: {
      headline: "La recepción deja de elegir entre el teléfono y el paciente",
      sub: "Esmi atiende llamadas de pacientes nuevos, agenda citas y responde preguntas de rutina para que tu recepción se concentre en los pacientes que tiene enfrente.",
    },
    problems: [
      {
        title: "Los pacientes nuevos cuelgan y agendan en otro lado",
        body: "Un paciente potencial que espera en línea y cuelga agendará con el consultorio de la esquina antes de que le devuelvas la llamada.",
      },
      {
        title: "La recepción está partida entre el mostrador y el teléfono",
        body: "Tu personal no puede dar atención plena al paciente que está en el mostrador y al que llama al mismo tiempo.",
      },
      {
        title: "Las llamadas fuera de horario caen en el buzón",
        body: "Las urgencias dentales no siguen un horario. Un paciente con dolor a las 8 de la noche necesita hablar con alguien, no con un buzón.",
      },
      {
        title: "Las preguntas de rutina consumen horas productivas",
        body: "Se va el tiempo respondiendo «¿aceptan mi seguro?» y «¿cuál es su horario?» — preguntas que Esmi resuelve durante la llamada.",
      },
    ],
    benefits: [
      {
        title: "Admisión de pacientes nuevos en la llamada",
        body: "Esmi toma nombre, seguro, motivo de consulta y horario preferido — y agenda la cita antes de que cuelguen.",
      },
      {
        title: "Sin cola de espera",
        body: "A quien llama se le contesta en lugar de dejarlo esperando. Sin música de espera, sin «su llamada es importante para nosotros».",
      },
      {
        title: "Triaje de urgencias dentales fuera de horario",
        body: "Esmi evalúa la urgencia y conecta los casos de emergencia con tu línea de guardia, mientras agenda lo rutinario para el siguiente espacio.",
      },
      {
        title: "Seguros y preguntas frecuentes",
        body: "Preguntas de seguro, cómo llegar, horarios, política de cancelación — Esmi las responde durante la llamada y libera a tu personal.",
      },
      {
        title: "Recordatorios y confirmaciones",
        body: "Esmi confirma las citas y envía recordatorios, reduciendo las ausencias sin seguimiento manual.",
      },
      {
        title: "Bilingüe (EN/ES)",
        body: "Atiende a pacientes hispanohablantes sin necesitar personal bilingüe en recepción en cada turno.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi puede agendar citas de pacientes nuevos?",
        a: "Sí. Esmi toma los datos del paciente, consulta tu calendario en vivo, ofrece los espacios disponibles, agenda la cita y envía una confirmación — todo en la primera llamada.",
      },
      {
        q: "¿Cómo maneja las preguntas de seguro?",
        a: "Tú le proporcionas a Esmi la lista de seguros que aceptas y las preguntas frecuentes. Responde directamente las consultas de rutina y marca las de cobertura compleja para tu área de facturación.",
      },
      {
        q: "¿Qué pasa con una urgencia dental fuera de horario?",
        a: "Esmi hace preguntas de triaje para evaluar la urgencia. Las emergencias reales se dirigen a tu línea de guardia; lo no urgente se agenda para el primer espacio de la mañana siguiente.",
      },
      {
        q: "¿Sonará natural para los pacientes?",
        a: "Sí. Esmi está diseñada para sonar profesional y cercana. Tú controlas el saludo, el tono y el guion para que refleje la voz de tu consultorio.",
      },
      {
        q: "¿Aplica el cumplimiento HIPAA?",
        a: "Tomamos los datos de pacientes con seriedad y recogemos solo lo necesario para calificar y agendar. Pregúntanos por nuestro manejo de datos y el proceso de BAA durante la consulta.",
      },
    ],
    schema: {
      serviceType: "Recepcionista de IA para consultorios dentales y médicos",
      serviceDescription:
        "Atención telefónica con IA, admisión de pacientes nuevos, agendamiento y triaje fuera de horario para consultorios dentales y médicos. Resuelve dudas de seguro y libera a la recepción — bilingüe.",
    },
  },

  {
    slug: "law-firm",
    name: "Despachos y prácticas legales",
    title: "Recepcionista de IA para despachos de abogados | Esmi de Orchelix",
    description:
      "Esmi contesta cada llamada de cliente potencial, califica el asunto y agenda consultas 24/7. Deja de perder casos en el buzón de voz.",
    hero: {
      headline: "La admisión ocurre en la primera llamada, no en la devolución",
      sub: "Esmi contesta a toda hora, califica los asuntos nuevos y agenda consultas — para que tus abogados se concentren en el trabajo facturable, no en la admisión.",
    },
    problems: [
      {
        title: "Los clientes potenciales llaman una vez y siguen de largo",
        body: "Los asuntos legales son urgentes. Quien cae en el buzón llama al siguiente despacho en Google. No hay segunda oportunidad.",
      },
      {
        title: "La admisión se come horas facturables",
        body: "Cada hora que un abogado o asistente dedica a preguntas de admisión de rutina es una hora que no se factura.",
      },
      {
        title: "Las llamadas fuera de horario quedan sin respuesta",
        body: "Accidentes, detenciones y urgencias legales ocurren a cualquier hora. El despacho que contesta a las 11 de la noche se queda con el caso.",
      },
      {
        title: "Los asuntos no calificados consumen tiempo del equipo",
        body: "El personal atiende llamadas que no encajan con tus áreas de práctica. Esmi las filtra primero para que tu equipo solo atienda lo que corresponde.",
      },
    ],
    benefits: [
      {
        title: "Admisión de clientes nuevos 24/7",
        body: "Esmi contesta a cualquier hora, hace las preguntas de calificación sobre el asunto y agenda una consulta en tu calendario.",
      },
      {
        title: "Calificación del asunto antes de agendar",
        body: "Esmi filtra por área de práctica, urgencia y verificación básica de conflicto de interés antes de programar una consulta.",
      },
      {
        title: "Protección de la hora facturable",
        body: "Las llamadas de rutina — cómo llegar, horarios, estado de un documento — nunca llegan a tus abogados ni asistentes.",
      },
      {
        title: "Escalamiento de asuntos urgentes",
        body: "Los asuntos con plazo crítico (detenciones, accidentes, medidas cautelares) se marcan y se dirigen al abogado de guardia en la misma llamada.",
      },
      {
        title: "Calidad de admisión constante",
        body: "Cada cliente potencial recibe el mismo proceso de admisión, profesional y completo, sin importar la hora ni el volumen.",
      },
      {
        title: "Bilingüe (EN/ES)",
        body: "Atiende a clientes hispanohablantes con la misma calidad de admisión en su idioma.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi puede manejar llamadas de admisión legal?",
        a: "Sí. Esmi recoge los datos del asunto, el área de práctica y el nivel de urgencia, y luego agenda una consulta o escala según las reglas que definas en la configuración.",
      },
      {
        q: "¿Cómo maneja la información sensible y los conflictos?",
        a: "Esmi recoge la información mínima necesaria para calificar y agendar. Los detalles del asunto y la verificación de conflictos ocurren con tu equipo en la etapa de consulta.",
      },
      {
        q: "¿Y en situaciones urgentes: detenciones, accidentes?",
        a: "Tú defines las reglas de escalamiento. Las palabras clave de emergencia disparan una transferencia inmediata a tu abogado de guardia, con el resumen completo de la llamada enviado en tiempo real.",
      },
      {
        q: "¿Los clientes sabrán que hablan con una IA?",
        a: "Esmi está diseñada para ser natural y útil, y somos transparentes sobre cómo se presenta. Tú controlas el saludo y el tono para que refleje a tu despacho.",
      },
      {
        q: "¿Puede manejar varias áreas de práctica?",
        a: "Sí. Esmi se configura con guiones de calificación distintos por área de práctica y dirige cada asunto al equipo correcto.",
      },
    ],
    schema: {
      serviceType: "Recepcionista de IA para despachos de abogados",
      serviceDescription:
        "Atención telefónica con IA, admisión de clientes nuevos, calificación de asuntos y agendamiento de consultas 24/7 para despachos y prácticas legales. Protege horas facturables y escala asuntos urgentes, bilingüe.",
    },
  },

  {
    slug: "real-estate",
    name: "Agentes y corredurías inmobiliarias",
    title: "Recepcionista de IA para agentes inmobiliarios | Esmi de Orchelix",
    description:
      "Esmi califica prospectos de compra y venta, agenda visitas y responde consultas de propiedades 24/7 — para que una consulta se conteste mientras estás en un cierre o en una visita.",
    hero: {
      headline: "Contesta al prospecto mientras sigue caliente",
      sub: "Esmi atiende llamadas de compradores y vendedores a toda hora, califica prospectos y agenda visitas — para que cierres más operaciones sin vivir pegado al teléfono.",
    },
    problems: [
      {
        title: "Los compradores llaman a varios agentes a la vez",
        body: "Los compradores llaman a varios agentes al mismo tiempo. Gana quien responde primero. Si estás en una visita cuando llaman, siguen de largo.",
      },
      {
        title: "Las solicitudes de visita llegan a cualquier hora",
        body: "Los compradores exploran anuncios de noche y los fines de semana. Si no pueden agendar en ese momento, agendan con otro.",
      },
      {
        title: "Las visitas no calificadas te consumen el día",
        body: "Necesitas saber quién tiene preaprobación y cuál es su plazo antes de dedicar una tarde a una visita.",
      },
      {
        title: "Las llamadas administrativas interrumpen el tiempo con clientes",
        body: "Cómo llegar, detalles del anuncio, horarios de casa abierta — preguntas de rutina que Esmi atiende por ti.",
      },
    ],
    benefits: [
      {
        title: "Calificación en cada llamada",
        body: "Esmi pregunta por presupuesto, preaprobación, plazo y zona deseada para que sepas a quién conviene devolver la llamada primero.",
      },
      {
        title: "Visitas agendadas sin ida y vuelta",
        body: "Quien llama agenda la visita directamente en tu calendario en vivo — sin cadenas de correos ni devoluciones perdidas.",
      },
      {
        title: "Disponibilidad 24/7",
        body: "Las consultas nocturnas sobre un anuncio se responden esa misma noche, no a la mañana siguiente cuando el prospecto ya se movió.",
      },
      {
        title: "Preguntas frecuentes sobre anuncios",
        body: "Precio, metros cuadrados, cuota de administración, distrito escolar — Esmi responde las preguntas comunes a partir de los datos de tu anuncio.",
      },
      {
        title: "Un resumen después de cada llamada",
        body: "Cada llamada genera un resumen que te llega para que sepas quién llamó y qué necesita antes de devolver la llamada.",
      },
      {
        title: "Bilingüe (EN/ES)",
        body: "El mercado comprador del sur de Florida es diverso y merece atención en su idioma. Esmi cambia de idioma sin fricción.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi puede agendar visitas?",
        a: "Sí. Esmi consulta tu calendario en vivo, ofrece horarios disponibles, confirma la dirección de la propiedad y agenda la visita — antes de que el prospecto cuelgue.",
      },
      {
        q: "¿Cómo califica a los compradores?",
        a: "Tú defines las preguntas de calificación: preaprobación, rango de precio, plazo, preferencias de zona. Esmi recoge las respuestas y las incluye en el resumen de la llamada.",
      },
      {
        q: "¿Y si un prospecto quiere hablar de precio o de estrategia de oferta?",
        a: "Esmi atiende las preguntas de rutina y captura los datos del prospecto. Las conversaciones complejas — estrategia de precio, asesoría de oferta — se marcan para ti con todo el contexto de la llamada.",
      },
      {
        q: "¿Sirve también para propiedades en renta?",
        a: "Sí. Esmi atiende consultas de renta, responde preguntas de disponibilidad y agenda visitas para administradores y propietarios.",
      },
      {
        q: "¿Funciona para un equipo de varios agentes?",
        a: "Sí. Esmi puede dirigir las llamadas al agente correcto según territorio, anuncio o disponibilidad.",
      },
    ],
    schema: {
      serviceType: "Recepcionista de IA para agentes inmobiliarios",
      serviceDescription:
        "Calificación de prospectos con IA, agendamiento de visitas y atención telefónica 24/7 para agentes y corredurías inmobiliarias. Captura prospectos de compra y venta, responde preguntas de anuncios y agenda visitas — bilingüe.",
    },
  },

  {
    slug: "residential-design",
    name: "Diseño de interiores residencial",
    title: "Recepcionista de IA para estudios de diseño de interiores | Esmi de Orchelix",
    description:
      "Esmi agenda llamadas de descubrimiento, captura consultas de proyectos nuevos y responde preguntas de proceso mientras te concentras en el diseño — 24/7, profesional, bilingüe.",
    hero: {
      headline: "Gana clientes nuevos sin levantarte del tablero",
      sub: "Esmi captura cada consulta de cliente nuevo, agenda llamadas de descubrimiento y responde preguntas sobre tu proceso — para que construyas tu cartera sin apartarte del trabajo.",
    },
    problems: [
      {
        title: "Las consultas interrumpen el trabajo creativo profundo",
        body: "La concentración creativa cuesta recuperarla. Cada interrupción telefónica cuesta más tiempo que la llamada en sí.",
      },
      {
        title: "Responder tarde pierde a los clientes ideales",
        body: "Los clientes residenciales de alto nivel tienen opciones. Si un estudio no responde pronto, pasan al siguiente nombre de su lista.",
      },
      {
        title: "Agendar la llamada inicial es un ida y vuelta",
        body: "Coordinar la primera consulta toma varios mensajes. Esmi la agenda en el momento.",
      },
      {
        title: "Las preguntas de rutina te consumen el tiempo",
        body: "Los clientes preguntan lo mismo: tu estilo, tu proceso, tus honorarios. Esmi responde a partir de tus propios puntos clave.",
      },
    ],
    benefits: [
      {
        title: "Captura de consultas de clientes nuevos",
        body: "Esmi recoge tipo de proyecto, rango de presupuesto, plazo y datos de contacto antes de que termine la llamada.",
      },
      {
        title: "Llamada de descubrimiento agendada en el momento",
        body: "Quien llama agenda directamente en tu calendario. Sin cadenas de correos ni coordinación de ida y vuelta.",
      },
      {
        title: "Preguntas frecuentes sobre el proceso",
        body: "Las preguntas sobre tu proceso de diseño, las fases del proyecto y los honorarios se responden con los puntos clave que tú proporcionas.",
      },
      {
        title: "Protege el trabajo profundo",
        body: "Las llamadas no te interrumpen a mitad de proyecto. Revisas el resumen y devuelves la llamada cuando estés listo.",
      },
      {
        title: "Bilingüe (EN/ES)",
        body: "Atiende el mercado residencial multilingüe del sur de Florida sin contestar tú cada llamada.",
      },
      {
        title: "Primera impresión profesional",
        body: "Cada consulta se atiende con el mismo nivel de cuidado que aportas a tu trabajo de diseño.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi puede responder preguntas sobre mi estilo o mi portafolio?",
        a: "Sí. Tú le proporcionas una descripción de tu estética, tus servicios y tu proceso. Responde las preguntas comunes y dirige a los prospectos serios a agendar una llamada de descubrimiento.",
      },
      {
        q: "¿Qué información recoge de las consultas nuevas?",
        a: "Tipo de proyecto, espacio (cocina, sala, casa completa, etc.), rango de presupuesto, plazo y datos de contacto — para que llegues preparado a cada llamada de descubrimiento.",
      },
      {
        q: "¿Cómo maneja las llamadas de clientes actuales que preguntan por su proyecto?",
        a: "Puedes configurar Esmi para que capture las solicitudes de estado y las dirija a la persona correcta, o para que dé actualizaciones guionadas de las etapas comunes de tu proceso.",
      },
      {
        q: "Trabajo por mi cuenta, ¿esto es excesivo para un diseñador independiente?",
        a: "Para nada. Los independientes son quienes más se benefician. Eres diseñador, director de proyecto y dueño del negocio a la vez. Esmi es tu recepción.",
      },
      {
        q: "¿Puede filtrar clientes serios de curiosos?",
        a: "Sí. Esmi hace preguntas de calificación sobre presupuesto y plazo desde el inicio — para que las llamadas de descubrimiento que tomes sean con clientes listos para avanzar.",
      },
    ],
    schema: {
      serviceType: "Recepcionista de IA para estudios de diseño de interiores",
      serviceDescription:
        "Atención telefónica con IA, admisión de clientes nuevos, agendamiento de llamadas de descubrimiento y preguntas frecuentes para estudios de diseño de interiores residencial. Protege el tiempo creativo y captura cada consulta — bilingüe.",
    },
  },

  {
    slug: "stone-distribution",
    name: "Distribuidores y proveedores de piedra",
    title: "Recepcionista de IA para distribuidores de piedra | Esmi de Orchelix",
    description:
      "Esmi atiende consultas de contratistas, preguntas de disponibilidad de material, solicitudes de cotización y programación de entregas para distribuidores de piedra — 24/7, bilingüe, sin sumar personal.",
    hero: {
      headline: "Las llamadas de contratistas y fabricantes, atendidas al ritmo de la nave",
      sub: "Esmi atiende preguntas de disponibilidad, solicitudes de cotización y programación de entregas para que tu equipo comercial se concentre en la relación y en los pedidos grandes.",
    },
    problems: [
      {
        title: "Los contratistas llaman en horario de obra",
        body: "Tus clientes llaman temprano, entre instalaciones y cuando tu oficina ya cerró. Las llamadas perdidas son pedidos perdidos.",
      },
      {
        title: "Las preguntas de disponibilidad saturan las líneas",
        body: "Las consultas de rutina sobre disponibilidad de placas, grosor y acabado le quitan tiempo al trabajo real de tu equipo comercial.",
      },
      {
        title: "Las solicitudes de cotización se acumulan",
        body: "Cada solicitud que espera en la fila es un contratista que puede conseguir el mismo material con la competencia.",
      },
      {
        title: "Coordinar entregas consume tiempo",
        body: "Programar recolecciones y entregas exige un ida y vuelta que tu equipo no debería gestionar por teléfono.",
      },
    ],
    benefits: [
      {
        title: "Captura de consultas fuera de horario",
        body: "Esmi recoge consultas de material, datos de contacto y detalles del proyecto a cualquier hora para que tu equipo dé seguimiento a primera hora.",
      },
      {
        title: "Preguntas frecuentes de disponibilidad",
        body: "Entrena a Esmi con tus descripciones de material, grados y plazos estándar para que las preguntas de rutina no lleguen a tu personal.",
      },
      {
        title: "Recepción de solicitudes de cotización",
        body: "Quien llama describe lo que necesita; Esmi registra los detalles y dirige la solicitud al vendedor correcto.",
      },
      {
        title: "Programación de entregas",
        body: "Coordina ventanas de recolección y entrega en tu calendario sin llamadas cruzadas.",
      },
      {
        title: "Bilingüe (EN/ES)",
        body: "Atiende en su idioma a tu base hispanohablante de contratistas y fabricantes, en cada llamada.",
      },
      {
        title: "Crece sin sumar personal",
        body: "Absorbe la demanda pico — temporada de proyectos, inventario nuevo — sin ampliar tu equipo telefónico.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi puede responder sobre disponibilidad de placas?",
        a: "Esmi se puede entrenar con tus descripciones de inventario estándar y las preguntas frecuentes. Para disponibilidad en tiempo real, captura la solicitud y la dirige a tu equipo comercial para devolver la llamada el mismo día.",
      },
      {
        q: "¿Y los pedidos grandes que requieren gestión de cuenta?",
        a: "Esmi califica el tamaño y el tipo de consulta y dirige los pedidos grandes o complejos directamente a tu equipo comercial senior — con los datos de quien llamó adjuntos.",
      },
      {
        q: "¿Puede atender de forma distinta a fabricantes y a contratistas generales?",
        a: "Sí. Configuras Esmi con guiones de calificación y reglas de enrutamiento distintos para cada tipo de cliente.",
      },
      {
        q: "Tenemos varias sucursales, ¿Esmi puede dirigir por ubicación?",
        a: "Sí. Esmi puede dirigir las llamadas a la sucursal o al representante correcto según la ubicación del proyecto o lo que indique quien llama.",
      },
      {
        q: "¿Cómo entrenamos a Esmi con nuestros materiales?",
        a: "Durante la configuración nos entregas tu catálogo de producto, tus lineamientos de precio y tus preguntas frecuentes. Configuramos a Esmi para responder lo que tu equipo comercial atiende con más frecuencia.",
      },
    ],
    schema: {
      serviceType: "Recepcionista de IA para distribuidores de piedra",
      serviceDescription:
        "Atención telefónica con IA, recepción de cotizaciones, programación de entregas y gestión de consultas de contratistas para distribuidores y proveedores de piedra. Captura solicitudes fuera de horario y crece con la demanda — bilingüe.",
    },
  },

  {
    slug: "stone-fabrication",
    name: "Fabricantes de piedra y talleres de encimeras",
    title: "Recepcionista de IA para fabricantes de piedra | Esmi de Orchelix",
    description:
      "Esmi agenda citas de medición, atiende consultas de sala de exhibición y captura prospectos de proyecto para talleres de fabricación de piedra — para que tu equipo siga en la nave, no en el teléfono.",
    hero: {
      headline: "Más mediciones agendadas sin levantar el teléfono",
      sub: "Esmi atiende consultas de sala de exhibición, agenda citas de plantilla y medición y responde preguntas de material — para que tu equipo de fabricación siga concentrado en el trabajo.",
    },
    problems: [
      {
        title: "Las consultas de exhibición se pierden en la nave",
        body: "Tu equipo está cortando, puliendo e instalando. Suena el teléfono y nadie contesta. Ese prospecto llama a la competencia.",
      },
      {
        title: "Las citas de medición son difíciles de coordinar",
        body: "El ida y vuelta para agendar la plantilla frena tu flujo de trabajo y frustra a los propietarios.",
      },
      {
        title: "Las preguntas de precio ocupan a tu personal de exhibición",
        body: "Cada llamada de «¿cuánto cuesta el cuarzo?» la puede responder Esmi durante la llamada — sin sacar a nadie de la nave.",
      },
      {
        title: "Las llamadas de estado interrumpen la producción",
        body: "Los propietarios que preguntan por su encimera apartan a fabricantes y personal de oficina del trabajo que realmente entrega obra.",
      },
    ],
    benefits: [
      {
        title: "Agendamiento de mediciones",
        body: "Esmi califica el proyecto (material, metros cuadrados, cocina o baño) y agenda la medición de plantilla en tu calendario.",
      },
      {
        title: "Captura de consultas de exhibición",
        body: "Quien llama recibe respuestas sobre tus materiales, tu proceso y tus plazos — y agenda una visita a la sala de exhibición.",
      },
      {
        title: "Preguntas frecuentes de material",
        body: "Cuarzo o granito, perfiles de canto, plazos, rangos de precio — Esmi atiende las preguntas que tu equipo responde todos los días.",
      },
      {
        title: "Enrutamiento de llamadas de estado",
        body: "Quien llama consulta la etapa de su proyecto sin sacar a nadie de la nave. Esmi dirige la llamada o da la actualización guionada.",
      },
      {
        title: "Bilingüe (EN/ES)",
        body: "El mercado de remodelación del sur de Florida es multilingüe. Esmi atiende a toda tu base de clientes en su idioma.",
      },
      {
        title: "Captura de prospectos fuera de horario",
        body: "Quien explora una remodelación el fin de semana puede agendar una medición para el lunes sin esperar a que abra tu oficina.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi puede agendar citas de medición?",
        a: "Sí. Esmi pregunta por tipo de material, alcance del proyecto y ubicación, luego agenda la medición de plantilla en tu calendario y envía una confirmación.",
      },
      {
        q: "¿Qué preguntas de material puede atender?",
        a: "Entrenas a Esmi con tu selección de materiales, perfiles de canto, rangos de precio y plazos. Atiende las preguntas más comunes que hacen los propietarios antes de visitar tu sala de exhibición.",
      },
      {
        q: "¿Cómo maneja las llamadas sobre trabajos en curso?",
        a: "Tú proporcionas respuestas guionadas para cada etapa de tu proceso (plantilla, fabricación, programación de instalación). Esmi dirige las llamadas o da actualizaciones según esos guiones.",
      },
      {
        q: "Atendemos a contratistas y a propietarios, ¿puede con ambos?",
        a: "Sí. Esmi califica el tipo de cliente y ajusta su guion en consecuencia — propietarios residenciales y cuentas de contratista se atienden de forma distinta.",
      },
      {
        q: "¿Cómo es la configuración para un taller como el nuestro?",
        a: "Dedicamos una sesión a conocer tus materiales, tus servicios y tu calendario. El primer agente entra en operación catorce días después del arranque.",
      },
    ],
    schema: {
      serviceType: "Recepcionista de IA para fabricantes de piedra",
      serviceDescription:
        "Atención telefónica con IA, agendamiento de mediciones, gestión de consultas de sala de exhibición y enrutamiento de llamadas de estado para talleres de fabricación de piedra y encimeras. Bilingüe, 24/7.",
    },
  },
];

export default INDUSTRIES_ES;
