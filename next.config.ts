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

// Hostname of the S3 bucket, taken from S3_PUBLIC_URL so it follows
// whichever bucket the environment points at (yours on staging, the client's on production)
const getS3Hostname = (): string => {
  const url = process.env.S3_PUBLIC_URL;
  if (!url) return 'jones-pg-bucket.s3.eu-north-1.amazonaws.com';
  try {
    return new URL(url).hostname;
  } catch {
    return 'jones-pg-bucket.s3.eu-north-1.amazonaws.com';
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
      // S3 bucket
      {
        protocol: 'https',
        hostname: getS3Hostname(),
        pathname: '/**',
      },
      // Cloudinary — keep until the migration has run, then remove
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