import { branding } from "@/lib/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground">
            Backend systems, infrastructure, and applied AI
          </p>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          {branding.introduction}
        </p>
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
