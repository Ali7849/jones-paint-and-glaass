'use client';
import Image from 'next/image';

interface Brand {
  id?: string;
  name: string;
  image?: {
    url?: string | null;
    alt?: string | null;
  } | null;
  link?: string;
}

interface BrandsBlockProps {
  label?: string;
  heading?: string;
  footnote?: string;
  brands?: Brand[];
}

export default function Brands({
  label = 'Exterior Paint',
  heading = 'Brands We Sell',
  footnote,
  brands = [],
}: BrandsBlockProps) {
  // Don't render if no brands
  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">

        {/* Header */}
        {label && (
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3 font-['Avenir']">
            {label}
          </p>
        )}
        
        <h2 className="text-[32px] md:text-[48px] font-extrabold mb-10 font-['Avenir']">
          {heading}
        </h2>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {brands.map((brand, index) => {
            const imageUrl = brand.image?.url?.trim()
              ? brand.image.url
              : '/assets/jt/finishes.png';
            const brandLink = brand.link || '#';

            return (
              <a
                key={brand.id || index}
                href={brandLink}
                className="flex flex-col gap-3 group rounded-[16px] bg-[#F8F9FC] p-5 hover:shadow-md transition-shadow"
              >
                {/* Card Image */}
                <div className="w-full rounded-[16px] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={brand.image?.alt || brand.name}
                    width={262}
                    height={348}
                    className="w-full h-full md:h-[348px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Brand Name */}
                <p className="font-semibold text-[18px] group-hover:text-[#0052C6] transition-colors font-['Avenir']">
                  {brand.name}
                </p>
              </a>
            );
          })}
        </div>

        {/* Footnote */}
        {footnote && (
          <p className="text-center text-[16px] mt-15 text-gray-600 font-['Avenir']">
            {footnote}
          </p>
        )}

      </div>
    </section>
  );
}