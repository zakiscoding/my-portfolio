import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { currentUser } from "@clerk/nextjs/server";
import { serverClient } from "@/sanity/lib/serverClient";
import { openAnalytics, sealAnalytics, verifiedAnalyticsOwner } from "./crypto";
import { DEFAULT_ANALYTICS_OWNER_EMAIL } from "./owner";

export type AnalyticsEvent = {
  kind:
    | "visit"
    | "sign_in"
    | "chat_message"
    | "game_start"
    | "game_end"
    | "resume_download"
    | "project_open";
  details?: {
    success?: boolean;
    durationMs?: number;
    characters?: number;
    replyCharacters?: number;
    topic?: string;
    score?: number;
    target?: string;
    conversationId?: string;
    userText?: string;
    replyText?: string;
  };
  visitor: string;
  user: string | null;
  name: string | null;
  email: string | null;
  path: string;
  at: string;
};
function key() {
  const value = process.env.ANALYTICS_ENCRYPTION_KEY;
  if (!value || !/^[a-f0-9]{64}$/i.test(value))
    throw new Error("Analytics storage is not configured");
  return Buffer.from(value, "hex");
}
export function analyticsId(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
export function analyticsConfigured() {
  return Boolean(
    process.env.SANITY_API_TOKEN && process.env.ANALYTICS_ENCRYPTION_KEY,
  );
}
export async function isAnalyticsOwner() {
  if (
    !process.env.CLERK_SECRET_KEY ||
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  )
    return false;
  const user = await currentUser();
  const allowed = (
    process.env.ANALYTICS_OWNER_EMAIL || DEFAULT_ANALYTICS_OWNER_EMAIL
  ).toLowerCase();
  return verifiedAnalyticsOwner(user?.emailAddresses || [], allowed);
}
export async function storeEvent(event: AnalyticsEvent, id?: string) {
  const document = {
    _id: id || `analytics-${randomBytes(16).toString("hex")}`,
    _type: "privateAnalyticsEvent",
    ...sealAnalytics(event, key()),
  };
  await serverClient.createIfNotExists(document);
}
export async function readEvents(days: number) {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const records = await serverClient.fetch<
    { payload: string; nonce: string; tag: string }[]
  >(
    `*[_type == "privateAnalyticsEvent" && _createdAt >= $since] | order(_createdAt desc)[0...5000]{payload,nonce,tag}`,
    { since },
    { cache: "no-store" },
  );
  return records.map(
    (record) => openAnalytics(record, key()) as AnalyticsEvent,
  );
}
