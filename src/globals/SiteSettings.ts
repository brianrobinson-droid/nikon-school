import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Global branding — site logo and homepage URL.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Site Logo',
    },
    {
      name: 'homepageUrl',
      type: 'text',
      required: true,
      defaultValue: '/',
      label: 'Homepage URL',
      admin: {
        description: 'Destination URL when the logo is clicked (e.g. /)',
      },
    },
  ],
}
