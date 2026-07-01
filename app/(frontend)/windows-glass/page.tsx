import { getGlass } from "@/lib/getGlass";
import { getNavigation } from "@/lib/getNavigation";
import { getFooter } from '@/lib/getFooter'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function GlassPage() {
  const navData = await getNavigation();
  const glassItems = await getGlass();
  const footerData = await getFooter();

  return (
    <>
      <Navbar navData={navData} />

      <section className="mt-20 py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 ">

            {/* ── Left: heading + first paint item image ── */}
            <div className="w-full lg:w-[42%] flex-shrink-0 text-center lg:text-start">
              <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
                Jones Paint &amp; Glass
              </p>
              <h2 className="text-[38px] font-extrabold mb-3 font-['Avenir']">
                Glass Products &amp; Services
              </h2>
              <p className="text-[24px] leading-relaxed mb-10 mx-auto lg:mx-0 max-w-md">
                All the windows, mirrors, auto, shower and custom you need, with tips from JP&G pros.
              </p>

              <div className="rounded-[16px] overflow-hidden w-full">
                
                  <Image
                    src="/assets/jt/windows-glass.png"
                    alt="Glass Products"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                
              </div>
            </div>

            {/* ── Right: dynamic links from Glass collection ── */}
            <div className="flex-1 flex flex-col gap-8 w-full">
              {glassItems.length > 0 ? (
                glassItems.map((item: any, index: number) => (
                  <Link
                    key={item.id}
                    href={`${item.slug}`}
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
                  No Glass products found. Add some from the admin panel.
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