import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";


export default function AboutGalleryGlimpse({gallery}:{gallery:any[]}) {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-8 sm:px-12 lg:px-16">
        <ScrollReveal direction="up" duration={800}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <p className="eyebrow text-[#a43a32]">Glimpses of Fellowship</p>
              <h2 className="section-title mt-3">
                Life at <span className="text-[#a43a32]">St. Gregorios</span>
              </h2>
            </div>

            <Link
              href="/gallery"
              className="text-xs font-bold tracking-widest text-[#a43a32] uppercase hover:underline transition-all pb-1 self-start sm:self-end"
            >
              View Full Gallery →
            </Link>
          </div>
        </ScrollReveal>

        {/* 4 Cards Grid - 1:1 Aspect Ratio, Sharp Corners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, idx) => (
            <ScrollReveal
              key={item.src}
              direction="up"
              delay={idx * 120}
              duration={750}
            >
              <div className="group block cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden bg-[#ded7c9]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="font-display text-base font-semibold text-white mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
