import Image from 'next/image'
import type { FinanceYourTrainingPage, Media } from '@/payload-types'

interface CertificationBadgesProps {
  badges: FinanceYourTrainingPage['certificationBadges']
}

export function CertificationBadges({ badges }: CertificationBadgesProps) {
  if (!badges || badges.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-4">
      {badges.map((badge) => {
        if (typeof badge.image !== 'object' || !badge.image) return null
        const image = badge.image as Media
        const content = (
          <Image
            src={image.url!}
            width={image.width!}
            height={image.height!}
            alt={badge.altText}
          />
        )
        if (badge.url) {
          return (
            <a key={badge.id} href={badge.url} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          )
        }
        return <div key={badge.id}>{content}</div>
      })}
    </div>
  )
}
