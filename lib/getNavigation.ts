import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getLocations } from './getLocations'
import { getPaint } from './getPaint'
import { getGlass } from './getGlass'
import { getDoors } from './getDoors'

type NavSubItem = {
  label: string
  href: string
  description?: string
}

function resolveSubItem(sub: any): NavSubItem | null {
  const doc = sub.reference?.value

  // Manual entry — no page selected
  if (!doc || typeof doc === 'string') {
    if (!sub.label || !sub.href) return null
    return {
      label: sub.label,
      href: sub.href,
      description: sub.description || undefined,
    }
  }

  // Page selected — label/href act as optional overrides
  const label = sub.label || doc.name || doc.title
  const href = sub.href || `/${doc.slug}`
  if (!label || !href) return null

  return { label, href, description: sub.description || undefined }
}

export async function getNavigation() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await (payload as any).findGlobal({
      slug: 'navigation',
      depth: 2,
    })

    // ── Fetch all collections in parallel
    const [locations, paintItems, glassItems, doorsItems] = await Promise.all([
      getLocations(),
      getPaint(),
      getGlass(),
      getDoors(),
    ])

    const sources: Record<string, any[]> = {
      locations,
      paint: paintItems,
      glass: glassItems,
      doors: doorsItems,
    }

    const toSubItems = (docs: any[]): NavSubItem[] =>
      docs
        .filter((doc: any) => doc.slug)
        .map((doc: any) => ({
          label: doc.name ?? doc.title ?? 'Untitled',
          href: `/${doc.slug}`,
        }))

    const navItems = (result?.navItems ?? []).map((item: any) => {
      if (item.type !== 'dropdown') return item

      // Manually chosen items always win
      const manual = (item.items ?? [])
        .map(resolveSubItem)
        .filter(Boolean) as NavSubItem[]

      if (manual.length > 0) {
        return { ...item, items: manual }
      }

      // Otherwise fall back to auto-fill, if a source is set
      const source = item.autoSource
      if (source && source !== 'none' && sources[source]) {
        return { ...item, items: toSubItems(sources[source]) }
      }

      return { ...item, items: [] }
    })

    return { ...result, navItems }
  } catch (err) {
    console.error('getNavigation error:', err)
    return null
  }
}