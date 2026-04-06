import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { TrainingNavCard } from '@/payload-types'

async function getTrainingNavCards() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'training-nav-cards',
    limit: 0,
    pagination: false,
    sort: '_order',
  })
  return docs as TrainingNavCard[]
}

export const getCachedTrainingNavCards = unstable_cache(
  async () => getTrainingNavCards(),
  ['training-nav-cards'],
  { tags: ['training-nav-cards'] },
)
