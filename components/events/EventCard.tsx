import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
   item:{
      id:  number,
      slug:string;
      type:  string,
      title: string,
      content:  string,
      image:  string,
      event_date: string,
    };
  aspectRatioClass?: string;
    showExcerpt?: boolean;
  onLearnMore: () => void;
}

export default function EventCard({
  item,
  aspectRatioClass = "aspect-[3/4]",
    showExcerpt = false,
  onLearnMore,
}: EventCardProps) {
  return (
    <article  className="group block rounded-none shadow-none h-full flex flex-col">
      {/* Image Container - Taller aspect ratio with sharp edges & contrast tuning */}
      <div className={`relative ${aspectRatioClass} w-full overflow-hidden bg-[#e6dfd1] rounded-none shadow-none`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center rounded-none shadow-none filter contrast-[1.05] brightness-[0.98] transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        />
        {item.type && (
          <div className="absolute top-3 left-3 bg-[#9b3129] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 shadow-sm">
            {item.type}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3.5 flex flex-col flex-1">
        <h3 className="font-display text-base sm:text-[17px] font-bold leading-snug text-[#121416] group-hover:text-[#9b3129] transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Date, Time & Location Footer with High Contrast */}
        <div className="mt-auto pt-2 mt-3.5 flex flex-col gap-1.5">
          <p className="text-[12px] font-bold tracking-wider text-[#9b3129] uppercase">
            {item.event_date}
          </p>
          {/* {item.time && (
            <p className="text-[12px] font-medium text-[#403c36] leading-tight">
              {item.time} {item.location ? `· ${item.location}` : ""}
            </p>
          )} */}
          {/* Learn More */}
        <button
          type="button"
          onClick={onLearnMore}
          className="mt-4 self-start border-b border-[#a43a32] pb-1 text-xs font-bold uppercase tracking-widest text-[#a43a32] transition-colors hover:border-[#071b27] hover:text-[#071b27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a43a32] focus-visible:ring-offset-4"
          aria-label={`Learn more about ${item.title}`}
        >
          Learn More <span aria-hidden="true">→</span>
        </button>
        </div>
      </div>
    </article>
  );
}
