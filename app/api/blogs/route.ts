import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const result = await payload.find({
      collection: 'blogs',
      limit: 1000,
      depth: 2,
      where: {
        published: {
          equals: true,
        },
      },
    })

    return NextResponse.json({
      blogs: result.docs,
      total: result.totalDocs,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}