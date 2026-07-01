"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Blog = {
  id?: string
  title: string
  slug?: string
  content?: any
  publishedDate?: string
  image?: {
    url: string
    alt?: string
  }
}

type BlogDetailProps = {
  label?: string
  heading?: string
  subheading?: string
}

const BLOGS_PER_PAGE = 3

function extractSummary(content: any, maxLength = 200): string {
  if (!content?.root?.children) return ''
  for (const node of content.root.children) {
    if (node.type === 'paragraph') {
      const text = node.children?.map((c: any) => c.text || '').join('') || ''
      if (text.trim()) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
      }
    }
  }
  return ''
}

export default function BlogDetail({
  label = "OUR BLOG",
  heading = "The Crash Course",
  subheading = "Jones Paint & Glass Blog",
}: BlogDetailProps) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/blogs?limit=${BLOGS_PER_PAGE}&page=${currentPage}&sort=-publishedDate&depth=1`
        )
        const data = await res.json()
        setBlogs(data.docs || [])
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        console.error('Failed to fetch blogs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of section smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="relative mt-20 py-14 md:py-20 bg-white overflow-hidden">

      {/* Background shape */}
      <div
        className="pointer-events-none absolute -top-10 sm:top-35 lg:-top-10 xl:-top-20 2xl:-top-40 right-0 w-56 h-56 lg:w-110 lg:h-150 xl:w-200 xl:h-180 2xl:w-180 2xl:h-250 z-0 md:z-3"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-19.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative">

        {/* Header */}
        <div className="text-center mb-14 relative z-10">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
            {label}
          </p>
          <h1 className="text-[32px] md:text-[48px] font-extrabold mb-2 font-['Avenir']">
            {heading}
          </h1>
          <p className="text-[18px] md:text-[28px] font-semibold text-[#0052C6]">
            {subheading}
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col gap-12 md:gap-16 relative z-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#F4F7FF] rounded-2xl flex flex-col lg:flex-row px-6 md:px-10 py-8 md:py-10 animate-pulse"
              >
                <div className="w-full lg:w-[50%] h-[280px] md:h-[404px] bg-gray-200 rounded-[16px]" />
                <div className="flex w-full lg:w-[50%] flex-col justify-center px-2 lg:px-10 py-6 gap-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <>
            {/* Articles */}
            <div className="flex flex-col gap-12 md:gap-16 relative z-1">
              {blogs.map((blog, index) => {
                const summary = extractSummary(blog.content)
                const href = blog.slug ? `/blog/${blog.slug}` : '#'

                return (
                  <div
                    key={blog.id || index}
                    className={`bg-[#F4F7FF] rounded-2xl flex flex-col lg:flex-row px-6 md:px-10 py-8 md:py-10
                      ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}
                    `}
                  >
                    {/* Image */}
                    <div className="relative w-full lg:w-[50%] h-[280px] md:h-[404px] min-h-[280px]">
                      {blog.image?.url ? (
                        <Image
                          src={blog.image.url}
                          alt={blog.image.alt || blog.title}
                          fill
                          className="object-cover rounded-[16px]"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-[16px] flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex w-full lg:w-[50%] flex-col justify-center text-center md:text-left px-2 lg:px-10 py-6 gap-3">
                      <h2 className="font-bold text-black text-[24px] md:text-[36px] leading-tight">
                        {blog.title}
                      </h2>
                      {summary && (
                        <p className="text-[16px] leading-relaxed">
                          {summary}
                        </p>
                      )}
                      <div>
                        <Link
                          href={href}
                          className="group text-[16px] inline-flex items-center gap-2 text-[#0052C6] font-semibold transition mt-2"
                        >
                          Read More
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
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                {/* Prev button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full bg-[#D9FDED] hover:bg-[#A5EBCD] flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg className="w-6 h-6 stroke-black fill-none" strokeWidth={1.5} viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full text-[15px] font-semibold transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#0052C6] text-white'
                        : 'bg-[#F4F7FF] text-gray-700 hover:bg-[#D9FDED]'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full bg-[#D9FDED] hover:bg-[#A5EBCD] flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg className="w-6 h-6 stroke-black fill-none" strokeWidth={1.5} viewBox="0 0 24 24">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-gray-400">No blogs published yet.</p>
          </div>
        )}

      </div>
    </section>
  )
}