"use client";
import Image from "next/image";

const services = [
    { id: 1, title: "Glass", image: "/assets/jt/win-glass.png", href: "#" },
    { id: 2, title: "Doors", image: "/assets/jt/door.png", href: "#" },
    { id: 3, title: "Paint", image: "/assets/jt/paint.png", href: "#" },
    { id: 4, title: "Stains & Finishes", image: "/assets/jt/finishes.png", href: "#" },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
    return (
        <div
            className="rounded-[16px] p-5 overflow-hidden bg-[#F4F7FF] flex flex-col">
            <div className="w-full overflow-hidden" style={{ height: "148px" }}>
                <Image
                    src={service.image}
                    alt={service.title}
                    width={220}
                    height={110}
                    className="w-full h-full object-cover rounded-[8px]"
                />
            </div>
            <div className="p-3 flex flex-col gap-1">
                <p className="text-[18px] font-bold">{service.title}</p>
                <a
                    href={service.href}
                    className="inline-flex items-center gap-1 text-[16px] font-medium hover:text-[#0052C6] transition-colors group"
                >
                    Learn More
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default function Americanfork() {
    return (
        <section className="mt-20 py-14 md:py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <p className="text-[16px] font-bold tracking-widest text-[#0052C6] uppercase mb-2">
                        Store Location
                    </p>
                    <h1 className="text-[36px] md:text-[48px] font-extrabold mb-3 font-['Avenir']">
                        American Fork
                    </h1>
                    <div className="flex items-center justify-center gap-3   font-normal text-[18px] md:text-[24px]">
                        <img src="/assets/jt/location-icon.png" className="w-5 h-6"/>
                        65 South 500 East American Fork, UT 84003
                    </div>
                </div>

                {/* ── Main container ── */}
                <div className="flex flex-col lg:flex-row gap-4 items-stretch">

                    {/* ── Specialist card ── */}
                    <div className="flex flex-col gap-4 w-full xl:w-[50%] lg:w-[45%] flex-shrink-0">

                        {/* Map */}
                        <div
                            className="rounded-2xl overflow-hidden bg-[#DDEEFF] flex-1 w-full" id="fork-map"

                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5209345680896!2d-111.78742282357398!3d40.37514565816843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d815d66e9357f%3A0xb18f524b9c4515c6!2s65%20S%20500%20E%20St%2C%20American%20Fork%2C%20UT%2084003%2C%20USA!5e0!3m2!1sen!2s!4v1777277265025!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0}} 
                                allowFullScreen 
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>


                        {/* Specialist card */}
                        <div
                            className="rounded-[16px] bg-[#A5EBCD] p-5 sm:p-8 flex flex-col h-auto lg:h-[267px] items-start gap-4 relative overflow-hidden flex-shrink-0">
                            <div
                                className="absolute right-0 top-0 w-full h-full pointer-events-none z-2" id="fork-element"
                                style={{
                                    backgroundImage: "url(/assets/jt/elements/paint-15.png)",
                                    backgroundSize: "contain",
                                    backgroundPosition: "right center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            />
                            <h4 className="relative z-4 text-[16px] font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-1">
                                Your Local Specialist</h4>
                            <div className="relative z-10 flex items-center gap-6 sm:gap-8">
                                <div className="flex items-center w-[80px] lg:w-[132px] h-[80px] lg:h-[132px] bg-white rounded-full flex-shrink-0 overflow-hidden">
                                    <Image
                                        src="/assets/jt/profile.png"
                                        alt="Dave Koch"
                                        width={52}
                                        height={52}
                                        className="w-10 lg:w-20 h-10 lg:h-20 object-contain mx-auto"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-[24px] sm:text-[32px] leading-tight">Dave Koch</p>
                                    <p className="text-[18px] mt-2 sm:mt-3">Store Manager</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ── Right div 5 boxes ── */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Box 1: Hero card — spans 2 rows on left */}
                        <div
                            className="row-span-2 rounded-2xl bg-[#0052C6] overflow-hidden relative flex flex-col justify-start p-6">
                            <div
                                className="absolute right-0 bottom-0 w-full h-full pointer-events-none mix-blend-multiply"
                                style={{
                                    backgroundImage: "url(/assets/jt/elements/paint-16.png)",
                                    backgroundSize: "contain",
                                    backgroundPosition: "right bottom",
                                    backgroundRepeat: "no-repeat",
                                    height: "50%",
                                }}
                            />
                            <div className="relative z-10">
                                <p className="text-[16px] font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[#A5EBCD] uppercase mb-3">
                                    Products &amp; Services
                                </p>
                                <h3 className="text-white text-[28px] lg:text-[32px] leading-tight mb-4">
                                    From Inspiration<br />to Installation
                                </h3>
                                <p className="text-white text-[18px] leading-relaxed">
                                    Our team in American Fork will make sure you not only have the products you need, but a solid plan to go with them.
                                </p>
                            </div>
                        </div>

                        {/* Box 2: Glass */}
                        <ServiceCard service={services[0]} />

                        {/* Box 3: Doors */}
                        <ServiceCard service={services[1]} />

                        {/* Box 4: Paint — col-span-2 bottom row left */}
                        <ServiceCard service={services[2]} />

                        {/* Box 5: Stains & Finishes — col-span-2 bottom row right */}
                        <ServiceCard service={services[3]} />

                    </div>

                </div>
            </div>
        </section>
    );
}