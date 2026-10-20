import assert from "node:assert/strict";
import { test } from "node:test";
import { validateContact } from "../lib/contact-validation.ts";

function validForm() {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    name: "  Visitor  ",
    email: "visitor@example.com",
    subject: "Project inquiry",
    message: "I'd like to discuss a backend project.",
  }))
    form.set(key, value);
  return form;
}

test("accepts and trims a valid contact message", () => {
  const result = validateContact(validForm());
  assert.equal(result.values.name, "Visitor");
  assert.equal(result.values.email, "visitor@example.com");
});

test("rejects missing and whitespace-only required fields", () => {
  for (const field of ["name", "email", "subject", "message"]) {
    const form = validForm();
    form.delete(field);
    assert.ok(validateContact(form).error);
    form.set(field, "   ");
    assert.ok(validateContact(form).error);
  }
});

test("rejects malformed addresses", () => {
  for (const email of ["no-at-sign", "a@", "a b@example.com", "a@example"]) {
    const form = validForm();
    form.set("email", email);
    assert.ok(validateContact(form).error);
  }
});

test("rejects oversized payloads", () => {
  const form = validForm();
  form.set("message", "a".repeat(5001));
  assert.ok(validateContact(form).error);
});

test("rejects file uploads in text fields", () => {
  const form = validForm();
  form.set("name", new Blob(["unexpected file"]), "name.txt");
  assert.ok(validateContact(form).error);
});
