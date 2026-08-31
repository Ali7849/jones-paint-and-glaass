import { NextResponse, type NextRequest } from 'next/server'

type RedirectDoc = {
  from: string
  to: string
  type: '301' | '302' | '307' | '308'
}

// In-memory cache so we don't hit the API on every single request.
// Matches the `revalidate = 60` on the /api/redirects route.
let cache: { data: RedirectDoc[]; expiresAt: number } | null = null
const CACHE_TTL_MS = 60_000

async function getRedirects(origin: string): Promise<RedirectDoc[]> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.data
  }

  try {
    const res = await fetch(`${origin}/api/redirects`, {
      // Middleware runs on the edge runtime by default; keep this a plain
      // fetch to your own API route rather than importing Payload directly.
      headers: { accept: 'application/json' },
    })

    if (!res.ok) {
      // Serve stale cache rather than nothing if the API hiccups.
      return cache?.data ?? []
    }

    const data = (await res.json()) as RedirectDoc[]
    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS }
    return data
  } catch (err) {
    console.error('middleware: failed to fetch redirects', err)
    return cache?.data ?? []
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl

  const redirects = await getRedirects(origin)
  const match = redirects.find((r) => r.from === pathname)

  if (match) {
    const isPermanent = match.type === '301' || match.type === '308'
    const status = match.type ? Number(match.type) : isPermanent ? 308 : 307

    // Absolute (external) destinations pass straight through to the URL,
    // relative ones resolve against the current origin.
    const destination = match.to.startsWith('http')
      ? match.to
      : new URL(match.to, origin)

    return NextResponse.redirect(destination, status)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Run on everything except:
     * - /api routes (including /api/redirects itself, avoiding a loop)
     * - /_next static/image assets
     * - the Payload admin panel
     * - common static files
     */
    '/((?!api|_next/static|_next/image|admin|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)',
  ],
}