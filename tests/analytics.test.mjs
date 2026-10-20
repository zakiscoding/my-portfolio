import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { test } from "node:test";
import {
  openAnalytics,
  sealAnalytics,
  verifiedAnalyticsOwner,
} from "../lib/analytics/crypto.ts";

test("analytics encrypts visitor details and rejects altered payloads", () => {
  const key = randomBytes(32),
    event = { email: "visitor@example.com", kind: "visit", at: "2026-10-20" };
  const sealed = sealAnalytics(event, key);
  assert.ok(!JSON.stringify(sealed).includes(event.email));
  assert.deepEqual(openAnalytics(sealed, key), event);
  assert.notEqual(sealAnalytics(event, key).payload, sealed.payload);
  assert.throws(() => openAnalytics(sealed, randomBytes(32)));
  const payload = Buffer.from(sealed.payload, "base64");
  payload[0] ^= 1;
  assert.throws(() =>
    openAnalytics({ ...sealed, payload: payload.toString("base64") }, key),
  );
});
test("analytics owner access requires an exact verified address", () => {
  const allowed = "owner@example.com";
  assert.equal(
    verifiedAnalyticsOwner(
      [
        {
          emailAddress: "OWNER@example.com",
          verification: { status: "verified" },
        },
      ],
      allowed,
    ),
    true,
  );
  for (const emails of [
    [],
    [{ emailAddress: allowed, verification: { status: "unverified" } }],
    [
      {
        emailAddress: "other@example.com",
        verification: { status: "verified" },
      },
    ],
    [{ emailAddress: allowed }],
  ])
    assert.equal(verifiedAnalyticsOwner(emails, allowed), false);
});
