import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  UnorderedListFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { revalidateFinancePage } from '@/lib/revalidate'

// External links only — these rich text fields link to external resources and certification bodies.
// Internal page/post linking is not required for this content type.
const richTextField = (name: string, label: string) => ({
  name,
  type: 'richText' as const,
  required: true,
  label,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      UnorderedListFeature(),
      LinkFeature({ enabledCollections: [] }),
    ],
  }),
})

export const FinanceYourTrainingPage: GlobalConfig = {
  slug: 'finance-your-training-page',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'All content for the Finance Your Training page — hero, rich text blocks, badges, phone, contact URL.',
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      label: 'Hero Title',
    },
    {
      name: 'trainingNavSectionHeading',
      type: 'text',
      required: true,
      defaultValue: 'Training we offer',
      label: 'Training Navigation Section Heading',
    },
    {
      name: 'nikonTrainingExplained',
      type: 'group',
      label: 'Nikon Training Explained Block',
      fields: [
        { name: 'heading', type: 'text', required: true },
        richTextField('body', 'Body'),
      ],
    },
    {
      name: 'qualiopiDatadock',
      type: 'group',
      label: 'Qualiopi / Datadock Block',
      fields: [
        { name: 'heading', type: 'text', required: true },
        richTextField('body', 'Body'),
      ],
    },
    {
      name: 'accompaniment',
      type: 'group',
      label: 'Accompaniment Block',
      fields: [
        { name: 'heading', type: 'text', required: true },
        richTextField('body', 'Body'),
      ],
    },
    {
      name: 'certificationBadges',
      type: 'array',
      label: 'Certification Badges',
      maxRows: 2,
      admin: {
        description:
          'Qualiopi and Datadock badges. Maximum 2. If URL is set, the badge becomes a clickable link.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Badge Image',
        },
        {
          name: 'altText',
          type: 'text',
          required: true,
          label: 'Alt Text',
        },
        {
          name: 'url',
          type: 'text',
          required: false,
          label: 'Destination URL (optional)',
          admin: {
            description: 'If set, the badge image becomes a link to this URL (opens in new tab).',
          },
        },
      ],
    },
    {
      name: 'advisorContact',
      type: 'group',
      label: 'Advisor Contact Section',
      fields: [
        {
          name: 'sectionHeading',
          type: 'text',
          required: true,
          label: 'Section Heading',
          defaultValue: 'Contact our pedagogical advisor',
        },
        {
          name: 'contactFormLabel',
          type: 'text',
          required: true,
          label: 'Contact Form Link Label',
          defaultValue: 'Complete our contact form',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          required: true,
          label: 'Phone Label',
          defaultValue: 'Phone:',
        },
        {
          name: 'phoneNumber',
          type: 'text',
          required: true,
          label: 'Advisor Phone Number',
          admin: {
            description:
              'Used as the tel: link target on mobile. Include country code (e.g. +33 1 23 45 67 89).',
          },
        },
        {
          name: 'contactFormUrl',
          type: 'text',
          required: true,
          label: 'Contact Form URL',
          admin: {
            description:
              'External URL for the pedagogical advisor contact form (opens in new tab).',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFinancePage],
  },
}
