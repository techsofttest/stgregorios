import Link from "next/link";
import Button from "@/components/ui/Button";

export default function MinistriesSection() {
  const ministries = [
    "Holy Qurbana",
    "Sunday School",
    "Youth Association",
    "Morth Mariam Vanitha Samajam",
    "Elders Forum",
    "Prayer Fellowships",
    "Choir",
    "Antiochian Faith Protection Movement",
    "Charitable Activities",
  ];

  return (
    <section className="bg-[#f7f4ed] py-24 lg:py-32">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#a43a32]">Parish Life</p>
            <h2 className="section-title mt-5">
              Faith lived
              <br />
              <span className="text-[#a43a32]">together.</span>
            </h2>
          </div>

          <Button href="/ministries" variant="black">View all ministries</Button>
        </div>

        <div className="mt-16 grid border-t border-[#d8d1c5] sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((item, index) => (
            <Link
              href="/ministries"
              key={item}
              className="group flex min-h-[120px] items-center justify-between border-b border-[#d8d1c5] py-7 pr-5 sm:px-5 lg:min-h-[140px]"
            >
              <div className="flex items-start gap-5">
                <span className="pt-1 font-display text-sm text-[#a43a32]">
                  0{index + 1}
                </span>
                <span className="font-display text-[25px] leading-tight text-[#1c1a17] transition-colors group-hover:text-[#a43a32]">
                  {item}
                </span>
              </div>
              <span className="text-xl text-[#a43a32] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
