/* The public brand kit — one list read by /brand (for people) and
   /brand/kit.json (for bots and tools that make posts). Files live in
   public/brand/files/, copied from the master set in brand/. When a master
   changes, copy it over again; the names here are the public contract, so
   do not rename a file without keeping the old one. */

export const SITE = "https://www.orchelix.com";
export const FILES = "/brand/files";

export type Asset = {
  file: string;
  name: string;
  /** Which background it is drawn for. */
  on: "light" | "dark" | "colour" | "any";
  style: "solid" | "gradient" | "neutral";
  use: string;
  size: string;
};

export type Group = { id: string; title: string; note: string; assets: Asset[] };

export const GROUPS: Group[] = [
  {
    id: "logo",
    title: "Full logo (ring + name)",
    note: "The default for posts. Put it in a corner or the footer of a design, never stretched or recoloured.",
    assets: [
      { file: "orchelix-logo-gradient.png", name: "Logo · gradient", on: "light", style: "gradient", use: "Social posts, graphics, web — on white or light backgrounds", size: "2400×564" },
      { file: "orchelix-logo-night-gradient.png", name: "Logo · night gradient", on: "dark", style: "gradient", use: "Social posts on dark or navy backgrounds", size: "2400×564" },
      { file: "orchelix-logo-blue.png", name: "Logo · blue", on: "light", style: "solid", use: "Official: documents, print, email, anywhere a gradient won't reproduce", size: "2400×564" },
      { file: "orchelix-logo-night.png", name: "Logo · night", on: "dark", style: "solid", use: "Official on dark backgrounds", size: "2400×564" },
      { file: "orchelix-logo-white.png", name: "Logo · white", on: "colour", style: "neutral", use: "On blue, on gradients, or over photos", size: "2400×564" },
      { file: "orchelix-logo-ink.png", name: "Logo · ink", on: "light", style: "neutral", use: "One-colour black printing, or very busy light backgrounds", size: "2400×564" },
    ],
  },
  {
    id: "stacked",
    title: "Stacked logo",
    note: "Ring above the name. For square and portrait spaces: Instagram squares, stories, slides, signage.",
    assets: [
      { file: "orchelix-logo-stacked-gradient.png", name: "Stacked · gradient", on: "light", style: "gradient", use: "Square or vertical posts on light backgrounds", size: "1600×937" },
      { file: "orchelix-logo-stacked-night-gradient.png", name: "Stacked · night gradient", on: "dark", style: "gradient", use: "Square or vertical posts on dark backgrounds", size: "1600×937" },
      { file: "orchelix-logo-stacked-blue.png", name: "Stacked · blue", on: "light", style: "solid", use: "Official, light backgrounds", size: "1600×937" },
      { file: "orchelix-logo-stacked-night.png", name: "Stacked · night", on: "dark", style: "solid", use: "Official, dark backgrounds", size: "1600×937" },
      { file: "orchelix-logo-stacked-white.png", name: "Stacked · white", on: "colour", style: "neutral", use: "On blue, gradients, or photos", size: "1600×937" },
    ],
  },
  {
    id: "ring",
    title: "Ring only (the symbol)",
    note: "Only when the name is already on the post, or as a small signature mark.",
    assets: [
      { file: "orchelix-ring-gradient.png", name: "Ring · gradient", on: "light", style: "gradient", use: "Accent mark on light designs", size: "930×1021" },
      { file: "orchelix-ring-night-gradient.png", name: "Ring · night gradient", on: "dark", style: "gradient", use: "Accent mark on dark designs", size: "930×1021" },
      { file: "orchelix-ring-blue.png", name: "Ring · blue", on: "light", style: "solid", use: "Official symbol, light backgrounds", size: "930×1021" },
      { file: "orchelix-ring-night.png", name: "Ring · night", on: "dark", style: "solid", use: "Official symbol, dark backgrounds", size: "930×1021" },
      { file: "orchelix-ring-white.png", name: "Ring · white", on: "colour", style: "neutral", use: "On blue, gradients, or photos", size: "930×1021" },
      { file: "orchelix-ring-ink.png", name: "Ring · ink", on: "light", style: "neutral", use: "One-colour black", size: "930×1021" },
    ],
  },
  {
    id: "profile",
    title: "Profile pictures and icons",
    note: "Square images for profile photos. Platforms crop to a circle; the ring is centred for that.",
    assets: [
      { file: "orchelix-avatar-night.png", name: "Avatar · night", on: "any", style: "solid", use: "LinkedIn, X, Instagram, WhatsApp, Google Business profile photo", size: "800×800" },
      { file: "orchelix-avatar-light.png", name: "Avatar · light", on: "any", style: "solid", use: "Profile photo where a light image fits better", size: "800×800" },
      { file: "orchelix-app-icon.png", name: "App icon", on: "any", style: "gradient", use: "Gradient ring on night — app tiles, favicons, small square badges", size: "512×512" },
    ],
  },
  {
    id: "reference",
    title: "Reference",
    note: "Examples of the finished look, for matching style — not for pasting into posts as a logo.",
    assets: [
      { file: "orchelix-share-image.jpg", name: "Share image", on: "any", style: "gradient", use: "The link preview for orchelix.com — a model for post layout and type", size: "1280×720" },
      { file: "orchelix-brand-sheet.png", name: "Brand sheet", on: "any", style: "neutral", use: "Every version of the logo at a glance", size: "1400×1200" },
    ],
  },
  {
    id: "vector",
    title: "Vector files (SVG)",
    note: "Scale to any size without blur — for designers and print. Most social tools want the PNGs above.",
    assets: [
      { file: "orchelix-logo-gradient.svg", name: "Logo · gradient (SVG)", on: "light", style: "gradient", use: "Vector, light backgrounds", size: "vector" },
      { file: "orchelix-logo-night-gradient.svg", name: "Logo · night gradient (SVG)", on: "dark", style: "gradient", use: "Vector, dark backgrounds", size: "vector" },
      { file: "orchelix-logo-blue.svg", name: "Logo · blue (SVG)", on: "light", style: "solid", use: "Vector, official", size: "vector" },
      { file: "orchelix-ring-gradient.svg", name: "Ring · gradient (SVG)", on: "light", style: "gradient", use: "Vector symbol, light", size: "vector" },
      { file: "orchelix-ring-night-gradient.svg", name: "Ring · night gradient (SVG)", on: "dark", style: "gradient", use: "Vector symbol, dark", size: "vector" },
    ],
  },
];

