type InstagramPost = {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
}

// ✅ Simple in-memory cache
let cache: {
  posts: InstagramPost[]
  fetchedAt: number
} | null = null

const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  try {
    // ✅ Return cached data if still fresh
    if (cache && Date.now() - cache.fetchedAt < CACHE_DURATION) {
      console.log('Instagram: returning cached posts')
      return cache.posts.slice(0, limit)
    }

    const token = process.env.INSTAGRAM_ACCESS_TOKEN
    if (!token) {
      console.error('Instagram: INSTAGRAM_ACCESS_TOKEN not set')
      return []
    }

    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=${token}`

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ✅ Next.js cache 1 hour
    })

    if (!res.ok) {
      console.error('Instagram API error:', res.status, await res.text())
      return cache?.posts ?? [] // ✅ return stale cache if API fails
    }

    const data = await res.json()

    if (!data.data) {
      console.error('Instagram: no data in response', data)
      return []
    }

    // ✅ Filter only IMAGE and VIDEO posts (skip CAROUSEL_ALBUM if needed)
    const posts: InstagramPost[] = data.data.filter(
      (post: InstagramPost) =>
        post.media_type === 'IMAGE' ||
        post.media_type === 'VIDEO' ||
        post.media_type === 'CAROUSEL_ALBUM'
    )

    // ✅ Update cache
    cache = {
      posts,
      fetchedAt: Date.now(),
    }

    console.log(`Instagram: fetched ${posts.length} posts`)
    return posts.slice(0, limit)

  } catch (err) {
    console.error('Instagram fetch error:', err)
    return cache?.posts ?? []
  }
}