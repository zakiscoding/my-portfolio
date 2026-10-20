"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { useState } from "react";
import { createSession } from "@/app/actions/create-session";
import { useSidebar } from "../ui/sidebar";

export function Chat({
  profile,
}: {
  profile: { firstName: string; lastName: string } | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const { toggleSidebar } = useSidebar();
  // Generate greeting based on available profile data
  const getGreeting = () => {
    if (!profile?.firstName) {
      return "Hi there! Ask me anything about my work, experience, or projects.";
    }

    // The .filter(Boolean) removes all falsy values from the array, so if the firstName or lastName is not set, it will be removed
    const fullName = [profile.firstName, profile.lastName]
      .filter(Boolean)
      .join(" ");

    return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
  };

  const { control } = useChatKit({
    api: {
      getClientSecret: async (_existingSecret) => {
        // Called on initial load and when session needs refresh, we dont actuall use the existing secret as userId is managed by Clerk
        const result = await createSession();
        if (!result.clientSecret) {
          setError(result.error || "The AI Twin could not connect.");
          throw new Error(result.error || "The AI Twin could not connect.");
        }
        setError(null);
        return result.clientSecret;
      },
    },
    // https://chatkit.studio/playground
    theme: {},
    onError: () =>
      setError(
        "The AI Twin could not connect. Please try again or contact me directly.",
      ),
    header: {
      title: {
        text: `Chat with ${profile?.firstName || "Me"} `,
      },
      leftAction: {
        icon: "close",
        onClick: () => {
          toggleSidebar();
        },
      },
    },
    startScreen: {
      greeting: getGreeting(),
      prompts: [
        {
          icon: "suitcase",
          label: "What's your experience?",
          prompt:
            "Tell me about your professional experience and previous roles",
        },
        {
          icon: "square-code",
          label: "What skills do you have?",
          prompt:
            "What technologies and programming languages do you specialize in?",
        },
        {
          icon: "cube",
          label: "What have you built?",
          prompt: "Show me some of your most interesting projects",
        },
        {
          icon: "profile",
          label: "Who are you?",
          prompt: "Tell me more about yourself and your background",
        },
      ],
    },
    composer: {
      models: [
        {
          id: "crisp",
          label: "Crisp",
          description: "Concise and factual",
        },
        {
          id: "clear",
          label: "Clear",
          description: "Focused and helpful",
        },
        {
          id: "chatty",
          label: "Chatty",
          description: "Conversational companion",
        },
      ],
    },

    disclaimer: {
      text: "Disclaimer: This is my AI-powered twin. It may not be 100% accurate and should be verified for accuracy.",
    },
  });

  if (error)
    return (
      <div className="p-6 space-y-4">
        <p role="alert">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border rounded-lg px-4 py-2"
        >
          Reload to retry
        </button>
      </div>
    );
  return <ChatKit control={control} className="h-full w-full z-50" />;
}

export default Chat;
