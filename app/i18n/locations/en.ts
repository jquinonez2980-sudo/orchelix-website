import type { LocationPage } from "./types";

/* Metro pages, English.

   Eight, not eighty. The temptation with local SEO is to generate a page per
   city in the service area and let volume do the work; that is precisely the
   pattern Google's scaled-content policy names, and the sites that do it lose
   the whole directory rather than the marginal page. These eight are the two
   markets Orchelix actually operates in — South Florida and Southern Ontario —
   and each was written from what is true about the phone in that place.

   Every page differs in its middle, not just its heading. If a ninth metro
   cannot be given its own `phoneContext` and its own `sectors` without
   repeating one of these, it does not get a page. */

const LOCATIONS_EN: LocationPage[] = [
  {
    slug: "west-palm-beach",
    name: "West Palm Beach",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["561"],
    title: "AI receptionist in West Palm Beach, FL",
    description:
      "A bilingual AI receptionist answering 561 numbers around the clock. Esmi picks up, qualifies the caller in English or Spanish, books on your calendar, and leaves a transcript. Orchelix is based in West Palm Beach.",
    hero: {
      headline: "Your 561 number, answered at two in the morning",
      sub: "Orchelix is a West Palm Beach company. Esmi is the receptionist we build — it answers your line in English or Spanish, qualifies the caller, books into your real calendar, and writes down what happened.",
    },
    phoneContext: [
      {
        title: "The season does not negotiate",
        body: "Palm Beach County's calling pattern is seasonal in a way most of the country's is not. From November the volume roughly doubles and it does not taper until spring. Hiring for the peak means carrying the trough; staffing for the trough means the peak rings out. An agent that costs the same in July and February is the only version of this that arithmetic likes.",
      },
      {
        title: "Two languages on one line",
        body: "A 561 caller may open in English or Spanish and there is no way to know which before the line connects. A separate Spanish number splits your marketing and still misses the caller who dialled the other one. Esmi takes the language the caller brings and switches mid-call if they do.",
      },
      {
        title: "Storm weeks break the phone",
        body: "Between June and November a single system generates a week of call volume in an afternoon — roofers, restoration, tree work, insurance-adjacent trades. Those are the calls that pay for the year, and they arrive at the exact hour nobody is at the desk.",
      },
    ],
    sectors: [
      {
        name: "HVAC and the trades",
        body: "Emergency calls arrive after hours by definition. Esmi captures the address, the nature of the failure, and whether it is a same-day job, then either books it or escalates with the whole conversation attached.",
      },
      {
        name: "Dental and medical practices",
        body: "New-patient calls are the ones worth the most and the ones most often lost to a full front desk. Esmi answers the overflow, screens for insurance and reason for visit, and books into the live schedule.",
      },
      {
        name: "Kitchen, bath, and stone",
        body: "A slab or remodel enquiry is a long conversation that starts with four short questions. Esmi asks them, qualifies the project against your minimum, and sends the ones worth a designer's time.",
      },
      {
        name: "Law firms",
        body: "Intake is time-sensitive and the first firm to answer often keeps the matter. Esmi runs your conflict-free intake questions, records the answers verbatim, and flags anything with a deadline attached.",
      },
    ],
    faqs: [
      {
        q: "Is Orchelix actually based in West Palm Beach?",
        a: "Yes. Orchelix AI Consulting operates from West Palm Beach, Florida, and also holds a Canadian entity serving Ontario. You are not calling a national call centre that lists a local address.",
      },
      {
        q: "Can Esmi answer my existing 561 number?",
        a: "Yes. Your number does not change. We forward it — all calls, after-hours only, or on no-answer — and Esmi picks up whatever reaches it. If you ever stop, you remove the forward and the line is exactly as it was.",
      },
      {
        q: "Does Esmi handle Spanish callers in Palm Beach County?",
        a: "Yes, natively, and it can switch language mid-call if a caller does. This is not a translation layer bolted onto an English agent — the Spanish side is built and tested as its own conversation.",
      },
      {
        q: "How fast can it be live?",
        a: "Fourteen days from the first call. We configure it against your scripts, calendar, and questions, then test it with you before it answers anything real.",
      },
    ],
    schema: {
      serviceDescription:
        "Bilingual AI receptionist service for West Palm Beach and Palm Beach County businesses — 24/7 call answering, caller qualification, and live calendar booking in English and Spanish.",
    },
  },

  {
    slug: "boca-raton",
    name: "Boca Raton",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["561"],
    title: "AI receptionist in Boca Raton, FL",
    description:
      "An AI receptionist for Boca Raton businesses. Esmi answers your 561 line 24/7 in English and Spanish, qualifies callers against your criteria, and books on your calendar.",
    hero: {
      headline: "The call you were in a meeting for",
      sub: "Boca runs on scheduled work and referred clients, and both arrive by phone. Esmi answers while you are with someone else, asks what you would have asked, and puts the appointment on your calendar.",
    },
    phoneContext: [
      {
        title: "A referral does not call twice",
        body: "Boca's professional services economy runs on introductions, and an introduced caller behaves differently from an advertised one: they call once, on a recommendation, and if voicemail answers they assume you are too busy to take them. That call is not recoverable by calling back an hour later.",
      },
      {
        title: "The client is in the room",
        body: "In practices where the work happens face to face — dental, aesthetics, law, wealth advisory — the front desk is genuinely occupied for most of the day. It is not understaffing. It is the job. The phone still rings during it.",
      },
      {
        title: "Corporate hours are not caller hours",
        body: "A large share of Boca's inbound comes from people handling personal business around their own workday: before nine, at lunch, after six. Those windows are the ones a nine-to-five desk covers worst.",
      },
    ],
    sectors: [
      {
        name: "Dental and aesthetic practices",
        body: "Esmi answers the overflow when the desk is with a patient, screens new-patient calls for insurance and treatment interest, and books consultations into the live schedule.",
      },
      {
        name: "Law and professional services",
        body: "Your intake questions, asked in your order, with the answers recorded verbatim and a transcript on the file before you read it.",
      },
      {
        name: "Home services and remodelling",
        body: "Project enquiries qualified against your minimum job size and service radius, so the estimator's day is spent on work that could actually close.",
      },
      {
        name: "Property and real estate",
        body: "Listing and showing enquiries answered at the hour they are made, with the property, the timeframe, and the financing position captured before the caller moves on to the next agent.",
      },
    ],
    faqs: [
      {
        q: "Do I need a new phone number?",
        a: "No. Esmi answers your existing 561 line through call forwarding. You choose whether it takes every call, only after-hours, or only the ones your team does not pick up.",
      },
      {
        q: "Will it sound like a robot to my clients?",
        a: "Judge that yourself before you decide — there is a real recording on the demo page and a chat with the same agent you can type into. No form and no call required to hear it.",
      },
      {
        q: "Can it screen out the calls I do not want?",
        a: "Yes. You set the criteria — service area, job size, matter type, whatever qualifies work for you — and Esmi asks for them before booking anything. Calls that fail your criteria are logged, not booked.",
      },
      {
        q: "What does it cost?",
        a: "Plans start at $299 a month with setup done for you. A fourteen-day pilot is $149, credited against your first invoice if you continue.",
      },
    ],
    schema: {
      serviceDescription:
        "AI receptionist service for Boca Raton businesses — 24/7 bilingual call answering, caller screening against your criteria, and live calendar booking.",
    },
  },

  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["954", "754"],
    title: "AI receptionist in Fort Lauderdale, FL",
    description:
      "A bilingual AI receptionist for Fort Lauderdale and Broward County. Esmi answers 954 and 754 numbers 24/7 in English and Spanish, qualifies the caller, and books on your calendar.",
    hero: {
      headline: "Broward calls at every hour, in either language",
      sub: "Esmi answers your 954 or 754 line whenever it rings — in English or Spanish, whichever the caller opens with — qualifies them, books the appointment, and leaves you a transcript and a reason.",
    },
    phoneContext: [
      {
        title: "Marine and hospitality do not keep office hours",
        body: "Broward's yard, charter, and hospitality trades run on a clock set by boats and guests, not by business hours. A yard calling about a haul-out slot at seven in the evening is a normal call here, not an exception to plan around.",
      },
      {
        title: "The service radius is the qualifying question",
        body: "Broward and Miami-Dade run together, and a caller three exits south may be forty minutes past where your crews will go. Asking for the address first — before the estimate, before the calendar — is the difference between a booked job and a wasted truck roll.",
      },
      {
        title: "Spanish and Creole change who picks up",
        body: "A Broward line takes calls in more than one language on any given day. Esmi handles English and Spanish natively and switches mid-call; where a caller needs something else, it escalates with the context attached rather than guessing.",
      },
    ],
    sectors: [
      {
        name: "Marine services and trades",
        body: "Service enquiries captured with the vessel, the yard, and the window, then escalated to a person when the job needs a quote rather than a slot.",
      },
      {
        name: "HVAC, plumbing, and electrical",
        body: "After-hours emergency calls answered with the address and the failure captured, sorted from the ones that can wait until the morning.",
      },
      {
        name: "Restoration and roofing",
        body: "Storm weeks generate a month of calls in two days. Esmi answers all of them at once — it has no queue — and books the assessments in order.",
      },
      {
        name: "Clinics and dental",
        body: "New-patient enquiries screened for insurance and reason for visit, booked into the live schedule while the caller is still on the line.",
      },
    ],
    faqs: [
      {
        q: "Can Esmi tell a Broward call from a Miami-Dade one?",
        a: "It asks for the address and checks it against the service area you define, then books, declines politely, or escalates according to the rule you set. It does not guess from the area code, because area codes stopped mapping to geography years ago.",
      },
      {
        q: "What happens during a storm surge in calls?",
        a: "Esmi answers every call simultaneously. There is no hold queue and no second line to add, because there is no single line — the constraint that makes a human phone system fail in week one of a storm does not exist here.",
      },
      {
        q: "Does it work with my 754 number?",
        a: "Yes. Any number you can forward, Esmi can answer — 954, 754, or a toll-free line. Your published number never changes.",
      },
      {
        q: "How long is setup?",
        a: "Fourteen days from the first call, including configuration against your scripts and calendar and a test round with you before it takes a real call.",
      },
    ],
    schema: {
      serviceDescription:
        "Bilingual AI receptionist service for Fort Lauderdale and Broward County businesses — 24/7 call answering in English and Spanish with live calendar booking.",
    },
  },

  {
    slug: "miami",
    name: "Miami",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    areaCodes: ["305", "786"],
    title: "AI receptionist in Miami, FL — bilingual",
    description:
      "A genuinely bilingual AI receptionist for Miami businesses. Esmi answers 305 and 786 numbers in Spanish or English, switches mid-call, qualifies the caller, and books on your calendar 24/7.",
    hero: {
      headline: "In Miami, Spanish is not the second language",
      sub: "Most AI receptionists treat Spanish as a translated afterthought. Esmi answers in whichever language the caller opens with, switches when they switch, and books the appointment in the same conversation.",
    },
    phoneContext: [
      {
        title: "The caller decides the language, not the menu",
        body: "A Miami line does not sort neatly into an English queue and a Spanish one. Callers open in one language, drop into the other for a word they know better, and expect to be followed. A press-one-for-Spanish menu asks the caller to make a decision they should not have to make, and loses the ones who hang up rather than choose.",
      },
      {
        title: "Family businesses answer their own phones",
        body: "A large share of Miami's inbound goes to a line that rings on somebody's mobile while they are doing the actual work. That person is a better closer than any receptionist and a worse one to reach at four in the afternoon.",
      },
      {
        title: "Speed decides the referral",
        body: "In a market this dense the caller has four more numbers on the search results page. Answering on the first ring is not a nicety; it is the whole competitive position, and it is the one thing a busy owner physically cannot promise.",
      },
    ],
    sectors: [
      {
        name: "Clinics and dental practices",
        body: "New-patient calls handled in the caller's language, screened for insurance and reason for visit, and booked into the live schedule before they hang up.",
      },
      {
        name: "Contractors and home services",
        body: "Job enquiries qualified on address, scope, and timeframe, in Spanish or English, so the estimator's route is worth driving.",
      },
      {
        name: "Immigration-adjacent and general legal intake",
        body: "Your intake script, asked in the caller's language, with the answers recorded verbatim and a transcript attached to the matter.",
      },
      {
        name: "Auto, marine, and specialty service",
        body: "Service enquiries captured with the vehicle or vessel, the symptom, and the window, then routed to a person when a quote is needed.",
      },
    ],
    faqs: [
      {
        q: "How good is the Spanish, really?",
        a: "Listen to it rather than take our word — the demo page has a recording and a live chat with the same agent, and you can run the whole thing in Spanish. If it does not hold up, you will know in ninety seconds and it will not have cost you anything.",
      },
      {
        q: "Can it switch languages in the middle of a call?",
        a: "Yes. It follows the caller rather than locking to the language the call opened in, which is the behaviour a bilingual market actually needs.",
      },
      {
        q: "Does the transcript come in the caller's language?",
        a: "The transcript is in the language the call happened in, and you can read a summary in whichever language your team works in.",
      },
      {
        q: "Do you serve Miami-Dade specifically?",
        a: "Yes. Orchelix operates from West Palm Beach and serves South Florida, including Miami-Dade. Esmi answers a number, so the service works anywhere you can forward a line — but the Spanish was built for this market in particular.",
      },
    ],
    schema: {
      serviceDescription:
        "Bilingual English and Spanish AI receptionist service for Miami and Miami-Dade businesses — 24/7 call answering, mid-call language switching, and live calendar booking.",
    },
  },

  {
    slug: "toronto",
    name: "Toronto",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["416", "647", "437"],
    title: "AI receptionist in Toronto, ON",
    description:
      "An AI receptionist for Toronto businesses. Esmi answers your 416, 647, or 437 line 24/7, qualifies the caller, books into your calendar, and leaves a transcript on every call.",
    hero: {
      headline: "The 416 line, answered before the callback would have been",
      sub: "Esmi answers your Toronto number at any hour, asks the questions your team would ask, books into your live calendar, and writes down what was said and why it was decided.",
    },
    phoneContext: [
      {
        title: "The commute is the calling window",
        body: "Toronto's inbound clusters into the hours on either side of a long commute — before eight and after six — which are exactly the hours a downtown desk is empty. The calls are not overflow. They are the shape of the day here.",
      },
      {
        title: "Trades cover a metro, not a neighbourhood",
        body: "A crew based in Etobicoke takes calls from Scarborough, and whether that job is worth the drive is a question of scope, not distance alone. It has to be asked on the call, not discovered on arrival.",
      },
      {
        title: "One number, many first languages",
        body: "A Toronto business line takes calls from people whose first language is not English on an ordinary Tuesday. Esmi handles English and Spanish natively and French as an add-on; where a caller needs something else, it escalates with the full context rather than guessing at it.",
      },
    ],
    sectors: [
      {
        name: "Trades and property maintenance",
        body: "Emergency and scheduled calls captured with the address, the unit, and the fault, sorted into what needs a truck tonight and what can wait for the morning route.",
      },
      {
        name: "Dental, medical, and allied health",
        body: "New-patient enquiries answered when the desk is with someone, screened, and booked into the live schedule with a confirmation sent.",
      },
      {
        name: "Law firms and professional practices",
        body: "Intake run to your script, recorded verbatim, with anything carrying a limitation period flagged the moment it is mentioned.",
      },
      {
        name: "Property management and real estate",
        body: "Tenant and showing calls answered around the clock, with the urgent maintenance ones separated from the ones that can go on a list.",
      },
    ],
    faqs: [
      {
        q: "Is Orchelix a Canadian company?",
        a: "Orchelix AI Consulting Inc. holds a Canadian entity and serves Ontario, alongside a US presence in West Palm Beach, Florida. You are dealing with the same team either side of the border.",
      },
      {
        q: "Does Esmi speak French?",
        a: "French is available as an add-on. English and Spanish are native to the agent and included in every plan.",
      },
      {
        q: "Can it answer my 647 or 437 mobile-style number?",
        a: "Yes. If you can forward the line, Esmi can answer it, and your published number does not change.",
      },
      {
        q: "Are the call recordings and transcripts stored in Canada?",
        a: "Data residency is a fair question and the honest answer depends on your plan and configuration — ask us on the pilot call and we will tell you exactly where the records sit rather than give you a marketing answer here.",
      },
    ],
    schema: {
      serviceDescription:
        "AI receptionist service for Toronto and GTA businesses — 24/7 call answering, caller qualification, and live calendar booking with a transcript on every call.",
    },
  },

  {
    slug: "mississauga",
    name: "Mississauga",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["905", "289", "365"],
    title: "AI receptionist in Mississauga, ON",
    description:
      "An AI receptionist for Mississauga and Peel Region businesses. Esmi answers your 905 or 289 line around the clock, qualifies the caller, and books into your live calendar.",
    hero: {
      headline: "A 905 line that is never on hold",
      sub: "Esmi answers every call at once — there is no queue, because there is no single line. It qualifies the caller, books into your calendar, and leaves a record of what was decided.",
    },
    phoneContext: [
      {
        title: "Business-to-business calls arrive in bursts",
        body: "Mississauga's logistics, distribution, and light-industrial base generates inbound that clusters hard: nothing for two hours, then six calls while a shipment goes wrong. A two-person office answers the first and loses four of the rest to voicemail.",
      },
      {
        title: "The airport sets the clock",
        body: "Businesses working around Pearson operate against flight schedules rather than office hours, and the call that matters most often lands outside both. A line that stops answering at five is offline for a meaningful share of the operating day.",
      },
      {
        title: "The caller wants a person, not a message",
        body: "A commercial caller with a problem does not leave a voicemail and wait. They work down the search results until someone picks up. Answering is not a courtesy here; it is the entire difference between the enquiry and the sale.",
      },
    ],
    sectors: [
      {
        name: "Logistics and distribution",
        body: "Enquiries captured with the load, the lane, and the window, escalated to a person the moment a quote is needed rather than parked in an inbox.",
      },
      {
        name: "Commercial trades and facilities",
        body: "Service calls sorted by site and severity, with the after-hours emergencies separated from what belongs on tomorrow's route.",
      },
      {
        name: "Clinics and dental practices",
        body: "Overflow and after-hours new-patient calls answered, screened, and booked into the live schedule.",
      },
      {
        name: "Professional services",
        body: "Your intake questions asked in your order, recorded verbatim, with a summary on your desk before you return the call.",
      },
    ],
    faqs: [
      {
        q: "How many calls can it take at once?",
        a: "All of them. Simultaneous calls are not a capacity tier or an upgrade — the constraint simply does not exist, which is why a burst that would overwhelm a two-person office is unremarkable here.",
      },
      {
        q: "Can it route different call types to different people?",
        a: "Yes. You define the routing — by service line, site, urgency, or whatever distinction your business actually runs on — and Esmi escalates with the full conversation attached rather than a name and a number.",
      },
      {
        q: "Does my 905 number change?",
        a: "No. Esmi answers through call forwarding on your existing line. Remove the forward and everything is exactly as it was.",
      },
      {
        q: "What is the commitment?",
        a: "A fourteen-day pilot is $149 and credited against your first invoice if you continue. Plans start at $299 a month after that.",
      },
    ],
    schema: {
      serviceDescription:
        "AI receptionist service for Mississauga and Peel Region businesses — unlimited simultaneous 24/7 call answering, qualification, routing, and live calendar booking.",
    },
  },

  {
    slug: "hamilton",
    name: "Hamilton",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["905", "289", "365"],
    title: "AI receptionist in Hamilton, ON",
    description:
      "An AI receptionist for Hamilton businesses. Esmi answers your 905 or 289 line 24/7, qualifies the job before it reaches your calendar, and leaves a transcript on every call.",
    hero: {
      headline: "The estimate that was worth the drive",
      sub: "Esmi asks the four questions that decide whether a job is worth quoting — before it goes on your calendar — and hands you a transcript instead of a name on a message pad.",
    },
    phoneContext: [
      {
        title: "The owner is the receptionist",
        body: "Hamilton's owner-operated trades and shops answer their own phones, from a van, a shop floor, or a ladder. The call gets picked up when it can be, and the ones that arrive during the actual work go to voicemail — which is to say, to a competitor.",
      },
      {
        title: "The escarpment is a real qualifying question",
        body: "Access, parking, and the mountain-versus-lower-city split change what a job costs before anyone has seen it. Those are questions that belong on the intake call, not on the driveway.",
      },
      {
        title: "Renovation work starts with a long conversation",
        body: "Hamilton's older housing stock means a large share of inbound is renovation and restoration rather than straight replacement — enquiries that need scoping before they need scheduling, and that waste an afternoon if they are booked unscoped.",
      },
    ],
    sectors: [
      {
        name: "Contractors and renovation",
        body: "Project enquiries scoped on the call — property age, access, budget range, timeframe — so the estimator's day is spent on work that can close.",
      },
      {
        name: "HVAC, plumbing, and electrical",
        body: "After-hours failures captured with the address and the fault, separated from what can wait for the morning route.",
      },
      {
        name: "Health and dental practices",
        body: "New-patient calls answered while the desk is occupied, screened, and booked into the live schedule.",
      },
      {
        name: "Legal and professional services",
        body: "Intake run to your script with the answers recorded verbatim and anything time-sensitive flagged on the transcript.",
      },
    ],
    faqs: [
      {
        q: "I answer my own phone. Why would I need this?",
        a: "Not for the calls you answer — for the ones you cannot, because you are under a sink or on a roof. Esmi takes those, qualifies them the way you would, and hands you a transcript rather than a missed-call notification.",
      },
      {
        q: "Can it stop unqualified jobs reaching my calendar?",
        a: "That is most of the value. You set what qualifies — service radius, minimum job size, property type — and Esmi asks before it books. Calls that fail the criteria are logged so you can see what you turned away.",
      },
      {
        q: "Will it know my prices?",
        a: "It knows what you tell it. Most operators give it a range and a rule about when to quote versus when to escalate to a person, because a wrong number on a call is worse than no number.",
      },
      {
        q: "How long before it is answering?",
        a: "Fourteen days from the first call, including a test round with you before it takes anything real.",
      },
    ],
    schema: {
      serviceDescription:
        "AI receptionist service for Hamilton, Ontario businesses — 24/7 call answering with job qualification, service-area screening, and live calendar booking.",
    },
  },

  {
    slug: "ottawa",
    name: "Ottawa",
    region: "Ontario",
    regionCode: "ON",
    country: "CA",
    areaCodes: ["613", "343"],
    title: "AI receptionist in Ottawa, ON",
    description:
      "An AI receptionist for Ottawa businesses. Esmi answers your 613 or 343 line 24/7, qualifies the caller, books into your calendar, and keeps a transcript and a reason on every call.",
    hero: {
      headline: "Every call on the record, and a reason beside it",
      sub: "Esmi answers your Ottawa line at any hour, asks what you would ask, books into your live calendar, and leaves an auditable trail — a transcript, a disposition, and why the call went the way it did.",
    },
    phoneContext: [
      {
        title: "The record matters as much as the call",
        body: "Ottawa's professional and public-sector-adjacent work carries a documentation habit that other markets do not. What was said, when, and by whom is not an afterthought here. Esmi is built around a reviewable trail rather than having one bolted on: transcript, disposition, and reason on every call.",
      },
      {
        title: "Bilingual is a baseline, not a feature",
        body: "A line serving the National Capital Region takes calls in both official languages. English and Spanish are native to the agent; French is available as an add-on, and is worth configuring here before the line goes live rather than after.",
      },
      {
        title: "Two economies, two clocks",
        body: "The institutional side of Ottawa calls in business hours and the residential and trades side calls in the evening. A single desk covering both is either overstaffed at ten in the morning or absent at seven at night.",
      },
    ],
    sectors: [
      {
        name: "Professional and consulting practices",
        body: "Enquiries qualified against your engagement criteria, recorded verbatim, and summarised before you decide whether to take the call back.",
      },
      {
        name: "Health, dental, and allied practices",
        body: "New-patient and rescheduling calls answered while the desk is with someone, and booked into the live schedule.",
      },
      {
        name: "Trades and home services",
        body: "Evening and weekend calls captured with the address and the fault, sorted into tonight and tomorrow.",
      },
      {
        name: "Legal services",
        body: "Intake to your script with anything carrying a deadline flagged the moment it is mentioned, and the whole conversation attached to the file.",
      },
    ],
    faqs: [
      {
        q: "Can I get French as well as English?",
        a: "French is available as an add-on. English and Spanish are native to the agent and included in every plan. For an Ottawa line, configuring French before launch is usually the right call.",
      },
      {
        q: "What exactly is recorded on each call?",
        a: "A transcript, a disposition, and a stated reason for how the call was handled — all reviewable in the dashboard, and reversible if the agent got something wrong.",
      },
      {
        q: "Where is that data held?",
        a: "It depends on your plan and configuration, and it is a question we would rather answer precisely on a call than approximately on a web page. Ask on the pilot call and you will get the actual answer.",
      },
      {
        q: "Does my 613 number change?",
        a: "No. Esmi answers your existing line through forwarding, and you choose whether that is every call, after-hours only, or on no-answer.",
      },
    ],
    schema: {
      serviceDescription:
        "AI receptionist service for Ottawa and the National Capital Region — 24/7 call answering with a reviewable transcript, disposition, and reason on every call.",
    },
  },
];

export default LOCATIONS_EN;
