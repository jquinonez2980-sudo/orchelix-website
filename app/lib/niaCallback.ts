/* "Have Nia call me" — turns a /book submission into a lead for Nia, Orchelix's
   outbound AI caller (ai-receptionist repo, closer/ package).

   Pure module: no Next.js imports, so `node --test` can load it directly.

   The consent text below is what the visitor sees next to the checkbox AND
   what is stored with the lead. Nia's dial gate (closer/compliance.py,
   form_consent_ok) only accepts a form_ai_call lead whose stored text contains
   "orchelix may call", the whole word "ai", and "consent is not required".
   Change the wording and the gate blocks every lead from this form — the test
   next to this file checks the same three rules.

   Spanish (/es/book) has its own text, stored as shown. The gate's Spanish
   rules: "orchelix puede llamar", the whole word "ia" (or "inteligencia
   artificial"), and "el consentimiento no es requisito". It must match
   FORM_AI_CALL_CONSENT_TEXT_ES in closer/compliance.py. */

export const NIA_CONSENT_TEXT =
  "I agree that Orchelix may call and text me at this number about Esmi, " +
  "including with an AI-generated voice. Consent is not required to buy. " +
  "I can opt out any time.";

export const NIA_CONSENT_TEXT_ES =
  "Acepto que Orchelix puede llamarme y enviarme mensajes de texto a este " +
  "número sobre Esmi, incluso con una voz generada por inteligencia artificial " +
  "(IA). El consentimiento no es requisito para comprar. Puedo darme de baja " +
  "en cualquier momento.";

export type NiaLanguage = "en" | "es";

/* Anything but an explicit "es" is English. The server picks the consent text
   from the language; the browser never supplies it. */
export function niaLanguage(raw: unknown): NiaLanguage {
  return raw === "es" ? "es" : "en";
}

export function consentTextFor(language: NiaLanguage): string {
  return language === "es" ? NIA_CONSENT_TEXT_ES : NIA_CONSENT_TEXT;
}

/* The two markets Nia calls in v1. Anything else is not queued. */
const ONTARIO = new Set([
  "226", "249", "289", "343", "365", "382", "416", "437", "519", "548",
  "613", "647", "683", "705", "742", "753", "807", "905", "942",
]);
const SOUTH_FLORIDA = new Set(["305", "786", "645", "954", "754", "561", "728"]);

export type Market = "ontario" | "south_florida";
export type NiaIndustry = "hvac" | "plumbing" | "contractor" | "medspa" | "other";

export function normalizePhone(raw: unknown): string | null {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  if (!/[2-9]/.test(digits[0]) || !/[2-9]/.test(digits[3])) return null;
  return `+1${digits}`;
}

export function marketFor(e164: string): Market | null {
  const area = e164.slice(2, 5);
  if (ONTARIO.has(area)) return "ontario";
  if (SOUTH_FLORIDA.has(area)) return "south_florida";
  return null;
}

/* The /book form's industry labels are Orchelix's, not Nia's. Only the one
   that maps cleanly is mapped; the rest go in as "other" and the label rides
   along in the notes. */
export function industryFor(label: unknown): NiaIndustry {
  const s = String(label ?? "").toLowerCase();
  if (s.includes("hvac")) return "hvac";
  if (s.includes("plumb")) return "plumbing";
  if (s.includes("construction") || s.includes("contract")) return "contractor";
  if (s.includes("medspa") || s.includes("med spa")) return "medspa";
  return "other";
}

export type NiaLeadInput = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  industry?: unknown;
  consent?: unknown;
  language?: unknown;
};

export type NiaLead = {
  phone: string;
  name: string;
  business_name: string | null;
  industry: NiaIndustry;
  market: Market;
  language: NiaLanguage;
  source: "form";
  consent_basis: "form_ai_call";
  consent_at: string;
  consent_text: string;
  notes: string;
};

export type BuildResult =
  | { ok: true; lead: NiaLead }
  | { ok: false; reason: "no_consent" | "missing_name" | "invalid_phone" | "outside_markets" };

export function buildNiaLead(input: NiaLeadInput, now: Date = new Date()): BuildResult {
  // Only a literal `true` counts: a ticked box, never a truthy string.
  if (input.consent !== true) return { ok: false, reason: "no_consent" };
  const name = String(input.name ?? "").trim().slice(0, 120);
  if (!name) return { ok: false, reason: "missing_name" };
  const phone = normalizePhone(input.phone);
  if (!phone) return { ok: false, reason: "invalid_phone" };
  const market = marketFor(phone);
  if (!market) return { ok: false, reason: "outside_markets" };
  const company = String(input.company ?? "").trim().slice(0, 160);
  const industryLabel = String(input.industry ?? "").trim().slice(0, 80);
  const language = niaLanguage(input.language);
  return {
    ok: true,
    lead: {
      phone,
      name,
      business_name: company || null,
      industry: industryFor(industryLabel),
      market,
      language,
      source: "form",
      consent_basis: "form_ai_call",
      consent_at: now.toISOString(),
      consent_text: consentTextFor(language),
      notes: [
        language === "es" ? "orchelix.com /es/book — Have Nia call me (ES)" : "orchelix.com /book — Have Nia call me",
        industryLabel && `Industry: ${industryLabel}`,
      ]
        .filter(Boolean)
        .join(" · "),
    },
  };
}
