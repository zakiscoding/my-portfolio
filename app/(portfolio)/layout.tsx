import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import "../globals.css";
import { draftMode } from "next/headers";
import Script from "next/script";
import { VisualEditing } from "next-sanity/visual-editing";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/DarkModeToggle";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { FloatingDock } from "@/components/FloatingDock";
import SidebarToggle from "@/components/SidebarToggle";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Zakariye Mohamed | Backend & Infrastructure Software Engineer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
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

      <SidebarProvider defaultOpen={false}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:p-3"
        >
          Skip to content
        </a>
        <SidebarInset className="min-w-0">{children}</SidebarInset>

        <AppSidebar side="right" />

        <FloatingDock />
        <SidebarToggle />

        {/* Mode Toggle - Desktop: bottom right next to AI chat, Mobile: top right next to burger menu */}
        <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-20">
          <div className="w-10 h-10 md:w-12 md:h-12">
            <ModeToggle />
          </div>
        </div>
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
