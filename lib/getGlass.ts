import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getGlass() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'glass' as any,
      limit: 100,
      sort: 'name',
      depth: 2,
    })
    return result.docs ?? []
  } catch (err) {
    console.error('getGlass error:', err)
    return []
  }
}

export async function getGlassBySlug(slug: string) {
  try {
    const payload = await getPayload({ config })

    const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim()

    const result = await payload.find({
      collection: 'glass' as any,
      where: {
        or: [
          { slug: { equals: normalizedSlug } },
          { slug: { equals: `/${normalizedSlug}` } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    console.log('getGlassBySlug input:', slug)
    console.log('getGlassBySlug normalized:', normalizedSlug)
    console.log('getGlassBySlug result:', JSON.stringify(result.docs[0]?.slug))

    return result.docs[0] ?? null
  } catch (err) {
    console.error('getGlassBySlug error:', err)
    return null
  }
}