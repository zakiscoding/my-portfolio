import { contributions } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

export function ContributionsSection() {
  return (
    <section id="contributions" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Open Source & Collaboration"
          description="Selected engineering contributions to Abyss, a collaborative AI agent orchestration platform."
        />
        <ul className="grid md:grid-cols-2 gap-6">
          {contributions.map((contribution) => (
            <li
              key={contribution.title}
              className="h-full rounded-xl border bg-card p-5 md:p-6"
            >
              <h3 className="text-lg font-semibold mb-3">
                {contribution.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {contribution.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
