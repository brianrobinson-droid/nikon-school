import type { CollectionConfig } from 'payload'
import { revalidateFinancePageCollection, revalidateFinancePageOnDelete } from '@/lib/revalidate'

export const TrainingNavCards: CollectionConfig = {
  slug: 'training-nav-cards',
  orderable: true,
  admin: {
    useAsTitle: 'title',
    description: 'Training category navigation cards displayed on the Finance Your Training page.',
    defaultColumns: ['title', 'description', 'url', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Card Title',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: 'Card Description',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Destination URL',
    },
  ],
  hooks: {
    afterChange: [revalidateFinancePageCollection],
    afterDelete: [revalidateFinancePageOnDelete],
  },
}
