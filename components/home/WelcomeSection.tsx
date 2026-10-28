"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FloatingImage {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
}

export default function WelcomeSection({about}:{about:any}) {
  const galleryImages = [
    "/gallery/305A4500.JPG",
    "/gallery/305A7756.JPG",
    "/gallery/305A7760.JPG",
    "/gallery/305A7763.JPG",
    "/gallery/305A7794.JPG",
    "/gallery/305A7797.JPG",
    "/gallery/305A7799.JPG",
    "/gallery/305A7802.JPG",
    "/gallery/305A7811.JPG",
    "/gallery/305A7814.JPG",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([
    {
      id: 1,
      src: galleryImages[0],
      x: 170,
      y: 280,
      rotation: -5,
    },
    {
      id: 2,
      src: galleryImages[1],
      x: 330,
      y: 310,
      rotation: 6,
    },
    {
      id: 3,
      src: galleryImages[2],
      x: 240,
      y: 350,
      rotation: -2,
    },
  ]);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageIndexRef = useRef(3);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate distance from previous spawned image
    const distance = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);

    // Spawn a new image card smoothly after cursor moves 65 pixels
    if (distance > 65) {
      lastPosRef.current = { x, y };

      const nextImg = galleryImages[imageIndexRef.current % galleryImages.length];
      imageIndexRef.current += 1;

      const newImage: FloatingImage = {
        id: Date.now() + Math.random(),
        src: nextImg,
        x,
        y,
        rotation: Math.floor(Math.random() * 16) - 8, // Subtle rotation -8deg to +8deg
      };

      setFloatingImages((prev) => [...prev.slice(-3), newImage]); // Keep 4 floating images for ultra smooth rendering
    }
  };


  return (
    <section className="bg-[#f7f4ed] py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-8 sm:px-12 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 items-start">
          <ScrollReveal direction="left" duration={800} className="w-full h-full">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="relative p-8 -m-8 rounded-2xl cursor-crosshair select-none min-h-[440px] w-full h-full flex flex-col justify-start"
            >
              <p className="eyebrow text-[#a43a32]">Welcome</p>
              <h2 className="section-title mt-5 relative z-10 [&_span]:text-[#a43a32]" dangerouslySetInnerHTML={{__html:about?.title ?? ""}} />
                {/* <br /> */}
                {/* <span className="text-[#a43a32]">our spiritual home.</span> */}
              

              {/* Floating images popping up smoothly on mouse movement */}
              {floatingImages.map((img) => (
                <div
                  key={img.id}
                  className="pointer-events-none absolute z-20 transition-all duration-1000 ease-out"
                  style={{
                    left: `${img.x}px`,
                    top: `${img.y}px`,
                    transform: `translate3d(-50%, -50%, 0) rotate(${img.rotation}deg) scale(1)`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="bg-white p-1.5 border border-[#e8e2d5] shadow-2xl rounded-sm w-48 sm:w-60">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f7f4ed]">
                      <Image
                        src={img.src}
                        alt="Parish Gallery"
                        fill
                        className="object-cover"
                        sizes="260px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>


          <ScrollReveal direction="up" delay={200} duration={800}>
            <div>
              <div className="[&_h3]:font-display [&_h3]:text-[clamp(1.5rem,2.5vw,2.35rem)] [&_h3]:leading-[1.25] [&_h3]:text-[#1a1916] [&_p]:mt-7 [&_p]:max-w-[720px] [&_p]:text-[15px] [&_p]:leading-8 [&_p]:text-[#3d3a34]" dangerouslySetInnerHTML={{__html:about?.content ?? ""}} />

              {/* <p className="mt-7 max-w-[720px] text-[15px] leading-8 text-[#3d3a34]">
                Our parish is a spiritual home where we gather as one family in
                Christ, rooted in the apostolic faith and rich spiritual
                traditions of the Syriac Orthodox Church of Antioch.
              </p>

              <p className="mt-5 max-w-[720px] text-[15px] leading-8 text-[#3d3a34]">
                Inspired by the life and witness of St. Gregorios of Parumala,
                our patron saint, we strive to grow together in faith, prayer,
                love and service.
              </p> */}

              <Button href="/about" variant="black" className="mt-9">
                Read about our parish
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}




