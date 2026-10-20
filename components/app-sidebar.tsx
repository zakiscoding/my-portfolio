import { Suspense } from "react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import ChatWrapper from "./chat/ChatWrapper";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="h-full w-full bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <ChatWrapper
            configured={Boolean(
              process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
                process.env.CLERK_SECRET_KEY &&
                process.env.OPENAI_API_KEY &&
                process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID,
            )}
          />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
