'use client'

type QuickLink = {
  id?: string
  label: string
  href: string
}

type QuickLinksBlockProps = {
  heading?: string
  subtext?: string
  buttonLabel?: string
  buttonHref?: string
  links?: QuickLink[]
}

export default function QuickLinks({
  heading = 'Looking for Something Else?',
  subtext = "If you're ready to start talking project details, click the button below to get a quote or stop into your nearest JP&G location.",
  buttonLabel = 'Get a Quote',
  buttonHref = '#',
  links = [],
}: QuickLinksBlockProps) {
  return (
    <section className="lg:pr-20 xl:pr-30 flex flex-col lg:flex-row items-stretch rounded-[8px] overflow-hidden">

      {/* Left */}
      <div className="w-full lg:w-[50%] bg-[#EEF2FA] pr-10 md:pr-30 lg:pr-8 py-12 md:py-20 flex flex-col text-center lg:text-start justify-center pl-10 md:pl-30 lg:pl-30 xl:pl-30">
        <div>
          <h2 className="text-[28px] lg:text-[36px] xl:text-[40px] font-extrabold text-gray-900 leading-tight mb-4 font-['Avenir']">
            {heading}
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-500 leading-relaxed mb-6">
            {subtext}
          </p>
        </div>

        
        <a href={buttonHref}
          className="mx-auto lg:mx-0 group inline-flex items-center gap-2 rounded-[8px] bg-[#A5EBCD] px-5 py-3 text-[16px] font-bold text-black transition-colors w-fit"
        >
          {buttonLabel}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Right */}
      <div className="flex-1 bg-white pr-10 sm:pr-20 md:pr-30 lg:pr-8 pl-10 sm:pl-20 md:pl-30 lg:pl-8 py-6 md:py-10">
        {links.length > 0 ? (
          links.map((link, i) => (
            
            <a  key={link.id || i}
              href={link.href}
              className={`flex items-center justify-between py-5 group transition-all duration-300 ${
                i === 1 ? 'border-y-2 border-[#16B6E9]' : ''
              }`}
            >
              <span className="text-[15px] md:text-[17px] font-semibold text-gray-900 group-hover:text-[#0052C6] transition-colors">
                {link.label}
              </span>
              <svg className="w-5 h-5 text-gray-700 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No links added yet.</p>
          </div>
        )}
      </div>

    </section>
  )
}