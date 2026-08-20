"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

type DiyItem = {
  id?: string;
  name: string;
  image: {
    url: string;
    alt?: string;
    filename?: string;
  };
};

type InstagramPost = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
};

type DiySliderBlockProps = {
  heading?: string;
  subtext?: string;
  showInstagram?: boolean;
  showTiktok?: boolean;
  darkBackground?: boolean;
  slides?: DiyItem[];
};

const SWIPER_BREAKPOINTS = {
  400: { slidesPerView: 1.5, spaceBetween: 12 },
  540: { slidesPerView: 2, spaceBetween: 14 },
  768: { slidesPerView: 2.4, spaceBetween: 16 },
  1024: { slidesPerView: 2.8, spaceBetween: 16 },
  1200: { slidesPerView: 3.3, spaceBetween: 16 },
  1400: { slidesPerView: 4, spaceBetween: 16 },
  1600: { slidesPerView: 4.5, spaceBetween: 16 },
};

export default function Diyslider({
  heading = "Get More DIY Tips & Ideas",
  subtext = "Follow us on social media for how-to videos and product info from the same pros who will help you in our stores.",
  showInstagram = true,
  showTiktok = true,
  darkBackground = true,
  slides = [],
}: DiySliderBlockProps) {
  const [activeTab, setActiveTab] = useState<"instagram" | "tiktok">(
    showInstagram ? "instagram" : "tiktok"
  );
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loadingInstagram, setLoadingInstagram] = useState(false);
  const [instagramError, setInstagramError] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Fetch Instagram posts on mount
  useEffect(() => {
    if (!showInstagram) return;

    setLoadingInstagram(true);
    setInstagramError(false);

    fetch("/api/instagram")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setInstagramPosts(data.posts || []);
      })
      .catch((err) => {
        console.error("Failed to fetch Instagram posts:", err);
        setInstagramError(true);
      })
      .finally(() => {
        setLoadingInstagram(false);
      });
  }, [showInstagram]);

  // ✅ Key forces Swiper remount on tab switch so nav refs reconnect
  const handleBeforeInit = (swiper: SwiperType) => {
    if (
      typeof swiper.params.navigation === "object" &&
      swiper.params.navigation
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  const showSocialTabs = showInstagram || showTiktok;

  // Theme values
  const sectionBg = darkBackground
    ? "bg-gradient-to-b from-[#002559] to-[#0052C6]"
    : "bg-white";
  const headingColor = darkBackground ? "text-white" : "text-black";
  const subtextColor = darkBackground ? "text-white/80" : "text-gray-600";
  const buttonActiveBg = darkBackground
    ? "bg-white text-[#0052C6] border-white"
    : "bg-[#0052C6] text-white border-[#0052C6]";
  const buttonInactiveBg = darkBackground
    ? "bg-transparent text-white border-white/40 hover:border-white/80"
    : "bg-transparent text-[#0052C6] border-[#0052C6]/40 hover:border-[#0052C6]";

  // Shared Swiper props
  const swiperProps = {
    modules: [Navigation, Autoplay],
    loop: true,
    onBeforeInit: handleBeforeInit,
    spaceBetween: 12,
    slidesPerView: 1.2 as number,
    breakpoints: SWIPER_BREAKPOINTS,
    autoplay: { delay: 2500, disableOnInteraction: false },
  };

  const renderSliderContent = () => {
    // Instagram tab
    if (activeTab === "instagram") {
      if (loadingInstagram) {
        return (
          <div className="flex items-center justify-center h-[300px]">
            <div className="flex gap-2 items-center text-gray-400">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading Instagram posts...
            </div>
          </div>
        );
      }

      if (instagramError || instagramPosts.length === 0) {
        return (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-400">
              {instagramError ? "Failed to load Instagram posts." : "No Instagram posts found."}
            </p>
          </div>
        );
      }

      return (
        // ✅ key="instagram" forces remount when switching back to this tab
        <Swiper key="instagram" {...swiperProps}>
          {instagramPosts.map((post) => {
            const imageUrl =
              post.media_type === "VIDEO"
                ? post.thumbnail_url || post.media_url
                : post.media_url;

            return (
              <SwiperSlide key={post.id}>
                
                <a href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden border border-gray-100 bg-white group"
                >
                  <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px]">
                    <Image
                      src={imageUrl}
                      alt={post.caption?.slice(0, 50) || "Instagram post"}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Video indicator */}
                    {post.media_type === "VIDEO" && (
                      <div className="absolute top-3 right-3 bg-black/50 rounded-full p-1.5">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      );
    }

    // TikTok tab
    if (slides.length === 0) {
      return (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-gray-400">No slides added.</p>
        </div>
      );
    }

    return (
      // ✅ key="tiktok" forces remount when switching to this tab
      <Swiper key="tiktok" {...swiperProps}>
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white">
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px]">
                <Image
                  src={slide.image?.url ?? "/assets/jt/diy-1.png"}
                  alt={slide.image?.alt ?? slide.name}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <section className={`relative w-full ${sectionBg} py-6 sm:py-12 md:py-14`}>

      {darkBackground && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
        </div>
      )}

      <div className="relative z-10">

        {/* Header row */}
        <div className="container mx-auto flex flex-col md:flex-row md:items-end justify-between text-center md:text-start gap-6 mb-15 px-4 sm:px-6 md:px-12">
          <div className="w-full xl:w-1/2 lg:w-2/3 md:w-2/3">
            <h2 className={`text-[28px] md:text-[34px] lg:text-[48px] font-bold ${headingColor} mb-3 leading-tight font-['Avenir']`}>
              {heading}
            </h2>
            <p className={`text-[16px] ${subtextColor} leading-relaxed mb-6 pr-0 md:pr-[15%] font-['Avenir']`}>
              {subtext}
            </p>

            {/* Platform tab buttons */}
            {showSocialTabs && (
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                {showInstagram && (
                  <button
                    onClick={() => setActiveTab("instagram")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "instagram" ? buttonActiveBg : buttonInactiveBg
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
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "tiktok" ? buttonActiveBg : buttonInactiveBg
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
          <div className="flex gap-3 justify-end md:justify-start flex-shrink-0 md:mb-0 -mb-8">
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

        {/* Swiper area */}
        <div className="bg-white py-6 sm:py-8 pl-4 sm:pl-6 md:pl-8 ml-[10%] xl:ml-[6%] rounded-l-3xl">
          <div className="w-full overflow-hidden">
            {renderSliderContent()}
          </div>
        </div>

      </div>
    </section>
  );
}