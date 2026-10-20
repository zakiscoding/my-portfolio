"use server";

import { auth } from "@clerk/nextjs/server";

export async function createSession() {
  try {
    const { userId } = await auth();
    if (!userId)
      return { error: "Please sign in to chat.", clientSecret: null };
    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim();
    if (!apiKey || !workflowId)
      return {
        error: "The AI Twin is temporarily unavailable.",
        clientSecret: null,
      };
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "chatkit_beta=v1",
      },
      body: JSON.stringify({ workflow: { id: workflowId }, user: userId }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    if (!response.ok)
      return {
        error: "The AI Twin could not connect. Please try again later.",
        clientSecret: null,
      };
    const data = await response.json();
    if (typeof data.client_secret !== "string")
      return {
        error: "The AI Twin could not start a session.",
        clientSecret: null,
      };
    return { clientSecret: data.client_secret, error: null };
  } catch {
    return {
      error: "The AI Twin could not connect. Please try again later.",
      clientSecret: null,
    };
  }
}
