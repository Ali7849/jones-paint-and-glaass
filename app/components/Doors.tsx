"use client";
import Image from "next/image";

const navLinks = [
    { id: 1, label: "Residential Doors", href: "#", active: false },
    { id: 2, label: "Commercial Doors", href: "#", active: true },
];

export default function Doors() {
    return (
        <section className="container mx-auto w-full mt-20 lg:mt-10 overflow-hidden py-16 px-8 lg:py-26">
            <div className="relative w-full h-[350px] mb-20">
                <Image
                    src="/assets/jt/door-banner.png"
                    alt="Doors Banner"
                    fill
                    className="object-cover object-center rounded-[16px]"
                    priority
                />
            </div>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-end px-6 lg:px-0">

                {/* ── Left: heading + image ── */}
                <div className="w-full lg:w-[50%] flex-shrink-0 text-center lg:text-start">
                    <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
                        Jones Paint &amp; Glass
                    </p>
                    <h2 className="text-[38px] font-extrabold mb-3 font-['Avenir']">
                        Doors
                    </h2>
                    <p className="text-[24px] leading-relaxed mx-auto lg:mx-0 max-w-lg">
                        Doors for houses, commercial property, interior, or exterior. We make and install them all.
                    </p>

                </div>

                {/* ── Right: nav links ── */}
                <div className="flex-1 flex flex-col gap-8 w-full">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className="flex items-center justify-between px-5 py-7 rounded-[16px] border transition-colors group"
                            style={{
                                background: link.active ? "#0052C6" : "white",
                                borderColor: link.active ? "#0052C6" : "#0052C6",
                            }}
                        >
                            <span
                                className="font-semibold text-[18px]"
                                style={{ color: link.active ? "white" : "#0052C6" }}
                            >
                                {link.label}
                            </span>
                            <svg
                                className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ color: link.active ? "white" : "#0052C6" }}
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

            </div>
        </section>
    );
}