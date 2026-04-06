'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PAGE_LABELS: Record<string, string> = {
  '/finance-your-training': 'Finance your training',
}

interface FooterBreadcrumbProps {
  homeUrl: string
}

export function FooterBreadcrumb({ homeUrl }: FooterBreadcrumbProps) {
  const pathname = usePathname()
  const label = PAGE_LABELS[pathname]
  if (!label) return null

  return (
    <nav aria-label="Site breadcrumb" className="mb-8 text-sm text-gray-400">
      <ol className="flex items-center list-none m-0 p-0">
        <li>
          <Link href={homeUrl} className="hover:underline">
            Home
          </Link>
        </li>
        <li aria-current="page" className="flex items-center gap-2 before:content-['>'] before:mx-2">
          {label}
        </li>
      </ol>
    </nav>
  )
}
