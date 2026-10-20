"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { ArrowLeft, Grip, Maximize2, Minimize2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatLoading } from "./ChatLoading";
import { TwinAvatar } from "./TwinAvatar";
import { useTwinConversation } from "./TwinConversation";

const Chat = dynamic(() => import("./Chat"), {
  ssr: false,
  loading: () => <ChatLoading />,
});

function AuthenticatedChat() {
  const { isLoaded, isSignedIn } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);
  if (!isLoaded) return <ChatLoading label="Checking sign-in" />;
  if (!isSignedIn && showSignIn)
    return (
      <div className="chat-sign-in">
        <button
          type="button"
          className="auth-back"
          onClick={() => setShowSignIn(false)}
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to chat
        </button>
        <SignIn
          routing="virtual"
          appearance={{
            variables: {
              colorPrimary: "var(--primary)",
              colorBackground: "var(--card)",
              colorText: "var(--foreground)",
              colorTextSecondary: "var(--muted-foreground)",
              colorInputBackground: "var(--background)",
              colorInputText: "var(--foreground)",
              colorNeutral: "var(--foreground)",
              fontFamily: "var(--font-geist-sans), sans-serif",
              borderRadius: "6px",
            },
            elements: {
              rootBox: "twin-auth-root",
              cardBox: "twin-auth-box",
              card: "twin-auth-card",
              headerTitle: "twin-auth-title",
              headerSubtitle: "twin-auth-subtitle",
              socialButtonsIconButton: "twin-auth-social",
              formFieldInput: "twin-auth-input",
              formButtonPrimary: "twin-auth-submit",
              footer: "twin-auth-footer",
              footerActionLink: "twin-auth-link",
            },
          }}
        />
      </div>
    );
  if (!isSignedIn)
    return (
      <div className="chat-state chat-welcome-card">
        <TwinAvatar large />
        <h3>Let's talk engineering.</h3>
        <p className="mb-4">
          Projects, experience, and the thinking behind my work. Sign in to
          start a conversation. Chats are saved privately for the portfolio
          owner.
        </p>
        <button
          type="button"
          className="chat-action"
          onClick={() => setShowSignIn(true)}
        >
          Sign in to chat
        </button>
      </div>
    );
  return <Chat profile={{ firstName: "Zakariye", lastName: "Mohamed" }} />;
}

