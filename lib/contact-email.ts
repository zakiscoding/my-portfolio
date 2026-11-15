export function buildContactEmailDraft(
  recipient: string,
  message: { name: string; email: string; subject: string; message: string },
) {
  const address = encodeURIComponent(recipient.trim()).replace(/%40/g, "@");
  const subject = message.subject.replace(/[\r\n]+/g, " ");
  const body = `From: ${message.name} <${message.email}>\n\n${message.message}`;
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
