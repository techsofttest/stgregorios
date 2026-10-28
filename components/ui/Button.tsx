import Link from "next/link";
import React from "react";

export type ButtonVariant = "black" | "white" | "secondary" | "tertiary";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  arrowClassName?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  showArrow?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  className = "",
  arrowClassName = "",
  variant = "black",
  type = "button",
  showArrow = true,
}: ButtonProps) {
  const variantStyles = {
    black:
      "bg-black text-white hover:bg-[#080b0d]/85 border border-black",
    white:
      "bg-white text-[#080b0d] hover:bg-[#f7f4ed] border border-white shadow-md",
    secondary:
      "bg-[#d6b75b] text-[#080b0d] hover:bg-[#e2c66e] border border-[#d6b75b]",
    tertiary:
      "bg-transparent text-current hover:bg-black/5 border border-current",
  };

  const combinedClasses = `group inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      <span className="underline underline-offset-4 decoration-current font-semibold">
        {children}
      </span>
      {showArrow && (
        <span className="grid grid-cols-[0fr] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:grid-cols-[1fr] group-hover:opacity-100 group-hover:ml-3">
          <span className="overflow-hidden text-lg whitespace-nowrap inline-block transition-transform duration-300 -translate-x-2 group-hover:translate-x-0">
            <span className={arrowClassName}>→</span>
          </span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}
