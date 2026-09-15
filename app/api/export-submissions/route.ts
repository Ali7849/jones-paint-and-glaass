import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

const ALLOWED = ['quote-submissions', 'contact-submissions']

const COLUMNS = [
  { key: 'createdAt', label: 'Submitted' },
  { key: 'fullName', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'store', label: 'Store' },
  { key: 'message', label: 'Message' },
  { key: 'sentTo', label: 'Notified' },
  { key: 'emailStatus', label: 'Email Status' },
  { key: 'handled', label: 'Followed Up' },
]

function escapeCell(value: any): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'

  let str = String(value)

  // Stop spreadsheets treating leading =, +, -, @ as a formula
  if (/^[=+\-@]/.test(str)) str = `'${str}`

  // Quote if it contains a comma, quote or newline
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const collection = searchParams.get('collection') || ''

  if (!ALLOWED.includes(collection)) {
    return NextResponse.json({ error: 'Unknown collection' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    // These records hold customer contact details — require a logged-in user
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Mirror the list view's filters where present
    let where: any = undefined
    const rawWhere = searchParams.get('where')
    if (rawWhere) {
      try {
        where = JSON.parse(rawWhere)
      } catch {
        // Ignore a malformed filter rather than failing the export
      }
    }

    const search = searchParams.get('search')
    if (search) {
      const searchWhere = { fullName: { like: search } }
      where = where ? { and: [where, searchWhere] } : searchWhere
    }

    const { docs } = await (payload as any).find({
      collection,
      where,
      sort: searchParams.get('sort') || '-createdAt',
      limit: 10000,
      depth: 0,
    })

    const header = COLUMNS.map((c) => escapeCell(c.label)).join(',')

    const rows = docs.map((doc: any) =>
      COLUMNS.map((c) => {
        if (c.key === 'createdAt' && doc.createdAt) {
          return escapeCell(new Date(doc.createdAt).toISOString())
        }
        return escapeCell(doc[c.key])
      }).join(',')
    )

    // BOM so Excel reads UTF-8 correctly
    const csv = '\uFEFF' + [header, ...rows].join('\r\n')

    const date = new Date().toISOString().slice(0, 10)

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${collection}-${date}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('CSV export error:', err)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}