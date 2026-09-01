
import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export const revalidate = 60 

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'redirects' as any,
      limit: 1000,
      depth: 0,
      where: {
        published: {
          equals: true, // Only return active redirects
        },
      },
    })

    const redirects = result.docs.map((doc: any) => ({
      id: doc.id,
      from: doc.from,
      to: doc.to,
      type: doc.type || '301',
    }))

    return NextResponse.json(redirects, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (err) {
    console.error('Failed to fetch redirects:', err)
    return NextResponse.json([], {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=10',
      },
    })
  }
}