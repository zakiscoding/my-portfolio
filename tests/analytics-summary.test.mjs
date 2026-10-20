import assert from "node:assert/strict";
import { test } from "node:test";
import { summarizeAnalytics } from "../lib/analytics/summary.ts";

const event = (kind, details = {}, user = "user-a") => ({
  kind,
  details,
  user,
  visitor: "visitor-a",
  name: "Visitor",
  email: "visitor@example.com",
  path: "/",
  at: "2026-10-20T10:00:00Z",
});
test("usage counts do not mistake chat and games for sign-ins", () => {
  const result = summarizeAnalytics([
    event("visit"),
    event("sign_in"),
    event("chat_message", {
      success: true,
      durationMs: 2000,
      topic: "Projects",
      conversationId: "thread",
      userText: "hello",
      replyText: "hi",
    }),
    event("chat_message", { success: false, conversationId: "thread" }),
    event("game_start"),
    event("game_end", { score: 42 }),
    event("resume_download", { target: "software.pdf" }),
    event("project_open", { target: "redis-clone" }),
  ]);
  assert.equal(result.logins.length, 1);
  assert.equal(result.chats.length, 2);
  assert.equal(result.successRate, 50);
  assert.equal(result.averageMs, 2000);
  assert.equal(result.starts.length, 1);
  assert.equal(result.games.length, 1);
  assert.equal(result.bestScore, 42);
  assert.equal(result.people.get("user-a").logins, 1);
  assert.equal(result.people.get("user-a").games, 1);
  assert.equal(result.conversations.size, 1);
  assert.deepEqual(result.downloads, [["software.pdf", 1]]);
});
test("conversations from different accounts never merge and empty metrics stay unknown", () => {
  assert.equal(
    summarizeAnalytics([
      event("chat_message", { conversationId: "shared" }, "a"),
      event("chat_message", { conversationId: "shared" }, "b"),
    ]).conversations.size,
    2,
  );
  const empty = summarizeAnalytics([]);
  assert.equal(empty.successRate, null);
  assert.equal(empty.averageMs, null);
  assert.equal(empty.bestScore, null);
});
