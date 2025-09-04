"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

interface Slide {
  title: string;
  subtitle?: string;
  imageSrc: string;
}

interface HomeHeroCarouselProps {
  slides: Slide[];
}

export const HomeHeroCarousel: React.FC<HomeHeroCarouselProps> = ({
  slides,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-rose-50">
      <div className="flex items-center justify-between px-4 pt-3">
        <h2 className="text-xl lg:text-2xl font-bold">Discover More</h2>
        <p className="text-sm text-gray-500">Swipe to explore</p>
      </div>

      <motion.div
        ref={containerRef}
        className="mt-2 flex gap-4 px-4 pb-4 overflow-x-auto snap-x snap-mandatory no-scrollbar"
        drag="x"
        dragConstraints={{ left: -300, right: 0 }}
      >
        {slides.map((slide, idx) => (
          <motion.div
            key={idx}
            className="relative min-w-[85%] md:min-w-[48%] lg:min-w-[32%] snap-start"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <div className="relative h-[200px] md:h-[260px] rounded-xl overflow-hidden">
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg md:text-xl font-extrabold drop-shadow-sm">
                  {slide.title}
                </h3>
                {slide.subtitle && (
                  <p className="text-xs md:text-sm text-white/90 max-w-[32ch]">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeHeroCarousel;
