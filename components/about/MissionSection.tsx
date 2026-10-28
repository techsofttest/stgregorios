import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MissionSection({ mission }: { mission: any }) {
  const missionHtml = `
    <h2><strong>Our Mission</strong></h2>
    <p>Our mission is to nurture a vibrant Christian community rooted in the apostolic faith and traditions of the Jacobite Syrian Orthodox Church, and to guide every member towards a deeper relationship with God through worship, prayer, Scripture and the Holy Sacraments.</p>
    <p><strong>We Strive To:</strong></p>
    <ul>
      <li>Preserve and strengthen our faith and spiritual heritage</li>
      <li>Nurture children and youth through Christian education and spiritual formation</li>
      <li>Strengthen families through fellowship, prayer and pastoral care</li>
      <li>Promote love, unity and fellowship among our parish members</li>
      <li>Serve the wider community with compassion, humility and Christ-like love</li>
      <li>Extend charitable support to the poor, needy, elderly, sick and vulnerable</li>
      <li>Respond to social needs through acts of mercy, charity and community service</li>
      <li>Encourage every member to become a witness for Christ through a life of faith, service and love</li>
    </ul>
    <blockquote>
      <p><i>Inspired by the example of St. Gregorios of Parumala, we believe that our faith must be expressed not only through worship, but also through service, compassion and charity.</i></p>
      <p><i>Our desire is to be a parish where faith leads to service, prayer leads to compassion, and fellowship leads to a stronger and more caring community.</i></p>
    </blockquote>
    <p><i>“Let us not love with words or speech but with actions and in truth.”</i></p>
    <p><span class="text-small"><strong>— 1 John 3:18</strong></span></p>
  `;

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8 sm:px-12 lg:px-16">
        <ScrollReveal direction="up" duration={800}>
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-[#a43a32] text-xs font-bold uppercase tracking-widest">
              <span>✠</span>
              <span>{mission?.title ?? ""}</span>
            </div>

            <div 
              className="mission-content-wrapper 
                [&>h2]:mt-3 [&>h2]:text-[#1c1a17] [&>h2]:font-semibold [&>h2]:text-[clamp(2.2rem,4vw,3.8rem)] [&>h2]:leading-[1.05] [&>h2]:tracking-[-0.02em] [&>h2]:font-display
                [&>p:nth-of-type(1)]:mt-8 [&>p:nth-of-type(1)]:text-lg [&>p:nth-of-type(1)]:sm:text-xl [&>p:nth-of-type(1)]:leading-relaxed [&>p:nth-of-type(1)]:text-[#2c2a26] [&>p:nth-of-type(1)]:font-display [&>p:nth-of-type(1)]:font-light 
                [&>p:nth-of-type(2)]:mt-12 [&>p:nth-of-type(2)]:pt-8 [&>p:nth-of-type(2)]:border-t [&>p:nth-of-type(2)]:border-[#171715]/10 
                [&>p:nth-of-type(2)>strong]:font-display [&>p:nth-of-type(2)>strong]:text-xs [&>p:nth-of-type(2)>strong]:font-bold [&>p:nth-of-type(2)>strong]:tracking-[0.2em] [&>p:nth-of-type(2)>strong]:uppercase [&>p:nth-of-type(2)>strong]:text-[#a43a32] 
                [&>ul]:mt-6 [&>ul]:grid [&>ul]:sm:grid-cols-2 [&>ul]:gap-x-10 [&>ul]:gap-y-5 
                [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-3 [&>ul>li]:text-base [&>ul>li]:sm:text-[17px] [&>ul>li]:leading-relaxed [&>ul>li]:text-[#3d3932] 
                [&>ul>li]:before:content-['✠'] [&>ul>li]:before:text-[#a43a32] [&>ul>li]:before:text-sm [&>ul>li]:before:font-bold [&>ul>li]:before:select-none [&>ul>li]:before:mt-0.5 
                [&>blockquote]:mt-12 [&>blockquote]:space-y-3 [&>blockquote]:border-l-2 [&>blockquote]:border-[#a43a32] [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:text-base [&>blockquote]:sm:text-lg [&>blockquote]:leading-relaxed [&>blockquote]:text-[#454038] [&>blockquote]:italic 
                [&>p:nth-of-type(3)]:mt-12 [&>p:nth-of-type(3)]:pt-8 [&>p:nth-of-type(3)]:border-t [&>p:nth-of-type(3)]:border-[#171715]/10 [&>p:nth-of-type(3)]:font-display [&>p:nth-of-type(3)]:italic [&>p:nth-of-type(3)]:text-lg [&>p:nth-of-type(3)]:sm:text-xl [&>p:nth-of-type(3)]:text-[#1c1a17] 
                [&>p:nth-of-type(4)]:mt-3 [&>p:nth-of-type(4)]>span>strong]:text-xs [&>p:nth-of-type(4)]>span>strong]:font-bold [&>p:nth-of-type(4)]>span>strong]:uppercase [&>p:nth-of-type(4)]>span>strong]:tracking-widest [&>p:nth-of-type(4)]>span>strong]:text-[#a43a32] [&>p:nth-of-type(4)]>span>strong]:whitespace-nowrap"
              dangerouslySetInnerHTML={{ __html: mission.content ?? "" }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}