import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ContactHeroProps {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
}

export default function ContactHero({hero}: {hero:any}) {
  return (
    <section className="relative w-full bg-[#071b27] text-white pt-32 pb-12 sm:pt-28 sm:pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden">
      {/* Background Sanctuary Image with Dark Overlays (Matching NewsHero & GalleryHero) */}
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
          <p className="eyebrow text-[#d6b75b]">{hero.title ?? ""}</p>
          <div className="[&_h1]:font-display [&_h1]:text-3xl [&_h1]:sm:text-5xl [&_h1]:lg:text-6xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-white [&_h1]:mt-4 [&_span]:text-[#d6b75b] [&_p]:mt-5 [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-white/80 [&_p]:max-w-2xl [&_p]:mx-auto [&_p]:leading-relaxed" dangerouslySetInnerHTML={{__html:hero?.content ?? "" }} />
          
        </ScrollReveal>
      </div>
    </section>
  );
}
