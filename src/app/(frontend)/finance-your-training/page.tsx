import type { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedTrainingNavCards } from '@/utilities/getTrainingNavCards'
import { getCachedFaqItems } from '@/utilities/getFaqItems'
import HeroBanner from '@/components/finance-page/HeroBanner'
import Breadcrumb from '@/components/finance-page/Breadcrumb'
import { TrainingNavList } from '@/components/finance-page/TrainingNavList/TrainingNavList'
import { RichTextBlock } from '@/components/finance-page/RichTextBlock'
import { CertificationBadges } from '@/components/finance-page/CertificationBadges'
import { FAQAccordion } from '@/components/finance-page/FAQAccordion/FAQAccordion'
import { BackToTopButton } from '@/components/ui/BackToTopButton'
import { buildBreadcrumbList, buildFAQSchema, safeJsonLd } from '@/lib/structured-data'
import { getServerSideURL } from '@/utilities/getURL'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCachedGlobal('finance-your-training-page', 1)()
  return {
    title: page.heroTitle,
    description: page.heroTitle,
    openGraph: { title: page.heroTitle },
  }
}

export default async function FinanceYourTrainingPage() {
  const [page, siteSetting, trainingNavCards, faqItems] = await Promise.all([
    getCachedGlobal('finance-your-training-page', 1)(),
    getCachedGlobal('site-settings', 1)(),
    getCachedTrainingNavCards(),
    getCachedFaqItems(),
  ])

  const breadcrumbJsonLd = buildBreadcrumbList({
    items: [
      { name: 'Home', url: `${getServerSideURL()}/` },
      { name: 'Finance your training' },
    ],
  })

  const faqSchema = buildFAQSchema(faqItems)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}
      <HeroBanner title={page.heroTitle} />
      <Breadcrumb homeUrl={siteSetting.homepageUrl} currentPageLabel="Finance your training" />

      <div className="container py-10 grid grid-cols-1 md:grid-cols-[28%_1fr] gap-12">
        {/* Left column — Training nav list */}
        <TrainingNavList
          cards={trainingNavCards}
          heading={page.trainingNavSectionHeading}
        />

        {/* Right column — Rich text blocks, badges, FAQ */}
        <div className="flex flex-col gap-10">
          {page.nikonTrainingExplained && (
            <RichTextBlock
              heading={page.nikonTrainingExplained.heading}
              body={page.nikonTrainingExplained.body as DefaultTypedEditorState}
            />
          )}
          {page.qualiopiDatadock && (
            <>
              <RichTextBlock
                heading={page.qualiopiDatadock.heading}
                body={page.qualiopiDatadock.body as DefaultTypedEditorState}
              />
              <CertificationBadges badges={page.certificationBadges} />
            </>
          )}
          {page.accompaniment && (
            <RichTextBlock
              heading={page.accompaniment.heading}
              body={page.accompaniment.body as DefaultTypedEditorState}
            />
          )}

          {/* FAQ Accordion — lives in right column per spec */}
          <FAQAccordion items={faqItems} />
        </div>
      </div>

      <BackToTopButton />
    </main>
  )
}
