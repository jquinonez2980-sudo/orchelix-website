import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SW = fs.readFileSync(path.join(ROOT, "public", "sw.js"), "utf8");

test("service worker versions the cache and drops old versions on activate", () => {
  assert.match(SW, /CACHE_VERSION\s*=\s*["']esmi-dashboard-v1["']/);
  assert.match(SW, /self\.addEventListener\(\s*["']activate["']/);
  assert.match(SW, /caches\.delete/);
  assert.match(SW, /skipWaiting/);
  assert.match(SW, /clients\.claim/);
});

test("service worker never writes /api/platform responses into a cache", () => {
  assert.match(SW, /\/api\/platform/);
  assert.match(SW, /cache:\s*["']no-store["']/);

  const fetchStart = SW.indexOf('self.addEventListener("fetch"');
  assert.ok(fetchStart >= 0, "missing fetch handler");
  const fetchBlock = SW.slice(fetchStart, SW.indexOf("async function cacheFirst"));

  /* The platform / any-API branch must return fetch() and must not put. */
  assert.match(fetchBlock, /isPlatformApi\(url\)\s*\|\|\s*isAnyApi\(url\)/);
  assert.doesNotMatch(
    fetchBlock.slice(
      fetchBlock.indexOf("isPlatformApi"),
      fetchBlock.indexOf("isHashedNextAsset"),
    ),
    /cache\.put|cache\.match|caches\.open/,
  );

  /* Navigations are network-first and do not cache the live document. */
  const nav = fetchBlock.slice(fetchBlock.indexOf("isNavigation"));
  assert.doesNotMatch(nav, /cache\.put/);
});

test("service worker handles push and notificationclick", () => {
  assert.match(SW, /self\.addEventListener\(\s*["']push["']/);
  assert.match(SW, /self\.addEventListener\(\s*["']notificationclick["']/);
  assert.match(SW, /showNotification/);
  assert.match(SW, /safeDashboardUrl/);
  assert.match(SW, /clients\.openWindow/);
});

test("the installed app carries the Esmi mark, not Orchelix's", () => {
  // The dashboard installs as Esmi. It previously inherited the marketing
  // site's helix icons, so a phone home screen showed the wrong brand.
  const manifest = JSON.parse(
    fs.readFileSync(path.join(ROOT, "public", "esmi-dashboard.webmanifest"), "utf8"),
  );
  assert.ok(manifest.icons.length > 0);
  for (const icon of manifest.icons) {
    assert.match(icon.src, /^\/esmi-app-/, `manifest icon ${icon.src} is not an Esmi icon`);
    assert.ok(
      fs.existsSync(path.join(ROOT, "public", icon.src.replace(/^\//, ""))),
      `manifest references a missing file: ${icon.src}`,
    );
  }
  // Android crops maskable icons to a circle; one must be drawn for that.
  assert.ok(manifest.icons.some((i) => i.purpose === "maskable"));
  // The service worker's precache and notification icons too.
  assert.doesNotMatch(SW, /["']\/icon-\d+\.png["']/);
  assert.doesNotMatch(SW, /apple-touch-icon/);
});
