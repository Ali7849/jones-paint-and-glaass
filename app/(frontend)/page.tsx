import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import Hero from "@/app/components/Hero";
import DiySlider from "@/app/components/Diyslider";
import ProductServices from "@/app/components/Productservices";
import ImageSlider from "@/app/components/ImageSlider";
import Contractor from "@/app/components/Contractor";
import Navbar from "@/app/components/Navbar";
import { getNavigation } from "@/lib/getNavigation";
import { getFooter } from '@/lib/getFooter'
import DiySupportBlog from "@/app/components/DiySupportBlog";
import JpgMedia from "@/app/components/Jpgmedia";
import VideoSlider from "@/app/components/VideoSlider";
import Diyhero from "@/app/components/Diyhero";
import Quote from "@/app/components/Quote";
import Contacthero from "@/app/components/Contacthero";
import Inquireform from "@/app/components/Inquireform";
import About from "@/app/components/About";
import Features from "@/app/components/Features";
import Aboutlocation from "@/app/components/Aboutlocation";
import QuickLinks from "@/app/components/QuickLinks";
import Faqs from "@/app/components/Faqs";
import FaqTipsSlider from "@/app/components/FaqTipsSlider";
import FeatureCards from "@/app/components/FeatureCards";
import RecommendBlog from "@/app/components/RecommendBlogs";
import BlogSearch from "@/app/components/Blogsearch";
import BlogDetail from "@/app/components/Blogdetail";
import { getLocations } from "@/lib/getLocations";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

const SITE_URL = "https://jonespg.com";

const blockMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  diySlider: DiySlider,
  productServices: ProductServices,
  imageSlider: ImageSlider,
  contractor: Contractor,
  diySupportBlog: DiySupportBlog,
  jpgMedia: JpgMedia,
  videoSlider: VideoSlider,
  diyHero: Diyhero,
  quote: Quote,
  contactHero: Contacthero,
  inquireForm: Inquireform,
  about: About,
  features: Features,
  aboutLocation: Aboutlocation,
  quickLinks: QuickLinks,
  faqs: Faqs,
  faqTipsSlider: FaqTipsSlider,
  featureCards: FeatureCards,
  recommendBlog: RecommendBlog,
  blogDetail: BlogDetail,
  blogSearch: BlogSearch,
};

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });

  const { docs } = await (payload as any).find({
    collection: "pages",
    where: {
      slug: {
        equals: "home",
      },
    },
    depth: 1,
    limit: 1,
  });

  const page = docs[0];

  const metaTitle =
    page?.metaTitle || page?.title || "Jones Paint & Glass";

  const metaDescription =
    page?.metaDescription ||
    "Jones Paint & Glass has been Utah's trusted window, glass, door, and paint expert for over 85 years.";

  const canonical = `${SITE_URL}/`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

function renderBlocks(blocks: any[], allLocations: any[]) {
  return blocks.map((block: any, i: number) => {
    if (!block || !block.blockType) return null;

    const Component = blockMap[block.blockType];
    if (!Component) return null;

    const extraProps =
      block.blockType === "imageSlider"
        ? { fetchedLocations: allLocations }
        : {};

    return <Component key={i} {...block} {...extraProps} />;
  });
}

export default async function Home() {
  const navData = await getNavigation();
  const footerData = await getFooter();


  const allLocations = await getLocations();

  const payload = await getPayload({ config });

  const { docs } = await (payload as any).find({
    collection: "pages",
    where: {
      slug: {
        equals: "home",
      },
    },
    depth: 3,
    limit: 1,
  });

  const page = docs[0];

  if (!page) {
    return (
      <>
        <Navbar navData={navData} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">No Home Page Found</h1>
            <p className="text-gray-600 mb-6">
              Create a page with slug "home" in Payload CMS admin
            </p>

            <a
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Go to Payload Admin
            </a>
          </div>
        </div>
        <Footer footerData={footerData} />
      </>
    );
  }

  return (
    <>
      <Navbar navData={navData} />
      {renderBlocks(page.blocks ?? [], allLocations)}
      <Footer footerData={footerData} />
    </>
  );
}