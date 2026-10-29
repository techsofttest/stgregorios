"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface NavigationProps {
  category?: Category[];
  slug: string;
  item?: {
    name?: string;
    title?: string;
  };
}

export default function Navigatiion({
  category,
  slug,
  item,
}: NavigationProps) {
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  if (!category?.length) return null;

  const normalizedSlug = (value: string) =>
    value.split("#")[0].replace(/^\/+|\/+$/g, "").toLowerCase();

  // Convert vertical mouse wheel scrolling into horizontal scrolling when hovering (mobile/tablet fallback)
  useEffect(() => {
    const el = categoryScrollRef.current;
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
    if (!categoryScrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - categoryScrollRef.current.offsetLeft;
    scrollLeft.current = categoryScrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    categoryScrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <ScrollReveal direction="up" duration={700}>
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <nav
          ref={categoryScrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          aria-label="Related pages"
          className="flex flex-row md:flex-wrap items-center justify-start md:justify-center gap-2 overflow-x-auto md:overflow-x-visible overscroll-x-contain scroll-smooth pt-1 touch-pan-x select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {category.map((tab) => {
            const tabSlug = tab.slug.trim();

            const href =
              /^https?:\/\//i.test(tabSlug) ||
              tabSlug.startsWith("/")
                ? tabSlug
                : tabSlug.startsWith("#")
                  ? `/about${tabSlug}`
                  : `/${tabSlug}`;

            const isActive =
              normalizedSlug(tabSlug) === normalizedSlug(slug) ||
              item?.name?.trim().toLowerCase() ===
                tab.name.trim().toLowerCase() ||
              item?.title?.trim().toLowerCase() ===
                tab.name.trim().toLowerCase();

            return (
              <Link
                key={tab.id}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:text-sm ${
                  isActive
                    ? "bg-[#a43a32] text-white shadow-sm"
                    : "border border-[#171715]/10 bg-white text-[#3d3a34] hover:border-[#a43a32] hover:text-[#a43a32]"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </ScrollReveal>
  );
}