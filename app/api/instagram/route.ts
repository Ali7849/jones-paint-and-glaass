import { NextResponse } from 'next/server'
import { getInstagramPosts } from '@/lib/getInstagramPosts'

export const revalidate = 3600 // ✅ cache 1 hour

export async function GET() {
  try {
    const posts = await getInstagramPosts(6)
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] })
  }
}