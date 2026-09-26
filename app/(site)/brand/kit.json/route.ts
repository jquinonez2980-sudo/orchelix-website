/* /brand/kit.json — the brand kit as data, for bots and tools that design
   posts. Same list as the /brand page (kit.ts), with absolute URLs. */

import { COLOURS, GRADIENTS, GROUPS, RULES, SITE, TYPE, url } from "../kit";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      brand: "Orchelix AI Consulting",
      page: `${SITE}/brand`,
      updated: "2026-09-26",
      how_to_choose:
        "Light background → a gradient or blue file with on=light. Dark background → a night file (on=dark). Photo or coloured background → white. Square post or story → stacked. Profile photo → avatar.",
      logos: GROUPS.flatMap((g) =>
        g.assets.map((a) => ({ group: g.id, ...a, url: url(a.file) })),
      ),
      colours: COLOURS,
      gradients: GRADIENTS,
      type: TYPE,
      rules: RULES,
    },
    { headers: { "Cache-Control": "public, max-age=3600", "Access-Control-Allow-Origin": "*" } },
  );
}
