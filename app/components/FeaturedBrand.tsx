"use client";
import Image from "next/image";

type FeaturedBrandBlockProps = {
  label?: string
  heading?: string
  description?: string
  image?: {
    url: string
    alt?: string
  } | null
}

export default function FeaturedBrand({
  label = 'Featured Brand',
  heading = 'Meoded Paint & Plaster',
  description = 'Handcrafted with the utmost care, using premium ingredients to enhance spaces with sophisticated depth and texture. These architectural finishes provide the perfect stage for your own story.',
  image = null,
}: FeaturedBrandBlockProps) {
  const imageUrl = image?.url ?? '/assets/jt/finishes.png'
  const imageAlt = image?.alt ?? heading

  return (
    <section className="relative py-14 md:py-20 bg-white overflow-hidden">

      {/* Paint splash — left */}
      <div
        className="pointer-events-none absolute top-20 md:-top-30 left-0 w-full h-64 md:h-200 z-0"
        style={{
          backgroundImage: 'url(/assets/jt/elements/paint-18.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top left',
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
            {label}
          </p>
          <h2 className="text-[36px] md:text-[48px] font-extrabold font-['Avenir']">
            {heading}
          </h2>
        </div>

        {/* Card */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[16px] overflow-hidden bg-[#F8F9FC] p-6 flex flex-col gap-5">
            <div className="w-full overflow-hidden flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={400}
                height={225}
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>
            {description && (
              <p className="text-[16px] md:text-[18px] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}