import type { GlobalConfig } from 'payload'
import { revalidateNavigation } from '@/lib/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Global navigation — main nav items, country selector, utility bar (account/search/basket).',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'countrySelector',
      type: 'group',
      label: 'Country Selector',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'utilityBar',
      type: 'array',
      label: 'Utility Bar Items',
      admin: {
        description: 'Account, Search, Basket icons — in display order. Upload an icon image and set the destination URL for each.',
      },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'Used as the accessible aria-label (not displayed).' } },
        { name: 'url', type: 'text', required: true },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Icon image displayed in the utility bar.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateNavigation],
  },
}
