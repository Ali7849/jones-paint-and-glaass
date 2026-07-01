"use client";
import Image from "next/image";

export default function Blogpost() {
    return (
        <section className="py-10 md:py-16 bg-white mt-20">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="mx-auto max-w-7xl">
                    {/* Breadcrumb */}
                    <p className="text-[16px] text-center sm:text-start font-bold tracking-[0.12em] text-[#0052C6] uppercase mb-3">
                        Blog &gt; Category
                    </p>

                    {/* Title */}
                    <h1 className="text-[36px] md:text-[48px] text-center sm:text-start font-extrabold mb-5 font-['Avenir']">
                        Blog Post Title
                    </h1>

                    {/* Author row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[18px] font-semibold mb-1">Sarah Johnson</p>
                                <p className="text-[16px]">Date • 5 min read</p>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-5 mb-5">
                            <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/linkedin-icon.png" /></a>
                            <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/facebook-icon.png" /></a>
                            <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/instagram-icon.png" /></a>
                            <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/x-icon.png" /></a>
                        </div>
                    </div>
                </div>

                {/* Hero image */}
                <div className="w-full aspect-video h-[420px] rounded-[16px] overflow-hidden bg-[#EEF4FB] mb-10 flex items-center justify-center">
                    <Image
                        src="/assets/jt/blog-img.png"
                        alt="Blog Hero"
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="mx-auto max-w-7xl">



                    {/* Content block 1 */}
                    <h2 className="text-[28px] font-extrabold mb-4 font-['Avenir']">
                        Header
                    </h2>
                    <p className="text-[18px] leading-relaxed mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis malesuada pellentesque. Etiam est turpis, lobortis nec consequat id, commodo vel libero. Maecenas volutpat nibh eget dolor pharetra, quis fringilla velit ultrices. Nulla rutrum felis sit amet diam viverra sodales. In pulvinar porttitor mauris a blandit. Donec vel diam at purus sodales tristique quis sit amet ipsum. Duis egestas molla volutpat. In id leo finibus, sollicitudin est quis, consequat odio. Nullam suscipit suscipit quam, at sagittis odio hendrerit et. Proin cursus purus nisl, eget feugiat justo malesuada nec. Cras quis mauris ligula. Phasellus commodo ligula et leo pharetra, eget ultrices ipsum scelerisque.
                    </p>
                    <p className="text-[18px] leading-relaxed mb-4">
                        Vestibulum ac consequat ex, et efficitur justo. Ut eu tortor eget augue viverra blandit. Pellentesque viverra, leo a semper lacinia, lacus diam dignissim lacus, et semper mauris ipsum et mi. Curabitur vulputate magna tincidunt, fermentum ex at, iaculis neque. Nunc at erat sollicitudin, viverra tellus vel, iaculis mi. Cras at ipsum ac mauris malesuada suscipit ac ut metus. Sed tristique odio eget erat pulvinar, at interdum urna posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed maximus leo id diam accumsan venenatis. Sed non bibendum leo.
                    </p>
                    <p className="text-[18px] leading-relaxed mb-10">
                        Nulla accumsan pharetra faucibus. Donec in velit diam. Sed ut molestie est, nec sodales quam. Donec sit amet nisl nec, una pulvinar porttitor. Integer aliquet magna nec diam sollicitudin elementum. Aliquam molestie arcu tellus, ac lacinia ex blandit ut. Duis bibendum molestie augue, sed elementum mauris sollicitudin quis. Ut aliquet auctor dolor a venenatis. Phasellus malesuada pellentesque enim, vel blandit leo egestas sed. Fusce sed malesuada erat. Proin consequat tortor mi, sit amet suscipit magna rutrum id. Duis semper eros a quam volutpat sagittis. Donec vitae arcu vitae metus sodales lacinia a auctor luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec auctor tellus sit amet commodo facilisis. Nulla
                    </p>

                    {/* Inline image */}
                    <div className="w-full aspect-video h-[420px] rounded-[16px] overflow-hidden bg-[#EEF4FB] mb-10 flex items-center justify-center">
                        <Image
                            src="/assets/jt/blog-img.png"
                            alt="Inline"
                            width={800}
                            height={450}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Blockquote */}
                    <blockquote
                        className="px-6 py-0 mb-10 text-[16px] italic font-semibold leading-relaxed border-l-2 border-[#16B6E9] ">
                        "Ipsum sit mattis nulla quam nam. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sim tempor. Diam est, orci, tincidunt aenean tempus."
                    </blockquote>

                    {/* Content block 2 */}
                    <h2 className="text-[28px] font-extrabold mb-4 font-['Avenir']">
                        Header
                    </h2>
                    <p className="text-[18px] leading-relaxed mb-4">
                        purus nisl, eget feugiat justo malesuada nec. Cras quis mauris ligula. Phasellus commodo ligula et leo pharetra, eget ultrices ipsum scelerisque.
                    </p>
                    <p className="text-[18px] leading-relaxed mb-4">
                        Vestibulum ac consequat ex, et efficitur justo. Ut eu tortor eget augue viverra blandit. Pellentesque viverra, leo a semper lacinia, lacus diam dignissim lacus, et semper mauris ipsum et mi. Curabitur vulputate magna tincidunt, fermentum ex at, iaculis neque. Nunc at erat sollicitudin, viverra tellus vel, iaculis mi. Cras at ipsum ac mauris malesuada suscipit ac ut metus. Sed tristique odio eget erat pulvinar, at interdum urna posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed maximus leo id diam accumsan venenatis.
                    </p>
                    <p className="text-[18px] leading-relaxed mb-10">
                        Nulla accumsan pharetra faucibus. Donec in velit diam. Sed ut molestie est, nec sodales quam. Donec sit amet nisl nec, una pulvinar
                    </p>
                </div>

                {/* footer */}
                <div className="footer mx-auto max-w-7xl">
                    {/* Share + Keywords row */}
                    <div className="flex flex-col text-start sm:flex-row sm:items-end sm:justify-between gap-4 pt-6 mb-10">
                        {/* Share */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[18px] font-semibold">Share this post</span>
                            <div className="flex items-center gap-4">
                                <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/share-icon.png" /> </a>
                                <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/linkedin-icon.png" /></a>
                                <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/facebook-icon.png" /></a>
                                <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/instagram-icon.png" /></a>
                                <a href="#" className="rounded flex items-center justify-center"><img src="/assets/jt/elements/x-icon.png" /></a>
                            </div>
                        </div>

                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2">
                            {["Keyword", "Keyword", "Keyword", "Keyword"].map((kw, i) => (
                                <span key={i} className="text-[14px] font-semibold bg-gray-100 px-2.5 py-1 rounded-[6px]">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom author */}
                    <div className="flex items-center gap-3 pt-8 border-t-2 border-[#000000]">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[18px] font-semibold mb-1">Sarah Johnson</p>
                            <p className="text-[16px]">Date • 5 min read</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}