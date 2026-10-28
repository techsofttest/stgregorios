
"use client";

import { useEffect } from "react";

interface DetailStorySectionProps {
  content?: string;
  category?: string;
  title?: string;
  date?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailStorySection({
  content = "",
  category = "",
  title = "",
  date = "",
  isOpen,
  onClose,
}: DetailStorySectionProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm animate-in fade-in duration-300 sm:p-5 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-story-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden bg-white text-[#171715] shadow-2xl md:max-h-[88vh]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close story"
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center text-[#071b27] transition-all duration-300 hover:rotate-90 hover:text-[#a43a32] focus:outline-none focus:ring-2 focus:ring-[#d6b75b] sm:right-5 sm:top-5"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Heading */}
        <header className="shrink-0 border-b border-[#171715]/10 px-6 pb-5 pt-7 sm:px-9 sm:pb-6 sm:pt-9">
          {category && (
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a43a32] sm:text-xs">
              {category}
            </p>
          )}

          <div className="flex flex-col gap-3 pr-8 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="detail-story-title"
              className="font-display text-2xl font-bold leading-tight text-[#071b27] sm:text-3xl md:text-4xl"
            >
              {title || category || "Story Details"}
            </h2>

            {date && (
              <p className="shrink-0 text-xs font-medium uppercase tracking-wider text-[#777064]">
                {date}
              </p>
            )}
          </div>

          <div className="mt-5 h-[2px] w-14 bg-[#d6b75b]" />
        </header>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div
            className="
              story-html-content
              px-6 py-7 sm:px-9 sm:py-9 md:px-10

              [&_h2]:mb-5 [&_h2]:mt-8
              [&_h2]:font-display [&_h2]:text-2xl
              [&_h2]:font-semibold [&_h2]:leading-tight
              [&_h2]:text-[#071b27]

              [&_h3]:mb-4 [&_h3]:mt-8
              [&_h3]:font-display [&_h3]:text-xl
              [&_h3]:font-semibold [&_h3]:text-[#071b27]
              sm:[&_h3]:text-2xl

              [&_p]:mb-5 [&_p]:text-base
              [&_p]:leading-relaxed [&_p]:text-[#3d3a34]
              sm:[&_p]:text-lg

              [&_ol]:my-6 [&_ol]:list-decimal
              [&_ol]:space-y-3 [&_ol]:pl-6

              [&_ul]:my-6 [&_ul]:list-disc
              [&_ul]:space-y-3 [&_ul]:pl-6

              [&_li]:pl-2 [&_li]:leading-relaxed
              [&_li]:text-[#3d3a34]
              [&_li::marker]:text-[#a43a32]

              [&_hr]:my-8 [&_hr]:border-[#171715]/15

              [&_blockquote]:my-8 [&_blockquote]:border-l-2
              [&_blockquote]:border-[#d6b75b]
              [&_blockquote]:bg-[#f7f4ed] [&_blockquote]:py-4
              [&_blockquote]:pl-5 [&_blockquote]:pr-4
              [&_blockquote]:text-[#3d3a34]

              [&_p>strong]:font-display
              [&_p>strong]:font-semibold
              [&_p>strong]:text-[#a43a32]

              [&_a]:font-semibold [&_a]:text-[#a43a32]
              [&_a]:underline [&_a]:underline-offset-4
              [&_a:hover]:text-[#071b27]
            "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-[#171715]/10 bg-white px-6 py-4 sm:px-9">
          <span className="font-display text-lg text-[#d6b75b]" aria-hidden="true">
            ✠
          </span>

          <button
            type="button"
            onClick={onClose}
            className="bg-[#071b27] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-colors duration-300 hover:bg-[#a43a32] focus:outline-none focus:ring-2 focus:ring-[#d6b75b] focus:ring-offset-2"
          >
            Close Window
          </button>
        </footer>
      </section>
    </div>
  );
}
