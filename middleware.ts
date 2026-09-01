// middleware.ts - UPDATED
import { NextResponse, type NextRequest } from 'next/server'

type RedirectDoc = {
  id: string
  from: string
  to: string
  type: '301' | '302' | '307' | '308'
}

let cache: { data: RedirectDoc[]; expiresAt: number } | null = null
const CACHE_TTL_MS = 60_000

async function getRedirects(origin: string): Promise<RedirectDoc[]> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.data
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(`${origin}/api/redirects-list`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      console.error('Failed to fetch redirects:', res.status)
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
  const { pathname } = request.nextUrl
  const origin = request.nextUrl.origin

  const redirects = await getRedirects(origin)
  const match = redirects.find((r) => r.from === pathname)

  if (match) {
    const isPermanent = match.type === '301' || match.type === '308'
    const status = match.type ? Number(match.type) : isPermanent ? 308 : 307

    const destination = match.to.startsWith('http')
      ? match.to
      : `${origin}${match.to}`

    return NextResponse.redirect(destination, status)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|admin|adminsmdsada|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)',
  ],
}