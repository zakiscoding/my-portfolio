import { education } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading title="Education" />
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((item) => (
            <article
              key={item.institution}
              className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <p className="text-sm text-primary font-medium mb-3">
                {item.status}
              </p>
              <h3 className="text-xl font-semibold mb-2">{item.institution}</h3>
              <p className="font-medium mb-4">{item.degree}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
