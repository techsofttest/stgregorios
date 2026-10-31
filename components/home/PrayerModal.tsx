"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import FloatingInputField from "@/components/ui/FloatingInputField";
import FloatingTextarea from "@/components/ui/FloatingTextarea";

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrayerModal({ isOpen, onClose }: PrayerModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prayerFor, setPrayerFor] = useState("Health & Healing");
  const [requestText, setRequestText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport width for responsive mobile/desktop image swap (<768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close on Escape key press & prevent body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

        if (!apiBase) {
            throw new Error("The API URL is not configured.");
        }

        const response = await fetch(`${apiBase}/prayer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: fullName,
                email,
                phone,
                service: prayerFor,
                message: requestText,
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.error("Prayer API response:", data);
            alert(data.message || "Please check the submitted information.");
            return;
        }

        setIsSubmitted(true);

    } catch (error) {
        console.error("Prayer request error:", error);
        alert(
            error instanceof Error
                ? error.message
                : "Unable to submit prayer request. Please try again."
        );
    } finally {
        setIsSubmitting(false);
    }
};


  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPrayerFor("Health & Healing");
    setRequestText("");
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prayer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white text-[#171715] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:max-h-[88vh]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-30 w-10 h-10 flex items-center justify-center text-[#071b27] hover:rotate-90 hover:cursor-pointer transition-all duration-500"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Column: Pure Image (st-gregorios-l.png on mobile under 768px, st-gregorios2.png on desktop) */}
        <div className="relative w-full md:w-5/12 h-48 sm:h-56 md:h-auto min-h-[220px] md:min-h-full flex-shrink-0 bg-[#071b27]">
          <Image
            key={isMobile ? "mobile" : "desktop"}
            src={isMobile ? "/st-gregorios/st-gregorios-l.png" : "/st-gregorios/st-gregorios2.png"}
            alt="Candlelit Altar Shrine"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Prayer Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center h-full">
              <span className="font-display text-4xl text-[#d6b75b]">✠</span>
              <h3 id="prayer-modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-[#071b27] mt-4">
                Prayer Request Received
              </h3>
              <p className="mt-3 text-sm text-[#171715]/75 leading-relaxed max-w-md">
                Thank you, <span className="font-semibold text-[#071b27]">{fullName}</span>. Your intentions have been recorded and will be remembered during the holy intercession and Holy Qurbana at St. Gregorios Church.
              </p>
              <div className="mt-6 p-4 bg-[#e9e3d7]/60 border-l-2 border-[#d6b75b] text-left text-xs text-[#171715]/80 italic">
                “The prayer of a righteous person is powerful and effective.” — James 5:16
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-8 px-8 py-3 bg-[#071b27] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#a43a32] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              <div className="pb-4 mb-6">
                <h3 id="prayer-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-[#071b27]">
                  Submit Prayer Request
                </h3>
                <p className="text-xs sm:text-sm text-[#171715]/85 mt-1 font-normal">
                  Share your intentions with our parish clergy and prayer fellowship.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Floating Input */}
                <FloatingInputField
                  id="prayer-name"
                  label="Your Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                {/* Email & Phone Floating Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <FloatingInputField
                    id="prayer-email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FloatingInputField
                    id="prayer-phone"
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* Intentions Category */}
                <div className="relative w-full">
                  <select
                    id="prayer-category"
                    value={prayerFor}
                    onChange={(e) => setPrayerFor(e.target.value)}
                    className="peer w-full px-3.5 pt-5 pb-2 bg-white border border-[#171715]/40 text-[#171715] font-medium text-sm focus:outline-none focus:border-[#071b27] focus:ring-1 focus:ring-[#071b27] transition-all rounded-none appearance-none"
                  >
                    <option value="Health & Healing">Health &amp; Healing</option>
                    <option value="Thanksgiving">Thanksgiving &amp; Praise</option>
                    <option value="Family & Peace">Family &amp; Peace</option>
                    <option value="Memorial & Remembrance">Memorial &amp; Departed Souls</option>
                    <option value="Guidance & Strength">Spiritual Guidance &amp; Strength</option>
                    <option value="General Petition">Other Special Intentions</option>
                  </select>
                  <label
                    htmlFor="prayer-category"
                    className="absolute left-3.5 top-3.5 text-[#171715]/80 text-xs font-semibold uppercase tracking-wider transition-all duration-200 pointer-events-none origin-[0] transform -translate-y-2.5 scale-75 select-none"
                  >
                    Prayer Intention For
                  </label>
                  {/* Select dropdown caret */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#171715]/80">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Prayer Request Details Floating Textarea */}
                <FloatingTextarea
                  id="prayer-details"
                  label="Prayer Details / Notes"
                  required
                  rows={3}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                />

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm underline font-semibold text-[#171715] hover:text-[#a43a32] transition-colors hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-2.5 bg-[#d6b75b] text-[#071b27] hover:bg-[#c9a744] hover:text-black font-semibold text-sm  transition-colors duration-200 shadow-sm disabled:opacity-50 hover:cursor-pointer"
                  >
                    {isSubmitting ? "Submitting..." : "Send Prayer Request"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
