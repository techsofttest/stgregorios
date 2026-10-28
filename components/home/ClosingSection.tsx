"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import PrayerModal from "@/components/home/PrayerModal";

export default function ClosingSection({cta}:{cta:any}) {
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#071b27] px-8 sm:px-12 lg:px-16 pt-24 pb-16 text-center text-white min-h-[500px] lg:min-h-[600px] flex flex-col justify-end">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={ cta?.image ||"/interior/Ornate Symmetrical Church Sanctuary.png"
}            alt="Golden Aisle to the Sacred Altar"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark Overlay for optimal text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071b27]/75 to-[#071b27]/100" />
        </div>

        <ScrollReveal direction="up" duration={850}>
          <div className="relative z-10 mx-auto max-w-[850px] w-full">
            <span className="font-display text-5xl text-[#d6b75b]">✠</span>

            <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-[#d6b75b]">
            {cta.title}</p>

            <h2 className="section-title mt-6 [&_span]:text-[#d6b75b]" dangerouslySetInnerHTML={{__html:cta.subtitle}}/>

            <div className="mx-auto mt-7 max-w-xl text-[15px] leading-8 text-white/90 " dangerouslySetInnerHTML={{__html:cta.content}} />

            {/* Action CTAs: Prayer Request & Donations */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button
                onClick={() => setIsPrayerModalOpen(true)}
                variant="secondary"
              >
                Submit Prayer Request
              </Button>
              <Button
                href="/donations"
                variant="tertiary"
                className="border-[#d6b75b]/70 text-[#d6b75b] hover:bg-[#d6b75b] hover:text-white hover:border-[#d6b75b]"
              >
                Support &amp; Donations
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Prayer Request Modal */}
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </>
  );
}


