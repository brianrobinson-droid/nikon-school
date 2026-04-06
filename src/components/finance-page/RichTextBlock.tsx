import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichTextRenderer } from '@/components/ui/RichTextRenderer'

interface RichTextBlockProps {
  heading: string
  body: DefaultTypedEditorState
}

export function RichTextBlock({ heading, body }: RichTextBlockProps) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">{heading}</h2>
      <div className="prose prose-gray max-w-none prose-p:text-[#444] prose-p:leading-relaxed prose-p:text-sm prose-headings:text-gray-900">
        <RichTextRenderer data={body} />
      </div>
    </div>
  )
}
