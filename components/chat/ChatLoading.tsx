import { TwinAvatar } from "./TwinAvatar";
export function TypingDots() {
  return (
    <span className="chat-typing-dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
export function ChatLoading({
  label = "Getting your chat ready",
}: {
  label?: string;
}) {
  return (
    <output className="chat-loading">
      <TwinAvatar typing large />
      <span>{label}</span>
      <TypingDots />
      <span className="chat-loading-line" aria-hidden="true" />
    </output>
  );
}
