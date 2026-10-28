"use client";

import { useEffect, useState, FormEvent, useRef } from "react";
import Image from "next/image";
import FloatingInputField from "@/components/ui/FloatingInputField";
import FloatingTextarea from "@/components/ui/FloatingTextarea";

// Updated type definition to include optional badge & title
type CauseTab = {
  id: string;
  tabLabel: string;
  badge?: string;
  title?: string;
};

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cause: CauseTab;
}

export default function DonationModal({ isOpen, onClose, cause }: DonationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track viewport width for responsive mobile/desktop image swap (<768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close on Escape key press & prevent background scrolling
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("amount", amount);
      formData.append("transaction_id", transactionId);
      formData.append("cause", cause.tabLabel);
      formData.append("notes", notes);

      if (screenshotFile) {
        formData.append("attachment", screenshotFile);
      }

      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

      if (!apiBase) {
        throw new Error("The API URL is not configured.");
      }

      const response = await fetch(`${apiBase}/send`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your donation details."
        );
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Donation submission failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to submit your donation details. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setAmount("");
    setTransactionId("");
    setScreenshotFile(null);
    setNotes("");
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
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

        {/* Left Column: Pure Image */}
        <div className="relative w-full md:w-5/12 h-48 sm:h-56 md:h-auto min-h-[220px] md:min-h-full flex-shrink-0 bg-[#071b27]">
          <Image
            key={isMobile ? "mobile" : "desktop"}
            src={isMobile ? "/st-gregorios/st-gregorios-l.png" : "/st-gregorios/st-gregorios2.png"}
            alt="St. Gregorios of Parumala"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Donation Confirmation Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center h-full">
              <span className="font-display text-4xl text-[#d6b75b]">✠</span>
              <h3 id="donation-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-[#071b27] mt-4">
                Thank You for Your Generosity
              </h3>
              <p className="mt-3 text-sm text-[#171715]/85 leading-relaxed max-w-md">
                Dear <span className="font-semibold text-[#071b27]">{fullName}</span>, your donation details for <span className="font-semibold text-[#a43a32]">{cause.tabLabel}</span> have been recorded. Our church trustees will verify the transaction and issue an official receipt.
              </p>
              {transactionId && (
                <div className="mt-4 px-4 py-2 bg-[#f7f4ed] border border-[#171715]/10 text-xs font-mono text-[#071b27]">
                  Transaction Ref: <span className="font-bold">{transactionId}</span>
                </div>
              )}
              <div className="mt-6 p-4 bg-[#f7f4ed] border-l-2 border-[#d6b75b] text-left text-xs text-[#171715]/85 italic">
                “Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” — 2 Corinthians 9:7
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-8 px-8 py-3 bg-[#071b27] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#a43a32] transition-colors hover:cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              <div className="pb-4 mb-5 border-b border-[#171715]/10">
                {cause.badge && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a43a32]">
                    {cause.badge}
                  </span>
                )}
                <h3 id="donation-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-[#071b27] mt-1">
                  Confirm Your Donation
                </h3>
                <p className="text-xs sm:text-sm text-[#171715]/85 mt-1 font-normal">
                  Submit your payment details after scanning the QR code or transferring via UPI / Bank.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FloatingInputField
                  id="donation-name"
                  label="Your Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <FloatingInputField
                    id="donation-email"
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FloatingInputField
                    id="donation-phone"
                    label="Phone Number"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <FloatingInputField
                    id="donation-amount"
                    label="Amount Contributed (₹)"
                    type="number"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <FloatingInputField
                    id="donation-txn"
                    label="UPI / Bank Txn ID (Optional)"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171715]/80 mb-1.5">
                    Upload Payment Screenshot (Optional)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-3.5 border border-dashed border-[#171715]/35 hover:border-[#071b27] bg-[#f7f4ed]/60 hover:bg-[#f7f4ed] transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 text-[#171715]/75 truncate">
                      <svg className="w-5 h-5 flex-shrink-0 text-[#071b27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">
                        {screenshotFile ? screenshotFile.name : "Choose screenshot image or PDF"}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-white border border-[#171715]/20 font-bold uppercase tracking-wider text-[10px] text-[#071b27] flex-shrink-0">
                      Browse
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    id="donation-file"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const allowedTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                        "image/gif",
                        "application/pdf",
                      ];

                      if (!allowedTypes.includes(file.type)) {
                        alert("Please select a JPG, PNG, WEBP, GIF image or PDF.");
                        e.currentTarget.value = "";
                        setScreenshotFile(null);
                        return;
                      }

                      if (file.size > 5 * 1024 * 1024) {
                        alert("The attachment must be 5 MB or smaller.");
                        e.currentTarget.value = "";
                        setScreenshotFile(null);
                        return;
                      }

                      setScreenshotFile(file);
                    }}
                  />
                </div>

                <FloatingTextarea
                  id="donation-notes"
                  label="Special Intentions / Notes for Parish (Optional)"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

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
                    className="px-7 py-2.5 bg-[#d6b75b] text-[#071b27] hover:bg-[#c9a744] hover:text-black font-semibold text-sm transition-colors duration-200 shadow-sm disabled:opacity-50 hover:cursor-pointer"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Confirmation"}
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