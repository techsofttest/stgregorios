"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

interface FloatingInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingInputField = forwardRef<HTMLInputElement, FloatingInputFieldProps>(
  ({ label, id, required, className = "", value, placeholder, ...props }, ref) => {
    // We use placeholder=" " if none is provided so CSS :placeholder-shown works seamlessly
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          id={id}
          required={required}
          value={value}
          placeholder={placeholder || " "}
          className={`peer w-full px-3.5 pt-5 pb-2 bg-white border border-[#171715]/40 text-[#171715] text-sm focus:outline-none focus:border-[#071b27] focus:ring-1 focus:ring-[#071b27] transition-all rounded-none ${className}`}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute left-3.5 top-3.5 text-[#171715]/80 text-xs sm:text-sm font-normal transition-all duration-200 pointer-events-none origin-[0] transform -translate-y-2.5 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#171715]/70 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#071b27] peer-focus:font-bold select-none"
        >
          {label}
          {required && <span className="text-[#a43a32] ml-0.5">*</span>}
        </label>
      </div>
    );
  }
);

FloatingInputField.displayName = "FloatingInputField";

export default FloatingInputField;
