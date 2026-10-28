"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MegaMenu from "@/components/global/MegaMenu";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on Escape key press and manage body scroll lock on mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isSolidHeader = scrolled || menuOpen;
  // On home page, logo is hidden when on hero (top) and appears on scroll or when menu opens. On other pages, logo is always visible.
  const isLogoVisible = isHomePage ? isSolidHeader : true;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isSolidHeader
        ? "bg-[#071b27] shadow-xl"
        : "bg-transparent border-b border-transparent shadow-none"
        }`}
    >
      {/* Top Header Bar */}
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        {/* Church Logo & Branding (Hidden only over Home Hero section, visible on other pages and on scroll) */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`group flex items-center gap-2 sm:gap-3.5 transition-opacity duration-300 min-w-0 pr-2 ${isLogoVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          <Image
            src="/logo/logo.png"
            alt="St. Gregorios Logo"
            width={48}
            height={48}
            className="h-8 w-8 sm:h-11 sm:w-11 lg:h-12 lg:w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="min-w-0">
            <div className="font-display text-base sm:text-xl lg:text-2xl font-bold tracking-wide text-white group-hover:text-[#d6b75b] transition-colors leading-tight truncate">
              St. Gregorios
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-white/80 tracking-wide truncate max-w-[170px] sm:max-w-none">
              Jacobite Syrian Orthodox Church
            </div>
          </div>
        </Link>

        {/* Centered Cross SVG */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 32"
            className="h-8 w-7 lg:h-10 lg:w-8 text-[#d6b75b] drop-shadow-sm"
            fill="currentColor"
            aria-label="Christian Cross"
          >
            {/* Simple Latin Cross */}
            {/* Vertical Beam */}
            <rect x="10.25" y="1" width="3.5" height="30" rx="1" />
            {/* Horizontal Arm */}
            <rect x="3" y="8.5" width="18" height="3.5" rx="1" />
          </svg>
        </div>

        {/* Quick Top Bar Navigation / Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle Navigation Menu"
            className="group inline-flex items-center gap-2 sm:gap-2.5 rounded-none bg-[#a53c33] px-3 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-semibold tracking-wider uppercase text-white hover:bg-[#8f322b] transition-colors cursor-pointer border border-white/10 shadow-lg active:scale-95"
          >
            <span className="relative block h-3.5 w-4 sm:h-4 sm:w-5 shrink-0">
              <span
                className={`absolute left-0 top-0 block h-[2px] w-full bg-white transition-all duration-300 ${menuOpen ? "top-[6px] sm:top-[7px] rotate-45" : ""
                  }`}
              />
              <span
                className={`absolute left-0 top-[6px] sm:top-[7px] block h-[2px] w-4/5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`absolute left-0 top-[12px] sm:top-[14px] block h-[2px] w-full bg-white transition-all duration-300 ${menuOpen ? "top-[6px] sm:top-[7px] -rotate-45" : ""
                  }`}
              />
            </span>
            <span className="whitespace-nowrap">
              {menuOpen ? (
                "Close"
              ) : (
                <>
                  <span className="sm:hidden">Menu</span>
                  <span className="hidden sm:inline">Menu &amp; Directory</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Full Width Mega Menu Overlay Dropdown */}
      <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}