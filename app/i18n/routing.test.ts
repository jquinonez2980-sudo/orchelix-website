/* The locale lists and the proxy matcher have to agree.
 *
 * English is served unprefixed, so `proxy.ts` rewrites `/pricing` to
 * `/en/pricing` internally. A Next middleware matcher is STATIC — it cannot
 * read LOCALIZED_PATHS at runtime — so the same paths are written out twice, in
 * two files, by hand.
 *
 * That is exactly how /nia shipped as a 404: it was added to the config lists
 * and not to the matcher, so the request never reached the rewrite. /es/nia
 * worked the whole time, which made it look like a Spanish-only problem.
 *
 * These tests fail in CI instead of in production the next time they drift.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { LOCALIZED_PATHS, TRANSLATED_PATHS } from "./config.ts";

const ROOT = path.resolve(import.meta.dirname, "..", "..");

/** The quoted entries of `matcher: [ ... ]` in proxy.ts. */
function matcherPaths(): string[] {
  const src = readFileSync(path.join(ROOT, "proxy.ts"), "utf8");
  const start = src.indexOf("matcher:");
  assert.ok(start > -1, "proxy.ts has no matcher — did the export change shape?");
  const open = src.indexOf("[", start);
  let depth = 0;
  let i = open;
  for (; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]" && --depth === 0) break;
  }
  const body = src.slice(open, i);
  return [...body.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
}

test("every localized path is in the proxy matcher", () => {
  const matcher = new Set(matcherPaths());
  const missing = LOCALIZED_PATHS.filter((p) => !matcher.has(p));
  assert.deepEqual(
    missing,
    [],
    `These paths are in LOCALIZED_PATHS but not in proxy.ts's matcher, so the ` +
      `unprefixed English URL will 404: ${missing.join(", ")}`,
  );
});

test("every translated path is also a localized path", () => {
  const localized = new Set<string>(LOCALIZED_PATHS);
  const missing = [...TRANSLATED_PATHS].filter((p) => !localized.has(p));
  assert.deepEqual(
    missing,
    [],
    `These paths claim a Spanish translation but are not in LOCALIZED_PATHS, ` +
      `so the language switcher points at a URL the router does not serve: ${missing.join(", ")}`,
  );
});

test("the matcher parser actually found the real list", () => {
  // A parser that silently returned [] would make the checks above vacuous.
  const matcher = matcherPaths();
  assert.ok(matcher.length > 5, `only found ${matcher.length} matcher entries`);
  for (const anchor of ["/", "/pricing", "/book"]) {
    assert.ok(matcher.includes(anchor), `expected ${anchor} among the matcher entries`);
  }
});

test("/nia specifically is covered, in both lists and the matcher", () => {
  // The regression this file exists for.
  const matcher = new Set(matcherPaths());
  assert.ok(LOCALIZED_PATHS.includes("/nia"), "/nia missing from LOCALIZED_PATHS");
  assert.ok(TRANSLATED_PATHS.has("/nia"), "/nia missing from TRANSLATED_PATHS");
  assert.ok(matcher.has("/nia"), "/nia missing from the proxy matcher — /nia will 404");
});
