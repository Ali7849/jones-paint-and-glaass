import { getPaint } from "@/lib/getPaint";
import { getNavigation } from "@/lib/getNavigation";
import { getFooter } from '@/lib/getFooter'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";



export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title:
    "Paint Products & Services in Utah | Interior, Exterior, Auto & More | Jones Paint & Glass",

  description:
    "Find interior paint, exterior paint, floor coatings, wood stains, auto paint, and more at Jones Paint & Glass — Utah's trusted paint store since 1938. Affordable prices, expert guidance. Visit a showroom today.",

  alternates: {
    canonical: "https://jonespg.com/paint/",
  },

  openGraph: {
    title: "Paint Products & Services in Utah | Jones Paint & Glass",

    description:
      "Find interior paint, exterior paint, floor coatings, wood stains, auto paint, and more at Jones Paint & Glass — Utah's trusted paint store since 1938. Affordable prices, expert guidance. Visit a showroom today.",

    url: "https://jonespg.com/paint/",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Paint Products & Services in Utah | Jones Paint & Glass",

    description:
      "Find interior paint, exterior paint, floor coatings, wood stains, auto paint, and more at Jones Paint & Glass — Utah's trusted paint store since 1938. Affordable prices, expert guidance. Visit a showroom today.",
  },
};

export default async function PaintPage() {
  const navData = await getNavigation();
  const paintItems = await getPaint();
  const footerData = await getFooter();


  return (
    <>
      <Navbar navData={navData} />

      <section className="mt-20 py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-end">

            {/* ── Left: heading + first paint item image ── */}
            <div className="w-full lg:w-[42%] flex-shrink-0 text-center lg:text-start">
              <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
                Jones Paint &amp; Glass
              </p>
              <h2 className="text-[38px] font-extrabold mb-3 font-['Avenir']">
                Paint Products &amp; Services
              </h2>
              <p className="text-[24px] leading-relaxed mb-10 mx-auto lg:mx-0 max-w-md">
                All the colors, styles, and stains you need, with tips from JP&amp;G pros.
              </p>

              <div className="rounded-[16px] overflow-hidden w-full">
                {paintItems[0]?.locationImage?.url ? (
                  <Image
                    src={paintItems[0].locationImage.url}
                    alt={paintItems[0].locationImage.alt || paintItems[0].name}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src="/assets/jt/jone-paint-link.png"
                    alt="Paint Products"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* ── Right: dynamic links from Paint collection ── */}
            <div className="flex-1 flex flex-col gap-8 w-full">
              {paintItems.length > 0 ? (
                paintItems.map((item: any, index: number) => (
                  <Link
                    key={item.id}
                    href={`/paint/${item.slug}`}
                    className="flex items-center justify-between px-5 py-7 rounded-[16px] border transition-colors group"
                    style={{
                      background: index === 0 ? '#0052C6' : 'white',
                      borderColor: '#0052C6',
                    }}
                  >
                    <span
                      className="font-semibold text-[18px]"
                      style={{ color: index === 0 ? 'white' : '#000000' }}
                    >
                      {item.name}
                    </span>
                    <svg
                      className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ color: index === 0 ? 'white' : '#0052C6' }}
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center py-10">
                  No paint products found. Add some from the admin panel.
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer footerData={footerData} />
      
    </>
  );
}