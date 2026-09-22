import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

const PREFIX = 'paint-media/media'

// Cloudinary sometimes stored files in a different format than they were
// uploaded as, so the extension in the database isn't always the one in S3.
const FALLBACK_EXTS = ['.webp', '.jpg', '.jpeg', '.png', '.avif', '.gif', '.svg', '.mp4', '.pdf', '.ico']

const MIME: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
}

async function exists(url: string) {
  const res = await fetch(url, { method: 'HEAD' })
  return res.ok
}

export async function GET(req: Request) {
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const base = process.env.S3_PUBLIC_URL
  if (!base) {
    return NextResponse.json({ error: 'S3_PUBLIC_URL not set' }, { status: 500 })
  }

  const dryRun = new URL(req.url).searchParams.get('dryRun') !== 'false'

  const { docs } = await payload.find({
    collection: 'media' as any,
    limit: 5000,
    depth: 0,
  })

  const changes: any[] = []
  const verified: string[] = []
  const noPublicId: any[] = []
  const missing: any[] = []
  const collisions: any[] = []
  const seen = new Map<string, string>()

  for (const doc of docs as any[]) {
    const publicId: string | undefined = doc.cloudinaryPublicId
    if (!publicId) {
      noPublicId.push({ id: doc.id, filename: doc.filename })
      continue
    }

    const baseName = publicId.split('/').pop() as string
    const originalExt = (doc.filename?.match(/\.[^.]+$/)?.[0] ?? '').toLowerCase()

    // Try the recorded extension first, then the others
    const candidates = [originalExt, ...FALLBACK_EXTS.filter((e) => e !== originalExt)]
      .filter(Boolean)

    let found: string | null = null
    for (const ext of candidates) {
      if (await exists(`${base}${PREFIX}/${baseName}${ext}`)) {
        found = `${baseName}${ext}`
        break
      }
    }

    if (!found) {
      missing.push({ id: doc.id, filename: doc.filename, publicId })
      continue
    }

    if (seen.has(found)) {
      collisions.push({ id: doc.id, filename: found, clashesWith: seen.get(found) })
      continue
    }
    seen.set(found, doc.id)

    // File exists under the name the record already has — nothing to do
    if (doc.filename === found) {
      verified.push(found)
      continue
    }

    const newExt = found.match(/\.[^.]+$/)?.[0]?.toLowerCase() ?? ''
    const newMime = MIME[newExt] ?? doc.mimeType

    changes.push({
      id: doc.id,
      from: doc.filename,
      to: found,
      mimeType: newMime !== doc.mimeType ? `${doc.mimeType} → ${newMime}` : undefined,
    })

    if (!dryRun) {
      await payload.update({
        collection: 'media' as any,
        id: doc.id,
        data: { filename: found, mimeType: newMime } as any,
        overrideAccess: true,
      })
    }
  }

  return NextResponse.json({
    dryRun,
    total: docs.length,
    toUpdate: changes.length,
    verified: verified.length,
    noPublicId: noPublicId.length,
    missing: missing.length,
    collisions: collisions.length,
    missingList: missing,
    collisionList: collisions,
    noPublicIdList: noPublicId,
    changes,
  })
}