'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import type { Navigation, SiteSetting, Media } from '@/payload-types'

interface NavigationClientProps {
  navData: Navigation
  siteSetting: SiteSetting
  logo: Media
}

export function NavigationClient({ navData, siteSetting, logo }: NavigationClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on outside click
  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [menuOpen])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const utilityItems = navData.utilityBar?.filter((item) => {
    const icon = typeof item.icon === 'object' && item.icon ? (item.icon as Media) : null
    return !!icon?.url
  }) ?? []

  return (
    <header ref={headerRef} className={`sticky top-0 z-50 bg-[#1a1a1a] ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container flex items-center justify-between gap-6 py-2.5">

        {/* Logo */}
        <Link href={siteSetting.homepageUrl ?? '/'} className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src={logo.url!}
            width={logo.width!}
            height={logo.height!}
            alt={logo.alt ?? 'Nikon'}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop: Main nav items */}
        <nav aria-label="Main navigation" className="hidden md:flex flex-1">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {navData.navItems?.map((item) => (
              <li key={item.id ?? item.url}>
                <Link
                  href={item.url}
                  className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop: Utility bar */}
        <div className="hidden md:flex items-center gap-4 text-xs text-gray-400">
          {navData.countrySelector?.url && (
            <Link href={navData.countrySelector.url} className="hover:text-white transition-colors">
              {navData.countrySelector.label ?? 'UK'} +
            </Link>
          )}
          {utilityItems.map((item) => {
            const icon = item.icon as Media
            return (
              <Link
                key={item.id ?? item.url}
                href={item.url}
                aria-label={item.label}
                className="hover:opacity-75 transition-opacity"
              >
                <Image
                  src={icon.url!}
                  width={icon.width ?? 20}
                  height={icon.height ?? 20}
                  alt=""
                  className="h-5 w-auto"
                />
              </Link>
            )
          })}
        </div>

        {/* Mobile: Hamburger button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 flex-shrink-0"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation" className="bg-[#1a1a1a] border-t border-white/10 px-4 pb-6 pt-4">
          <ul className="list-none m-0 p-0 flex flex-col gap-0">
            {navData.navItems?.map((item) => (
              <li key={item.id ?? item.url}>
                <Link
                  href={item.url}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base text-gray-300 hover:text-white transition-colors border-b border-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Utility items in mobile drawer */}
          {(navData.countrySelector?.url || utilityItems.length > 0) && (
            <div className="flex items-center gap-5 mt-5 text-xs text-gray-400">
              {navData.countrySelector?.url && (
                <Link
                  href={navData.countrySelector.url}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  {navData.countrySelector.label ?? 'UK'} +
                </Link>
              )}
              {utilityItems.map((item) => {
                const icon = item.icon as Media
                return (
                  <Link
                    key={item.id ?? item.url}
                    href={item.url}
                    aria-label={item.label}
                    onClick={() => setMenuOpen(false)}
                    className="hover:opacity-75 transition-opacity"
                  >
                    <Image
                      src={icon.url!}
                      width={icon.width ?? 20}
                      height={icon.height ?? 20}
                      alt=""
                      className="h-5 w-auto"
                    />
                  </Link>
                )
              })}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
