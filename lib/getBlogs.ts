import { getPayload } from 'payload'
import configPromise from '@payload-config'


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
        blogCategory: { equals: categoryId(category) },
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

// Same-category posts only. If the post has no category, or no other
// published post shares it, this returns an empty array and the
// "More on …" section is hidden on the blog page.
export async function getRelatedBlogs(
  category: any,
  excludeId: string,
  limit = 3
) {
  try {
    const catValue = categoryId(category)

    // No category on this post — nothing to recommend
    if (!catValue) return []

    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'blogs' as any,
      where: {
        published: { equals: true },
        id: { not_equals: excludeId },
        blogCategory: { equals: catValue },
      },
      sort: '-publishedDate',
      limit,
      depth: 1,
    })

    return docs ?? []
  } catch (err) {
    console.error('getRelatedBlogs error:', err)
    return []
  }
}