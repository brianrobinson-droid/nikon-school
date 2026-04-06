import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Navigation, SiteSetting, Media } from '@/payload-types'
import { NavigationClient } from './NavigationClient'

export async function Navigation() {
  const navData: Navigation = await getCachedGlobal('navigation', 1)()
  const siteSetting: SiteSetting = await getCachedGlobal('site-settings', 1)()

  if (typeof siteSetting.logo !== 'object' || !siteSetting.logo) return null
  const logo = siteSetting.logo as Media

  return <NavigationClient navData={navData} siteSetting={siteSetting} logo={logo} />
}
