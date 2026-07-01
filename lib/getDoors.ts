import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getDoors() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'doors' as any,
      limit: 100,
      sort: 'name',
      depth: 2,
    })
    return result.docs ?? []
  } catch (err) {
    console.error('getDoors error:', err)
    return []
  }
}

export async function getDoorsBySlug(slug: string) {
  try {
    const payload = await getPayload({ config })

    const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim()

    const result = await payload.find({
      collection: 'doors' as any,
      where: {
        or: [
          { slug: { equals: normalizedSlug } },
          { slug: { equals: `/${normalizedSlug}` } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    console.log('getDoorsBySlug input:', slug)
    console.log('getDoorsBySlug normalized:', normalizedSlug)
    console.log('getDoorsBySlug result:', JSON.stringify(result.docs[0]?.slug))

    return result.docs[0] ?? null
  } catch (err) {
    console.error('getDoorsBySlug error:', err)
    return null
  }
}