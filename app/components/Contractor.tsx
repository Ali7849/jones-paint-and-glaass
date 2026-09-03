'use client'
import { useState } from 'react'
type FAQ = {
  id?: string
  question: string
  answer: string
  highlight?: string
}
type GalleryImage = {
  id?: string
  image: {
    url: string
    alt?: string
  }
  description: string
  title: string
}
type ContractorBlockProps = {
  heading?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  faqs?: FAQ[]
  galleryTitle?: string
  largeImage?: {
    url: string
    alt?: string
  }
  largeImageTitle?: string
  largeImageSubtitle?: string
  topRowImages?: GalleryImage[]
  bottomLeftImage?: {
    url: string
    alt?: string
  }
  bottomLeftImageDescription?: string
  bottomLeftImageTitle?: string
  bottomRightImage?: {
    url: string
    alt?: string
  }
  bottomRightImageDescription?: string
  bottomRightImageTitle?: string
}
function AccordionItem({
  index,
  question,
  answer,
  highlight,
  isOpen,
  onToggle,
}: {
  index: number
  question: string
  answer: string
  highlight?: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-[#16B6E9]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className="md:text-[20px] text-[18px] font-semibold text-[#0052C6] shrink-0">
            {String(index).padStart(2, '0')}
          </span>
          <h3 className="md:text-[20px] text-[18px] font-bold text-black font-['Avenir']">{question}</h3>
        </div>
        <span className="shrink-0 text-[#0052C6] text-xl font-light leading-none">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pl-10 md:pr-[10%] pr-0 text-md leading-relaxed text-gray-600">
            {highlight && (
              <p className="text-[14px] font-semibold text-gray-800 mb-1 font-['Avenir']">{highlight}</p>
            )}
            <p className="text-[14px] text-gray-600 font-[Avenir]">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function Contractor({
  heading = 'Contractor Services',
  description = "We're DIY pros, but we also provide products and services to contractors throughout Utah.",
  primaryButtonText = 'Get a Quote',
  primaryButtonLink = '#',
  secondaryButtonText = 'Get a Quote',
  secondaryButtonLink = '#',
  faqs = [],
  galleryTitle = 'See What Our Contractors Have Done',
  largeImage,
  largeImageTitle = 'Jones Vinyl Windows',
  largeImageSubtitle = "Journey's End: 2024 Parade of Homes",
  topRowImages = [],
  bottomLeftImage,
  bottomLeftImageDescription = 'Open Floor Plan with Mountain View',
  bottomLeftImageTitle,
  bottomRightImage,
  bottomRightImageDescription = 'Open Floor Plan with Mountain View',
  bottomRightImageTitle,
}: ContractorBlockProps) {
  const [openId, setOpenId] = useState<string | null>(
    faqs && faqs.length > 0 ? faqs[0].id || '0' : null
  )
  const toggle = (id: string | undefined) => {
    if (id) {
      setOpenId((prev) => (prev === id ? null : id))
    }
  }
  const getImageUrl = (image: any): string => {
    const fallback = '/assets/jt/default.jpg'
    if (!image) return fallback
    const url = typeof image === 'string' ? image : image?.url
    if (!url || url.trim() === '') return fallback
    return url
  }
  return (
    <section className="relative z-1 bg-white py-16 md:py-24 overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-full pointer-events-none"
        id="contract-element"
        style={{
          backgroundImage: 'url(/assets/jt/elements/paint-2.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom right',
          height: '35%',
          transform: 'rotate(0deg)',
          transformOrigin: 'bottom right',
        }}
      />
      <div className="mx-auto container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          {/* Left: Heading + Buttons */}
          <div className="lg:w-[40%] w-full text-center lg:text-start">
            <h2 className="text-[28px] md:text-[34px] lg:text-[48px] font-bold text-black mb-4 leading-tight font-['Avenir']">
              {heading}
            </h2>
            <p className="text-[16px] text-gray-500 leading-relaxed mb-8 lg:pr-[20%] pr-0 font-['Avenir']">
              {description}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              
              <a  href={primaryButtonLink}
                className="group inline-flex items-center gap-2 rounded-[8px] bg-[#0052C6] px-5 py-3 text-[16px] font-semibold text-white hover:bg-black transition-colors"
              >
                {primaryButtonText}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              
              <a  href={secondaryButtonLink}
                className="group inline-flex items-center gap-2 rounded-[8px] border border-2 border-[#0052C6] px-5 py-3 text-[16px] font-semibold text-[#0052C6] hover:text-black hover:border-black hover:bg-transparent transition-colors"
              >
                {secondaryButtonText}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* Right: Accordion */}
          <div className="lg:w-[60%] w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.id || i}
                index={i + 1}
                question={faq.question}
                answer={faq.answer}
                highlight={faq.highlight}
                isOpen={openId === (faq.id || i.toString())}
                onToggle={() => toggle(faq.id || i.toString())}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Gallery Section */}
      <div className="bg-white pt-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="w-full mb-8">
            <h2 className="text-[28px] md:text-[30px] lg:text-[32px] text-center md:text-start font-bold font-['Avenir'] title-font text-black lg:mb-0 mb-4">
              {galleryTitle}
            </h2>
          </div>
          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 sm:gap-7 h-fit lg:h-[600px]">
            {/* Left large image — spans 2 rows */}
            <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={getImageUrl(largeImage)}
                alt={largeImageTitle}
                className="w-full h-full object-cover"
              />
              {/* Caption overlay with hover state */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end px-2 sm:px-4 pb-5">
                <div className="w-full sm:w-[80%] flex flex-col font-['Avenir']">
                  <p className="text-black text-[14px] font-bold leading-tight">{largeImageTitle}</p>
                  <p className="text-black/80 text-[14px] mt-0.5">{largeImageSubtitle}</p>
                </div>
              </div>
            </div>
            {/* Top row — 3 images */}
            {topRowImages.slice(0, 3).map((item, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer">
                {/* Image */}
                <img
                  src={getImageUrl(item.image)}
                  alt={item.description}
                  className="w-full h-full object-cover"
                />
                {/* Hover Overlay with text at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end p-4">
                  <p className="text-black text-[14px] font-bold leading-tight">{item.title}</p> 
                  <p className="text-black/80 text-[14px] leading-tight w-full sm:w-[80%]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            {/* Bottom left small image */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={getImageUrl(bottomLeftImage)}
                alt={bottomLeftImageDescription}
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay with text at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end p-4">
                <p className="text-black text-[14px] font-bold leading-tight">{bottomLeftImageTitle}</p>
                <p className="text-black/80 text-[14px] leading-tight w-full sm:w-[80%]">
                  {bottomLeftImageDescription}
                </p>
              </div>
            </div>
            {/* Bottom right large image — spans 2 columns */}
            <div className="relative col-span-2 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={getImageUrl(bottomRightImage)}
                alt={bottomRightImageDescription}
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay with text at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end p-4">
                <p className="text-black text-[14px] font-bold leading-tight">{bottomRightImageTitle}</p>
                <p className="text-black/80 text-[14px] leading-tight w-full sm:w-[80%]">
                  {bottomRightImageDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}