'use client'

import React from 'react'
import { useSearchParams, usePathname } from 'next/navigation'

export default function ExportSubmissions() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // /admin/collections/quote-submissions → quote-submissions
  const collection = pathname.split('/collections/')[1]?.split('/')[0]
  if (!collection) return null

  const params = new URLSearchParams({ collection })

  // Carry the current search and filters through to the export
  const search = searchParams.get('search')
  if (search) params.set('search', search)

  const where = searchParams.get('where')
  if (where) params.set('where', where)

  const sort = searchParams.get('sort')
  if (sort) params.set('sort', sort)

  return (
    <div style={{ marginBottom: '1rem' }}>
      
      <a  href={`/api/export-submissions?${params.toString()}`}
        className="btn btn--style-secondary btn--size-small"
        style={{ textDecoration: 'none' }}
      >
        Export CSV
      </a>
    </div>
  )
}