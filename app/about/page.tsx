import type { Metadata } from "next";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ClosingSection from "@/components/home/ClosingSection";
import AboutHero from "@/components/about/AboutHero";
import AboutStorySection from "@/components/about/AboutStorySection";
import VisionSection from "@/components/about/VisionSection";
import MissionSection from "@/components/about/MissionSection";
import CommitmentSection from "@/components/about/CommitmentSection";
import AboutGalleryGlimpse from "@/components/about/AboutGalleryGlimpse";
import AboutSectionNavigation from "@/components/about/AboutSectionNavigation";
import ScrollReveal from "@/components/ui/ScrollReveal";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  categoryTitle: string;
  src: string;
  type: "image" | "video";
  videoUrl?: string;
  date?: string;
};
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
    about: {
      subtitle:string;
    title: string;
    content: string;
    image:string;
  };
  mission: {
      subtitle:string;
    title: string;
    content: string;
    image:string;
  };
  vission: {
      subtitle:string;
    title: string;
    content: string;
    image:string;
  };
  commitment: {
      subtitle:string;
    title: string;
    content: string;
    image:string;
  };
  gallery: GalleryItem[];
 cta: {
      subtitle:string;
    title: string;
    content: string;
    image: string;
  };
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/about`, {
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
      title: data?.seo?.meta_title ?? "About Us",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "About Us",
    };
  }
}

export default async function AboutPage() {
     let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <main className="bg-[#f7f4ed] text-[#171715]">
    
      <AboutHero hero={data?.banner} />
  <AboutSectionNavigation />

      <AboutStorySection about={data?.about} />
      <VisionSection vission={data?.vission} />
      <MissionSection mission={data?.mission} />
      <CommitmentSection commitment={data?.commitment} />
      {data?.gallery && <AboutGalleryGlimpse gallery={data?.gallery ?? []}/>}
      <ClosingSection cta={data?.cta}/>
  
    </main>
  );
}
