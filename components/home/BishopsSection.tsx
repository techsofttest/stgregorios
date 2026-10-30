import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Bishop {
  name: string;
  title: string;
  image: string;
  description: string;
  link?: string;
}

export default function BishopsSection({clergy}:{clergy:any[]}) {


  return (
    <section className="relative bg-[#f7f4ed] py-20 lg:py-28 overflow-hidden">
      {/* Background Design Element: Filled Syriac/Orthodox Cross SVG on Left Side */}
      <div className="absolute top-1/2 -left-16 sm:-left-12 lg:-left-6 -translate-y-1/2 pointer-events-none opacity-[0.05] text-[#a43a32]">
        <svg
          width="400"
          height="540"
          viewBox="0 0 200 280"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central Glory Ring / Nimbus */}
          <circle cx="100" cy="90" r="34" opacity="0.25" />
          <circle cx="100" cy="90" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />

          {/* Vertical Beam */}
          <rect x="91" y="20" width="18" height="235" rx="2" />
          <rect x="94" y="15" width="12" height="245" rx="1" />

          {/* Main Horizontal Crossbar */}
          <rect x="30" y="81" width="140" height="18" rx="2" />
          <rect x="25" y="84" width="150" height="12" rx="1" />

          {/* Top Inscription Bar / Titulus */}
          <rect x="72" y="42" width="56" height="12" rx="2" />
          <rect x="70" y="44" width="60" height="8" rx="1" opacity="0.7" />

          {/* Slanted Footrest Bar (Suppedaneum) */}
          <polygon points="50,212 150,190 150,206 50,228" />

          {/* Terminals */}
          <circle cx="100" cy="8" r="9" />
          <circle cx="89" cy="14" r="7.5" />
          <circle cx="111" cy="14" r="7.5" />

          <circle cx="16" cy="90" r="9" />
          <circle cx="23" cy="79" r="7.5" />
          <circle cx="23" cy="101" r="7.5" />

          <circle cx="184" cy="90" r="9" />
          <circle cx="177" cy="79" r="7.5" />
          <circle cx="177" cy="101" r="7.5" />

          <circle cx="100" cy="270" r="9" />
          <circle cx="89" cy="264" r="7.5" />
          <circle cx="111" cy="264" r="7.5" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-8 sm:px-12 lg:px-16">
        <ScrollReveal direction="up" duration={800}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[#a43a32]">Spiritual Leadership</p>
            <h2 className="section-title mt-4 mb-16">
              Our Hierarchs
            </h2>
          </div>
        </ScrollReveal>

        {/* Patriarch Feature Card (Universal Syriac Orthodox Church) */}
        <div className="mb-12 lg:mb-12 bg-[#e9e3d7] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
            {/* Image Container (Top on mobile, Right Side on lg) */}
            <ScrollReveal direction="right" delay={200} duration={850} className="order-1 lg:order-2 h-full w-full flex items-center justify-end">
              <div className="relative aspect-4/3 sm:aspect-square w-full h-full min-h-[280px] sm:min-h-[420px] overflow-hidden">
                <Image
                  src={clergy?.[0].image || ""}
                  alt={clergy?.[0].title || ""}
                  fill
                  priority
                  className="object-cover grayscale-[15%]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="hidden lg:block absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#e9e3d7] via-[#e9e3d7]/40 to-transparent pointer-events-none" />
                <div className="lg:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#e9e3d7] to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>

            {/* Content Container (Bottom on mobile, Left Side on lg) */}
            <div className="order-2 lg:order-1 flex items-center px-6 py-10 sm:px-12 sm:py-16 lg:px-16 xl:px-20">
              <ScrollReveal direction="left" duration={850}>
                <div className="max-w-[650px]">
                  <p className="eyebrow text-[#a43a32]">{clergy?.[0].designation || ""}</p>

                  <h2 className="section-title mt-4 [&_span]:text-[#a43a32]" dangerouslySetInnerHTML={{__html:clergy?.[0].name || ""}} />

                  <div className="[&_p>strong]:mt-5 [&_p>strong]:hidden   [&_p>strong]:text-xs [&_p>strong]:font-semibold [&_p>strong]:tracking-[0.15em] [&_p>strong]:text-[#4d4840] [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-[#3d3932]"
  dangerouslySetInnerHTML={{ __html: clergy?.[0].content || "" }}/>
                  <Button href={clergy?.[0].slug || "/"} variant="black" className="mt-8">
                    Read his story
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Bento Grid*/}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column (Catholicos of the East - Large Prominent Card) */}
          <ScrollReveal
            direction="left"
            delay={200}
            duration={850}
            className="lg:col-span-6 h-full"
          >
            <div className="group relative overflow-hidden h-full min-h-[500px] sm:min-h-[620px] lg:min-h-[680px] transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-end bg-[#1c1a17]">
              {/* Full Bleed Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={clergy?.[1].image}
                  alt={clergy?.[1].name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Bottom Gradient Overlay for optimal legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 via-45% to-transparent pointer-events-none" />

              {/* Content Container placed at the bottom over gradient */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 transition-transform duration-500 ease-out group-hover:translate-x-1">
                <div className="max-w-[400px]">
                  <p className="eyebrow text-white">
                    {clergy?.[1].designation}
                  </p>

                  <h2 className="font-display text-2xl sm:text-4xl font-semibold leading-tight mt-2 text-white transition-colors duration-300 group-hover:text-[#f3d882]">
                    {clergy?.[1].name}
                  </h2>

                  <div className="[&_p]:mt-2.5 [&_p]:text-xs [&_p]:sm:text-[13px] [&_p]:leading-relaxed [&_p]:text-white/85 [&_p_strong]:hidden" dangerouslySetInnerHTML={{__html:clergy?.[1].content ?? ""}} />

                  <div className="mt-5">
                    <Link
                      href={clergy?.[1].slug || "/about"}
                      className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#e1c66c] hover:text-[#fff] transition-colors group/btn"
                    >
                      <span>Read More</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Stacked Bento Cards (Metropolitan on Top, Vicar Below) */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8">
            {/* Top Right: Metropolitan (Increased Height / Prominent) */}
            <ScrollReveal direction="right" delay={300} duration={850} className="flex-[1.25]">
              <div className="group grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr] bg-[#e9e3d7] hover:bg-[#ede8de] overflow-hidden h-full min-h-[340px] sm:min-h-[390px] transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1.5">
                {/* Image Container (Top on mobile, Right on sm and up) */}
                <div className="order-1 sm:order-2 relative aspect-4/3 sm:aspect-auto min-h-[260px] sm:min-h-[380px] w-full overflow-hidden bg-[#ded7c9]">
                  <Image
                    src={clergy?.[2].image}
                    alt={clergy?.[2].name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content Container (Bottom on mobile, Left on sm and up) */}
                <div className="order-2 sm:order-1 flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-10 transition-transform duration-500 ease-out group-hover:translate-x-1">
                  <div className="max-w-[340px]">
                    <p className="eyebrow text-[#a43a32]">
                      {clergy?.[2].designation}
                    </p>

                    <h2 className="font-display text-xl sm:text-3xl font-semibold leading-tight mt-1.5 text-[#1c1a17] transition-colors duration-300 group-hover:text-[#8a2f28]">
                      {clergy?.[2].name}
                    </h2>

                    <div className="[&_p]:mt-2.5 [&_p]:text-xs [&_p]:sm:text-[13px] [&_p]:leading-relaxed t[&_p]:ext-[#524c43] [&_p_strong]:hidden" dangerouslySetInnerHTML={{__html:clergy?.[1].content ?? ""}} />

                    <div className="mt-5">
                      <Link
                        href={clergy?.[2].slug || "/about"}
                        className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#a43a32] hover:text-[#78241d] transition-colors group/btn"
                      >
                        <span>Read More</span>
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Bottom Right: Vicar (Reduced Height / Compact) */}
            <ScrollReveal direction="right" delay={450} duration={850} className="flex-[0.75]">
              <div className="group grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr] bg-[#e9e3d7] hover:bg-[#ede8de] overflow-hidden h-full min-h-[220px] sm:min-h-[250px] transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1.5">
                {/* Image Container (Top on mobile, Right on sm and up) */}
                <div className="order-1 sm:order-2 relative aspect-4/3 sm:aspect-auto min-h-[200px] sm:min-h-[230px] w-full overflow-hidden bg-[#ded7c9]">
                  <Image
                    src={clergy?.[3].image}
                    alt={clergy?.[3].name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content Container (Bottom on mobile, Left on sm and up) */}
                <div className="order-2 sm:order-1 flex flex-col justify-center px-6 py-5 sm:px-8 sm:py-6 transition-transform duration-500 ease-out group-hover:translate-x-1">
                  <div className="max-w-[340px]">
                    <p className="eyebrow text-[#a43a32]">
                      {clergy?.[3].designation}
                    </p>

                    <h2 className="font-display text-lg sm:text-2xl font-semibold leading-tight mt-1 text-[#1c1a17] transition-colors duration-300 group-hover:text-[#8a2f28]">
                      {clergy?.[3].name}
                    </h2>

                    <div className="[&_p]:mt-1.5 [&_p]:text-xs sm:[&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-[#524c43] [&_p]:line-clamp-2  [&_p_strong]:hidden" dangerouslySetInnerHTML={{__html:clergy?.[1].content ?? ""}} />
                    

                    <div className="mt-3.5">
                      <Link
                        href={clergy?.[3].slug}
                        className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#a43a32] hover:text-[#78241d] transition-colors group/btn"
                      >
                        <span>Read More</span>
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

