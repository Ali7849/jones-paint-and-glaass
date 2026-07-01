
'use client'

const links = [
    { label: 'FAQs', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'JP&G Media', href: '#' },
]

export default function AboutQuestion() {
    return (
        <section className="relative container mx-auto flex flex-col lg:flex-row items-stretch rounded-[8px] gap-5 lg:gap-18" id="about-faqs">
            <div className="hidden lg:block absolute -top-1 -left-40 lg:-left-50 z-2 w-full xl:w-[65%] lg:w-[70%] h-fit bg-[#EEF2FA] px-0 lg:px-10 py-0 lg:py-51 flex flex-col text-center lg:text-start justify-center" id="color-bg">
               
            </div>

            {/* ── Left ── */}
            <div className="relative z-2 w-full lg:w-[50%] bg-[#EEF2FA] lg:bg-transparent px-4 lg:px-10 py-12 md:py-20 flex flex-col text-center lg:text-start justify-center overflow-hidden">
                <div>
                    <h2 className="text-[36px] xl:text-[40px] font-extrabold leading-tight mb-4 font-['Avenir']">
                        Looking for <br />Something Else?
                    </h2>

                    <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
                        If you're ready to start talking project details, click the button below to get a quote or stop into your nearest JP&amp;G location.
                    </p>
                </div>

                {/* Button */}
                <a
                    href="#"
                    className="mx-auto lg:mx-0 group inline-flex items-center gap-2 rounded-[8px] bg-[#A5EBCD] px-5 py-3 text-[16px] font-bold text-black transition-colors w-fit"
                >
                    Get a Quote
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            </div>

            {/* ── Right ── */}
            <div className="flex-1 flex flex-col justify-end bg-white px-4 pt-10 md:pt-10 pb-20">
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        className={`flex items-center justify-between py-5 group transition-all duration-300 ${i === 1 ? 'border-y-2 border-[#16B6E9]' : ''
                            }`}
                    >
                        <span className="text-[20px] font-semibold group-hover:text-[#0052C6] transition-colors">
                            {link.label}
                        </span>

                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M5 12h14M13 6l6 6-6 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                ))}
            </div>

        </section>
    )
}