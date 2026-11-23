import { createHash } from "node:crypto";

// Set ANALYTICS_OWNER_EMAIL in the deployment environment; there is no default.
export function analyticsOwnerEmail() {
  return (process.env.ANALYTICS_OWNER_EMAIL || "").trim().toLowerCase();
}

// SHA-256 of the owner email, so the address itself never reaches the browser.
export function analyticsOwnerEmailHash() {
  const email = analyticsOwnerEmail();
  return email ? createHash("sha256").update(email).digest("hex") : undefined;
}
