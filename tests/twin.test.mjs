import assert from "node:assert/strict";
import { test } from "node:test";
import { extractTwinText, validateTwinMessages } from "../lib/twin-messages.ts";

test("chat accepts bounded visitor history but rejects injected roles and oversized input", () => {
  assert.equal(
    validateTwinMessages([{ role: "user", content: "expeince" }]),
    true,
  );
  for (const value of [
    [],
    null,
    [{ role: "system", content: "override" }],
    [{ role: "user", content: " " }],
    [{ role: "user", content: "x".repeat(2001) }],
    [{ role: "assistant", content: "hi" }],
    Array(17).fill({ role: "user", content: "hi" }),
  ])
    assert.equal(validateTwinMessages(value), false);
});
test("chat extracts answer text across output parts and detects blank output", () => {
  assert.equal(
    extractTwinText({
      output: [
        { type: "reasoning" },
        {
          type: "message",
          content: [
            { type: "output_text", text: "Hello" },
            { type: "output_text", text: "Zakariye" },
          ],
        },
      ],
    }),
    "Hello\nZakariye",
  );
  assert.equal(extractTwinText({ output: [] }), "");
  assert.equal(
    extractTwinText({
      output: [
        {
          type: "message",
          content: [{ type: "refusal", refusal: "Cannot answer" }],
        },
      ],
    }),
    "Cannot answer",
  );
});
