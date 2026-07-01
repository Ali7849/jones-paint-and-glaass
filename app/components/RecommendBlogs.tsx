"use client";
import Image from "next/image";
import Link from "next/link";

type Blog = {
  id?: string
  title: string
  slug?: string
  category?: string
  readTime?: string
  content?: any
  image?: {
    url: string
    alt?: string
  }
}

type RecommendblogProps = {
  label?: string
  heading?: string
  posts?: Blog[] | any[]
}

// ✅ Extract plain text summary from rich text content
function extractSummary(content: any, maxLength = 150): string {
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

export default function RecommendBlog({
  label = 'Read More',
  heading = 'Recommended for You',
  posts = [],
}: RecommendblogProps) {
  return (
    <section className="relative py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">

        {/* Header */}
        <p className="text-[16px] font-extrabold tracking-[0.12em] text-[#0052C6] uppercase mb-2 font-['Avenir']">
          {label}
        </p>
        <h2 className="text-[32px] md:text-[44px] font-extrabold mb-10 font-['Avenir']">
          {heading}
        </h2>

        {/* Cards grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {posts.map((post: any, index: number) => {

              // ✅ Handle both populated objects and IDs
              const blog = typeof post === 'object' && post !== null ? post : null
              if (!blog) return null

              const summary = extractSummary(blog.content)
              const href = blog.slug ? `/blog/${blog.slug}` : '#'

              return (
                <div key={blog.id || index} className="flex flex-col gap-3">

                  {/* Image */}
                  <div className="w-full h-[250px] aspect-video rounded-[8px] overflow-hidden bg-[#EEF4FB] mb-3">
                    {blog.image?.url ? (
                      <Image
                        src={blog.image.url}
                        alt={blog.image.alt || blog.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Keyword + read time */}
                  <div className="flex items-center gap-4 mb-3">
                    {blog.category && (
                      <span className="text-[16px] font-semibold bg-gray-100 px-2.5 py-1">
                        {blog.category}
                      </span>
                    )}
                    {blog.readTime && (
                      <span className="text-[16px] font-semibold text-black">
                        {blog.readTime}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-[24px] font-extrabold font-['Avenir']">
                    {blog.title}
                  </h3>

                  {/* Summary from rich text */}
                  {summary && (
                    <p className="text-[16px] leading-relaxed mb-2">
                      {summary}
                    </p>
                  )}

                  {/* Read On link */}
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-[#0052C6] font-semibold text-[16px] group w-fit"
                  >
                    Read On
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-gray-400">No posts selected yet.</p>
          </div>
        )}

      </div>

      {/* Background shape */}
      <div
        className="pointer-events-none absolute -bottom-30 md:-bottom-50 left-0 w-45 h-45 md:w-75 md:h-75 z-0 md:z-3"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-20.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom left",
        }}
      />
    </section>
  )
}