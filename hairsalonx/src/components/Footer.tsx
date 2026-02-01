import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
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
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Pagina&apos;s</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link href="/over" className="hover:text-primary-400 transition-colors">Over Josje</Link></li>
              <li><Link href="/behandelingen" className="hover:text-primary-400 transition-colors">Behandelingen</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact & Boeken</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:0627020236" className="hover:text-primary-400 transition-colors">
                  📞 06 2702 0236
                </a>
              </li>
              <li>
                <a href="mailto:info@hairsalonx.nl" className="hover:text-primary-400 transition-colors">
                  ✉️ info@hairsalonx.nl
                </a>
              </li>
              <li>
                <a href="https://instagram.com/hairsalonx.remunj" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                  📸 @hairsalonx.remunj
                </a>
              </li>
              <li className="text-neutral-400">📍 Roermond, Limburg</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-500 text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">
              Privacybeleid
            </Link>
            <span className="text-neutral-700">|</span>
            <Link href="/voorwaarden" className="hover:text-primary-400 transition-colors">
              Algemene Voorwaarden
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} HairsalonX. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
