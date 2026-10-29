"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export const megaMenuCategories: MenuCategory[] = [
  {
    title: "ABOUT US",
    items: [
      { label: "Our Parish", href: "/about" },
      { label: "History of the Church", href: "/church-history" },
      { label: "Patron Saint (St. Gregorios)", href: "/about#patron-saint-st-gregorios" },
      { label: "Vision & Mission", href: "/about#vision" },
      { label: "Our Faith", href: "/our-faith" },
    ],
  },
  {
    title: "HIERARCHY",
    items: [
      { label: "Patriarch", href: "/patriarch" },
      { label: "Catholicos & Metropolitan", href: "/metropolitian" },
      { label: "Assistant Metropolitan", href: "/assistant-metropolitan" },
      { label: "Vicar", href: "/vicar" },

    ],
  },
  {
    title: "MANAGING COMMITTEE",
    items: [
      { label: "Office Bearers", href: "/committee#office-bearers" },
      { label: "MC Members", href: "/committee#members" },
      { label: "Internal Auditor", href: "/committee#auditor" },
      { label: "Diocese Council Respresentatives", href: "/committee#council" },
    ],
  },
  {
    title: "SPIRITUAL ORGANIZATIONS",
    items: [
      { label: "Sunday School", href: "/sunday-school" },
      { label: "Vanitha Samajam", href: "/vanitha-samajam" },
      { label: "Youth Association", href: "/youth-association" },
      { label: "Elders Forum", href: "/elders-forum" },
      {
        label: "Antiochian Faith Protection Movement",
        href: "/antiochian-faith-protection-movement",
      },
      { label: "Prayer Fellowships", href: "/prayer-fellowships" },
      { label: "Choir", href: "/choir" },      { label: "Altar Boys", href: "/altar-boys" },
    ],
  },
  {
    title: "EVENTS",
    items: [
      { label: "Liturgical Calendar", href: "/events#calendar" },
      { label: "Annual Feast of St.Gregorios", href: "/events#perunnal" },
    ],
  },
  {
    title: "NEWS & ANNOUNCEMENTS",
    items: [
      { label: "All", href: "/news" },
      { label: "Latest News", href: "/news#latest" },
      { label: "Announcements", href: "/news#announcements" },
      { label: "Newsletter", href: "/news#newsletter" },
    ],
  },
  {
    title: "GALLERY",
    items: [
      { label: "Photo Gallery", href: "/gallery#photo-gallery" },
      { label: "Video Gallery", href: "/gallery#video-gallery" },
      { label: "Feast Gallery", href: "/gallery#feast-gallery" },
      { label: "Historical Photos", href: "/gallery#church-history" },
    ],
  },
  {
    title: "ST. GREGORIOS PUBLIC SCHOOL & JUNIOR COLLEGE",
    items: [
      { label: "History", href: "/#school#history" },
      { label: "School Website", href: "https://stgregoriosschool.com", external: true },
    ],
  },
  {
    title: "SUPPORT AND DONATIONS",
    items: [
      { label: "Educational Aid", href: "/donations" },
      { label: "Medical Aid", href: "/donations" },
      { label: "Natural Calamity Aid", href: "/donations" },
      { label: "Donations", href: "/donations" },
    ],
  },
  {
    title: "CONTACT US",
    items: [
      { label: "Contact Information", href: "/contact#info" },
      { label: "Church Address", href: "/contact#address" },
      { label: "Google Map", href: "/contact#map" },
    ],
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: MenuCategory[];
}

