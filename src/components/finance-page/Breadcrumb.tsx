// Server Component — no 'use client'
import Link from 'next/link'

interface BreadcrumbProps {
  homeUrl: string
  currentPageLabel: string
}

export default function Breadcrumb({ homeUrl, currentPageLabel }: BreadcrumbProps) {
  return (
    <nav aria-label="Page breadcrumb" className="border-b border-gray-200 bg-white">
      <div className="container py-2">
        <ol className="flex items-center gap-1.5 list-none m-0 p-0 text-xs text-gray-500">
          <li>
            <Link href={homeUrl} className="hover:text-gray-800 transition-colors">Home</Link>
          </li>
          <li className="flex items-center gap-1.5 before:content-['>'] before:text-gray-300">
            <span aria-current="page">{currentPageLabel}</span>
          </li>
        </ol>
      </div>
    </nav>
  )
}
