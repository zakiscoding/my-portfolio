type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

export function contactNotificationConfig(env: Record<string, unknown>) {
  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_NOTIFY_EMAIL;
  if (typeof apiKey !== "string" || !apiKey.trim()) return null;
  if (typeof to !== "string" || !to.trim()) return null;
  const from = env.CONTACT_FROM_EMAIL;
  return {
    apiKey: apiKey.trim(),
    to: to.trim(),
    from: typeof from === "string" && from.trim() ? from.trim() : DEFAULT_FROM,
  };
}

// Plain-text only, so visitor input is never rendered as HTML.
export function buildContactNotification(
  values: ContactValues,
  { to, from }: { to: string; from: string },
) {
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();
  return {
    from,
    to: [to],
    reply_to: oneLine(values.email),
    subject: `Portfolio message: ${oneLine(values.subject)}`.slice(0, 250),
    text: [
      `From: ${oneLine(values.name)} <${oneLine(values.email)}>`,
      `Subject: ${oneLine(values.subject)}`,
      "",
      values.message,
      "",
      "Reply to this email to answer the sender directly.",
    ].join("\n"),
  };
}

export async function sendContactNotification(
  values: ContactValues,
  env: Record<string, unknown> = process.env,
  fetchImpl: typeof fetch = fetch,
) {
  const config = contactNotificationConfig(env);
  if (!config) return { sent: false, reason: "not-configured" } as const;
  try {
    const response = await fetchImpl(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildContactNotification(values, config)),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok)
      return { sent: false, reason: `status-${response.status}` } as const;
    return { sent: true } as const;
  } catch {
    return { sent: false, reason: "network" } as const;
  }
}
