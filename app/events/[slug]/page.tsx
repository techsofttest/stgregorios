
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Header from "@/components/global/Header";
import ClosingSection from "@/components/home/ClosingSection";
import DetailHero from "@/components/detailed/DetailHero";
import DetailStorySection from "@/components/detailed/DetailStorySection";
import EventCard from "@/components/events/EventCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface EventItem {
  id: number;
  slug: string;
  type: string;
  title: string;
  content: string;
  image: string;
  event_date: string;
}

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  banner: {
    category: string;
    title: string;
    date: string;
    image: string;
  };
  detail: string;
  news: EventItem[];
  cta: {
    subtitle: string;
    title: string;
    content: string;
    image: string | null;
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getNewsDetail(slug: string): Promise<ProductResponse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const res = await fetch(
    `${baseUrl.replace(/\/$/, "")}/event/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch news article: ${res.status}`);
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await getNewsDetail(slug);

    if (!data) {
      return { title: "News Not Found" };
    }

    return {
      title: data.seo?.meta_title || data.banner?.title || "News",
      description: data.seo?.meta_desc || "",
      keywords: data.seo?.meta_key || "",
    };
  } catch {
    return { title: "News" };
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getNewsDetail(slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-[#f7f4ed] text-[#171715]">
      <Header />

      <DetailHero
        backLink={{ href: "/news", label: "Back to News" }}
        eyebrow={data.banner?.category ?? ""}
        title={data.banner?.title ?? ""}
        subtitle={data.banner?.date ?? ""}
        imageSrc={data.banner?.image ?? ""}
      />

      <DetailStorySection
        content={data.detail ?? ""}
        category={data.banner?.category ?? ""}
      />

      <section className="relative bg-[#efe9dd] py-20">
        <div className="mx-auto max-w-[1400px] px-8 sm:px-12 lg:px-16">
          <ScrollReveal direction="up" duration={700}>
            <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-[#a43a32]">
                  Parish Chronicles
                </p>
                <h2 className="section-title mt-2">
                  More Events &amp;{" "}
                  <span className="text-[#a43a32]">Happenings</span>
                </h2>
              </div>

              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a43a32] transition-colors hover:text-[#171715]"
              >
                <span>View All</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </ScrollReveal>

          {data.news?.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {data.news.slice(0, 5).map((item, idx) => (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={idx * 100}
                  duration={700}
                >
                  <EventCard
                    item={item}
                    aspectRatioClass="aspect-[3/4]"
                    showExcerpt
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-[#403c36]">
              No other news articles are available.
            </p>
          )}
        </div>
      </section>

      <ClosingSection cta={data.cta} />
    </main>
  );
}
