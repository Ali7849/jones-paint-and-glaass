import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'


export const revalidate = 60 // cache for 1 minute

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'redirects' as any,
      limit: 1000,
    })
    return NextResponse.json(result.docs)
  } catch (err) {
    console.error('Failed to fetch redirects:', err)
    return NextResponse.json([], { status: 200 })
  }
}