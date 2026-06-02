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
        text: "**An AI receptionist is a virtual phone agent that answers your incoming calls automatically — greeting callers, answering questions, qualifying leads, and booking appointments — without a person picking up the phone.** It works 24/7 and hands off to your team when a call needs a human. Think of it as a front-desk employee that never sleeps, never takes a lunch break, and never misses a ring.",
      },
      { type: "h2", text: "How does an AI receptionist work?" },
      {
        type: "p",
        text: "A modern AI receptionist combines natural-sounding voice, an understanding of your business, and connections to your calendar and CRM. A typical call goes like this:",
      },
      {
        type: "ul",
        items: [
          "**It answers instantly** — on the first ring, any hour of the day.",
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
        text: "An **answering service** is best when you mainly need a friendly human to take messages and route calls. An **AI receptionist** is best when you want the call *resolved* — questions answered, leads qualified, and appointments booked — instantly, around the clock, without a callback.",
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
          "**Speed to answer:** AI answers on the first ring, every time. Answering services depend on operator availability.",
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
        text: "A full-time receptionist in the US typically costs **$3,000–$4,500+ per month** once you include salary, benefits, and overhead — and they work one shift, not 24/7. A traditional answering service is cheaper but usually just takes messages, leaving you to call people back. An AI receptionist sits in between on price while doing more of the actual work: it answers instantly, qualifies the caller, and [books the appointment](/ai-receptionist) on the same call.",
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
