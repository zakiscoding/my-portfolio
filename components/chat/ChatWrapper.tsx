"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useSidebar } from "@/components/ui/sidebar";

const Chat = dynamic(() => import("./Chat"), {
  ssr: false,
  loading: () => <output className="block p-6">Loading AI Twin...</output>,
});

function AuthenticatedChat() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded)
    return <output className="block p-6">Loading sign-in...</output>;
  if (!isSignedIn)
    return (
      <div className="p-6">
        <p className="mb-4">Sign in to chat with my AI Twin.</p>
        <SignInButton mode="modal">
          <button type="button" className="border rounded-lg px-4 py-2">
            Sign in
          </button>
        </SignInButton>
      </div>
    );
  return <Chat profile={{ firstName: "Zakariye", lastName: "Mohamed" }} />;
}

export default function ChatWrapper({
  configured = false,
}: {
  configured?: boolean;
}) {
  const { open, openMobile, isMobile, toggleSidebar } = useSidebar();
  if (!(isMobile ? openMobile : open)) return null;
  return (
    <div className="h-full w-full flex flex-col bg-background text-foreground">
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="font-semibold">AI Twin</h2>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Close AI Twin"
          className="border rounded-lg px-3 py-2"
        >
          Close
        </button>
      </div>
      <div className="flex-1 min-h-0">
        {configured ? (
          <AuthenticatedChat />
        ) : (
          <div className="p-6 space-y-3">
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
