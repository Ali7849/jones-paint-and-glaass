"use client";

import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getNavigation } from '@/lib/getNavigation'
import { getFooter } from '@/lib/getFooter'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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

  // Social share icons component (inline)
  const ShareIcons = ({ title }: { title: string }) => {
    const [pageUrl, setPageUrl] = useState("")
    const [copied, setCopied] = useState(false)

    useEffect(() => {
      if (typeof window !== "undefined") {
        setPageUrl(window.location.href)
      }
    }, [])

    // Social Share Functions
    const shareOnFacebook = () => {
      if (!pageUrl) return
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
      window.open(url, "facebook-share", "width=600,height=400")
    }

    const shareOnTwitter = () => {
      if (!pageUrl) return
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`
      window.open(url, "twitter-share", "width=600,height=400")
    }

    const shareOnLinkedIn = () => {
      if (!pageUrl) return
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
      window.open(url, "linkedin-share", "width=600,height=400")
    }

    const shareOnWhatsApp = () => {
      if (!pageUrl) return
      const text = `${title} ${pageUrl}`
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(url, "whatsapp-share", "width=600,height=400")
    }

    const copyToClipboard = async () => {
      if (!pageUrl) return
      try {
        await navigator.clipboard.writeText(pageUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    return (
      <div className="flex items-center gap-4 flex-wrap">
        {/* Share/Copy Link */}
        <button
          onClick={copyToClipboard}
          title={copied ? "Copied!" : "Copy link"}
          className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
        >
          <img
            src="/assets/jt/elements/share-icon.png"
            alt={copied ? "Copied!" : "Share"}
            className="w-6 h-6"
          />
        </button>

        {/* LinkedIn */}
        <button
          onClick={shareOnLinkedIn}
          title="Share on LinkedIn"
          className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
        >
          <img src="/assets/jt/elements/linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" />
        </button>

        {/* Facebook */}
        <button
          onClick={shareOnFacebook}
          title="Share on Facebook"
          className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
        >
          <img src="/assets/jt/elements/facebook-icon.png" alt="Facebook" className="w-6 h-6" />
        </button>

        {/* Instagram */}
        
        <a  href="https://www.instagram.com/jonespaintandglass/"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow on Instagram"
          className="rounded flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <img src="/assets/jt/elements/instagram-icon.png" alt="Instagram" className="w-6 h-6" />
        </a>

        {/* Twitter/X */}
        <button
          onClick={shareOnTwitter}
          title="Share on Twitter"
          className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
        >
          <img src="/assets/jt/elements/x-icon.png" alt="Twitter" className="w-6 h-6" />
        </button>

        {/* TikTok */}
        
        <a  href="https://www.tiktok.com/@jonespaintandglass"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow on TikTok"
          className="rounded flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <img src="/assets/jt/elements/tiktok.png" alt="TikTok" className="w-6 h-6" />
        </a>

        {/* YouTube */}
        
          href="https://www.youtube.com/@JonesPaintGlassInc"
          target="_blank"
          rel="noopener noreferrer"
          title="Subscribe on YouTube"
          className="rounded flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <img src="/assets/jt/elements/youtube.png" alt="YouTube" className="w-6 h-6" />
        </a>

        {/* Tooltip for copy feedback */}
        {copied && (
          <span className="text-[12px] text-green-500 font-semibold ml-2">
            Copied!
          </span>
        )}
      </div>
    )
  }

  return (
    <>
      <Navbar navData={navData} />

      <article className="py-10 md:py-16 bg-white mt-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-7xl">

            {/* Breadcrumb */}
            <p className="text-[16px] text-center sm:text-start font-bold tracking-[0.12em] text-[#0052C6] uppercase mb-3">
              <Link href="/blog">Blog</Link>
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
                    {blog.readTime && ` • ${blog.readTime}`}
                  </p>
                </div>
              </div>

              {/* Top social icons */}
              <div className="flex items-center gap-5 mb-5">
                <ShareIcons title={blog.title} />
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
                  <ShareIcons title={blog.title} />
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
                    {blog.readTime && ` • ${blog.readTime}`}
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