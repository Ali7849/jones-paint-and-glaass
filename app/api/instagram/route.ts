import { NextResponse } from 'next/server'
import { getInstagramPosts } from '@/lib/getInstagramPosts'

export const revalidate = 3600 // Cache 1 hour

export async function GET() {
  try {
    const posts = await getInstagramPosts(6)
    return NextResponse.json({ posts }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ posts: [] })
  }
}