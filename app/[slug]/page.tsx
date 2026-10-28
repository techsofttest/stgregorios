import { Metadata } from "next";
import { notFound } from "next/navigation";
import ClosingSection from "@/components/home/ClosingSection";
import DetailHero from "@/components/detailed/DetailHero";
import DetailGallerySection from "@/components/detailed/DetailGallerySection";
import DetailStorySection from "@/components/detailed/DetailStorySection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CTA {
  subtitle: string;
  title: string;
  content: string;
  image: string | null;
}

interface DetailItem {
  id: number;
  title?: string;
  name?: string;
  slug?: string;
  designation?: string;
  eyebrow?: string;
  verse_quote?: string;
  verse_citation?: string;
  description?: string;
  content?: string;
  image?: string | null;
  banner_image?: string | null;
  gallery_images?: { src: string }[];
  meta_title?: string;
  meta_key?: string;
  meta_desc?: string;
}

interface DetailResponse {
  success: boolean;
  message?: string;
  type: "ministry" | "spiritual" | "clergy";
  category?: {
    id: number;
    name: string;
    slug: string;
  }[];
  data: DetailItem | DetailItem[];
  cta: CTA;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getDetail(slug: string): Promise<DetailResponse | null> {
  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not configured.");
    return null;
  }

  try {
    const res = await fetch(
      `${API_URL.replace(/\/$/, "")}/detail/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const result: DetailResponse = await res.json();

    if (!result.success) return null;

    return result;
  } catch (error) {
    console.error("Failed to fetch detail:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await getDetail(slug);

  const item = response
    ? Array.isArray(response.data)
      ? response.data[0]
      : response.data
    : undefined;

  return {
    title: item?.meta_title || item?.title || item?.name || "Church Details",
    description: item?.meta_desc || item?.description || "",
    keywords: item?.meta_key || "",
  };
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const response = await getDetail(slug);

  if (!response) notFound();

  // Ministry and Spiritual return one object.
  // Clergy categories return an array of records.
  const items = Array.isArray(response.data)
    ? response.data
    : [response.data];

  const item = items[0];

  if (!item) notFound();

  const title = item.name || item.title || "";
  const eyebrow =
    item.eyebrow ||
    (response.type === "ministry"
      ? "Our Ministry"
      : response.type === "spiritual"
        ? "Spiritual Life"
        : "Our Clergy");

  const image = item.banner_image || item.image || undefined;

  const galleryItems = (item?.gallery_images ?? []).map((img) => ({
    src: img.src,
  }));

  return (
    <main className="bg-[#f7f4ed] text-[#171715]">
      <DetailHero
        eyebrow={eyebrow}
        title={title}
        verseQuote={item.verse_quote || ""}
        verseCitation={item.verse_citation || ""}
        imageSrc={image}
      />

      {response.category && response.category.length > 0 && (
        <ScrollReveal direction="up" duration={700}>
          <nav
            aria-label="Related pages"
            className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-8 sm:gap-3 sm:px-6"
          >
            {response.category.map((tab) => {
              const tabSlug = tab.slug.trim();

              const href =
                tabSlug.startsWith("http://") ||
                tabSlug.startsWith("https://") ||
                tabSlug.startsWith("/")
                  ? tabSlug
                  : tabSlug.startsWith("#")
                    ? `/about${tabSlug}`
                    : `/${tabSlug}`;

              // Check if current page slug or name matches the tab
              const isActive =
                tabSlug.toLowerCase() === slug.toLowerCase() ||
                item?.name === tab.name ||
                item?.title === tab.name;

              return (
                <Link
                  key={tab.id}
                  href={href}
                  className={`cursor-pointer px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:text-sm ${
                    isActive
                      ? "bg-[#a43a32] text-white shadow-sm"
                      : "border border-[#171715]/10 bg-white text-[#3d3a34] hover:border-[#a43a32] hover:text-[#a43a32]"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </ScrollReveal>
      )}

      <DetailStorySection content={item?.content ?? ""} />

      {galleryItems.length > 0 && (
        <DetailGallerySection
          eyebrow="Moments & Memories"
          title="Visual Glimpses"
          items={galleryItems}
        />
      )}

      <ClosingSection cta={response.cta} />
    </main>
  );
}