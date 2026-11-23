import {
  AboutSection,
  AchievementsSection,
  BlogSection,
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
} from "@/components/sections";
import { ContributionsSection } from "@/components/sections/ContributionsSection";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <ContributionsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
      <BlogSection />
    </>
  );
}

export default PortfolioContent;
