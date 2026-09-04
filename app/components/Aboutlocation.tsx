import { getLocations } from "@/lib/getLocations";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

type AboutlocationProps = {
  heading?: string;
  subtext?: string;
  linkMode?: 'storeInfo' | 'review';
  linkLabel?: string;
};

export default async function Aboutlocation({
  heading = 'JP&G Locations',
  subtext = 'We have stores scattered throughout Utah. Check out the products and information for the store nearest you!',
  linkMode = 'storeInfo',
  linkLabel,
}: AboutlocationProps) {

  const allLocations = await getLocations();

  const isReview = linkMode === 'review';
  const label = linkLabel || (isReview ? 'Leave Review' : 'Store Info');

  // In review mode, only show locations that have a review URL filled in
  const locations = isReview
    ? allLocations.filter((loc: any) => loc.reviewUrl?.trim())
    : allLocations;

  const cardClass =
    "group bg-[#F6F7FB] rounded-[16px] overflow-hidden flex flex-col p-5 custom-border";

  return (
    <>
      <section className="relative py-16 md:py-24 bg-white overflow-hidden mt-17.5">

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
              {heading}
            </h2>
            <p className="text-gray-500 text-[14px] md:text-[16px] max-w-md mx-auto leading-relaxed">
              {subtext}
            </p>
          </div>

          {/* Grid */}
          {locations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {locations.map((loc: any) => {

                const cardInner = (
                  <>
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
                        {label}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </>
                );

                // Review links are external — open in a new tab
                return isReview ? (
                  
                <a   key={loc.id}
                    href={loc.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {cardInner}
                  </a>
                ) : (
                  <Link
                    key={loc.id}
                    href={`/${loc.slug}`}
                    className={cardClass}
                  >
                    {cardInner}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-gray-400">
                {isReview ? 'No review links added yet.' : 'No locations added yet.'}
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  )
}