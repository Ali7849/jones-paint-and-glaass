import { NextResponse } from 'next/server'

export const revalidate = 3600 // cache for 1 hour

export async function GET() {
  const IG_USER_ID = process.env.IG_USER_ID
  const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN

  if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Instagram env vars' },
      { status: 500 }
    )
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
    const url = `https://graph.facebook.com/v19.0/${IG_USER_ID}/media?fields=${fields}&access_token=${IG_ACCESS_TOKEN}&limit=25`

    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      console.error('Instagram API error:', errBody)
      return NextResponse.json({ posts: [] }, { status: 200 })
    }

    const data = await res.json()

    return NextResponse.json({ posts: data.data ?? [] })
  } catch (err) {
    console.error('Failed to fetch Instagram posts:', err)
    return NextResponse.json({ posts: [] }, { status: 200 })
  }
}