export default function ChatWrapper({
  configured = false,
}: {
  configured?: boolean;
}) {
  const { open, openMobile, isMobile, toggleSidebar, setOpen } = useSidebar();
  const { pending } = useTwinConversation();
  const visible = isMobile ? openMobile : open;
  const [hasOpened, setHasOpened] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const cleanupResize = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanupResize.current?.(), []);
  function resizeChat(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    const windowElement = panelRef.current?.closest<HTMLElement>(
      ".portfolio-chat-sidebar",
    );
    if (!windowElement) return;
    cleanupResize.current?.();
    const bounds = windowElement.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const previousSelect = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    const move = (pointer: PointerEvent) => {
      windowElement.style.width = `${Math.max(320, Math.min(window.innerWidth - 48, bounds.width + startX - pointer.clientX))}px`;
      windowElement.style.height = `${Math.max(360, Math.min(window.innerHeight - 48, bounds.height + startY - pointer.clientY))}px`;
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      document.body.style.userSelect = previousSelect;
      cleanupResize.current = null;
    };
    cleanupResize.current = stop;
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  }
  function resetSize() {
    const windowElement = panelRef.current?.closest<HTMLElement>(
      ".portfolio-chat-sidebar",
    );
    windowElement?.style.removeProperty("width");
    windowElement?.style.removeProperty("height");
  }
  useEffect(() => {
    if (visible) setHasOpened(true);
  }, [visible]);
  useEffect(() => {
    if (!visible || isMobile) return;
    const opener = document.activeElement;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        if (opener instanceof HTMLElement) opener.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [visible, isMobile, setOpen]);
  useEffect(() => {
    if (!visible || isMobile) return;
    const element = panelRef.current?.closest<HTMLElement>(
      ".portfolio-chat-sidebar",
    );
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let offset = 0;
    let target = 0;
    let lastScroll = window.scrollY;
    let lastFrame = 0;
    const settle = (now: number) => {
      const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60;
      lastFrame = now;
      offset += (target - offset) * (1 - Math.exp(-12 * dt));
      target *= Math.exp(-5 * dt);
      const bounds = element.getBoundingClientRect();
      const top = bounds.top - offset;
      const safeOffset = Math.max(
        8 - top,
        Math.min(window.innerHeight - 8 - (top + bounds.height), offset),
      );
      element.style.setProperty(
        "--chat-scroll-offset",
        `${safeOffset.toFixed(2)}px`,
      );
      if (Math.abs(offset) > 0.1 || Math.abs(target) > 0.1)
        frame = requestAnimationFrame(settle);
      else {
        frame = 0;
        lastFrame = 0;
        element.style.removeProperty("--chat-scroll-offset");
      }
    };
    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (preference.matches || cleanupResize.current) return;
      target = Math.max(-20, Math.min(20, target - delta * 0.16));
      if (!frame) frame = requestAnimationFrame(settle);
    };
    const resetMotion = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      offset = 0;
      target = 0;
      lastFrame = 0;
      element.style.removeProperty("--chat-scroll-offset");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    preference.addEventListener("change", resetMotion);
    return () => {
      window.removeEventListener("scroll", onScroll);
      preference.removeEventListener("change", resetMotion);
      resetMotion();
    };
  }, [visible, isMobile]);
  if (!visible && !hasOpened) return null;
  return (
    <div
      ref={panelRef}
      className="chat-panel"
      data-expanded={expanded}
      inert={!visible}
      aria-hidden={!visible}
    >
      {!isMobile && (
        <button
          type="button"
          className="chat-resize-handle"
          aria-label="Resize chat window"
          title="Drag to resize; use arrow keys to adjust"
          onPointerDown={resizeChat}
          onKeyDown={(event) => {
            if (
              !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                event.key,
              )
            )
              return;
            event.preventDefault();
            const element = panelRef.current?.closest<HTMLElement>(
              ".portfolio-chat-sidebar",
            );
            if (!element) return;
            const bounds = element.getBoundingClientRect();
            const step = event.shiftKey ? 40 : 16;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight")
              element.style.width = `${Math.max(320, Math.min(window.innerWidth - 48, bounds.width + (event.key === "ArrowLeft" ? step : -step)))}px`;
            else
              element.style.height = `${Math.max(360, Math.min(window.innerHeight - 48, bounds.height + (event.key === "ArrowUp" ? step : -step)))}px`;
          }}
        >
          <Grip size={12} aria-hidden="true" />
        </button>
      )}
      <div className="chat-panel-header">
        <div className="flex items-center gap-3">
          <TwinAvatar typing={pending} />
          <div>
            <h2 className="chat-title">Zakariye's AI Twin</h2>
            <p className="chat-subtitle">
              {pending ? "Typing a reply..." : "Ask about my work"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!isMobile && (
            <button
              type="button"
              className="chat-close"
              aria-label={expanded ? "Make chat smaller" : "Expand chat"}
              onClick={() => {
                resetSize();
                setExpanded(!expanded);
              }}
            >
              {expanded ? (
                <Minimize2 size={16} aria-hidden="true" />
              ) : (
                <Maximize2 size={16} aria-hidden="true" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Close AI Twin"
            className="chat-close"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        {configured ? (
          <AuthenticatedChat />
        ) : (
          <div className="chat-state">
            <p>The AI Twin is currently unavailable.</p>
            <p className="text-sm text-muted-foreground">
              You can still explore my experience and projects, or{" "}
              <a href="#contact" className="underline">
                contact me directly
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
