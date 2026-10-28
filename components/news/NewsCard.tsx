
import Image from "next/image";

interface NewsCardProps {
  item: {
    id: number;
    slug: string;
    type: string;
    title: string;
    content: string;
    image: string;
    date: string;
  };
  aspectRatioClass?: string;
  showExcerpt?: boolean;
  onLearnMore: () => void;
}

export default function NewsCard({
  item,
  aspectRatioClass = "aspect-[4/3]",
  showExcerpt = false,
  onLearnMore,
}: NewsCardProps) {
  return (
    <article className="group flex h-full flex-col">
      {/* Image */}
      <div
        className={`relative ${aspectRatioClass} w-full overflow-hidden bg-[#e9e3d7]`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {item.type && (
          <div className="absolute left-3 top-3 bg-[#a43a32] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {item.type}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-[#080b0d] transition-colors group-hover:text-[#a43a32]">
          {item.title}
        </h3>

        {showExcerpt && item.content && (
          <div
            className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#595349]"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        )}

        <p className="mt-auto pt-3 text-[11px] font-medium uppercase tracking-wider text-[#777064]">
          {item.date}
        </p>

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
    </article>
  );
}
