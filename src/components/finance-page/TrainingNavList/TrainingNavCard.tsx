import Link from 'next/link'
import type { TrainingNavCard } from '@/payload-types'

type Props = {
  card: TrainingNavCard
}

export function TrainingNavCard({ card }: Props) {
  return (
    <Link
      href={card.url}
      className="group flex items-center justify-between gap-4 border border-gray-200 p-4 no-underline hover:border-gray-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 text-sm">{card.title}</p>
        <p className="mt-1 text-xs text-gray-500 leading-snug">{card.description}</p>
      </div>
      <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-150 ease-out">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  )
}
