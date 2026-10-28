"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HeritageSectionProps {
  imageSrc?: string;
  heritage?: {
    subtitle: string;
    title: string;
    content: string;
    detail: {
      title: string;
      icon: string;
    }[];
    images: string[];
  };
}

export default function HeritageSection({ imageSrc, heritage }: HeritageSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = heritage?.images ?? [];

  // Automatically cycle through carousel images every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="bg-white text-[#171715] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Centered Section Heading above the banner */}
        <ScrollReveal direction="up" duration={750}>
          <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <p className="eyebrow text-[#a43a32] text-[10px] sm:text-xs">{heritage?.title}</p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mt-3 text-[#111c20] [&_span]:text-[#a43a32]"
              dangerouslySetInnerHTML={{ __html: heritage?.subtitle ?? "" }}
            />
          </div>
        </ScrollReveal>

        {/* Boxed Banner with Carousel and Content Card */}
        <div className="relative overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex flex-col justify-end border border-white/10">
          {/* Background Image Carousel (Smooth cross-fade, isolated pointer-events-none) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {images.map((img, idx) => (
              <div
                key={img}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={img}
                  alt={`Heritage Image ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Content Container aligned to bottom right inside the boxed banner */}
          <div className="relative z-30 ml-auto flex justify-end p-5 sm:p-8 lg:p-10">
            <ScrollReveal direction="right" duration={850}>
              <div className="w-full max-w-[440px] sm:max-w-[480px] bg-[#111c20]/80 backdrop-blur-md border border-white/10 p-5 sm:p-7 shadow-2xl">
                <div className="grid grid-cols-2 pb-2.5 border-b border-white/10 mb-3.5">
                  {heritage?.detail?.map((milestone, idx) => (
                    <div key={idx}>
                      <p className="font-display text-3xl sm:text-4xl font-semibold text-[#d6b75b]">
                        {milestone.icon}
                      </p>
                      <p className="mt-1 text-xs tracking-[0.14em] text-white/80">
                        {milestone.title}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="text-xs sm:text-[13px] leading-relaxed text-white/90"
                  dangerouslySetInnerHTML={{ __html: heritage?.content ?? "" }}
                />

                <div className="mt-5">
                  <Link
                    href="/church-history"
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#d6b75b] hover:text-white transition-colors group/btn"
                  >
                    <span>Read More</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}