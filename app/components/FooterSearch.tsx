'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export default function FooterSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  return (
    <div className="searchbar flex relative">
      <FaSearch className="w-4 h-4 mr-2 text-white absolute bottom-3" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search"
        aria-label="Search the site"
        className="bg-transparent border pl-8 border-white border-b-2 border-t-0 border-l-0 border-r-0 focus:shadow-none text-white placeholder-white/60 outline-none"
      />
    </div>
  )
}