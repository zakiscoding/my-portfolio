import { Suspense } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import ChatWrapper from "./chat/ChatWrapper";
import { TwinConversationProvider } from "./chat/TwinConversation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <TwinConversationProvider>
      <Sidebar className="portfolio-chat-sidebar" {...props}>
        <SidebarContent className="h-full w-full overflow-hidden bg-background">
          <Suspense fallback={<div>Loading...</div>}>
            <ChatWrapper
              configured={Boolean(
                process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
                  process.env.CLERK_SECRET_KEY &&
                  process.env.OPENAI_API_KEY,
              )}
            />
          </Suspense>
        </SidebarContent>
      </Sidebar>
    </TwinConversationProvider>
  );
}
