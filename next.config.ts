import type { NextConfig } from "next";
import path from "path";

const getHostname = (url?: string): string => {
  if (!url) return 'jones-paint-and-glass.up.railway.app';
  try {
    const withProtocol = url.startsWith('http') ? url : `https://${url}`;
    return new URL(withProtocol).hostname;
  } catch {
    return url;
  }
};

// Redirects are now handled in middleware.ts at request time, querying
// /api/redirects live — this avoids importing payload.config.ts (a raw
// .ts file) via dynamic import() during Next's config transpilation,
// which Node's module loader can't resolve, and it also means redirects
// added in the CMS take effect immediately without a rebuild.

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      // Localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      // Production (Railway)
      {
        protocol: 'https',
        hostname: getHostname(process.env.NEXT_PUBLIC_SERVER_URL),
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: getHostname(process.env.NEXT_PUBLIC_SERVER_URL),
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: getHostname(process.env.NEXT_PUBLIC_SERVER_URL),
        pathname: '/api/media/file/**',
      },
      // Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Instagram CDN domains
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
        pathname: '/**',
      },
    ],
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      aws4: false,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      "@payload-config": path.resolve(process.cwd(), "payload.config.ts"),
    };

    return config;
  },
};

export default nextConfig;