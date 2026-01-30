import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

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
    <html lang="nl">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
