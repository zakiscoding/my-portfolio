import { contributions } from "@/lib/portfolio";

export function ContributionsSection() {
  return (
    <section id="contributions" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Open Source & Collaboration
          </h2>
          <p className="text-lg text-muted-foreground">
            Team contributions and upstream pull requests by zakiscoding.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            PR status verified October 19, 2026.
          </p>
        </div>
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
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary shrink-0">
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
