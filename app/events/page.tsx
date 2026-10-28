import type { Metadata } from "next";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ClosingSection from "@/components/home/ClosingSection";
import EventsHero from "@/components/events/EventsHero";
import EventsGridSection from "@/components/events/EventsGridSection";


interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  banner: {subtitle:string;
    title: string;
    content: string;
    image:string;
  };
    category: {
name:string;
id:number;
  }[];
  event:{
      id:  number,
      slug:  string,
      type:  string,
      title: string,
      content:  string,
      image:  string,
      event_date: string,
    }[];
 
 cta: {
      subtitle:string;
    title: string;
    content: string;
    image: string;
  };
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/event`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSEO();

    return {
      title: data?.seo?.meta_title ?? "Event",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Event",
    };
  }
}


export default async function EventsListingPage() {
     let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="bg-[#f7f4ed] text-[#171715]">

      <EventsHero hero={data?.banner} />
      <EventsGridSection items={data?.event ?? [] } category={data?.category ?? []} />
      <ClosingSection cta={data?.cta} />

    </main>
  );
}
