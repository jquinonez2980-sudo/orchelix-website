/* Blog content store — dependency-free, typed content blocks rendered by
   ArticleBody. Inline markup in `text` supports **bold** and [label](/href). */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO (YYYY-MM-DD)
  dateModified?: string;
  author: string;
  readingMinutes: number;
  keywords: string[];
  body: Block[];
  related: { label: string; href: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "what-is-an-ai-receptionist",
    title: "What Is an AI Receptionist? (And How It Works)",
    description:
      "An AI receptionist is a virtual phone agent that answers calls, qualifies leads, and books appointments automatically. Here's how it works and whether it's right for your business.",
    datePublished: "2026-06-02",
    author: "Orchelix",
    readingMinutes: 6,
    keywords: [
      "what is an ai receptionist",
      "ai receptionist",
      "how does an ai receptionist work",
      "ai virtual receptionist",
    ],
    body: [
      {
        type: "p",
        text: "**An AI receptionist is a virtual phone agent that answers your incoming calls automatically — greeting callers, answering questions, qualifying leads, and booking appointments — without a person picking up the phone.** It works 24/7 and hands off to your team when a call needs a human. Think of it as a front-desk employee that works every shift, including the ones nobody wants.",
      },
      { type: "h2", text: "How does an AI receptionist work?" },
      {
        type: "p",
        text: "A modern AI receptionist combines natural-sounding voice, an understanding of your business, and connections to your calendar and CRM. A typical call goes like this:",
      },
      {
        type: "ul",
        items: [
          "**It answers** — at any hour of the day, without a queue or a mailbox.",
          "**It understands the caller** — using natural conversation, not a rigid phone tree.",
          "**It takes action** — answers FAQs, qualifies the lead, and books an appointment on your live calendar.",
          "**It confirms** — sends a text confirmation and logs a summary to your CRM.",
          "**It escalates when needed** — routes complex or sensitive calls to a human with full context.",
        ],
      },
      {
        type: "p",
        text: "The setup happens up front: the agent is trained on your services, hours, scripts, and FAQs so it sounds like your front desk — see [how Esmi works](/ai-receptionist) for a concrete example.",
      },
      { type: "h2", text: "What can an AI receptionist do?" },
      {
        type: "ul",
        items: [
          "Answer calls 24/7, including nights, weekends, and overflow when your team is busy.",
          "Qualify leads by asking the questions your sales team would, then scoring and logging them.",
          "Book, reschedule, and confirm appointments directly on your calendar.",
          "Answer common questions about hours, location, services, and pricing.",
          "Operate bilingually — for example, switching between English and Spanish mid-call.",
          "Capture every call as a summary and transcript so nothing falls through the cracks.",
        ],
      },
      { type: "h2", text: "How is it different from other options?" },
      {
        type: "p",
        text: "Unlike a traditional answering service that mostly takes messages, an AI receptionist resolves the call — see our full breakdown in [AI receptionist vs. answering service](/blog/ai-receptionist-vs-answering-service). And unlike hiring a full-time front-desk employee, it covers every hour without salary, benefits, or sick days. Curious about price? We cover it in [How much does an AI receptionist cost?](/blog/how-much-does-an-ai-receptionist-cost).",
      },
      { type: "h2", text: "Is an AI receptionist right for your business?" },
      {
        type: "p",
        text: "It's an especially strong fit if any of these sound familiar:",
      },
      {
        type: "ul",
        items: [
          "You're losing calls — and revenue — after hours or when staff are busy.",
          "A booked appointment is worth far more than the cost of answering the call.",
          "Your call volume swings unpredictably and is hard to staff for.",
          "You serve customers in more than one language.",
          "You want faster speed-to-answer without growing headcount.",
        ],
      },
      {
        type: "callout",
        text: "If a missed call can cost you a customer, an AI receptionist is usually the highest-leverage automation a service business can add.",
      },
      { type: "h2", text: "Meet Esmi" },
      {
        type: "p",
        text: "Esmi is the AI receptionist from Orchelix — bilingual, available 24/7, and built to book appointments end-to-end with a human handoff when it matters. [See how Esmi works](/ai-receptionist), [try it live](/try-esmi), or [book a demo](/book) to see it on your own call flow.",
      },
    ],
    related: [
      { label: "AI receptionist vs. answering service", href: "/blog/ai-receptionist-vs-answering-service" },
      { label: "How much does an AI receptionist cost?", href: "/blog/how-much-does-an-ai-receptionist-cost" },
      { label: "AI Receptionist — how Esmi works", href: "/ai-receptionist" },
    ],
  },
  {
    slug: "ai-receptionist-vs-answering-service",
    title: "AI Receptionist vs. Answering Service: Which Is Right for Your Business?",
    description:
      "AI receptionist or traditional answering service? A clear, honest comparison of cost, speed, booking, after-hours coverage, and when each one wins.",
    datePublished: "2026-06-02",
    author: "Orchelix",
    readingMinutes: 7,
    keywords: [
      "ai receptionist vs answering service",
      "answering service alternative",
      "ai answering service",
      "virtual receptionist vs answering service",
    ],
    body: [
      {
        type: "p",
        text: "When your phone rings more than your team can handle, you have two modern options: a traditional answering service staffed by people, or an [AI receptionist](/ai-receptionist) that answers and acts on the call itself. They sound similar, but they solve different problems. Here's how to tell which one your business actually needs.",
      },
      { type: "h2", text: "The quick verdict" },
      {
        type: "p",
        text: "An **answering service** is best when you mainly need a friendly human to take messages and route calls. An **AI receptionist** is best when you want the call *resolved* — questions answered, leads qualified, and appointments booked — on the call, around the clock, without a callback.",
      },
      {
        type: "callout",
        text: "Short version: answering services capture calls. AI receptionists complete them.",
      },
      { type: "h2", text: "What a traditional answering service does" },
      {
        type: "p",
        text: "An answering service routes your overflow or after-hours calls to remote human operators. They greet the caller, take a message, and pass it along — sometimes following a basic script.",
      },
      {
        type: "ul",
        items: [
          "**Strengths:** a real human voice, good for sensitive or unusual calls, no automation setup.",
          "**Limits:** operators usually can't access your calendar or systems, so they take a message and you call back — adding a delay that loses ready-to-book callers.",
          "**Cost shape:** typically billed per minute or per call, so a busy month gets expensive fast.",
        ],
      },
      { type: "h2", text: "What an AI receptionist does" },
      {
        type: "p",
        text: "An AI receptionist answers the call itself, in natural conversation. It can pull from your FAQs, qualify the caller, read your live calendar, and book the appointment on the same call — then hand off to a human when something needs one.",
      },
      {
        type: "ul",
        items: [
          "**Strengths:** instant pickup 24/7, books appointments end-to-end, qualifies leads, and logs everything to your CRM.",
          "**Limits:** needs a short setup to learn your business; you'll want clear rules for when it escalates to a person.",
          "**Cost shape:** usually a flat monthly price, which stays predictable as volume grows. (We break the numbers down in [How Much Does an AI Receptionist Cost?](/blog/how-much-does-an-ai-receptionist-cost).)",
        ],
      },
      { type: "h2", text: "Head-to-head" },
      {
        type: "ul",
        items: [
          "**Speed to answer:** an AI agent takes concurrent calls, so it does not queue behind operator availability the way an answering service does.",
          "**Booking:** AI books directly into your calendar; most answering services only take a message.",
          "**After-hours:** AI is genuinely 24/7 at no premium; human services often charge more for nights and weekends.",
          "**Languages:** AI can be bilingual and switch mid-call; human coverage depends on who's staffed.",
          "**Scalability:** AI handles ten simultaneous calls as easily as one; human services queue.",
          "**Cost as you grow:** flat monthly (AI) vs. per-minute creep (answering service).",
        ],
      },
      { type: "h2", text: "When an answering service still makes sense" },
      {
        type: "p",
        text: "If your call volume is very low, your calls are highly sensitive or non-routine, or you specifically need a human on every call for compliance or comfort, a traditional service can be the right fit. There's nothing wrong with messages-and-callbacks if speed-to-book isn't your bottleneck.",
      },
      { type: "h2", text: "When an AI receptionist wins" },
      {
        type: "p",
        text: "If missed and after-hours calls are costing you booked work, if callers expect instant answers, or if your volume swings unpredictably, an AI receptionist almost always comes out ahead — it turns more calls into booked appointments without growing your headcount.",
      },
      { type: "h2", text: "You don't have to choose only one" },
      {
        type: "p",
        text: "The best setups are hybrid. An AI receptionist handles the routine — answering, qualifying, booking — and escalates to your team (or a human service) the moment a call needs a person, passing along the full context so nobody starts from scratch. You get instant, 24/7 coverage *and* a human touch where it matters.",
      },
      { type: "h2", text: "How Esmi handles it" },
      {
        type: "p",
        text: "Esmi, the AI receptionist from Orchelix, answers every call 24/7, books appointments end-to-end, works bilingually (EN/ES), and hands off to your team with full context when needed — as a flexible monthly service with no long contracts. See [how Esmi works](/ai-receptionist), check [pricing](/pricing), or [book a demo](/book). You can also [try Esmi live](/try-esmi) right now.",
      },
    ],
    related: [
      { label: "What is an AI receptionist?", href: "/blog/what-is-an-ai-receptionist" },
      { label: "How much does an AI receptionist cost?", href: "/blog/how-much-does-an-ai-receptionist-cost" },
      { label: "AI Receptionist — how Esmi works", href: "/ai-receptionist" },
    ],
  },
  {
    slug: "how-much-does-an-ai-receptionist-cost",
    title: "How Much Does an AI Receptionist Cost? (2026 Pricing Guide)",
    description:
      "AI receptionist pricing explained: typical monthly costs, the four pricing models, what drives the price, and how AI compares to a human receptionist or answering service.",
    datePublished: "2026-06-02",
    author: "Orchelix",
    readingMinutes: 6,
    keywords: [
      "ai receptionist cost",
      "ai receptionist pricing",
      "how much does an ai receptionist cost",
      "ai virtual receptionist price",
    ],
    body: [
      {
        type: "p",
        text: "If you're weighing an [AI receptionist](/ai-receptionist) for your business, the first question is usually the simplest one to ask and the hardest to get a straight answer on: what does it actually cost? The honest answer is that it depends on how you're billed and how busy your phones are — but the ranges are far narrower, and far lower, than most owners expect.",
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "For most small and mid-sized businesses, an AI receptionist runs roughly **$200 to $1,500 per month**. Light, low-volume use can sit at the bottom of that range; high call volume with deep integrations and after-hours coverage pushes toward the top. Compared with the loaded cost of a full-time front-desk hire, that's typically a fraction of the price for around-the-clock coverage.",
      },
      {
        type: "callout",
        text: "Rule of thumb: if a single missed call can cost you a booked job, an AI receptionist usually pays for itself well before the end of the first month.",
      },
      { type: "h2", text: "The four ways AI receptionists are priced" },
      {
        type: "p",
        text: "Almost every provider uses one of these models. Knowing which one you're being quoted makes it easy to compare apples to apples.",
      },
      {
        type: "ul",
        items: [
          "**Per-minute** — you pay for talk time (often $0.50–$2.00/min). Predictable for low volume, but costs climb fast as calls grow.",
          "**Per-call** — a flat fee per answered call. Simple, but long or complex calls cost the same as quick ones.",
          "**Flat monthly** — a set price for a bucket of minutes or calls. Easiest to budget; watch for overage rates.",
          "**Fully managed service** — a monthly price that includes setup, tuning, integrations, and ongoing optimization by a real team, not just software access.",
        ],
      },
      { type: "h2", text: "What actually drives the price" },
      {
        type: "p",
        text: "Two businesses can get very different quotes for the same product. These are the levers that move the number:",
      },
      {
        type: "ul",
        items: [
          "**Call volume** — more calls means more minutes, the single biggest cost driver.",
          "**Languages** — bilingual (English/Spanish) handling can affect price, though it often pays back quickly in markets like South Florida.",
          "**Integrations** — connecting your calendar and CRM so the agent can book and log calls adds setup value (and sometimes cost).",
          "**After-hours and overflow** — 24/7 coverage and busy-line overflow are where AI earns its keep, but they add usage.",
          "**Human escalation** — routing complex calls to your team is essential; how it's handled can affect the plan.",
          "**Onboarding** — some providers charge a one-time setup fee to train the agent on your scripts and FAQs.",
        ],
      },
      { type: "h2", text: "AI receptionist vs. a human receptionist vs. an answering service" },
      {
        type: "p",
        text: "A full-time receptionist in the US typically costs **$3,000–$4,500+ per month** once you include salary, benefits, and overhead — and they work one shift, not 24/7. A traditional answering service is cheaper but usually just takes messages, leaving you to call people back. An AI receptionist sits in between on price while doing more of the actual work: it answers, qualifies the caller, and [books the appointment](/ai-receptionist) on the same call.",
      },
      {
        type: "p",
        text: "The real comparison isn't just sticker price — it's cost per outcome. A cheaper option that only takes messages still leaves revenue on the table every time a ready-to-book caller doesn't get a callback in time.",
      },
      { type: "h2", text: "What to look for beyond the price" },
      {
        type: "ul",
        items: [
          "**Human handoff** — the agent should escalate to your team with full context, not trap callers in a loop.",
          "**Booking that sticks** — real calendar integration and SMS confirmation, not just a promise to follow up.",
          "**Bilingual support** — if you serve Spanish-speaking customers, mid-call language switching matters.",
          "**No long contracts** — flexible monthly terms let you prove value before committing.",
          "**A team behind it** — ongoing tuning and support beats software you have to babysit yourself.",
        ],
      },
      { type: "h2", text: "How Esmi is priced" },
      {
        type: "p",
        text: "Esmi, the AI receptionist from Orchelix, is offered as a flexible monthly managed service — monitoring, optimization, and a senior consultant included, with no long-term contracts. You can start with Esmi alone and add more agents as you grow. See current packages on the [pricing page](/pricing), or [book a demo](/book) for a quote tailored to your call volume.",
      },
      {
        type: "p",
        text: "Want to hear it first? You can [try Esmi live](/try-esmi) before you talk to anyone.",
      },
    ],
    related: [
      { label: "What is an AI receptionist?", href: "/blog/what-is-an-ai-receptionist" },
      { label: "AI receptionist vs. answering service", href: "/blog/ai-receptionist-vs-answering-service" },
      { label: "AI Receptionist — how Esmi works", href: "/ai-receptionist" },
    ],
  },
  {
    slug: "best-ai-receptionist-for-small-business",
    title: "Best AI Receptionist for Small Business (2026 Buyer's Guide)",
    description:
      "A practical buyer's guide to AI receptionists for small business: the features that actually matter, what to look for, how much it costs, and which types of businesses see the fastest ROI.",
    datePublished: "2026-06-03",
    author: "Orchelix",
    readingMinutes: 8,
    keywords: [
      "best ai receptionist for small business",
      "ai receptionist small business",
      "top ai receptionist",
      "ai phone answering small business",
    ],
    body: [
      {
        type: "p",
        text: "Most small businesses don't lose leads because of their product or service. They lose them because no one answered the phone. An AI receptionist solves that — but not all of them solve it the same way. This guide breaks down what actually matters when evaluating one for a small business.",
      },
      { type: "h2", text: "What to look for in a small business AI receptionist" },
      {
        type: "p",
        text: "The feature list on any AI receptionist's website will look roughly the same. What separates a useful tool from a frustrating one comes down to a few specifics.",
      },
      { type: "h3", text: "24/7 availability — not just extended hours" },
      {
        type: "p",
        text: "Some services answer calls until 9 PM. Others answer at 2 AM when a homeowner's AC breaks or a client needs to know their rights. Know which you're actually buying.",
      },
      { type: "h3", text: "Appointment booking that actually works" },
      {
        type: "p",
        text: "Many AI receptionists capture a message and say someone will call back. That's an answering service with a chatbot in front of it. **Real appointment booking** means the AI reads your live calendar, offers available slots, and confirms the booking before the caller hangs up — no callback required.",
      },
      { type: "h3", text: "Lead qualification, not just lead capture" },
      {
        type: "p",
        text: "There's a difference between 'someone called' and 'a qualified lead called, here's what they need, and here's when they're booked.' The second is what your team actually needs to show up prepared and close more.",
      },
      { type: "h3", text: "Bilingual support if your market needs it" },
      {
        type: "p",
        text: "In South Florida, South Texas, or any bilingual market, an AI receptionist that only speaks English is leaving a significant portion of your callers underserved. [Esmi](/ai-receptionist) handles both English and Spanish on the same call — callers don't need to select a language option, it adapts.",
      },
      { type: "h3", text: "Human handoff with context" },
      {
        type: "p",
        text: "When a call genuinely needs a person, the handoff should come with a summary — who's calling, why, and what's already been covered. Starting from scratch after a transfer is a bad experience that costs you the conversion.",
      },
      { type: "h3", text: "Transparent pricing" },
      {
        type: "p",
        text: "Watch for per-minute billing, call overage fees, and setup charges that appear after you've signed. Look for flat monthly pricing that covers standard usage without surprises. See [how Orchelix prices Esmi](/pricing).",
      },
      { type: "h2", text: "Which small businesses benefit most?" },
      {
        type: "p",
        text: "Any business that relies on inbound calls to generate revenue benefits from an AI receptionist. The ROI is highest where:",
      },
      {
        type: "ul",
        items: [
          "**Missed calls equal missed jobs** — HVAC, plumbing, home services, auto repair",
          "**New client intake is time-sensitive** — law firms, dental offices, medical practices",
          "**Leads come in outside business hours** — real estate, home renovation, event services",
          "**Staff time is expensive** — professional services where every hour has a billing rate",
        ],
      },
      {
        type: "p",
        text: "We've built industry-specific versions of Esmi for [HVAC companies](/ai-receptionist/hvac), [dental offices](/ai-receptionist/dental), [law firms](/ai-receptionist/law-firm), [real estate agents](/ai-receptionist/real-estate), [interior designers](/ai-receptionist/residential-design), [stone distributors](/ai-receptionist/stone-distribution), and [stone fabricators](/ai-receptionist/stone-fabrication).",
      },
      { type: "h2", text: "How much does a small business AI receptionist cost?" },
      {
        type: "p",
        text: "AI receptionist pricing ranges from around $200/month on the low end to $1,500+/month for full-service implementations with custom integration, dedicated support, and high call volumes. We cover this in detail in our [AI receptionist cost breakdown](/blog/how-much-does-an-ai-receptionist-cost).",
      },
      {
        type: "p",
        text: "The useful benchmark isn't the cost of the tool — it's the cost of not having it. A single missed HVAC installation, a law firm intake call that went to voicemail, or a real estate lead that booked with a competitor typically exceeds a month of AI receptionist fees.",
      },
      {
        type: "callout",
        text: "Esmi pilots start with a dedicated setup session and go live in 2–3 weeks. No long contracts. [See pricing →](/pricing)",
      },
      { type: "h2", text: "Questions to ask before you buy" },
      {
        type: "ul",
        items: [
          "Does it read my live calendar and book real appointments, or does it take messages?",
          "What happens when the AI can't handle a call — how does the handoff work?",
          "Is setup included, or is there a separate onboarding fee?",
          "How are scripts updated when my business changes?",
          "Is pricing flat monthly, or are there per-minute or overage charges?",
        ],
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "The best AI receptionist for a small business is the one that fits how your operation actually works — your calendar, your scripts, your escalation rules — and that stays out of the way while making sure every caller is heard. [Try Esmi live](/try-esmi) to see what that looks like in practice, or [book a demo](/book) and we'll configure a version specific to your business.",
      },
    ],
    related: [
      { label: "How much does an AI receptionist cost?", href: "/blog/how-much-does-an-ai-receptionist-cost" },
      { label: "AI receptionist vs. answering service", href: "/blog/ai-receptionist-vs-answering-service" },
      { label: "AI Receptionist — how Esmi works", href: "/ai-receptionist" },
    ],
  },

  {
    slug: "ai-receptionist-for-hvac-companies",
    title: "How HVAC Companies Are Using AI to Handle Calls 24/7",
    description:
      "HVAC companies are using AI receptionists to answer emergency calls, book service appointments, and qualify jobs without adding staff. Here's how it works and what to expect.",
    datePublished: "2026-06-03",
    author: "Orchelix",
    readingMinutes: 6,
    keywords: [
      "ai receptionist for hvac",
      "hvac answering service ai",
      "ai phone answering hvac",
      "virtual receptionist hvac company",
    ],
    body: [
      {
        type: "p",
        text: "The phone is the lifeline of any HVAC business. Customers don't schedule an AC repair weeks in advance — they call when something stops working, often outside business hours, often during the same heat wave that's already flooded your schedule. The companies winning in that moment aren't hiring more office staff. They're using AI to answer every call.",
      },
      { type: "h2", text: "The HVAC call problem" },
      {
        type: "p",
        text: "The economics of missed HVAC calls are harsh. A single installation job is worth $3,000–$10,000. A service call is $150–$600. And the margin on each job depends on booking efficiency — how fast you get a tech to the right job with the right information.",
      },
      {
        type: "p",
        text: "When calls go unanswered — during lunch, after 5 PM, on weekends, or during the summer surge — that work goes to whoever picks up the phone first. In most markets, that's a competitor.",
      },
      {
        type: "callout",
        text: "During peak season, a single missed call can mean losing a $5,000+ installation to a competitor who answered.",
      },
      { type: "h2", text: "What an AI receptionist does for an HVAC company" },
      {
        type: "p",
        text: "An [AI receptionist for HVAC](/ai-receptionist/hvac) handles the first conversation with every caller — whether that's a homeowner with a broken unit, a property manager scheduling preventive maintenance, or a commercial account asking about a service contract.",
      },
      {
        type: "p",
        text: "On a typical call, Esmi:",
      },
      {
        type: "ul",
        items: [
          "Greets the caller and identifies the type of request (repair, installation, maintenance)",
          "Collects job details: unit type, symptoms, age, property address",
          "Checks your calendar and books the appointment — or routes emergency calls to your on-call tech",
          "Sends a confirmation to the caller and a job summary to your dispatch team",
        ],
      },
      {
        type: "p",
        text: "Your team picks up the route with everything they need to show up prepared. No callbacks, no missing information, no repeat conversations.",
      },
      { type: "h2", text: "Handling the after-hours emergency" },
      {
        type: "p",
        text: "After-hours emergency calls are where most HVAC businesses lose the most revenue. A unit that fails at 9 PM generates a call that hits voicemail, a callback that comes the next morning, and a customer who may have already called three other companies by then.",
      },
      {
        type: "p",
        text: "Esmi handles emergency calls around the clock. You set the escalation rules: for true emergencies (complete failure, elderly resident, commercial account), Esmi connects the caller to your on-call tech on the same call. For non-urgent after-hours calls, it books a first-available appointment and sends the summary.",
      },
      {
        type: "p",
        text: "The caller gets a response. Your tech gets context. You get the job.",
      },
      { type: "h2", text: "Appointment booking and dispatch" },
      {
        type: "p",
        text: "Most answering services take a message and leave a callback. That creates a loop: you call back, the customer doesn't pick up, they call back, you're on a job. The loop costs time and loses leads.",
      },
      {
        type: "p",
        text: "Esmi reads your live calendar and books the appointment in real time — before the caller hangs up. Your dispatch board fills with confirmed, qualified appointments instead of a list of callbacks.",
      },
      {
        type: "p",
        text: "For multi-tech operations, Esmi can route bookings by territory, service type, or technician availability — configured during setup to match how you actually dispatch.",
      },
      { type: "h2", text: "What it costs and what you get back" },
      {
        type: "p",
        text: "AI receptionist costs for home service businesses typically run $300–$800/month for full-service implementation. [See our pricing page](/pricing) for what's included.",
      },
      {
        type: "p",
        text: "The comparison that matters: a single recovered installation worth $5,000 that would otherwise have gone to voicemail pays for more than a year of service. Most HVAC businesses recover the cost in the first month. See the full [AI receptionist cost breakdown](/blog/how-much-does-an-ai-receptionist-cost).",
      },
      { type: "h2", text: "Is an AI receptionist right for your HVAC company?" },
      {
        type: "p",
        text: "If you're getting more than 10 inbound calls per day and any of those calls are going unanswered, to voicemail, or to a part-time assistant who can't book appointments — an AI receptionist will likely pay for itself quickly.",
      },
      {
        type: "p",
        text: "The businesses that see the fastest ROI are those with seasonal volume spikes, after-hours emergency call volume, or multi-tech operations where dispatch coordination is a bottleneck.",
      },
      {
        type: "p",
        text: "[Try Esmi live](/try-esmi) to hear what the AI sounds like, or [book a demo](/book) and we'll configure it for your service area and calendar.",
      },
    ],
    related: [
      { label: "AI Receptionist for HVAC Companies", href: "/ai-receptionist/hvac" },
      { label: "Best AI receptionist for small business", href: "/blog/best-ai-receptionist-for-small-business" },
      { label: "How much does an AI receptionist cost?", href: "/blog/how-much-does-an-ai-receptionist-cost" },
    ],
  },

  {
    slug: "law-firm-missed-calls-ai-receptionist",
    title: "Why Law Firms Lose Clients to Voicemail (And How to Fix It)",
    description:
      "Most law firms lose new client inquiries to voicemail without realizing it. Here's why it happens, what it's costing your firm, and how AI intake solves it for practices of all sizes.",
    datePublished: "2026-06-03",
    author: "Orchelix",
    readingMinutes: 6,
    keywords: [
      "law firm missed calls",
      "ai receptionist for law firms",
      "legal intake ai",
      "law firm voicemail clients",
    ],
    body: [
      {
        type: "p",
        text: "A potential client with a legal problem calls your firm. They get voicemail. They hang up and call the next firm on the list. You never know the call happened.",
      },
      {
        type: "p",
        text: "This is not a rare scenario. For most law firms, it's a daily occurrence — and the cost is invisible because you can't count the clients you never knew you lost.",
      },
      { type: "h2", text: "The law firm voicemail problem" },
      {
        type: "p",
        text: "Legal matters arrive urgently. Someone was just in an accident. Someone received a lawsuit. Someone needs to understand their rights before a deadline. These calls don't wait.",
      },
      {
        type: "p",
        text: "The firm that answers — at 7 PM on a Tuesday, on a Saturday morning, or in the middle of a trial week — gets the case. The firm that sends the call to voicemail gets a callback that may never come.",
      },
      {
        type: "callout",
        text: "In competitive legal markets, the average caller contacts 3–5 firms before booking a consultation. Whoever answers first wins.",
      },
      { type: "h2", text: "What happens when potential clients reach voicemail" },
      {
        type: "p",
        text: "Most people who reach voicemail when they have an urgent legal question don't leave a message — they move on. Of those who do leave a message, a significant share have already found another firm by the time you call back.",
      },
      {
        type: "p",
        text: "For high-value practice areas — personal injury, criminal defense, business litigation, estate planning — a single missed intake call can represent $5,000–$50,000 in lost revenue.",
      },
      { type: "h2", text: "How much are missed calls costing your firm?" },
      {
        type: "p",
        text: "A rough calculation: if your firm misses 3 potential client calls per week, and 1 in 4 would have become a client at an average case value of $8,000:",
      },
      {
        type: "ul",
        items: [
          "3 missed calls/week × 52 weeks = 156 missed calls/year",
          "1 in 4 converts = 39 potential clients lost",
          "At $8,000 average case value = $312,000 in missed revenue per year",
        ],
      },
      {
        type: "p",
        text: "The numbers shift by practice area and average case value — but the direction is always the same. Understanding the [full cost of an AI receptionist](/blog/how-much-does-an-ai-receptionist-cost) becomes straightforward when set against numbers like these.",
      },
      { type: "h2", text: "What AI intake looks like for a law firm" },
      {
        type: "p",
        text: "An [AI receptionist for law firms](/ai-receptionist/law-firm) handles the first contact with every potential client — 24/7, consistently, without the variable quality of whoever happens to answer the phone that day.",
      },
      {
        type: "p",
        text: "On a typical intake call, Esmi:",
      },
      {
        type: "ul",
        items: [
          "Answers, greets the caller professionally, and identifies the nature of the matter",
          "Asks qualifying questions: practice area, urgency, brief description of the situation",
          "Books a consultation on the attorney's calendar, or escalates urgent matters to the on-call attorney on the same call",
          "Sends a full call summary to the intake coordinator or attorney before the consultation",
        ],
      },
      {
        type: "p",
        text: "The result is a consistent intake process that runs at any hour, at any call volume, without pulling attorneys or paralegals off billable work.",
      },
      { type: "h2", text: "What to look for in an AI receptionist for legal" },
      {
        type: "p",
        text: "Not every AI receptionist is built for the specific requirements of legal intake. When evaluating options:",
      },
      {
        type: "ul",
        items: [
          "**24/7 intake** — not extended hours, but genuinely around the clock including weekends",
          "**Escalation for urgent matters** — arrests, accidents, and time-sensitive situations need immediate routing, not a next-morning callback",
          "**Configurable by practice area** — a personal injury firm and a real estate law firm need different intake flows",
          "**Minimum data collection** — collect what's needed to qualify and schedule; leave detailed case information for the consultation",
          "**Bilingual capability** — if any portion of your client base speaks Spanish, this is non-negotiable",
        ],
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "The math on AI intake for law firms is straightforward: if you're missing more than one potential client call per month, the cost of an AI receptionist is covered. Everything after that is recovered revenue.",
      },
      {
        type: "p",
        text: "[Try Esmi live](/try-esmi) to hear what intake sounds like for a law firm, or [book a demo](/book) and we'll walk you through a configuration specific to your practice area.",
      },
    ],
    related: [
      { label: "AI Receptionist for Law Firms", href: "/ai-receptionist/law-firm" },
      { label: "Best AI receptionist for small business", href: "/blog/best-ai-receptionist-for-small-business" },
      { label: "What is an AI receptionist?", href: "/blog/what-is-an-ai-receptionist" },
    ],
  },
];

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getSortedPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
