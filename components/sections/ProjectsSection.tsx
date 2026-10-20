import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  featuredProjects,
  type Project,
  secondaryProjects,
} from "@/lib/portfolio";
import { ProjectVisual } from "./ProjectVisual";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project }: { project: Project }) {
  const visibleLinks = project.links.filter(
    (link, index) => index === 0 || link.label.startsWith("Live demo"),
  );
  const additionalLinks = project.links.filter(
    (link) => !visibleLinks.includes(link),
  );
  return (
    <article
      data-project-id={project.id}
      className="cyber-project group bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col min-w-0"
    >
      <ProjectVisual project={project} />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs text-primary mb-2">{project.category}</p>
          <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
        <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((technology) => (
            <li key={technology} className="text-xs px-2 py-1 bg-muted">
              {technology}
            </li>
          ))}
          {project.technologies.length > 4 && (
            <li className="text-xs px-2 py-1 text-muted-foreground">
              +{project.technologies.length - 4}
            </li>
          )}
        </ul>
        <ul className="project-highlights list-disc pl-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
          {(project.highlights ?? project.accomplishments.slice(0, 2)).map(
            (point) => (
              <li key={point}>{point}</li>
            ),
          )}
        </ul>
        {project.outcome && (
          <div className="border-l-2 border-primary pl-3 text-sm leading-relaxed">
            <p className="text-xs text-primary mb-1">Implemented outcome</p>
            <p>{project.outcome}</p>
          </div>
        )}
        <details className="project-details">
          <summary>
            Engineering details
            <ChevronDown aria-hidden="true" className="size-3.5" />
          </summary>
          <div className="space-y-4 pt-4">
            <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {project.accomplishments.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">
                Full stack:{" "}
              </span>
              {project.technologies.join(", ")}
            </p>
            {additionalLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {additionalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline underline-offset-4"
                    aria-label={`${project.name}: ${link.label} (opens in new tab)`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </details>
        {project.note && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {project.note}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {visibleLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name}: ${link.label} (opens in new tab)`}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-2 border hover:bg-accent transition-colors"
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Featured Projects"
          description="Backend systems, infrastructure, and applied AI. Open a project for the engineering details."
        />
        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <details id="more-projects" className="mt-12">
          <summary className="cursor-pointer border bg-card p-5 font-semibold text-lg hover:bg-accent">
            More Projects{" "}
            <span className="text-sm text-foreground/80 font-normal">
              ({secondaryProjects.length})
            </span>
          </summary>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {secondaryProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
