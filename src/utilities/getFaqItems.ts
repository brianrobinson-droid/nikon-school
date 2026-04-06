import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { FaqItem } from '@/payload-types'

async function getFaqItems() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'faq-items',
    limit: 0,
    pagination: false,
    sort: '_order',
  })
  return docs as FaqItem[]
}

export const getCachedFaqItems = unstable_cache(
  async () => getFaqItems(),
  ['faq-items'],
  { tags: ['faq-items'] },
)
