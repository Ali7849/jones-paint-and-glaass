"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────
type NavSubItem = {
  label: string;
  href: string;
  description?: string;
};

type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "dropdown"; label: string; href?: string; items: NavSubItem[] };

type NavData = {
  logo?: { url: string; alt?: string } | null;
  ctaText?: string;
  ctaLink?: string;
  navItems?: NavItem[];
} | null;

// ─── Fallback static data ─────────────────────
const FALLBACK_NAV_ITEMS: NavItem[] = [];

// ─── Hook ─────────────────────────────────────
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return { open, openMenu, close, cancelClose, ref };
}

// ─── NavLink ──────────────────────────────────
function NavLink({ label, href, onClick, className = "" }: {
  label: string; href: string; onClick?: () => void; className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-2 px-3 font-bold text-heading hover:text-fg-brand transition-colors duration-150 ${className}`}
    >
      {label}
    </Link>
  );
}

// ─── DropdownMenu ─────────────────────────────
function DropdownMenu({ label, items, href }: {
  label: string;
  items: NavSubItem[];
  href?: string;
}) {
  const { open, openMenu, close, cancelClose, ref } = useDropdown();

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={close}
    >
      <div className="flex items-center">
        {href ? (
          <Link
            href={href}
            className="py-2 pl-3 font-bold text-heading xl:text-[16px] lg:text-[14px] hover:text-fg-brand transition-colors duration-150"
          >
            {label}
          </Link>
        ) : (
          <span className="py-2 pl-3 font-bold text-heading xl:text-[16px] lg:text-[14px] cursor-default">
            {label}
          </span>
        )}

        <span className="p-2 text-heading">
          <svg
            className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </span>
      </div>

      {open && (
        <ul
          role="menu"
          aria-label={label}
          onMouseEnter={cancelClose}
          onMouseLeave={close}
          className="absolute top-full left-0 mt-2 z-30 min-w-[220px] bg-neutral-primary-medium border border-default-medium rounded-base shadow-xl p-1.5"
        >
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className="flex flex-col w-full px-3 py-2.5 rounded hover:bg-neutral-tertiary-medium group transition-colors duration-150"
              >
                <span className="text-sm font-medium text-heading group-hover:text-fg-brand transition-colors">
                  {item.label}
                </span>
                {item.description && (
                  <span className="text-xs text-body mt-0.5">{item.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── MobileMenu ───────────────────────────────
function MobileMenu({ items, ctaText, ctaLink, onClose }: {
  items: NavItem[]; ctaText: string; ctaLink: string; onClose: () => void;
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const toggleAccordion = (label: string) =>
    setOpenLabel((prev) => (prev === label ? null : label));

  return (
    <div className="lg:hidden border-t border-default bg-neutral-primary pt-10 px-4 py-3 space-y-0.5">
      {items.map((item) =>
        item.type === "link" ? (
          <NavLink
            key={item.href} label={item.label} href={item.href} onClick={onClose}
            className="text-sm rounded hover:bg-neutral-secondary-soft hover:text-fg-brand"
          />
        ) : (
          <div key={item.label}>
            <div className="flex items-center justify-between w-full">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="py-2.5 px-3 text-sm font-medium text-heading hover:text-fg-brand transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="py-2.5 px-3 text-sm font-medium text-heading">
                  {item.label}
                </span>
              )}
              <button
                onClick={() => toggleAccordion(item.label)}
                aria-expanded={openLabel === item.label}
                className="p-2 text-heading rounded hover:bg-neutral-secondary-soft transition-colors"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openLabel === item.label ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>
            </div>

            {openLabel === item.label && (
              <div className="ml-3 mt-0.5 mb-1 border-l-2 border-brand/30 pl-3 space-y-0.5">
                {item.items.map((sub) => (
                  <Link
                    key={sub.href} href={sub.href} onClick={onClose}
                    className="flex flex-col py-2 px-3 rounded hover:bg-neutral-secondary-soft transition-colors group"
                  >
                    <span className="text-sm font-medium text-heading group-hover:text-fg-brand transition-colors">
                      {sub.label}
                    </span>
                    {sub.description && (
                      <span className="text-xs text-body mt-0.5">{sub.description}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      )}

      <div className="pt-3 pb-1">
        <Link href={ctaLink}>
          <button className="w-full text-white bg-brand hover:bg-brand-strong font-medium rounded-base text-sm px-4 py-2.5 transition-colors">
            {ctaText}
          </button>
        </Link>
      </div>
    </div>
  );
}

// ─── SearchBar ────────────────────────────────
function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Auto focus when opened
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSearch = () => {
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  return (
    <div className="w-full border-t border-default bg-neutral-primary px-4 py-4">
      <div className="container mx-auto flex items-center gap-4">

        {/* Search input */}
        <div
          className="flex items-center gap-2 flex-1 py-2"
          style={{ borderBottom: '2px solid #0052C6' }}
        >
          <svg className="w-5 h-5 flex-shrink-0 text-[#0052C6]" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search blogs..."
            className="w-full outline-none border-none text-[16px] ring-0 bg-transparent"
          />
        </div>

        {/* Go button */}
        <button
          onClick={handleSearch}
          className="group inline-flex border-2 border-[#0052C6] cursor-pointer text-[#0052C6] font-semibold text-[16px] gap-1 px-4 py-2 rounded-[8px] items-center transition-colors whitespace-nowrap hover:bg-[#0052C6] hover:text-white"
        >
          Go
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-2 text-heading hover:text-fg-brand transition-colors"
          aria-label="Close search"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>
    </div>
  )
}

// ─── Navbar (main export) ─────────────────────
export default function Navbar({ navData }: { navData: NavData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // ✅ search state

  const navItems = (navData?.navItems as NavItem[]) ?? FALLBACK_NAV_ITEMS;
  const ctaText = navData?.ctaText ?? "Get a Quote";
  const ctaLink = navData?.ctaLink ?? "/contact";
  const logoUrl = navData?.logo?.url ?? "/assets/images/logo.png";
  const logoAlt = navData?.logo?.alt ?? "Company Logo";

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0 border-b border-default"
    >
      <div className="container flex items-center justify-between mx-auto px-4 py-3">

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-3 font-medium" role="menubar">
          <Link href="/" aria-label="Go to homepage">
            <img src={logoUrl} className="h-24 -mb-12 mr-0 xl:mr-10 lg:mr-3" alt={logoAlt} />
          </Link>

          {navItems.map((item) => (
            <li key={item.label} role="none">
              {item.type === "link" ? (
                <NavLink label={item.label} href={item.href} />
              ) : (
                <DropdownMenu
                  label={item.label}
                  items={item.items}
                  href={(item as any).href}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Logo */}
        <Link href="/" aria-label="Go to homepage">
          <img src={logoUrl} className="flex lg:hidden h-24 -mb-12 mr-12" alt={logoAlt} />
        </Link>

        {/* CTA + Search + Hamburger */}
        <div className="flex items-center gap-3">

          {/* ✅ Search Icon Button — toggles search bar */}
          <button
            aria-label="Search"
            onClick={() => {
              setSearchOpen((prev) => !prev)
              setMobileOpen(false) // close mobile menu if open
            }}
            className={`flex gap-2 items-center justify-center w-10 h-10 rounded-full transition-colors cursor-pointer
              ${searchOpen
                ? 'bg-[#0052C6] text-white'
                : 'hover:bg-neutral-secondary-soft text-[#0052C6]'
              }`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* CTA Button */}
          <Link href={ctaLink}>
            <button className="hidden lg:inline-flex items-center gap-2 text-white bg-[#0052C6] hover:bg-brand-strong font-medium rounded-[8px] text-[16px] xl:px-5 lg:px-4 xl:py-3 lg:py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer">
              {ctaText}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => {
              setMobileOpen((prev) => !prev)
              setSearchOpen(false) // close search if open
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 text-body rounded-base hover:bg-neutral-secondary-soft hover:text-heading transition-colors focus:outline-none"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ✅ Search Bar — slides down below navbar */}
      {searchOpen && (
        <SearchBar onClose={() => setSearchOpen(false)} />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-menu">
          <MobileMenu
            items={navItems}
            ctaText={ctaText}
            ctaLink={ctaLink}
            onClose={() => setMobileOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}