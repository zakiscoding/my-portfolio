import { randomUUID } from "node:crypto";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import {
  analyticsConfigured,
  analyticsId,
  storeEvent,
} from "@/lib/analytics/store";

export async function POST(request: Request) {
  if (!analyticsConfigured()) return new Response(null, { status: 204 });
  try {
    const raw = await request.text();
    if (raw.length > 300) return new Response(null, { status: 400 });
    const { kind, path, eventId, target } = JSON.parse(raw);
    if (
      ![
        "visit",
        "sign_in",
        "game_start",
        "resume_download",
        "project_open",
      ].includes(kind) ||
      path !== "/" ||
      typeof eventId !== "string" ||
      !/^[a-zA-Z0-9_-]{10,80}$/.test(eventId)
    )
      return new Response(null, { status: 400 });
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      return new Response(null, { status: 403 });
    const jar = await cookies();
    let visitor = jar.get("portfolio-visitor")?.value;
    if (!visitor || !/^[a-f0-9-]{36}$/.test(visitor)) {
      visitor = randomUUID();
      jar.set("portfolio-visitor", visitor, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 31536000,
      });
    }
    const configured = Boolean(
      process.env.CLERK_SECRET_KEY &&
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    );
    const identity = configured ? await auth() : null;
    if (kind === "sign_in" && !identity?.userId)
      return new Response(null, { status: 204 });
    const user = identity?.userId ? await currentUser() : null;
    const id =
      kind === "sign_in"
        ? `analytics-login-${analyticsId(identity?.sessionId || eventId)}`
        : `analytics-${kind}-${analyticsId(eventId)}`;
    await storeEvent(
      {
        kind,
        visitor: analyticsId(visitor),
        user: identity?.userId ? analyticsId(identity.userId) : null,
        name: user?.fullName || user?.username || null,
        email: user?.primaryEmailAddress?.emailAddress || null,
        path,
        at: new Date().toISOString(),
        details:
          typeof target === "string"
            ? { target: target.slice(0, 100) }
            : undefined,
      },
      id,
    );
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
