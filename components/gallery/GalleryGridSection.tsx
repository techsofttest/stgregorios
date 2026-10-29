"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  categoryTitle: string;
  src: string;
  type: "image" | "video";
  videoUrl?: string;
  date?: string;
};

interface GalleryGridSectionProps {
  items: GalleryItem[];
}

export default function GalleryGridSection({ items }: GalleryGridSectionProps) {
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const categories = Array.from(
    new Map(
      items.map((item) => [
        item.category,
        {
          slug: item.category,
          title: item.categoryTitle,
        },
      ])
    ).values()
  );

  const [activeTab, setActiveTab] = useState("");

  // Convert vertical mouse wheel scrolling into horizontal scrolling when hovering
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Initialize and sync activeTab with URL hash (e.g. #video-gallery or #video or #photos)
  useEffect(() => {
    if (categories.length === 0) return;

    const getSlugFromHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (!hash) return null;

      // Match exact slug or check if hash includes category name/slug
      const matched = categories.find(
        (cat) => cat.slug.toLowerCase() === hash || hash.includes(cat.slug.toLowerCase())
      );
      return matched ? matched.slug : null;
    };

    const initialSlug = getSlugFromHash() || categories[0].slug;
    setActiveTab(initialSlug);

    // Listen for hash changes if user navigates back/forth or changes hash
    const handleHashChange = () => {
      const slug = getSlugFromHash();
      if (slug) setActiveTab(slug);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [items]);

  // Handle tab click and update browser URL hash
  const handleTabChange = (slug: string) => {
    setActiveTab(slug);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slug}-gallery`);
    }
  };

  const currentItems = items.filter((item) => item.category === activeTab);

  const closeModal = useCallback(() => {
    setModalItem(null);
  }, []);

  const currentIndex = modalItem ? currentItems.findIndex((it) => it.id === modalItem.id) : -1;

  const showNext = useCallback(() => {
    if (currentIndex === -1 || currentItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % currentItems.length;
    setModalItem(currentItems[nextIdx]);
  }, [currentIndex, currentItems]);

  const showPrev = useCallback(() => {
    if (currentIndex === -1 || currentItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + currentItems.length) % currentItems.length;
    setModalItem(currentItems[prevIdx]);
  }, [currentIndex, currentItems]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!modalItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalItem, closeModal, showNext, showPrev]);

  // Tilt config array for organic polaroid stack feel
  const cardTilts = [
    { rotate: "-rotate-2 lg:-rotate-3", hoverRotate: "group-hover:rotate-0", translateY: "translate-y-0" },
    { rotate: "rotate-2 lg:rotate-3", hoverRotate: "group-hover:rotate-0", translateY: "lg:translate-y-3" },
    { rotate: "-rotate-1 lg:-rotate-2", hoverRotate: "group-hover:rotate-0", translateY: "lg:-translate-y-2" },
    { rotate: "rotate-2 lg:rotate-1", hoverRotate: "group-hover:rotate-0", translateY: "lg:translate-y-2" },
    { rotate: "-rotate-2", hoverRotate: "group-hover:rotate-0", translateY: "translate-y-0" },
    { rotate: "rotate-1", hoverRotate: "group-hover:rotate-0", translateY: "translate-y-1" },
  ];

  return (
    <section className="relative bg-[#f7f4ed] pt-8 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* Ancient Orthodox Architectural Background (Sketch overlay) */}
      <div className="fixed inset-0 h-screen w-full z-0 pointer-events-none opacity-[0.08] mix-blend-multiply overflow-hidden">
        <Image
          src="/sketch/sk1.png"
          alt=""
          fill
          priority={false}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ed] via-transparent to-[#f7f4ed]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        {/* Gallery Tabs */}
        <ScrollReveal direction="up" duration={700}>
          <div className="relative mb-8 sm:mb-10">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 pt-1 touch-pan-x select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleTabChange(category.slug)}
                  aria-pressed={activeTab === category.slug}
                  className={`flex-shrink-0 whitespace-nowrap px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-none cursor-pointer ${
                    activeTab === category.slug
                      ? "bg-[#a43a32] text-white shadow-sm"
                      : "bg-white text-[#3d3a34] border border-[#171715]/10 hover:border-[#a43a32] hover:text-[#a43a32]"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* -------------------------------------------------------------
            TABS CONTENT: PHOTO / FEAST / HISTORICAL
        -------------------------------------------------------------- */}
        {activeTab !== "video" && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 py-4">
            {currentItems.map((item, idx) => {
              const tiltConfig = cardTilts[idx % cardTilts.length];

              return (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={(idx % 4) * 100}
                  duration={750}
                >
                  <div
                    onClick={() => setModalItem(item)}
                    className={`group relative cursor-pointer ${tiltConfig.translateY}`}
                  >
                    {/* Shadow plate stack for tilted organic gallery feel */}
                    <div className="absolute inset-0 bg-[#e7dfcf] rotate-1 rounded-sm translate-y-2 translate-x-1.5 -z-10 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-0" />

                    {/* Frame */}
                    <div
                      className={`relative bg-white p-2.5 sm:p-3 shadow-md border border-black/5 ${tiltConfig.rotate} ${tiltConfig.hoverRotate} transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.04]`}
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-[#0c2433]">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                        {/* Top corner hint badge */}
                        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 text-white backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

                        {/* Title caption overlay */}
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          {item.date && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f0d984] block mb-0.5">
                              {item.date}
                            </span>
                          )}
                          <h4 className="font-sans text-xs sm:text-sm font-semibold text-white line-clamp-2">
                            {item.title}
                          </h4>
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
            VIDEO GALLERY TAB
        -------------------------------------------------------------- */}
        {activeTab === "video" && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 py-4">
            {currentItems.map((item, idx) => {
              const tiltConfig = cardTilts[idx % cardTilts.length];

              return (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={(idx % 4) * 100}
                  duration={750}
                >
                  <div
                    onClick={() => setModalItem(item)}
                    className={`group relative cursor-pointer ${tiltConfig.translateY}`}
                  >
                    {/* Shadow plate stack */}
                    <div className="absolute inset-0 bg-[#e7dfcf] rotate-1 rounded-sm translate-y-2 translate-x-1.5 -z-10 transition-transform duration-500 group-hover:rotate-0" />

                    <div
                      className={`relative bg-white p-2 sm:p-2.5 md:p-3 shadow-md border border-black/5 ${tiltConfig.rotate} ${tiltConfig.hoverRotate} transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.04]`}
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-[#0c2433]">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center pb-7 sm:pb-8">
                          <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-full bg-[#a43a32] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="w-3.5 h-3.5 sm:w-5 sm:h-5 ml-0.5"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Title caption overlay */}
                        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                          {item.date && (
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-[#f0d984] block mb-0.5">
                              {item.date}
                            </span>
                          )}
                          <h4 className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold text-white line-clamp-2 leading-tight">
                            {item.title}
                          </h4>
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
          LIGHTBOX / MODAL
      -------------------------------------------------------------- */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl mx-4 sm:mx-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="w-full flex items-center justify-between pb-4 text-white/80">
              <span className="text-xs font-semibold tracking-widest uppercase text-white">
                {modalItem.type === "video" ? "Video" : "Photo"} {currentIndex + 1} of {currentItems.length}
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

            {/* Modal Image / Video Frame */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] max-h-[800px] overflow-hidden rounded-sm bg-black/50 flex items-center justify-center">
              {modalItem.type === "image" ? (
                <Image
                  src={modalItem.src}
                  alt={modalItem.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1280px) 90vw, 1200px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <iframe
                    src={modalItem.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                    title={modalItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full max-w-4xl max-h-[600px] border-0"
                  />
                </div>
              )}

              {/* Prev / Next Navigation Arrows */}
              {currentItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                    aria-label="Previous item"
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
                    aria-label="Next item"
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
            <div className="w-full pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-white gap-2">
              <h3 className="font-sans text-base sm:text-lg font-semibold text-white/95">
                {modalItem.title}
              </h3>
              {modalItem.date && (
                <span className="text-xs font-semibold tracking-wider text-[#f0d984] uppercase">
                  {modalItem.date}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}