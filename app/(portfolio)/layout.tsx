import type { Metadata } from "next";
import { isChatConfigured } from "@/lib/integrations";
import { SanityLive } from "@/sanity/lib/live";
import "../globals.css";
import { draftMode } from "next/headers";
import Script from "next/script";
import { VisualEditing } from "next-sanity/visual-editing";
import { AppSidebar } from "@/components/app-sidebar";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { FloatingDock } from "@/components/FloatingDock";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Zakariye Mohamed | Backend & Infrastructure Software Engineer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatEnabled = isChatConfigured();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="portfolio-cyber-theme"
      enableSystem
      disableTransitionOnChange
    >
      {process.env.OPENAI_API_KEY &&
        process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID && (
          <Script
            src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
            strategy="lazyOnload"
          />
        )}

      <SidebarProvider defaultOpen={false} className="cyber-portfolio">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:p-3"
        >
          Skip to content
        </a>
        <div className="min-w-0 flex-1">
          <FloatingDock />
          {children}
        </div>
        {chatEnabled && <AppSidebar side="right" />}
      </SidebarProvider>

      {/* Live content API */}
      <SanityLive />

      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </ThemeProvider>
  );
}
