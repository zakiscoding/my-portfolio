"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  id?: string;
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type NormalizedTestimonial = Testimonial & { _key: string };

const stableRotate = (seed: string) => {
  // Deterministic "random" rotate in range [-10, 10] (SSR-safe)
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return (hash % 21) - 10;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  // Ensure every item has a stable unique key (no duplicates, no index keys)
  const normalized: NormalizedTestimonial[] = useMemo(() => {
    return testimonials.map((t, i) => ({
      ...t,
      _key: t.id ?? `${t.name}-${t.designation}-${t.src}-${i}`,
    }));
  }, [testimonials]);

  const [active, setActive] = useState(0);

  const handleNext = () => {
    if (normalized.length === 0) return;
    setActive((prev) => (prev + 1) % normalized.length);
  };

  const handlePrev = () => {
    if (normalized.length === 0) return;
    setActive((prev) => (prev - 1 + normalized.length) % normalized.length);
  };

  const isActive = (index: number) => index === active;

  // Autoplay (SSR-safe, no missing deps warnings)
  useEffect(() => {
    if (!autoplay || normalized.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % normalized.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, normalized.length]);

  // Keep active index valid if testimonials change
  useEffect(() => {
    if (active >= normalized.length) setActive(0);
  }, [active, normalized.length]);

  if (!normalized.length) return null;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {normalized.map((testimonial, index) => {
                const tilt = stableRotate(`${testimonial._key}-${index}`);

                return (
                  <motion.div
                    key={testimonial._key}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: tilt,
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : tilt,
                      zIndex: isActive(index)
                        ? 40
                        : normalized.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: tilt,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      draggable={false}
                      className="rounded-3xl object-cover object-center"
                      priority={isActive(index)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={normalized[active]?._key ?? `active-${active}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {normalized[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {normalized[active].designation}
            </p>

            <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
              {normalized[active].quote.split(" ").map((word, wordIndex) => (
                <motion.span
                  key={`${normalized[active]._key}-w-${wordIndex}`}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * wordIndex,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
              aria-label="Previous testimonial"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
              aria-label="Next testimonial"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
