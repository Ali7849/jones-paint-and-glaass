import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_BUSINESS_ID

  if (!token || !userId) {
    console.warn('Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ID')
    return NextResponse.json({ posts: [] }, { status: 200 })
  }

  try {
    // ✅ Business accounts use graph.facebook.com, NOT graph.instagram.com
    const url = `https://graph.facebook.com/v19.0/${userId}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&limit=20&access_token=${token}`

    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Instagram API error:', errorText)
      return NextResponse.json({ posts: [], error: errorText }, { status: 200 })
    }

    const data = await res.json()

    // ✅ Log so you can see in Railway logs what's coming back
    console.log('Instagram API response:', JSON.stringify(data))

    return NextResponse.json({ posts: data.data || [] })
  } catch (err) {
    console.error('Instagram fetch error:', err)
    return NextResponse.json({ posts: [] }, { status: 200 })
  }
}