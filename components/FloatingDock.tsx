import { FloatingDockClient } from "./FloatingDockClient";

// Curated anchors match rendered sections, including the contributions section.
const navItems = [
  { title: "Home", href: "#home", icon: "IconHome" },
  { title: "Projects", href: "#projects", icon: "IconCode" },
  { title: "Experience", href: "#experience", icon: "IconBriefcase" },
  { title: "Skills", href: "#skills", icon: "IconTools" },
  {
    title: "Contributions",
    href: "#contributions",
    icon: "IconGitPullRequest",
  },
  { title: "Contact", href: "#contact", icon: "IconMail" },
  { title: "About", href: "#about", icon: "IconUser" },
  { title: "Education", href: "#education", icon: "IconSchool" },
  { title: "Certifications", href: "#certifications", icon: "IconAward" },
];

export function FloatingDock() {
  return (
    <FloatingDockClient
      navItems={navItems}
      authEnabled={Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)}
    />
  );
}
