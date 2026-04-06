import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { revalidateFinancePage } from '@/lib/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      maxRows: 6,
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Column Heading',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          maxRows: 10,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'array',
      label: 'Social Media',
      maxRows: 5,
      admin: {
        description: 'Set show to false to hide a platform without deleting its URL.',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        { name: 'url', type: 'text', required: true },
        { name: 'show', type: 'checkbox', defaultValue: true, label: 'Show' },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      label: 'Copyright Text',
      admin: {
        description: 'e.g. © 2025 Nikon School. All rights reserved.',
      },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      maxRows: 3,
      admin: {
        description: 'Privacy Notice, Terms of Use, Cookie Policy — in display order.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter, revalidateFinancePage],
  },
}
