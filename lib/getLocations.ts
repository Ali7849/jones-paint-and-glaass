import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getLocations() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'locations' as any,
      limit: 100,
      sort: 'name',
      depth: 3,
    })
    return result.docs ?? []
  } catch (err) {
    console.error('getLocations error:', err)
    return []
  }
}

export async function getLocationBySlug(slug: string) {
  try {
    const payload = await getPayload({ config })

    // ✅ Normalize slug to handle Railway URL encoding differences
    const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim()

    const result = await payload.find({
      collection: 'locations' as any,
      where: {
        or: [
          { slug: { equals: normalizedSlug } },
          { slug: { equals: `/${normalizedSlug}` } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    console.log('getLocationBySlug input:', slug)
    console.log('getLocationBySlug normalized:', normalizedSlug)
    console.log('getLocationBySlug result:', JSON.stringify(result.docs[0]?.slug))

    return result.docs[0] ?? null
  } catch (err) {
    console.error('getLocationBySlug error:', err)
    return null
  }
}