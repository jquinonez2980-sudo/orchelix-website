import type { LocationPage } from "./types";

/* Metro pages, Spanish.

   Written rather than translated. The English pages argue from what is true
   about the phone in each market; the Spanish ones argue from what is true
   about the phone *in Spanish* in each market, which is not the same argument
   and in South Florida is a stronger one. Running the English copy through a
   translator would have produced eight pages that read like a translation,
   which is precisely the impression the bilingual claim cannot afford.

   Slugs stay English, per the policy in app/i18n/config.ts — translated slugs
   double the routing surface and break inbound links on every revision. */

const LOCATIONS_ES: LocationPage[] = [
  {
    slug: "west-palm-beach",
    name: "West Palm Beach",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["561"],
    title: "Recepcionista con IA en West Palm Beach, FL",
    description:
      "Recepcionista bilingüe con IA que contesta números 561 las 24 horas. Esmi atiende en español o inglés, califica al cliente, agenda en su calendario y deja transcripción de cada llamada. Orchelix opera desde West Palm Beach.",
    hero: {
      headline: "Su número 561, contestado a las dos de la mañana",
      sub: "Orchelix es una empresa de West Palm Beach. Esmi es la recepcionista que construimos: contesta su línea en español o inglés, califica a quien llama, agenda en su calendario real y deja escrito lo que pasó.",
    },
    phoneContext: [
      {
        title: "La temporada no negocia",
        body: "El condado de Palm Beach tiene un patrón de llamadas estacional que la mayoría del país no tiene. Desde noviembre el volumen prácticamente se duplica y no baja hasta la primavera. Contratar para el pico significa cargar con el valle; contratar para el valle significa que el pico suena sin que nadie conteste. Un agente que cuesta lo mismo en julio y en febrero es la única versión de esto que le cuadra a la aritmética.",
      },
      {
        title: "Dos idiomas en una sola línea",
        body: "Quien marca un 561 puede empezar en inglés o en español y no hay forma de saberlo antes de que entre la llamada. Un número aparte para español divide su publicidad y aun así pierde a quien marcó el otro. Esmi toma el idioma con el que llega el cliente y cambia a mitad de llamada si él cambia.",
      },
      {
        title: "Las semanas de tormenta rompen el teléfono",
        body: "Entre junio y noviembre un solo sistema genera en una tarde el volumen de una semana: techos, restauración, poda, todo lo que gira alrededor del seguro. Esas son las llamadas que pagan el año y llegan exactamente a la hora en que no hay nadie en el escritorio.",
      },
    ],
    sectors: [
      {
        name: "HVAC y oficios",
        body: "Las emergencias llegan fuera de horario por definición. Esmi toma la dirección, la falla y si es trabajo del mismo día, y agenda o escala con toda la conversación adjunta.",
      },
      {
        name: "Consultorios dentales y médicos",
        body: "Las llamadas de pacientes nuevos son las que más valen y las que más se pierden cuando la recepción está ocupada. Esmi contesta el desborde, filtra por seguro y motivo de consulta, y agenda en la agenda real.",
      },
      {
        name: "Cocina, baño y piedra",
        body: "Una consulta de remodelación es una conversación larga que empieza con cuatro preguntas cortas. Esmi las hace, califica el proyecto contra su mínimo y le pasa solo lo que merece el tiempo de un diseñador.",
      },
      {
        name: "Bufetes de abogados",
        body: "La admisión es urgente y el primer despacho que contesta suele quedarse con el caso. Esmi hace sus preguntas de admisión, registra las respuestas textualmente y marca lo que tenga un plazo encima.",
      },
    ],
    faqs: [
      {
        q: "¿Orchelix realmente está en West Palm Beach?",
        a: "Sí. Orchelix AI Consulting opera desde West Palm Beach, Florida, y además tiene entidad canadiense para Ontario. No está llamando a un call center nacional que puso una dirección local en su página.",
      },
      {
        q: "¿Esmi puede contestar mi número 561 actual?",
        a: "Sí. Su número no cambia. Lo desviamos —todas las llamadas, solo fuera de horario, o solo cuando nadie contesta— y Esmi atiende lo que llegue. Si algún día para, quita el desvío y la línea queda igual que antes.",
      },
      {
        q: "¿Atiende bien a quien llama en español?",
        a: "Sí, de forma nativa, y cambia de idioma a mitad de llamada si el cliente cambia. No es una capa de traducción encima de un agente en inglés: el lado en español se construye y se prueba como su propia conversación.",
      },
      {
        q: "¿En cuánto tiempo está funcionando?",
        a: "Catorce días desde la primera llamada. Lo configuramos con sus guiones, su calendario y sus preguntas, y lo probamos con usted antes de que conteste algo real.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista bilingüe con IA para negocios de West Palm Beach y el condado de Palm Beach: atención de llamadas 24/7, calificación del cliente y agendamiento en calendario, en español e inglés.",
    },
  },

  {
    slug: "boca-raton",
    name: "Boca Ratón",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["561"],
    title: "Recepcionista con IA en Boca Ratón, FL",
    description:
      "Recepcionista con IA para negocios de Boca Ratón. Esmi contesta su línea 561 las 24 horas en español e inglés, califica según sus criterios y agenda en su calendario.",
    hero: {
      headline: "La llamada que entró mientras usted estaba en una reunión",
      sub: "Boca funciona con trabajo agendado y clientes referidos, y ambos llegan por teléfono. Esmi contesta mientras usted está con otra persona, pregunta lo que usted habría preguntado y deja la cita en su calendario.",
    },
    phoneContext: [
      {
        title: "Un referido no llama dos veces",
        body: "La economía de servicios profesionales de Boca se mueve por recomendación, y quien llega referido se comporta distinto a quien llega por publicidad: llama una vez, por recomendación, y si contesta el buzón asume que usted está demasiado ocupado para atenderlo. Esa llamada no se recupera devolviéndola una hora después.",
      },
      {
        title: "El cliente está en el consultorio",
        body: "Donde el trabajo pasa cara a cara —odontología, estética, derecho, asesoría patrimonial— la recepción está genuinamente ocupada casi todo el día. No es falta de personal. Es el trabajo. Y el teléfono suena igual.",
      },
      {
        title: "El horario corporativo no es el horario del cliente",
        body: "Buena parte de lo que entra en Boca viene de gente resolviendo asuntos personales alrededor de su propia jornada: antes de las nueve, a la hora del almuerzo, después de las seis. Son las ventanas que peor cubre un escritorio de nueve a cinco.",
      },
    ],
    sectors: [
      {
        name: "Odontología y estética",
        body: "Esmi contesta el desborde cuando la recepción está con un paciente, filtra las llamadas de pacientes nuevos por seguro e interés de tratamiento, y agenda consultas en la agenda real.",
      },
      {
        name: "Derecho y servicios profesionales",
        body: "Sus preguntas de admisión, en su orden, con las respuestas registradas textualmente y una transcripción en el expediente antes de que usted la lea.",
      },
      {
        name: "Servicios del hogar y remodelación",
        body: "Consultas de proyecto calificadas contra su trabajo mínimo y su radio de servicio, para que el día del estimador se gaste en obra que sí puede cerrar.",
      },
      {
        name: "Bienes raíces",
        body: "Consultas de propiedades atendidas a la hora en que se hacen, capturando la propiedad, el plazo y la situación de financiamiento antes de que el cliente pase al siguiente agente.",
      },
    ],
    faqs: [
      {
        q: "¿Necesito un número nuevo?",
        a: "No. Esmi contesta su línea 561 actual por desvío de llamadas. Usted elige si toma todas las llamadas, solo las de fuera de horario, o solo las que su equipo no alcanza a contestar.",
      },
      {
        q: "¿Va a sonar como un robot con mis clientes?",
        a: "Júzguelo usted antes de decidir: hay una grabación real en la página de demostración y un chat con el mismo agente donde puede escribir. No hace falta formulario ni llamada para escucharlo.",
      },
      {
        q: "¿Puede filtrar las llamadas que no me interesan?",
        a: "Sí. Usted define los criterios —zona de servicio, tamaño de trabajo, tipo de asunto, lo que califique trabajo para usted— y Esmi pregunta antes de agendar nada. Lo que no cumple queda registrado, no agendado.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Los planes empiezan en $299 al mes con la configuración hecha por nosotros. El piloto de catorce días son $149, que se acreditan a su primera factura si continúa.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista con IA para negocios de Boca Ratón: atención bilingüe de llamadas 24/7, filtrado según sus criterios y agendamiento en calendario.",
    },
  },

  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["954", "754"],
    title: "Recepcionista con IA en Fort Lauderdale, FL",
    description:
      "Recepcionista bilingüe con IA para Fort Lauderdale y el condado de Broward. Esmi contesta números 954 y 754 las 24 horas en español e inglés, califica y agenda en su calendario.",
    hero: {
      headline: "Broward llama a cualquier hora, en cualquiera de los dos idiomas",
      sub: "Esmi contesta su línea 954 o 754 cada vez que suena —en español o inglés, según con qué empiece el cliente—, califica, agenda la cita y le deja transcripción y motivo.",
    },
    phoneContext: [
      {
        title: "Lo náutico y lo hotelero no tienen horario de oficina",
        body: "Los astilleros, los chárteres y la hotelería de Broward corren con un reloj que ponen los barcos y los huéspedes, no el horario comercial. Que un astillero llame a las siete de la tarde por un espacio de varada es una llamada normal aquí, no una excepción que haya que prever.",
      },
      {
        title: "El radio de servicio es la pregunta que califica",
        body: "Broward y Miami-Dade corren pegados, y quien llama tres salidas más al sur puede estar cuarenta minutos más allá de donde llegan sus cuadrillas. Preguntar la dirección primero —antes del estimado, antes del calendario— es la diferencia entre un trabajo agendado y una camioneta gastada en balde.",
      },
      {
        title: "El idioma cambia quién contesta",
        body: "Una línea en Broward recibe llamadas en más de un idioma cualquier día. Esmi maneja español e inglés de forma nativa y cambia a mitad de llamada; cuando alguien necesita otra cosa, escala con el contexto adjunto en vez de adivinar.",
      },
    ],
    sectors: [
      {
        name: "Servicios náuticos y oficios",
        body: "Consultas de servicio capturadas con la embarcación, el astillero y la ventana de tiempo, y escaladas a una persona cuando el trabajo necesita cotización en lugar de un espacio.",
      },
      {
        name: "HVAC, plomería y electricidad",
        body: "Emergencias fuera de horario atendidas con la dirección y la falla capturadas, separadas de lo que puede esperar a mañana.",
      },
      {
        name: "Restauración y techos",
        body: "Una semana de tormenta genera un mes de llamadas en dos días. Esmi las contesta todas a la vez —no tiene fila— y agenda las evaluaciones en orden.",
      },
      {
        name: "Clínicas y consultorios dentales",
        body: "Consultas de pacientes nuevos filtradas por seguro y motivo, agendadas en la agenda real mientras el cliente sigue en la línea.",
      },
    ],
    faqs: [
      {
        q: "¿Esmi distingue una llamada de Broward de una de Miami-Dade?",
        a: "Pregunta la dirección y la compara con la zona de servicio que usted define, y luego agenda, declina con cortesía o escala según la regla que usted haya puesto. No adivina por el código de área, porque los códigos de área dejaron de corresponder a la geografía hace años.",
      },
      {
        q: "¿Qué pasa cuando una tormenta dispara las llamadas?",
        a: "Esmi contesta todas las llamadas al mismo tiempo. No hay fila de espera ni una segunda línea que agregar, porque no hay una sola línea: la limitación que hace fallar a un sistema telefónico humano en la primera semana de tormenta aquí no existe.",
      },
      {
        q: "¿Funciona con mi número 754?",
        a: "Sí. Cualquier número que usted pueda desviar, Esmi lo puede contestar: 954, 754 o una línea gratuita. Su número publicado nunca cambia.",
      },
      {
        q: "¿Cuánto tarda la instalación?",
        a: "Catorce días desde la primera llamada, incluyendo la configuración con sus guiones y su calendario y una ronda de pruebas con usted antes de que tome una llamada real.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista bilingüe con IA para negocios de Fort Lauderdale y el condado de Broward: atención de llamadas 24/7 en español e inglés con agendamiento en calendario.",
    },
  },

  {
    slug: "miami",
    name: "Miami",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["305", "786"],
    title: "Recepcionista con IA en Miami — en español",
    description:
      "Recepcionista con IA genuinamente bilingüe para negocios de Miami. Esmi contesta números 305 y 786 en español o inglés, cambia de idioma a mitad de llamada, califica y agenda las 24 horas.",
    hero: {
      headline: "En Miami el español no es el segundo idioma",
      sub: "Casi todas las recepcionistas con IA tratan el español como una traducción añadida después. Esmi contesta en el idioma con el que empieza el cliente, cambia cuando él cambia, y agenda la cita en esa misma conversación.",
    },
    phoneContext: [
      {
        title: "El idioma lo decide el cliente, no el menú",
        body: "Una línea en Miami no se divide limpiamente en una fila en inglés y otra en español. La gente empieza en un idioma, se pasa al otro por una palabra que conoce mejor, y espera que uno la siga. Un menú de «oprima uno para español» le pide al cliente una decisión que no debería tener que tomar, y pierde a los que cuelgan en vez de elegir.",
      },
      {
        title: "Los negocios familiares contestan su propio teléfono",
        body: "Buena parte de lo que entra en Miami cae en una línea que suena en el celular de alguien mientras esa persona está haciendo el trabajo. Esa persona cierra mejor que cualquier recepcionista y es imposible de localizar a las cuatro de la tarde.",
      },
      {
        title: "La rapidez decide el referido",
        body: "En un mercado así de denso, quien llama tiene otros cuatro números en la misma página de resultados. Contestar al primer timbre no es un detalle: es toda la posición competitiva, y es lo único que un dueño ocupado físicamente no puede prometer.",
      },
    ],
    sectors: [
      {
        name: "Clínicas y consultorios dentales",
        body: "Llamadas de pacientes nuevos atendidas en el idioma del cliente, filtradas por seguro y motivo de consulta, y agendadas en la agenda real antes de que cuelguen.",
      },
      {
        name: "Contratistas y servicios del hogar",
        body: "Consultas de trabajo calificadas por dirección, alcance y plazo, en español o inglés, para que la ruta del estimador valga la pena manejarla.",
      },
      {
        name: "Admisión legal",
        body: "Su guion de admisión, en el idioma del cliente, con las respuestas registradas textualmente y una transcripción adjunta al expediente.",
      },
      {
        name: "Automotriz, náutico y servicio especializado",
        body: "Consultas de servicio capturadas con el vehículo o la embarcación, el síntoma y la ventana de tiempo, y dirigidas a una persona cuando hace falta cotizar.",
      },
    ],
    faqs: [
      {
        q: "¿Qué tan bueno es el español, de verdad?",
        a: "Escúchelo en vez de creernos: la página de demostración tiene una grabación y un chat en vivo con el mismo agente, y puede hacer todo en español. Si no da la talla, lo va a saber en noventa segundos y no le habrá costado nada.",
      },
      {
        q: "¿Puede cambiar de idioma a mitad de la llamada?",
        a: "Sí. Sigue al cliente en lugar de quedarse fijo en el idioma con el que abrió la llamada, que es el comportamiento que un mercado bilingüe realmente necesita.",
      },
      {
        q: "¿La transcripción llega en el idioma del cliente?",
        a: "La transcripción está en el idioma en que ocurrió la llamada, y puede leer un resumen en el idioma en que trabaja su equipo.",
      },
      {
        q: "¿Atienden Miami-Dade específicamente?",
        a: "Sí. Orchelix opera desde West Palm Beach y atiende el sur de Florida, incluido Miami-Dade. Esmi contesta un número, así que el servicio funciona donde usted pueda desviar una línea, pero el español se construyó pensando en este mercado en particular.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista con IA bilingüe en español e inglés para negocios de Miami y Miami-Dade: atención de llamadas 24/7, cambio de idioma a mitad de llamada y agendamiento en calendario.",
    },
  },

  {
    slug: "toronto",
    name: "Toronto",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["416", "647", "437"],
    title: "Recepcionista con IA en Toronto, ON",
    description:
      "Recepcionista con IA para negocios de Toronto. Esmi contesta su línea 416, 647 o 437 las 24 horas, califica al cliente, agenda en su calendario y deja transcripción de cada llamada.",
    hero: {
      headline: "La línea 416, contestada antes de lo que habría tardado la devolución",
      sub: "Esmi contesta su número de Toronto a cualquier hora, hace las preguntas que haría su equipo, agenda en su calendario real y deja escrito qué se dijo y por qué se decidió así.",
    },
    phoneContext: [
      {
        title: "El trayecto al trabajo es la ventana de llamadas",
        body: "Lo que entra en Toronto se concentra en las horas a ambos lados de un trayecto largo —antes de las ocho y después de las seis—, que son exactamente las horas en que un escritorio del centro está vacío. No son llamadas de desborde: son la forma que tiene el día aquí.",
      },
      {
        title: "Los oficios cubren un área metropolitana, no un barrio",
        body: "Una cuadrilla con base en Etobicoke recibe llamadas de Scarborough, y si ese trabajo justifica el viaje es una cuestión de alcance, no solo de distancia. Hay que preguntarlo en la llamada, no descubrirlo al llegar.",
      },
      {
        title: "Un número, muchas lenguas maternas",
        body: "Una línea comercial en Toronto recibe llamadas de gente cuya lengua materna no es el inglés un martes cualquiera. Esmi maneja inglés y español de forma nativa y francés como complemento; cuando alguien necesita otra cosa, escala con todo el contexto en vez de adivinarlo.",
      },
    ],
    sectors: [
      {
        name: "Oficios y mantenimiento de propiedades",
        body: "Llamadas de emergencia y programadas capturadas con la dirección, la unidad y la falla, separadas entre lo que necesita una camioneta esta noche y lo que puede esperar a la ruta de mañana.",
      },
      {
        name: "Odontología, medicina y salud aliada",
        body: "Consultas de pacientes nuevos atendidas cuando la recepción está con alguien, filtradas y agendadas en la agenda real con confirmación enviada.",
      },
      {
        name: "Bufetes y despachos profesionales",
        body: "Admisión según su guion, registrada textualmente, con todo lo que tenga plazo de prescripción marcado en el momento en que se menciona.",
      },
      {
        name: "Administración de propiedades y bienes raíces",
        body: "Llamadas de inquilinos y de visitas atendidas a toda hora, separando el mantenimiento urgente de lo que puede ir a una lista.",
      },
    ],
    faqs: [
      {
        q: "¿Orchelix es una empresa canadiense?",
        a: "Orchelix AI Consulting Inc. tiene entidad canadiense y atiende Ontario, además de presencia en Estados Unidos desde West Palm Beach, Florida. Es el mismo equipo a ambos lados de la frontera.",
      },
      {
        q: "¿Esmi habla francés?",
        a: "El francés está disponible como complemento. El inglés y el español son nativos del agente y están incluidos en todos los planes.",
      },
      {
        q: "¿Puede contestar mi número 647 o 437?",
        a: "Sí. Si puede desviar la línea, Esmi la puede contestar, y su número publicado no cambia.",
      },
      {
        q: "¿Las grabaciones y transcripciones se guardan en Canadá?",
        a: "La residencia de datos es una pregunta justa y la respuesta honesta depende de su plan y su configuración. Pregúntenos en la llamada del piloto y le decimos exactamente dónde quedan los registros, en vez de darle una respuesta de folleto aquí.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista con IA para negocios de Toronto y el área metropolitana: atención de llamadas 24/7, calificación del cliente y agendamiento en calendario con transcripción de cada llamada.",
    },
  },

  {
    slug: "mississauga",
    name: "Mississauga",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["905", "289", "365"],
    title: "Recepcionista con IA en Mississauga, ON",
    description:
      "Recepcionista con IA para negocios de Mississauga y la región de Peel. Esmi contesta su línea 905 o 289 a toda hora, califica al cliente y agenda en su calendario real.",
    hero: {
      headline: "Una línea 905 que nunca está en espera",
      sub: "Esmi contesta todas las llamadas a la vez —no hay fila, porque no hay una sola línea—. Califica a quien llama, agenda en su calendario y deja constancia de lo que se decidió.",
    },
    phoneContext: [
      {
        title: "Las llamadas entre empresas llegan en ráfagas",
        body: "La base logística, de distribución e industria ligera de Mississauga genera entradas muy concentradas: nada durante dos horas y luego seis llamadas mientras un embarque se complica. Una oficina de dos personas contesta la primera y pierde cuatro de las demás en el buzón.",
      },
      {
        title: "El aeropuerto pone el reloj",
        body: "Los negocios que trabajan alrededor de Pearson operan contra itinerarios de vuelo, no contra horarios de oficina, y la llamada que más importa suele caer fuera de ambos. Una línea que deja de contestar a las cinco está apagada durante una parte significativa del día operativo.",
      },
      {
        title: "Quien llama quiere una persona, no un mensaje",
        body: "Un cliente comercial con un problema no deja un mensaje de voz y espera. Baja por los resultados de búsqueda hasta que alguien conteste. Contestar aquí no es cortesía: es toda la diferencia entre la consulta y la venta.",
      },
    ],
    sectors: [
      {
        name: "Logística y distribución",
        body: "Consultas capturadas con la carga, la ruta y la ventana de tiempo, escaladas a una persona en el momento en que hace falta cotizar en lugar de quedar estacionadas en un buzón.",
      },
      {
        name: "Oficios comerciales e instalaciones",
        body: "Llamadas de servicio ordenadas por sitio y severidad, separando las emergencias fuera de horario de lo que corresponde a la ruta de mañana.",
      },
      {
        name: "Clínicas y consultorios dentales",
        body: "Desborde y llamadas de pacientes nuevos fuera de horario atendidas, filtradas y agendadas en la agenda real.",
      },
      {
        name: "Servicios profesionales",
        body: "Sus preguntas de admisión hechas en su orden, registradas textualmente, con un resumen en su escritorio antes de que devuelva la llamada.",
      },
    ],
    faqs: [
      {
        q: "¿Cuántas llamadas puede tomar a la vez?",
        a: "Todas. Las llamadas simultáneas no son un nivel de plan ni una mejora que se compra: la limitación simplemente no existe, y por eso una ráfaga que colapsaría a una oficina de dos personas aquí no tiene nada de particular.",
      },
      {
        q: "¿Puede dirigir distintos tipos de llamada a distintas personas?",
        a: "Sí. Usted define el enrutamiento —por línea de servicio, sitio, urgencia o la distinción con la que realmente funcione su negocio— y Esmi escala con toda la conversación adjunta, no con un nombre y un número.",
      },
      {
        q: "¿Mi número 905 cambia?",
        a: "No. Esmi contesta por desvío sobre su línea actual. Quita el desvío y todo queda exactamente como estaba.",
      },
      {
        q: "¿Cuál es el compromiso?",
        a: "El piloto de catorce días son $149 y se acreditan a su primera factura si continúa. Después, los planes empiezan en $299 al mes.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista con IA para negocios de Mississauga y la región de Peel: atención simultánea e ilimitada de llamadas 24/7, calificación, enrutamiento y agendamiento en calendario.",
    },
  },

  {
    slug: "hamilton",
    name: "Hamilton",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["905", "289", "365"],
    title: "Recepcionista con IA en Hamilton, ON",
    description:
      "Recepcionista con IA para negocios de Hamilton. Esmi contesta su línea 905 o 289 las 24 horas, califica el trabajo antes de que llegue a su calendario y deja transcripción de cada llamada.",
    hero: {
      headline: "El estimado que sí valía el viaje",
      sub: "Esmi hace las cuatro preguntas que deciden si un trabajo vale la pena cotizar —antes de que entre a su calendario— y le entrega una transcripción en lugar de un nombre en una libreta.",
    },
    phoneContext: [
      {
        title: "El dueño es la recepcionista",
        body: "Los oficios y talleres de Hamilton los atiende su propio dueño, desde una camioneta, un taller o una escalera. La llamada se contesta cuando se puede, y las que entran mientras está el trabajo de verdad se van al buzón, es decir, a la competencia.",
      },
      {
        title: "La escarpa es una pregunta de calificación real",
        body: "El acceso, el estacionamiento y la división entre la montaña y la ciudad baja cambian lo que cuesta un trabajo antes de que nadie lo haya visto. Son preguntas que van en la llamada de admisión, no en la entrada de la casa.",
      },
      {
        title: "La renovación empieza con una conversación larga",
        body: "El parque de vivienda antigua de Hamilton hace que buena parte de lo que entra sea renovación y restauración en vez de reemplazo directo: consultas que hay que dimensionar antes de agendar, y que desperdician una tarde si se agendan sin dimensionar.",
      },
    ],
    sectors: [
      {
        name: "Contratistas y renovación",
        body: "Consultas de proyecto dimensionadas en la llamada —antigüedad de la propiedad, acceso, rango de presupuesto, plazo— para que el día del estimador se gaste en obra que puede cerrar.",
      },
      {
        name: "HVAC, plomería y electricidad",
        body: "Fallas fuera de horario capturadas con la dirección y el problema, separadas de lo que puede esperar a la ruta de la mañana.",
      },
      {
        name: "Salud y odontología",
        body: "Llamadas de pacientes nuevos atendidas mientras la recepción está ocupada, filtradas y agendadas en la agenda real.",
      },
      {
        name: "Servicios legales y profesionales",
        body: "Admisión según su guion, con las respuestas registradas textualmente y todo lo urgente marcado en la transcripción.",
      },
    ],
    faqs: [
      {
        q: "Yo contesto mi propio teléfono. ¿Para qué necesito esto?",
        a: "No para las llamadas que contesta, sino para las que no puede, porque está debajo de un fregadero o arriba de un techo. Esmi toma esas, las califica como lo haría usted y le entrega una transcripción en vez de un aviso de llamada perdida.",
      },
      {
        q: "¿Puede evitar que lleguen trabajos no calificados a mi calendario?",
        a: "Ahí está la mayor parte del valor. Usted define qué califica —radio de servicio, trabajo mínimo, tipo de propiedad— y Esmi pregunta antes de agendar. Lo que no cumple queda registrado para que vea qué rechazó.",
      },
      {
        q: "¿Va a saber mis precios?",
        a: "Sabe lo que usted le diga. La mayoría le da un rango y una regla sobre cuándo cotizar y cuándo pasar la llamada a una persona, porque un número equivocado en una llamada es peor que ningún número.",
      },
      {
        q: "¿En cuánto tiempo empieza a contestar?",
        a: "Catorce días desde la primera llamada, incluyendo una ronda de pruebas con usted antes de que tome algo real.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista con IA para negocios de Hamilton, Ontario: atención de llamadas 24/7 con calificación del trabajo, filtrado por zona de servicio y agendamiento en calendario.",
    },
  },

  {
    slug: "ottawa",
    name: "Ottawa",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["613", "343"],
    title: "Recepcionista con IA en Ottawa, ON",
    description:
      "Recepcionista con IA para negocios de Ottawa. Esmi contesta su línea 613 o 343 las 24 horas, califica al cliente, agenda en su calendario y deja transcripción y motivo en cada llamada.",
    hero: {
      headline: "Cada llamada en el registro, y un motivo al lado",
      sub: "Esmi contesta su línea de Ottawa a cualquier hora, pregunta lo que usted preguntaría, agenda en su calendario real y deja un rastro auditable: transcripción, resolución y por qué la llamada terminó como terminó.",
    },
    phoneContext: [
      {
        title: "El registro importa tanto como la llamada",
        body: "El trabajo profesional de Ottawa arrastra una costumbre de documentación que otros mercados no tienen. Qué se dijo, cuándo y quién lo dijo no es un detalle posterior aquí. Esmi está construida alrededor de un rastro revisable en lugar de tenerlo añadido: transcripción, resolución y motivo en cada llamada.",
      },
      {
        title: "Ser bilingüe es el punto de partida, no un extra",
        body: "Una línea que atiende la región de la capital recibe llamadas en los dos idiomas oficiales. El inglés y el español son nativos del agente; el francés está disponible como complemento y aquí conviene configurarlo antes de que la línea salga en vivo, no después.",
      },
      {
        title: "Dos economías, dos relojes",
        body: "El lado institucional de Ottawa llama en horario de oficina y el lado residencial y de oficios llama por la tarde. Un solo escritorio que cubra ambos está de sobra a las diez de la mañana o ausente a las siete de la noche.",
      },
    ],
    sectors: [
      {
        name: "Consultoría y despachos profesionales",
        body: "Consultas calificadas contra sus criterios de contratación, registradas textualmente y resumidas antes de que usted decida si devuelve la llamada.",
      },
      {
        name: "Salud, odontología y práctica aliada",
        body: "Llamadas de pacientes nuevos y de reprogramación atendidas mientras la recepción está con alguien, y agendadas en la agenda real.",
      },
      {
        name: "Oficios y servicios del hogar",
        body: "Llamadas de tarde y fin de semana capturadas con la dirección y la falla, ordenadas entre esta noche y mañana.",
      },
      {
        name: "Servicios legales",
        body: "Admisión según su guion, con todo lo que tenga plazo marcado en el momento en que se menciona y la conversación completa adjunta al expediente.",
      },
    ],
    faqs: [
      {
        q: "¿Puedo tener francés además de inglés?",
        a: "El francés está disponible como complemento. El inglés y el español son nativos del agente y están incluidos en todos los planes. Para una línea en Ottawa, configurar el francés antes del lanzamiento suele ser lo correcto.",
      },
      {
        q: "¿Qué queda registrado exactamente en cada llamada?",
        a: "Una transcripción, una resolución y un motivo declarado de cómo se manejó la llamada, todo revisable en el panel y reversible si el agente se equivocó en algo.",
      },
      {
        q: "¿Dónde se guardan esos datos?",
        a: "Depende de su plan y su configuración, y es una pregunta que preferimos responder con precisión en una llamada que de forma aproximada en una página web. Pregúntelo en la llamada del piloto y tendrá la respuesta real.",
      },
      {
        q: "¿Mi número 613 cambia?",
        a: "No. Esmi contesta su línea actual por desvío, y usted elige si eso es todas las llamadas, solo fuera de horario, o solo cuando nadie contesta.",
      },
    ],
    schema: {
      serviceDescription:
        "Servicio de recepcionista con IA para Ottawa y la región de la capital nacional: atención de llamadas 24/7 con transcripción, resolución y motivo revisables en cada llamada.",
    },
  },
];

export default LOCATIONS_ES;
