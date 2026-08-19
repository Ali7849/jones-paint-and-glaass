import React from "react";
import Image from "next/image"

type HeroProps = {
  topLineText?: string
  bigLeftText?: string
  topRightText?: string
  bigRightText?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: {
    url: string
    alt?: string
  }
}

export default function Hero({
  topLineText = "BEFORE YOU",
  bigLeftText = "DIY",
  topRightText = "MAKE SURE YOU",
  bigRightText = "JP&G",
  description = "That's Jones Paint & Glass—your neighborhood experts on DIY projects involving paint, glass or doors. We help you get it right the first time.",
  buttonText = "DIY Tips & Tricks",
  buttonLink = "/diy-tips",
  backgroundImage,
}: HeroProps) {
  const bgImage =
  backgroundImage?.url && backgroundImage.url.trim() !== ''
    ? backgroundImage.url
    : '/assets/jt/default.jpg'
  return (
    <div className="h-auto md:h-147.5 relative bg-red-400 mt-17.5 " id="hero">
      <div className="image relative md:absolute w-full h-full min-h-[500px] md:h-[590px]">
        <Image
            src={bgImage}
            alt={backgroundImage?.alt || "Hero background"}
            fill
            className={`-z-10 ${bgImage === '/assets/jt/default.jpg' ? 'object-contain object-left' : 'object-cover'}`}
          />
      </div>
      <div className="container mx-auto h-auto md:h-60 w-full relative top-1/2 right-0 translate-y-0 md:-translate-y-1/2 mt-[-180px] md:mt-0">
        <div className="text-box relative md:absolute top-1/2 right-0 h-100 md:h-102 w-140 md:w-157 sm:w-full bg-white text-[#0052C6] translate-y-0 md:-translate-y-1/2 py-12 md:px-20 px-20 sm:px-4 rounded-2xl">

          <div className="jp flex">
            {/* <div className="p-2">
              <h3 className="text-xl font-extrabold">{topLineText}</h3>
              <h3 className="text-7xl   font-extrabold -ml-1">{bigLeftText}</h3>
            </div>
            <div className="blue-box text-white ml-4 py-2 px-8 relative">
               <div className="round-shape bg-[#0052C6] rounded-xl -skew-x-12 w-full h-full absolute top-0 left-0 -z-1"></div>
              <h3 className="text-xl font-extrabold ml-6">{topRightText}</h3>
              <h2 className="text-7xl  font-extrabold">{bigRightText}</h2>
            </div> */}

            <img src="/assets/jt/info.png" alt="JP&G Logo" className="w-full h-auto" />
          </div>
          <p className="my-6">{description}</p>
          <a href={buttonLink}>
            <button className="border-[#0052C6] border-2 py-2 px-4 rounded">
              {buttonText}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}