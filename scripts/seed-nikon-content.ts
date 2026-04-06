/**
 * NIkon — Seed test content for Epic 2 globals and collections
 *
 * Run with: cd nikon-school && pnpm tsx scripts/seed-nikon-content.ts
 *
 * Populates: Navigation, SiteSettings, Footer, FinanceYourTrainingPage globals
 *            + TrainingNavCards and FAQItems collections
 *
 * Safe to re-run — globals are updated (upsert), collections are cleared then re-seeded.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Minimal Lexical paragraph node factory
function para(text: string) {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text,
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function richText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map(para),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

function richTextWithList(before: string[], bullets: string[], after: string[]) {
  return {
    root: {
      type: 'root',
      children: [
        ...before.map(para),
        {
          type: 'list',
          tag: 'ul',
          listType: 'bullet',
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          children: bullets.map((text, i) => ({
            type: 'listitem',
            value: i + 1,
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
            children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
          })),
        },
        ...after.map(para),
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  // ─── Logo image ────────────────────────────────────────────────────────────
  // Upload a simple 1×1 placeholder PNG so SiteSettings logo field is satisfied.
  // Replace with the real Nikon logo before production.
  console.log('Uploading placeholder logo...')

  // 1×1 transparent PNG (base64)
  const pngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  const pngBuffer = Buffer.from(pngBase64, 'base64')

  // Reuse existing placeholder if present, otherwise create
  const existingLogos = await payload.find({
    collection: 'media',
    where: { filename: { equals: 'nikon-logo-placeholder.png' } },
    limit: 1,
  })

  const logoMedia =
    existingLogos.docs.length > 0
      ? existingLogos.docs[0]
      : await payload.create({
          collection: 'media',
          data: { alt: 'Nikon logo' },
          file: {
            data: pngBuffer,
            mimetype: 'image/png',
            name: 'nikon-logo-placeholder.png',
            size: pngBuffer.byteLength,
          },
        })
  console.log(`  Logo media id: ${logoMedia.id}`)

  // ─── SiteSettings global ───────────────────────────────────────────────────
  console.log('Seeding site-settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      logo: logoMedia.id,
      homepageUrl: '/',
    },
    context: { disableRevalidate: true },
  })

  // ─── Navigation global ─────────────────────────────────────────────────────
  console.log('Seeding navigation...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      navItems: [
        { label: 'Products', url: '/products' },
        { label: 'Offers', url: '/offers' },
        { label: 'Learn & Explore', url: '/learn' },
        { label: 'Help & Support', url: '/support' },
      ],
      countrySelector: {
        label: 'UK',
        url: '/country-selector',
      },
      utilityBar: [
        { label: 'My Account', url: '/account' },
        { label: 'Search', url: '/search' },
        { label: 'Basket', url: '/basket' },
      ],
    },
    context: { disableRevalidate: true },
  })

  // ─── Footer global ─────────────────────────────────────────────────────────
  console.log('Seeding footer...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          heading: 'Products',
          links: [
            { label: 'Cameras', url: '/cameras' },
            { label: 'Lenses', url: '/lenses' },
            { label: 'Accessories', url: '/accessories' },
            { label: 'Sport optics', url: '/sport-optics' },
            { label: 'Apps & software', url: '/apps' },
            { label: 'Offers & promotions', url: '/offers' },
          ],
        },
        {
          heading: 'Inspiration',
          links: [
            { label: 'Nikon blog', url: '/blog' },
            { label: '#CreatorYourLight', url: '/creator-your-light' },
            { label: 'Ambassadors', url: '/ambassadors' },
          ],
        },
        {
          heading: 'Help & support',
          links: [
            { label: 'Support & FAQs', url: '/support' },
            { label: 'Store finder', url: '/store-finder' },
            { label: 'Product registration', url: '/register' },
            { label: 'Contact us', url: '/contact' },
          ],
        },
        {
          heading: 'Company',
          links: [
            { label: 'Press', url: '/press' },
            { label: 'Nikon partnerships', url: '/partnerships' },
            { label: 'Charity', url: '/charity' },
            { label: 'Modern Slavery Act Statement', url: '/modern-slavery' },
            { label: 'UK tax strategy', url: '/tax-strategy' },
          ],
        },
        {
          heading: 'News & events',
          links: [
            { label: 'News', url: '/news' },
            { label: 'Latest products', url: '/new-products' },
            { label: 'Events', url: '/events' },
          ],
        },
      ],
      socialMedia: [
        { platform: 'facebook', url: 'https://facebook.com/nikon', show: true },
        { platform: 'twitter', url: 'https://twitter.com/nikon', show: true },
        { platform: 'instagram', url: 'https://instagram.com/nikon', show: true },
        { platform: 'pinterest', url: 'https://pinterest.com/nikon', show: true },
        { platform: 'tiktok', url: 'https://tiktok.com/@nikon', show: false },
      ],
      copyrightText: '© Copyright 2025 Nikon. All rights reserved.',
      legalLinks: [
        { label: 'Privacy Notice', url: '/privacy' },
        { label: 'Terms of Use', url: '/terms' },
        { label: 'Cookie Policy', url: '/cookies' },
      ],
    },
    context: { disableRevalidate: true },
  })

  // ─── FinanceYourTrainingPage global ────────────────────────────────────────
  console.log('Seeding finance-your-training-page...')
  await payload.updateGlobal({
    slug: 'finance-your-training-page',
    data: {
      heroTitle: 'Finance your training',
      trainingNavSectionHeading: 'Training we offer',
      nikonTrainingExplained: {
        heading: 'Nikon Training Explained',
        body: richText(
          'The Nikon School, Nikon France SAS training organisation, is registered under number 11940276594 with the prefect of the Île-de-France region.',
          'Our instructors are practising photographers with years of real-world experience. Every course is hands-on and built around the Nikon ecosystem, ensuring you get the most from your equipment.',
        ),
      },
      qualiopiDatadock: {
        heading: 'Qualiopi and Datadock Certification',
        body: richText(
          'The Nikon School is an approved professional training centre, registered under n° 11 94 0766 94 since 2003 and registered in the Datadock register. This registration does not constitute State approval.',
          'In addition, to certify the quality of our professional training actions, Nikon called on AFNOR Certification, and obtained the RNS certification – National Quality Reference System, also called Qualiopi Certification.',
        ),
      },
      accompaniment: {
        heading: 'Accompaniment',
        body: richText(
          'For a personalised and free audit of your training projects, do not hesitate to fill out the contact form or call us on 09 69 32 03 44 (non-surcharged call). Our pedagogical team will establish a personalised training course with you, taking into account your initial level and the objective to be achieved. She will also assist you in putting together your financing file.',
          'Several types of financing are possible, depending on your funding organisations. For example, for author photographers, the funding organisation is AFDAS.',
        ),
      },
      advisorContact: {
        sectionHeading: 'Contact our pedagogical advisor',
        contactFormLabel: 'Complete our contact form',
        phoneLabel: 'Phone:',
        phoneNumber: '09 69 32 03 44',
        contactFormUrl: 'https://www.nikon.fr/fr_FR/product/nikon-school/contact.html',
      },
    },
    context: { disableRevalidate: true },
  })

  // ─── TrainingNavCards collection ───────────────────────────────────────────
  console.log('Seeding training-nav-cards...')
  const existingCards = await payload.find({
    collection: 'training-nav-cards',
    limit: 100,
  })
  await Promise.all(
    existingCards.docs.map((doc) => payload.delete({ collection: 'training-nav-cards', id: doc.id, context: { disableRevalidate: true } })),
  )

  await Promise.all([
    payload.create({
      collection: 'training-nav-cards',
      data: {
        title: 'Shooting',
        description: 'Improve your technique with hands-on shooting courses covering composition, exposure and light in real-world environments.',
        url: '/courses/shooting',
      },
      context: { disableRevalidate: true },
    }),
    payload.create({
      collection: 'training-nav-cards',
      data: {
        title: 'Workshops',
        description: 'Intensive workshops led by professional photographers at our Paris and Lyon studios.',
        url: '/courses/workshops',
      },
      context: { disableRevalidate: true },
    }),
    payload.create({
      collection: 'training-nav-cards',
      data: {
        title: 'Videos',
        description: 'Master video production with your Nikon camera, from in-camera settings to post-production.',
        url: '/courses/videos',
      },
      context: { disableRevalidate: true },
    }),
  ])

  // ─── FAQItems collection ────────────────────────────────────────────────────
  console.log('Seeding faq-items...')
  const existingFaqs = await payload.find({
    collection: 'faq-items',
    limit: 100,
  })
  await Promise.all(
    existingFaqs.docs.map((doc) => payload.delete({ collection: 'faq-items', id: doc.id, context: { disableRevalidate: true } })),
  )

  await Promise.all([
    payload.create({
      collection: 'faq-items',
      data: {
        question: 'When do you run courses and seminars?',
        answer: richText(
          'Nikon School runs courses and seminars throughout the year. Our schedule is updated regularly and you can view all upcoming dates on our course catalogue.',
          'Most courses run on weekdays, with selected weekend sessions available for working professionals. Contact our team to be notified when new dates are released.',
        ),
      },
      context: { disableRevalidate: true },
    }),
    payload.create({
      collection: 'faq-items',
      data: {
        question: 'How do I ascertain if a training course is suitable for me?',
        answer: richTextWithList(
          ['Each course page lists the recommended skill level and prerequisites. As a general guide:'],
          [
            'Beginner courses assume no prior photography knowledge',
            'Intermediate courses require a working understanding of manual camera controls',
            'Advanced courses are designed for experienced photographers looking to specialise',
            'All participants receive a full course outline before booking',
          ],
          ['If you are unsure which course is right for you, our pedagogical advisors are available to discuss your level and objectives and recommend the most suitable option.'],
        ),
      },
      context: { disableRevalidate: true },
    }),
    payload.create({
      collection: 'faq-items',
      data: {
        question: 'How many delegates are there on each course?',
        answer: richText(
          'To ensure a high-quality learning experience, our courses are intentionally kept small. Most shooting and workshop courses are limited to 8–12 participants.',
          'Smaller group sizes allow instructors to provide individual feedback and adapt the session to the specific needs and questions of each participant.',
        ),
      },
      context: { disableRevalidate: true },
    }),
    payload.create({
      collection: 'faq-items',
      data: {
        question: 'Can you tell me more about the course content?',
        answer: richText(
          'Full course outlines are available on each individual course page, including learning objectives, session structure, and what equipment to bring.',
          'Our courses combine theory with hands-on practical sessions. You will leave with edited images or footage from the day, feedback from your instructor, and access to supporting resources.',
        ),
      },
      context: { disableRevalidate: true },
    }),
  ])

  console.log('\n✅ NIkon test content seeded successfully.')
  console.log('   Globals:     navigation, site-settings, footer, finance-your-training-page')
  console.log('   Collections: training-nav-cards (4 cards), faq-items (5 items)')
  console.log('\n   Note: Logo is a 1×1 placeholder. Replace via /admin/collections/media.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
