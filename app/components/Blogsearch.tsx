'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogSearchBlockProps {
  heading?: string;
  placeholder?: string;
}

export default function BlogSearch({
  heading = 'Looking for Something Specific?',
  placeholder = 'Search...',
}: BlogSearchBlockProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    // ✅ Navigate to /search?q=query
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  };

  return (
    <section className="container mx-auto py-16">
      <div className="px-4 lg:px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

        <h3 className="text-[28px] md:text-[38px] lg:w-[50%] w-full font-extrabold font-['Avenir']">
          {heading}
        </h3>

        <div className="flex w-full lg:w-auto items-center gap-4">

          <div
            className="flex items-center gap-2 py-1 flex-1"
            style={{ borderBottom: '2px solid #0052C6' }}
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" style={{ color: '#00CCB9' }}>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={placeholder}
              className="w-full outline-none border-none text-[16px] ring-0 bg-transparent"
            />
          </div>

          <button
            onClick={handleSearch}
            className="group inline-flex border-2 border-[#0052C6] cursor-pointer text-[#0052C6] font-semibold text-[16px] gap-[2px] px-4 py-2 rounded-[8px] items-center transition-colors whitespace-nowrap hover:bg-[#0052C6] hover:text-white"
          >
            Go
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
          </button>

        </div>
      </div>
    </section>
  );
}