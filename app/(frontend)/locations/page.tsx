import type { Metadata } from "next";
import { getLocations } from "@/lib/getLocations";
import { getNavigation } from "@/lib/getNavigation";
import { getFooter } from '@/lib/getFooter'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title: "Jones Paint & Glass Locations | Utah Paint, Glass & Window Stores",
  description:
    "Find your nearest Jones Paint & Glass in Utah — 7 locations from Provo and American Fork to St. George, Cedar City, Roosevelt, and Vernal. Paint, glass, windows, doors, auto glass, and more.",
  alternates: {
    canonical: "https://jonespg.com/locations/",
  },
  openGraph: {
    title: "Jones Paint & Glass Locations | 7 Utah Stores",
    description:
      "Find your nearest Jones Paint & Glass in Utah — 7 locations from Provo and American Fork to St. George, Cedar City, Roosevelt, and Vernal. Paint, glass, windows, doors, auto glass, and more.",
    url: "https://jonespg.com/locations/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jones Paint & Glass Locations | 7 Utah Stores",
    description:
      "Find your nearest Jones Paint & Glass in Utah — 7 locations from Provo and American Fork to St. George, Cedar City, Roosevelt, and Vernal. Paint, glass, windows, doors, auto glass, and more.",
  },
};


export default async function LocationsPage() {
  const navData = await getNavigation();
  const locations = await getLocations();
  const footerData = await getFooter();

  return (
    <>
      <Navbar navData={navData} />

      <section className="relative py-16 md:py-24 bg-white overflow-hidden mt-17.5">

        {/* Paint splash */}
        <div
          className="absolute md:top-[-150px] left-0 w-full pointer-events-none z-2"
          style={{
            backgroundImage: 'url(/assets/jt/elements/paint-11.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top left',
            height: '70%',
          }}
        />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-[32px] md:text-[44px] font-extrabold text-gray-900 mb-3 font-['Avenir']">
              JP&amp;G Locations
            </h2>
            <p className="text-gray-500 text-[14px] md:text-[16px] max-w-md mx-auto leading-relaxed">
              We have stores scattered throughout Utah. Check out
              the products and information for the store nearest you!
            </p>
          </div>

          {/* Grid */}
          {locations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {locations.map((loc: any) => (
                <Link
                  key={loc.id}
                  href={`/${loc.slug}`}  // ✅ domain.com/provo not domain.com/locations/provo
                  className="group bg-[#F8F9FC] rounded-[16px] overflow-hidden flex flex-col p-5"
                  style={{ boxShadow: '0 2px 12px rgba(0,82,198,0.06)' }}
                >
                  {/* Image */}
                  <div className="relative w-full h-[225px] bg-blue-50 overflow-hidden rounded-[8px]">
                    {loc.locationImage?.url ? (
                      <Image
                        src={loc.locationImage.url}
                        alt={loc.locationImage.alt || loc.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col gap-1 flex-1 pt-4 text-center lg:text-start">
                    <h3 className="text-[16px] md:text-[20px] font-bold text-gray-900">
                      {loc.name}
                    </h3>

                    {loc.services && (
                      <p className="text-[14px] text-gray-500 leading-snug">
                        {loc.services}
                      </p>
                    )}

                    {loc.phone && (
                      <p className="text-[14px] text-[#0052C6] font-medium">
                        {loc.phone}
                      </p>
                    )}

                    <span className="group inline-flex items-center gap-1 text-[16px] font-semibold text-gray-800 mt-3 mx-auto lg:mx-0">
                      Store Info
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-gray-400">No locations added yet.</p>
            </div>
          )}

        </div>
      </section>

      <Footer footerData={footerData} />
      
    </>
  )
}