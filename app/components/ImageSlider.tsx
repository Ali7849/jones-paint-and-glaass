'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

type Location = {
  id?: string;
  name: string;
  slug?: string;
  locationImage?: {
    url?: string | null;
    alt?: string | null;
  } | null;
};

type ImageSliderBlockProps = {
  heading?: string;
  description?: string;
  adddescription?: string;
  // IDs of selected locations from Payload block field — empty = show all
  locations?: { id: string; value?: any }[] | string[] | null;
};

export default function ImageSlider({
  heading = "JP&G Locations",
  description = "We have stores scattered throughout Utah. Check out the products and information for the store nearest you!",
  adddescription = "",
  locations: selectedLocations,
}: ImageSliderBlockProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [fetchedLocations, setFetchedLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/locations?limit=100&sort=name&depth=3');
        const data = await res.json();
        const docs: any[] = data?.docs ?? [];

        const mapped: Location[] = docs.map((loc: any) => ({
          id: loc.id,
          name: loc.name,
          slug: loc.slug,
          locationImage: loc.locationImage
            ? {
                url: typeof loc.locationImage === 'object'
                  ? loc.locationImage.url
                  : loc.locationImage,
                alt: loc.locationImage?.alt || loc.name,
              }
            : null,
        }));

        // Filter if specific locations are selected in block
        if (!selectedLocations || selectedLocations.length === 0) {
          setFetchedLocations(mapped);
        } else {
          const selectedIds = selectedLocations.map((loc: any) =>
            typeof loc === 'object' ? (loc.value?.id ?? loc.id ?? loc.value) : loc
          );
          setFetchedLocations(mapped.filter((loc) => selectedIds.includes(loc.id)));
        }
      } catch (err) {
        console.error('Failed to load locations:', err);
        setFetchedLocations([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadLocations();
  }, []);

  useEffect(() => {
    if (!isLoading && fetchedLocations.length > 0) {
      const timer = setTimeout(() => {
        swiperRef.current?.update();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, fetchedLocations.length]);

  const handleBeforeInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    if (typeof swiper.params.navigation === "object" && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  return (
    <section
      className="mt-[-100px] pr-[10%] pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#0052C6] to-[#002559]"
      id="jp-slider"
    >
      <div className="grid grid-cols-12 items-end bg-white py-10 rounded-r-3xl gap-6">

        {/* LEFT SIDE */}
        <div className="col-span-12 lg:col-span-5 pl-6 lg:pl-10 pr-6 lg:pr-0">
          <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-bold text-black mb-4 leading-tight font-['Avenir']">
            {heading}
          </h2>
          <p className="text-[16px] text-gray-500 leading-relaxed mb-4 lg:pr-[20%] font-['Avenir']">
            {description}
          </p>
          {adddescription && (
            <p className="text-[16px] text-gray-500 leading-relaxed mb-8 lg:pr-[20%] font-['Avenir']">
              {adddescription}
            </p>
          )}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-full bg-[#D9FDED] hover:bg-[#A5EBCD] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <svg className="w-8 h-8 stroke-black fill-none" strokeWidth={1.2} viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              ref={nextRef}
              className="w-11 h-11 rounded-full bg-[#D9FDED] hover:bg-[#A5EBCD] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <svg className="w-8 h-8 stroke-black fill-none" strokeWidth={1.2} viewBox="0 0 24 24">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — SWIPER */}
        <div className="col-span-12 lg:col-span-7 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-[420px] bg-gray-100 rounded-xl">
              <div className="animate-pulse text-gray-400">Loading locations...</div>
            </div>
          ) : fetchedLocations.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={fetchedLocations.length > 1}
              onBeforeInit={handleBeforeInit}
              slidesPerView={1.1}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.2 },
                1200: { slidesPerView: 2.5 },
                1400: { slidesPerView: 3 },
              }}
              autoplay={
                fetchedLocations.length > 1
                  ? { delay: 2500, disableOnInteraction: false }
                  : false
              }
            >
              {fetchedLocations.map((loc, index) => {
                const imageUrl = loc.locationImage?.url?.trim()
                  ? loc.locationImage.url
                  : "/assets/jt/default.jpg";

                return (
                  <SwiperSlide key={loc.id || index}>
                    <Link href={`/${loc.slug}`}>
                      <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-white">
                        <div className="relative w-full h-[350px] md:h-[380px] lg:h-[420px]">
                          <Image
                            src={imageUrl}
                            alt={loc.locationImage?.alt || loc.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                            loading="lazy"
                            quality={75}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white/95 rounded-xl px-5 py-4 w-[90%] mx-auto mb-4 shadow-sm">
                          <h3 className="font-bold text-gray-900 text-[20px] mb-1">
                            {loc.name}
                          </h3>
                          <span className="text-[16px] text-gray-500 hover:text-gray-700 transition-colors">
                            Store Info
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="flex items-center justify-center h-[420px] bg-gray-100 rounded-xl">
              <p className="text-gray-400">No locations added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}