"use client";
import Image from "next/image";

type Feature = {
  id?: string
  title: string
  description: string
  boldText?: string | null
  highlight?: boolean
}

type FeatureListBlockProps = {
  heading?: string
  image?: {
    url: string
    alt?: string
  } | null
  features?: Feature[]
}

export default function FeatureList({
  heading = 'How Exterior Paint Is Different',
  image = null,
  features = [],
}: FeatureListBlockProps) {
  const imageUrl = image?.url ?? '/assets/jt/exterior-paint.png'
  const imageAlt = image?.alt ?? heading

  return (
    <section className="py-14 md:py-26 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between items-start">

          {/* Left: Text content */}
          <div className="flex-2">
            <h2 className="text-[38px] font-extrabold text-[#0052C6] mb-8 leading-tight font-['Avenir']">
              {heading}
            </h2>

            {features.length > 0 ? (
              <div className="flex flex-col gap-8">
                {features.map((f, index) => (
                  <div key={f.id || index} className="flex">

                    {/* Blue left border */}
                    {f.highlight && (
                      <div
                        className="flex-shrink-0 mt-2.5 w-[6px] self-stretch"
                        style={{ background: '#0052C6' }}
                      />
                    )}

                    <div>
                      <h3 className="ml-6 text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold mb-2 font-['Avenir']">
                        {f.title}
                      </h3>
                      <p className="ml-6 text-[18px] font-light leading-relaxed mb-2">
                        {f.description}
                      </p>
                      {f.boldText && (
                        <p className="ml-6 text-[18px] font-bold leading-relaxed">
                          {f.boldText}
                        </p>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No features added yet.</p>
            )}
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-[50%] flex-shrink-0">
            <div className="overflow-hidden w-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={520}
                height={616}
                className="w-full lg:w-[600px] h-full sm:h-[580px] lg:h-[630px] rounded-[16px] ml-auto lg:mr-15 xl:mr-20 object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}