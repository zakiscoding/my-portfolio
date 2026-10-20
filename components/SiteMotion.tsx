"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const animations = new Set<Animation>();
    let frame = 0;
    const progress = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--reading-progress",
        String(distance > 0 ? window.scrollY / distance : 0),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(progress);
    };
    const setup = () => {
      observer?.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer?.unobserve(entry.target);
            const animation = entry.target.animate(
              [
                { opacity: 0, transform: "translateY(20px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 450,
                easing: "cubic-bezier(.2,.7,.2,1)",
                delay: Number(
                  (entry.target as HTMLElement).dataset.motionDelay || 0,
                ),
              },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          }
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(
          "main .section-heading, main article, #experience .bg-card, #skills .bg-card, #education .bg-card, #certifications .bg-card",
        )
        .forEach((element, index) => {
          (element as HTMLElement).dataset.motionDelay = String(
            (index % 3) * 55,
          );
          observer?.observe(element);
        });
    };
    setup();
    progress();
    preference.addEventListener("change", setup);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => {
        animation.cancel();
      });
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", setup);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.style.removeProperty("--reading-progress");
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
