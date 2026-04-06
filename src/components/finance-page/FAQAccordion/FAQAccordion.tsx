'use client'

import { useState } from 'react'
import type { FaqItem } from '@/payload-types'
import { RichTextRenderer } from '@/components/ui/RichTextRenderer'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface FAQAccordionProps {
  items: FaqItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set())

  // Draft records can have id: null — exclude them to keep aria-controls valid
  const validItems = items.filter((item): item is FaqItem & { id: number } => item.id != null)

  if (validItems.length === 0) return null

  const toggle = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="divide-y divide-gray-200 border-t border-gray-200">
      {validItems.map((item) => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              className="w-full flex justify-between items-center py-5 text-left text-base font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              <span>{item.question}</span>
              <svg
                className={`flex-shrink-0 ml-4 transition-transform duration-[250ms] ${isOpen ? 'rotate-180' : ''}`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {/* inert blocks all focus/interaction inside collapsed panel — removes need for aria-hidden */}
            <div
              id={`faq-answer-${item.id}`}
              inert={!isOpen || undefined}
              className="transition-all duration-[250ms] ease-in-out"
              style={{ maxHeight: isOpen ? '5000px' : '0', overflow: 'hidden' }}
            >
              <div className="pb-5 text-gray-600 leading-relaxed space-y-3 [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mt-2 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:py-0.5 [&_li]:before:content-['■'] [&_li]:before:text-yellow-400 [&_li]:before:text-xs [&_li]:before:mt-1.5 [&_li]:before:flex-shrink-0">
                <RichTextRenderer data={item.answer as DefaultTypedEditorState} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
