import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
export const dynamic = "force-dynamic";
const displayFont = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "St. Gregorios Jacobite Syrian Orthodox Church",
  description:
    "St. Gregorios Jacobite Syrian Orthodox Church — rooted in apostolic faith, prayer, heritage and service.",
};
interface ProductResponse {
    time: {title:string;
      option:string;
      description:string;
    }[];
  contact:any;
  category:{
    name:string;
    slug:string;
  }[];
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/layout`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${displayFont.variable} ${bodyFont.variable}`}
      >  <Header />
        {children}
            <Footer time={data?.time ?? []} contact={data?.contact} />
      </body>
    </html>
  );
}