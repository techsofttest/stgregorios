import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface EventsHeroProps {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
}

export default function EventsHero({hero}: {hero:any}) {
  return (
    <section className="relative w-full bg-[#071b27] text-white pt-32 pb-12 sm:pt-28 sm:pb-12 px-6 sm:px-12 lg:px-16 overflow-hidden">
      {/* Background Sanctuary/Parish Image with Dark Overlays (Matching NewsHero) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/interior/Symmetrical Syrian Orthodox Sanctuary.png"
          alt="Parish Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071b27]/90 via-[#071b27]/75 to-[#071b27]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#071b27]/50 to-[#071b27]" />
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <ScrollReveal direction="up" duration={800}>
          <p className="eyebrow text-[#d6b75b]">{hero.title}</p>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white mt-4 [&_span]:text-[#d6b75b]" dangerouslySetInnerHTML={{__html:hero?.subtitle ?? ""}} />
          <div className="mt-5 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed"dangerouslySetInnerHTML={{__html:hero?.content ?? ""}} />
        </ScrollReveal>
      </div>
    </section>
  );
}
