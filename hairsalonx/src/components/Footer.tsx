import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo" aria-label="Footer">
      <div className="container-narrow mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">HairsalonX</h3>
            <p className="text-neutral-400 leading-relaxed">
              Haar zoals je het nog niet kende. Persoonlijke aandacht in een warme, ontspannen sfeer in Roermond.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigatie">
            <h4 className="font-display text-lg font-semibold text-white mb-4">Pagina&apos;s</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded">Home</Link></li>
              <li><Link href="/over" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded">Over Josje</Link></li>
              <li><Link href="/behandelingen" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded">Behandelingen</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded">Contact & Boeken</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Contact</h4>
            <address className="not-italic">
              <ul className="space-y-2">
                <li>
                  <a href="tel:0627020236" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded" aria-label="Bel ons: 06 2702 0236">
                    📞 06 2702 0236
                  </a>
                </li>
                <li>
                  <a href="mailto:info@hairsalonx.nl" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded" aria-label="E-mail ons: info@hairsalonx.nl">
                    ✉️ info@hairsalonx.nl
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/hairsalonx.remunj" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded" aria-label="Volg ons op Instagram (opent in nieuw tabblad)">
                    📸 @hairsalonx.remunj
                  </a>
                </li>
                <li className="text-neutral-400" aria-label="Locatie">📍 Roermond, Limburg</li>
              </ul>
            </address>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-500 text-sm">
          <nav aria-label="Juridische links" className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded px-2">
              Privacybeleid
            </Link>
            <span className="text-neutral-700" aria-hidden="true">|</span>
            <Link href="/voorwaarden" className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded px-2">
              Algemene Voorwaarden
            </Link>
          </nav>
          <p>&copy; {new Date().getFullYear()} HairsalonX. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
