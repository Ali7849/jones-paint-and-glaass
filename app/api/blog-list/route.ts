import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const sort = searchParams.get('sort') || '-publishedDate'
    const depth = Number(searchParams.get('depth')) || 1
    const category = searchParams.get('category')

    const where: any = { published: { equals: true } }
    if (category) where.category = { equals: category }

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'blogs' as any,
      where,
      limit,
      page,
      sort,
      depth,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return NextResponse.json(
      { docs: [], totalPages: 1, error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}