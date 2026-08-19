"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
  paintswatch?: {
    url?: string | null;
  } | null;
  products?: Product[];
}

const MAX_HEIGHT = 350 // ✅ Height limit in pixels

function Lightbox({ p, onClose }: { p: Product; onClose: () => void }) {
  const imageUrl = p.image?.url?.trim() ? p.image.url : '/assets/jt/exterior-ser-1.png'
  const imageAlt = p.image?.alt?.trim() ? p.image.alt : p.title
  const allItems = p.items || []

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-50 bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — absolutely positioned */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Container with scroll */}
        <div className="overflow-y-auto max-h-[90vh]">

          {/* Image section */}
          <div className="relative w-full h-[280px] md:h-[340px] overflow-hidden bg-gradient-to-br from-[#0052C6]/10 to-[#0052C6]/5">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />

            {/* Tag badge */}
            <div className="absolute top-6 left-6 bg-[#0052C6] text-white rounded-full px-4 py-2">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em]">
                {p.tag}
              </span>
            </div>
          </div>

          {/* Content section */}
          <div className="p-8 md:p-10">

            {/* Title + Subtitle */}
            <h3 className="text-[28px] md:text-[32px] font-extrabold mb-3 font-['Avenir'] text-gray-900">
              {p.title}
            </h3>
            {p.subtitle && (
              <p className="text-[16px] md:text-[18px] text-[#0052C6] font-semibold leading-relaxed mb-8">
                {p.subtitle}
              </p>
            )}

            {/* Divider */}
            {allItems.length > 0 && (
              <div className="h-px bg-gray-200 my-8" />
            )}

            {/* Items section */}
            {allItems.length > 0 && (
              <div>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-6">
                  ✓ What's Included
                </p>

                {/* Items grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {allItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-gradient-to-br from-[#F4F7FF] to-[#EEF4FB] rounded-xl p-4 border border-[#E6F1FB]"
                    >
                      {/* Checkmark */}
                      <div className="w-6 h-6 rounded-full bg-[#0052C6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-[15px] leading-relaxed text-gray-700">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              
              <a  href="#"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0052C6] hover:bg-[#003fa0] active:bg-[#002d70] text-white font-bold text-[15px] py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get a Quote
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-0 px-6 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold text-[15px] transition-all duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [heightExceeded, setHeightExceeded] = useState(false)
  const itemsContainerRef = useRef<HTMLUListElement>(null) // ✅ Ref to measure height

  const imageUrl = p.image?.url?.trim() ? p.image.url : '/assets/jt/exterior-ser-1.png'
  const imageAlt = p.image?.alt?.trim() ? p.image.alt : p.title
  const allItems = p.items || []

  // ✅ Measure height on mount and when items change
  useEffect(() => {
    if (itemsContainerRef.current) {
      const height = itemsContainerRef.current.scrollHeight
      setHeightExceeded(height > MAX_HEIGHT)
    }
  }, [allItems])

  return (
    <>
      <div
        className={`flex flex-col ${p.imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 overflow-hidden`}
      >
        {/* Image */}
        <div className="w-full lg:w-[48%] flex-shrink-0">
          <div className="w-full h-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-[16px]"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
            {p.tag}
          </p>
          <h3 className="text-[38px] font-extrabold mb-2 font-['Avenir']">
            {p.title}
          </h3>
          {p.subtitle && (
            <p className="text-[24px] text-[#0052C6] leading-relaxed mb-4 w-[80%]">
              {p.subtitle}
            </p>
          )}

          {/* ✅ Items list with ref and height constraint */}
          {allItems.length > 0 && (
            <ul
              ref={itemsContainerRef}
              className={`list-disc pl-6 space-y-1 mb-2 ${
                heightExceeded ? 'overflow-hidden' : ''
              }`}
              style={heightExceeded ? { maxHeight: `${MAX_HEIGHT}px` } : {}}
            >
              {allItems.map((item, i) => (
                <li key={i} className="text-[18px] leading-relaxed">
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {/* ✅ Read More button — only if height exceeded */}
          {heightExceeded && (
            <div className="mt-3">
              <button
                onClick={() => setLightboxOpen(true)}
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0052C6] hover:text-[#003fa0] transition-colors cursor-pointer"
              >
                Read More
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox p={p} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  )
}

export default function ExteriorServices({
  sectionTag = "Exterior Paint",
  heading = "Products & Services",
  description = "Whether you know exactly what you're looking for or need a little guidance, Jones Paint & Glass has what you need.",
  buttonText = "Get a Quote",
  buttonLink = "#",
  paintswatch = null,
  products = [],
}: ExteriorServicesBlockProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="relative py-14 md:py-20 bg-white overflow-hidden">

      {paintswatch?.url && (
        <div
          className="pointer-events-none absolute top-60 lg:top-10 right-0 w-full h-56 lg:h-120 z-0"
          style={{
            backgroundImage: `url(${paintswatch.url})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right",
          }}
        />
      )}
      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* Header */}
        <div className="mb-20 text-center lg:text-start">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
            {sectionTag}
          </p>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-none  mb-3 font-['Avenir']">
            {heading}
          </h2>
          {description && (
            <p className="text-[18px] leading-relaxed mx-auto lg:mx-0 max-w-xl mb-5">
              {description}
            </p>
          )}
          {buttonText && (
            <a href={buttonLink}
              className="group inline-flex items-center gap-2 bg-[#0052C6] hover:bg-[#003fa0] transition-colors text-white font-bold text-[16px] px-5 py-3 rounded-[8px]"
            >
              {buttonText}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* Product rows */}
        <div className="flex flex-col gap-6">
          {products.map((p, index) => (
            <ProductCard key={p.id || index} p={p} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}