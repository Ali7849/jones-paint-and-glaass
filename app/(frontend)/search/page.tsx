import { getPayload } from 'payload'
import config from '@/payload.config'
import { getNavigation } from '@/lib/getNavigation'
import { getFooter } from '@/lib/getFooter'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Result = {
  id: string
  title: string
  href: string
  type: string
  image?: string | null
  description?: string
  date?: string
  readTime?: string
}

// Collections to search in generic mode.
// `titleField` is whatever that collection uses as its display name.
const COLLECTIONS = [
  { slug: 'blogs', label: 'Blog', titleField: 'title', prefix: '/blog/' },
  { slug: 'pages', label: 'Page', titleField: 'title', prefix: '/' },
  { slug: 'locations', label: 'Location', titleField: 'name', prefix: '/' },
  { slug: 'paint', label: 'Paint', titleField: 'name', prefix: '/' },
  { slug: 'glass', label: 'Glass', titleField: 'name', prefix: '/' },
  { slug: 'doors', label: 'Doors', titleField: 'name', prefix: '/' },
]

async function searchCollection(
  payload: any,
  col: (typeof COLLECTIONS)[number],
  q: string
): Promise<Result[]> {
  const or: any[] = [
    { [col.titleField]: { like: q } },
    { slug: { like: q } },
    { metaTitle: { like: q } },
    { metaDescription: { like: q } },
  ]

  if (col.slug === 'blogs') {
    or.push({ category: { like: q } }, { 'keywords.keyword': { like: q } })
  }

  const where: any =
    col.slug === 'blogs'
      ? { and: [{ published: { equals: true } }, { or }] }
      : { or }

  try {
    const { docs } = await payload.find({
      collection: col.slug,
      where,
      depth: 1,
      limit: 20,
    })

    return docs.map((doc: any) => ({
      id: `${col.slug}-${doc.id}`,
      title: doc[col.titleField] ?? doc.title ?? doc.name ?? 'Untitled',
      href: `${col.prefix}${doc.slug}`,
      type: col.label,
      image: doc.image?.url ?? doc.locationImage?.url ?? null,
      description: doc.metaDescription ?? doc.services ?? undefined,
      date: doc.publishedDate ?? undefined,
      readTime: doc.readTime ?? undefined,
    }))
  } catch (err) {
    // A collection that doesn't exist or lacks these fields shouldn't kill the whole search
    console.error(`search failed for ${col.slug}:`, err)
    return []
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>
}) {
  const { q, type } = await searchParams
  const navData = await getNavigation()
  const footerData = await getFooter()
  const searchQuery = q?.trim() || ''
  const blogsOnly = type === 'blogs'

  let results: Result[] = []

  if (searchQuery) {
    const payload = await getPayload({ config })
    const targets = blogsOnly
      ? COLLECTIONS.filter((c) => c.slug === 'blogs')
      : COLLECTIONS

    const grouped = await Promise.all(
      targets.map((col) => searchCollection(payload, col, searchQuery))
    )
    results = grouped.flat()
  }

  const totalDocs = results.length

  return (
    <>
      <Navbar navData={navData} />

      <section className="py-16 md:py-24 bg-white mt-17.5">
        <div className="container mx-auto px-4 lg:px-6">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-3">
              {blogsOnly ? 'Blog Search' : 'Search Results'}
            </p>
            <h1 className="text-[32px] md:text-[48px] font-extrabold font-['Avenir'] mb-2">
              Results for &ldquo;{searchQuery}&rdquo;
            </h1>
            <p className="text-gray-500 text-[16px] mb-8">
              {totalDocs === 0
                ? 'No results found'
                : `${totalDocs} result${totalDocs !== 1 ? 's' : ''} found`}
            </p>

            {blogsOnly ? (
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="inline-flex items-center gap-2 text-[#0052C6] font-semibold text-[16px] hover:underline"
              >
                Search the whole site instead →
              </Link>
            ) : (
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[#0052C6] font-semibold text-[16px] hover:underline"
              >
                ← Back to Blog
              </Link>
            )}
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((item) => {
                const formattedDate = item.date
                  ? new Date(item.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : ''

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex flex-col gap-3"
                  >
                    {/* Image */}
                    <div className="w-full h-[250px] rounded-[8px] overflow-hidden bg-[#EEF4FB]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">{item.type}</span>
                        </div>
                      )}
                    </div>

                    {/* Type + Read time */}
                    <div className="flex items-center gap-4">
                      <span className="text-[14px] font-semibold bg-gray-100 px-2.5 py-1">
                        {item.type}
                      </span>
                      {item.readTime && (
                        <span className="text-[14px] font-semibold text-gray-500">
                          {item.readTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-[22px] font-extrabold font-['Avenir'] group-hover:text-[#0052C6] transition-colors">
                      {item.title}
                    </h2>

                    {/* Description */}
                    {item.description && (
                      <p className="text-[15px] text-gray-500 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Date */}
                    {formattedDate && (
                      <p className="text-[13px] text-gray-400">{formattedDate}</p>
                    )}

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
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 className="text-[24px] font-bold text-gray-500">
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : 'Enter a search term'}
              </h3>
              <p className="text-gray-400 text-[16px]">
                Try searching with different keywords
              </p>
              <Link
                href="/blogs"
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