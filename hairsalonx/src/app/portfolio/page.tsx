import type { Metadata } from 'next'
import Image from 'next/image'
import InstagramGallery from '@/components/InstagramGallery'

export const metadata: Metadata = {
  title: 'Portfolio — HairsalonX | Kapper Roermond',
  description: 'Bekijk het werk van HairsalonX. Krullen, extensions, kleuren en meer. Volg ons op Instagram @hairsalonx.remunj.',
}

export default function PortfolioPage() {
  const portfolioImages = [
    { src: '/images/salon-interior.jpg', alt: 'HairsalonX interieur' },
    { src: '/images/hairstyle-curls.jpg', alt: 'Prachtige krullen' },
    { src: '/images/josje-portrait.jpg', alt: 'Josje aan het werk' },
  ]

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
          {/* Portfolio images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {portfolioImages.map((img, i) => (
              <div key={i} className="aspect-square relative rounded-xl overflow-hidden hover-scale">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Instagram Gallery from Maestro */}
          <InstagramGallery />
        </div>
      </section>
    </div>
  )
}
