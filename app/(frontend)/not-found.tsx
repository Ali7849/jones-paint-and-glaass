import Link from 'next/link'
import { getNavigation } from '@/lib/getNavigation'
import { getFooter } from '@/lib/getFooter'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

export const dynamic = 'force-dynamic'

export default async function NotFound() {
  const navData = await getNavigation()
  const footerData = await getFooter()

  return (
    <>
      <Navbar navData={navData} />

      <section className="relative bg-white mt-20 py-28 md:py-40 overflow-hidden">
        {/* Paint element */}
        <div
          className="absolute bottom-0 right-0 w-full pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/jt/elements/paint-2.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            height: '40%',
          }}
        />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">

            <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-4">
              Error 404
            </p>

            <h1 className="text-[40px] md:text-[56px] font-extrabold mb-5 leading-tight font-['Avenir']">
              404 Page Not Found
            </h1>

            <p className="text-[18px] text-gray-500 leading-relaxed mb-10">
              The page you&rsquo;re looking for has moved or no longer exists.
            </p>

            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-[8px] bg-[#0052C6] px-5 py-3 text-[16px] font-semibold text-white hover:bg-black transition-colors"
            >
              Back to Home
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

          </div>
        </div>
      </section>

      <Footer footerData={footerData} />
    </>
  )
}