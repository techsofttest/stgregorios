import type { Metadata } from "next";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ClosingSection from "@/components/home/ClosingSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactMapSection from "@/components/contact/ContactMapSection";

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
  dis:{
    title: string;
    subtitle: string;
    detail:{title:string;
      option:string;
      description:string;
    }[];
  };
  contact:any;
 cta: {
      subtitle:string;
    title: string;
    content: string;
    image: string;
  };
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/contact`, {
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
export default async function ContactPage() {
       let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="bg-[#f7f4ed] text-[#171715]">
 
      <ContactHero hero={data?.banner} />
      <ContactInfoSection contact={data?.contact} time={data?.time.detail ?? []} />
      <ContactMapSection  map={data?.contact?.map ?? ""} dis={data?.dis} />
      <ClosingSection cta={data?.cta} />
  
    </main>
  );
}
