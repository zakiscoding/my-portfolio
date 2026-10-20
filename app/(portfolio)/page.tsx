import PortfolioContent from "@/components/PortfolioContent";
import { TwinRunner } from "@/components/TwinRunner";
import { VisitAnalytics } from "@/components/VisitAnalytics";

export default async function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen">
      <VisitAnalytics
        authEnabled={Boolean(
          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
            process.env.CLERK_SECRET_KEY,
        )}
      />
      <PortfolioContent />
      <TwinRunner
        authEnabled={Boolean(
          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
            process.env.CLERK_SECRET_KEY,
        )}
      />
    </main>
  );
}
