import assert from "node:assert/strict";
import { test } from "node:test";
import {
  safeDashboardUrl,
  safeNotificationText,
  urlBase64ToUint8Array,
} from "./pushSafe.ts";

test("urlBase64ToUint8Array decodes a padded-less VAPID key", () => {
  /* "hello" in base64url */
  const bytes = urlBase64ToUint8Array("aGVsbG8");
  assert.equal(Buffer.from(bytes).toString("utf8"), "hello");
});

test("safeDashboardUrl only allows /dashboard paths", () => {
  assert.equal(safeDashboardUrl("/dashboard"), "/dashboard");
  assert.equal(safeDashboardUrl("/dashboard/leads"), "/dashboard/leads");
  assert.equal(safeDashboardUrl("/dashboard/leads?x=1"), "/dashboard/leads?x=1");
  assert.equal(safeDashboardUrl("https://evil.example/dashboard"), "/dashboard");
  assert.equal(safeDashboardUrl("//evil.example"), "/dashboard");
  assert.equal(safeDashboardUrl("/sign-in"), "/dashboard");
  assert.equal(safeDashboardUrl("javascript:alert(1)"), "/dashboard");
  assert.equal(safeDashboardUrl(null), "/dashboard");
});

test("safeNotificationText strips controls and does not keep HTML as structure", () => {
  assert.equal(safeNotificationText("Hot lead", "Esmi"), "Hot lead");
  assert.equal(safeNotificationText("<b>x</b>", "Esmi"), "<b>x</b>");
  assert.equal(safeNotificationText("a\u0000b\n c", "Esmi"), "ab c");
  assert.equal(safeNotificationText("", "Esmi"), "Esmi");
  assert.equal(safeNotificationText("x".repeat(50), "Esmi", 8), "xxxxxxxx");
});
