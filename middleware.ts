import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ✅ Use your public URL env var instead of fetching self
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  try {
    // ✅ Use absolute URL from env var — not request.nextUrl.origin
    const res = await fetch(`${SERVER_URL}/api/redirects`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return NextResponse.next()

    const redirects = await res.json()

    const match = redirects.find((r: any) => r.from === pathname)

    if (match) {
      const isPermanent = match.type === '301' || match.type === '308'
      return NextResponse.redirect(
        new URL(match.to, request.url),
        { status: isPermanent ? 308 : 307 }
      )
    }
  } catch (err) {
    console.error('Middleware redirect error:', err)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|assets|media|favicon.ico|robots.txt|sitemap.xml).*)'],
}