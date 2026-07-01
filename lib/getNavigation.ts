import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getLocations } from './getLocations'
import { getPaint } from './getPaint'
import { getGlass } from './getGlass'
import { getDoors } from './getDoors'

export async function getNavigation() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await (payload as any).findGlobal({
      slug: 'navigation',
      depth: 2,
    })

    // ── Fetch all collections in parallel for performance
    const [locations, paintItems, glassItems, doorsItems] = await Promise.all([
      getLocations(),
      getPaint(),
      getGlass(),
      getDoors(),
    ])

    // ── Build dynamic dropdown nav items
    const locationsNavItem = {
      type: 'dropdown',
      label: 'Locations',
      href: '/locations',
      items: locations.map((loc: any) => ({
        label: loc.name,
        href: `/${loc.slug}`,
      })),
    }

    const paintNavItem = {
      type: 'dropdown',
      label: 'Paint',
      href: '/paint',
      items: paintItems.map((item: any) => ({
        label: item.name,
        href: `/${item.slug}`,
      })),
    }

    const glassNavItem = {
      type: 'dropdown',
      label: 'Windows & Glass',
      href: '/windows-glass',
      items: glassItems.map((item: any) => ({
        label: item.name,
        href: `/${item.slug}`,
      })),
    }

    const doorsNavItem = {
      type: 'dropdown',
      label: 'Doors',
      href: '/doors',
      items: doorsItems.map((item: any) => ({
        label: item.name,
        href: `/${item.slug}`,
      })),
    }

    // ── Map of label → dynamic nav item
    const dynamicItems: Record<string, any> = {
      locations: locationsNavItem,
      paint: paintNavItem,
      glass: glassNavItem,
      doors: doorsNavItem,
    }

    const navItems = result?.navItems ?? []

    // ── Replace any matching nav item label with the dynamic version
    const updatedNavItems = navItems.map((item: any) => {
      const key = item.label?.toLowerCase()
      return dynamicItems[key] ?? item
    })

    return {
      ...result,
      navItems: updatedNavItems,
    }

  } catch {
    return null
  }
}