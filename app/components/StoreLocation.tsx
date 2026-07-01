"use client";
import Image from "next/image";

type Service = {
  id?: string
  title: string
  href?: string
  image: {
    url: string
    alt?: string
  }
}

type StoreLocationBlockProps = {
  locationLabel?: string
  heading?: string
  address?: string
  mapEmbedUrl?: string
  specialistName?: string
  specialistTitle?: string
  specialistImage?: { url: string; alt?: string } | null
  heroCardLabel?: string
  heroCardHeading?: string
  heroCardText?: string
  services?: Service[]
}

function ServiceCard({ service }: { service: Service }) {
  const imageUrl = service.image?.url ?? '/assets/jt/paint.png'
  const imageAlt = service.image?.alt ?? service.title

  return (
    <div className="rounded-[16px] p-5 overflow-hidden bg-[#F4F7FF] flex flex-col">
      <div className="w-full overflow-hidden" style={{ height: '148px' }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={220}
          height={110}
          className="w-full h-full object-cover rounded-[8px]"
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-[18px] font-bold">{service.title}</p>
        
        <a  href={service.href || '#'}
          className="inline-flex items-center gap-1 text-[16px] font-medium hover:text-[#0052C6] transition-colors group"
        >
          Learn More
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function StoreLocation({
  locationLabel = 'Store Location',
  heading = 'American Fork',
  address = '65 South 500 East American Fork, UT 84003',
  mapEmbedUrl = '',
  specialistName = 'Dave Koch',
  specialistTitle = 'Store Manager',
  specialistImage = null,
  heroCardLabel = 'Products & Services',
  heroCardHeading = 'From Inspiration to Installation',
  heroCardText = 'Our team will make sure you not only have the products you need, but a solid plan to go with them.',
  services = [],
}: StoreLocationBlockProps) {
  return (
    <section className="mt-20 py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[16px] font-bold tracking-widest text-[#0052C6] uppercase mb-2">
            {locationLabel}
          </p>
          <h1 className="text-[36px] md:text-[48px] font-extrabold mb-3 font-['Avenir']">
            {heading}
          </h1>
          <div className="flex items-center justify-center gap-3 font-normal text-[18px] md:text-[24px]">
            <img src="/assets/jt/location-icon.png" className="w-5 h-6" alt="location" />
            {address}
          </div>
        </div>

        {/* Main container */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">

          {/* Left column — Map + Specialist */}
          <div className="flex flex-col gap-4 w-full xl:w-[50%] lg:w-[45%] flex-shrink-0">

            {/* Map */}
            {mapEmbedUrl ? (
              <div className="rounded-2xl overflow-hidden bg-[#DDEEFF] flex-1 w-full min-h-[300px]">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="rounded-2xl bg-[#DDEEFF] flex-1 w-full min-h-[300px] flex items-center justify-center">
                <p className="text-gray-400">No map URL provided</p>
              </div>
            )}

            {/* Specialist card */}
            <div className="rounded-[16px] bg-[#A5EBCD] p-5 sm:p-8 flex flex-col h-auto lg:h-[267px] items-start gap-4 relative overflow-hidden flex-shrink-0">
              <div
                className="absolute right-0 top-0 w-full h-full pointer-events-none z-2"
                style={{
                  backgroundImage: 'url(/assets/jt/elements/paint-15.png)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'right center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <h4 className="relative z-4 text-[16px] font-bold tracking-[0.15em] uppercase mb-1">
                Your Local Specialist
              </h4>
              <div className="relative z-10 flex items-center gap-6 sm:gap-8">
                <div className="flex items-center w-[80px] lg:w-[132px] h-[80px] lg:h-[132px] bg-white rounded-full flex-shrink-0 overflow-hidden">
                  <Image
                    src={specialistImage?.url ?? '/assets/jt/profile.png'}
                    alt={specialistImage?.alt ?? specialistName}
                    width={52}
                    height={52}
                    className="w-10 lg:w-20 h-10 lg:h-20 object-contain mx-auto"
                  />
                </div>
                <div>
                  <p className="font-bold text-[24px] sm:text-[32px] leading-tight">{specialistName}</p>
                  <p className="text-[18px] mt-2 sm:mt-3">{specialistTitle}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right column — Hero card + Service cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Blue hero card — spans 2 rows */}
            <div className="row-span-2 rounded-2xl bg-[#0052C6] overflow-hidden relative flex flex-col justify-start p-6">
              <div
                className="absolute right-0 bottom-0 w-full pointer-events-none mix-blend-multiply"
                style={{
                  backgroundImage: 'url(/assets/jt/elements/paint-16.png)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'right bottom',
                  backgroundRepeat: 'no-repeat',
                  height: '50%',
                }}
              />
              <div className="relative z-10">
                <p className="text-[16px] font-bold tracking-[0.2em] text-[#A5EBCD] uppercase mb-3">
                  {heroCardLabel}
                </p>
                <h3 className="text-white text-[28px] lg:text-[32px] leading-tight mb-4">
                  {heroCardHeading}
                </h3>
                <p className="text-white text-[18px] leading-relaxed">
                  {heroCardText}
                </p>
              </div>
            </div>

            {/* Service cards */}
            {services.length > 0 ? (
              services.map((service, index) => (
                <ServiceCard key={service.id || index} service={service} />
              ))
            ) : (
              <div className="col-span-2 flex items-center justify-center h-[200px] bg-gray-50 rounded-2xl">
                <p className="text-gray-400">No services added yet.</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  )
}