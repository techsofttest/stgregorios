import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CommitmentSection({ commitment }: { commitment: any }) {
  // Split the HTML string by <hr> or <hr/> tags into separate card items
  const rawContent = commitment?.content ?? "";
  const items = rawContent
    .split(/<hr\s*\/?>/i)
    .filter((item: string) => item.trim().length > 0);

  return (
    <section className="py-24 lg:py-32 bg-[#071b27] text-white overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-8 sm:px-12 lg:px-16">
        <ScrollReveal direction="up" duration={800}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow text-[#d6b75b]">Apostolic Foundations</p>
            <h2 className="section-title mt-3 text-white" dangerouslySetInnerHTML={{__html:commitment?.title ?? ""}} />             
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {items.map((itemHtml: string, idx: number) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 100}
              duration={750}
            >
              <div 
                className="group bg-[#0c2433] hover:bg-[#112d3e] p-7 sm:p-9 h-full flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-1.5
                  [&>p:first-of-type]:font-display [&>p:first-of-type]:text-sm [&>p:first-of-type]:font-bold [&>p:first-of-type]:tracking-widest
                  [&>h3]:font-display [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-semibold [&>h3]:mt-3 [&>h3]:text-white [&>h3]:transition-colors [&>h3]:group-hover:text-[#e1c66c]
                  [&>p:last-of-type]:mt-4 [&>p:last-of-type]:text-xs [&>p:last-of-type]:sm:text-[13px] [&>p:last-of-type]:leading-relaxed [&>p:last-of-type]:text-white/75"
                dangerouslySetInnerHTML={{ __html: itemHtml }}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}