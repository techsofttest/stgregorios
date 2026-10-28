import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Footer({contact,time}:{contact:any,time:any[]}) {

  return (
    <footer className="relative bg-[#e9e3d7] px-8 sm:px-12 lg:px-16 pt-16 pb-12 text-[#0c0e10]">
      {/* Overlapping St. Gregorios Image on Left Side (Reduced Size) */}
      <div className="absolute top-0 left-4 hidden lg:block w-[24vw] max-w-[300px] pointer-events-none z-30 -translate-y-20 xl:-translate-y-28">
        <div className="relative w-full aspect-[1109/1418]">
          <Image
            src="/st-gregorios/st-gregorios-b.png"
            alt="St. Gregorios of Parumala"
            fill
            sizes="(max-width: 1024px) 25vw, 300px"
            className="object-contain object-top"
            priority
          />
        </div>
      </div>

      {/* Background Church Silhouette */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-40 flex justify-end w-[50vw] max-w-[650px] z-0">
        <div className="relative w-full aspect-[2366/463]">
          <Image
            src="/design-elm/chirch-shadow-red.png"
            alt="Church Silhouette"
            fill
            sizes="(max-width: 1024px) 50vw, 650px"
            className="object-bottom object-right object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <ScrollReveal direction="up" duration={800}>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr] items-start lg:pl-[28%]">
            {/* Church Information */}
            <div>
              <div className="flex items-center gap-3.5">
                <Image
                  src="/logo/logo.png"
                  alt="St. Gregorios Logo"
                  width={52}
                  height={52}
                  className="h-14 w-14 object-contain"
                />

                <div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0c0e10] leading-none">
                    St. Gregorios
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#8b2d26]">
                    Jacobite Syrian Orthodox Church
                  </p>
                </div>
              </div>

              <div className="mt-5 text-sm leading-6 text-[#0c0e10]/85 font-normal">
                <div className="[&_p_strong]:font-semibold [&_p_strong]:text-[#0c0e10] [&_p_strong]:tracking-wide [&_p]:mt-1 [&_.text-small]:hidden" dangerouslySetInnerHTML={{__html:contact?.address ?? ""}}/>

                {/* Email */}
                <p className="mt-2 text-sm font-semibold">
                  Email:{" "}
                  <a
                    href={`mailto:${contact?.email}`}
                    className="text-[#8b2d26] underline underline-offset-4 decoration-[#8b2d26] hover:text-[#5e1914] transition-colors"
                  >{contact?.email}
                  </a>
                </p>

                {/* Phone Number */}
                {contact?.phone &&  <p className="mt-1 text-sm font-semibold">
                  Phone:{" "}
                  <a
                    href={`tel:${contact?.phone}`}
                    className="text-[#8b2d26] underline underline-offset-4 decoration-[#8b2d26] hover:text-[#5e1914] transition-colors"
                  >{contact?.phone}         </a>
                </p>}
              </div>
            </div>

            {/* Worship Schedule */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b2d26]">
                Worship Schedule
              </p>

              <div className="mt-4 space-y-2.5 text-sm text-[#0c0e10] font-medium">
              {time.map((group, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-1">
                  <span>{group.title}</span>
                  <span>·</span>
                  <span dangerouslySetInnerHTML={{__html:group.description}} />
                  <span>—</span>
                  <span>{group.option}</span>
                </div>
              ))}
            </div>
               <div className="flex flex-col mt-4 space-y-2.5 gap-4">
                    <div className="flex gap-6 items-center">
                            <Link href={contact?.facebook || "#"} className="w-5 h-5 text-[#8b2d26] hover:text-black transition-colors">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </Link>
                            <Link href={contact?.instagram || "#"} className="w-5 h-5 text-[#8b2d26] hover:text-black transition-colors">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </Link>
                            <Link href={contact?.youtube || "#"} className="w-5 h-5 text-[#8b2d26] hover:text-black transition-colors">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </Link>
                        </div>
                    </div>
            </div>
           
          </div>
        </ScrollReveal>

        {/* Copyright and Social Media */}
        <div className="mt-10 flex flex-col justify-between items-center gap-5 pt-6 border-t border-[#0c0e10]/15 text-xs font-medium tracking-[0.12em] text-[#0c0e10] sm:flex-row sm:items-center">
          {/* Copyright */}
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} St. Gregorios Jacobite Syrian Orthodox Church
          </p>

          {/* Website Credit */}
          <a
            href="https://www.techsoftweb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[#0c0e10] font-semibold hover:text-[#8b2d26] hover:underline underline-offset-4 transition-colors"
          >
            Web Design Company in Kochi Techsoft
          </a>

          {/* Church Values */}
          <p className="text-center tracking-[0.12em]">
            Faith · Heritage · Fellowship · Service
          </p>
        </div>
      </div>
    </footer>
  );
}