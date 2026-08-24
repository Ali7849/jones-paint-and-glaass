"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductItem {
  text: string;
}

interface Product {
  id?: string;
  tag: string;
  title: string;
  subtitle?: string;
  image?: {
    url?: string | null;
    alt?: string | null;
  } | null;
  imageLeft?: boolean;
  items?: ProductItem[];
}

interface ExteriorServicesBlockProps {
  sectionTag?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  products?: Product[];
  storeManager?: {
    name: string;
    title: string;
    image?: { url: string }[];
  };
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageUrl = p.image?.url?.trim() ? p.image.url : '/assets/jt/exterior-ser-1.png';
  const imageAlt = p.image?.alt?.trim() ? p.image.alt : p.title;

  return (
    <div className="flex flex-col gap-2">
      {/* Image */}
      <div className="relative w-full h-[180px] rounded-[12px] overflow-hidden bg-[#EEF4FB]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Title & Link */}
      <h3 className="text-[16px] font-bold text-gray-900">{p.title}</h3>
      <button
        onClick={() => setLightboxOpen(true)}
        className="text-[14px] text-[#0052C6] font-semibold hover:underline cursor-pointer"
      >
        Learn More →
      </button>
    </div>
  );
}

// Layout: 2 Services (Provo Glass Style)
function Layout2Services({ products, storeManager }: { products: Product[]; storeManager?: any }) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Left: Store Image */}
      <div className="w-full lg:w-[45%]">
        <div className="rounded-[16px] overflow-hidden h-[300px] bg-[#EEF4FB]">
          <Image
            src={products[0]?.image?.url || '/assets/jt/default.jpg'}
            alt="Store"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right: Services + Manager */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6">
        {/* Services */}
        <div className="grid grid-cols-1 gap-6">
          {products.map((p, i) => (
            <ProductCard key={i} p={p} index={i} />
          ))}
        </div>

        {/* Store Manager */}
        {storeManager && (
          <div className="bg-black text-white rounded-[12px] p-5 flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-white/20" />
            <div>
              <p className="font-bold text-[14px]">{storeManager.name}</p>
              <p className="text-[12px] text-gray-300">Store Manager</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Layout: 3 Services (Provo Paint Style)
function Layout3Services({ products, storeManager }: { products: Product[]; storeManager?: any }) {
  return (
    <div className="flex flex-col gap-10">
      {/* Top: Image */}
      <div className="rounded-[16px] overflow-hidden h-[250px] bg-[#EEF4FB]">
        <Image
          src={products[0]?.image?.url || '/assets/jt/default.jpg'}
          alt="Store"
          fill
          className="object-cover"
        />
      </div>

      {/* Managers */}
      {storeManager && (
        <div className="bg-black text-white rounded-[12px] p-5 flex gap-6">
          <div className="flex gap-3 items-center flex-1">
            <div className="w-12 h-12 rounded-full bg-white/20" />
            <div>
              <p className="font-bold text-[14px]">{storeManager.name}</p>
              <p className="text-[12px] text-gray-300">Store Manager</p>
            </div>
          </div>
        </div>
      )}

      {/* Services Grid: 1 + 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] font-bold text-gray-900">{products[0]?.title}</h3>
          <p className="text-[14px] text-gray-600">{products[0]?.subtitle}</p>
        </div>
        {products.slice(1).map((p, i) => (
          <ProductCard key={i} p={p} index={i} />
        ))}
      </div>
    </div>
  );
}

// Layout: 4 Services (Payson Style)
function Layout4Services({ products, storeManager }: { products: Product[]; storeManager?: any }) {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Left: Image */}
      <div className="w-full lg:w-[40%]">
        <div className="rounded-[16px] overflow-hidden h-[280px] bg-[#EEF4FB]">
          <Image
            src={products[0]?.image?.url || '/assets/jt/default.jpg'}
            alt="Store"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right: Services Grid 2x2 */}
      <div className="w-full lg:w-[60%]">
        <div className="grid grid-cols-2 gap-5 mb-6">
          {products.slice(1).map((p, i) => (
            <ProductCard key={i} p={p} index={i} />
          ))}
        </div>

        {/* Store Manager */}
        {storeManager && (
          <div className="bg-black text-white rounded-[12px] p-5 flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-white/20" />
            <div>
              <p className="font-bold text-[14px]">{storeManager.name}</p>
              <p className="text-[12px] text-gray-300">Store Manager</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Layout: 5 Services (Cedar City Style)
function Layout5Services({ products, storeManager }: { products: Product[]; storeManager?: any }) {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Left: Image */}
      <div className="w-full lg:w-[40%]">
        <div className="rounded-[16px] overflow-hidden h-[280px] bg-[#EEF4FB]">
          <Image
            src={products[0]?.image?.url || '/assets/jt/default.jpg'}
            alt="Store"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right: Services Grid + Manager */}
      <div className="w-full lg:w-[60%]">
        {/* 2x2 Grid + 1 */}
        <div className="grid grid-cols-2 gap-5 mb-6">
          {products.slice(1, 5).map((p, i) => (
            <ProductCard key={i} p={p} index={i} />
          ))}
        </div>

        {/* Extra service if 5th exists */}
        {products[5] && (
          <div className="mb-6">
            <ProductCard p={products[5]} index={5} />
          </div>
        )}

        {/* Store Manager */}
        {storeManager && (
          <div className="bg-black text-white rounded-[12px] p-5 flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-white/20" />
            <div>
              <p className="font-bold text-[14px]">{storeManager.name}</p>
              <p className="text-[12px] text-gray-300">Store Manager</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Layout: 6+ Services (Vernal/St. George Style)
function Layout6PlusServices({ products, storeManager }: { products: Product[]; storeManager?: any }) {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Left: Image */}
      <div className="w-full lg:w-[35%]">
        <div className="rounded-[16px] overflow-hidden h-[300px] bg-[#EEF4FB]">
          <Image
            src={products[0]?.image?.url || '/assets/jt/default.jpg'}
            alt="Store"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right: Services Grid */}
      <div className="w-full lg:w-[65%]">
        {/* 3-column grid for services */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {products.slice(1).map((p, i) => (
            <ProductCard key={i} p={p} index={i} />
          ))}
        </div>

        {/* Store Manager */}
        {storeManager && (
          <div className="bg-black text-white rounded-[12px] p-5 flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-white/20" />
            <div>
              <p className="font-bold text-[14px]">{storeManager.name}</p>
              <p className="text-[12px] text-gray-300">Store Manager</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Component
export default function ExteriorServices({
  sectionTag = "Exterior Paint",
  heading = "Products & Services",
  description = "Whether you know exactly what you're looking for or need a little guidance, Jones Paint & Glass has what you need.",
  buttonText = "Get a Quote",
  buttonLink = "#",
  products = [],
  storeManager,
}: ExteriorServicesBlockProps) {
  if (!products || products.length === 0) return null;

  const serviceCount = products.length;

  return (
    <section className="relative py-14 md:py-20 bg-white overflow-hidden">
      <div
        className="pointer-events-none absolute top-60 lg:top-10 right-0 w-full h-56 lg:h-120 z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-17.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center lg:text-start">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
            {sectionTag}
          </p>
          <h2 className="text-[36px] md:text-[48px] font-extrabold mb-3 font-['Avenir']">
            {heading}
          </h2>
          {description && (
            <p className="text-[18px] leading-relaxed mx-auto lg:mx-0 max-w-xl mb-5">
              {description}
            </p>
          )}
          {buttonText && (
            
            <a  href={buttonLink}
              className="group inline-flex items-center gap-2 bg-[#0052C6] hover:bg-[#003fa0] transition-colors text-white font-bold text-[16px] px-5 py-3 rounded-[8px]"
            >
              {buttonText}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* Dynamic Layout Based on Service Count */}
        {serviceCount === 2 && <Layout2Services products={products} storeManager={storeManager} />}
        {serviceCount === 3 && <Layout3Services products={products} storeManager={storeManager} />}
        {serviceCount === 4 && <Layout4Services products={products} storeManager={storeManager} />}
        {serviceCount === 5 && <Layout5Services products={products} storeManager={storeManager} />}
        {serviceCount >= 6 && <Layout6PlusServices products={products} storeManager={storeManager} />}
      </div>
    </section>
  );
}