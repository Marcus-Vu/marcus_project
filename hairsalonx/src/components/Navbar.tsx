'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/over', label: 'Over Josje' },
  { href: '/behandelingen', label: 'Behandelingen' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm" role="navigation" aria-label="Hoofdnavigatie">
      <div className="container-narrow mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link href="/" className="font-display text-2xl font-bold text-primary-600" aria-label="HairsalonX - Ga naar home">
          HairsalonX
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-600 hover:text-primary-500 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm py-2 px-6">
            Boek nu
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Sluit menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-0.5 bg-neutral-800 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} aria-hidden="true" />
          <span className={`block w-6 h-0.5 bg-neutral-800 transition-opacity ${isOpen ? 'opacity-0' : ''}`} aria-hidden="true" />
          <span className={`block w-6 h-0.5 bg-neutral-800 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-neutral-100 px-4 pb-6" role="menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-neutral-600 hover:text-primary-500 font-medium border-b border-neutral-50"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm py-2 px-6 mt-4 block text-center">
            Boek nu
          </Link>
        </div>
      )}
    </nav>
  )
}
