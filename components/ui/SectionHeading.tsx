import React from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  eyebrowColor?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  eyebrowColor = "text-[#a43a32]",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
      <h2 className="section-title mt-5">{title}</h2>
    </div>
  );
}
