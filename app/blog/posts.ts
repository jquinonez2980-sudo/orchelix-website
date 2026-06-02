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
      { label: "AI Receptionist — how Esmi works", href: "/ai-receptionist" },
      { label: "Pricing", href: "/pricing" },
      { label: "Try Esmi live", href: "/try-esmi" },
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
