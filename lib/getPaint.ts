import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getPaint() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'paint' as any,
      limit: 100,
      sort: 'name',
      depth: 2,
    })
    return result.docs ?? []
  } catch (err) {
    console.error('getPaint error:', err)
    return []
  }
}

export async function getPaintBySlug(slug: string) {
  try {
    const payload = await getPayload({ config })

    const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim()

    const result = await payload.find({
      collection: 'paint' as any,
      where: {
        or: [
          { slug: { equals: normalizedSlug } },
          { slug: { equals: `/${normalizedSlug}` } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    console.log('getPaintBySlug input:', slug)
    console.log('getPaintBySlug normalized:', normalizedSlug)
    console.log('getPaintBySlug result:', JSON.stringify(result.docs[0]?.slug))

    return result.docs[0] ?? null
  } catch (err) {
    console.error('getPaintBySlug error:', err)
    return null
  }
}