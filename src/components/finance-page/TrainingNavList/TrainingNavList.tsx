import type { TrainingNavCard as TrainingNavCardType } from '@/payload-types'
import { TrainingNavCard } from './TrainingNavCard'

type Props = {
  cards: TrainingNavCardType[]
  heading: string
}

export function TrainingNavList({ cards, heading }: Props) {
  if (cards.length === 0) return null

  return (
    <section aria-labelledby="training-nav-heading">
      <h2 id="training-nav-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">{heading}</h2>
      <div className="mt-4 flex flex-col gap-3">
        {cards.map((card) => (
          <TrainingNavCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}
