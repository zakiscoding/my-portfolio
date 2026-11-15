"use client";

import { useUser } from "@clerk/nextjs";
import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import type { TwinMessage } from "@/lib/twin-messages";

type Conversation = {
  messages: TwinMessage[];
  draft: string;
  setDraft: (draft: string) => void;
  pending: boolean;
  error: string | null;
  send: (value: string) => Promise<void>;
  reset: () => void;
};
const Context = createContext<Conversation | null>(null);
function ConversationState({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<TwinMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = useRef(false);
  const conversationId = useRef<string | null>(null);
  async function send(value: string) {
    const content = value.trim();
    if (!content || busy.current) return;
    busy.current = true;
    conversationId.current ||= crypto.randomUUID();
    const next: TwinMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationId.current,
          messages: next
            .slice(-15)
            .map(({ role, content }) => ({ role, content })),
        }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json();
      if (
        !response.ok ||
        typeof result.text !== "string" ||
        !result.text.trim()
      )
        throw new Error(result.error || "No answer came back. Please retry.");
      setMessages([
        ...next,
        { role: "assistant", content: result.text, sources: result.sources },
      ]);
    } catch (e) {
      setMessages(next.slice(0, -1));
      setDraft(content);
      setError(
        e instanceof Error && e.name !== "TimeoutError"
          ? e.message
          : "The response took too long. Please retry.",
      );
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  function reset() {
    if (busy.current) return;
    setMessages([]);
    conversationId.current = null;
    setDraft("");
    setError(null);
  }
  return (
    <Context.Provider
      value={{ messages, draft, setDraft, pending, error, send, reset }}
    >
      {children}
    </Context.Provider>
  );
}
export function TwinConversationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  return (
    <ConversationState key={user?.id || "signed-out"}>
      {children}
    </ConversationState>
  );
}
export function useTwinConversation() {
  const value = useContext(Context);
  if (!value) throw new Error("Chat requires a conversation provider");
  return value;
}
