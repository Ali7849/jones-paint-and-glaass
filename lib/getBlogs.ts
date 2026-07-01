import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getBlogs() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blogs' as any,
      where: { published: { equals: true } },
      limit: 100,
      depth: 2,
    })
    return result.docs ?? []
  } catch {
    return []
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blogs' as any,
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    return result.docs[0] ?? null
  } catch {
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
  } catch {
    return null
  }
}