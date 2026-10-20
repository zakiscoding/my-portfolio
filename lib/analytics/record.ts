import "server-only";
import { randomUUID } from "node:crypto";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import {
  type AnalyticsEvent,
  analyticsConfigured,
  analyticsId,
  storeEvent,
} from "./store";
export async function recordActivity(
  kind: AnalyticsEvent["kind"],
  details: AnalyticsEvent["details"],
  eventId?: string,
) {
  if (!analyticsConfigured()) return;
  try {
    const jar = await cookies();
    const visitor = jar.get("portfolio-visitor")?.value || randomUUID();
    const configured = Boolean(
      process.env.CLERK_SECRET_KEY &&
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    );
    const identity = configured ? await auth() : null;
    const user = identity?.userId ? await currentUser() : null;
    await storeEvent(
      {
        kind,
        visitor: analyticsId(visitor),
        user: identity?.userId ? analyticsId(identity.userId) : null,
        name: user?.fullName || user?.username || null,
        email: user?.primaryEmailAddress?.emailAddress || null,
        path: "/",
        at: new Date().toISOString(),
        details,
      },
      eventId ? `analytics-${kind}-${analyticsId(eventId)}` : undefined,
    );
  } catch {
    /* Analytics must never interrupt chat or gameplay. */
  }
}
