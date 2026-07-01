import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import Hero from "@/app/components/Hero";
import DiySlider from "@/app/components/Diyslider";
import Navbar from "@/app/components/Navbar";
import { getNavigation } from "@/lib/getNavigation";
import { getFooter } from '@/lib/getFooter'
import Footer from "@/app/components/Footer";
import ProductServices from "@/app/components/Productservices";
import ImageSlider from "@/app/components/ImageSlider";
import Contractor from "@/app/components/Contractor";
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
import Reviews from "@/app/components/Reviews";
import StoreLocation from "@/app/components/StoreLocation";
import LocationInfo from "@/app/components/LocationInfo";
import { getLocationBySlug, getLocations } from "@/lib/getLocations";
import { getPaintBySlug } from "@/lib/getPaint";
import { getGlassBySlug } from "@/lib/getGlass";
import { getDoorsBySlug } from "@/lib/getDoors";
import FeatureList from "@/app/components/FeatureList";
import FeaturedBrand from "@/app/components/FeaturedBrand";
import FaqTipsSlider from "@/app/components/FaqTipsSlider";
import ExteriorServices from "@/app/components/Exteriorservices";
import Brands from "@/app/components/Brands";
import SubHero from "@/app/components/SubHero";
import FeatureCards from "@/app/components/FeatureCards";
import Cta from "@/app/components/Cta";
import RecommendBlog from "@/app/components/RecommendBlogs";
import BlogSearch from "@/app/components/Blogsearch";
import BlogDetail from "@/app/components/Blogdetail";

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
  reviews: Reviews,
  storeLocation: StoreLocation,
  locationInfo: LocationInfo,
  featureList: FeatureList,
  featuredBrand: FeaturedBrand,
  featureCards: FeatureCards,
  exteriorServices: ExteriorServices,
  brands: Brands,
  subHero: SubHero,
  cta: Cta,
  recommendBlog: RecommendBlog,
  blogSearch: BlogSearch,
  blogDetail: BlogDetail,
};

function normalizeSlug(rawSlug: string) {
  return decodeURIComponent(rawSlug)
    .replace(/^\/+/, "")
    .toLowerCase()
    .trim();
}

function buildCanonical(slug: string) {
  return `${SITE_URL}/${slug}`;
}

async function getContentBySlug(slug: string) {
  const payload = await getPayload({ config });

  const collections = ["pages", "locations", "paint", "glass", "doors"];

  for (const collection of collections) {
    const { docs } = await (payload as any).find({
      collection,
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 1,
      limit: 1,
    });

    if (docs?.[0]) {
      return docs[0];
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  const page = await getContentBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const metaTitle =
    page?.metaTitle ||
    page?.title ||
    page?.name ||
    "Jones Paint & Glass";

  const metaDescription =
    page?.metaDescription ||
    "Jones Paint & Glass has been Utah's trusted window, glass, door, and paint expert for over 85 years.";

  const canonical = buildCanonical(slug);

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

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const navData = await getNavigation();
  const footerData = await getFooter();
  
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  const allLocations = await getLocations();

  const payload = await getPayload({ config });

  const { docs } = await (payload as any).find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 3,
    limit: 1,
  });

  const page = docs[0];

  if (page) {
    return (
      <>
        <Navbar navData={navData} />
        {renderBlocks(page.blocks ?? [], allLocations)}
        <Footer footerData={footerData} />
      </>
    );
  }

  const location = await getLocationBySlug(slug);

  if (location) {
    return (
      <>
        <Navbar navData={navData} />
        {renderBlocks(location.blocks ?? [], allLocations)}
        <Footer footerData={footerData} />
      </>
    );
  }

  const paintItem = await getPaintBySlug(slug);

  if (paintItem) {
    return (
      <>
        <Navbar navData={navData} />
        {renderBlocks(paintItem.blocks ?? [], allLocations)}
        <Footer footerData={footerData} />
      </>
    );
  }

  const glassItem = await getGlassBySlug(slug);

  if (glassItem) {
    return (
      <>
        <Navbar navData={navData} />
        {renderBlocks(glassItem.blocks ?? [], allLocations)}
        <Footer footerData={footerData} />
      </>
    );
  }

  const doorsItem = await getDoorsBySlug(slug);

  if (doorsItem) {
    return (
      <>
        <Navbar navData={navData} />
        {renderBlocks(doorsItem.blocks ?? [], allLocations)}
        <Footer footerData={footerData} />
      </>
    );
  }

  return notFound();
}