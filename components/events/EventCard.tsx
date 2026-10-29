
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  item: {
    id: number;
    slug: string;
    type: string;
    title: string;
    content: string;
    image: string;
    event_date: string;
  };
  aspectRatioClass?: string;
  showExcerpt?: boolean;
}

export default function EventCard({
  item,
  aspectRatioClass = "aspect-[3/4]",
  showExcerpt = false,
}: EventCardProps) {
  return (
    <Link
      href={`/events/${item.slug}`}
      className="group flex h-full flex-col"
    >
      <div
        className={`relative ${aspectRatioClass} w-full overflow-hidden bg-[#e6dfd1]`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center brightness-[0.98] contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        />

        {item.type && (
          <div className="absolute left-3 top-3 bg-[#9b3129] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
            {item.type}
          </div>
        )}
      </div>

      <div className="mt-3.5 flex flex-1 flex-col">
        <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-[#121416] transition-colors group-hover:text-[#9b3129] sm:text-[17px]">
          {item.title}
        </h3>

        {showExcerpt && item.content && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#403c36]">
            {item.content.replace(/<[^>]*>/g, "").trim()}
          </p>
        )}

        <div className="mt-auto pt-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#9b3129]">
            {item.event_date}
          </p>
        </div>
      </div>
    </Link>
  );
}
