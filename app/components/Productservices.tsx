import React from "react";

type Service = {
  id?: string;
  title: string;
  image: {
    url: string;
    alt?: string;
  };
  link: string;
};

type ProductServicesBlockProps = {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  services?: Service[];
};

export default function ProductServicesBlock({
  heading = "Products & Services",
  description = "Paint and glass are in our name, but our offerings expand beyond just that. We also do both commercial and residential doors and garage doors.",
  ctaText = "Get a Quote",
  ctaLink = "#",
  services = [],
}: ProductServicesBlockProps) {
  return (
    <section className="pt-16 md:pt-24 relative">
      {/* Decorative Elements */}
      <div
        className="absolute sm:bottom-[-160px] left-0 w-full pointer-events-none z-2"
        id="service-element"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-1.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom left",
          height: "100%",
          transform: "rotate(0deg)",
          transformOrigin: "bottom left",
        }}
      />
      <div
        className="absolute top-[-200px] left-0 w-full pointer-events-none z-2"
        id="service-element-2"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-1.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
          height: "100%",
          transform: "rotate(45deg)",
          transformOrigin: "top left",
        }}
      />

      <div className="mx-auto container px-0 lg:px-6">
        <div className="flex flex-col xl:flex-row gap-8 md:gap-10 xl:gap-12">
          {/* Left: Heading + Button */}
          <div className="relative z-2 flex-1 lg:w-full xl:w-80 shrink-0 xl:text-start text-center">
            <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-bold text-black mb-4 leading-tight font-['Avenir']">
              {heading}
            </h2>
            <p className="w-[100%] xl:w-[65%] text-[16px] text-gray-500 leading-relaxed mb-8 xl:px-0 md:px-10 px-2">
              {description}
            </p>
            <div className="relative z-2 flex flex-wrap justify-center xl:justify-start gap-3">
              <a
                href={ctaLink}
                className="group inline-flex items-center gap-2 rounded-[8px] bg-[#A5EBCD] px-5 py-3 text-[16px] font-semibold text-black transition-colors"
              >
                {ctaText}
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

          {/* Right: Service Cards */}
          <div className="relative z-2 flex-1 w-full">
            <div
              className="grid sm:grid-cols-2 grid-cols-1 gap-7 sm:gap-5 xl:gap-7"
              id="service-cards"
            >
              {services.map((service, index) => (
                <a
                  key={service.id || index}
                  href={service.link}
                  className="group bg-[#F0F4FF] rounded-2xl overflow-hidden p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="h-44 md:h-52 overflow-hidden rounded-md">
                    <img
                      src={
                        service.image?.url && service.image.url.trim() !== ''
                          ? service.image.url
                          : '/assets/jt/default.jpg'
                      }
                      alt={service.image?.alt || service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Caption */}
                  <div className="py-4">
                    <p className="text-[20px] font-bold text-gray-900 mb-1">
                      {service.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[16px] font-bold text-black">
                      See Options
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
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
