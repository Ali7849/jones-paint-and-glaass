type InstagramPost = {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp?: string
}

let cache: {
  posts: InstagramPost[]
  fetchedAt: number
} | null = null

const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  try {
    // ✅ Return cached if fresh
    if (cache && Date.now() - cache.fetchedAt < CACHE_DURATION) {
      console.log('Instagram: returning cached posts')
      return cache.posts.slice(0, limit)
    }

    const token = process.env.INSTAGRAM_ACCESS_TOKEN
    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

    if (!token || !accountId) {
      console.error('Instagram: missing token or account ID')
      return []
    }

    const url = `https://graph.instagram.com/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${token}`

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache 1 hour
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Instagram API error:', res.status, errorText)
      return cache?.posts ?? []
    }

    const data = await res.json()

    if (!data.data) {
      console.error('Instagram: no data in response', data)
      return cache?.posts ?? []
    }

    const posts: InstagramPost[] = data.data.filter(
      (post: InstagramPost) =>
        post.media_type === 'IMAGE' ||
        post.media_type === 'VIDEO' ||
        post.media_type === 'CAROUSEL_ALBUM'
    )

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