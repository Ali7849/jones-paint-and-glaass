"use client";

import { useState, useRef, useEffect } from "react";

type Review = {
  id?: string;
  quote: string;
  name: string;
  rating?: number;
  relativeTime?: string;
  link?: string; // ✅ added
};

type ReviewsBlockProps = {
  heading?: string;
  subtext?: string;
};

export default function Reviews({
  heading = "Hear What Others Have to Say",
  subtext = "We are proud to serve our neighbors and help bring their DIY and contractor projects to life!",
}: ReviewsBlockProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [googleMapsUri, setGoogleMapsUri] = useState(""); // ✅ added
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(3);
  const [current, setCurrent] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /*
   * Fetch Google Reviews
   */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/google-reviews");

        if (!response.ok) {
          throw new Error("Failed to fetch Google reviews");
        }

        const data = await response.json();

        setReviews(data.reviews || []);
        setRating(data.rating || 0);
        setTotalReviews(data.totalReviews || 0);
        setGoogleMapsUri(data.googleMapsUri || ""); // ✅ added
      } catch (error) {
        console.error("Google Reviews Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  /*
   * Responsive visible count
   */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) {
        setVisible(3);
      } else if (window.innerWidth >= 768) {
        setVisible(2);
      } else {
        setVisible(1);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /*
   * Maximum slider position
   */
  const max = Math.max(0, reviews.length - visible);

  /*
   * Reset current position if needed
   */
  useEffect(() => {
    if (current > max) {
      setCurrent(0);
    }
  }, [current, max]);

  /*
   * Auto play
   */
  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (max <= 0) return;

    intervalRef.current = setInterval(() => {
      setCurrent((previous) => (previous >= max ? 0 : previous + 1));
    }, 4000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [max]);

  /*
   * Slider navigation
   */
  const goTo = (index: number) => {
    setCurrent(index);
    startAutoPlay();
  };

  const prev = () => goTo(current === 0 ? max : current - 1);
  const next = () => goTo(current >= max ? 0 : current + 1);

  /*
   * Card width
   */
  const cardWidth = `calc(${100 / visible}% - ${
    (20 * (visible - 1)) / visible
  }px)`;

  /*
   * Loading state
   */
  if (loading) {
    return (
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-center h-[200px]">
          <p className="text-gray-400">Loading reviews...</p>
        </div>
      </section>
    );
  }

  /*
   * Empty state
   */
  if (reviews.length === 0) {
    return (
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-center h-[200px]">
          <p className="text-gray-400">No reviews available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-start md:justify-between gap-6 mb-15">

          <div>
            <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
              Reviews
            </p>

            <h2 className="text-[28px] md:text-[38px] font-extrabold mb-3 font-['Avenir']">
              {heading}
            </h2>

            <p className="text-[#0052C6] text-[18px] md:text-[24px] leading-relaxed max-w-lg">
              {subtext}
            </p>

            {/* Google Rating */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.round(rating)
                        ? "text-yellow-500 text-xl"
                        : "text-gray-300 text-xl"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="font-semibold text-gray-700">
                {rating.toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({totalReviews} Google reviews)
              </span>
            </div>
          </div>

          {/* Prev / Next */}
          {max > 0 && (
            <div className="flex items-center gap-3 md:mt-2 flex-shrink-0">
              <button
                onClick={prev}
                aria-label="Previous reviews"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: "#A5EBCD" }}
              >
                <svg
                  className="w-8 h-8 stroke-black fill-none"
                  strokeWidth={1.2}
                  viewBox="0 0 24 24"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={next}
                aria-label="Next reviews"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: "#A5EBCD" }}
              >
                <svg
                  className="w-8 h-8 stroke-black fill-none"
                  strokeWidth={1.2}
                  viewBox="0 0 24 24"
                >
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          )}

        </div>

        {/* Reviews Slider */}
        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${current} * (${100 / visible}%) - ${
                (current * 20) / visible
              }px))`,
            }}
          >
            {reviews.map((review, index) => (
              // ✅ wrapped in anchor tag
              
              <a  key={review.id || index}
                href={review.link || googleMapsUri || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex flex-col justify-between p-6 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
                style={{
                  width: cardWidth,
                  background: "#F8F9FC",
                  minHeight: "320px",
                }}
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={
                          starIndex < (review.rating || 0)
                            ? "text-yellow-500 text-lg"
                            : "text-gray-300 text-lg"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-[24px] leading-relaxed mb-6 text-center md:text-start">
                    {review.quote}
                  </p>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-4">
                  <div>
                    <p className="font-normal text-[18px]">{review.name}</p>
                    {review.relativeTime && (
                      <p className="text-sm text-gray-500">
                        {review.relativeTime}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}