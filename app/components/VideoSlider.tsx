"use client";
import { useState, useEffect, useRef } from "react";

// ─── Types matching Payload block schema ──────────────────────────────────────

type VideoItem = {
  title: string;
  description?: string;
  video: {
    url: string; // Cloudinary URL from your media collection
    alt?: string;
  };
};

type VideoSliderProps = {
  heading?: string;
  buttonLabel?: string;
  buttonLink?: string;
  videos: VideoItem[];
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function VideoSlider({
  heading = "Paint",
  buttonLabel = "Paint Products & Services",
  buttonLink = "#",
  videos = [],
}: VideoSliderProps) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(4);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const max = Math.max(0, videos.length - visible);

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1280) setVisible(4);
      else if (window.innerWidth >= 768) setVisible(3);
      else setVisible(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset current if it exceeds new max
  useEffect(() => {
    if (current > max) setCurrent(0);
  }, [visible, max]);

  // Auto loop
  useEffect(() => {
    if (videos.length <= visible) return; // no looping needed if all fit
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p >= max ? 0 : p + 1));
    }, 3000);
    return () => clearInterval(intervalRef.current!);
  }, [max, videos.length, visible]);

  const goTo = (index: number) => {
    clearInterval(intervalRef.current!);
    setCurrent(index);
    if (videos.length > visible) {
      intervalRef.current = setInterval(() => {
        setCurrent((p) => (p >= max ? 0 : p + 1));
      }, 3000);
    }
  };

  const cardWidth = `calc(${100 / visible}% - ${(16 * (visible - 1)) / visible}px)`;

  if (!videos.length) return null;

  return (
    <div className="py-16 mt-16">
      {/* Header */}
      <div className="container mx-auto flex items-center justify-between pb-10 px-4">
        <h2 className="text-[48px] font-[Avenir] font-bold pl-4">{heading}</h2>
        {buttonLabel && (
          <a
            href={buttonLink}
            className="group flex items-center bg-[#A5EBCD] text-black text-[16px] font-semibold px-5 py-3 rounded-[8px] cursor-pointer gap-1"
          >
            {buttonLabel}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
      <div className="flex items-center gap-4 container mx-auto">
        {/* Prev */}
        <button
          onClick={() => goTo(current === 0 ? max : current - 1)}
          className="-mt-15 w-9 h-9 rounded-full bg-[#0052C6] flex items-center justify-center flex-shrink-0 cursor-pointer"
          aria-label="Previous"
        >
          <svg
            className="w-8 h-8 stroke-white fill-none"
            strokeWidth={1.2}
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Track */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${current} * (${100 / visible}%) - ${(current * 16) / visible}px))`,
            }}
          >
            {videos.map((v, i) => (
              <div key={i} className="flex-shrink-0" style={{ width: cardWidth }}>
                <div className="rounded-xl overflow-hidden aspect-video bg-black">
                  <video
                    src={v.video?.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <p className="text-[20px] font-semibold my-2">{v.title}</p>
                {v.description && (
                  <p className="text-[12px] text-gray-500">{v.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={() => goTo(current >= max ? 0 : current + 1)}
          className="-mt-15 w-9 h-9 rounded-full bg-[#0052C6] flex items-center justify-center flex-shrink-0 cursor-pointer"
          aria-label="Next"
        >
          <svg
            className="w-8 h-8 stroke-white fill-none"
            strokeWidth={1.2}
            viewBox="0 0 24 24"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* Dots — only show if there are multiple positions */}
      {max > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? "bg-[#0052C6] w-4" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}