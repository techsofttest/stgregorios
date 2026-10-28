"use client";

import { useState, useRef, useEffect } from "react";
import DetailStorySection from "@/components/news/DetailStorySection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import NewsCard from "@/components/news/NewsCard";

interface NewsGridSectionProps {
  items:{
      id:  number,
      slug:  string,
      type:  string,
      title: string,
      content:  string,
      image:  string,
      date: string,
    }[];
}

export default function NewsGridSection({ items }: NewsGridSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [selectedNews, setSelectedNews] = useState<NewsGridSectionProps["items"][number] | null>(null);
  const categories = [
    "All",
    "Latest News",
    "Announcements",
    "Newsletter"
  ];

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

  const filteredNews =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.type === selectedCategory);

  return (
    <section className="pt-8 pb-20 sm:pt-10 sm:pb-24 px-6 sm:px-10 lg:px-16 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Category Filter Pills (Smooth Horizontally Scrollable Carousel with Wheel & Drag support) */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-1 border-b border-black/10 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-none cursor-pointer ${selectedCategory === cat
                  ? "bg-[#a43a32] text-white shadow-sm"
                  : "bg-[#f2eee6] text-[#4d473d] hover:bg-[#e6dfd3]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-8 flex items-center justify-between text-xs text-[#777064] tracking-wide">
          <span>
            Showing {filteredNews.length} {filteredNews.length === 1 ? "article" : "articles"}
            {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          </span>
        </div>

        {/* News Grid*/}
        
{/* News Grid */}
<div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {filteredNews.map((item, index) => (
    <ScrollReveal
      key={item.id}
      direction="up"
      delay={(index % 4) * 100}
      duration={650}
    >
      <div className="h-full">
        <NewsCard
          item={item}
          aspectRatioClass="aspect-[4/3]"
          showExcerpt={true}
          onLearnMore={() => setSelectedNews(item)}
        />
      </div>
    </ScrollReveal>
  ))}
</div>

{/* Empty state */}
{filteredNews.length === 0 && (
  <div className="py-24 text-center">
    <p className="text-base text-[#777064]">
      No news articles found in this category.
    </p>
    <button
      type="button"
      onClick={() => setSelectedCategory("All")}
      className="mt-4 text-xs font-bold uppercase tracking-wider text-[#a43a32] hover:underline"
    >
      Reset to All Articles
    </button>
  </div>
)}

{/* Single shared modal */}
  <DetailStorySection
    isOpen={selectedNews !== null}
    onClose={() => setSelectedNews(null)}
    category={selectedNews?.type ?? ""}
    title={selectedNews?.title ?? ""}
    date={selectedNews?.date ?? ""}
    content={selectedNews?.content ?? ""}
  />
</div>
      
    </section>
  );
}
