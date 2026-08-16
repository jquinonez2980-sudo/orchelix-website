/* Same night as the homepage register. Illustrative entries.
   Named operators are not invented here. */

export type Disposition = "BOOKED" | "ROUTED" | "ANSWERED" | "CLOSED";

export type NightEntry = {
  time: string;
  lang: "EN" | "ES";
  reason: string;
  disposition: Disposition;
  detail: string;
};

export const NIGHT_ENTRIES: NightEntry[] = [
  { time: "18:42", lang: "ES", reason: "Plantilla de encimera", disposition: "BOOKED", detail: "Jue 9:00" },
  { time: "19:07", lang: "EN", reason: "After-hours, no heat", disposition: "ROUTED", detail: "On-call tech" },
  { time: "19:51", lang: "ES", reason: "Seguimiento de cotización", disposition: "ANSWERED", detail: "Callback set" },
  { time: "20:26", lang: "EN", reason: "Reschedule - slab template", disposition: "BOOKED", detail: "Fri 11:15" },
  { time: "21:14", lang: "EN", reason: "New lead - kitchen remodel", disposition: "BOOKED", detail: "Tue 14:30" },
  { time: "21:58", lang: "ES", reason: "Horario y dirección", disposition: "ANSWERED", detail: "From knowledge base" },
  { time: "22:35", lang: "EN", reason: "Invoice question", disposition: "ROUTED", detail: "Accounts, 09:00" },
  { time: "23:36", lang: "ES", reason: "Estado del trabajo #4471", disposition: "ANSWERED", detail: "From knowledge base" },
  { time: "01:03", lang: "EN", reason: "Water leak - commercial", disposition: "ROUTED", detail: "On-call tech" },
  { time: "02:18", lang: "EN", reason: "Wrong number", disposition: "CLOSED", detail: "No action" },
];

export const FIRST_BOOKED = NIGHT_ENTRIES.findIndex((e) => e.disposition === "BOOKED");
