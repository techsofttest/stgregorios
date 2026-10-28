import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Member {
  name: string;
  position: string;
  image: string;
  isVicar?: boolean;
}

export default function CommitteeSection({member}:{member:any[]}) {

  return (
    <section className="bg-gray-100 py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-8 sm:px-12 lg:px-16">
        {/* Header with Title & View All Link */}
        <ScrollReveal direction="up" duration={800}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[#a43a32]">Leadership &amp; Service</p>
              <h2 className="section-title mt-3">
                Vicar &amp; Office <span className="text-[#a43a32]">Bearers</span>
              </h2>
            </div>

            <Link
              href="/committee"
              className="text-xs font-bold tracking-widest text-[#a43a32] uppercase hover:underline transition-all pb-1 self-start sm:self-end"
            >
              View Full Committee →
            </Link>
          </div>
        </ScrollReveal>

        {/* 5 Members Grid: Vicar card is made slightly larger with prominent scale/span */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 items-end">
          {member.map((member, idx) => (
            <ScrollReveal
              key={member.name}
              direction="up"
              delay={idx * 100}
              duration={700}
              className={member.isVicar ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""}
            >
              <div
                className={`group block transition-transform duration-300 ${member.isVicar ? "lg:-translate-y-2" : ""
                  }`}
              >
                {/* Image Container - Vicar card has a taller aspect ratio or slightly larger container */}
                <div
                  className={`relative w-full overflow-hidden bg-[#e9e3d7] transition-all duration-300 ${member.isVicar
                    ? "aspect-[4/5]"
                    : "aspect-square"
                    }`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Member Info Below Image with Position */}
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a43a32]">
                    {member.position}
                  </p>
                  <h3
                    className={`font-semibold text-[#1c1a17] group-hover:text-[#a43a32] transition-colors leading-snug mt-0.5 ${member.isVicar ? "text-xl sm:text-2xl" : "text-xl"
                      }`}
                  >
                    {member.name}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

