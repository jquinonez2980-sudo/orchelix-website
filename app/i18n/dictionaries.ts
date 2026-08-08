import "server-only";
import type { Locale } from "./config";
import type { Messages } from "./messages/en";

/* Catalogues are loaded per-request on the server and never reach the client
   bundle, so adding languages costs nothing in shipped JavaScript. */
const dictionaries = {
  en: () => import("./messages/en").then((m) => m.default),
  es: () => import("./messages/es").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Messages>>;

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]();
}