export const COLOURS = [
  { name: "Orchelix blue", hex: "#2451E6", use: "The main brand colour: buttons, the solid logo, links" },
  { name: "Deep blue", hex: "#1E40AF", use: "Start of the gradient; depth and shadows" },
  { name: "Bright blue", hex: "#2563EB", use: "Middle of the gradient; glows" },
  { name: "Cyan", hex: "#22D3EE", use: "End of the gradient; highlights, one accent per design" },
  { name: "Night", hex: "#060A14", use: "Dark backgrounds (blue-black, not pure black)" },
  { name: "Night blue", hex: "#60A5FA", use: "The logo and links on dark backgrounds" },
  { name: "Paper", hex: "#F6F8FC", use: "Light backgrounds (cool white)" },
  { name: "Ink", hex: "#12141A", use: "Body text on light backgrounds" },
];

export const GRADIENTS = [
  { name: "Day gradient", css: "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #22D3EE 100%)", use: "On light backgrounds" },
  { name: "Night gradient", css: "linear-gradient(135deg, #3B82F6 0%, #22D3EE 55%, #A5F3FC 100%)", use: "On dark backgrounds" },
];

export const TYPE = [
  { role: "Headlines, labels, the logo name", family: "Archivo", setting: "Light (300), widest width, UPPERCASE, letter-spacing about 0.07em" },
  { role: "Body text", family: "Literata", setting: "Regular (400), normal case" },
];

export const RULES = [
  "Use the gradient logo on social and web; use the solid blue logo for print, email and documents.",
  "On dark or photo backgrounds use a night or white version — never the light version on dark.",
  "Never stretch, rotate, recolour, outline, add shadows or effects to, or redraw the logo. Only the ring carries colour; the name stays solid.",
  "Leave clear space around the logo at least the width of the ring's inner opening.",
  "Don't put the logo inside a box or circle — except the square avatar and app icon files, which are already made for that.",
  "Keep the ring at least 24px tall on screen; below that use the app icon.",
  "Say 'Orchelix AI Consulting' in full the first time in a post; Esmi is the AI receptionist product, Nia is the outbound caller.",
];

export const url = (file: string) => `${SITE}${FILES}/${file}`;
