import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer, SiteSetting, Media } from '@/payload-types'
import { FooterBreadcrumb } from './FooterBreadcrumb'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  pinterest: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  ),
  tiktok: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
    </svg>
  ),
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 0)()
  const siteSetting: SiteSetting = await getCachedGlobal('site-settings', 1)()

  const logo = typeof siteSetting.logo === 'object' && siteSetting.logo
    ? siteSetting.logo as Media
    : null

  const visibleSocial = footerData.socialMedia?.filter((item) => item.show === true) ?? []

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-10">

        {/* Top row: logo + social icons */}
        <div className="flex items-center justify-between mb-4">
          <Link href={siteSetting.homepageUrl ?? '/'}>
            {logo ? (
              <Image
                src={logo.url!}
                width={logo.width ?? 80}
                height={logo.height ?? 27}
                alt={logo.alt ?? 'Nikon'}
                className="h-7 w-auto"
              />
            ) : (
              <Image src="/nikon-logo.svg" width={80} height={27} alt="Nikon" className="h-7 w-auto" />
            )}
          </Link>
          {visibleSocial.length > 0 && (
            <div className="flex items-center gap-4">
              {visibleSocial.map((item) => (
                <a
                  key={item.id ?? item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.platform}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {SOCIAL_ICONS[item.platform] ?? item.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Breadcrumb + Find a retailer */}
        <div className="flex items-start justify-between mb-8">
          <FooterBreadcrumb homeUrl={siteSetting.homepageUrl ?? '/'} />
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-medium text-gray-300">Find a retailer</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Please enter"
                aria-label="Postcode"
                className="px-3 py-1.5 rounded text-gray-900 text-sm w-36 bg-white"
              />
              <button type="button" className="px-4 py-1.5 bg-yellow-400 text-gray-900 rounded text-sm font-semibold hover:bg-yellow-300 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Link columns */}
        {footerData.columns && footerData.columns.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
            {footerData.columns.map((column) => (
              <div key={column.id ?? column.heading}>
                {column.heading && (
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                    {column.heading}
                  </h3>
                )}
                {column.links && column.links.length > 0 && (
                  <ul className="space-y-2 list-none m-0 p-0">
                    {column.links.map((link) => (
                      <li key={link.id ?? link.url}>
                        <Link href={link.url} className="text-sm text-gray-400 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Legal bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-gray-500">
          <p>{footerData.copyrightText}</p>
          {footerData.legalLinks && footerData.legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-4 list-none m-0 p-0">
              {footerData.legalLinks.map((link) => (
                <li key={link.id ?? link.url}>
                  <Link href={link.url} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </footer>
  )
}
