import ScrollReveal from "@/components/ui/ScrollReveal";

interface Data{
  map?:string;
  dis?:{
    title: string;
    subtitle: string;
    detail:{title:string;
      option:string;
      description:string;
    }[];
  };
}

export default function ContactMapSection({map,dis}:Data) {
  return (
    <section id="map" className="relative bg-[#efeae1] py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <ScrollReveal direction="up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-[#a43a32]">{dis?.title}</p>
              <h2 className="section-title mt-2 [&_span]:text-[#a43a32]" dangerouslySetInnerHTML={{__html:dis?.subtitle ?? ""}}  />
            </div>

            <a
              href="https://maps.google.com/?q=St.+Gregorios+Jacobite+Syrian+Orthodox+Church+Mulund+West+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-[#a43a32] hover:bg-[#8b2d26] px-5 py-3 transition-colors shadow-sm self-start md:self-end"
            >
              <span>Open in Google Maps App</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Embedded Google Map Frame */}
        <ScrollReveal direction="up" delay={150} duration={800}>
          <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] border border-[#171715]/10 bg-[#e5decb] overflow-hidden">
            <iframe
              title="St. Gregorios Jacobite Syrian Orthodox Church Google Map Location"
              src={map || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.411136423376!2d72.9525287!3d19.1772648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8f99e4f1dc9%3A0x7d6f5fbf1d871788!2sSt.%20Gregorios%20Jacobite%20Syrian%20Orthodox%20Church!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-105"
            />
          </div>
        </ScrollReveal>

        {/* Navigation Note Card */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {dis?.detail.map((item, idx) => (
          <div key={idx} className="bg-white p-5 border border-[#171715]/10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#a43a32]">{item.title}</p>
            <p className="text-sm font-semibold text-[#1c1a17] mt-1">{item.option}</p>
            <div className="text-xs text-[#554f46] mt-1" dangerouslySetInnerHTML={{__html:item.description}} />
          </div>))}
        </div>
      </div>
    </section>
  );
}
