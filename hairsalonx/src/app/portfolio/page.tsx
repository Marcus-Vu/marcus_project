import type { Metadata } from 'next'
import InstagramGallery from '@/components/InstagramGallery'

export const metadata: Metadata = {
  title: 'Portfolio — HairsalonX | Kapper Roermond',
  description: 'Bekijk het werk van HairsalonX. Krullen, extensions, kleuren en meer. Volg ons op Instagram @hairsalonx.remunj.',
}

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
        <div className="container-narrow mx-auto text-center">
          <p className="text-gold font-display italic text-lg mb-2">Ons werk</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Portfolio
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Een selectie van ons werk. Van krullen tot extensions, van kleuren tot styling — 
            bekijk onze creaties en laat je inspireren.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <InstagramGallery />
        </div>
      </section>
    </div>
  )
}
