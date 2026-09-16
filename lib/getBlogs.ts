import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Category may arrive as a populated relationship object, an ID string,
// or an old plain string from before categories became a collection.
function categoryId(category: any) {
  if (!category) return undefined
  return typeof category === 'object' ? category.id : category
}

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

export async function getBlogsByCategory(category: any, limit = 100) {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blogs' as any,
      where: {
        published: { equals: true },
        category: { equals: categoryId(category) },
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

export async function getRelatedBlogs(
  category: any,
  excludeId: string,
  limit = 3
) {
  try {
    const payload = await getPayload({ config: configPromise })

    const catValue = categoryId(category)

    const base: any = {
      published: { equals: true },
      id: { not_equals: excludeId },
    }

    if (catValue) {
      const sameCategory = await payload.find({
        collection: 'blogs' as any,
        where: { ...base, category: { equals: catValue } },
        sort: '-publishedDate',
        limit,
        depth: 1,
      })

      if (sameCategory.docs.length >= limit) return sameCategory.docs

      const existingIds = sameCategory.docs.map((d: any) => d.id)
      const filler = await payload.find({
        collection: 'blogs' as any,
        where: {
          ...base,
          id: { not_in: [excludeId, ...existingIds] },
        },
        sort: '-publishedDate',
        limit: limit - sameCategory.docs.length,
        depth: 1,
      })

      return [...sameCategory.docs, ...filler.docs]
    }

    // No category set on this post — show recent instead
    const recent = await payload.find({
      collection: 'blogs' as any,
      where: base,
      sort: '-publishedDate',
      limit,
      depth: 1,
    })

    return recent.docs
  } catch (err) {
    console.error('getRelatedBlogs error:', err)
    return []
  }
}