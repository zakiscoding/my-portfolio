"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

function send(kind: "visit" | "sign_in", eventId: string) {
  return fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, path: "/", eventId }),
    keepalive: true,
  }).then((response) => {
    if (!response.ok) throw new Error("Tracking unavailable");
  });
}
function SignedInAnalytics() {
  const { isLoaded, userId, sessionId } = useAuth();
  const sent = useRef<string | null>(null);
  useEffect(() => {
    if (!isLoaded || !userId || !sessionId || sent.current === sessionId)
      return;
    sent.current = sessionId;
    void send("sign_in", sessionId).catch(() => {
      sent.current = null;
    });
  }, [isLoaded, userId, sessionId]);
  return null;
}
export function VisitAnalytics({
  authEnabled = false,
}: {
  authEnabled?: boolean;
}) {
  const eventId = useRef<string | null>(null);
  useEffect(() => {
    eventId.current ||= crypto.randomUUID();
    void send("visit", eventId.current).catch(() => {});
  }, []);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (
        event.target as Element | null
      )?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const kind =
        anchor.hasAttribute("download") &&
        anchor.pathname.startsWith("/resumes/")
          ? "resume_download"
          : anchor.closest("[data-project-id]")
            ? "project_open"
            : null;
      if (!kind) return;
      const target =
        kind === "resume_download"
          ? anchor.pathname.split("/").pop()
          : anchor.closest<HTMLElement>("[data-project-id]")?.dataset.projectId;
      void fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          path: "/",
          eventId: crypto.randomUUID(),
          target,
        }),
        keepalive: true,
      }).catch(() => {});
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return authEnabled ? <SignedInAnalytics /> : null;
}
