import Image from "next/image";

export default function AboutHero({hero}:{hero:any}) {
  return (
    <section id="parish" className="relative w-full overflow-hidden bg-[#080b0d] lg:min-h-[100vh] flex flex-col justify-center pt-24 pb-16 text-white">
      {/* Background Sanctuary Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={ hero?.image ||"/interior/Symmetrical Syrian Orthodox Sanctuary.png"}
          alt="St. Gregorios Sanctuary"
          fill
          priority
          className="object-cover object-center brightness-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b0d] via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full mx-auto max-w-[1400px] px-8 sm:px-12 lg:px-16">
        <div className="max-w-3xl">
          {/* Header Badge */}
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/logo/logo.png"
              alt="St. Gregorios Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="eyebrow text-[#d6b75b]">
              Apostolic See of Antioch <br />Mumbai Diocese
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl font-semibold leading-tight text-white [&_span]:text-[#d6b75b]" dangerouslySetInnerHTML={{__html:hero?.title ?? ""}}/>

          {/* Scripture Verse Quote */}
          <div className="mt-8 py-1 max-w-2xl bg-black/30 backdrop-blur-sm">
            <div className="font-display italic text-base sm:text-lg text-white/95 [&_p_strong]:mt-2 [&_p_strong]:text-xs [&_p_strong]:font-bold [&_p_strong]:uppercase [&_p_strong]:tracking-widest [&_p_strong]:text-[#d6b75b]" dangerouslySetInnerHTML={{__html:hero?.content ?? ""}}/>
          </div>
        </div>
      </div>
    </section>
  );
}
