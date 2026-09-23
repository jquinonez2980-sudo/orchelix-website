import assert from "node:assert/strict";
import { test } from "node:test";
import {
  NIA_CONSENT_TEXT,
  NIA_CONSENT_TEXT_ES,
  buildNiaLead,
  industryFor,
  marketFor,
  normalizePhone,
} from "./niaCallback.ts";

/* Mirror of closer/compliance.py form_consent_ok. If this fails, Nia's gate
   would block every lead from the /book form. */
function gateAccepts(text: string): boolean {
  const t = text.toLowerCase().replace(/\s+/g, " ").trim();
  const en = t.includes("orchelix may call") && t.includes("consent is not required") && /\bai\b/.test(t);
  const es =
    t.includes("orchelix puede llamar") &&
    t.includes("el consentimiento no es requisito") &&
    (/\bia\b/.test(t) || t.includes("inteligencia artificial"));
  return en || es;
}

const NOW = new Date("2026-09-22T15:00:00Z");

test("the consent text passes Nia's form_ai_call gate", () => {
  assert.ok(gateAccepts(NIA_CONSENT_TEXT));
});

test("phones normalize to NANP E.164 or null", () => {
  assert.equal(normalizePhone("(416) 555-0123"), "+14165550123");
  assert.equal(normalizePhone("1-561-555-0199"), "+15615550199");
  assert.equal(normalizePhone("+1 647 555 0111"), "+16475550111");
  assert.equal(normalizePhone("555-0123"), null);
  assert.equal(normalizePhone("(116) 555-0123"), null);
  assert.equal(normalizePhone(""), null);
});

test("markets are Ontario and South Florida only", () => {
  assert.equal(marketFor("+14165550123"), "ontario");
  assert.equal(marketFor("+19055550123"), "ontario");
  assert.equal(marketFor("+17865550123"), "south_florida");
  assert.equal(marketFor("+12125550123"), null);
});

test("industry labels map conservatively", () => {
  assert.equal(industryFor("Field service & construction"), "contractor");
  assert.equal(industryFor("Healthcare & medical offices"), "other");
  assert.equal(industryFor(""), "other");
});

test("no ticked box, no lead", () => {
  for (const consent of [undefined, false, "true", "on", 1]) {
    const r = buildNiaLead({ name: "Ana", phone: "4165550123", consent }, NOW);
    assert.deepEqual(r, { ok: false, reason: "no_consent" });
  }
});

test("rejections name the reason", () => {
  assert.deepEqual(buildNiaLead({ name: " ", phone: "4165550123", consent: true }, NOW),
    { ok: false, reason: "missing_name" });
  assert.deepEqual(buildNiaLead({ name: "Ana", phone: "12", consent: true }, NOW),
    { ok: false, reason: "invalid_phone" });
  assert.deepEqual(buildNiaLead({ name: "Ana", phone: "2125550123", consent: true }, NOW),
    { ok: false, reason: "outside_markets" });
});

test("a ticked box builds a form_ai_call lead carrying the exact consent text", () => {
  const r = buildNiaLead(
    { name: " Ana Ruiz ", company: "Ruiz HVAC", phone: "(561) 555-0199",
      industry: "Field service & construction", consent: true },
    NOW,
  );
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.lead.phone, "+15615550199");
  assert.equal(r.lead.name, "Ana Ruiz");
  assert.equal(r.lead.business_name, "Ruiz HVAC");
  assert.equal(r.lead.market, "south_florida");
  assert.equal(r.lead.industry, "contractor");
  assert.equal(r.lead.consent_basis, "form_ai_call");
  assert.equal(r.lead.source, "form");
  assert.equal(r.lead.consent_text, NIA_CONSENT_TEXT);
  assert.equal(r.lead.consent_at, NOW.toISOString());
  assert.ok(gateAccepts(r.lead.consent_text));
});

test("the Spanish consent text passes the gate's Spanish rules", () => {
  assert.ok(gateAccepts(NIA_CONSENT_TEXT_ES));
});

test("language es stores the Spanish text and a Spanish lead; anything else is English", () => {
  const es = buildNiaLead({ name: "Ana", phone: "4165550123", consent: true, language: "es" }, NOW);
  assert.ok(es.ok);
  if (es.ok) {
    assert.equal(es.lead.language, "es");
    assert.equal(es.lead.consent_text, NIA_CONSENT_TEXT_ES);
  }
  for (const language of [undefined, "en", "ES", "fr", 1]) {
    const r = buildNiaLead({ name: "Ana", phone: "4165550123", consent: true, language }, NOW);
    assert.ok(r.ok);
    if (r.ok) {
      assert.equal(r.lead.language, "en");
      assert.equal(r.lead.consent_text, NIA_CONSENT_TEXT);
    }
  }
});
