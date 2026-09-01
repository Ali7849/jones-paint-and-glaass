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
    <div className="rounded-[16px] p-4 overflow-hidden bg-[#F4F7FF] flex flex-col h-full">
      <div className="w-full overflow-hidden rounded-[8px] h-[120px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={200}
          height={120}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pt-3 flex flex-col gap-1">
        <p className="text-[16px] font-bold">{service.title}</p>
        
          href={service.href || "#"}
          className="text-[14px] font-semibold text-[#0052C6] hover:underline"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}

// ── Single Specialist ──
function SingleSpecialist({ specialist }: { specialist: Specialist }) {
  return (
    <div className="rounded-[16px] bg-black p-6 flex items-center gap-6 relative overflow-hidden">
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
}

// ── Multiple Specialists ──
function MultipleSpecialists({ specialists }: { specialists: Specialist[] }) {
  return (
    <div className="rounded-[16px] bg-black p-6 flex flex-col relative overflow-hidden">
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
}

// ── Hero Card ──
function HeroCard({ heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="rounded-[16px] bg-[#0052C6] overflow-hidden relative p-6 flex flex-col justify-start h-full">
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
}

// ──────────────────────────────────
// LAYOUT 2: PROVO GLASS (2 SERVICES)
// ──────────────────────────────────
function Layout2({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT COLUMN: Image + Specialist (45%) */}
      <div className="w-full lg:w-[45%] flex flex-col gap-6">
        {/* Store Image */}
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-[250px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-[250px]" />
        )}

        {/* Specialist */}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* RIGHT COLUMN: Hero + Services (55%) */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6">
        {/* Grid: Hero on left, Services on right */}
        <div className="grid grid-cols-3 gap-6 auto-rows-max">
          {/* Hero Card: spans 2 rows */}
          <div className="col-span-1 row-span-2">
            <HeroCard 
              heroCardLabel={heroCardLabel} 
              heroCardHeading={heroCardHeading} 
              heroCardText={heroCardText} 
            />
          </div>

          {/* Service Cards: stacked on right */}
          {services.map((service: Service, i: number) => (
            <div key={service.id || i} className="col-span-1">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT 3: PROVO PAINT (3 SERVICES)
// ──────────────────────────────────
function Layout3({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col gap-6">
      {/* TOP: Full Width Image */}
      {imgUrl ? (
        <div className="relative rounded-[16px] overflow-hidden h-[220px]">
          <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
        </div>
      ) : (
        <div className="rounded-[16px] bg-[#DDEEFF] h-[220px]" />
      )}

      {/* BOTTOM: 2 Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Specialists (40%) */}
        <div className="w-full lg:w-[40%]">
          {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
          {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
        </div>

        {/* RIGHT: Hero + Services Grid (60%) */}
        <div className="w-full lg:w-[60%]">
          <div className="grid grid-cols-2 gap-6 auto-rows-max">
            {/* Hero Card: spans 3 rows */}
            <div className="col-span-1 row-span-3">
              <HeroCard 
                heroCardLabel={heroCardLabel} 
                heroCardHeading={heroCardHeading} 
                heroCardText={heroCardText} 
              />
            </div>

            {/* Service Cards: stacked vertically on right */}
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
}

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
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[14px] font-bold tracking-widest text-[#0052C6] uppercase mb-3">
            {locationLabel}
          </p>
          <h1 className="text-[48px] font-extrabold mb-4 font-['Avenir']">
            {heading}
          </h1>
          <p className="text-[18px] flex items-center justify-center gap-2">
            📍 {address}
          </p>
        </div>

        {/* Dynamic Layouts Based on Service Count */}
        {serviceCount === 2 && (
          <Layout2 
            services={services} 
            Specialists={Specialists} 
            imgUrl={imgUrl} 
            imgAlt={imgAlt} 
            heroCardLabel={heroCardLabel} 
            heroCardHeading={heroCardHeading} 
            heroCardText={heroCardText} 
          />
        )}
        
        {serviceCount === 3 && (
          <Layout3 
            services={services} 
            Specialists={Specialists} 
            imgUrl={imgUrl} 
            imgAlt={imgAlt} 
            heroCardLabel={heroCardLabel} 
            heroCardHeading={heroCardHeading} 
            heroCardText={heroCardText} 
          />
        )}
      </div>
    </section>
  );
}