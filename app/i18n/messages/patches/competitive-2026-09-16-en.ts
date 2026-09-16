/* Competitive truth overlay — 2026-09-16. Deep-merged onto the EN catalogue. */
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
      "A $149 overflow pilot on your real line for fourteen days. After-hours answering, Google Calendar + SMS, English and Spanish included.",
    journey: [
      { title: "Hear", body: "A real Esmi call on this site" },
      { title: "Book", body: "A $149 overflow pilot on your real line" },
      { title: "Map", body: "After-hours and overflow on one workflow" },
      { title: "Operate", body: "Every action on the operator register" },
    ],
  },
  home: {
    heroLede:
      "After-hours and overflow on your line — Esmi answers, books Google Calendar, and confirms by SMS. English and Spanish included.",
    exploreEsmiBody:
      "24/7 call handling that books appointments, routes urgent calls, and works in English and Spanish — an AI receptionist, not a person.",
    esmiBody:
      "24/7 call handling that books appointments, routes urgent calls, and works in English and Spanish — an AI receptionist, not a person. Every call ends with a full transcript and a reason.",
    stages: [
      {
        day: "Day 1",
        title: "Map the workflow",
        desc: "A senior consultant sits with your team and writes the workflow we automate first. You keep the document.",
      },
      {
        day: "Day 14",
        title: "First agent live",
        desc: "Your agent goes live on your phone line and Google Calendar — with a scorecard you can read on Monday morning.",
      },
      {
        day: "Ongoing",
        title: "Every action audited",
        desc: "Every call, email, and reconciled line is logged. Approve, override, or coach in one click.",
      },
      {
        day: "When ready",
        title: "Add the next agent",
        desc: "Only once the first has earned the room. Same console, same consultant, same audit trail.",
      },
    ],
  },
  pages: {
    solutions: {
      esmiCapabilities: [
        ["Availability", "Nights, weekends, and holidays — the line is never unattended"],
        ["Languages", "English and Spanish natively; French as an add-on; switches mid-call"],
        ["Booking", "Google Calendar live book/reschedule, confirmed with an SMS reminder"],
        ["Routing", "After-hours emergencies go to the on-call person instead of a voicemail box"],
        ["Record", "Every call ends with a transcript, a reason, and a disposition"],
        ["Tuning", "Coachable by editing a document — no engineer required"],
      ] as [string, string][],
      revopsCapabilities: [
        ["Intake", "Web forms, inbound calls, paid social, and referral links in one pipeline"],
        ["Scoring", "A defensible score built from fit, intent signals, and account history"],
        ["Follow-up", "Email, SMS, and call cadences written in your voice, not a template"],
        ["Hand-off", "Your reps inherit a brief with talking points, not a blank record"],
        ["CRM", "Hand-off into the CRM you already use — wiring scoped per engagement (roadmap, not a native connector catalog)"],
        ["Reporting", "A Monday scorecard: what moved, what stalled, and why"],
      ] as [string, string][],
    },
    pricing: {
      description:
        "Esmi Local / Starter is $299/mo + $499 setup. A 14-day overflow pilot is $149. Esmi answers after-hours and overflow, books Google Calendar with SMS confirmation, and puts every call, appointment, and lead in one dashboard.",
      lede: "Esmi Local / Starter covers after-hours and overflow on one line — $299/mo + $499 setup. Esmi answers the phone and web chat, books Google Calendar with SMS confirmation, and puts every call, appointment, and lead in one dashboard. Setup is done for you.",
      startPilot: "Start a $149 overflow pilot",
      startThePilot: "Start a $149 overflow pilot",
      startPilotShort: "$149 overflow",
      scheduleLede:
        "Local / Starter is the overflow package: one line, after-hours and overflow answering, English and Spanish included. Growth and Scale add capacity — every tier includes the full dashboard.",
      values: {
        starterChannels: "Voice · after-hours & overflow",
        starterBooking: "1 Google Calendar + SMS",
      },
      finePrint:
        "Esmi Local / Starter is $299/mo + $499 setup. Month-to-month available. Annual billing: two months free and setup waived. Setup covers number, Google Calendar, knowledge base, and go-live onboarding. Overflow pilot is $149 for 14 days including setup, credited to your first invoice if you continue. English and Spanish are included on every plan — not an add-on. Minutes are voice minutes and do not roll over. Taxes extra where applicable.",
      pilotHeading: "After-hours and overflow, on your line, for fourteen days",
      pilotBody:
        "$149 for 14 days, including white-glove setup, credited to your first month if you continue. One number, up to 75 minutes, after-hours and overflow answering, one Google Calendar + SMS confirmations, English and Spanish included, the full dashboard, and an end-of-pilot review with your consultant.",
      included: [
        "Natural AI voice, 24/7 — not a human receptionist",
        "After-hours and overflow answering",
        "English and Spanish included",
        "Google Calendar book and reschedule + SMS confirmation",
        "Escalation to your team with context",
        "Recordings and transcripts",
        "Appointments and leads inbox",
        "After-hours activity on the overview",
      ],
      addOns: [
        ["Extra number", "$49 / mo"],
        ["Extra 500 minutes", "$99"],
        ["French language pack", "Custom"],
        ["CRM / HighLevel wiring", "Custom"],
      ] as [string, string][],
      afterStart: [
        ["Step one", "We learn your hours, overflow rules, services, and Google Calendar."],
        ["Step two", "We go live — number, after-hours agent, booking, dashboard login."],
        ["Step three", "You see every overflow call, booking, lead, and recording."],
      ] as [string, string][],
      faq: [
        {
          q: "Do I need technical staff to set this up?",
          a: "No. Setup is white-glove — Orchelix configures your number, agent, knowledge base, and calendar for you. You review it before it goes live; you don't build anything.",
        },
        {
          q: "Does Esmi book real appointments, or just take messages?",
          a: "Real appointments. Esmi reads your live Google Calendar availability and books, reschedules, or cancels directly on it, then confirms by SMS — no Calendly, Acuity, or Microsoft 365 as live booking today, and no message left for someone to call back and enter by hand.",
        },
        {
          q: "Is Local / Starter only for after-hours?",
          a: "It is built for after-hours and overflow on one line — nights, weekends, holidays, and the calls your front desk cannot take. During open hours it can sit behind your receptionist or answer the line outright. Same number, same Google Calendar, same dashboard. A 14-day overflow pilot is $149.",
        },
        {
          q: "What happens when Esmi can't handle something?",
          a: "It escalates to a human — by call transfer or notification, depending on your setup — with the context of the conversation so far, so nobody has to repeat themselves.",
        },
        {
          q: "Can I keep my existing phone number?",
          a: "Each plan includes new local number(s) provisioned for Esmi. Forwarding your existing number to it, or porting it over, is usually possible — tell us your setup and we'll confirm during onboarding.",
        },
        {
          q: "Is there a contract?",
          a: "No. Every plan is month-to-month, cancel anytime — plus a one-time setup fee covering your number, calendar, knowledge base, and go-live onboarding. Pay annually instead and get two months free, with the setup fee waived entirely.",
        },
        {
          q: "What happens if I go over my included minutes?",
          a: "You're billed the plan's per-minute overage rate for the extra minutes. Esmi never stops answering calls because you've hit a limit — overage is a line on the invoice, not a service interruption.",
        },
      ],
      scheduleCaption: "Orchelix plan rate schedule — Local / Starter, Growth, and Scale",
    },
  },
} as const satisfies DeepPartial<Messages>;

export default patch;
