import { NextResponse, type NextRequest } from 'next/server'

type RedirectDoc = {
  id: string
  from: string
  to: string
  type: '301' | '302' | '307' | '308'
}

let cache: { data: RedirectDoc[]; expiresAt: number } | null = null
const CACHE_TTL_MS = 60_000

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

async function getRedirects(origin: string): Promise<RedirectDoc[]> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.data
  }

  const port = process.env.PORT || '8080'
  const candidates = [`http://127.0.0.1:${port}`, origin]

  for (const base of candidates) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const res = await fetch(
        `${base}/api/redirects?where[published][equals]=true&limit=1000&depth=0`,
        { headers: { accept: 'application/json' }, signal: controller.signal }
      )

      clearTimeout(timeoutId)
      if (!res.ok) {
        console.error(`redirect fetch got ${res.status} from ${base}`)
        continue
      }

      const json = await res.json()
      const data = (json.docs ?? []) as RedirectDoc[]
      cache = { data, expiresAt: Date.now() + CACHE_TTL_MS }
      return data
    } catch (err) {
      console.error(
        `redirect fetch failed for ${base}:`,
        (err as any)?.cause ?? err
      )
    }
  }

  return cache?.data ?? []
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const origin = request.nextUrl.origin

  const redirects = await getRedirects(origin)
  const target = normalize(pathname)
  const match = redirects.find((r) => normalize(r.from) === target)

  if (match) {
    const status = match.type ? Number(match.type) : 308
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