"use client";

import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";

export function HeroChatAvatar({ enabled }: { enabled: boolean }) {
  const { isMobile, setOpen, setOpenMobile } = useSidebar();
  if (!enabled)
    return (
      <div className="hero-chat-invite">
        <Image
          src="/zakariye-waving-avatar.png"
          alt="Zakariye's 8-bit avatar waving and saying Hey!"
          width={1254}
          height={1254}
          sizes="120px"
          className="hero-wave-avatar"
        />
        <span className="hero-chat-bubble">Welcome to my portfolio!</span>
      </div>
    );
  return (
    <button
      type="button"
      className="hero-chat-invite"
      aria-label="Click to chat with my AI Twin"
      onClick={() => (isMobile ? setOpenMobile(true) : setOpen(true))}
    >
      <Image
        src="/zakariye-waving-avatar.png"
        alt="Zakariye's 8-bit avatar waving and saying Hey!"
        width={1254}
        height={1254}
        sizes="120px"
        className="hero-wave-avatar"
      />
      <span className="hero-chat-bubble">
        Welcome to my portfolio!
        <span className="hero-chat-cta">
          Click to chat with my AI Twin <span aria-hidden="true">&rarr;</span>
        </span>
      </span>
    </button>
  );
}
