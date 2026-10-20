import { auth } from "@clerk/nextjs/server";
import { after } from "next/server";
import { recordActivity } from "@/lib/analytics/record";
import { twinInstructions, twinSources } from "@/lib/twin";
import { extractTwinText, validateTwinMessages } from "@/lib/twin-messages";

export const maxDuration = 30;
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId)
    return Response.json({ error: "Please sign in to chat." }, { status: 401 });
  let message: {
    characters: number;
    topic: string;
    started: number;
    userText: string;
    conversationId: string;
  } | null = null;
  let recorded = false;
  const track = (success: boolean, replyText = "") => {
    if (!message || recorded) return;
    recorded = true;
    const details = {
      success,
      characters: message.characters,
      topic: message.topic,
      durationMs: Date.now() - message.started,
      replyCharacters: replyText.length,
      userText: message.userText,
      replyText: replyText.slice(0, 8000),
      conversationId: message.conversationId,
    };
    after(() => recordActivity("chat_message", details));
  };
  try {
    const raw = await request.text();
    if (raw.length > 40000)
      return Response.json(
        { error: "This conversation is too long. Start a new chat." },
        { status: 413 },
      );
    const { messages, conversationId } = JSON.parse(raw);
    if (!validateTwinMessages(messages))
      return Response.json(
        { error: "Please enter a message of up to 2,000 characters." },
        { status: 400 },
      );
    const latest = messages[messages.length - 1].content;
    const topic =
      /experience|intern|work|role|ibm|incomm|signify|cornell/i.test(latest)
        ? "Experience"
        : /project|redis|abyss|homelab|audio|kash/i.test(latest)
          ? "Projects"
          : /skill|python|language|technology/i.test(latest)
            ? "Skills"
            : /education|degree|university/i.test(latest)
              ? "Education"
              : "General";
    message = {
      characters: latest.length,
      topic,
      started: Date.now(),
      userText: latest,
      conversationId:
        typeof conversationId === "string" &&
        /^[a-f0-9-]{36}$/.test(conversationId)
          ? conversationId
          : crypto.randomUUID(),
    };
    if (!process.env.OPENAI_API_KEY) {
      track(false);
      return Response.json(
        { error: "The AI Twin is currently unavailable." },
        { status: 503 },
      );
    }
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TWIN_MODEL || "gpt-4.1-mini",
        instructions: twinInstructions(),
        input: messages.map(({ role, content }) => ({ role, content })),
        max_output_tokens: 650,
        store: false,
      }),
      signal: AbortSignal.timeout(25000),
      cache: "no-store",
    });
    if (!response.ok) {
      track(false);
      return Response.json(
        {
          error:
            response.status === 429
              ? "The AI Twin is busy. Please retry in a moment."
              : "The AI Twin could not respond. Please try again.",
        },
        { status: 503 },
      );
    }
    const text = extractTwinText(await response.json());
    if (!text) {
      track(false);
      return Response.json(
        { error: "No answer came back. Please retry your message." },
        { status: 502 },
      );
    }
    track(true, text);
    return Response.json(
      { text, sources: twinSources(text) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    track(false);
    return Response.json(
      {
        error:
          "The chat was interrupted. Your message is saved below; please retry.",
      },
      { status: 503 },
    );
  }
}
