"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import DonationModal from "./DonationModal";

interface Data {
  subtitle: string;
  title: string;
  content?: string;
  detail?: {
    title: string;
    option: string;
    description: string;
  }[];
  image?: string;
}

interface DataProp {
  donation?: Data[];
  payment?: Data;
}

export default function DonationsTabSection({ donation, payment }: DataProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isQrVisible, setIsQrVisible] = useState(false);

  const Tab = [
    { id: "charity", tabLabel: "Charity" },
    { id: "donation", tabLabel: "Donations" },
  ];
  
  const [activeTabId, setActiveTabId] = useState<string>("students");

  const activeIndex = Tab.findIndex((tab) => tab.id === activeTabId);
  const activeDonation = donation?.[activeIndex] || donation?.[0];
  const activeTabObj = Tab.find((t) => t.id === activeTabId) || Tab[0];

  useEffect(() => {
    const el = document.getElementById("payment-qr-section");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsQrVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTabId]);

  // Close QR modal on ESC key & prevent body scrolling
  useEffect(() => {
    if (!isQrModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsQrModalOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQrModalOpen]);

  return (
    <section className="pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-16">
        {/* 4 Category Tabs */}
        <ScrollReveal direction="up" duration={700}>
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-8 pb-px mb-12 sm:mb-16 border-b border-[#171715]/15">
            {Tab.map((cause) => {
              const isActive = cause.id === activeTabId;
              return (
                <button
                  key={cause.id}
                  onClick={() => setActiveTabId(cause.id)}
                  type="button"
                  className={`group relative pb-2.5 px-3 sm:px-4 text-base sm:text-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2.5 ${
                    isActive
                      ? "text-[#071b27] font-semibold"
                      : "text-[#171715]/80 hover:text-[#071b27]"
                  }`}
                >
                  <span
                    className={`text-xs transition-colors ${
                      isActive ? "text-[#a43a32]" : "text-[#171715]/30 group-hover:text-[#a43a32]"
                    }`}
                  >
                    ✠
                  </span>
                  <span>{cause.tabLabel}</span>

                  {/* Active bottom underline indicator */}
                  {isActive && (
                    <span className="absolute -bottom-px left-0 right-0 h-px bg-[#a43a32]" />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Tab Content: Left Title & Description + Right Payment QR */}
        <div key={activeTabId} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column (7 cols): Title & Description */}
          <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-[#a43a32] text-xs font-bold uppercase tracking-widest">
                <span>✠</span>
                <span>{activeDonation?.title}</span>
              </div>

              <h2
                className="section-title mt-3 text-[#1c1a17] [&_span]:text-[#a43a32]"
                dangerouslySetInnerHTML={{ __html: activeDonation?.subtitle ?? "" }}
              />
              <div
  className="mt-8 
    grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-4
    
    [&>p]:col-span-full [&>p]:text-base [&>p]:sm:text-lg [&>p]:leading-relaxed [&>p]:text-[#2c2a26] [&>p]:font-display [&>p]:font-light 
    
    [&>p>strong]:col-span-full [&>p>strong]:text-left [&>p>strong]:text-xs [&>p>strong]:font-bold [&>p>strong]:tracking-[0.2em] [&>p>strong]:uppercase [&>p>strong]:text-[#a43a32]
    
    /* Horizontal Rules */
    [&>hr]:col-span-full  [&>hr]:border-t [&>hr]:border-[#171715]/10 
    [&>p>i]:mt-8 [&>p>i]:py-1 [&>p>i]:text-sm [&>p>i]:sm:text-base [&>p>i]:leading-relaxed [&>p>i]:text-[#454038] [&>p>i]:italic
    /* Unordered Lists */
    [&>ul]:col-span-full [&>ul]:mt-5 [&>ul]:grid [&>ul]:sm:grid-cols-1 [&>ul]:gap-x-6 [&>ul]:gap-y-3.5 
    [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-2.5 [&>ul>li]:text-sm [&>ul>li]:sm:text-[15px] [&>ul>li]:leading-relaxed [&>ul>li]:text-[#3d3932] 
    [&>ul>li]:before:content-['✠'] [&>ul>li]:before:text-[#a43a32] [&>ul>li]:before:text-sm [&>ul>li]:before:font-bold [&>ul>li]:before:select-none [&>ul>li]:before:mt-0.5
            
    [&>blockquote:not(:has(p+p))]:col-span-full [&>blockquote:not(:has(p+p))]:py-1 [&>blockquote:not(:has(p+p))]:text-sm [&>blockquote:not(:has(p+p))]:sm:text-base [&>blockquote:not(:has(p+p))]:leading-relaxed [&>blockquote:not(:has(p+p))]:text-[#454038] [&>blockquote:not(:has(p+p))]:italic
    [&>blockquote]:pt-6 [&>blockquote]:flex [&>blockquote>p]:flex-col [&>blockquote>p>i]:sm:flex-row 
                  [&>blockquote]:sm:justify-between  [&>blockquote]:gap-2 [&>blockquote>p>strong]:text-xs  [&>blockquote>p>strong]:font-bold  [&>p>strong]:uppercase  [&>blockquote>p>strong]:tracking-widest  [&>blockquote>p>strong]:text-[#a43a32]  [&>p>strong]:whitespace-nowrap
                  [&>blockquote>p>i]:font-display [&>blockquote>p>i]:sm:text-lg [&>blockquote>p>i]:text-[#1c1a17] [&>blockquote>p>i]: text-sm [&>blockquote>p>i]:italic  [&>p>strong]:text-xs  [&>p>strong]:font-bold  [&>p>strong]:uppercase  [&>p>strong]:tracking-widest  [&>p>strong]:text-[#a43a32]  [&>p>strong]:whitespace-nowrap 

    [&>figure]:col-span-full sm:[&>figure]:col-span-6 [&>figure]:my-4 [&>figure]:overflow-hidden [&>figure]:flex [&>figure]:flex-col [&>figure]:bg-transparent
    [&>figure>img]:w-full [&>figure>img]:aspect-[4/3] [&>figure>img]:object-cover [&>figure>img]:object-center [&>figure>img]:bg-[#071b27] [&>figure>img]:transition-transform [&>figure>img]:duration-500 [&>figure>img]:ease-out hover:[&>figure>img]:scale-105
    [&>figure>figcaption]:pt-2 [&>figure>figcaption]:text-sm [&>figure>figcaption]:text-[#171715] [&>figure>figcaption]:leading-snug"
  dangerouslySetInnerHTML={{ __html: activeDonation?.content ?? "" }}
/>
          </div>

          {/* Right Column (5 cols): Payment QR Card */}
          <div id="payment-qr-section" className="lg:col-span-5 h-full scroll-mt-28">
            <div className="lg:sticky lg:top-24 self-start">
              <div className="bg-[#f7f4ed] p-8 sm:p-10 flex flex-col items-center text-center">
                <h3 className="font-display text-2xl font-bold text-[#071b27] mt-1.5">
                  Scan to Contribute
                </h3>

                <p className="mt-1 text-xs text-[#171715]/75 max-w-xs">
                  Paytm · Google Pay · PhonePe · BHIM UPI
                </p>

                {/* QR Code Graphic */}
                <div
                  onClick={() => setIsQrModalOpen(true)}
                  title="Click to view QR in full screen"
                  className="group relative mt-7 w-64 h-80 sm:w-72 sm:h-80 bg-white p-3 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/qr-mock/qr-students.png"
                      alt="Payment QR Code"
                      fill
                      sizes="320px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 text-white">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-xs font-bold">Click to Enlarge</span>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-[#171715]/55">
                  Click the QR code to open in full screen
                </p>

                {/* Direct UPI ID Row */}
                <div className="mt-5 w-full bg-white px-5 py-3 flex items-center justify-between text-xs">
                  <span className="text-[#171715]/60 font-medium">UPI ID</span>
                  <span className="font-mono font-bold text-[#071b27] tracking-tight select-all">
                    jacobitesyrian1@fbi
                  </span>
                </div>

                <div className="mt-3.5 w-full text-left bg-white px-5 py-4 text-xs space-y-1.5 text-[#171715]/80">
                  <div className="font-bold text-[#071b27] pb-1 uppercase tracking-wider text-[11px]">
                    Direct Bank Wire (NEFT / RTGS)
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#171715]/60">A/C Name</span>
                    <span className="font-medium text-[#071b27] text-right truncate ml-2">
                      St. Gregorios Jacobite Syrian Orthodox Church
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#171715]/60">A/C No</span>
                    <span className="font-mono font-bold text-[#071b27]">
                      15390100071776
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#171715]/60">Bank &amp; Branch</span>
                    <span className="font-medium text-[#071b27] text-right">
                      Federal Bank, Mulund, Mumbai
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#171715]/60">IFSC Code</span>
                    <span className="font-mono font-bold text-[#071b27]">
                      FDRL0001539
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="black"
                  className="mt-6 w-full py-3.5"
                >
                  Submit Payment Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Island: Quick QR Access Bar */}
      <aside
        aria-label="Quick payment access"
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 lg:hidden flex items-center shadow-2xl rounded-full bg-[#071b27]/95 text-white backdrop-blur-md px-2 py-1.5 gap-1 sm:gap-2 max-w-[94vw] transition-all duration-300 ease-out ${
          isQrVisible
            ? "opacity-0 translate-y-8 pointer-events-none"
            : "opacity-100 translate-y-0 pointer-events-auto"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsQrModalOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full bg-[#a43a32] hover:bg-[#8f322b] text-white px-3.5 py-2 text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-md"
        >
          <svg className="w-4 h-4 text-[#f0d984]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <span className="whitespace-nowrap">View QR Code</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("payment-qr-section");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="inline-flex items-center gap-1.5 rounded-full hover:bg-white/10 px-3 py-2 text-xs font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
        >
          <span className="whitespace-nowrap">Bank Info</span>
          <svg className="w-3.5 h-3.5 text-[#d6b75b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </aside>

      {/* Full Screen Modal */}
      {isQrModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full screen payment QR code"
          onClick={() => setIsQrModalOpen(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        >
          <button
            type="button"
            onClick={() => setIsQrModalOpen(false)}
            aria-label="Close full screen view"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-[#a43a32] text-white transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 max-w-md w-full flex flex-col items-center text-center shadow-2xl"
          >
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#071b27] mt-1 mb-1">
              {activeTabObj.tabLabel} QR Code
            </h3>

            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] bg-white flex items-center justify-center">
              <Image
                src="/qr-mock/qr-students.png"
                alt={`Full screen QR for ${activeTabObj.tabLabel}`}
                fill
                priority
                sizes="(max-width: 640px) 288px, 320px"
                className="object-contain"
              />
            </div>

            <div className="mt-5 w-full bg-[#f7f4ed] px-4 py-2.5 flex items-center justify-between text-xs">
              <span className="text-[#171715]/60 font-medium">UPI ID</span>
              <span className="font-mono font-bold text-[#071b27] select-all">
                jacobitesyrian1@fbi
              </span>
            </div>

            <Button
              onClick={() => setIsQrModalOpen(false)}
              variant="black"
              showArrow={false}
              className="mt-6 w-full py-3 text-xs"
            >
              Close Window
            </Button>
          </div>
        </div>
      )}

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}