import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CookieConsent from '@/components/CookieConsent'
import StructuredData from '@/components/StructuredData'
import ErrorBoundary from '@/components/ErrorBoundary'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  weight: ['300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'HairsalonX — Haar zoals je het nog niet kende | Kapper Roermond',
  description: 'Bij HairsalonX in Roermond draait alles om jou. Krullen specialist, extensions expert, persoonlijke aandacht. Boek nu je afspraak!',
  keywords: 'kapper Roermond, krullenkapper, extensions Roermond, HairsalonX, kapsalon Roermond, Josje',
  openGraph: {
    title: 'HairsalonX — Haar zoals je het nog niet kende',
    description: 'Kapper in Roermond. Krullen specialist & extensions expert. Persoonlijke aandacht in een warme sfeer.',
    url: 'https://hairsalonx.nl',
    siteName: 'HairsalonX',
    locale: 'nl_NL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <StructuredData />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Sla navigatie over en ga naar content
        </a>
        <Navbar />
        <ErrorBoundary>
          <main id="main-content" tabIndex={-1}>{children}</main>
        </ErrorBoundary>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  )
}
