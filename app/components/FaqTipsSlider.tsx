"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Slide {
  id?: string;
  image?: {
    url?: string | null;
    alt?: string | null;
  } | null;
}

interface faqTipsSliderProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  slides?: Slide[];
}

export default function faqTipsSlider({
  heading = "Helpful Faq Tips ",
  description = "Got questions about your paint, glass, or door Faq project? Check out our latest how-to videos with tips from JP&G pros.",
  buttonText = "See More",
  buttonLink = "#",
  slides = [],
}: faqTipsSliderProps) {
  const [visible, setVisible] = useState(3);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const max = Math.max(0, slides.length - visible);

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisible(3);
      else if (window.innerWidth >= 768) setVisible(2);
      else setVisible(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset index if out of bounds
  useEffect(() => {
    if (current > max) setCurrent(0);
  }, [visible, max, current]);

  // Autoplay
  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= max ? 0 : prev + 1));
    }, 4000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [max]);

  const goTo = (index: number) => {
    setCurrent(index);
    startAutoPlay();
  };

  const prev = () => goTo(current === 0 ? max : current - 1);
  const next = () => goTo(current >= max ? 0 : current + 1);

  const cardWidth = `calc(${100 / visible}% - ${(16 * (visible - 1)) / visible}px)`;

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">

      {/* Background */}
      <div
        className="absolute -top-20 left-0 w-full pointer-events-none z-0"
        id="faqs-tip-element"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-13.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          height: "70%",
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[36px] md:text-[48px] mb-5">{heading}</h2>

          {description && (
            <p className="text-[16px] max-w-md mx-auto leading-relaxed mb-8">
              {description}
            </p>
          )}

          {buttonText && (
            
            <a  href={buttonLink}
              className="group inline-flex items-center gap-2 rounded-[8px] bg-[#A5EBCD] px-5 py-3 text-[16px] font-bold text-black hover:bg-[#8FE0BC] transition-colors"
            >
              {buttonText}
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
          )}
        </div>

        {/* Slider */}
        <div className="flex items-center gap-4">

          {/* Prev */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-[#0052C6] hover:bg-[#003fa0] flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 stroke-white fill-none" strokeWidth={2} viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Slides */}
          <div className="overflow-hidden flex-1">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${current} * (${100 / visible}%) - ${(current * 16) / visible}px))`,
              }}
            >
              {slides.map((slide, index) => {
                const imageUrl = slide.image?.url?.trim()
                  ? slide.image.url
                  : '/assets/jt/media-1.png';

                return (
                  <div
                    key={slide.id || index}
                    className="flex-shrink-0"
                    style={{ width: cardWidth }}
                  >
                    <div className="rounded-2xl overflow-hidden bg-[#EEF4FB]">
                      <div className="relative w-full aspect-video">
                        <Image
                          src={imageUrl}
                          alt={slide.image?.alt || `Slide ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          loading="lazy"
                          quality={75}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-[#0052C6] hover:bg-[#003fa0] flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 stroke-white fill-none" strokeWidth={2} viewBox="0 0 24 24">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "10px",
                height: "10px",
                background: i === current ? "#0052C6" : "#93C5FD",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}