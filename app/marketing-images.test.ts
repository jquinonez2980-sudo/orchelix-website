import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const MIN_BYTES = 200;

const MARKETING_ROOTS = [
  path.join(ROOT, "app", "[locale]"),
  path.join(ROOT, "app", "components"),
  path.join(ROOT, "app", "shell.tsx"),
];

const IMAGE_EXT = "png|jpe?g|webp|svg|gif|ico";
const STATIC_IMPORT = new RegExp(
  String.raw`from\s+["']@/public/([^"']+\.(?:${IMAGE_EXT}))["']`,
  "gi",
);
const LOCAL_SRC = new RegExp(
  String.raw`(?:src|url)\s*[:=]\s*["'](/[^"'?]+\.(?:${IMAGE_EXT}))["']`,
  "gi",
);
const QUOTED_PUBLIC = new RegExp(
  String.raw`["'](/[A-Za-z0-9._/-]+\.(?:${IMAGE_EXT}))["']`,
  "gi",
);
const SITE_URL_PATH = new RegExp(
  String.raw`SITE_URL\}(/[A-Za-z0-9._/-]+\.(?:${IMAGE_EXT}))`,
  "gi",
);

function walk(entry: string, acc: string[] = []): string[] {
  const stat = fs.statSync(entry);
  if (stat.isFile()) {
    if (/\.(tsx|ts)$/.test(entry) && !entry.endsWith(".test.ts")) acc.push(entry);
    return acc;
  }
  for (const name of fs.readdirSync(entry)) {
    if (name === "node_modules" || name === ".next") continue;
    walk(path.join(entry, name), acc);
  }
  return acc;
}

function collectRefs(): { file: string; ref: string; disk: string }[] {
  const files = MARKETING_ROOTS.flatMap((root) => walk(root));
  const seen = new Map<string, { file: string; ref: string; disk: string }>();

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const found = new Set<string>();

    for (const re of [STATIC_IMPORT, LOCAL_SRC, QUOTED_PUBLIC, SITE_URL_PATH]) {
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(source))) {
        const raw = m[1].replace(/^\/+/, "");
        if (raw.startsWith("http")) continue;
        found.add(raw);
      }
    }

    for (const ref of found) {
      if (!seen.has(ref)) {
        const disk = resolveOnDisk(ref);
        seen.set(ref, { file, ref: `/${ref}`, disk: disk ?? path.join(PUBLIC_DIR, ref) });
      }
    }
  }

  return [...seen.values()];
}

/** Marketing stills live in public/. App-router metadata files (favicon) live in app/. */
function resolveOnDisk(ref: string): string | null {
  const candidates = [path.join(PUBLIC_DIR, ref), path.join(ROOT, "app", ref)];
  return candidates.find((p) => fs.existsSync(p)) ?? null;
}

test("marketing pages reference at least one local image", () => {
  const refs = collectRefs();
  assert.ok(refs.length >= 8, `expected several image refs, got ${refs.length}`);
});

test("every local image src on marketing pages exists on disk with non-trivial size", () => {
  const refs = collectRefs();
  const missing: string[] = [];
  const tiny: string[] = [];

  for (const { ref, disk } of refs) {
    if (!fs.existsSync(disk)) {
      missing.push(`${ref} → ${disk}`);
      continue;
    }
    const size = fs.statSync(disk).size;
    if (size < MIN_BYTES) tiny.push(`${ref} (${size} bytes)`);
  }

  assert.deepEqual(missing, [], `missing image files:\n${missing.join("\n")}`);
  assert.deepEqual(tiny, [], `stub-sized image files:\n${tiny.join("\n")}`);
});
