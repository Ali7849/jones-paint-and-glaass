import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getNavigation } from '@/lib/getNavigation'
import { getFooter } from '@/lib/getFooter'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import ShareIconsClient from '@/app/components/ShareIconsClient'

export const dynamic = 'force-dynamic'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const navData = await getNavigation()
  const footerData = await getFooter()
  const payload = await getPayload({ config })
  const { docs } = await (payload as any).find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const blog = docs[0]
  if (!blog) return notFound()

  const formattedDate = blog.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const renderContent = (content: any) => {
    if (!content?.root?.children) return null
    return content.root.children.map((node: any, i: number) => {
      if (node.type === 'heading') {
        const Tag = `h${node.tag}` as any
        return (
          <Tag key={i} className="text-[28px] font-extrabold mb-4 font-['Avenir']">
            {node.children?.map((child: any) => child.text).join('')}
          </Tag>
        )
      }
      if (node.type === 'paragraph') {
        return (
          <p key={i} className="text-[18px] leading-relaxed mb-4">
            {node.children?.map((child: any) => child.text).join('')}
          </p>
        )
      }
      if (node.type === 'quote') {
        return (
          <blockquote key={i} className="px-6 py-0 mb-10 text-[16px] italic font-semibold leading-relaxed border-l-2 border-[#16B6E9]">
            {node.children?.map((child: any) => child.text).join('')}
          </blockquote>
        )
      }
      if (node.type === 'upload' && node.value?.url) {
        return (
          <div key={i} className="w-full aspect-video h-[420px] rounded-[16px] overflow-hidden bg-[#EEF4FB] mb-10">
            <Image
              src={node.value.url}
              alt={node.value.alt || ''}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        )
      }
      return null
    })
  }

  return (
    <>
      <Navbar navData={navData} />

      <article className="py-10 md:py-16 bg-white mt-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-7xl">

            {/* Breadcrumb */}
            <p className="text-[16px] text-center sm:text-start font-bold tracking-[0.12em] text-[#0052C6] uppercase mb-3">
              <Link href="/blogs">Blog</Link>
              {blog.category && <> &gt; {blog.category}</>}
            </p>

            {/* Title */}
            <h1 className="text-[36px] md:text-[48px] text-center sm:text-start font-extrabold mb-5 font-['Avenir']">
              {blog.title}
            </h1>

            {/* Author row */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <img src="/assets/images/logo.png" alt="Jones paint and glass" className="w-8 h-8 rounded-full" />
                </div>
                <div>
                  <p className="text-[18px] font-semibold mb-1">
                    {blog.author || 'Jones Paint & Glass'}
                  </p>
                  <p className="text-[16px]">
                    {formattedDate}
                   
                  </p>
                </div>
              </div>

              {/* Top social icons */}
              <div className="flex items-center gap-5 mb-5">
                <ShareIconsClient title={blog.title} />
              </div>
            </div>

          </div>

          {/* Hero image */}
          {blog.image?.url && (
            <div className="w-full aspect-video h-[420px] rounded-[16px] overflow-hidden bg-[#EEF4FB] mb-10">
              <Image
                src={blog.image.url}
                alt={blog.image.alt || blog.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          <div className="mx-auto max-w-7xl">

            {/* Rich text content */}
            <div className="mb-10">
              {renderContent(blog.content)}
            </div>

            {/* Footer — Share + Keywords */}
            <div className="footer">
              <div className="flex flex-col text-start sm:flex-row sm:items-end sm:justify-between gap-4 pt-6 mb-10">

                {/* Share */}
                <div className="flex flex-col gap-3">
                  <span className="text-[18px] font-semibold">Share this post</span>
                  <ShareIconsClient title={blog.title} />
                </div>

                {/* Keywords */}
                {blog.keywords && blog.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.keywords.map((kw: any, i: number) => (
                      <span
                        key={i}
                        className="text-[14px] font-semibold bg-gray-100 px-2.5 py-1 rounded-[6px]"
                      >
                        {kw.keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom author */}
              <div className="flex items-center gap-3 pt-8 border-t-2 border-black">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <img src="/assets/images/logo.png" alt="Jones paint and glass" className="w-8 h-8 rounded-full" />
                </div>
                <div>
                  <p className="text-[18px] font-semibold mb-1">
                    {blog.author || 'Jones Paint & Glass'}
                  </p>
                  <p className="text-[16px]">
                    {formattedDate}
                    
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>

      <Footer footerData={footerData} />
    </>
  )
}