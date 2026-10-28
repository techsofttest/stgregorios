"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FeastSectionProps {
  imageSrc?: string;
  feast?:{
    title: string;
    content: string;
    images:[];
  }
}

export default function FeastSection({ imageSrc,feast }: FeastSectionProps) {
  const perunnalImages = [
    { src: "/perunnal/b1.png", alt: "Parumala Feast Celebration" },
    { src: "/perunnal/b2.png", alt: "Parumala Church Procession" },
    { src: "/perunnal/b3.png", alt: "Annual Feast Devotion" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useState<{ x: number; time: number }>({ x: 0, time: 0 })[0];

  useEffect(() => {
    if (isDragging) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % perunnalImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [perunnalImages.length, isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startXRef.x = e.clientX;
    startXRef.time = Date.now();
    setDragOffset(0);
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
        // Swiped left -> next image
        setCurrentIndex((prev) => (prev + 1) % perunnalImages.length);
      } else {
        // Swiped right -> prev image
        setCurrentIndex((prev) => (prev - 1 + perunnalImages.length) % perunnalImages.length);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section className="bg-[#a53c33] text-white overflow-hidden">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        {/* Content Container (Left Side) */}
        <div className="flex items-center px-7 py-20 sm:px-12 lg:px-16 xl:px-24">
          <ScrollReveal direction="left" duration={850}>
            <div className="max-w-[600px]">
              <p className="eyebrow text-white">Annual Feast</p>

              <h2 className="section-title mt-5" dangerouslySetInnerHTML={{__html:feast?.title ?? ""}} />
                
              


              <div className="mt-8 text-[15px] leading-8 text-white/90" dangerouslySetInnerHTML={{__html:feast?.content ?? ""}} />

              <Button
                href="/feast"
                variant="white"
                className="mt-9"
                arrowClassName="text-[#080b0d]"
              >
                Discover the feast
              </Button>
            </div>
          </ScrollReveal>
        </div>


        {/* Carousel Container (Right Side) with Draggable & Touch Gestures */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className={`relative min-h-[500px] lg:min-h-[620px] w-full overflow-hidden group select-none touch-pan-y ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {feast?.images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={img}
                style={{
                  transform:
                    isActive && isDragging
                      ? `translateX(${dragOffset}px)`
                      : "translateX(0px)",
                  transition: isDragging
                    ? "none"
                    : "opacity 1000ms ease-in-out, transform 400ms ease-out",
                }}
                className={`absolute inset-0 ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={img}
                  alt={img ?? ""}
                  fill
                  draggable={false}
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none" />
                {/* Left gradient hidden on mobile view, shown on desktop (hidden lg:block) */}
                <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#a53c33] via-[#a53c33]/40 to-transparent pointer-events-none" />
              </div>
            );
          })}

          {/* Carousel Pagination Controls */}
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
            {perunnalImages.map((_, idx) => (
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

          {/* Arrow Navigation */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(
                  (prev) => (prev - 1 + perunnalImages.length) % perunnalImages.length
                );
              }}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-[#f0d984] hover:text-[#080b0d] cursor-pointer"
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
                setCurrentIndex((prev) => (prev + 1) % perunnalImages.length);
              }}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-[#f0d984] hover:text-[#080b0d] cursor-pointer"
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
        </div>
      </div>
    </section>
  );
}
