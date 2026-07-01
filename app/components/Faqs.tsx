"use client";
import { useState, useRef } from "react";

interface Faq {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const faqs: Faq[] = [
  {
    id: 1,
    question: "Do you offer custom glass work?",
    answer:
      "Yes — we’re experienced with custom shower glass, decorative glass, custom mirrors, patterned or tinted glass, glass tabletops, and more, all cut and tempered to spec.",
  },
  {
    id: 2,
    question: "Do you do auto glass repair or replacement?",
    answer:
        "Absolutely — we provide auto glass repairs and windshield replacements, including fleet services in select locations. Check the information for your local JP&G store to see if auto glass service is offered there (not available at all stores)."
  },
  {
    id: 3,
    question: "Do you handle installation or just supply materials?",
    answer:(
      <p>
        We supply quality products <strong>and</strong> offer professional
        installation services for windows, doors, glass projects, and garage
        doors. Contact your local showroom to confirm installation availability.
      </p>
    ),
  },
  {
    id: 4,
    question: "Can you help choose the right product for my project?",
    answer: "Yes—that’s what we’re all about! Our team is made up of experts who can help you feel confident about what you need before you ever purchase anything. Let’s make sure you avoid the redo and get it right the first time!",
  },
    {
    id: 5,
    question: "Can you help choose the right product for my project?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Yes!</strong>
        </p>
        <p>
          <strong>Apply</strong> by speaking with your Jones Paint & Glass
          representative or by clicking the "Get Financing" button on the bottom
          of this page.
        </p>
        <p>
          <strong>Select</strong> your financing terms based on the conditions
          that work best for your personal situation and project.
        </p>
        <p>
          <strong>Sign</strong> financing documents. Our financing company,
          Finance of America, makes the process fast, easy, and straight-forward.
        </p>
        <p>
          Finance of America is a simple, straightforward path to your dream
          project. Apply with Jones Paint & Glass and get started today!
        </p>
      </div>
    ),
  },
    {
    id: 6,
    question: "What is your return or warranty policy?",
    answer: "Return and warranty policies vary by product and manufacturer — reach out to your nearest location for details on returns, warranties, and product guarantees.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="rounded-[16px] overflow-hidden transition-colors duration-300"
      style={{
        border: isOpen ? "none" : "2px solid #0052C6",
        background: isOpen ? "#0052C6" : "white",
      }}
    >
      {/* Question */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 cursor-pointer"
      >
        <span
          className="text-[18px] leading-snug transition-colors duration-300"
          style={{ color: isOpen ? "white" : "#111827" }}
        >
          {faq.question}
        </span>

        <span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
          style={{ color: isOpen ? "white" : "#0052C6" }}
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      </button>

      {/* Answer */}
      <div
        style={{
          height:
            isOpen && contentRef.current
              ? contentRef.current.scrollHeight + "px"
              : "0px",
          overflow: "hidden",
          transition: "height 0.35s ease, opacity 0.3s ease",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          ref={contentRef}
          className="px-6 pb-6 text-[16px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}



export default function Faqs() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute -top-15 left-0 w-full pointer-events-none z-2" id="accordian-element"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-12.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
          height: "750px",
        }}
      />

      {/* Heading */}
      <h2 className="text-[36px] lg:text-[48px] font-extrabold text-center mb-10 leading-tight font-['Avenir']">
        Got Questions? <br /> We&apos;ve Got Answers
      </h2>

      {/*BUTTON */}
      <a
        href="#"
        className="group inline-flex items-center gap-2 rounded-[8px] bg-[#A5EBCD] px-5 py-3 text-[16px] font-bold text-black transition-colors relative z-3"
      >
        Ask Us Directly
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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

      {/* FAQ List */}
      <div className="relative z-3 container mx-auto mt-20 px-4 lg:px-6 w-full md:w-[80%] lg:w-[70%]">
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}