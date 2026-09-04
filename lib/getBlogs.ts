import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getBlogs(limit = 100) {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blogs' as any,
      where: { published: { equals: true } },
      sort: '-publishedDate',
      limit,
      depth: 2,
    })
    return result.docs ?? []
  } catch (err) {
    console.error('getBlogs error:', err)
    return []
  }
}

export async function getBlogsByCategory(category: string, limit = 100) {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blogs' as any,
      where: {
        published: { equals: true },
        category: { equals: category },
      },
      sort: '-publishedDate',
      limit,
      depth: 2,
    })
    return result.docs ?? []
  } catch (err) {
    console.error('getBlogsByCategory error:', err)
    return []
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blogs' as any,
      where: {
        slug: { equals: slug },
        published: { equals: true },
      },
      depth: 2,
      limit: 1,
    })
    return result.docs[0] ?? null
  } catch (err) {
    console.error('getBlogBySlug error:', err)
    return null
  }
}

export async function getBlogById(id: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await (payload as any).findByID({
      collection: 'blogs',
      id,
      depth: 2,
    })
    return result ?? null
  } catch (err) {
    console.error('getBlogById error:', err)
    return null
  }
}