export default function MegaMenu({
  isOpen,
  onClose,
  categories = megaMenuCategories,
}: MegaMenuProps) {
  // Track open categories (collapsed by default)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Close with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Dimmed backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      />

      {/* Right-aligned Minimal Slide-over Drawer */}
      <aside
        aria-label="Main Navigation Menu Drawer"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[390px] md:w-[420px] max-w-[92vw] bg-[#f7f4ed] text-[#080b0d] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header with Title and matching Menu Button inside */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-[#071b27] text-white border-b border-[#a53c33]/40">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xs sm:text-sm font-semibold text-white/90">
              Menu &amp; Directory
            </h2>
          </div>

          {/* Menu button styled consistently inside the drawer */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="group inline-flex items-center gap-2 rounded-none bg-[#a53c33] px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white hover:bg-[#8f322b] transition-colors cursor-pointer border border-white/10 active:scale-95"
          >
            <span className="relative block h-3.5 w-4 shrink-0">
              <span className="absolute left-0 top-[6px] block h-[2px] w-full bg-white rotate-45 transition-transform" />
              <span className="absolute left-0 top-[6px] block h-[2px] w-full bg-white -rotate-45 transition-transform" />
            </span>
            <span>Close</span>
          </button>
        </div>

        {/* Scrollable Minimal Category Accordion List */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#e9e3d7] [&::-webkit-scrollbar-thumb]:bg-[#a53c33]/60 hover:[&::-webkit-scrollbar-thumb]:bg-[#a53c33]">
          {categories.map((category) => {
            const isExpanded = !!openCategories[category.title];

            return (
              <div
                key={category.title}
                className="border border-[#e2dbca] bg-white/70 overflow-hidden shadow-xs"
              >
                {/* Collapsible Category Header Button */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.title)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between py-2.5 px-3 sm:px-3.5 text-left bg-[#a53c33] text-white hover:bg-[#8f322b] transition-colors cursor-pointer select-none"
                >
                  <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase pr-2 leading-snug">
                    {category.title}
                  </span>

                  {/* Animated Plus / Minus icon on right edge */}
                  <span
                    className="relative w-4 h-4 shrink-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {/* Horizontal Bar */}
                    <span className="absolute w-3.5 h-[2px] bg-white rounded-full transition-transform duration-300" />
                    {/* Vertical Bar (scale to 0 on open to become minus) */}
                    <span
                      className={`absolute w-[2px] h-3.5 bg-white rounded-full transition-transform duration-300 ease-in-out ${isExpanded ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                        }`}
                    />
                  </span>
                </button>

                {/* Collapsible Sub-items Container */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                  <div className="overflow-hidden">
                    <ul className="py-2 px-3 sm:px-3.5 space-y-1 bg-[#fcfbfa]">
                      {category.items.map((item) => (
                        <li key={item.label} className="relative flex items-center group">
                          {/* 'L' shaped icon to the left of each dropdown item */}
                          <span
                            className="w-4 h-4 mr-2.5 shrink-0 flex items-center justify-center text-[#a53c33]/70 group-hover:text-[#a53c33] transition-colors"
                            aria-hidden="true"
                          >
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              className="w-3.5 h-3.5"
                            >
                              {/* Descends down then branches right in 'L' shape */}
                              <path d="M4 2v8h8" />
                            </svg>
                          </span>

                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onClose}
                              className="relative flex-1 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#272522] hover:text-[#a53c33] transition-colors py-1 overflow-hidden leading-snug"
                            >
                              <span className="truncate">{item.label}</span>
                              <svg
                                className="w-3 h-3 text-[#a53c33]/70 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                              {/* Sliding underline */}
                              <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#a53c33] -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="relative flex-1 inline-block text-xs sm:text-[13px] font-medium text-[#272522] hover:text-[#a53c33] transition-colors py-1 overflow-hidden leading-snug"
                            >
                              <span>{item.label}</span>
                              {/* Sliding underline */}
                              <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#a53c33] -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Drawer Footer */}
        <div className="p-3 bg-[#ede6da] border-t border-[#ded5c4] text-center">
          <p className="text-[11px] text-[#555047] font-medium">
            St. Gregorios Jacobite Syrian Orthodox Church
          </p>
        </div>
      </aside>
    </>
  );
}

