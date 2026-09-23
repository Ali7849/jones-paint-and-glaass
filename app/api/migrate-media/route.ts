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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Filenames contain spaces and parentheses — those must be encoded, but the
// slashes in the prefix must not be.
function buildUrl(base: string, filename: string) {
  return `${base}${PREFIX}/${encodeURIComponent(filename)}`
}

// A HEAD that fails at the socket level is a network blip, not an answer.
// Retry before believing it. Note S3 returns 403 (not 404) for objects that
// don't exist when the caller has no ListBucket permission — res.ok is false
// either way, which is what we want.
async function exists(base: string, filename: string): Promise<boolean> {
  let lastErr: unknown
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(buildUrl(base, filename), {
        method: 'HEAD',
        cache: 'no-store',
      })
      return res.ok
    } catch (err) {
      lastErr = err
      await sleep(300 * (attempt + 1))
    }
  }
  throw lastErr
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
  if (!base.endsWith('/')) {
    return NextResponse.json(
      { error: 'S3_PUBLIC_URL must end with a trailing slash' },
      { status: 500 },
    )
  }

  const params = new URL(req.url).searchParams
  const dryRun = params.get('dryRun') !== 'false'

  // Optional batching: ?page=1&batch=50. Without `page`, everything runs at once.
  const pageParam = params.get('page')
  const batched = pageParam !== null
  const page = Number(pageParam) || 1
  const batch = Number(params.get('batch')) || 50

  const { docs, totalPages, hasNextPage } = await payload.find({
    collection: 'media' as any,
    limit: batched ? batch : 5000,
    page: batched ? page : 1,
    sort: 'createdAt', // stable order so batches don't overlap or skip
    depth: 0,
  })

  const changes: any[] = []
  const verified: string[] = []
  const noPublicId: any[] = []
  const missing: any[] = []
  const collisions: any[] = []
  const networkErrors: any[] = []
  const seen = new Map<string, string>()

  for (const doc of docs as any[]) {
    // One bad record must never kill the whole run.
    try {
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
        if (await exists(base, `${baseName}${ext}`)) {
          found = `${baseName}${ext}`
          break
        }
      }

      if (!found) {
        missing.push({ id: doc.id, filename: doc.filename, publicId })
        continue
      }

      // The record may already point at a suffixed copy from an earlier run
      const suffixed = found.replace(/(\.[^.]+)$/, `-${String(doc.id).slice(-6)}$1`)
      if (doc.filename === suffixed) {
        verified.push(suffixed)
        continue
      }

      if (seen.has(found)) {
        // Two records shared one Cloudinary file (the old adapter overwrote on
        // name clashes). Payload needs unique filenames, so the second record
        // points at a copy suffixed with the end of its ID.
        if (await exists(base, suffixed)) {
          found = suffixed
        } else {
          collisions.push({
            id: doc.id,
            filename: found,
            clashesWith: seen.get(found),
            fix: `aws s3 cp "s3://${process.env.S3_BUCKET}/${PREFIX}/${found}" "s3://${process.env.S3_BUCKET}/${PREFIX}/${suffixed}"`,
          })
          continue
        }
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
        try {
          await payload.update({
            collection: 'media' as any,
            id: doc.id,
            data: { filename: found, mimeType: newMime } as any,
            overrideAccess: true,
          })
        } catch (err: any) {
          // e.g. a duplicate filename across batches — report it, keep going
          changes[changes.length - 1].error = err?.message ?? String(err)
        }
      }
    } catch (err: any) {
      // Socket reset, DNS blip, anything else — record it and move on so the
      // run completes and we can see the full picture.
      networkErrors.push({
        id: doc.id,
        filename: doc.filename,
        error: err?.cause?.code ?? err?.message ?? String(err),
      })
    }
  }

  return NextResponse.json({
    dryRun,
    ...(batched ? { page, totalPages, nextPage: hasNextPage ? page + 1 : null } : {}),
    total: docs.length,
    toUpdate: changes.length,
    verified: verified.length,
    noPublicId: noPublicId.length,
    missing: missing.length,
    collisions: collisions.length,
    networkErrors: networkErrors.length,
    failed: changes.filter((c) => c.error).length,
    missingList: missing,
    collisionList: collisions,
    noPublicIdList: noPublicId,
    networkErrorList: networkErrors,
    changes,
  })
}