import PortfolioContent from "@/components/PortfolioContent";

export default async function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pb-24">
      <PortfolioContent />
    </main>
  );
}
