import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildContactNotification,
  contactNotificationConfig,
  sendContactNotification,
} from "../lib/contact-notification.ts";

const values = {
  name: "A Visitor",
  email: "visitor+work@example.com",
  subject: "Backend role\r\nBcc: someone@example.com",
  message: "Hello!\n<b>Can we talk?</b>",
};
const env = {
  RESEND_API_KEY: "re_test",
  CONTACT_NOTIFY_EMAIL: "owner@example.com",
};

test("needs both an API key and a recipient", () => {
  assert.equal(contactNotificationConfig({}), null);
  assert.equal(contactNotificationConfig({ RESEND_API_KEY: "re_test" }), null);
  assert.equal(
    contactNotificationConfig({ CONTACT_NOTIFY_EMAIL: "a@b.co" }),
    null,
  );
  assert.equal(
    contactNotificationConfig(env).from.includes("resend.dev"),
    true,
  );
  assert.equal(
    contactNotificationConfig({ ...env, CONTACT_FROM_EMAIL: "Me <me@x.dev>" })
      .from,
    "Me <me@x.dev>",
  );
});

test("builds a plain-text email that replies to the visitor", () => {
  const email = buildContactNotification(
    values,
    contactNotificationConfig(env),
  );
  assert.deepEqual(email.to, ["owner@example.com"]);
  assert.equal(email.reply_to, values.email);
  assert.equal(
    email.subject,
    "Portfolio message: Backend role Bcc: someone@example.com",
  );
  assert.equal(email.html, undefined);
  assert.match(email.text, /From: A Visitor <visitor\+work@example.com>/);
  assert.match(email.text, /<b>Can we talk\?<\/b>/);
});

test("sends to Resend with the API key and reports failures", async () => {
  let call;
  const ok = await sendContactNotification(values, env, async (url, init) => {
    call = { url, init };
    return new Response("{}", { status: 200 });
  });
  assert.deepEqual(ok, { sent: true });
  assert.equal(call.url, "https://api.resend.com/emails");
  assert.equal(call.init.headers.Authorization, "Bearer re_test");

  const rejected = await sendContactNotification(
    values,
    env,
    async () => new Response("{}", { status: 403 }),
  );
  assert.deepEqual(rejected, { sent: false, reason: "status-403" });

  const offline = await sendContactNotification(values, env, async () => {
    throw new Error("offline");
  });
  assert.deepEqual(offline, { sent: false, reason: "network" });

  assert.deepEqual(await sendContactNotification(values, {}), {
    sent: false,
    reason: "not-configured",
  });
});
