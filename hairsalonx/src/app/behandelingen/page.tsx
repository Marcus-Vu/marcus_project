import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Behandelingen & Prijzen — HairsalonX | Kapper Roermond',
  description: 'Bekijk alle behandelingen en prijzen van HairsalonX in Roermond. Knippen, kleuren, krullen, extensions en meer.',
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
                  <div key={item.name} className="flex justify-between items-start p-6 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors">
                    <div>
                      <h3 className="font-semibold text-neutral-900">{item.name}</h3>
                      <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>
                    </div>
                    <span className="font-display font-bold text-primary-600 whitespace-nowrap ml-4">{item.price}</span>
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
