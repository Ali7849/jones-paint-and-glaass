"use client";
import React from "react";

// ─── Types matching Payload block schema ──────────────────────────────────────

type MediaItem = {
  url: string;
  alt?: string;
};

type ButtonItem = {
  label: string;
  link?: string;
};

type DiyHeroProps = {
  card1Heading?: string;
  card1Description?: string;
  card2Heading?: string;
  card2Description?: string;
  bannerImage?: MediaItem;
  bannerTagline?: string;
  bannerHighlight?: string;
  bannerVectorImage?: MediaItem;
  buttons?: ButtonItem[];
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DiyHero({
  card1Heading = "The Drive to DIY",
  card1Description = "There are lots of fantastic reasons to Do-It-Yourself. There are also lots of ways to mess it up...",
  card2Heading = "The Team to Help You Do It",
  card2Description = "You can do it—we help you get it right the first time. Before you DIY, make sure to JP&G!",
  bannerImage,
  bannerTagline = "BEFORE YOU",
  bannerHighlight = "DIY",
  bannerVectorImage,
  buttons = [],
}: DiyHeroProps) {
  return (
    <section className="container mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-16 mt-16">

      {/* Top Two Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">

        {/* Card 1 — Blue */}
        <div className="bg-[#0052C6] rounded-2xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
          <h2
            className="text-white font-extrabold leading-tight mb-3 sm:mb-4 font-[Avenir]"
            style={{ fontSize: "clamp(28px, 3.5vw, 56px)" }}
          >
            {card1Heading}
          </h2>
          <p
            className="w-full lg:w-2/3 text-white/80 leading-relaxed font-[Avenir]"
            style={{ fontSize: "clamp(16px, 1.4vw, 18px)" }}
          >
            {card1Description}
          </p>
        </div>

        {/* Card 2 — Black */}
        <div className="bg-[#111111] rounded-2xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
          <h2
            className="text-white font-extrabold leading-tight mb-3 sm:mb-4 font-[Avenir]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            {card2Heading}
          </h2>
          <p
            className="w-full lg:w-2/3 text-white/80 leading-relaxed font-[Avenir]"
            style={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}
          >
            {card2Description}
          </p>
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px]">

        {/* Background Image */}
        {bannerImage?.url && (
          <img
            src={bannerImage.url}
            alt={bannerImage.alt ?? "DIY Banner"}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,243,0) 28.12%, rgba(211,191,150,0.29) 50.4%, rgba(255,232,184,0.29) 71.88%, rgba(211,191,150,0.29) 100%)",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-end justify-center sm:justify-end gap-6 sm:gap-8 px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-10 md:py-12">

          {/* Tagline + Highlight */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-white">
              <h3 className="text-xl font-extrabold">{bannerTagline}</h3>
              <h2 className="text-7xl font-extrabold -ml-1">{bannerHighlight}</h2>
            </div>

            {bannerVectorImage?.url && (
              <div>
                <img src={bannerVectorImage.url} alt={bannerVectorImage.alt ?? ""} />
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          {buttons.length > 0 && (
            <div className="flex items-center gap-3 sm:gap-4">
              {buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.link ?? "#"}
                  className="group flex items-center gap-2 bg-[#0052C6] text-white font-bold px-5 py-2.5 rounded-md transition-colors"
                  style={{ fontSize: "clamp(12px, 1.1vw, 15px)" }}
                >
                  {btn.label}
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
              ))}
            </div>
          )}

        </div>
      </div>

    </section>
  );
}