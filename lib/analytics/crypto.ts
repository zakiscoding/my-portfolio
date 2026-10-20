import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
export function sealAnalytics(value: unknown, key: Buffer) {
  const nonce = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", key, nonce);
  const payload = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  return {
    payload: payload.toString("base64"),
    nonce: nonce.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
  };
}
export function openAnalytics(
  record: { payload: string; nonce: string; tag: string },
  key: Buffer,
) {
  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(record.nonce, "base64"),
  );
  decipher.setAuthTag(Buffer.from(record.tag, "base64"));
  return JSON.parse(
    Buffer.concat([
      decipher.update(Buffer.from(record.payload, "base64")),
      decipher.final(),
    ]).toString("utf8"),
  );
}
export function verifiedAnalyticsOwner(
  emails: { emailAddress: string; verification?: { status: string } | null }[],
  allowed: string,
) {
  return emails.some(
    (email) =>
      email.emailAddress.toLowerCase() === allowed.trim().toLowerCase() &&
      email.verification?.status === "verified",
  );
}
