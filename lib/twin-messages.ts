export type TwinMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: { label: string; href: string }[];
};
export function validateTwinMessages(value: unknown): value is TwinMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= 16 &&
    value.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        m.content.length <= 2000,
    ) &&
    value[value.length - 1].role === "user"
  );
}
export function extractTwinText(data: {
  output?: {
    type?: string;
    content?: { type?: string; text?: string; refusal?: string }[];
  }[];
}) {
  return (data.output ?? [])
    .flatMap((item) => (item.type === "message" ? (item.content ?? []) : []))
    .map((part) =>
      part.type === "output_text"
        ? (part.text ?? "")
        : part.type === "refusal"
          ? (part.refusal ?? "")
          : "",
    )
    .join("\n")
    .trim();
}
