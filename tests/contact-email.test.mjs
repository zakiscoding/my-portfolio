import assert from "node:assert/strict";
import { test } from "node:test";
import { buildContactEmailDraft } from "../lib/contact-email.ts";

const message = {
  name: "A Visitor",
  email: "visitor+work@example.com",
  subject: "Backend role & project?",
  message: "Hello!\nCan we talk about C++ & APIs?",
};

test("builds an email draft without sending or losing special characters", () => {
  const url = new URL(buildContactEmailDraft("owner@example.com", message));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "owner@example.com");
  assert.equal(url.searchParams.get("subject"), message.subject);
  assert.equal(
    url.searchParams.get("body"),
    `From: ${message.name} <${message.email}>\n\n${message.message}`,
  );
  assert.equal(url.searchParams.get("bcc"), null);
});

test("keeps a multiline subject on one line", () => {
  const url = new URL(
    buildContactEmailDraft("owner@example.com", {
      ...message,
      subject: "Project\r\nBcc: unexpected@example.com",
    }),
  );
  assert.equal(
    url.searchParams.get("subject"),
    "Project Bcc: unexpected@example.com",
  );
  assert.equal(url.searchParams.get("bcc"), null);
});
