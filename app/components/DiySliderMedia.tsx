'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

import "swiper/css";
import "swiper/css/navigation";

type DiyItem = {
  id?: string
  name: string
  image: {
    url: string
    alt?: string
    filename?: string
  }
}

type DiySliderBlockProps = {
  heading?: string
  subtext?: string
  showInstagram?: boolean
  showTiktok?: boolean
  slides?: DiyItem[]
}

export default function DiySliderMedia({
  heading = 'Get More DIY Tips & Ideas',
  subtext = 'Follow us on social media for how-to videos and product info from the same pros who will help you in our stores.',
  showInstagram = true,
  showTiktok = true,
  slides = [],
}: DiySliderBlockProps) {
  const [activeTab, setActiveTab] = useState<"instagram" | "tiktok">("instagram");

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handleBeforeInit = (swiper: SwiperType) => {
    if (typeof swiper.params.navigation === 'object' && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  const showSocialTabs = showInstagram || showTiktok;

  return (
    <section className="relative w-full bg-white py-10 sm:py-12 md:py-14">
      {/* Background decoration */}
      <div className="pointer-events-none inset-0">
        <div
          className="absolute -top-70 md:-top-80 right-0 w-100"
          style={{
            backgroundImage: 'url(/assets/jt/elements/paint-4.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top right',
            height: '100%',
            transform: 'rotate(0deg)',
            transformOrigin: 'top right',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header row */}
        <div className="container mx-auto flex flex-col md:flex-row md:items-end justify-between text-center md:text-start gap-6 mb-15 px-4 sm:px-6 md:px-12">

          <div className="w-full xl:w-1/2 lg:w-2/3 md:w-2/3">
            <h2 className="text-[28px] md:text-[34px] lg:text-[48px] font-bold text-black mb-3 leading-tight font-['Avenir']">
              {heading}
            </h2>
            <p className="text-[16px] text-black leading-relaxed mb-6 pr-0 md:pr-[15%] font-['Avenir']">
              {subtext}
            </p>

            {/* Platform buttons */}
            {showSocialTabs && (
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                {showInstagram && (
                  <button
                    onClick={() => setActiveTab("instagram")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "instagram"
                        ? "bg-[#0052C6] text-white"
                        : "bg-[#0052C6] text-white"
                    }`}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </button>
                )}

                {showTiktok && (
                  <button
                    onClick={() => setActiveTab("tiktok")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "tiktok"
                        ? "bg-[#0052C6] text-white"
                        : "bg-[#0052C6] text-white"
                    }`}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
                    </svg>
                    TikTok
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Arrow controls */}
          <div className="flex gap-3 justify-end md:justify-start flex-shrink-0 md:mb-0 -mb-8" id='diy-btn'>
            <button
              ref={prevRef}
              aria-label="Previous"
              className="w-11 h-11 rounded-full bg-[#D9FDED] hover:bg-[#A5EBCD] flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-8 h-8 stroke-black fill-none" strokeWidth={1.2} viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              ref={nextRef}
              aria-label="Next"
              className="w-11 h-11 rounded-full bg-[#D9FDED] hover:bg-[#A5EBCD] flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-8 h-8 stroke-black fill-none" strokeWidth={1.2} viewBox="0 0 24 24">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper — white card bleeding off right */}
        <div className="bg-white py-6 sm:py-8 pl-4 sm:pl-6 md:pl-8 ml-[10%] sm:ml-[10%] md:ml-[10%] lg:ml-[10%] xl:ml-[6%] xxl:ml-[10%] rounded-l-3xl">
          <div className="w-full overflow-hidden">
            {slides && slides.length > 0 ? (
              <Swiper
                modules={[Navigation, Autoplay]}
                loop={true}
                onBeforeInit={handleBeforeInit}
                spaceBetween={12}
                slidesPerView={1.2}
                breakpoints={{
                  400: { slidesPerView: 1.5, spaceBetween: 12 },
                  540: { slidesPerView: 2, spaceBetween: 14 },
                  768: { slidesPerView: 2.4, spaceBetween: 16 },
                  1024: { slidesPerView: 2.8, spaceBetween: 16 },
                  1200: { slidesPerView: 3.3, spaceBetween: 16 },
                  1400: { slidesPerView: 4, spaceBetween: 16 },
                  1600: { slidesPerView: 4.5, spaceBetween: 16 },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {slides.map((slide, index) => {
                  const imageUrl = slide.image?.url ?? '/assets/jt/diy-1.png';
                  const imageAlt = slide.image?.alt ?? slide.name;

                  return (
                    <SwiperSlide key={slide.id || index}>
                      <div className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white">
                        <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px]">
                          <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-gray-400">No slides added. Create slides in Payload admin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}