"use client";
import Image from "next/image";

type Service = {
  id?: string;
  title: string;
  href?: string;
  image: {
    url: string;
    alt?: string;
  };
};

type Specialist = {
  id?: string;
  specialistName: string;
  specialistTitle: string;
  specialistImage?: { url: string; alt?: string } | null;
};

type StoreLocationBlockProps = {
  locationLabel?: string;
  heading?: string;
  address?: string;
  storeImage?: { url: string; alt?: string } | string | null;
  Specialists?: Specialist[];
  heroCardLabel?: string;
  heroCardHeading?: string;
  heroCardText?: string;
  services?: Service[];
};

// ── Service Card ──
function ServiceCard({ service }: { service: Service }) {
  const imageUrl = service.image?.url ?? "/assets/jt/paint.png";
  const imageAlt = service.image?.alt ?? service.title;

  return (
    <div className="rounded-[16px] p-4 overflow-hidden bg-[#F4F7FF] flex flex-col">
      <div className="w-full overflow-hidden rounded-[8px]" style={{ height: "148px" }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={220}
          height={148}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pt-3 flex flex-col gap-1">
        <p className="text-[18px] font-bold">{service.title}</p>
        
        <a href={service.href || "#"}
          className="inline-flex items-center gap-1 text-[16px] font-medium hover:text-[#0052C6] transition-colors group"
        >
          Learn More
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ── Single Specialist — green horizontal card ──
function SingleSpecialist({ specialist }: { specialist: Specialist }) {
  return (
    <div className="rounded-[16px] bg-black p-5 sm:p-8 flex flex-col h-auto lg:h-[244px] items-start gap-4 relative overflow-hidden flex-shrink-0">
      <div
        className="absolute right-0 top-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-15.png)",
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <h4 className="relative z-10 text-[16px] text-[#A5EBCD] font-bold tracking-[0.15em] uppercase">
        Your Local Specialist
      </h4>
      <div className="relative z-10 flex items-center gap-6 sm:gap-8">
        <div className="w-[100px] lg:w-[132px] h-[100px] lg:h-[132px] bg-white rounded-full flex-shrink-0 overflow-hidden">
          <Image
            src={specialist.specialistImage?.url ?? "/assets/jt/profile.png"}
            alt={specialist.specialistImage?.alt ?? specialist.specialistName}
            width={132}
            height={132}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-[40px] text-white sm:text-[32px] leading-tight">
            {specialist.specialistName}
          </h3>
          <p className="text-[20px] mt-2 text-white/70">
            {specialist.specialistTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Multiple Specialists — dark stacked card ──
function MultipleSpecialists({ specialists }: { specialists: Specialist[] }) {
  return (
    <div className="rounded-[16px] bg-black p-6 sm:p-8 flex flex-col relative  overflow-hidden flex-shrink-0">
      <div
        className="absolute right-0 top-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-15.png)",
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <h4 className="relative z-10 text-[16px] font-bold tracking-[0.15em] text-[#A5EBCD] uppercase mb-5">
        Your Local Specialist
      </h4>
      <div className="relative z-10 flex flex-col">
        {specialists.map((specialist, index) => (
          <div key={specialist.id || index}>
            <div className="flex items-center gap-5 py-4">
              <div className="w-[72px] h-[72px] rounded-full bg-white flex-shrink-0 overflow-hidden">
                <Image
                  src={specialist.specialistImage?.url ?? "/assets/jt/profile.png"}
                  alt={specialist.specialistImage?.alt ?? specialist.specialistName}
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-[400px] sm:text-[32px] leading-tight">
                  {specialist.specialistName}
                </h3>
                <p className="text-[20px] text-white/70 mt-1">
                  {specialist.specialistTitle}
                </p>
              </div>
            </div>
            {index < specialists.length - 1 && (
              <div className="h-px bg-white/10 w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Empty Specialists — dark placeholder card ──
function EmptySpecialist() {
  return (
    <div className="rounded-[16px] bg-black p-6 sm:p-8 flex flex-col relative lg:h-[244px] overflow-hidden flex-shrink-0">
      <div
        className="absolute right-0 bottom-0 w-[60%] h-[50%] pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-15.png)",
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <h4 className="relative z-10 text-[16px] font-bold tracking-[0.15em] text-[#A5EBCD] uppercase mb-5">
        Your Local Specialist
      </h4>
      <div className="relative z-10 flex items-center gap-5 py-4">
        <div className="w-[72px] h-[72px] rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-white/40 text-[40px] sm:text-[32px] leading-tight">N/A</h3>
          <p className="text-[20px] text-white/25 mt-1">No specialist assigned</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──
export default function StoreLocation({
  locationLabel = "Store Location",
  heading = "American Fork",
  address = "65 South 500 East American Fork, UT 84003",
  storeImage = null,
  Specialists = [],
  heroCardLabel = "Products & Services",
  heroCardHeading = "From Inspiration to Installation",
  heroCardText = "Our team will make sure you not only have the products you need, but a solid plan to go with them.",
  services = [],
}: StoreLocationBlockProps) {

  // ── Resolve storeImage — handles string URL or Payload media object ──
  const imgUrl =
    typeof storeImage === "string"
      ? storeImage || null
      : storeImage?.url ?? null;

  const imgAlt =
    typeof storeImage === "object" && storeImage !== null
      ? storeImage.alt ?? heading
      : heading;

  return (
    <section className="mt-20 py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[16px] font-bold tracking-widest text-[#0052C6] uppercase mb-2">
            {locationLabel}
          </p>
          <h1 className="text-[36px] md:text-[48px] font-extrabold mb-3 font-['Avenir']">
            {heading}
          </h1>
          <div className="flex items-center justify-center gap-3 font-normal text-[18px] md:text-[24px]">
            <img src="/assets/jt/location-icon.png" className="w-5 h-6" alt="location" />
            {address}
          </div>
        </div>

        {/* Main grid */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-4 w-full lg:w-[45%] xl:w-[50%] flex-shrink-0">

            {/* Location image */}
            {imgUrl ? (
              <div className="relative rounded-2xl overflow-hidden bg-[#DDEEFF] flex-1 min-h-[300px]">
                <Image
                  src={imgUrl}
                  alt={imgAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="rounded-2xl bg-[#DDEEFF] flex-1 min-h-[300px] flex items-center justify-center">
                <p className="text-gray-400">No location image provided</p>
              </div>
            )}

            {/* Specialist card — always shows */}
            {Specialists.length === 0 && <EmptySpecialist />}
            {Specialists.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
            {Specialists.length > 1 && <MultipleSpecialists specialists={Specialists} />}

          </div>

          {/* ── Right column ── */}
          <div className="flex-1 grid grid-cols-2 gap-4 auto-rows-min">

            {/* Blue hero card — spans full left column, 2 rows */}
            <div className="row-span-2 rounded-2xl bg-[#0052C6] overflow-hidden relative flex flex-col justify-start p-6">
              <div
                className="absolute right-0 bottom-0 w-full pointer-events-none mix-blend-multiply"
                style={{
                  backgroundImage: "url(/assets/jt/elements/paint-16.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "right bottom",
                  backgroundRepeat: "no-repeat",
                  height: "50%",
                }}
              />
              <div className="relative z-10">
                <p className="text-[14px] font-bold tracking-[0.2em] text-[#A5EBCD] uppercase mb-3">
                  {heroCardLabel}
                </p>
                <h3 className="text-white text-[26px] lg:text-[30px] leading-tight mb-4 font-['Avenir'] font-extrabold">
                  {heroCardHeading}
                </h3>
                <p className="text-white text-[16px] leading-relaxed">
                  {heroCardText}
                </p>
              </div>
            </div>

            {/* Service cards — fill right column */}
            {services.length > 0 ? (
              services.map((service, index) => (
                <ServiceCard key={service.id || index} service={service} />
              ))
            ) : (
              <div className="col-span-1 flex items-center justify-center h-[200px] bg-gray-50 rounded-2xl">
                <p className="text-gray-400 text-sm">No services added yet.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}