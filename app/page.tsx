import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import HeroSection from "@/components/home/HeroSection";
import WorshipBar from "@/components/home/WorshipBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import HeritageSection from "@/components/home/HeritageSection";
import BishopsSection from "@/components/home/BishopsSection";
import NewsSection from "@/components/home/NewsSection";
import CommitteeSection from "@/components/home/CommitteeSection";
import ClosingSection from "@/components/home/ClosingSection";
import { Metadata } from "next";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  banner: {
    title: string;
    content: string;
    image:string;
  };
    time: {
    title: string;
    content: string;
    detail:{title:string;
      option:string;
      description:string;
    }[];
  };
    about: {
      subtitle:string;
    title: string;
    content: string;
    image:string;
  };
    heritage: {
      subtitle:string;
    title: string;
    content: string;
    detail:{title:string;
      icon:string;
    }[];
    images:[];
  };
   clergy:{
      id:  number,
      slug:  string,
      name:  string,
      designation: string,
      content:  string,
      image:  string,
    }[];
    news:{
      id:  number,
      slug:  string,
      type:  string,
      title: string,
      content:  string,
      image:  string,
      date: string,
    }[];
      member:{
  id: number;
  category_id: number;
  category: string;
  name: string;
  position: string;
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

  const res = await fetch(`${baseUrl}/index`, {
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
      title: data?.seo?.meta_title ?? "Home",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Home",
    };
  }
}

export default async function Home() {
   let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <main className="bg-[#f7f4ed] text-[#171715]">
     
      <HeroSection banner={data?.banner} />
      <WorshipBar time={data?.time} />
      <WelcomeSection about={data?.about}  />
      <HeritageSection heritage={data?.heritage} />
      <BishopsSection  clergy={data?.clergy ?? []} />
      <NewsSection news={data?.news ?? []} />
      <CommitteeSection member={data?.member ?? []} />
      <ClosingSection cta={data?.cta} />

    </main>
  );
}