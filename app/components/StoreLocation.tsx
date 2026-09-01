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
    <div className="rounded-[12px] overflow-hidden bg-[#F4F7FF] flex flex-col">
      <div className="w-full h-[148px] overflow-hidden rounded-[8px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={220}
          height={148}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className="text-[16px] font-bold">{service.title}</p>
        <a
          href={service.href || "#"}
          className="text-[14px] font-semibold text-[#0052C6] hover:underline"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}

// ── Single Specialist (Full Size) ──
function SingleSpecialist({ specialist }: { specialist: Specialist }) {
  return (
    <div className="rounded-[16px] bg-black p-8 flex items-center gap-8 relative overflow-hidden">
      <div
        className="absolute right-0 top-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-15.png)",
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 flex items-center gap-8 w-full">
        <div className="w-[132px] h-[132px] rounded-full flex-shrink-0 overflow-hidden bg-white">
          <Image
            src={specialist.specialistImage?.url ?? "/assets/jt/profile.png"}
            alt={specialist.specialistName}
            width={132}
            height={132}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-[16px] text-[#A5EBCD] font-bold tracking-[0.1em] uppercase mb-4">
            Your Local Specialist
          </h4>
          <h3 className="text-white text-[40px] font-bold leading-tight">
            {specialist.specialistName}
          </h3>
          <p className="text-white/70 text-[18px] mt-1">{specialist.specialistTitle}</p>
        </div>
      </div>
    </div>
  );
}

// ── Multiple Specialists ──
function MultipleSpecialists({ specialists }: { specialists: Specialist[] }) {
  return (
    <div className="rounded-[16px] bg-black p-8 flex flex-col relative overflow-hidden">
      <div
        className="absolute right-0 bottom-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-23.png)",
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <h4 className="relative z-10 text-[16px] text-[#A5EBCD] font-bold tracking-[0.1em] uppercase mb-6">
        Your Local Specialist
      </h4>
      <div className="relative z-10 flex flex-col gap-4">
        {specialists.map((specialist, index) => (
          <div key={specialist.id || index} className="flex items-center gap-4">
            <div className="w-[72px] h-[72px] rounded-full flex-shrink-0 overflow-hidden bg-white">
              <Image
                src={specialist.specialistImage?.url ?? "/assets/jt/profile.png"}
                alt={specialist.specialistName}
                width={72}
                height={72}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white text-[24px] font-bold">
                {specialist.specialistName}
              </h3>
              <p className="text-white/70 text-[14px]">{specialist.specialistTitle}</p>
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
    <div className="rounded-[16px] bg-[#0052C6] overflow-hidden relative p-6 flex flex-col justify-start">
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
        <h3 className="text-white text-[28px] font-bold leading-tight mb-4">
          {heroCardHeading}
        </h3>
        <p className="text-white text-[14px] leading-relaxed">{heroCardText}</p>
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT 2: PROVO GLASS
// Image + Specialist (Left) | Services Vertical (Right)
// ──────────────────────────────────
function Layout2({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Image + Specialist */}
      <div className="w-full lg:w-[45%] flex flex-col gap-6">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-[300px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-[300px]" />
        )}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>

      {/* Right: Services Stacked Vertically */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6">
        {services.map((service: Service, i: number) => (
          <ServiceCard key={service.id || i} service={service} />
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT 3: PROVO PAINT
// Image (Left) | Specialist + Grid (Right)
// ──────────────────────────────────
function Layout3({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Image Full Height */}
      <div className="w-full lg:w-[45%]">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-[500px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-[500px]" />
        )}
      </div>

      {/* Right: Specialist + Hero + Services Grid */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6">
        {/* Specialist at top */}
        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}

        {/* Hero + Service Grid: 2 columns */}
        <div className="grid grid-cols-2 gap-6">
          <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />
          {services.map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT 4: PAYSON
// Image (Left) | Hero + 2x2 Grid + Specialist (Right)
// ──────────────────────────────────
function Layout4({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Image */}
      <div className="w-full lg:w-[40%]">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-[280px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-[280px]" />
        )}
      </div>

      {/* Right: Hero + 2x2 Grid + Specialist */}
      <div className="w-full lg:w-[60%] flex flex-col gap-6">
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        <div className="grid grid-cols-2 gap-6">
          {services.map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
        </div>

        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT 5: CEDAR CITY
// Image (Left) | Hero + 2-3 Grid + Specialist (Right)
// ──────────────────────────────────
function Layout5({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Image */}
      <div className="w-full lg:w-[40%]">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-[280px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-[280px]" />
        )}
      </div>

      {/* Right: Hero + 2-3 Grid + Specialist */}
      <div className="w-full lg:w-[60%] flex flex-col gap-6">
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
          {services.slice(0, 4).map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
          {services.length === 5 && (
            <div className="col-span-2 lg:col-span-1">
              {services[4] && <ServiceCard service={services[4]} />}
            </div>
          )}
        </div>

        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT 6: VERNAL
// Image (Left) | Hero + 3-Column Grid + Specialist (Right)
// ──────────────────────────────────
function Layout6({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Image */}
      <div className="w-full lg:w-[35%]">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-[300px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-[300px]" />
        )}
      </div>

      {/* Right: Hero + 3-Column Grid + Specialist */}
      <div className="w-full lg:w-[65%] flex flex-col gap-6">
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
        </div>

        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
      </div>
    </div>
  );
}

// ──────────────────────────────────
// LAYOUT 7+: ST GEORGE
// Image (Left) | Hero + 4-Column Grid + Specialist (Right)
// ──────────────────────────────────
function Layout7Plus({ services, Specialists, imgUrl, imgAlt, heroCardLabel, heroCardHeading, heroCardText }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Image */}
      <div className="w-full lg:w-[30%]">
        {imgUrl ? (
          <div className="relative rounded-[16px] overflow-hidden h-[300px]">
            <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#DDEEFF] h-[300px]" />
        )}
      </div>

      {/* Right: Hero + 4-Column Grid + Specialist */}
      <div className="w-full lg:w-[70%] flex flex-col gap-6">
        <HeroCard heroCardLabel={heroCardLabel} heroCardHeading={heroCardHeading} heroCardText={heroCardText} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service: Service, i: number) => (
            <ServiceCard key={service.id || i} service={service} />
          ))}
        </div>

        {Specialists?.length === 1 && <SingleSpecialist specialist={Specialists[0]} />}
        {Specialists?.length > 1 && <MultipleSpecialists specialists={Specialists} />}
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

        {/* Dynamic Layout */}
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