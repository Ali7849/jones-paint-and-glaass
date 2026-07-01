"use client";

type LocationInfoProps = {
  contactLabel?: string
  phone?: string
  address?: string
  cityStateZip?: string
  hoursLabel?: string
  hoursMonFri?: string
  hoursSaturday?: string
  hoursSunday?: string
  contactButtonText?: string
  contactButtonLink?: string
  directionsButtonText?: string
  directionsLink?: string
}

export default function LocationInfo({
  contactLabel = 'Contact Store',
  phone = '801-756-5282',
  address = '65 South 500 East',
  cityStateZip = 'American Fork, UT 84003',
  hoursLabel = 'Store Hours',
  hoursMonFri = '7:30 AM - 5:30 PM',
  hoursSaturday = '8:00 AM - 12:00 PM',
  hoursSunday = 'Closed',
  contactButtonText = 'Contact Us',
  contactButtonLink = '#',
  directionsButtonText = 'Get Directions',
  directionsLink = '#',
}: LocationInfoProps) {
  return (
    <section className="py-10 md:py-12 bg-[#0052C6]">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start text-center md:text-start">

          {/* Left — Contact */}
          <div className="space-y-3">
            <p className="text-[14px] md:text-[16px] font-bold text-[#A5EBCD] uppercase tracking-wider">
              {contactLabel}
            </p>
            
             <a href={`tel:${phone?.replace(/-/g, '')}`}
              className="block text-white text-[24px] font-bold md:text-[32px]"
            >
              {phone}
            </a>
            <address className="not-italic text-white font-extralight text-[18px] md:text-[24px] leading-8 md:leading-10">
              {address} <br />
              {cityStateZip}
            </address>
          </div>

          {/* Right — Hours */}
          <div className="space-y-5 flex flex-col justify-center md:justify-start items-center md:items-start text-center md:text-start">
            <p className="text-[14px] md:text-[16px] font-bold text-[#A5EBCD] uppercase tracking-wider">
              {hoursLabel}
            </p>

            <div className="flex flex-wrap gap-6 md:gap-10 text-center md:text-start">
              <div className="md:w-auto w-full">
                <p className="text-white text-[18px] uppercase mb-1">Mon - Fri</p>
                <p className="text-white text-[18px]">{hoursMonFri}</p>
              </div>
              <div className="md:w-auto w-full">
                <p className="text-white text-[18px] uppercase mb-1">Sat</p>
                <p className="text-white text-[18px]">{hoursSaturday}</p>
              </div>
              <div className="md:w-auto w-full">
                <p className="text-white text-[18px] uppercase mb-1">Sun</p>
                <p className="text-white text-[18px]">{hoursSunday}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              
             <a   href={contactButtonLink}
                className="group inline-flex items-center gap-2 rounded-[8px] bg-[#A5EBCD] hover:bg-[#8edbb8] px-5 py-3 text-[16px] font-bold text-black transition"
              >
                {contactButtonText}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              
              <a  href={directionsLink}
                className="group inline-flex items-center gap-2 rounded-[8px] border border-white px-5 py-3 text-[16px] font-bold text-white transition"
              >
                {directionsButtonText}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}