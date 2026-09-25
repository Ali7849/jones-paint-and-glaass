import type { Metadata } from 'next'
import { Fragment } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getNavigation } from '@/lib/getNavigation'
import { getFooter } from '@/lib/getFooter'
import { getRelatedBlogs } from '@/lib/getBlogs'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import RecommendBlog from '@/app/components/RecommendBlogs'
import Image from 'next/image'
import Link from 'next/link'
import ShareIconsClient from '@/app/components/ShareIconsClient'

export const dynamic = 'force-dynamic'

async function getBlog(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await (payload as any).find({
    collection: 'blogs',
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

// Category may be a relationship object or, on older posts, a plain string
function categoryName(category: any): string {
  if (!category) return ''
  return typeof category === 'object' ? (category.name ?? '') : category
}

// The title is a plain text field, so it carries no format flags. Raise the
// trademark marks ourselves so headings match the body.
function renderTitle(title: string): React.ReactNode {
  if (!title) return title
  return title.split(/([®™℠])/).map((part, i) =>
    part === '®' || part === '™' || part === '℠'
      ? <sup key={i} className="text-[0.55em] align-super">{part}</sup>
      : <Fragment key={i}>{part}</Fragment>
  )
}

// ─── Lexical rendering helpers ────────────────────────────────

// Route prefix per collection, for internal links picked in the editor.
// CHECK THESE against your actual routes before deploying.
const COLLECTION_PREFIX: Record<string, string> = {
  pages: '',
  blogs: '/blog',
  locations: '/locations',
  paint: '/paint',
  glass: '/glass',
  doors: '/doors',
}

function linkHref(fields: any): string {
  if (!fields) return '#'

  // Internal link — the editor stores a relationship, not a URL
  if (fields.linkType === 'internal' && fields.doc) {
    const relationTo: string = fields.doc.relationTo
    const value = fields.doc.value
    const slug = typeof value === 'object' ? value?.slug : undefined
    if (!slug) return '#'
    const prefix = COLLECTION_PREFIX[relationTo] ?? ''
    return `${prefix}/${slug}`
  }

  return fields.url || '#'
}

// Lexical stores text styling as a bitmask on each text node
const FORMAT = {
  bold: 1,
  italic: 2,
  strikethrough: 4,
  underline: 8,
  code: 16,
  subscript: 32,
  superscript: 64,
}

function renderTextNode(node: any, key: React.Key) {
  let el: React.ReactNode = node.text
  const f: number = node.format ?? 0

  if (f & FORMAT.code) el = <code className="px-1 py-0.5 bg-gray-100 rounded text-[0.9em]">{el}</code>
  if (f & FORMAT.bold) el = <strong>{el}</strong>
  if (f & FORMAT.italic) el = <em>{el}</em>
  if (f & FORMAT.underline) el = <u>{el}</u>
  if (f & FORMAT.strikethrough) el = <s>{el}</s>
  if (f & FORMAT.subscript) el = <sub>{el}</sub>
  if (f & FORMAT.superscript) el = <sup>{el}</sup>

  return <Fragment key={key}>{el}</Fragment>
}

// Walks any inline children: text, links, line breaks, nested formatting.
// This is what the old renderer was missing — it only read `child.text`,
// so link nodes (which hold their text in `children`) came out empty.
function renderInline(children: any[] | undefined): React.ReactNode {
  if (!children?.length) return null

  return children.map((node: any, i: number) => {
    if (node.type === 'text') {
      return renderTextNode(node, i)
    }

    if (node.type === 'linebreak') {
      return <br key={i} />
    }

    if (node.type === 'link' || node.type === 'autolink') {
      const href = linkHref(node.fields)
      const newTab = Boolean(node.fields?.newTab)
      const isExternal = /^https?:\/\//i.test(href)

      const className =
        'text-[#0052C6] underline underline-offset-2 hover:opacity-80 transition-opacity'

      // Plain <a> for external URLs, next/link for internal routes
      if (isExternal || newTab) {
        return (
          <a
            key={i}
            href={href}
            className={className}
            {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {renderInline(node.children)}
          </a>
        )
      }

      return (
        <Link key={i} href={href} className={className}>
          {renderInline(node.children)}
        </Link>
      )
    }

    // Anything else that still carries children — keep the text rather than drop it
    if (node.children) {
      return <Fragment key={i}>{renderInline(node.children)}</Fragment>
    }

    return null
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) return { title: 'Post not found' }

  const ogImage = blog.ogImage?.url || blog.image?.url

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || undefined,
    alternates: blog.canonicalUrl ? { canonical: blog.canonicalUrl } : undefined,
    robots: blog.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || undefined,
      type: 'article',
      publishedTime: blog.publishedDate || undefined,
      authors: blog.author ? [blog.author] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const navData = await getNavigation()
  const footerData = await getFooter()
  const blog = await getBlog(slug)

  if (!blog) return notFound()

  // Posts from the same category, excluding this one
  const relatedPosts = await getRelatedBlogs(blog.blogCategory, blog.id)

  const catName = categoryName(blog.blogCategory)

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
            {renderInline(node.children)}
          </Tag>
        )
      }

      if (node.type === 'paragraph') {
        // An empty paragraph is a deliberate blank line in the editor
        if (!node.children?.length) return <p key={i} className="mb-4">&nbsp;</p>

        return (
          <p key={i} className="text-[18px] leading-relaxed mb-4">
            {renderInline(node.children)}
          </p>
        )
      }

      if (node.type === 'quote') {
        return (
          <blockquote
            key={i}
            className="px-6 py-0 mb-10 text-[16px] italic font-semibold leading-relaxed border-l-2 border-[#16B6E9]"
          >
            {renderInline(node.children)}
          </blockquote>
        )
      }

      if (node.type === 'list') {
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
        return (
          <ListTag
            key={i}
            className={`mb-6 pl-6 text-[18px] leading-relaxed ${
              node.tag === 'ol' ? 'list-decimal' : 'list-disc'
            }`}
          >
            {node.children?.map((li: any, j: number) => (
              <li key={j} className="mb-2">
                {renderInline(li.children)}
              </li>
            ))}
          </ListTag>
        )
      }

      if (node.type === 'horizontalrule') {
        return <hr key={i} className="my-8 border-gray-200" />
      }

      if (node.type === 'upload') {
        // `value` is normally the populated media doc, but can arrive as a bare
        // ID, or with `filename` but no `url`. Handle all three rather than
        // silently dropping the image.
        const media = typeof node.value === 'object' ? node.value : null

        const url =
          media?.url ||
          (media?.filename
            ? `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL ?? ''}paint-media/media/${media.filename}`
            : null)

        if (!url) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Blog upload node has no resolvable URL:', node.value)
          }
          return null
        }

        const caption = node.fields?.caption?.root?.children
          ? renderInline(node.fields.caption.root.children)
          : null

        return (
          <figure key={i} className="mb-10">
            <div className="w-full aspect-video h-[420px] rounded-[16px] overflow-hidden bg-[#EEF4FB]">
              <Image
                src={url}
                alt={media?.alt || ''}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            {caption && (
              <figcaption className="text-[14px] text-gray-500 mt-2 text-center">
                {caption}
              </figcaption>
            )}
          </figure>
        )
      }

      // Custom editor blocks — log in dev so we can see what's unhandled
      if (node.type === 'block') {
        if (process.env.NODE_ENV === 'development') {
          console.log('Unhandled block node in blog content:', node.fields?.blockType)
        }
        return null
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
              <Link href="/blogs">Blogs</Link>
              {catName && <> &gt; {catName}</>}
            </p>

            {/* Title */}
            <h1 className="text-[36px] md:text-[48px] text-center sm:text-start font-extrabold mb-5 font-['Avenir']">
              {renderTitle(blog.title)}
            </h1>

            {/* Author row */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-8">
              <div className="flex items-center gap-3">
                
                  <p className="text-[16px]">
                    {formattedDate}
                   
                  </p>
                
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

                <p className="text-[16px]">
                  {formattedDate}
                  
                </p>
               
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* Related posts — same category where possible */}
      {relatedPosts.length > 0 && (
        <RecommendBlog
          label="Read More"
          heading={catName ? `More on ${catName}` : 'Recommended for You'}
          posts={relatedPosts}
        />
      )}

      <Footer footerData={footerData} />
    </>
  )
}