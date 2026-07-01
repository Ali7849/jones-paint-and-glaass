'use client'

import Image from 'next/image'

type Location = {
  id?: string
  city: string
  highlight?: string | null
  services: string
  href: string
  image: {
    url: string
    alt?: string
  }
}

type AboutLocationBlockProps = {
  heading?: string
  subtext?: string
  locations?: Location[]
}

export default function Aboutlocation({
  heading = 'JP&G Locations',
  subtext = 'We have stores scattered throughout Utah. Check out the products and information for the store nearest you!',
  locations = [],
}: AboutLocationBlockProps) {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">

      {/* Paint splash — top left */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {locations.map((loc, index) => {
              const imageUrl = loc.image?.url ?? '/assets/jt/diy-5.png'
              const imageAlt = loc.image?.alt ?? `${loc.city} ${loc.highlight ?? ''} store`

              return (
                <div
                  key={loc.id || index}
                  className="bg-[#F8F9FC] rounded-[16px] overflow-hidden flex flex-col p-5"
                  style={{ boxShadow: '0 2px 12px rgba(0,82,198,0.06)' }}
                >
                  {/* Store image */}
                  <div className="relative w-full h-[225px] bg-blue-50 overflow-hidden rounded-[8px]">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col gap-1 flex-1 pt-4 text-center lg:text-start">
                    <h3 className="text-[16px] md:text-[20px] font-bold text-gray-900">
                      {loc.highlight ? (
                        <>
                          {loc.city}{' '}
                          <span style={{ color: '#0052C6' }}>{loc.highlight}</span>
                        </>
                      ) : (
                        loc.city
                      )}
                    </h3>

                    <p className="text-[14px] text-black leading-snug font-bold flex-1 pr-2 lg:pr-6 xl:pr-15">
                      {loc.services}
                    </p>

                    
                    <a  href={loc.href}
                      className="group inline-flex items-center gap-1 text-[16px] font-semibold text-gray-800 mt-3 mx-auto lg:mx-0"
                    >
                      Store Info
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-gray-400">No locations added yet.</p>
          </div>
        )}

      </div>
    </section>
  )
}