import assert from "node:assert/strict";
import { test } from "node:test";
import { matchTwinSources } from "../lib/twin-sources.ts";

const catalog = [
  {
    label: "Redis",
    href: "https://github.com/example/redis",
    terms: ["Redis clone"],
  },
  { label: "IBM", href: "/#experience-ibm", terms: ["IBM"] },
];
test("source links match answer topics, not arbitrary model URLs", () => {
  assert.deepEqual(
    matchTwinSources("A Redis-clone in C; IBM experience.", catalog).map(
      (x) => x.label,
    ),
    ["Redis", "IBM"],
  );
  assert.deepEqual(
    matchTwinSources("hello https://untrusted.example", catalog),
    [],
  );
  assert.deepEqual(
    matchTwinSources("Not a redis cloned sample or IBMish word", catalog),
    [],
  );
});
test("source links deduplicate destinations and limit visual clutter", () => {
  const entries = Array.from({ length: 7 }, (_, i) => ({
    label: String(i),
    href: i < 2 ? "/#same" : `/#${i}`,
    terms: ["topic"],
  }));
  const result = matchTwinSources("topic", entries);
  assert.equal(result.length, 4);
  assert.equal(new Set(result.map((x) => x.href)).size, 4);
});
