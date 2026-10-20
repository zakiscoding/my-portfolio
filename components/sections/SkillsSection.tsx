import { skillGroups } from "@/lib/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground">
            Tools I've used across my work and projects
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold border-b bg-muted/50 px-5 py-4">
                {group.name}
              </h3>
              <ul className="p-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm px-3 py-1.5 bg-primary/10 text-primary rounded-md"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
