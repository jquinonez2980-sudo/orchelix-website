/* English message catalogue — the source of truth.

   Copy rules that apply to every string in here and in es.ts:
   - No unverified claims (e.g. SOC 2 timelines, latency figures) unless
     PRODUCT.md confirms them.
   - French is a confirmed *add-on* language (not native default).
   - Named operators only from PRODUCT.md evidence list — no invented quotes
     or outcome metrics.
   - Esmi is in production; Revenue-Ops and AcumenAI are in development. */

const en = {
  meta: {
    localeName: "English",
    switchTo: "Español",
    switchLabel: "Cambiar a español",
  },

  nav: {
    products: "Products",
    howItWorks: "How it works",
    industries: "Industries",
    pricing: "Pricing",
    about: "About",
    tryEsmi: "Hear Esmi",
    book: "Book a pilot",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Orchelix — Home",
  },

  common: {
    bookPilot: "Book a pilot",
    hearRealCall: "Hear a real call",
    seePricing: "See pricing",
    talkToConsultant: "Talk to a consultant",
    inProduction: "In production",
    inDevelopment: "On the same console — in development",
    startWithOneWorkflow: "Start with one workflow",
    startWithOneWorkflowBody:
      "A senior consultant maps it, your first agent goes live in fourteen days, and every action it takes is on the record.",
    phone: "+1 561 566 1066",
    countries: "Canada & United States",
  },

  home: {
    title: "Orchelix | AI agents that run revenue operations",
    description:
      "Esmi answers, qualifies, and books 24/7 in English and Spanish. Every action logged to an audit trail you can inspect and override. Deployed by senior consultants in 14 days.",
    heroTitle: ["Every call answered.", "Every action on the record."],
    heroBody:
      "Esmi answers, qualifies, and books around the clock — in English and Spanish. Every call closes with a transcript, a reason, and a disposition you can override.",
    registerCaption: "Call register — one night, one line",
    registerWindow: "18:00 – 06:00",
    columns: {
      time: "Time",
      lang: "Lang",
      reason: "Reason",
      outcome: "Outcome",
      disposition: "Disp.",
    },
    dispositions: {
      BOOKED: "BOOKED",
      ROUTED: "ROUTED",
      ANSWERED: "ANSWERED",
      CLOSED: "CLOSED",
    },
    tallyCalls: "{n} calls",
    illustrative: "Illustrative entries. Play a real Esmi recording in the column beside this register.",

    problemTitle: "The work gets done. It's everything that slips while you do it.",
    arrears: [
      {
        entry: "Calls that go unanswered",
        desc: "After-hours and overflow calls turn into voicemails — and voicemails turn into customers who booked with whoever picked up first.",
      },
      {
        entry: "Follow-up that arrives late",
        desc: "A lead waits a day for a callback. By the time someone replies, the decision is made and the quote is signed.",
      },
      {
        entry: "A month-end that drags",
        desc: "Reconciliations stretch out for weeks, so you steer the business on last month's numbers instead of this morning's.",
      },
      {
        entry: "Your best people on busywork",
        desc: "The people you hired for judgment spend their days re-keying the same numbers between tools.",
      },
    ],

    stackTitle: "One system, one console, one audit trail",
    stackBody:
      "One agent is answering calls in production today. Two more are being built on the same console and the same audit trail. We would rather tell you which is which.",
    shared: [
      ["Console", "One operator view"],
      ["Audit trail", "Every action, one log"],
      ["Consultant", "Named, senior, reachable"],
      ["Languages", "English and Spanish"],
      ["Controls", "Approve, override, coach"],
    ] as [string, string][],
    esmiName: "Esmi — Virtual Receptionist",
    esmiBody:
      "24/7 call handling that books appointments, routes the urgent calls, and sounds human in English and Spanish. Every call ends with a full transcript and a reason.",
    esmiProduces: [
      ["Transcript", "Full text, both languages, searchable"],
      ["Reason", "Why the caller rang, in their words"],
      ["Disposition", "Booked, routed, answered, or closed"],
      ["Recording", "Retained under your retention rule"],
      ["Override", "Any action reversible by a human"],
    ] as [string, string][],
    whatEsmiHandles: "What Esmi handles",
    inDev: [
      {
        title: "Revenue-Ops Agents",
        desc: "Qualify every lead, follow up on time, and keep the pipeline moving while your team runs the conversations that matter.",
        scope: "Qualify · Follow up · Close",
      },
      {
        title: "AcumenAI — Accounting & Finance OS",
        desc: "Automated bookkeeping, reconciliations, and a month-end close you can trust, with a reviewable report every morning.",
        scope: "Bookkeeping · Reconciliation · Close",
      },
    ],

    pilotTitle: "Fourteen days to the first live agent",
    pilotBody:
      "One workflow instrumented end to end, run by a consultant you can call by name. You expand when you can see it earning its keep — not before.",
    stages: [
      {
        day: "Day 1",
        title: "Map the workflow",
        desc: "A senior consultant sits with your team and writes the workflow we automate first. You keep the document.",
      },
      {
        day: "Day 14",
        title: "First agent live",
        desc: "Your agent goes live in your tools — phone, inbox, CRM, ledger — with a scorecard you can read on Monday morning.",
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

    whyTitle: "Built like a consultancy. Priced like software.",
    commitments: [
      {
        title: "Senior consultants, not a help desk",
        desc: "Every deployment is led by a senior operator you can call by name. No tier-one tickets, no 48-hour reply windows.",
      },
      {
        title: "Bilingual from the first call",
        desc: "Esmi speaks English and Spanish natively — not a translation layer bolted onto an English agent. French is available as an add-on when your line needs it.",
      },
      {
        title: "An audit trail that survives review",
        desc: "Operator-grade controls, retention rules, and a record auditors will accept. PIPEDA-aligned for Canadian operations; US and Canadian presence both real. Data residency by request.",
      },
      {
        title: "Human-in-the-loop, always",
        desc: "Approve, override, or coach any agent in one click. You decide what gets automated — and what still waits for you.",
      },
    ],
  },

  footer: {
    blurb:
      "Multi-agent systems for revenue operations, deployed by senior consultants. Operating across Canada and the United States.",
    products: "Products",
    company: "Company",
    trust: "Trust",
    links: {
      esmi: "Esmi — Virtual Receptionist",
      revops: "Revenue-Ops Agents",
      acumen: "AcumenAI",
      industries: "Industries",
      howItWorks: "How it works",
      pricing: "Pricing",
      about: "About",
      blog: "Blog",
      book: "Book a pilot",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      pipeda: "PIPEDA alignment",
      security: "Security",
    },
    privacyShort: "Privacy",
    termsShort: "Terms",
    rights: "Orchelix AI Consulting Inc.",
  },

  /* Named operators confirmed in PRODUCT.md — names only, no invented quotes
     or metrics. */
  operators: {
    title: "On real lines today",
    lede: "Esmi is live with operators who answer for barbershops, property associations, and professional firms — not a demo that never left the lab.",
    items: [
      {
        name: "Otro Nivel Barbershop",
        detail: "Two locations — front desk and after-hours on the same record",
      },
      {
        name: "Coastline Condos",
        detail: "Association line — owners and vendors, English and Spanish",
        href: "https://coastlinecondos.vip",
      },
      {
        name: "JQ Accounting",
        detail: "Professional firm — intake and scheduling without a missed ring",
      },
    ],
  },

  /* Per-page copy. Prices, plan names, phone numbers and product names are
     NOT translated — they are the same commercial facts in both languages. */
  pages: {
    solutions: {
      title: "Products — Orchelix AI Consulting",
      description:
        "Three agents, one operator console, one audit trail. Esmi is answering calls in production today; Revenue-Ops and AcumenAI are in development.",
      heading: "Three agents. One console. One audit trail.",
      lede: "One is answering calls in production today. Two are being built on the same console and the same record. We would rather tell you which is which than let a feature list imply otherwise.",
      esmiCapabilities: [
        ["Availability", "Nights, weekends, and holidays — the line is never unattended"],
        ["Languages", "English and Spanish natively; French as an add-on; switches mid-call"],
        ["Booking", "Google, Microsoft 365, Calendly, and Acuity, confirmed with an SMS reminder"],
        ["Routing", "After-hours emergencies go to the on-call person instead of a voicemail box"],
        ["Record", "Every call ends with a transcript, a reason, and a disposition"],
        ["Tuning", "Coachable by editing a document — no engineer required"],
      ] as [string, string][],
      revopsCapabilities: [
        ["Intake", "Web forms, inbound calls, paid social, and referral links in one pipeline"],
        ["Scoring", "A defensible score built from fit, intent signals, and account history"],
        ["Follow-up", "Email, SMS, and call cadences written in your voice, not a template"],
        ["Hand-off", "Your reps inherit a brief with talking points, not a blank record"],
        ["CRM", "HubSpot, Salesforce, Pipedrive, and Zoho — read and written natively"],
        ["Reporting", "A Monday scorecard: what moved, what stalled, and why"],
      ] as [string, string][],
      acumenCapabilities: [
        ["Categorization", "Bank, card, and AR feeds reconciled to your chart of accounts each morning"],
        ["Matching", "PO, receipt, and invoice cross-checked; mismatches wait in a review queue"],
        ["Receivables", "On-brand reminders that escalate by aging rather than by guesswork"],
        ["Close", "A month-end checklist with every step logged to a name and a timestamp"],
        ["Ledger", "QuickBooks and Xero native — written back, with no parallel set of books"],
        ["Compliance", "PIPEDA-aligned audit trail, every action attributable, residency on request"],
      ] as [string, string][],
      inDevNote:
        "These two are in development. The capabilities above describe what they are being built to do, not what is running in your account today. If a pilot depends on either of them, say so and we will tell you honestly where it stands.",
      deploymentHeading: "How a deployment runs",
      deploymentLede:
        "Every agent ships the same way: one workflow mapped by a senior consultant, live in fourteen days, and audited from the first action onward.",
      deploymentBand: [
        ["Day 1", "A consultant writes the workflow. You keep the document."],
        ["Day 14", "The agent goes live in your tools."],
        ["Ongoing", "Every action logged, reversible, and attributable."],
        ["When ready", "Add the next agent — same console, same consultant."],
      ] as [string, string][],
    },

    pricing: {
      title: "Pricing",
      description:
        "Esmi answers the phone and web chat, books into your real calendars, and puts every call, appointment, and lead in one dashboard. Setup is done for you.",
      heading: "Priced like software. Set up like a consultancy.",
      lede: "Esmi answers the phone and web chat, books into your real calendars, and puts every call, appointment, and lead in one dashboard. Setup is done for you.",
      startPilot: "Start a 14-day pilot",
      bookWalkthrough: "Book a walkthrough",
      scheduleHeading: "The rate schedule",
      scheduleLede:
        "Pick a starting point by call volume. Every tier includes the full dashboard — the difference is capacity, not capability.",
      terms: {
        monthly: "Monthly",
        setup: "Setup, one-time",
        minutes: "Minutes included",
        overage: "Overage, per minute",
        numbers: "Numbers",
        channels: "Channels",
        booking: "Booking",
        knowledge: "Knowledge base",
        support: "Support",
      },
      values: {
        starterNumbers: "1 local",
        growthNumbers: "Up to 2",
        scaleNumbers: "3+",
        starterChannels: "Voice",
        growthChannels: "Voice + web chat",
        scaleChannels: "Voice, chat, priority routing",
        starterBooking: "1 calendar",
        growthBooking: "Multi-location + reschedule",
        scaleBooking: "Multi-location + booking rules",
        starterKnowledge: "Standard",
        growthKnowledge: "Expanded",
        scaleKnowledge: "Custom + quarterly tuning",
        starterSupport: "Email",
        growthSupport: "Priority",
        scaleSupport: "Shared channel",
        custom: "Custom",
      },
      startPilotShort: "Start pilot",
      talkToUs: "Talk to us",
      finePrint:
        "Month-to-month available. Annual billing: two months free and setup waived. Setup covers number, calendar, knowledge base, and go-live onboarding. Pilot is $149 for 14 days including setup, credited to your first invoice if you continue. Minutes are voice minutes and do not roll over. Taxes extra where applicable.",
      pilotHeading: "Try Esmi on your real line for fourteen days",
      pilotBody:
        "$149, including white-glove setup, credited to your first month if you continue. One number, up to 75 minutes, one calendar, the full dashboard, and an end-of-pilot review with your consultant.",
      startThePilot: "Start the pilot",
      includedHeading: "On every plan",
      included: [
        "Natural voice, 24/7",
        "Live calendar book and reschedule",
        "Human escalation with context",
        "Recordings and transcripts",
        "Appointments and leads inbox",
        "After-hours activity on the overview",
      ],
      addOnsHeading: "Add-ons",
      addOns: [
        ["Extra number", "$49 / mo"],
        ["Extra 500 minutes", "$99"],
        ["Bilingual EN / ES", "$99 / mo"],
        ["CRM / HighLevel wiring", "Custom"],
      ] as [string, string][],
      afterStartHeading: "What happens after you start",
      afterStart: [
        ["Step one", "We learn your hours, services, FAQs, and calendars."],
        ["Step two", "We go live — number, agent, booking, dashboard login."],
        ["Step three", "You see every after-hours call, booking, lead, and recording."],
      ] as [string, string][],
      questionsHeading: "Questions",
      faq: [
        {
          q: "Do I need technical staff to set this up?",
          a: "No. Setup is white-glove — Orchelix configures your number, agent, knowledge base, and calendar for you. You review it before it goes live; you don't build anything.",
        },
        {
          q: "Does Esmi book real appointments, or just take messages?",
          a: "Real appointments. Esmi reads your live Google Calendar availability and books, reschedules, or cancels directly on it — no message gets left for someone to call back and manually enter.",
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
      scheduleCaption: "Orchelix plan rate schedule — Starter, Growth, and Scale",
    },

    howItWorks: {
      title: "How It Works",
      description:
        "From first call to your first agent in 14 days. Map the workflow, deploy in two weeks, audit every action, and scale on your timeline — with a senior consultant on the line.",
      heading: "Fourteen days from first call to a live agent",
      lede: "One workflow, instrumented end to end, run by a consultant you can call by name. You expand when you can see it earning its keep — not before.",
      scheduleHeading: "The fourteen days",
      scheduleLede:
        "Each stage produces something you keep, whether or not you continue past the pilot.",
      schedule: [
        {
          when: "Days 1–3",
          title: "Map the workflow",
          desc: "A senior consultant sits with your team and writes down the one workflow we automate first — who calls, what they want, and what a good outcome looks like.",
          output: "A written workflow and a signed-off success scorecard. You keep both.",
        },
        {
          when: "Days 4–7",
          title: "Connect your tools",
          desc: "We wire the agent into what you already run — the phone line, the calendar, the CRM, the ledger. Nothing is rebuilt and nothing is migrated.",
          output: "Phone, calendar, and CRM connected in your accounts, not ours.",
        },
        {
          when: "Days 8–11",
          title: "Train and shadow",
          desc: "The agent runs against real calls in draft-only mode. It drafts, you review, nothing reaches a customer. We tune the script daily against what actually came in.",
          output: "Daily review notes and a script tuned on your real traffic.",
        },
        {
          when: "Days 12–14",
          title: "Go live",
          desc: "The line switches over with your routing rules in force. Your consultant stays on it through the first week.",
          output: "A live line and your first Monday scorecard.",
        },
      ],
      rulesHeading: "The rules are yours",
      rulesLede:
        "Automation is only acceptable when you can see what it will do before it does it. These are the decisions you make, in plain language, and change whenever you want.",
      rules: [
        ["Urgency", "Same-day emergencies page the on-call person instead of taking a message"],
        ["Language", "A Spanish-speaking caller stays in Spanish through booking and confirmation"],
        ["Escalation", "Anything outside the script transfers to a human with the conversation so far"],
        ["Booking limits", "Which calendars, which hours, how far ahead, and how much buffer"],
        ["Retention", "How long recordings and transcripts are kept, and who can read them"],
        ["Override", "Any action the agent took can be reversed by a person, on the record"],
      ] as [string, string][],
      mondayHeading: "What lands on Monday",
      mondayLede:
        "One page, every week, written so an owner can read it between jobs. It leads with what went wrong, because that is the part you would otherwise have to go looking for.",
      monday: [
        ["Calls handled", "Every call, with the reason it came in"],
        ["Outcomes", "Booked, routed, answered, or closed — and by which rule"],
        ["Escalations", "What reached a human, and why the agent handed it over"],
        ["Misses", "Anything the agent got wrong, listed before you have to find it"],
      ] as [string, string][],
      consultantHeading: "A senior consultant, by name",
      consultantLede:
        "Every deployment is led by a senior operator you can call directly. No tier-one tickets, no 48-hour reply windows, and no handover to someone who was not in the room when the workflow was written.",
      consultantBand: [
        ["Before", "They write the workflow with your team"],
        ["During", "They tune the script against your real traffic"],
        ["At go-live", "They stay on it through the first week"],
        ["After", "They are the person you call, not a queue"],
      ] as [string, string][],
      closeHeading: "Start with one workflow",
      closeBody:
        "Fourteen days, one workflow, and a written record of everything the agent did on your behalf.",
      seeTheAgents: "See the agents",
    },

    industries: {
      title: "Industries",
      description:
        "Built for operators in architecture and design, stone and fabrication, field service, manufacturing, healthcare, and legal — where a missed call is a lost job.",
      heading: "Built for the businesses a missed call actually costs",
      lede: "Owner-led operations where the phone is the front door, the caller is often ready to buy, and half of them would rather speak Spanish.",
      indexLabel: "Sectors on this page",
      sectors: [
        {
          id: "design-stone",
          name: "Design & Stone",
          line: "Where the slab meets the spec book.",
          desc: "Long lead times, specification-heavy conversations, and callers who need an answer before they can price anything. The wrong answer costs a template slot.",
          trades: [
            ["Architecture firms", "Specifier calls · RFIs · consultant routing"],
            ["Interior design studios", "Showroom enquiries · sample requests · trade accounts"],
            ["Stone & quartz fabrication", "Templates · drawings · install scheduling"],
            ["Slab yards & distributors", "Slab inventory · holds · freight quoting"],
            ["Kitchen & bath showrooms", "Showroom · deposits · supplier ETAs · install"],
          ] as [string, string][],
        },
        {
          id: "field-service",
          name: "Field Service & Construction",
          line: "The dispatch desk that never goes home.",
          desc: "Emergencies do not wait for business hours, and the caller who reaches a voicemail books with whoever picked up first. Urgency has to be judged on the call, not after it.",
          trades: [
            ["Plumbing & HVAC", "Emergency dispatch · scheduling"],
            ["Home services", "Maintenance contracts · seasonal demand"],
            ["Custom builders", "Subs · change orders · client comms"],
            ["Trades & contractors", "Quoting · estimator notes · bilingual intake"],
          ] as [string, string][],
        },
        {
          id: "manufacturing",
          name: "Manufacturing & Distribution",
          line: "Quoting that respects your real lead times.",
          desc: "An RFQ answered with a number nobody can honour is worse than one answered slowly. Qualification has to know what the floor can actually deliver.",
          trades: [
            ["Production & OEM", "RFQ qualification · engineering routing · CRM"],
            ["Building materials", "Counter · will-call · delivery windows"],
          ] as [string, string][],
        },
        {
          id: "professional",
          name: "Professional & Healthcare",
          line: "Intake that holds a confidence.",
          desc: "Regulated work, sensitive callers, and a record that has to stand up to review. Bilingual intake matters most here, and so does knowing when to stop and fetch a human.",
          trades: [
            ["Law & accounting", "Intake · conflict checks · consultation booking"],
            ["Healthcare & medical offices", "Bilingual scheduling · urgent routing · no-shows"],
            ["Real estate", "Listing enquiries · showing requests · follow-up"],
          ] as [string, string][],
        },
      ],
      closeHeading: "Not on the list?",
      closeBody:
        "The workflow matters more than the sector. If your phone is the front door and the calls follow a pattern, a consultant can map it in a fortnight.",
    },

    about: {
      title: "About",
      description:
        "Built like a consultancy, priced like software. Senior consultants, bilingual agents, and an audit trail on every action — operating across Canada and the United States.",
      heading: "Built like a consultancy. Priced like software.",
      lede: "Orchelix builds and deploys multi-agent systems that run revenue operations for owner-led businesses — the recurring, time-sensitive work that gets dropped when a small team is busy.",
      whyHeading: "Why this exists",
      whyLede:
        "Three failures show up again and again in businesses that have already tried to automate. The company is built around not repeating them.",
      failures: [
        {
          title: "Pilots that never graduate",
          desc: "Most AI engagements stall in a proof-of-concept that impresses the demo room but never touches a live lead, a real call, or an actual invoice.",
        },
        {
          title: "No accountability after go-live",
          desc: "Vendors hand over a system and walk away. When the model drifts, volumes spike, or edge cases appear, there is nobody to call.",
        },
        {
          title: "Automation nobody can inspect",
          desc: "A system that cannot show its working cannot be trusted with a customer, and cannot be defended to an auditor when someone asks what happened.",
        },
      ],
      commitHeading: "What we commit to",
      commitLede:
        "These are commitments rather than achievements. They describe how every engagement is run, and you can hold us to each one from the first day of a pilot.",
      commitments: [
        ["Ownership", "One senior consultant owns your engagement end to end"],
        ["Languages", "English and Spanish natively; French on request"],
        ["Record", "A full audit trail on every agent action, inspectable and reversible"],
        ["Data", "Your data stays in your stack; residency available on request"],
        ["Oversight", "Human-in-the-loop, never human-out-of-the-loop"],
        ["Measure", "Success counted in booked work, not tokens processed"],
      ] as [string, string][],
      engagementHeading: "How an engagement runs",
      engagement: [
        {
          title: "Map the workflow in depth",
          desc: "A senior consultant sits with the people who do the work today and writes down what actually happens — including the exceptions nobody documented.",
        },
        {
          title: "Architect the right agent stack",
          desc: "We choose the smallest system that solves the mapped workflow. Adding agents you do not need is how deployments become unmaintainable.",
        },
        {
          title: "Deploy into your tools",
          desc: "Agents run inside the phone line, inbox, CRM, and ledger you already use. Nothing is migrated and no parallel system is created.",
        },
        {
          title: "Stay accountable after go-live",
          desc: "The same consultant stays on the engagement. When volumes spike or an edge case appears, you call a person who already knows your setup.",
        },
      ],
      whereHeading: "Where we operate",
      whereLede:
        "Orchelix works across both sides of the border. English and Spanish are native on every line; French is available as an add-on when your market needs it.",
      reach: [
        ["Operating", "Canada and the United States"],
        ["On-site", "South Florida"],
        ["Remote", "Across both countries"],
        ["Privacy", "PIPEDA-aligned for Canadian operations"],
      ] as [string, string][],
      closeHeading: "Talk to a consultant",
      closeBody:
        "Not a sales call. A conversation about one workflow, whether it is worth automating, and what it would take.",
    },

    book: {
      title: "Book a pilot",
      description:
        "Thirty minutes with a senior Orchelix consultant. Bring one workflow; leave with a one-page proposal — scope, timeline, and the scorecard we would both grade success against.",
      heading: "Bring one workflow",
      lede: "Thirty minutes with a senior consultant. You leave with a written proposal whether or not you go ahead.",
      promises: [
        ["Length", "Thirty minutes. Your time is worth more than a long discovery call."],
        ["Who", "A senior operator — the same person who would own your deployment."],
        ["You keep", "A one-page proposal: the workflow, the scorecard, the timeline."],
        ["Language", "English or Spanish, whichever you would rather work in."],
      ] as [string, string][],
      agendaHeading: "What happens on the call",
      agenda: [
        {
          when: "Minutes 0–5",
          title: "Your workflow, in your words",
          desc: "A senior consultant asks about the one workflow costing you the most time or revenue right now. That is the whole intake.",
        },
        {
          when: "Minutes 5–20",
          title: "A live agent on a real call",
          desc: "We play a real Esmi recording and walk the audit trail behind it — the transcript, the reason, the disposition — rather than a polished demo video.",
        },
        {
          when: "Minutes 20–28",
          title: "A specific recommendation",
          desc: "One workflow to pilot, a fourteen-day timeline, and the scorecard we would both grade success against. Tailored, not a template.",
        },
        {
          when: "After",
          title: "A one-page proposal, no hard sell",
          desc: "Scope, timeline, scorecard, and price on a single page. Decide on your own time. If it is not the right fit, we will say so first.",
        },
      ],
      dataHeading: "How we handle what you tell us",
      dataLede:
        "You are about to describe how your business actually runs. That is worth saying plainly rather than burying in a policy page.",
      dataBand: [
        ["Who reads it", "The consultant who would run your deployment"],
        ["Privacy", "PIPEDA-aligned for Canadian operations"],
        ["Residency", "Data residency available on request"],
        ["No list", "We do not sell, share, or add you to a drip sequence"],
      ] as [string, string][],
      form: {
        fullName: "Full name",
        workEmail: "Work email",
        company: "Company",
        phone: "Phone",
        optional: "optional",
        industry: "Industry",
        selectOne: "Select one",
        workflow: "What would you like an agent to run?",
        workflowPlaceholder:
          "One workflow is enough — for example, after-hours calls going to voicemail, or a month-end close that takes two weeks.",
        bestTime: "Best time to reach you",
        times: ["Mornings", "Afternoons", "Evenings", "Any time"],
        industries: [
          "Architecture & design",
          "Stone & fabrication",
          "Field service & construction",
          "Manufacturing & distribution",
          "Healthcare & medical offices",
          "Legal & accounting",
          "Other",
        ],
        submit: "Book a pilot",
        sending: "Sending…",
        noCard: "No card required",
        received: "Received",
        receivedBody:
          "Your request is with a senior consultant. Expect a reply within one business day — from a person, with a time proposed.",
        soonerIsFine: "Sooner is fine too —",
        notSent: "Not sent",
        errorTail:
          "Nothing was sent — please try again, or call the number above and we will book it directly.",
      },
    },

    /* The two vertical landing pages share one shape, so they share one
       copy contract. Converted from the light world 2026-08-08.

       Claims removed in that pass, all of them barred by PRODUCT.md's
       "no outcome metrics, conversion rates, latency figures, or benchmark
       numbers":
       - "$400+" / "a $400–$1,500 emergency job"     (benchmark)
       - "40%+ South Florida calls in Spanish"        (benchmark)
       - "$8–15K, the average job that hits voicemail" (benchmark)
       - "Homeowners collect 3–4 quotes"              (benchmark)
       - "answers on the first ring" / "instantly"    (latency — the same
         claim already struck from /try-esmi as unverified)
       - "one captured job pays for the year"         (ROI outcome)
       Also removed: "Esmi Local … 48 hours" and "Esmi Pro … 5 business
       days", which named plans that no longer exist and contradicted the
       canonical 14-day engagement; a setup-refund guarantee that appears
       nowhere in PRODUCT.md or on /pricing; and "works with … across the
       Greater Toronto Area", which implied client references the site does
       not have and a geography PRODUCT.md does not carry.

       What survived is capability and commercial fact, both checkable:
       24/7, EN/ES, the 14-day engagement, and the published rate card. */
    /* /ai-receptionist — the Esmi product page and the parent of the seven
       sector pages. Sector copy itself lives in app/i18n/industries/.

       Corrected in the 2026-08-08 conversion: the setup answer said "Esmi
       typically launches in 2–3 weeks", which contradicted the canonical
       14-day engagement in PRODUCT.md. Removed entirely: three testimonials
       whose quotes were literally prefixed "[Placeholder]" and were shipping
       on the live page — PRODUCT.md is explicit that there are no public
       testimonials and that absent proof is never fabricated. */
    /* /blog — index and article chrome. Article bodies are deliberately out
       of scope for this pass: ArticleBody still renders the light world's
       long-form styling, and a documented Read variant of Prose is a
       separate piece of work. The chrome around it is the ledger. */
    /* /acumen — the AcumenAI product page, converted 2026-08-08.

       Honesty corrections in that pass:
       - "One bookkeeper, 200 clients." was a capacity claim with no basis on
         hand; PRODUCT.md bars outcome metrics outright.
       - the page carried no shipping status at all, while PRODUCT.md lists
         AcumenAI as in development and requires roadmap products to read as
         roadmap. It now says so in the opening, matching /app.
       - "Go to Dashboard" pointed at a raw Vercel preview host
         (landing-pink-five-23.vercel.app) rather than /app. */
    acumen: {
      title: "AcumenAI — books that reconcile themselves",
      description:
        "AcumenAI is the accounting and finance OS: it reads bank statements, verifies every transaction against the bank's own running balance, categorises to the GL, and queues exceptions for one-click human approval — with a full audit trail.",
      heading: "Books that reconcile themselves",
      lede: "AcumenAI reads a bank statement, checks every transaction against the bank's own running balance, categorises it to the right GL account, and queues only the judgment calls for a person — with an audit trail behind every step.",
      facts: [
        ["Status", "In development"],
        ["Verification", "Balance-chain, not inference"],
        ["Approval", "A person approves, never keys"],
        ["Record", "Every step logged and exportable"],
      ] as [string, string][],
      whyHeading: "Accuracy you can audit, not just trust",
      why: [
        {
          title: "Balance-chain verification",
          desc: "Every transaction's signed amount must equal the change in the bank's own running balance. Arithmetic, not a language model's guess — so sign-flips and dropped rows surface instead of slipping through.",
        },
        {
          title: "An audit trail that survives review",
          desc: "Every parse, categorisation, and approval is logged with a timestamp and a reason, attributable and exportable. The compliance backbone an accounting practice actually needs.",
        },
        {
          title: "A person approves, never keys",
          desc: "Clear transactions are categorised automatically; the judgment calls are queued for one-click approve or reject. Per-client rules learn over time, so the queue shrinks as the books mature.",
        },
      ],
      closeHeading: "See it run on your own books",
      closeBody:
        "AcumenAI does the reading, the arithmetic, and the data entry. Your team reviews the exceptions and approves — the part that needs judgment. A fourteen-day pilot puts it against your real ledger.",
      openConsole: "Open the console",
    },

    /* /missed-calls — the Esmi direct-response landing page, converted
       2026-08-08. It was the last surface carrying the `esmi-dark`
       glassmorphism world: cyan #00F0FF to purple #A855F7 gradient text,
       blurred colour blobs, and glass panels — the exact palette the redesign
       brief names as the thing to avoid. */
    missedCalls: {
      title: "Stop losing bookings to missed calls",
      description:
        "Esmi is an AI receptionist that answers after hours, books appointments on your calendar, and captures leads — in English and Spanish. Hear it in two minutes.",
      heading: "Stop losing bookings to missed and after-hours calls",
      lede: "Esmi answers when you cannot, books on your calendar while the caller is still on the line, and texts you the lead. English and Spanish on the same number.",
      bullets: [
        ["Answers", "When you are busy, closed, or with a client"],
        ["Books", "Directly on your calendar — no “we’ll call you back”"],
        ["Records", "Every call, chat, and appointment in one dashboard"],
        ["Languages", "English and Spanish on the same line"],
      ] as [string, string][],
      formHeading: "Hear it on your own phone",
      formLede:
        "Leave a number and we will call it with Esmi on the line, so you hear what your own callers would hear.",
      closeHeading: "Hear the call before you decide",
      closeBody:
        "There is a real recording on the demo page, and the same agent in a chat you can type into. Two minutes, no form.",
    },

    blog: {
      title: "Blog",
      description:
        "Practical guides on AI receptionists, AI agents, and automating the front desk — pricing, comparisons, and how to put them to work in your business.",
      heading: "AI for the front desk, explained",
      lede: "Guides on AI receptionists, AI agents, and automating customer conversations — written for business owners, not engineers.",
      readingSuffix: "min read",
      allArticles: "All articles",
      keepReading: "Keep reading",
      closeHeading: "Reading is not the same as hearing it",
      closeBody:
        "There is a real Esmi recording on the demo page, and the same agent in a chat you can type into. Two minutes, no form.",
    },

    aiReceptionist: {
      title: "AI receptionist for small business",
      description:
        "Esmi answers every call 24/7, qualifies the caller, books the appointment, and hands off to a person when it matters — in English and Spanish, with a transcript and a reason on every call.",
      heading: "The phone is answered, and the call is written down",
      lede: "Esmi is the receptionist that does not go home. It answers, qualifies, books into your real calendar, and leaves a record you can read afterwards — in English or Spanish, whichever the caller uses.",
      facts: [
        ["Status", "In production, answering calls today"],
        ["Languages", "English and Spanish, natively"],
        ["Hours", "24/7, nights and weekends included"],
        ["Live in", "14 days from the first call"],
      ] as [string, string][],
      doesHeading: "What it does on a call",
      does: [
        ["Answers", "Every call, at any hour, in the caller's language — not a menu and not a mailbox."],
        ["Qualifies", "The questions you would ask, asked the way you ask them, before anyone's time is spent."],
        ["Books", "Into your live calendar, on the call, with a confirmation sent to the caller."],
        ["Escalates", "When a call needs a person, it hands off with the whole conversation attached."],
        ["Records", "A transcript, a reason, and a disposition on every call — reviewable, and reversible."],
      ] as [string, string][],
      sectorsHeading: "Built for the way your sector answers the phone",
      sectorsLede:
        "The agent is the same; the questions, the routing, and the vocabulary are not. These are the sectors we have configured Esmi for.",
      sectorsIndexLabel: "Sectors on this page",
      faqHeading: "Questions people ask first",
      faq: [
        {
          q: "What is an AI receptionist?",
          a: "An AI receptionist is a virtual phone agent that answers your incoming calls automatically — greeting callers, answering common questions, qualifying leads, and booking appointments — without a human picking up the phone. Esmi works 24/7 and escalates to your team when a call needs a person.",
        },
        {
          q: "How is an AI receptionist different from a traditional answering service?",
          a: "A traditional answering service takes messages and forwards them; you still call people back. Esmi handles the whole interaction in real time — answering questions, qualifying the caller, and booking the appointment on your calendar before they hang up — so there's nothing to follow up on later.",
        },
        {
          q: "Can the AI receptionist book appointments?",
          a: "Yes. Esmi reads your live calendar, offers open slots, books the appointment, and sends a confirmation by SMS — all on the same call. No staff handoff required.",
        },
        {
          q: "Does Esmi speak Spanish?",
          a: "Yes. Esmi is bilingual (English and Spanish) and can switch language mid-call. French is available as an add-on. That matters for South Florida, Ontario, and other bilingual markets.",
        },
        {
          q: "What happens when a call needs a human?",
          a: "Esmi escalates to your team and hands off the full call context — who's calling, what they need, and a summary — so the person taking over isn't starting from scratch.",
        },
        {
          q: "How long does it take to set up?",
          a: "The first agent goes live fourteen days from the first call. We configure it on your scripts, calendar, and FAQs, then test it with you before it answers anything real.",
        },
        {
          q: "Will callers know they're talking to AI?",
          a: "Esmi is designed to be natural and helpful, and we're transparent about how it's introduced. You control the greeting and tone so it reflects your brand.",
        },
        {
          q: "How much does an AI receptionist cost?",
          a: "Starter is $299 a month, Growth $599, and Scale $999, with setup done for you. A fourteen-day pilot is $149, credited to your first invoice if you continue.",
        },
      ],
      closeHeading: "Hear it before you buy it",
      closeBody:
        "There is a real recording on the demo page, and the same agent is there in a chat you can type into. No form, no scheduling — the product doing its job.",
    },

    verticals: {
      homeServices: {
        title: "AI receptionist for home services",
        description:
          "Esmi answers every HVAC, plumbing, roofing, and electrical call — after hours, on the job, in English and Spanish — and books the work onto your calendar.",
        heading: "The 8pm call goes to whoever answers",
        lede: "A bilingual receptionist for home-services businesses. Esmi picks up after hours, on weekends, and while your crew is on a job — qualifies the work, and books it straight onto your calendar.",
        facts: [
          ["Trades", "HVAC, plumbing, roofing, electrical"],
          ["Languages", "English and Spanish, natively"],
          ["Hours", "24/7, nights and weekends included"],
          ["Live in", "14 days from the first call"],
        ] as [string, string][],
        slipsHeading: "What the phone costs you",
        slips: [
          {
            title: "After-hours calls reach voicemail",
            desc: "An emergency at eight in the evening books with whoever picks up. A voicemail is a decision made on your behalf by the next company on the list.",
          },
          {
            title: "Your crew cannot answer from a job",
            desc: "Every ring a tech takes is work interrupted. The phone competes with the thing you are actually paid to do.",
          },
          {
            title: "Spanish-speaking callers get less",
            desc: "A significant share of the market would rather book in Spanish, and almost nobody staffs for it after hours.",
          },
        ],
        callHeading: "How the call goes",
        call: [
          ["Answers", "Esmi takes the call at any hour, in English or Spanish."],
          ["Qualifies", "Emergency or routine, in the service area or not — the questions you would ask, asked the way you ask them."],
          ["Escalates", "A real emergency pages your on-call phone with the conversation summary attached."],
          ["Books", "Everything else goes onto your calendar with name, address, and issue, and a confirmation to the caller."],
          ["Records", "A transcript, a reason, and a disposition on every call — reviewable, and reversible."],
        ] as [string, string][],
        closeHeading: "Live on your line in fourteen days",
        closeBody:
          "Starter is $299 a month with setup done for you. A fourteen-day pilot is $149, credited to your first invoice if you continue.",
      },

      kitchenBath: {
        title: "AI receptionist for kitchen, bath & stone",
        description:
          "Esmi answers every call for kitchen builders, stone fabricators, and design/build firms — quotes the ranges you set, qualifies homeowners, and books consultations 24/7 in English and Spanish.",
        heading: "Your next kitchen job calls while you're on this one",
        lede: "A bilingual receptionist for fabricators, kitchen builders, and design/build firms. Esmi quotes the starting ranges you set, separates serious homeowners from browsers, and books the consultation into your calendar.",
        facts: [
          ["Trades", "Fabrication, kitchen and bath, design/build"],
          ["Languages", "English and Spanish, natively"],
          ["Hours", "24/7, nights and weekends included"],
          ["Live in", "14 days from the first call"],
        ] as [string, string][],
        slipsHeading: "What the phone costs you",
        slips: [
          {
            title: "The call comes while you are on the saw",
            desc: "A homeowner ready to spend reaches voicemail, and dials the next shop on the list before you have wiped your hands.",
          },
          {
            title: "The shop that answers books the visit",
            desc: "Homeowners gather several quotes before they commit, and the site visit is where the job is actually won.",
          },
          {
            title: "Spanish-speaking callers get less",
            desc: "Crews, trades, and plenty of homeowners would rather talk in Spanish. Most shops cannot serve them; Esmi does it natively.",
          },
        ],
        callHeading: "How the call goes",
        call: [
          ["Answers", "Esmi takes the call at any hour, on the phone or in web chat, in English or Spanish."],
          ["Quotes", "Your starting ranges, exactly as you set them — your numbers, never a figure it invented."],
          ["Qualifies", "Budget, timeline, and scope. Designers and trades are flagged for priority."],
          ["Books", "The consultation goes into your real calendar on the call, with every detail sent to you afterwards."],
          ["Records", "A transcript, a reason, and a disposition on every call — reviewable, and reversible."],
        ] as [string, string][],
        closeHeading: "Live on your line in fourteen days",
        closeBody:
          "Orchelix operates across Canada and the United States, with a South Florida service area. Starter is $299 a month with setup done for you, and a fourteen-day pilot is $149.",
      },
    },
  },
};

/* Deliberately not `as const`: that would freeze every value to its literal
   type ("English", "Products", …) and no translation could ever satisfy the
   contract. Widened inference is what makes `Messages` a shape other locales
   can implement. */
export default en;
export type Messages = typeof en;
