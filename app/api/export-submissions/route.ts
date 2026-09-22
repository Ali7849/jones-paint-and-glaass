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
  { key: 'heardAbout', label: 'How Did You Hear' },
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

    let where: any = undefined

    const search = searchParams.get('search')
    if (search) {
      where = { fullName: { like: search } }
    }

    // Date range on createdAt — mirrors the dates picked in the list view
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    if (from || to) {
      const range: any = {}
      if (from) range.greater_than_equal = new Date(`${from}T00:00:00.000Z`)
      // Include the whole of the "to" day, not just midnight
      if (to) range.less_than_equal = new Date(`${to}T23:59:59.999Z`)

      const dateWhere = { createdAt: range }
      where = where ? { and: [where, dateWhere] } : dateWhere
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
    const rangeLabel = from || to ? `-${from || 'start'}_${to || date}` : ''

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${collection}${rangeLabel}-${date}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('CSV export error:', err)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}