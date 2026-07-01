import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getLocations } from './getLocations'
import { getPaint } from './getPaint'
import { getGlass } from './getGlass'
import { getDoors } from './getDoors'

export async function getFooter() {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await (payload as any).findGlobal({
      slug: 'footer',
      depth: 2,
    })

    const [locations, paintItems, glassItems, doorsItems] = await Promise.all([
      getLocations(),
      getPaint(),
      getGlass(),
      getDoors(),
    ])

    return {
      ...result,
      locations,
      paintItems,
      glassItems,
      doorsItems,
    }
  } catch (error) {
    console.error('getFooter error:', error)
    return null
  }
}