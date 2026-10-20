import { createHash, randomUUID } from "node:crypto";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { after } from "next/server";
import { recordActivity } from "@/lib/analytics/record";
import { serverClient } from "@/sanity/lib/serverClient";

export const dynamic = "force-dynamic";
async function player() {
  let userId: string | null = null;
  if (
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY
  )
    userId = (await auth()).userId;
  const jar = await cookies();
  let guest = jar.get("twin-runner-player")?.value;
  if (!guest || !/^[a-f0-9-]{36}$/.test(guest)) {
    guest = randomUUID();
    jar.set("twin-runner-player", guest, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 31536000,
    });
  }
  const hash = createHash("sha256")
    .update(userId || guest)
    .digest("hex");
  const user = userId ? await currentUser() : null;
  const name =
    user?.firstName?.slice(0, 40) ||
    `Player #${1000 + (Number.parseInt(hash.slice(0, 8), 16) % 9000)}`;
  return { id: `runner-${hash}`, name };
}
async function scoreboard(identity: { id: string; name: string }) {
  const result = await serverClient.fetch<{
    leaders: { id: string; name: string; score: number }[];
    best: number | null;
  }>(
    `{
    "leaders": *[_type == "runnerScore"] | order(score desc, _createdAt asc)[0...5]{"id": _id, name, score},
    "best": *[_id == $id][0].score
  }`,
    { id: identity.id },
    { cache: "no-store" },
  );
  return Response.json(
    { player: identity, leaderboard: result.leaders, best: result.best || 0 },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function GET() {
  try {
    return await scoreboard(await player());
  } catch {
    return Response.json(
      { error: "High scores could not load. You can still play." },
      { status: 503 },
    );
  }
}
export async function POST(request: Request) {
  try {
    if (!process.env.SANITY_API_TOKEN)
      return Response.json(
        { error: "High score saving is unavailable." },
        { status: 503 },
      );
    const body = await request.text();
    if (body.length > 200)
      return Response.json({ error: "Invalid score." }, { status: 400 });
    const { score, runId } = JSON.parse(body);
    if (!Number.isInteger(score) || score < 0 || score > 100000)
      return Response.json({ error: "Invalid score." }, { status: 400 });
    const identity = await player();
    await serverClient.createIfNotExists({
      _id: identity.id,
      _type: "runnerScore",
      name: identity.name,
      score: 0,
    });
    for (let attempt = 0; attempt < 3; attempt++) {
      const record = await serverClient.getDocument<{
        _id: string;
        _rev: string;
        score: number;
      }>(identity.id);
      if (!record || record.score >= score) break;
      try {
        await serverClient
          .patch(identity.id)
          .ifRevisionId(record._rev)
          .set({ score, name: identity.name })
          .commit();
        break;
      } catch (error) {
        if (
          attempt === 2 ||
          (error as { statusCode?: number }).statusCode !== 409
        )
          throw error;
      }
    }
    after(() =>
      recordActivity(
        "game_end",
        { score },
        typeof runId === "string" && /^[a-f0-9-]{36}$/.test(runId)
          ? runId
          : randomUUID(),
      ),
    );
    return await scoreboard(identity);
  } catch {
    return Response.json(
      { error: "Score could not be saved. Your local best is still shown." },
      { status: 503 },
    );
  }
}
