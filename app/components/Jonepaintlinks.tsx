"use client";
import Image from "next/image";

const navLinks = [
    { id: 1, label: "Exterior Paint", href: "#", active: false },
    { id: 2, label: "Interior Paint", href: "#", active: true },
    { id: 3, label: "Auto Paint", href: "#", active: false },
    { id: 4, label: "Stains, Finishes & Coatings", href: "#", active: false },
    { id: 5, label: "DIY Paint Tips", href: "#", active: false },
];

export default function Jonepaintlinks() {
    return (
        <section className="mt-20 py-14 md:py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-end">

                    {/* ── Left: heading + image ── */}
                    <div className="w-full lg:w-[42%] flex-shrink-0 text-center lg:text-start">
                        <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
                            Jones Paint &amp; Glass
                        </p>
                        <h2 className="text-[38px] font-extrabold mb-3 font-['Avenir']">
                            Paint Products &amp; Services
                        </h2>
                        <p className="text-[24px] leading-relaxed mb-10 mx-auto lg:mx-0 max-w-md">
                            All the colors, styles, and stains you need, with tips from JP&amp;G pros.
                        </p>
                        <div className="rounded-[16px] overflow-hidden w-full">
                            <Image
                                src="/assets/jt/jone-paint-link.png"
                                alt="Paint Products"
                                width={600}
                                height={450}
                                className="w-full h-full object-cover"
                            />
                        </div>
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
                                    style={{ color: link.active ? "white" : "#000000" }}
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
            </div>
        </section>
    );
}