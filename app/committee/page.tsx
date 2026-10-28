import type { Metadata } from "next";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ClosingSection from "@/components/home/ClosingSection";
import CommitteeHero from "@/components/committee/CommitteeHero";
import CommitteeGridSection from "@/components/committee/CommitteeGridSection";

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
  id: number;
  name: string;
  }[];
  member:{
  id: number;
  category_id: number;
  category: string;
  name: string;
  position: string;
  phone: string;
  image: string | null;
  isVicar: boolean;
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

  const res = await fetch(`${baseUrl}/member`, {
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

export default async function CommitteeListingPage() {
  let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="bg-[#f7f4ed] text-[#171715]">
  
      <CommitteeHero hero={data?.banner} />
      <CommitteeGridSection members={data?.member ?? []} categories={data?.category ??[]} />
      <ClosingSection cta={data?.cta} />

    </main>
  );
}
