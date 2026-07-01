"use client";
import Image from "next/image";

interface Card {
  id?: string;
  type: string;
  image?: {
    url?: string | null;
    alt?: string | null;
  } | null;
  desc: string;
}

interface FeatureCardsBlockProps {
  heading?: string;
  subheading?: string;
  cards?: Card[];
}

function TypeCard({ item }: { item: Card }) {
  const imageUrl = item.image?.url?.trim() ? item.image.url : "/assets/jt/media-paint.png";
  const imageAlt = item.image?.alt?.trim() ? item.image.alt : item.type;

  return (
    <div className="overflow-hidden rounded-b-[16px] flex flex-col bg-[#F8F9FC]">
      <div className="w-full rounded-t-[16px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={400}
          height={225}
          className="w-full h-auto md:h-[250px] lg:h-[400px] object-top object-cover"
        />
      </div>
      <div className="p-6">
        <p className="font-bold text-[18px] mb-5">{item.type}</p>
        <p className="text-[16px] leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

export default function FeatureCards({
  heading = "Residential",
  subheading,
  cards = [],
}: FeatureCardsBlockProps) {
  if (!cards || cards.length === 0) return null;

  const count = cards.length;
  const gridClass =
    count === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-5"
      : count === 2
      ? "grid grid-cols-1 md:grid-cols-2 gap-5"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5";

  return (
    <section className="py-16 md:py-26">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-14">
          <h2 className="text-[48px] font-extrabold mb-5 font-['Avenir']">
            {heading}
          </h2>
          {subheading && (
            <p className="text-[32px] font-semibold mb-10">{subheading}</p>
          )}
          <div className={gridClass}>
            {cards.map((item, index) => (
              <TypeCard key={item.id || index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}