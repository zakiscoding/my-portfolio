import { ArrowRight, ArrowUpRight, Workflow } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/portfolio";

export function ProjectVisual({ project }: { project: Project }) {
  if (project.preview)
    return (
      <figure className="project-visual">
        <a
          href={project.preview.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} preview (opens in new tab)`}
          className="project-image-link"
        >
          <Image
            src={project.preview.src}
            alt={project.preview.alt}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="preview-expand" aria-hidden="true">
            <ArrowUpRight className="size-4" />
          </span>
        </a>
        <figcaption>{project.preview.caption}</figcaption>
      </figure>
    );
  const diagram = project.diagram;
  if (!diagram) return null;
  return (
    <figure className="project-visual">
      <div
        className="project-diagram"
        role="img"
        aria-label={`Architecture overview: ${diagram.steps.join(" to ")}`}
      >
        <div className="diagram-label" aria-hidden="true">
          <Workflow className="size-4" />
          <span>SYSTEM MAP / {project.id}</span>
        </div>
        <div className="diagram-flow" aria-hidden="true">
          {diagram.steps.map((step, index) => (
            <div className="diagram-step" key={step}>
              <span>{step}</span>
              {index < diagram.steps.length - 1 && (
                <ArrowRight className="diagram-arrow" />
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}
