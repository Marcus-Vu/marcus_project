import Link from 'next/link'
import type { Metadata } from 'next'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Behandelingen & Prijzen — HairsalonX | Kapper Roermond',
  description: 'Bekijk alle behandelingen en prijzen van HairsalonX in Roermond. Knippen, kleuren, krullen, extensions en meer.',
}

const phone = '31627020236'

const getWhatsAppLink = (service: string) => {
  const message = encodeURIComponent(`Hoi! Ik wil graag een afspraak maken voor: ${service}`)
  return `https://wa.me/${phone}?text=${message}`
}

const categories = [
  {
    name: 'Knippen',
    icon: '✂️',
    items: [
      { name: 'Knippen dames', price: 'Vanaf €35', desc: 'Wassen, knippen, stylen' },
      { name: 'Knippen heren', price: 'Vanaf €25', desc: 'Wassen, knippen, stylen' },
      { name: 'Knippen kinderen', price: 'Vanaf €18', desc: 'Tot 12 jaar' },
      { name: 'Pony knippen', price: '€10', desc: 'Alleen pony bijknippen' },
    ],
  },
  {
    name: 'Kleuren',
    icon: '🎨',
    items: [
      { name: 'Full color', price: 'Vanaf €55', desc: 'Volledige kleurbehandeling' },
      { name: 'Highlights / Lowlights', price: 'Vanaf €65', desc: 'Folies of balayage' },
      { name: 'Balayage', price: 'Vanaf €85', desc: 'Natuurlijke kleurovergang' },
      { name: 'Uitgroei bijwerken', price: 'Vanaf €45', desc: 'Uitgroei kleurbehandeling' },
    ],
  },
  {
    name: 'Krullen',
    icon: '🌀',
    items: [
      { name: 'Curly cut', price: 'Vanaf €45', desc: 'Droog knippen op krulpatroon' },
      { name: 'Curl defining behandeling', price: 'Vanaf €35', desc: 'Krullen definiëren en versterken' },
      { name: 'Deep conditioning', price: 'Vanaf €25', desc: 'Intensieve vochtbehandeling' },
    ],
  },
  {
    name: 'Extensions',
    icon: '💫',
    items: [
      { name: 'Tape extensions', price: 'Op aanvraag', desc: 'Plaatsen of vervangen' },
      { name: 'Micro ring extensions', price: 'Op aanvraag', desc: 'Plaatsen of vervangen' },
      { name: 'Extensions onderhoud', price: 'Op aanvraag', desc: 'Terugplaatsen of bijwerken' },
    ],
  },
]

export default function BehandelingenPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
        <div className="container-narrow mx-auto text-center">
          <p className="text-gold font-display italic text-lg mb-2">Wat we doen</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Behandelingen & Prijzen
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Alle prijzen zijn indicatief. De exacte prijs bespreken we graag persoonlijk, zodat we precies aansluiten bij jouw wensen.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto space-y-16">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900">{cat.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex flex-col p-6 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-neutral-900">{item.name}</h3>
                        <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>
                      </div>
                      <span className="font-display font-bold text-primary-600 whitespace-nowrap ml-4">{item.price}</span>
                    </div>
                    <a
                      href={getWhatsAppLink(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium mt-auto pt-3 border-t border-neutral-200 group-hover:border-primary-200 transition-colors"
                      aria-label={`Boek ${item.name} via WhatsApp`}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Boek via WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-primary-500 text-white text-center">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold mb-4">Interesse?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Neem contact op voor een persoonlijk adviesgesprek of boek direct je afspraak.
          </p>
          <Link href="/contact" className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-full hover:bg-neutral-100 transition-all shadow-lg">
            Boek je afspraak
          </Link>
        </div>
      </section>
    </div>
  )
}
