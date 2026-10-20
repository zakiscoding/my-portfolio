import { ArrowUpRight, Code2 } from "lucide-react";
import Image from "next/image";
import {
  featuredProjects,
  type Project,
  secondaryProjects,
} from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="cyber-project group bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col min-w-0">
      {project.preview ? (
        <div className="relative aspect-video bg-muted overflow-hidden">
          <Image
            src={project.preview.src}
            alt={project.preview.alt}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="project-banner h-24 px-6 flex items-center justify-between bg-primary/5 border-b"
        >
          <Code2 className="h-7 w-7 text-primary/60" />
          <span className="text-xs font-mono text-foreground/80">
            {project.id}
          </span>
        </div>
      )}
      <div className="p-5 md:p-6 flex flex-col flex-1 gap-4">
        <div>
          <p className="text-xs text-primary mb-2">{project.category}</p>
          <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
        {project.technologies.length > 0 && (
          <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="text-xs px-2 py-1 rounded-md bg-muted"
              >
                {technology}
              </li>
            ))}
          </ul>
        )}
        {project.accomplishments.length > 0 && (
          <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
            {project.accomplishments.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
        {project.note && (
          <p className="text-xs text-muted-foreground border-l-2 border-primary/40 pl-3 leading-relaxed">
            {project.note}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name}: ${link.label} (opens in new tab)`}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-2 border rounded-lg hover:bg-accent transition-colors"
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
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
          description="Backend systems, infrastructure, and applied AI, with contributions linked to the code."
        />
        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <details className="mt-12 group/more">
          <summary className="cursor-pointer rounded-lg border bg-card p-5 font-semibold text-lg hover:bg-accent">
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
