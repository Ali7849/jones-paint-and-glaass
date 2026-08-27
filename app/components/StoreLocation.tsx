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

// ── Single Specialist ──
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

// ── Multiple Specialists ──
function MultipleSpecialists({ specialists }: { specialists: Specialist[] }) {
  return (
    <div className="rounded-[16px] bg-black h-auto p-6 sm:p-8 flex flex-col relative overflow-hidden flex-shrink-0">
      <div
        className="absolute right-0 bottom-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-23.png)",
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
                <h3 className="font-bold text-white text-[24px] sm:text-[28px] leading-tight">
                  {specialist.specialistName}
                </h3>
                <p className="text-[16px] text-white/70 mt-1">
                  {specialist.specialistTitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hero Card ──
function HeroCard({ heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="rounded-2xl bg-[#0052C6] overflow-hidden relative flex flex-col justify-start p-6">
      <div className="absolute right-0 bottom-0 w-full pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url(/assets/jt/elements/paint-16.png)", backgroundSize: "contain", backgroundPosition: "right bottom", backgroundRepeat: "no-repeat", height: "50%", }} />
      <div className="relative z-10">
        <p className="text-[14px] font-bold tracking-[0.2em] text-[#A5EBCD] uppercase mb-3">{heroCardLabel}</p>
        <h3 className="text-white text-[26px] lg:text-[30px] leading-tight mb-4 font-['Avenir'] font-extrabold">{heroCardHeading}</h3>
        <p className="text-white text-[16px] leading-relaxed">{heroCardText}</p>
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT CONDITIONS BASED ON SERVICE COUNT
// ──────────────────────────────────

// ── Layout: 2 Services ──
function Layout2({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Column */}
      <div className="w-full lg:w-[45%] flex flex-col gap-6">
        {/* Image */}
        {imgUrl ? (
          <div className="relative rounded-2xl overflow-hidden bg-[#DDEEFF] h-[300px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
        ) : (
          <div className="rounded-2xl bg-[#DDEEFF] h-[300px] flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}

        {/* Specialist */}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* Right Column - Services (1 column) */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6">
        {services.map((service: Service, index: number) => (
          <ServiceCard key={service.id || index} service={service} />
        ))}
      </div>
    </div>
  );
}

// ── Layout: 3 Services ──
function Layout3({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col gap-6">
      {/* Image */}
      {imgUrl ? (
        <div className="relative rounded-2xl overflow-hidden bg-[#DDEEFF] h-[250px]">
          <Image src={imgUrl} alt={imgAlt} fill className="object-cover" sizes="100vw" />
        </div>
      ) : (
        <div className="rounded-2xl bg-[#DDEEFF] h-[250px] flex items-center justify-center">
          <p className="text-gray-400">No image</p>
        </div>
      )}

      {/* Services Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service: Service, index: number) => (
          <ServiceCard key={service.id || index} service={service} />
        ))}
      </div>

      {/* Specialist */}
      {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
      {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
    </div>
  );
}

// ── Layout: 4 Services ──
function Layout4({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Column */}
      <div className="w-full lg:w-[40%] flex flex-col gap-6">
        {/* Image */}
        {imgUrl ? (
          <div className="relative rounded-2xl overflow-hidden bg-[#DDEEFF] h-[280px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        ) : (
          <div className="rounded-2xl bg-[#DDEEFF] h-[280px] flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>

      {/* Right Column - Services + Hero + Specialist */}
      <div className="w-full lg:w-[60%] flex flex-col gap-6">
        {/* Hero Card */}
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        {/* Services Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-6">
          {services.map((service: Service, index: number) => (
            <ServiceCard key={service.id || index} service={service} />
          ))}
        </div>

        {/* Specialist */}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>
    </div>
  );
}

// ── Layout: 5 Services ──
function Layout5({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Column */}
      <div className="w-full lg:w-[40%] flex flex-col gap-6">
        {/* Image */}
        {imgUrl ? (
          <div className="relative rounded-2xl overflow-hidden bg-[#DDEEFF] h-[280px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        ) : (
          <div className="rounded-2xl bg-[#DDEEFF] h-[280px] flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>

      {/* Right Column - Services + Hero + Specialist */}
      <div className="w-full lg:w-[60%] flex flex-col gap-6">
        {/* Hero Card */}
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        {/* Services Grid - 2/3 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: Service, index: number) => (
            <ServiceCard key={service.id || index} service={service} />
          ))}
        </div>

        {/* Specialist */}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>
    </div>
  );
}

// ── Layout: 6 Services ──
function Layout6({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Column */}
      <div className="w-full lg:w-[35%] flex flex-col gap-6">
        {/* Image */}
        {imgUrl ? (
          <div className="relative rounded-2xl overflow-hidden bg-[#DDEEFF] h-[300px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 35vw" />
          </div>
        ) : (
          <div className="rounded-2xl bg-[#DDEEFF] h-[300px] flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}

        {/* Specialist */}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* Right Column - Services + Hero */}
      <div className="w-full lg:w-[65%] flex flex-col gap-6">
        {/* Hero Card */}
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        {/* Services Grid - 3 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: Service, index: number) => (
            <ServiceCard key={service.id || index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Layout: 7+ Services ──
function Layout7Plus({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Column */}
      <div className="w-full lg:w-[30%] flex flex-col gap-6">
        {/* Image */}
        {imgUrl ? (
          <div className="relative rounded-2xl overflow-hidden bg-[#DDEEFF] h-[300px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
          </div>
        ) : (
          <div className="rounded-2xl bg-[#DDEEFF] h-[300px] flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}

        {/* Specialist */}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* Right Column - Services + Hero */}
      <div className="w-full lg:w-[70%] flex flex-col gap-6">
        {/* Hero Card */}
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        {/* Services Grid - 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service: Service, index: number) => (
            <ServiceCard key={service.id || index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────

export default function StoreLocation({
  locationLabel = "Store Location",
  heading = "Cedar City",
  address = "38 East 1600 North, Cedar City UT 84721",
  storeImage = null,
  Specialists = [],
  heroCardLabel = "Products & Services",
  heroCardHeading = "From Inspiration to Installation",
  heroCardText = "Our team will make sure you not only have the products you need, but a solid plan to go with them.",
  services = [],
}: StoreLocationBlockProps) {

  const imgUrl = typeof storeImage === "string" ? storeImage || null : storeImage?.url ?? null;
  const imgAlt = typeof storeImage === "object" && storeImage !== null ? storeImage.alt ?? heading : heading;

  const serviceCount = services?.length || 0;

  if (serviceCount === 0) return null;

  return (
    <section className="mt-20 py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">

        {/* ── GENERIC HEADER (ALWAYS THE SAME) ── */}
        <div className="text-center mb-16">
          <p className="text-[14px] font-bold tracking-widest text-[#0052C6] uppercase mb-3">
            {locationLabel}
          </p>
          <h1 className="text-[48px] font-extrabold mb-4 font-['Avenir']">
            {heading}
          </h1>
          <div className="flex items-center justify-center gap-2 text-[18px]">
            <svg className="w-5 h-5 text-[#0052C6]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
            {address}
          </div>
        </div>

        {/* ── DYNAMIC LAYOUT (CHANGES BASED ON SERVICE COUNT) ── */}
        {serviceCount === 2 && <Layout2 services={services} Specialists={Specialists} imgUrl={imgUrl} imgAlt={imgAlt} heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />}
        {serviceCount === 3 && <Layout3 services={services} Specialists={Specialists} imgUrl={imgUrl} imgAlt={imgAlt} heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />}
        {serviceCount === 4 && <Layout4 services={services} Specialists={Specialists} imgUrl={imgUrl} imgAlt={imgAlt} heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />}
        {serviceCount === 5 && <Layout5 services={services} Specialists={Specialists} imgUrl={imgUrl} imgAlt={imgAlt} heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />}
        {serviceCount === 6 && <Layout6 services={services} Specialists={Specialists} imgUrl={imgUrl} imgAlt={imgAlt} heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />}
        {serviceCount >= 7 && <Layout7Plus services={services} Specialists={Specialists} imgUrl={imgUrl} imgAlt={imgAlt} heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />}
      </div>
    </section>
  );
}