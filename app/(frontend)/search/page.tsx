import { getPayload } from 'payload'
import config from '@/payload.config'
import { getNavigation } from '@/lib/getNavigation'
import { getFooter } from '@/lib/getFooter'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const navData = await getNavigation()
  const footerData = await getFooter();
  const searchQuery = q?.trim() || ''
  const payload = await getPayload({ config })

  // ✅ Search blogs by title, category and keywords
  const { docs: blogs, totalDocs } = await (payload as any).find({
    collection: 'blogs',
    where: {
      and: [
        { published: { equals: true } },
        {
          or: [
            { title: { like: searchQuery } },
            { category: { like: searchQuery } },
            { 'keywords.keyword': { like: searchQuery } },
          ],
        },
      ],
    },
    depth: 2,
    limit: 100,
    sort: '-publishedDate',
  })

  return (
    <>
      <Navbar navData={navData} />

      <section className="py-16 md:py-24 bg-white mt-17.5">
        <div className="container mx-auto px-4 lg:px-6">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
              Search Results
            </p>
            <h1 className="text-[32px] md:text-[48px] font-extrabold font-['Avenir'] mb-2">
              Results for "{searchQuery}"
            </h1>
            <p className="text-gray-500 text-[16px] mb-8">
              {totalDocs === 0
                ? 'No results found'
                : `${totalDocs} result${totalDocs !== 1 ? 's' : ''} found`}
            </p>

            {/* Back to blog */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0052C6] font-semibold text-[16px] hover:underline"
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Results */}
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => {

                const formattedDate = blog.publishedDate
                  ? new Date(blog.publishedDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : ''

                return (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    {/* Image */}
                    <div className="w-full h-[250px] rounded-[8px] overflow-hidden bg-[#EEF4FB]">
                      {blog.image?.url ? (
                        <Image
                          src={blog.image.url}
                          alt={blog.image.alt || blog.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Category + Read time */}
                    <div className="flex items-center gap-4">
                      {blog.category && (
                        <span className="text-[14px] font-semibold bg-gray-100 px-2.5 py-1">
                          {blog.category}
                        </span>
                      )}
                      {blog.readTime && (
                        <span className="text-[14px] font-semibold text-gray-500">
                          {blog.readTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-[22px] font-extrabold font-['Avenir'] group-hover:text-[#0052C6] transition-colors">
                      {blog.title}
                    </h2>

                    {/* Date */}
                    {formattedDate && (
                      <p className="text-[13px] text-gray-400">{formattedDate}</p>
                    )}

                    {/* Read On */}
                    <span className="inline-flex items-center gap-1.5 text-[#0052C6] font-semibold text-[16px] group w-fit">
                      Read On
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>

                  </Link>
                )
              })}
            </div>
          ) : (
            // ✅ No results state
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 className="text-[24px] font-bold text-gray-500">
                No results found for "{searchQuery}"
              </h3>
              <p className="text-gray-400 text-[16px]">
                Try searching with different keywords
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 bg-[#0052C6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Blogs
              </Link>
            </div>
          )}

        </div>
      </section>

      <Footer footerData={footerData} />
      
    </>
  )
}