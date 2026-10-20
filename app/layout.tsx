import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelFont = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zakariye-mohamed.vercel.app"),
  title: "Zakariye Mohamed | Backend & Infrastructure Software Engineer",
  description:
    "Backend systems, cloud infrastructure, and applied AI. Explore Zakariye Mohamed's projects, engineering experience, and open-source contributions.",
  openGraph: {
    type: "website",
    url: "https://zakariye-mohamed.vercel.app/",
    siteName: "Zakariye Mohamed's Portfolio",
    title: "Zakariye Mohamed | Software Engineering Portfolio",
    description:
      "Explore my backend, cloud infrastructure, and AI projects—and meet my AI Twin.",
    images: [
      {
        url: "/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Zakariye Mohamed — backend, cloud, and applied AI portfolio with his waving pixel avatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakariye Mohamed | Software Engineering Portfolio",
    description: "Backend systems, cloud infrastructure, and applied AI.",
    images: ["/portfolio-preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
    <ClerkProvider>{content}</ClerkProvider>
  ) : (
    content
  );
}
