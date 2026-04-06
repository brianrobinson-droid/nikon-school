import type { FaqItem } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface BreadcrumbListInput {
  items: { name: string; url?: string }[]
}

export function buildBreadcrumbList({ items }: BreadcrumbListInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

function lexicalToPlainText(state: DefaultTypedEditorState | null | undefined): string {
  if (!state?.root) return ''
  const BLOCK_TYPES = new Set(['paragraph', 'heading', 'listitem', 'quote'])
  function extract(node: Record<string, unknown>): string {
    if (node.type === 'text') return (node.text as string) ?? ''
    if (Array.isArray(node.children)) {
      const text = (node.children as Record<string, unknown>[]).map(extract).join('')
      // Append a space after block-level nodes so sibling paragraphs don't run together
      return BLOCK_TYPES.has(node.type as string) ? text + ' ' : text
    }
    return ''
  }
  return extract(state.root as Record<string, unknown>).replace(/\s+/g, ' ').trim()
}

export function buildFAQSchema(items: FaqItem[]): object | null {
  if (items.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: lexicalToPlainText(item.answer as DefaultTypedEditorState | null | undefined),
      },
    })),
  }
}

export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/<\/script>/gi, '<\\/script>')
}
