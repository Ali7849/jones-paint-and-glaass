'use client'

import Image from 'next/image'



type AboutProps = {
  Heading?: string
  Paragraph1?: string
  Paragraph2?: string
  SideImage?: {
    url: string
    alt?: string
  }
}

export default function About({
  Heading = "",
  Paragraph1 = "",
  Paragraph2 = "",
  SideImage,
}: AboutProps) {

  const imageSrc  =   SideImage?.url && SideImage.url.trim() !== '' ? SideImage.url : '/assets/jt/default.jpg';


  return (
    <section className="relative py-16 md:py-24 bg-white mt-12">

      {/* Paint splash — bottom right */}
      <div
        className="hidden lg:block absolute lg:-bottom-[220px] left-0 w-full pointer-events-none mix-blend-multiply z-2"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-10.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          height: "60%",
          transform: "rotate(0deg)",
          transformOrigin: "bottom right",
        }}
      />

      <div
        className="block lg:hidden absolute bottom-[450px] md:bottom-[300px] left-0 w-full pointer-events-none mix-blend-multiply z-2"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-10.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          height: "30%",
          transform: "rotate(0deg)",
          transformOrigin: "bottom right",
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-15">

          {/* ── Left: Image ── */}
          <div className="w-full lg:w-[50%] relative h-[300px] md:h-[400px] lg:h-[500px]">
            
            <Image
              src={imageSrc}
              alt={SideImage?.alt || "Our Story"}
              fill
              className="object-cover object-center rounded-xl"
              priority
            />
          </div>

          {/* ── Right: Text ── */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-black mb-6 leading-tight font-['Avenir']">
              {Heading}
            </h2>

            <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed mb-5">
              {Paragraph1}
            </p>

            <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
              {Paragraph2}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}