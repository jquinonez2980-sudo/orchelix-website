import type { Industry } from "./types";

/* Sector copy for /ai-receptionist/[industry], English.

   Converted from the light world 2026-08-08. Structural removals: the
   `eyebrow` field (a kicker above the H1) and the per-item `icon` fields,
   which drove a row of same-size icon + heading + text cards. Problems are
   now an EntryList, benefits a RuledList, questions a Disclosure.

   Claims corrected in the same pass, each barred by PRODUCT.md's "no
   outcome metrics, conversion rates, latency figures, or benchmark
   numbers":

     hvac       "a single HVAC installation is worth thousands of dollars"
     hvac       "handle 3x the call volume", "scales instantly, no hold times"
     dental     "Zero hold times" / "answered immediately"
     dental     "handles instantly" (twice)
     real-est.  "Leads go cold in minutes", "Instant lead summaries"
     stone-fab  "answered by Esmi instantly"
     stone-fab  "typical setup is 2-3 weeks" — contradicted the canonical
                14-day engagement

   Sector headlines were also rewritten out of vendor-absolute voice
   ("never misses another call", "never lose a potential client to
   voicemail again", "every time") into the calm, specific register
   PRODUCT.md asks for. That is a voice change, not a factual one, and the
   originals are in git. */

const INDUSTRIES_EN: Industry[] = [
  {
    slug: "hvac",
    name: "HVAC & Home Services",
    title: "AI Receptionist for HVAC Companies | Esmi by Orchelix",
    description: "Esmi answers emergency calls, books service appointments, and dispatches your techs 24/7 — so an after-hours call is answered rather than banked, even at 2 AM. See how it works.",
    hero: {
      headline: "Every call answered, including the 2am one",
      sub: "Esmi answers every call, qualifies the job, and books the appointment — around the clock, even during seasonal surges and after-hours emergencies.",
    },
    problems: [
      { title: "After-hours emergencies slip away", body: "A customer with a broken A/C at midnight hangs up and calls your competitor. You lose the job before you even wake up." },
      { title: "Seasonal spikes overwhelm your office", body: "Summer heat and winter cold hit all at once. Your team can't handle the call volume and callers get busy signals." },
      { title: "Techs waste time on phone tag", body: "Dispatching takes calls back and forth. Every minute on the phone is a minute not on a job site." },
      { title: "Missed calls mean missed revenue", body: "An installation is a job, not an enquiry. A missed call does not just cost a lead — it costs the work." },
    ],
    benefits: [
      { title: "24/7 emergency call handling", body: "Esmi picks up at any hour, triages the situation, and routes emergency calls to your on-call tech on the same call." },
      { title: "Appointment booking on your calendar", body: "Callers pick a time, Esmi books it, sends a confirmation, and your tech arrives prepared." },
      { title: "Job qualification before dispatch", body: "Esmi asks the right questions — unit age, symptoms, property type — so your tech knows the job before arrival." },
      { title: "Seasonal surge protection", body: "Volume spikes do not queue behind one receptionist. Esmi takes concurrent calls without added headcount." },
      { title: "Bilingual (EN/ES)", body: "Serve South Florida's Spanish-speaking customers in their language, on every call." },
      { title: "Human handoff for complex situations", body: "When a call needs a real person, Esmi escalates with full context — no repeat explanations for the caller." },
    ],
    faqs: [
      { q: "Can Esmi handle after-hours HVAC emergency calls?", a: "Yes. Esmi answers around the clock, triages the urgency, and connects callers to your on-call technician for true emergencies — or books a first-available appointment for non-urgent issues." },
      { q: "How does Esmi help with dispatch?", a: "Esmi qualifies the call (location, issue type, unit details), books the appointment on your live calendar, and sends your tech a summary — so they arrive prepared, not guessing." },
      { q: "Can it handle the summer rush?", a: "Yes. Concurrent calls do not queue behind one another, so a busy day does not push callers into a hold loop the way a single front desk does." },
      { q: "Does it work with our scheduling software?", a: "We integrate with the most common field service and calendar tools. During setup, we connect Esmi to your existing system so bookings land exactly where they need to." },
      { q: "Will it work for a multi-tech operation?", a: "Yes. Esmi can route calls and bookings based on availability, territory, or service type — configured to match how your team operates." },
    ],
    schema: {
      serviceType: "AI Receptionist for HVAC Companies",
      serviceDescription: "AI phone answering and appointment booking for HVAC and home services companies. Handles after-hours emergency calls, seasonal call surges, job qualification, and technician dispatch — 24/7, bilingual.",
    },
  },
  {
    slug: "dental",
    name: "Dental & Medical Offices",
    title: "AI Receptionist for Dental Offices | Esmi by Orchelix",
    description: "Esmi answers every patient call, books appointments, handles insurance FAQs, and frees your front desk to focus on in-office care. No hold queue, and new patient calls are answered rather than banked.",
    hero: {
      headline: "The front desk stops choosing between the phone and the patient",
      sub: "Esmi handles new patient calls, appointment booking, and routine FAQs so your front desk can focus on the patients in front of them.",
    },
    problems: [
      { title: "New patients hang up and book elsewhere", body: "A prospective patient who waits on hold and hangs up will book with the practice down the street before you call back." },
      { title: "Front desk is split between desk and phone", body: "Your staff can't give full attention to the patient standing at check-in and the one calling at the same time." },
      { title: "After-hours calls go to voicemail", body: "Dental emergencies don't happen on a schedule. Patients in pain at 8 PM need to hear from someone, not a mailbox." },
      { title: "Routine questions eat productive hours", body: "Time goes on answering 'Do you take Delta Dental?' and 'What are your hours?' — questions Esmi handles on the call." },
    ],
    benefits: [
      { title: "New patient intake on the call", body: "Esmi collects name, insurance, reason for visit, and preferred time — then books the appointment before they hang up." },
      { title: "No hold queue", body: "Callers are answered rather than parked. No hold music, no 'your call is important to us.'" },
      { title: "After-hours dental emergency triage", body: "Esmi assesses urgency and connects emergency cases to your on-call line, while booking routine issues for the next opening." },
      { title: "Insurance and FAQ handling", body: "Insurance questions, directions, office hours, cancellation policy — Esmi answers them on the call, freeing your staff." },
      { title: "Appointment reminders and confirmations", body: "Esmi confirms appointments and sends reminders, reducing no-shows without manual follow-up." },
      { title: "Bilingual (EN/ES)", body: "Serve Spanish-speaking patients without needing bilingual front-desk staff on every shift." },
    ],
    faqs: [
      { q: "Can Esmi book new patient appointments?", a: "Yes. Esmi collects the patient's information, checks your live calendar, offers available slots, books the appointment, and sends a confirmation — all on the first call." },
      { q: "How does it handle insurance questions?", a: "You provide Esmi with your accepted insurance list and common FAQs. It answers routine insurance questions directly and flags complex coverage questions for your billing staff." },
      { q: "What happens for a dental emergency after hours?", a: "Esmi asks triage questions to assess urgency. True emergencies are routed to your emergency line; non-urgent situations are booked for the earliest available appointment the next morning." },
      { q: "Will it sound natural to patients?", a: "Yes. Esmi is designed to sound professional and warm. You control the greeting, tone, and script so it matches your practice's voice." },
      { q: "Does HIPAA compliance apply?", a: "We take patient data seriously and collect only what's needed to qualify and schedule. Ask us about our data handling and BAA process during your consultation." },
    ],
    schema: {
      serviceType: "AI Receptionist for Dental and Medical Offices",
      serviceDescription: "AI phone answering, new patient intake, appointment booking, and after-hours triage for dental and medical practices. Handles insurance FAQs, reduces hold times, and frees front-desk staff — bilingual.",
    },
  },
  {
    slug: "law-firm",
    name: "Law Firms & Legal Practices",
    title: "AI Receptionist for Law Firms | Esmi by Orchelix",
    description: "Esmi answers every potential client call, qualifies the matter, and books consultations 24/7. Stop losing cases to voicemail. See how law firms use Esmi.",
    hero: {
      headline: "Intake happens on the first call, not the callback",
      sub: "Esmi answers calls around the clock, qualifies new matters, and books consultations — so your attorneys focus on billable work, not intake.",
    },
    problems: [
      { title: "Potential clients call once and move on", body: "Legal matters are urgent. A potential client who reaches voicemail calls the next firm on Google. You don't get a second chance." },
      { title: "Intake eats into billable hours", body: "Every hour an attorney or paralegal spends on routine intake questions is an hour not billed to a client." },
      { title: "After-hours calls go unanswered", body: "Accidents, arrests, and legal emergencies happen at all hours. The firm that answers at 11 PM gets the case." },
      { title: "Unqualified matters waste staff time", body: "Staff spend time on calls that don't fit your practice areas. Esmi screens them first so your team only handles what matters." },
    ],
    benefits: [
      { title: "24/7 new client intake", body: "Esmi answers at any hour, asks qualifying questions about the matter, and books a consultation on your calendar." },
      { title: "Matter qualification before booking", body: "Esmi screens for practice area fit, urgency, and conflict-of-interest basics before a consultation is scheduled." },
      { title: "Billable hour protection", body: "Routine calls — directions, hours, document status — never reach your attorneys or paralegals." },
      { title: "Urgent matter escalation", body: "Time-sensitive matters (arrests, accidents, injunctions) are flagged and routed to the attorney on call on the same call." },
      { title: "Consistent intake quality", body: "Every potential client gets the same professional, thorough intake process — regardless of time or call volume." },
      { title: "Bilingual (EN/ES)", body: "Serve Spanish-speaking clients with the same quality intake experience in their language." },
    ],
    faqs: [
      { q: "Can Esmi handle legal intake calls?", a: "Yes. Esmi collects matter details, practice area, and urgency level, then books a consultation or escalates based on the rules you set during onboarding." },
      { q: "How does it handle sensitive information and conflicts?", a: "Esmi collects the minimum information needed to qualify and schedule. Detailed matter information and conflict checks happen with your team at the consultation stage." },
      { q: "What about urgent situations — arrests, accidents?", a: "You set escalation rules. Emergency keywords trigger an immediate handoff to your on-call attorney, with a full call summary sent in real time." },
      { q: "Will clients know they're talking to AI?", a: "Esmi is professional and helpful. You control the introduction and tone. Many firms introduce it as their intake team — transparency is up to you." },
      { q: "Can it handle multiple practice areas?", a: "Yes. Esmi is configured with your practice areas and routes or qualifies calls accordingly — so a personal injury call and an estate planning inquiry are handled differently." },
    ],
    schema: {
      serviceType: "AI Receptionist for Law Firms",
      serviceDescription: "AI phone answering, new client intake, matter qualification, and 24/7 consultation booking for law firms and legal practices. Protects billable hours, escalates urgent matters, bilingual.",
    },
  },
  {
    slug: "real-estate",
    name: "Real Estate Agents & Brokerages",
    title: "AI Receptionist for Real Estate Agents | Esmi by Orchelix",
    description: "Esmi qualifies buyer and seller leads, books showing appointments, and answers property inquiries 24/7 — so an enquiry is answered while you are in a closing or on a showing.",
    hero: {
      headline: "Answer the lead while it is still warm",
      sub: "Esmi answers buyer and seller calls around the clock, qualifies leads, and books showings — so you close more deals without being chained to your phone.",
    },
    problems: [
      { title: "Buyers call several agents at once", body: "Real estate buyers call multiple agents at once. The first to respond wins. If you're on a showing when they call, they move on." },
      { title: "Showing requests come at all hours", body: "Buyers browse listings at night and on weekends. If they can't book immediately, they book with someone else." },
      { title: "Unqualified showings waste your time", body: "You need to know who's pre-approved and what their timeline is before spending an afternoon on a showing." },
      { title: "Admin calls interrupt client time", body: "Directions, listing details, open house schedules — routine questions that Esmi handles so you don't have to." },
    ],
    benefits: [
      { title: "Lead qualification on every call", body: "Esmi asks about budget, pre-approval status, timeline, and desired area so you know who's worth calling back first." },
      { title: "Showing scheduling without the back-and-forth", body: "Callers book showings on your live calendar directly — no email chains, no missed callbacks." },
      { title: "24/7 availability", body: "Late-night listing enquiries are answered that night, not the next morning when the lead has moved on." },
      { title: "Listing FAQ handling", body: "Price, square footage, HOA, school district — Esmi answers common property questions from your listing details." },
      { title: "A summary after every call", body: "Every call gets a summary sent to you so you know who called and what they need before you call back." },
      { title: "Bilingual (EN/ES)", body: "South Florida's diverse buyer pool deserves service in their language. Esmi switches seamlessly." },
    ],
    faqs: [
      { q: "Can Esmi book showing appointments?", a: "Yes. Esmi checks your live calendar, offers available times, confirms the property address, and books the showing — before the lead hangs up." },
      { q: "How does it qualify buyer leads?", a: "You define the qualification questions: pre-approval status, price range, timeline, location preferences. Esmi collects the answers and includes them in the call summary." },
      { q: "What if a lead wants to discuss pricing or offer strategy?", a: "Esmi handles routine questions and captures lead information. Complex discussions — pricing strategy, offer advice — are flagged for you with the full context of the call." },
      { q: "Does it work for rental properties too?", a: "Yes. Esmi handles rental inquiries, answers availability questions, and schedules viewings for property managers and landlords." },
      { q: "Will it work across a team of agents?", a: "Yes. Esmi can route calls to the right agent based on territory, listing, or availability." },
    ],
    schema: {
      serviceType: "AI Receptionist for Real Estate Agents",
      serviceDescription: "AI lead qualification, showing scheduling, and 24/7 call answering for real estate agents and brokerages. Captures buyer and seller leads, answers listing FAQs, books showings — bilingual.",
    },
  },
  {
    slug: "residential-design",
    name: "Residential Interior Designers",
    title: "AI Receptionist for Interior Design Firms | Esmi by Orchelix",
    description: "Esmi books discovery calls, captures new project inquiries, and handles process FAQs while you're focused on design work — 24/7, professional, bilingual.",
    hero: {
      headline: "Win new clients without leaving the drawing",
      sub: "Esmi captures every new client inquiry, books discovery calls, and answers questions about your process — so you build your pipeline without stepping away from the work.",
    },
    problems: [
      { title: "Inquiries interrupt deep creative work", body: "Creative focus is hard to recover. Every phone interruption costs more time than the call itself." },
      { title: "Slow response loses ideal clients", body: "High-end residential clients have options. If a design firm doesn't respond quickly, they move to the next name on their list." },
      { title: "Discovery call scheduling is back-and-forth", body: "Coordinating the first consultation takes multiple messages. Esmi books it on the spot." },
      { title: "Routine questions eat up your time", body: "Clients ask the same questions: your style, your process, your fees. Esmi answers them from your talking points." },
    ],
    benefits: [
      { title: "New client inquiry capture", body: "Esmi collects project type, budget range, timeline, and contact details before the call ends." },
      { title: "Discovery call booking on the spot", body: "Callers schedule directly on your calendar. No email chains, no back-and-forth coordination." },
      { title: "Process FAQ handling", body: "Questions about your design process, project phases, and fees are answered from the talking points you provide." },
      { title: "Protect deep work time", body: "Calls never interrupt you mid-project. Review the summary and call back when you're ready." },
      { title: "Bilingual (EN/ES)", body: "Serve South Florida's multilingual residential market without needing to answer every call yourself." },
      { title: "Professional first impression", body: "Every inquiry is handled with the same level of polish you bring to your design work." },
    ],
    faqs: [
      { q: "Can Esmi answer questions about my design style or portfolio?", a: "Yes. You provide Esmi with a description of your aesthetic, services, and process. It answers common questions and directs serious prospects to book a discovery call." },
      { q: "What information does it collect from new inquiries?", a: "Project type, space (kitchen, living room, full home, etc.), budget range, timeline, and contact information — so you go into every discovery call prepared." },
      { q: "How does it handle calls from existing clients checking on project status?", a: "You can configure Esmi to capture status requests and route them to the right team member, or provide scripted updates for common stages of your process." },
      { q: "I work alone — is this overkill for a solo designer?", a: "Not at all. Solo designers benefit most. You're the designer, project manager, and business owner all at once. Esmi is your front desk." },
      { q: "Can it screen for serious clients versus window-shoppers?", a: "Yes. Esmi asks qualifying questions about budget and timeline up front — so the discovery calls you take are with clients who are ready to move forward." },
    ],
    schema: {
      serviceType: "AI Receptionist for Interior Design Firms",
      serviceDescription: "AI phone answering, new client intake, discovery call booking, and FAQ handling for residential interior design firms. Protects creative work time, captures every inquiry — bilingual.",
    },
  },
  {
    slug: "stone-distribution",
    name: "Stone Distributors & Suppliers",
    title: "AI Receptionist for Stone Distributors | Esmi by Orchelix",
    description: "Esmi handles contractor inquiries, material availability questions, quote requests, and delivery scheduling for stone distributors — 24/7, bilingual, without adding headcount.",
    hero: {
      headline: "Contractor and fabricator calls, answered on the floor's schedule",
      sub: "Esmi handles availability questions, quote requests, and delivery scheduling so your sales team can focus on relationship building and larger orders.",
    },
    problems: [
      { title: "Contractors call during job-site hours", body: "Your customers call early, call between installs, call when your office is closed. Missed calls mean missed orders." },
      { title: "Availability questions jam your phone lines", body: "Routine questions about slab availability, thickness, and finish take time away from your sales team's real work." },
      { title: "Quote requests pile up", body: "Every request that waits in a queue is a contractor who might source the same material from a competitor." },
      { title: "Delivery coordination is time-consuming", body: "Scheduling pickups and deliveries takes back-and-forth that your team shouldn't have to manage by phone." },
    ],
    benefits: [
      { title: "After-hours inquiry capture", body: "Esmi captures material inquiries, contact info, and project details at any hour so your team can follow up first thing." },
      { title: "Availability FAQ handling", body: "Train Esmi on your standard material descriptions, grades, and lead times so routine questions never reach your staff." },
      { title: "Quote request intake", body: "Callers describe what they need; Esmi logs the details and routes the request to the right salesperson." },
      { title: "Delivery appointment scheduling", body: "Coordinate pickup and delivery windows on your calendar without phone tag." },
      { title: "Bilingual (EN/ES)", body: "Serve your Spanish-speaking contractor and fabricator base in their language on every call." },
      { title: "Scale without headcount", body: "Handle peak demand — project season, new inventory — without adding to your phone team." },
    ],
    faqs: [
      { q: "Can Esmi answer questions about slab availability?", a: "Esmi can be trained on your standard inventory descriptions and common FAQs. For real-time availability, it captures the request and routes it to your sales team for a same-day callback." },
      { q: "What about large orders that need account management?", a: "Esmi qualifies the size and type of inquiry and routes large or complex orders directly to your senior sales team — with the caller's details attached." },
      { q: "Can it handle calls from fabricators and general contractors differently?", a: "Yes. You configure Esmi with different routing and qualification scripts for different customer types." },
      { q: "We have multiple locations — can Esmi route by location?", a: "Yes. Esmi can route calls to the correct location or sales rep based on the caller's project location or stated needs." },
      { q: "How do we train Esmi on our materials?", a: "During setup, you provide your product catalog, pricing guidelines, and common FAQs. We configure Esmi to answer the questions your sales team fields most often." },
    ],
    schema: {
      serviceType: "AI Receptionist for Stone Distributors",
      serviceDescription: "AI phone answering, quote intake, delivery scheduling, and contractor inquiry handling for stone distributors and suppliers. Captures after-hours requests, scales with demand — bilingual.",
    },
  },
  {
    slug: "stone-fabrication",
    name: "Stone Fabricators & Countertop Shops",
    title: "AI Receptionist for Stone Fabricators | Esmi by Orchelix",
    description: "Esmi books measure appointments, handles showroom inquiries, and captures project leads for stone fabrication shops — so your team stays on the floor, not on the phone.",
    hero: {
      headline: "More measures booked without picking up the phone",
      sub: "Esmi handles showroom inquiries, books template and measure appointments, and answers material questions — so your fabrication team stays focused on the work.",
    },
    problems: [
      { title: "Showroom inquiries get missed on the floor", body: "Your team is cutting, polishing, and installing. The phone rings and no one answers. That lead calls a competitor." },
      { title: "Measure appointments are hard to coordinate", body: "Back-and-forth scheduling for template appointments slows your pipeline and frustrates homeowners." },
      { title: "Pricing questions tie up your showroom staff", body: "Every 'how much does quartz cost?' call can be answered by Esmi on the call — without pulling someone off the floor." },
      { title: "Project status calls interrupt production", body: "Homeowners checking on their countertop pull fabricators and office staff away from the work that actually ships jobs." },
    ],
    benefits: [
      { title: "Measure appointment booking", body: "Esmi qualifies the project (material, square footage, kitchen or bath) and books the template measure on your calendar." },
      { title: "Showroom inquiry capture", body: "Callers get answers about your materials, process, and turnaround time — and book a showroom visit." },
      { title: "Material FAQ handling", body: "Quartz vs. granite, edge profiles, lead times, pricing ranges — Esmi handles the questions your team fields every day." },
      { title: "Project status call routing", body: "Callers check their project stage without pulling someone off the floor. Esmi routes status calls or provides scripted updates." },
      { title: "Bilingual (EN/ES)", body: "South Florida's renovation market is multilingual. Esmi serves your full customer base in their language." },
      { title: "After-hours lead capture", body: "Weekend renovation explorers can book a measure appointment for Monday without waiting for your office to open." },
    ],
    faqs: [
      { q: "Can Esmi book measure appointments?", a: "Yes. Esmi asks about material type, project scope, and location, then books the template measure appointment on your calendar and sends a confirmation." },
      { q: "What material questions can it handle?", a: "You train Esmi on your material selection, edge profiles, pricing ranges, and lead times. It handles the most common questions homeowners ask before visiting your showroom." },
      { q: "How does it handle calls about in-progress jobs?", a: "You provide scripted status responses for each stage of your process (template, fabrication, installation scheduling). Esmi routes calls or provides updates based on those scripts." },
      { q: "We deal with both contractors and homeowners — can it handle both?", a: "Yes. Esmi qualifies the caller type and adjusts its script accordingly — residential homeowners and contractor accounts handled differently." },
      { q: "What's the setup process like for a shop like ours?", a: "We spend a session learning your materials, services, and calendar. The first agent goes live fourteen days from kickoff." },
    ],
    schema: {
      serviceType: "AI Receptionist for Stone Fabricators",
      serviceDescription: "AI phone answering, measure appointment booking, showroom inquiry handling, and project status routing for stone fabrication shops and countertop companies. Bilingual, 24/7.",
    },
  },
];

export default INDUSTRIES_EN;
