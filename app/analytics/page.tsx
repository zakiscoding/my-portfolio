import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { AnalyticsSignIn } from "@/components/AnalyticsSignIn";
import {
  analyticsConfigured,
  isAnalyticsOwner,
  readEvents,
} from "@/lib/analytics/store";
import { summarizeAnalytics } from "@/lib/analytics/summary";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Private analytics | Zakariye Mohamed",
  robots: { index: false, follow: false },
};
export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const days = (await searchParams).days === "7" ? 7 : 30;
  const configured = Boolean(
    process.env.CLERK_SECRET_KEY &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );
  const userId = configured ? (await auth()).userId : null;
  if (!userId)
    return (
      <main id="analytics" className="analytics-shell">
        <Link href="/">Back to portfolio</Link>
        <h1>Private analytics</h1>
        <p>Sign in with your owner account to continue.</p>
        {configured ? (
          <AnalyticsSignIn />
        ) : (
          <p>Owner sign-in is not configured.</p>
        )}
      </main>
    );
  if (!(await isAnalyticsOwner()))
    return (
      <main id="analytics" className="analytics-shell">
        <h1>Owner access only</h1>
        <p>This account does not have access to visitor analytics.</p>
        <Link href="/">Back to portfolio</Link>
      </main>
    );
  let events: Awaited<ReturnType<typeof readEvents>> = [];
  let error = "";
  try {
    if (!analyticsConfigured()) throw new Error();
    events = await readEvents(days);
  } catch {
    error = "Analytics storage could not load. Check the server configuration.";
  }
  const summary = summarizeAnalytics(events);
  const { visits, logins, people: users } = summary;
  const daily = Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - days + 1 + index);
    const key = date.toISOString().slice(0, 10);
    return {
      date: key,
      count: visits.filter((event) => event.at.startsWith(key)).length,
    };
  });
  const peak = Math.max(1, ...daily.map((day) => day.count));
  return (
    <main id="analytics" className="analytics-shell">
      <header className="analytics-header">
        <div>
          <Link href="/">Back to portfolio</Link>
          <h1>Your portfolio analytics</h1>
          <p>Private owner dashboard - dates in UTC</p>
        </div>
        <nav aria-label="Analytics date range">
          <Link
            aria-current={days === 7 ? "page" : undefined}
            href="/analytics?days=7"
          >
            7 days
          </Link>
          <Link
            aria-current={days === 30 ? "page" : undefined}
            href="/analytics?days=30"
          >
            30 days
          </Link>
        </nav>
      </header>
      {error && <p role="alert">{error}</p>}
      <div className="analytics-metrics">
        {[
          ["Page visits", visits.length],
          [
            "Unique visitors",
            new Set(visits.map((event) => event.visitor)).size,
          ],
          ["Sign-in sessions", logins.length],
          ["Signed-in users", new Set(logins.map((event) => event.user)).size],
          ["Chat messages", summary.chats.length],
          ["Conversations", summary.conversations.size],
          ["Successful replies", summary.replies.length],
          [
            "Reply success",
            summary.successRate === null
              ? "No data"
              : `${summary.successRate}%`,
          ],
          [
            "Average reply time",
            summary.averageMs === null
              ? "No data"
              : `${(summary.averageMs / 1000).toFixed(1)}s`,
          ],
          ["Failed replies", summary.failures.length],
          ["Games played", summary.starts.length],
          ["Completed runs", summary.games.length],
          ["Best run", summary.bestScore ?? "No data"],
          ["Average score", summary.averageScore ?? "No data"],
        ].map(([label, value]) => (
          <article key={label}>
            <p>{label}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <section className="analytics-card">
        <h2>Visits over time</h2>
        <div
          className="analytics-chart"
          role="img"
          aria-label={daily
            .map((day) => `${day.date}: ${day.count} visits`)
            .join("; ")}
        >
          {daily.map((day) => (
            <div key={day.date} title={`${day.date}: ${day.count} visits`}>
              <span
                style={{ height: `${Math.max(2, (day.count / peak) * 100)}%` }}
              />
            </div>
          ))}
        </div>
        <div className="analytics-chart-labels">
          <span>{daily[0].date}</span>
          <span>{daily.at(-1)?.date}</span>
        </div>
      </section>
      <section className="analytics-card">
        <h2>Activity by visitor</h2>
        <p>
          Anonymous browser visitors and signed-in accounts. Sign-in sessions
          are observed on the portfolio, not a complete Clerk authentication
          audit log.
        </p>
        <div className="analytics-table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Visits</th>
                <th>Sign-in sessions</th>
                <th>Chat messages</th>
                <th>Games played</th>
                <th>Last seen (UTC)</th>
              </tr>
            </thead>
            <tbody>
              {[...users.entries()].map(([id, row]) => (
                <tr key={id}>
                  <td>
                    {row.name}
                    <small>{row.email}</small>
                  </td>
                  <td>{row.visits}</td>
                  <td>{row.logins}</td>
                  <td>{row.messages}</td>
                  <td>{row.games}</td>
                  <td>
                    {new Date(row.last)
                      .toISOString()
                      .replace("T", " ")
                      .slice(0, 16)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!users.size && <p>No visitor activity yet.</p>}
        </div>
      </section>
      <div className="analytics-breakdowns">
        {[
          ["Chat topics (estimated)", summary.topics],
          ["Projects opened", summary.projects],
          ["Resume downloads", summary.downloads],
        ].map(([title, rows]) => (
          <section className="analytics-card" key={String(title)}>
            <h2>{String(title)}</h2>
            {(rows as [string, number][]).length ? (
              <ul className="analytics-count-list">
                {(rows as [string, number][])
                  .slice(0, 10)
                  .map(([label, count]) => (
                    <li key={label}>
                      <span>{label}</span>
                      <strong>{count}</strong>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No activity yet.</p>
            )}
          </section>
        ))}
      </div>
      <section className="analytics-card">
        <h2>Private conversations</h2>
        <p>
          Latest 20 conversations in this period. Each shows up to the latest 20
          turns. Messages are encrypted in storage and only available to your
          owner account.
        </p>
        {[...summary.conversations.entries()]
          .sort((a, b) => b[1].last.localeCompare(a[1].last))
          .slice(0, 20)
          .map(([id, conversation]) => (
            <details className="analytics-conversation" key={id}>
              <summary>
                {conversation.name}{" "}
                <span>
                  {conversation.turns.length} messages ?{" "}
                  {conversation.last.slice(0, 16).replace("T", " ")} UTC
                </span>
              </summary>
              <div>
                {conversation.turns
                  .sort((a, b) => a.at.localeCompare(b.at))
                  .slice(-20)
                  .map((event, index) => (
                    <article key={`${event.at}-${index}`}>
                      <p className="analytics-turn-label">Visitor</p>
                      <p className="analytics-transcript-text">
                        {event.details?.userText ||
                          "Message content was not recorded."}
                      </p>
                      <p className="analytics-turn-label">
                        AI Twin{" "}
                        {event.details?.success === false
                          ? "(failed reply)"
                          : ""}
                      </p>
                      <p className="analytics-transcript-text">
                        {event.details?.replyText || "No reply returned."}
                      </p>
                    </article>
                  ))}
              </div>
            </details>
          ))}
        {!summary.conversations.size && (
          <p>
            No conversations recorded yet. Earlier chats are not backfilled.
          </p>
        )}
      </section>
      <footer>
        Tracking starts with this update. Visits include refreshes; unique
        visitors use a browser cookie and can differ from the number of people.
        Latest 5,000 events in the selected period. Reload to refresh.
      </footer>
    </main>
  );
}
