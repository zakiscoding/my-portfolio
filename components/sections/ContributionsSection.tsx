import { contributions } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

export function ContributionsSection() {
  return (
    <section id="contributions" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Open Source & Collaboration"
          description="Team contributions and upstream pull requests by zakiscoding."
        />
        <p className="text-center text-sm text-muted-foreground mb-6">
          PR status verified October 19, 2026.
        </p>
        <ul className="grid md:grid-cols-2 gap-4">
          {contributions.map((contribution) => (
            <li key={`${contribution.repository}-${contribution.number}`}>
              <a
                href={`https://github.com/${contribution.repository}/pull/${contribution.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-lg border bg-card p-5 hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-sm font-mono break-all">
                    {contribution.repository} #{contribution.number}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full shrink-0 ${contribution.status === "Merged" ? "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200" : "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200"}`}
                  >
                    {contribution.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {contribution.summary}
                </p>
                <span className="inline-block mt-3 text-sm text-primary">
                  View pull request
                  <span className="sr-only"> (opens in new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
