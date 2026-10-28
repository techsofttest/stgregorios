"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface DetailGallerySectionProps {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  items?: {
    src: string;
  }[];
}

export default function DetailGallerySection({
  eyebrow = "Sacred Glimpses",
  title = "Photographic",
  titleHighlight = "Memories",
  items,
}: DetailGallerySectionProps) {
  // If there are no images, completely hide the entire section for this page
  if (!items || items.length === 0) return null;

  return <DetailGalleryContent eyebrow={eyebrow} title={title} titleHighlight={titleHighlight} items={items} />;
}

function DetailGalleryContent({
  eyebrow,
  title,
  titleHighlight,
  items,
}: {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  items: { src: string; }[];
}) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setModalIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (modalIndex === null || items.length === 0) return;
    setModalIndex((modalIndex + 1) % items.length);
  }, [modalIndex, items.length]);

  const showPrev = useCallback(() => {
    if (modalIndex === null || items.length === 0) return;
    setModalIndex((modalIndex - 1 + items.length) % items.length);
  }, [modalIndex, items.length]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (modalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalIndex, closeModal, showNext, showPrev]);

  const count = items.length;

  // Preset tilt rotations and stack translations for organic gallery feel
  const cardTilts = [
    { rotate: "-rotate-2 lg:-rotate-3", hoverRotate: "group-hover:rotate-0", translateY: "translate-y-0" },
    { rotate: "rotate-2 lg:rotate-3", hoverRotate: "group-hover:rotate-0", translateY: "lg:translate-y-3" },
    { rotate: "-rotate-1 lg:-rotate-2", hoverRotate: "group-hover:rotate-0", translateY: "lg:-translate-y-2" },
    { rotate: "rotate-2 lg:rotate-1", hoverRotate: "group-hover:rotate-0", translateY: "lg:translate-y-2" },
    { rotate: "-rotate-2", hoverRotate: "group-hover:rotate-0", translateY: "translate-y-0" },
    { rotate: "rotate-1", hoverRotate: "group-hover:rotate-0", translateY: "translate-y-1" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-8 sm:px-12 lg:px-16">
        <ScrollReveal direction="up" duration={800}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <p className="eyebrow text-[#a43a32]">{eyebrow}</p>
              <h2 className="section-title mt-3 [&_span]:text-[#a43a32]" dangerouslySetInnerHTML={{__html:title}} />
            </div>

            <Link
              href="/gallery"
              className="text-xs font-bold tracking-widest text-[#a43a32] uppercase hover:underline transition-all pb-1 self-start sm:self-end"
            >
              View Full Gallery →
            </Link>
          </div>
        </ScrollReveal>

        {/* -------------------------------------------------------------
            CASE 1: SINGLE IMAGE (Maximum size, elegant display with subtle tilt)
        -------------------------------------------------------------- */}
        {count === 1 && (
          <div className="flex justify-center items-center py-6">
            <ScrollReveal direction="up" duration={850}>
              <div
                onClick={() => setModalIndex(0)}
                className="group relative cursor-pointer max-w-xl lg:max-w-2xl w-full"
              >
                {/* Layered stack backdrop shadow plate */}
                <div className="absolute inset-0 bg-[#e7dfcf] rotate-2 rounded-sm translate-y-3 translate-x-2 -z-10 transition-transform duration-500 group-hover:rotate-3 group-hover:translate-x-3 group-hover:translate-y-4" />
                <div className="absolute inset-0 bg-[#d9cfbd] -rotate-1 rounded-sm -translate-y-1 -translate-x-2 -z-20 transition-transform duration-500 group-hover:-rotate-2 group-hover:-translate-x-3 group-hover:-translate-y-2" />

                {/* Main Image Frame with delicate white polaroid/gallery border */}
                <div className="relative bg-white p-3 sm:p-4 shadow-xl border border-black/5 -rotate-1 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:shadow-2xl group-hover:scale-[1.01]">
                  <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/11] min-h-[420px] sm:min-h-[460px] w-full overflow-hidden bg-[#0c2433]">
                    <Image
                      src={items[0].src}
                      alt="one"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                    {/* Expand hint badge */}
                    <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/40 text-white backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      {/* <span className="text-[11px] font-bold uppercase tracking-widest text-[#f0d984]">
                        Featured Portrait
                      </span> */}
                      {/* <h4 className="font-display text-lg sm:text-2xl font-semibold text-white mt-1">
                        {items[0].title}
                      </h4> */}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* -------------------------------------------------------------
            CASE 2: TWO IMAGES (Generously sized split pair with complementary tilts)
        -------------------------------------------------------------- */}
        {count === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto py-6">
            {items.map((item, idx) => {
              const tilt = idx === 0 ? "-rotate-2 hover:rotate-0" : "rotate-2 hover:rotate-0";
              const shadowTilt = idx === 0 ? "rotate-2" : "-rotate-2";

              return (
                <ScrollReveal
                  key={`${item.src}-${idx}`}
                  direction="up"
                  delay={idx * 150}
                  duration={800}
                >
                  <div
                    onClick={() => setModalIndex(idx)}
                    className="group relative cursor-pointer"
                  >
                    {/* Shadow plate stack */}
                    <div
                      className={`absolute inset-0 bg-[#e7dfcf] ${shadowTilt} rounded-sm translate-y-2 translate-x-2 -z-10 transition-transform duration-500 group-hover:scale-98`}
                    />

                    {/* Frame */}
                    <div
                      className={`relative bg-white p-3 sm:p-4 shadow-xl border border-black/5 ${tilt} transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02]`}
                    >
                      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#0c2433]">
                        <Image
                          src={item.src}
                          alt="two"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                        {/* Expand hint badge */}
                        <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 text-white backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                          </svg>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          {/* <h4 className="font-display text-base sm:text-lg font-semibold text-white">
                            {item.title}
                          </h4> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* -------------------------------------------------------------
            CASE 3: THREE IMAGES (Medium-large grid with alternating tilt stack)
        -------------------------------------------------------------- */}
        {count === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-6">
            {items.map((item, idx) => {
              const tiltConfig = cardTilts[idx % cardTilts.length];

              return (
                <ScrollReveal
                  key={`${item.src}-${idx}`}
                  direction="up"
                  delay={idx * 140}
                  duration={750}
                >
                  <div
                    onClick={() => setModalIndex(idx)}
                    className={`group relative cursor-pointer ${tiltConfig.translateY}`}
                  >
                    {/* Shadow plate stack */}
                    <div className="absolute inset-0 bg-[#e7dfcf] rotate-1 rounded-sm translate-y-2 translate-x-1 -z-10 transition-transform duration-500 group-hover:rotate-0" />

                    <div
                      className={`relative bg-white p-3 shadow-lg border border-black/5 ${tiltConfig.rotate} ${tiltConfig.hoverRotate} transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.03]`}
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-[#0c2433]">
                        <Image
                          src={item.src}
                          alt="three"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          {/* <h4 className="font-display text-base font-semibold text-white">
                            {item.title}
                          </h4> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* -------------------------------------------------------------
            CASE 4: FOUR OR MORE IMAGES (4-Column tilted & stacked gallery)
        -------------------------------------------------------------- */}
        {count >= 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 py-6">
            {items.map((item, idx) => {
              const tiltConfig = cardTilts[idx % cardTilts.length];

              return (
                <ScrollReveal
                  key={`${item.src}-${idx}`}
                  direction="up"
                  delay={idx * 110}
                  duration={750}
                >
                  <div
                    onClick={() => setModalIndex(idx)}
                    className={`group relative cursor-pointer ${tiltConfig.translateY}`}
                  >
                    {/* Shadow plate stack for tilted organic gallery feel */}
                    <div className="absolute inset-0 bg-[#e7dfcf] rotate-1 rounded-sm translate-y-2 translate-x-1.5 -z-10 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-0" />

                    <div
                      className={`relative bg-white p-2.5 sm:p-3 shadow-md border border-black/5 ${tiltConfig.rotate} ${tiltConfig.hoverRotate} transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.04]`}
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-[#0c2433]">
                        <Image
                          src={item.src}
                          alt="four"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                          {/* <h4 className="font-display text-sm sm:text-base font-semibold text-white line-clamp-2">
                            {item.title}
                          </h4> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------
          MINIMAL STANDARD GALLERY MODAL / LIGHTBOX
      -------------------------------------------------------------- */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300"
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl mx-4 sm:mx-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="w-full flex items-center justify-between pb-4 text-white/80">
              <span className="text-xs font-semibold tracking-widest uppercase text-white">
                Photo {modalIndex + 1} of {items.length}
              </span>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image Frame */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] max-h-[800px] overflow-hidden rounded-sm bg-black/50 flex items-center justify-center">
              <Image
                src={items[modalIndex].src}
                alt="main"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 90vw, 1200px"
              />

              {/* Prev / Next Navigation Arrows (Only if multiple items) */}
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white hover:bg-[#f0d984] hover:text-[#080b0d] backdrop-blur-sm transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext();
                    }}
                    aria-label="Next image"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white hover:bg-[#f0d984] hover:text-[#080b0d] backdrop-blur-sm transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Caption Bar */}
            <div className="w-full pt-4 flex items-center justify-between text-white">
              {/* <h3 className="font-display text-base sm:text-lg font-medium text-white/95">
                {items[modalIndex].title}
              </h3> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
