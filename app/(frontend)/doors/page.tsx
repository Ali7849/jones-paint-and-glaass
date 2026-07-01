import { getDoors } from "@/lib/getDoors";
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
    "Interior & Exterior Doors in Utah | Residential, Patio & Commercial | Jones Paint & Glass",

  description:
    "Jones Paint & Glass carries interior doors, exterior doors, patio doors, and commercial doors from Masonite, Andersen & Marvin. All styles and materials for Utah homes and businesses. Free on-site estimates available.",

  alternates: {
    canonical: "https://jonespg.com/doors/",
  },

  openGraph: {
    title: "Interior & Exterior Doors in Utah | Jones Paint & Glass",

    description:
      "Jones Paint & Glass carries interior doors, exterior doors, patio doors, and commercial doors from Masonite, Andersen & Marvin. All styles and materials for Utah homes and businesses. Free on-site estimates available.",

    url: "https://jonespg.com/doors/",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Interior & Exterior Doors in Utah | Jones Paint & Glass",

    description:
      "Jones Paint & Glass carries interior doors, exterior doors, patio doors, and commercial doors from Masonite, Andersen & Marvin. All styles and materials for Utah homes and businesses. Free on-site estimates available.",
  },
};

export default async function DoorsPage() {
  const navData = await getNavigation();
  const doorsItems = await getDoors();
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
                Doors Products &amp; Services
              </h2>
              <p className="text-[24px] leading-relaxed mb-10 mx-auto lg:mx-0 max-w-md">
                All the colors, styles, and stains you need, with tips from JP&amp;G pros.
              </p>

              <div className="rounded-[16px] overflow-hidden w-full">
                {doorsItems[0]?.locationImage?.url ? (
                  <Image
                    src={doorsItems[0].locationImage.url}
                    alt={doorsItems[0].locationImage.alt || doorsItems[0].name}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src="/assets/jt/jone-paint-link.png"
                    alt="Doors Products"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* ── Right: dynamic links from Doors collection ── */}
            <div className="flex-1 flex flex-col gap-8 w-full">
              {doorsItems.length > 0 ? (
                doorsItems.map((item: any, index: number) => (
                  <Link
                    key={item.id}
                    href={`/doors/${item.slug}`}
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
                  No Doors products found. Add some from the admin panel.
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