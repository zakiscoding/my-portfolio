import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading
          title="About Me"
          description="Backend systems, infrastructure, and applied AI"
        />
        <p className="text-lg text-muted-foreground leading-relaxed">
          At Georgia State University, I'm studying computer science while
          building across the stack: operations tools, job orchestration,
          containerized services, and ML pipelines. My work connects application
          development with the infrastructure that keeps it running.
        </p>
      </div>
    </section>
  );
}
