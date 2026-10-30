import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface DetailStorySectionProps {
  content?: string;
  category?: string;
}

export default function DetailStorySection({ content = "",category="" }: DetailStorySectionProps) {
  return (
    <section id="detail-story-section" className="relative py-24 lg:py-24 bg-[#f7f4ed] overflow-hidden">
      <div className="fixed inset-0 h-screen w-full z-0 pointer-events-none opacity-[0.1] mix-blend-multiply overflow-hidden">
        <Image
          src="/sketch/sk1.png"
          alt=""
          fill
          priority={false}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ed] via-transparent to-[#f7f4ed]" />
      </div>

      {/* Rotating Syriac Rosette in Background Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.045] text-[#d6b75b]">
        <svg
          width="750"
          height="750"
          viewBox="0 0 500 500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-[spin_90s_linear_infinite]"
        >
          <circle cx="250" cy="250" r="230" />
          <circle cx="250" cy="250" r="215" strokeDasharray="4 6" />
          <circle cx="250" cy="250" r="175" />
          <circle cx="250" cy="250" r="120" />
          <circle cx="250" cy="250" r="60" />
          <g strokeWidth="2">
            <line x1="250" y1="20" x2="250" y2="480" />
            <line x1="20" y1="250" x2="480" y2="250" />
            <line x1="87" y1="87" x2="413" y2="413" />
            <line x1="87" y1="413" x2="413" y2="87" />
          </g>
          <circle cx="250" cy="130" r="55" />
          <circle cx="250" cy="370" r="55" />
          <circle cx="130" cy="250" r="55" />
          <circle cx="370" cy="250" r="55" />
        </svg>
      </div>

      {/* Ambient Sanctuary Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#d6b75b]/10 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-[#a43a32]/10 blur-3xl pointer-events-none animate-[pulse_10s_ease-in-out_infinite]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 sm:px-12 lg:px-16 flex justify-center">
        <div className="w-full max-w-3xl">
          
          {/* Render HTML content directly with styling wrappers */}
          <ScrollReveal direction="up">
             <p className="eyebrow text-[#a43a32] text-center ">{category}</p>
            <div 
              className="story-html-content 
                [&_h2]:mb-6 [&_h2]:text-center [&>h2]:font-['Cinzel',var(--font-display),Georgia,serif] 
                [&>h2]:text-[clamp(2.2rem,4vw,3.8rem)] [&>h2]:font-semibold [&>h2]:leading-[1.05] 
                [&>h2]:tracking-[-0.02em][&_h2]:font-display [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-tight sm:[&_h2]:text-4xl
                [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:font-display
                [&_h3]:text-xl  [&_h3]:text-[#1a1916]
                sm:[&_h3]:text-2xl
                [&>ul]:mt-6 [&>ul]:grid [&>ul]:sm:grid-cols-2 [&>ul]:gap-x-10 [&>ul]:gap-y-5 
                [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-3 [&>ul>li]:text-base [&>ul>li]:sm:text-[17px] [&>ul>li]:leading-relaxed [&>ul>li]:text-[#3d3932] 
                [&>ul>li]:before:content-['✠'] [&>ul>li]:before:text-[#a43a32] [&>ul>li]:before:text-sm [&>ul>li]:before:font-bold [&>ul>li]:before:select-none [&>ul>li]:before:mt-0.5 
                [&>ul>li>strong]:text-[#a43a32]
                [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6
                [&_ol]:space-y-3
                [&_ol>li]:pl-2 [&_ol>li]:text-base [&_ol>li]:leading-relaxed
                [&_ol>li]:text-[#3d3a34] sm:[&_ol>li]:text-lg
                [&_ol>li::marker]:font-semibold [&_ol>li::marker]:text-[#a43a32]
                [&_p]:mt-5 [&_p]:text-base [&_p]:leading-relaxed
                [&_p]:text-[#3d3a34] sm:[&_p]:text-lg
                [&_hr]:my-8 [&_hr]:border-[#171715]/15
                [&_figure]:my-8 [&_figure]:overflow-hidden
                [&_figure]:bg-[#e9e3d7]
                [&_figure_img]:h-auto [&_figure_img]:w-full
                [&_figure_img]:object-cover
                [&>p>strong]:font-display [&>p>strong]:text-lg [&>p>strong]:sm:text-xl [&>p>strong]:font-semibold [&>p>strong]:text-[#a43a32]
                [&>p>i]:font-display [&>p>i]:italic [&>p>i]:text-base [&>p>i]:sm:text-lg [&>p>i]:text-[#1a1916] [&>p>i]:font-medium [&>p>i]:pt-1
                /* Blockquote & Scripture Citations */
                [&>blockquote]:mt-10 [&>blockquote]:pt-2 [&>blockquote>p>i]:font-display [&>blockquote>p>i]:italic [&>blockquote>p>i]:text-lg [&>blockquote>p>i]:sm:text-xl [&>blockquote>p>i]:text-[#1a1916]
                [&>p>span.text-small>strong]:mt-1 [&>p>span.text-small>strong]:text-xs [&>p>span.text-small>strong]:font-bold [&>p>span.text-small>strong]:uppercase [&>p>span.text-small>strong]:tracking-widest [&>p>span.text-small>strong]:text-[#a43a32]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}