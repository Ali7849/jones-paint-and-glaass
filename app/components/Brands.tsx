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

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const imageUrl = brand.image?.url?.trim()
    ? brand.image.url
    : '/assets/jt/finishes.png';
  const brandLink = brand.link || '#';

  return (
    
    <a  href={brandLink}
      className="flex flex-col gap-4 group rounded-[16px] bg-[#F8F9FC] overflow-hidden hover:shadow-lg transition-shadow w-full h-full"
    >
      {/* Image Container */}
      <div className="w-full h-[327px] rounded-[12px] overflow-hidden m-4 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={brand.image?.alt || brand.name}
          width={240}
          height={327}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand Name */}
      <div className="px-4 pb-4 flex-1 flex items-end">
        <p className="font-semibold text-[18px] text-center w-full group-hover:text-[#0052C6] transition-colors font-['Avenir']">
          {brand.name}
        </p>
      </div>
    </a>
  );
}

export default function Brands({
  label = 'Featured Brands',
  heading = 'Brands We Sell',
  footnote,
  brands = [],
}: BrandsBlockProps) {
  if (!brands || brands.length === 0) return null;

  const count = brands.length;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">

        {/* Header */}
        {label && (
          <p className="text-[14px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2 font-['Avenir']">
            {label}
          </p>
        )}
        <h2 className="text-[36px] md:text-[48px] font-extrabold mb-12 font-['Avenir']">
          {heading}
        </h2>

        {/* Grid based on count */}
        {count === 2 ? (
          /* 2 brands — 2 columns */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {brands.map((brand, index) => (
              <BrandCard key={brand.id || index} brand={brand} index={index} />
            ))}
          </div>
        ) : count === 3 ? (
          /* 3 brands — 3 columns */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <BrandCard key={brand.id || index} brand={brand} index={index} />
            ))}
          </div>
        ) : count <= 4 ? (
          /* 4 brands — 2x2 grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
            {brands.map((brand, index) => (
              <BrandCard key={brand.id || index} brand={brand} index={index} />
            ))}
          </div>
        ) : count === 5 ? (
          /* 5 brands — 3 top, 2 bottom centered */
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {brands.slice(0, 3).map((brand, index) => (
                <BrandCard key={brand.id || index} brand={brand} index={index} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {brands.slice(3, 5).map((brand, index) => (
                <BrandCard key={brand.id || (index + 3)} brand={brand} index={index + 3} />
              ))}
            </div>
          </div>
        ) : count === 6 ? (
          /* 6 brands — 2x3 grid */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <BrandCard key={brand.id || index} brand={brand} index={index} />
            ))}
          </div>
        ) : (
          /* 7+ brands — 2x2 top, 3+ bottom */
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {brands.slice(0, 4).map((brand, index) => (
                <BrandCard key={brand.id || index} brand={brand} index={index} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {brands.slice(4).map((brand, index) => (
                <BrandCard key={brand.id || (index + 4)} brand={brand} index={index + 4} />
              ))}
            </div>
          </div>
        )}

        {/* Footnote */}
        {footnote && (
          <p className="text-center text-[16px] mt-12 text-gray-600 font-['Avenir']">
            {footnote}
          </p>
        )}

      </div>
    </section>
  );
}