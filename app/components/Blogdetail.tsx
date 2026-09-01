"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  image?: {
    url: string;
    alt?: string;
  };
  publishedDate: string;
  readTime?: number;
  category?: string;
  content?: any;
}

interface BlogDetailBlockProps {
  label?: string;
  heading?: string;
  subheading?: string;
}

function extractSummary(content: any, maxLength = 150): string {
  if (!content?.root?.children) return "";
  for (const node of content.root.children) {
    if (node.type === "paragraph") {
      const text = node.children?.map((c: any) => c.text || "").join("") || "";
      if (text.trim())
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }
  }
  return "";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isThisMonth(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export default function BlogDetail({
  label = "OUR BLOG",
  heading = "The Crash Course",
  subheading = "Jones Paint & Glass Blog",
}: BlogDetailBlockProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();

        // Sort by publishedDate (newest first)
        const sortedBlogs = data.blogs.sort(
          (a: Blog, b: Blog) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        );

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
              {label}
            </p>
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-3 font-['Avenir']">
              {heading}
            </h2>
            <p className="text-[18px] text-gray-500">{subheading}</p>
            <div className="mt-10 flex items-center justify-center">
              <svg
                className="animate-spin w-8 h-8 text-[#0052C6]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
            {label}
          </p>
          <h2 className="text-[36px] md:text-[48px] font-extrabold mb-3 font-['Avenir']">
            {heading}
          </h2>
          <p className="text-[18px] text-gray-500 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* This Month Badge (if any blogs this month) */}
        {blogs.some((b) => isThisMonth(b.publishedDate)) && (
          <div className="mb-8 inline-flex items-center gap-2 bg-[#E6F1FB] text-[#0052C6] px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-[#0052C6] rounded-full"></span>
            <span className="text-sm font-semibold">Latest This Month</span>
          </div>
        )}

        {/* Blogs Grid */}
        {currentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentBlogs.map((blog) => {
              const imageUrl = blog.image?.url ?? "/assets/jt/blog-default.png";
              const imageAlt = blog.image?.alt ?? blog.title;
              const summary = extractSummary(blog.content);
              const isNewThisMonth = isThisMonth(blog.publishedDate);

              return (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="flex flex-col h-full overflow-hidden rounded-[16px] border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-[240px] overflow-hidden bg-gray-100">
                    {isNewThisMonth && (
                      <div className="absolute top-4 left-4 z-10 bg-[#0052C6] text-white px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                      </div>
                    )}
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {blog.category && (
                        <>
                          <span className="px-3 py-1 bg-[#F4F7FF] text-[#0052C6] rounded-full text-xs font-semibold">
                            {blog.category}
                          </span>
                          <span>•</span>
                        </>
                      )}
                      <span>{formatDate(blog.publishedDate)}</span>
                      {blog.readTime && (
                        <>
                          <span>•</span>
                          <span>{blog.readTime} min read</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-[22px] font-bold text-gray-900 line-clamp-2 hover:text-[#0052C6] transition-colors">
                      {blog.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 line-clamp-3 flex-1">{summary}</p>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-[#0052C6] font-semibold group">
                      <span>Read More</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs found yet.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-[#0052C6] text-white font-semibold"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center text-gray-500 text-sm">
          Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, blogs.length)}{" "}
          of {blogs.length} blogs
        </div>
      </div>
    </section>
  );
}