import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getAnalytics() {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({ slug: 'analytics' })
  } catch (err) {
    console.error('getAnalytics error:', err)
    return null
  }
}