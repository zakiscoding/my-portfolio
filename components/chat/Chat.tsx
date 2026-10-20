"use client";

import { ArrowDown, ArrowUp, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TypingDots } from "./ChatLoading";
import { TwinAvatar } from "./TwinAvatar";
import { useTwinConversation } from "./TwinConversation";

const prompts = [
  "Tell me about your experience",
  "What have you built?",
  "What are your strongest skills?",
];
export function Chat({
  profile,
}: {
  profile: { firstName: string; lastName: string } | null;
}) {
  const { messages, draft, setDraft, pending, error, send, reset } =
    useTwinConversation();
  const transcript = useRef<HTMLDivElement>(null);
  const following = useRef(true);
  const [showLatest, setShowLatest] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  function scrollToLatest() {
    following.current = true;
    setShowLatest(false);
    const container = transcript.current;
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  useEffect(() => {
    if (!messages.length && !pending) return;
    if (messages.at(-1)?.role === "user") following.current = true;
    if (!following.current) {
      setShowLatest(true);
      return;
    }
    const container = transcript.current;
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [messages, pending]);
  return (
    <div className="twin-chat">
      <div className="twin-toolbar">
        <span>Portfolio assistant</span>
        <button
          type="button"
          disabled={pending || !messages.length}
          onClick={() => {
            reset();
            following.current = true;
            setShowLatest(false);
            transcript.current?.scrollTo({ top: 0 });
            input.current?.focus();
          }}
          aria-label="Start new conversation"
        >
          <RotateCcw size={15} aria-hidden="true" /> New chat
        </button>
      </div>
      <div className="twin-scroll-area">
        <div
          ref={transcript}
          onScroll={() => {
            const container = transcript.current;
            if (!container) return;
            following.current =
              container.scrollHeight -
                container.scrollTop -
                container.clientHeight <
              72;
            setShowLatest(!following.current);
          }}
          className="twin-transcript"
          data-empty={messages.length === 0 && !pending}
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
          aria-busy={pending}
        >
          {!messages.length && (
            <div className="twin-welcome">
              <TwinAvatar large />
              <h3>Explore {profile?.firstName || "Zakariye"}'s work.</h3>
              <p>Ask about my projects, experience, or skills.</p>
              <div className="twin-prompts">
                {prompts.map((prompt, index) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void send(prompt)}
                    disabled={pending}
                  >
                    {["Experience", "Projects", "Skills"][index]}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={`${index}-${message.role}`}
              className={`twin-message twin-${message.role}`}
            >
              <div className="twin-message-author">
                {message.role === "assistant" && <TwinAvatar />}
                <span className="chat-eyebrow">
                  {message.role === "user" ? "You" : "AI Twin"}
                </span>
              </div>
              <p>{message.content}</p>
              {message.role === "assistant" &&
                Boolean(message.sources?.length) && (
                  <nav
                    className="twin-sources"
                    aria-label="Related portfolio sources"
                  >
                    <span>Explore the source</span>
                    {message.sources?.map((source) => (
                      <a
                        key={source.href}
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.label}
                        <span aria-hidden="true"> &rarr;</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ))}
                  </nav>
                )}
            </div>
          ))}
          {pending && (
            <output className="twin-thinking">
              <TwinAvatar typing large />
              <span>
                AI Twin is typing
                <TypingDots />
              </span>
            </output>
          )}
        </div>
        {showLatest && (
          <button
            type="button"
            className="chat-jump-latest"
            onClick={scrollToLatest}
          >
            <ArrowDown size={14} aria-hidden="true" /> Latest messages
          </button>
        )}
      </div>
      <form
        className="twin-composer"
        onSubmit={(e) => {
          e.preventDefault();
          void send(draft);
        }}
      >
        {error && (
          <p role="alert" className="twin-error">
            {error}
          </p>
        )}
        <label htmlFor="twin-message" className="sr-only">
          Message the AI Twin
        </label>
        <div className="twin-input-row">
          <textarea
            ref={input}
            id="twin-message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={2000}
            rows={2}
            placeholder="Ask about experience or projects..."
            disabled={pending}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                void send(draft);
              }
            }}
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={pending || !draft.trim()}
          >
            <ArrowUp size={20} aria-hidden="true" />
          </button>
        </div>
        <p className="twin-disclaimer">
          AI-generated answers. Chats are saved privately for the portfolio
          owner.
        </p>
      </form>
    </div>
  );
}
export default Chat;
