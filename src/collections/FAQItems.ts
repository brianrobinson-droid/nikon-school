import type { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  UnorderedListFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { revalidateFinancePageCollection, revalidateFinancePageOnDelete } from '@/lib/revalidate'

export const FAQItems: CollectionConfig = {
  slug: 'faq-items',
  orderable: true,
  admin: {
    useAsTitle: 'question',
    description: 'FAQ accordion items for the Finance Your Training page.',
    defaultColumns: ['question', 'updatedAt'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      label: 'Answer',
      editor: lexicalEditor({
        // External links only — FAQ answers link to external resources, not internal pages.
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UnorderedListFeature(),
          LinkFeature({ enabledCollections: [] }),
        ],
      }),
    },
  ],
  hooks: {
    afterChange: [revalidateFinancePageCollection],
    afterDelete: [revalidateFinancePageOnDelete],
  },
}
