"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import NewsCard from "@/components/news/NewsCard";
import DetailStorySection from "@/components/news/DetailStorySection";

export default function NewsSection({ news }: { news: any[] }) {
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal direction="up" duration={750}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Parish News"
              title={
                <>
                  Latest News &amp; <span className="text-[#a43a32]">Updates</span>
                </>
              }
            />
            <Link
              href="/news"
              className="text-xs font-bold tracking-widest text-[#a43a32] uppercase hover:underline transition-all pb-1 self-start md:self-end"
            >
              View All News →
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {news.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delay={index * 100} duration={650}>
              <NewsCard
                item={item}
                aspectRatioClass="aspect-[4/3]"
                showExcerpt={true}
                onLearnMore={() => setSelectedNews(item)}
              />
            </ScrollReveal>
          ))}
        </div>

        <DetailStorySection
          isOpen={selectedNews !== null}
          onClose={() => setSelectedNews(null)}
          category={selectedNews?.type ?? ""}
          title={selectedNews?.title ?? ""}
          date={selectedNews?.date ?? ""}
          content={selectedNews?.content ?? ""}
        />
      </div>
    </section>
  );
}