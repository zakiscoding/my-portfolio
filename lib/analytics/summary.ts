import type { AnalyticsEvent } from "./store";
export function summarizeAnalytics(events: AnalyticsEvent[]) {
  const ofKind = (kind: AnalyticsEvent["kind"]) =>
    events.filter((event) => event.kind === kind);
  const visits = ofKind("visit"),
    logins = ofKind("sign_in"),
    chats = ofKind("chat_message"),
    starts = ofKind("game_start"),
    games = ofKind("game_end");
  const replies = chats.filter((event) => event.details?.success === true),
    failures = chats.filter((event) => event.details?.success === false);
  const times = replies
    .map((event) => event.details?.durationMs)
    .filter(
      (time): time is number =>
        typeof time === "number" && Number.isFinite(time) && time >= 0,
    );
  const scores = games
    .map((event) => event.details?.score)
    .filter(
      (score): score is number =>
        typeof score === "number" && Number.isFinite(score) && score >= 0,
    );
  const people = new Map<
    string,
    {
      name: string;
      email: string;
      visits: number;
      logins: number;
      messages: number;
      games: number;
      last: string;
    }
  >();
  for (const event of events) {
    const id = event.user || event.visitor;
    const row = people.get(id) || {
      name: event.name || `Visitor #${event.visitor.slice(0, 6)}`,
      email: event.email || "",
      visits: 0,
      logins: 0,
      messages: 0,
      games: 0,
      last: event.at,
    };
    if (event.kind === "visit") row.visits++;
    if (event.kind === "sign_in") row.logins++;
    if (event.kind === "chat_message") row.messages++;
    if (event.kind === "game_start") row.games++;
    if (event.at > row.last) row.last = event.at;
    people.set(id, row);
  }
  const conversations = new Map<
    string,
    { name: string; last: string; turns: AnalyticsEvent[] }
  >();
  for (const event of chats) {
    if (!event.details?.conversationId) continue;
    const id = `${event.user || event.visitor}:${event.details.conversationId}`;
    const conversation = conversations.get(id) || {
      name: event.name || "Signed-in visitor",
      last: event.at,
      turns: [],
    };
    conversation.turns.push(event);
    if (event.at > conversation.last) conversation.last = event.at;
    conversations.set(id, conversation);
  }
  const counts = (items: AnalyticsEvent[], field: "topic" | "target") => {
    const map = new Map<string, number>();
    for (const event of items) {
      const value = event.details?.[field] || "Other";
      map.set(value, (map.get(value) || 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  };
  return {
    visits,
    logins,
    chats,
    starts,
    games,
    replies,
    failures,
    people,
    conversations,
    topics: counts(chats, "topic"),
    projects: counts(ofKind("project_open"), "target"),
    downloads: counts(ofKind("resume_download"), "target"),
    successRate: chats.length
      ? Math.round((replies.length / chats.length) * 100)
      : null,
    averageMs: times.length
      ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
      : null,
    bestScore: scores.length ? Math.max(...scores) : null,
    averageScore: scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null,
  };
}
