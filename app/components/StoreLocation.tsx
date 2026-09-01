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

// ── Service Card (270px height) ──
const ServiceCard = ({ service }: { service: Service }) => {
  const imageUrl = service.image?.url ?? "/assets/jt/paint.png";
  const imageAlt = service.image?.alt ?? service.title;

  return (
    <div className="rounded-[16px] p-4 overflow-hidden bg-[#F4F7FF] flex flex-col h-[270px]">
      <div className="w-full overflow-hidden rounded-[8px] h-[150px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={200}
          height={150}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pt-3 flex flex-col gap-1 flex-1">
        <p className="text-[16px] font-bold">{service.title}</p>
        
        <a  href={service.href || "#"}
          className="text-[14px] font-semibold text-[#0052C6] hover:underline mt-auto"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

// ── Single Specialist ──
const SingleSpecialist = ({ specialist }: { specialist: Specialist }) => {
  return (
    <div className="rounded-[16px] bg-black p-6 flex items-center gap-6 relative overflow-hidden h-[260px]">
      <div
        className="absolute right-0 top-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-15.png)",
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 flex items-center gap-6 w-full">
        <div className="w-[100px] h-[100px] rounded-full flex-shrink-0 overflow-hidden bg-white">
          <Image
            src={specialist.specialistImage?.url ?? "/assets/jt/profile.png"}
            alt={specialist.specialistName}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-[12px] text-[#A5EBCD] font-bold tracking-[0.1em] uppercase mb-2">
            Your Local Specialist
          </h4>
          <h3 className="text-white text-[28px] font-bold leading-tight">
            {specialist.specialistName}
          </h3>
          <p className="text-white/70 text-[14px] mt-1">{specialist.specialistTitle}</p>
        </div>
      </div>
    </div>
  );
};

// ── Multiple Specialists ──
const MultipleSpecialists = ({ specialists }: { specialists: Specialist[] }) => {
  return (
    <div className="rounded-[16px] bg-black p-6 flex flex-col relative overflow-hidden h-[580px]">
      <div
        className="absolute right-0 bottom-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-23.png)",
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <h4 className="relative z-10 text-[12px] text-[#A5EBCD] font-bold tracking-[0.1em] uppercase mb-4">
        Your Local Specialist
      </h4>
      <div className="relative z-10 flex flex-col gap-3">
        {specialists.map((specialist, index) => (
          <div key={specialist.id || index} className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 overflow-hidden bg-white">
              <Image
                src={specialist.specialistImage?.url ?? "/assets/jt/profile.png"}
                alt={specialist.specialistName}
                width={60}
                height={60}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-[18px] font-bold">
                {specialist.specialistName}
              </h3>
              <p className="text-white/70 text-[12px]">{specialist.specialistTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Hero Card (270px height) ──
const HeroCard = ({ heroCardLabel, heroCardHeading, heroCardText }: any) => {
  return (
    <div className="rounded-[16px] bg-[#0052C6] overflow-hidden relative p-6 flex flex-col justify-start h-[270px]">
      <div
        className="absolute right-0 bottom-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-16.png)",
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          height: "60%",
        }}
      />
      <div className="relative z-10">
        <p className="text-[12px] font-bold tracking-[0.15em] text-[#A5EBCD] uppercase mb-3">
          {heroCardLabel}
        </p>
        <h3 className="text-white text-[28px] font-bold leading-tight mb-3">
          {heroCardHeading}
        </h3>
        <p className="text-white text-[14px] leading-relaxed">{heroCardText}</p>
      </div>
    </div>
  );
};

// ──────────────────────────────────
// LAYOUT 2: PROVO GLASS (2 SERVICES)
// Grid: 3-column, Hero spans 2 rows, 2 services stacked
// ──────────────────────────────────
const Layout2 = ({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Image + Specialist (50%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-full">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-full" />
        )}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* RIGHT: Hero (spans 2 rows) + Services (55%) */}
      <div className="w-full lg:w-[50%]">
        <div className="grid grid-cols-2 gap-6 auto-rows-max">
          {/* Hero: 1 col, spans 2 rows */}
          <div className="col-span-1 row-span-2">
            <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />
          </div>
          {/* Services: 1 col, stacked vertically */}
          {services.map((service: Service, i: number) => (
            <div key={service.id || i} className="col-span-1">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────
// LAYOUT 3: PROVO PAINT (3 SERVICES)
// Grid: Image full width, then 2-col grid
// ──────────────────────────────────
const Layout3 = ({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Image full width */}
      {imgUrl ? (
        <div className="relative rounded-[16px] overflow-hidden h-full">
          <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
        </div>
      ) : (
        <div className="rounded-[16px] bg-[#DDEEFF] h-full" />
      )}

      {/* Specialist + Services in 2 columns */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Specialist (40%) */}
        <div className="w-full lg:w-[50%]">
          {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
          {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
        </div>

        {/* RIGHT: Hero (spans 3 rows) + Services 2-col grid (60%) */}
        <div className="w-full lg:w-[50%]">
          <div className="grid grid-cols-2 gap-6 auto-rows-max">
            {/* Hero: 1 col, spans 3 rows */}
            <div className="col-span-1 row-span-3">
              <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />
            </div>
            {/* Services: 1 col, stacked */}
            {services.map((service: Service, i: number) => (
              <div key={service.id || i} className="col-span-1">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────
// LAYOUT 4: PAYSON (4 SERVICES)
// Grid: 2x2 services grid
// ──────────────────────────────────
const Layout4 = ({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Image + Specialist (45%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-full">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-full" />
        )}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* RIGHT: Hero + 2x2 Services Grid (55%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {/* Hero Card */}
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />
        
        {/* 2x2 Grid (4 services) */}
        <div className="grid grid-cols-2 gap-6">
          {services.map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────
// LAYOUT 5: CEDAR CITY (5 SERVICES)
// Grid: 2-column, wraps to 3 rows
// ──────────────────────────────────
const Layout5 = ({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Image + Specialist (40%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-full">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-full" />
        )}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* RIGHT: Hero + 2-Column Services Grid (60%) */}
      <div className="w-full lg:w-[50%]">
        <div className="grid grid-cols-2 gap-6 auto-rows-max">
          {/* Hero: single card at top */}
          <div className="col-span-1">
            <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />
          </div>
          {/* Services: 2-col grid (5 services wrap) */}
          {services.map((service: Service, i: number) => (
            <div key={service.id || i} className="col-span-1">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────
// LAYOUT 6: VERNAL (6 SERVICES)
// Grid: 2-column, 3 rows exactly
// ──────────────────────────────────
const Layout6 = ({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Image + Specialist (35%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-full">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-full" />
        )}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* RIGHT: Hero + 2-Column Services Grid (65%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {/* Hero Card */}
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />
        
        {/* 2-Column Grid (6 services = 3 rows) */}
        <div className="grid grid-cols-2 gap-6">
          {services.map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────
// LAYOUT 7+: ST GEORGE (7+ SERVICES)
// Grid: 2-column with flexible wrapping
// ──────────────────────────────────
const Layout7Plus = ({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Image + Specialist (30%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-full">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-full" />
        )}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* RIGHT: Hero + 2-Column Services Grid (70%) */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {/* Hero Card */}
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />
        
        {/* 2-Column Grid (7+ services, flexible wrapping) */}
        <div className="grid grid-cols-2 gap-6">
          {services.map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────
export default function StoreLocation({
  locationLabel = "Store Location",
  heading = "Store Name",
  address = "Address",
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
        <div className="text-center mb-16">
          <p className="text-[14px] font-bold tracking-widest text-[#0052C6] uppercase mb-3">
            {locationLabel}
          </p>
          <h1 className="text-[48px] font-extrabold mb-4 font-['Avenir']">
            {heading}
          </h1>
          <p className="flex items-center justify-center gap-3 font-normal text-[18px] md:text-[24px]">
            <img src="/assets/jt/location-icon.png" className="w-5 h-6" alt="location" />
            {address}
          </p>
        </div>

        {/* Dynamic Layouts */}
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