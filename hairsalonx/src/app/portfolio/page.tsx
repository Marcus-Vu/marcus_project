import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Portfolio — HairsalonX | Kapper Roermond',
  description: 'Bekijk het werk van HairsalonX. Krullen, extensions, kleuren en meer. Volg ons op Instagram @hairsalonx.remunj.',
}

export default function PortfolioPage() {
  const portfolioImages = [
    { src: '/images/salon-interior.png', alt: 'HairsalonX interieur' },
    { src: '/images/hairstyle-curls.png', alt: 'Prachtige krullen' },
    { src: '/images/josje-portrait.png', alt: 'Josje aan het werk' },
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
            Een selectie van ons werk. Volg ons op Instagram voor de nieuwste creaties.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          {/* Portfolio grid with real images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioImages.map((img, i) => (
              <div key={i} className="aspect-square relative rounded-xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
            {/* Additional placeholders for future photos */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`placeholder-${i}`} className="aspect-square bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-300">
                <div className="text-center">
                  <span className="text-3xl block">📸</span>
                  <p className="text-xs mt-2">Foto {i + 4}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com/hairsalonx.remunj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              📸 Volg ons op Instagram
            </a>
            <p className="text-neutral-500 mt-4">@hairsalonx.remunj</p>
          </div>
        </div>
      </section>
    </div>
  )
}
