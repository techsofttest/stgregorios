"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  imageSrc?: string;
  banner?: {
    title: string;
    content: string;
    image:string;
  };
}

export default function HeroSection({
  imageSrc = "/exterior/Sunlit White Colonial Church in Bloom.png", banner
}: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animations on site load
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[580px] lg:min-h-[640px] h-[68svh] sm:h-[82svh] lg:h-[100svh] overflow-hidden bg-[#080b0d] pt-14 sm:pt-20 lg:pt-24 pb-6 sm:pb-12 text-white flex flex-col justify-start">
      {/* Background Image with Slow Subtle Zoom-in Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={banner?.image||"/interior/Symmetrical Syrian Orthodox Sanctuary.png"}
          alt="St. Gregorios Church"
          fill
          priority
          className={`object-cover object-center transition-transform duration-[2000ms] ease-out ${
            mounted ? "scale-100" : "scale-110"
          }`}
          sizes="100vw"
        />
        {/* Responsive gradient overlay: stronger dark vignette at the bottom and left for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 md:bg-gradient-to-r md:from-black/85 md:via-black/40 md:to-transparent" />
      </div>

      {/* Main Content Container with Staggered Entrance Animations */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col max-w-[560px]">
          {/* Header Logo & Subtitle - Fade & Slide Down */}
          <div
            className={`mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3 transition-all duration-1000 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          >
            <Image
              src="/logo/logo.png"
              alt="St. Gregorios Logo"
              width={44}
              height={44}
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 object-contain shrink-0"
            />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-white/90 tracking-wide">
              Syriac Orthodox Church of Antioch
            </span>
          </div>

          {/* Typography Header - Staggered Fade & Slide Up */}
          <h1
            className={`font-display text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-[0.02em] text-white transition-all duration-1000 delay-300 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {banner?.title ?? ""}
          </h1>

          {/* Subtitle - Staggered Fade & Slide Up */}
          <div
            className={`mt-2.5 sm:mt-3 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/80 uppercase transition-all duration-1000 delay-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}  dangerouslySetInnerHTML={{__html:banner?.content ?? ""}}
          />
        </div>
      </div>

      {/* St. Gregorios PNG image aligned to right edge with entrance slide-up */}
      <div
        className={`absolute bottom-0 right-0 z-10 w-[55vw] sm:w-[42vw] md:w-[32vw] lg:w-[28vw] max-w-[240px] sm:max-w-[300px] md:max-w-[360px] xl:max-w-[420px] pointer-events-none transition-all duration-1200 delay-400 ease-out opacity-85 sm:opacity-100 ${
          mounted ? "opacity-85 sm:opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="relative w-full aspect-[1109/1418]">
          <Image
            src="/st-gregorios/st-gregorios.png"
            alt="St. Gregorios"
            fill
            priority
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 360px, 420px"
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
