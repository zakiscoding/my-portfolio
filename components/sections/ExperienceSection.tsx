import { experiences } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Work Experience"
          description="Systems, reliability, software, and AI engineering"
        />
        <div className="space-y-8">
          {experiences.map((experience) => (
            <article
              key={experience.company}
              className="relative pl-6 md:pl-8 pb-8 border-l-2 border-muted last:border-l-0"
            >
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              <div className="bg-card border rounded-xl p-5 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold">
                      {experience.position}
                    </h3>
                    <p className="text-lg text-primary font-medium mt-1">
                      {experience.company}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground md:text-right">
                    {experience.dates}
                  </p>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground">
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul
                  aria-label="Technologies"
                  className="flex flex-wrap gap-2 mt-5"
                >
                  {experience.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
