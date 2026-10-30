"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface DetailHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  verseQuote?: string;
  verseCitation?: string;
  imageSrc?: string;
  images?: string[];
  backLink?: {
    href: string;
    label: string;
  };
}

export default function DetailHero({
  eyebrow,
  title,
  subtitle,
  verseQuote,
  verseCitation,
  imageSrc,
  images,
  backLink,
}: DetailHeroProps) {
  // Normalize images list: use provided images array, or single imageSrc fallback
  const heroImages =
    images && images.length > 0
      ? images
      : imageSrc
        ? [imageSrc]
        : ["/interior/Ornate Candlelit Chapel Altar.png"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useState<{ x: number; time: number }>({ x: 0, time: 0 })[0];

  useEffect(() => {
    if (heroImages.length <= 1 || isDragging) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroImages.length, isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (heroImages.length <= 1) return;
    setIsDragging(true);
    startXRef.x = e.clientX;
    startXRef.time = Date.now();
    setDragOffset(0);
    // Capture pointer so drag remains smooth even if cursor moves out of container
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.x;
    setDragOffset(deltaX);
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const deltaX = e.clientX - startXRef.x;
    const duration = Date.now() - startXRef.time;
    const isQuickSwipe = Math.abs(deltaX) > 40 && duration < 300;
    const isPastThreshold = Math.abs(deltaX) > 80;

    if (isQuickSwipe || isPastThreshold) {
      if (deltaX < 0) {
        // Dragged left -> next slide
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      } else {
        // Dragged right -> prev slide
        setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section className="relative w-full bg-[#071b27] text-white overflow-hidden pt-20 lg:pt-0">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] min-h-[560px] lg:min-h-screen">
        {/* Left Side: Content Container */}
        <div className="relative flex items-center px-7 py-16 sm:px-12 lg:px-16 xl:px-24 overflow-hidden">
          {/* Subtle Background Watermark: Christian Orthodox Cross SVG */}
          <div className="pointer-events-none absolute -left-16 sm:-left-8 lg:-left-4 top-1/2 -translate-y-1/2 opacity-[0.04] text-[#d6b75b] select-none">
            <svg
              width="380"
              height="520"
              viewBox="0 0 200 280"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Central Glory Nimbus */}
              <circle cx="100" cy="90" r="34" opacity="0.3" />
              <circle cx="100" cy="90" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />

              {/* Vertical Beam */}
              <rect x="91" y="20" width="18" height="235" rx="2" />
              <rect x="94" y="15" width="12" height="245" rx="1" />

              {/* Main Horizontal Crossbar */}
              <rect x="30" y="81" width="140" height="18" rx="2" />
              <rect x="25" y="84" width="150" height="12" rx="1" />

              {/* Top Inscription Bar / Titulus */}
              <rect x="72" y="42" width="56" height="12" rx="2" />
              <rect x="70" y="44" width="60" height="8" rx="1" opacity="0.7" />

              {/* Slanted Footrest Bar (Suppedaneum) */}
              <polygon points="50,212 150,190 150,206 50,228" />

              {/* Decorative Budded Endings */}
              <circle cx="100" cy="8" r="9" />
              <circle cx="89" cy="14" r="7.5" />
              <circle cx="111" cy="14" r="7.5" />

              <circle cx="100" cy="265" r="9" />
              <circle cx="89" cy="259" r="7.5" />
              <circle cx="111" cy="259" r="7.5" />

              <circle cx="18" cy="90" r="9" />
              <circle cx="24" cy="79" r="7.5" />
              <circle cx="24" cy="101" r="7.5" />

              <circle cx="182" cy="90" r="9" />
              <circle cx="176" cy="79" r="7.5" />
              <circle cx="176" cy="101" r="7.5" />
            </svg>
          </div>

          <ScrollReveal direction="left" duration={850} className="relative z-10">
            <div className="max-w-[620px]">
              {/* Back Link Button (if provided) */}
              {backLink && (
                <div className="mb-6">
                  <Link
                    href={backLink.href}
                    className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-[#d6b75b] transition-colors"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>{backLink.label}</span>
                  </Link>
                </div>
              )}

              {/* Header Badge */}
              <div className="mb-5 flex items-center gap-3">
                <span className="eyebrow text-[#d6b75b] leading-tight">
                  {eyebrow}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-4xl font-semibold leading-tight text-white [&_span]:text:[#d6b75b] "   dangerouslySetInnerHTML={{ __html: title }}/>

              {/* Scripture Verse Quote Box */}
              {verseQuote && (
                <div className="mt-8">
                  <p className="font-display italic text-base sm:text-lg text-white/95 leading-relaxed [&_.text-small]:mt-2 [&_.text-small]:text-xs [&_.text-small]:font-bold [&_.text-small]:uppercase [&_.text-small]:tracking-widest [&_.text-small]:text-[#d6b75b]" dangerouslySetInnerHTML={{__html:verseQuote ?? ""}} />
                  {verseCitation && (
                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#d6b75b]">
                      — {verseCitation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Flush Fill Image / Carousel Container with Drag / Touch Gesture Support */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className={`relative min-h-[460px] sm:min-h-[520px] lg:min-h-full h-full w-full overflow-hidden select-none touch-pan-y ${
            heroImages.length > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
          }`}
        >
          {heroImages.map((src, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={`${src}-${idx}`}
                style={{
                  transform:
                    isActive && isDragging
                      ? `translateX(${dragOffset}px)`
                      : "translateX(0px)",
                  transition: isDragging
                    ? "none"
                    : "opacity 900ms ease-in-out, transform 400ms ease-out",
                }}
                className={`absolute inset-0 w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-full ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} - image ${idx + 1}`}
                  fill
                  draggable={false}
                  priority={idx === 0}
                  className="object-cover  relative  aspect-[3/4] object-center pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                {/* Overlays matching FeastSection aesthetic */}
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-36 sm:w-48 bg-gradient-to-r from-[#071b27] via-[#071b27]/50 to-transparent pointer-events-none hidden lg:block" />
              </div>
            );
          })}

          {/* Carousel Pagination Dots Controls (Shown when multiple images exist) */}
          {heroImages.length > 1 && (
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? "w-16 bg-[#f0d984]"
                      : "w-2.5 bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Arrow Navigation (Shown when multiple images exist) */}
          {heroImages.length > 1 && (
            <div className="absolute bottom-6 right-6 z-20 flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(
                    (prev) => (prev - 1 + heroImages.length) % heroImages.length
                  );
                }}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-[#f0d984] hover:text-[#071b27] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % heroImages.length);
                }}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-[#f0d984] hover:text-[#071b27] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Left-Aligned Scroll Indicator on Desktop View */}
      <div className="hidden lg:flex absolute bottom-12 xl:bottom-16 left-7 sm:left-12 lg:left-16 xl:left-24 z-30 flex-col items-start">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("detail-story-section");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="group flex flex-col items-start cursor-pointer select-none focus:outline-none transition-all duration-300"
          aria-label="Read more"
        >
          {/* Animated Downward Arrow */}
          <div className="text-[#f0d984] animate-bounce mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>

          {/* Read more link */}
          <span className="text-xs font-semibold tracking-wider text-white/80 transition-colors duration-300 group-hover:text-[#f0d984]">
            Read more
          </span>
        </button>
      </div>
    </section>
  );
}
