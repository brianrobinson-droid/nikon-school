import { RichText } from '@payloadcms/richtext-lexical/react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface RichTextRendererProps {
  data: DefaultTypedEditorState
}

export function RichTextRenderer({ data }: RichTextRendererProps) {
  return <RichText data={data} />
}
