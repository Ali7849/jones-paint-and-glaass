import Image from "next/image";
import Link from "next/link";

type DiySupportBlogProps = {
  tag?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: {
    url: string;
    alt?: string;
  };
};

export default function DiySupportBlog({
  tag = "DIY SUPPORT BLOG",
  heading = "The Crash Course",
  description = "For the real DIY-er, our blog is full of the most usable tips, tricks and don't-forgets related to paint, glass and door projects. Find the article you need or subscribe to stay up to date on all of the JP&G support.",
  buttonText = "Find an Article",
  buttonLink = "#",
  image,
}: DiySupportBlogProps) {
  const imgUrl = image?.url || "/assets/jt/media-paint.png";
  const imgAlt = image?.alt || "DIY Support Blog";

  return (
    <section className="relative">
      <div className="pointer-events-none inset-0">
        <div
          className="absolute -bottom-20 md:-bottom-60 right-0 w-50 md:w-100 z-2 sm:w-25 "
          style={{
            backgroundImage: "url(/assets/jt/elements/paint-4.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom right",
            height: "100%",
            transform: "rotate(0deg)",
            transformOrigin: "bottom right",
          }}
        />
      </div>
      <div className="container mx-auto w-full px-4 md:px-10 ">
        <div className="bg-[#F8F9FC] rounded-2xl  flex flex-col lg:flex-row px-8 xl:px-12 lg:px-10 py-8 xl:py-12 lg:py-10">
          {/* Left: Image */}
          <div className="relative w-full lg:w-[50%] shrink-0 h-[220px] sm:h-[260px] md:h-auto min-h-[280px]">
            <Image
              src={imgUrl}
              alt={imgAlt}
              fill
              className="object-cover object-center rounded-[15px]"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-start text-center md:text-start px-1 lg:px-10 py-8 lg:pb-10 lg:pt-5 gap-1 relative z-10">
            {/* Tag */}
            <p
              className="font-bold tracking-widest text-[#0052C6] mb-3"
              style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
            >
              {tag}
            </p>

            {/* Heading */}
            <h2
              className="font-bold text-black mb-4 leading-tight"
              style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
            >
              {heading}
            </h2>

            {/* Description */}
            <p
              className="md:w-[70%] w-full px-12 md:px-1 text-gray-600 leading-relaxed mb-3"
              style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
            >
              {description}
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href={buttonLink || "#"}
                className="group inline-flex items-center gap-2 bg-[#0052C6] hover:bg-[#0041a8] text-white font-semibold rounded-[8px] px-5 py-3 transition-colors duration-200"
                style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}
              >
                {buttonText}
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
