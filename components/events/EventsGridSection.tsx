"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EventCard from "@/components/events/EventCard";
import DetailStorySection from "@/components/detailed/DetailStorySection";

interface EventsGridSectionProps {
      category: {
      name:string;
      id:number;
        }[];
  items:{
      id:  number,
      slug:string;
      type:  string,
      title: string,
      content:  string,
      image:  string,
      event_date: string,
    }[];
}

export default function EventsGridSection({ items ,category }: EventsGridSectionProps) {
const [selectedCategory, setSelectedCategory] = useState<string | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const categories = [
    { id: "All" as const, name: "All" },
    ...category.map((cat) => ({
      id: cat.id,
      name: cat.name,
    })),
  ];
  const [selectedNews, setSelectedNews] = useState<EventsGridSectionProps["items"][number] | null>(null);

  // Sync hash on mount (e.g. /events#calendar, /events#passion-week, /events#christmas, /events#easter, /events#perunnal)
useEffect(() => {
  const hash = window.location.hash.replace("#", "").toLowerCase();

  const hashAliases: Record<string, string[]> = {
    calendar: ["liturgical calendar"],
    perunnal: ["annual perunnal"],
    "annual-perunnal": ["annual perunnal"],
    feast: ["annual perunnal"],
    "passion-week": ["passion week"],
    passion: ["passion week"],
    christmas: ["christmas"],
    yeldho: ["christmas"],
    easter: ["easter"],
    kyomtho: ["easter"],
  };

  const targetNames = hashAliases[hash] ?? [];

  const matchedCategory = category.find((cat) =>
    targetNames.includes(cat.name.trim().toLowerCase())
  );

  if (matchedCategory) {
    setSelectedCategory(matchedCategory.name);
  }
}, [category]);

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
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const filteredEvents =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.type === selectedCategory);

  return (
    <section className="pt-8 pb-20 sm:pt-10 sm:pb-24 px-6 sm:px-10 lg:px-16 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Category Filter Carousel (Identical to NewsGridSection) */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-1 border-b border-black/10 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat,idx) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-none cursor-pointer ${selectedCategory === cat.name
                  ? "bg-[#a43a32] text-white shadow-sm"
                  : "bg-[#f2eee6] text-[#4d473d] hover:bg-[#e6dfd3]"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-8 flex items-center justify-between text-xs text-[#777064] tracking-wide">
          <span>
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
            {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          </span>
        </div>

        {/* Events Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredEvents.map((item, index) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={(index % 4) * 100}
              duration={650}
            >
              <div className="h-full">
                <EventCard item={item} aspectRatioClass="aspect-[3/4]" showExcerpt={true} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredEvents.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-base text-[#777064]">
              No events found in this category.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-[#a43a32] hover:underline"
            >
              Reset to All Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
