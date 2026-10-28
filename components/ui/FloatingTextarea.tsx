"use client";

import React, { TextareaHTMLAttributes, forwardRef } from "react";

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, id, required, className = "", value, placeholder, rows = 3, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          id={id}
          required={required}
          rows={rows}
          value={value}
          placeholder={placeholder || " "}
          className={`peer w-full px-3.5 pt-6 pb-2 bg-white border border-[#171715]/40 text-[#171715] text-sm focus:outline-none focus:border-[#071b27] focus:ring-1 focus:ring-[#071b27] transition-all resize-none rounded-none ${className}`}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute left-3.5 top-3.5 text-[#171715]/80 text-xs sm:text-sm font-normal transition-all duration-200 pointer-events-none origin-[0] transform -translate-y-2 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#171715]/70 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-[#071b27] peer-focus:font-bold select-none"
        >
          {label}
          {required && <span className="text-[#a43a32] ml-0.5">*</span>}
        </label>
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

export default FloatingTextarea;
