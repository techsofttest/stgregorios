import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactInfoSection({contact,time}:{contact:any,time:any[]}) {
  const contactCards = [
    {
      id: "address",
      category: "Visit Us",
      title: "Church Address",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
      content: (
        <>
          <div className="[&_p_strong]:font-semibold [&_p_strong]:text-[#1c1a17] [&_p]:mt-1 [&_p]:text-[#554f46] [&_p]:text-sm [&_p]:leading-relaxed [&_.text-small]:mt-2 [&_.text-small]:text-xs [&_.text-small]:font-medium [&_.text-small]:text-[#8b2d26]" dangerouslySetInnerHTML={{__html:contact?.address ?? ""}}/>
        </>
      ),
    },
    {
      id: "info",
      category: "Contact Channels",
      title: "Direct Inquiries",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      content: (
        <div className="space-y-2 text-sm text-[#554f46]">
          <p>
            <span className="font-semibold text-[#1c1a17] block">Email:</span>
            <a
              href={`mailto:${contact?.email}`}
              className="text-[#8b2d26] hover:underline underline-offset-4 font-medium transition-colors"
            >
            {contact?.email ?? ""}
            </a>
          </p>
          <p className="pt-1">
            <span className="font-semibold text-[#1c1a17] block">Parish Office &amp; Vicar:</span>
            <span className="text-[#554f46]">{contact.parish}</span>
          </p>
        </div>
      ),
    },
    {
      id: "schedule",
      category: "Sacred Hours",
      title: "Worship Schedule",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#554f46]">
         {time.map((tym, idx) => (
          <div key={idx} className="flex justify-between border-b border-[#171715]/10 pb-1.5">
            <span className="font-medium text-[#1c1a17]">{tym.title} {tym.option}:</span>
            <span dangerouslySetInnerHTML={{__html:tym?.description ?? ""}}/>
          </div>))}
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-[#f7f4ed] pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      {/* Background Architectural Sketch */}
      <div className="fixed inset-0 h-screen w-full z-0 pointer-events-none opacity-[0.08] mix-blend-multiply overflow-hidden">
        <Image
          src="/sketch/sk1.png"
          alt=""
          fill
          priority={false}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ed] via-transparent to-[#f7f4ed]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        {/* Section Heading */}
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <p className="eyebrow text-[#a43a32]">Contact &amp; Administration</p>
            <h2 className="section-title mt-2">
              Church <span className="text-[#a43a32]">Information</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* 3 Contact Info Cards matching polaroid / gallery aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {contactCards.map((card, idx) => (
            <ScrollReveal
              key={card.id}
              direction="up"
              delay={idx * 120}
              duration={750}
            >
              <div
                id={card.id}
                className="group relative bg-white p-7 sm:p-8 h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#a43a32]">
                      {card.category}
                    </span>
                    <div className="h-10 w-10 rounded-full bg-[#f7f4ed] text-[#a43a32] flex items-center justify-center transition-colors group-hover:bg-[#a43a32] group-hover:text-white">
                      {card.icon}
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1c1a17] mb-4">
                    {card.title}
                  </h3>

                  <div className="mt-2">{card.content}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
