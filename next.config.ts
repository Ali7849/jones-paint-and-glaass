import type { NextConfig } from "next";
import path from "path";
import { pathToFileURL } from "url";

const getHostname = (url?: string): string => {
  if (!url) return 'jones-paint-and-glass.up.railway.app';
  try {
    const withProtocol = url.startsWith('http') ? url : `https://${url}`;
    return new URL(withProtocol).hostname;
  } catch {
    return url;
  }
};

async function fetchRedirects() {
  try {
    const { getPayload } = await import('payload')
    const configPath = pathToFileURL(
      path.resolve(process.cwd(), 'payload.config.ts')
    ).href
    const { default: config } = await import(configPath)
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'redirects' as any,
      limit: 1000,
    })

    return result.docs.map((redirect: any) => ({
      source: redirect.from,
      destination: redirect.to,
      permanent: redirect.type === '301' || redirect.type === '308',
    }))
  } catch (err) {
    console.error('Could not load redirects:', err)
    return []
  }
}

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    const redirects = await fetchRedirects()
    return redirects
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