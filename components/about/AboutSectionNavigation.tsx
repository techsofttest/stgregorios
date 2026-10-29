"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type TabValue = "parish" | "vision" | "patron-saint-st-gregorios";

const tabs: { label: string; value: TabValue }[] = [
  { label: "Parish", value: "parish" },
  { label: "Vision", value: "vision" },
  {
    label: "Patron Saint (St Gregorios)",
    value: "patron-saint-st-gregorios",
  },
];

export default function AboutSectionNavigation() {
  const [activeTab, setActiveTab] = useState<TabValue>("parish");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  useEffect(() => {
    const validTabs: TabValue[] = [
      "parish",
      "vision",
      "patron-saint-st-gregorios",
    ];

    const scrollToSection = () => {
      const hash = decodeURIComponent(
        window.location.hash.slice(1)
      ).toLowerCase();

      if (!validTabs.includes(hash as TabValue)) return;

      const tab = hash as TabValue;
      setActiveTab(tab);

      // Wait for the page elements to be available.
      requestAnimationFrame(() => {
        document.getElementById(tab)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    };

    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);

    return () => {
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, []);

  const selectTab = (value: TabValue) => {
    setActiveTab(value);
    window.history.replaceState(null, "", `/about#${value}`);

    document.getElementById(value)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="About sections"
      className="mb-8 mt-8 sm:mb-10 relative max-w-full"
    >
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-3 pt-1 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => selectTab(tab.value)}
            aria-pressed={activeTab === tab.value}
            className={`flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:text-sm ${
              activeTab === tab.value
                ? "bg-[#a43a32] text-white shadow-sm"
                : "border border-[#171715]/10 bg-white text-[#3d3a34] hover:border-[#a43a32] hover:text-[#a43a32]"
            }`}
          >
            {tab.label}
          </button>
        ))}

        <Link
          href="/church-history"
          className="flex-shrink-0 whitespace-nowrap border border-[#171715]/10 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#3d3a34] transition-all duration-300 hover:border-[#a43a32] hover:text-[#a43a32] sm:px-5 sm:text-sm"
        >
          History
        </Link>

        <Link
          href="/our-faith"
          className="flex-shrink-0 whitespace-nowrap border border-[#171715]/10 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#3d3a34] transition-all duration-300 hover:border-[#a43a32] hover:text-[#a43a32] sm:px-5 sm:text-sm"
        >
          Faith
        </Link>
      </div>
    </nav>
  );
}