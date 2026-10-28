import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function VisionSection({vission}:{vission:any}) {
  return (
    <section id="vision" className="relative bg-[#071b27] text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
        {/* Left: Text Information with container padding */}
        <div className="lg:col-span-7 flex flex-col justify-center py-20 lg:py-28 px-8 sm:px-12 lg:pl-16 lg:pr-12 xl:pl-24">
          <ScrollReveal direction="left" duration={800}>
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#d6b75b] text-xs font-bold uppercase tracking-widest">
                <span>✠</span>
                <span>{vission?.title ?? ""}</span>
              </div>

              <div
  className="
    section-title
    [&_h2]:mt-3
    [&_h2]:text-white
    [&_h2]:text-4xl
    sm:[&_h2]:text-6xl
    [&_h2_span]:text-[#d6b75b]

    [&_p]:mt-8 [&_p]:text-lg sm:[&_p]:text-2xl [&_p]:leading-relaxed [&_p]:text-white/95 [&_p]:font-display [&_p]:font-light [&_.text-small]:mt-8 [&_.text-small]:pt-6 [&_.text-small]:border-t [&_.text-small]:border-white/10 [&_.text-small]:flex [&_.text-small]:items-center [&_.text-small]:gap-2 [&_.text-small]:text-xs [&_.text-small]:tracking-wider [&_.text-small]:uppercase [&_.text-small]:text-[#d6b75b]
  "
  dangerouslySetInnerHTML={{
    __html: vission?.content || "",
  }}
/>
              
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Full Bleed Flush Image with no padding */}
        <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full w-full overflow-hidden bg-[#0c2433]">
          <Image
            src="/interior/Ornate Candlelit Chapel Altar.png"
            alt="Parish Gathering in Prayer"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
