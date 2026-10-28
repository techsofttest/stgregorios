
"use client";

import { useEffect, useState } from "react";
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
      className="mb-8 mt-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-3"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => selectTab(tab.value)}
          aria-pressed={activeTab === tab.value}
          className={`cursor-pointer px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:text-sm ${
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
        className="border border-[#171715]/10 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#3d3a34] transition-all duration-300 hover:border-[#a43a32] hover:text-[#a43a32] sm:px-5 sm:text-sm"
      >
        History
      </Link>

      <Link
        href="/our-faith"
        className="border border-[#171715]/10 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#3d3a34] transition-all duration-300 hover:border-[#a43a32] hover:text-[#a43a32] sm:px-5 sm:text-sm"
      >
        Faith
      </Link>
    </nav>
  );
}
