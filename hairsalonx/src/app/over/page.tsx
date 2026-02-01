import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over Josje — HairsalonX | Kapper Roermond',
  description: 'Maak kennis met Josje, de trotse eigenaar van HairsalonX in Roermond. Krullen specialist en extensions expert met passie voor het vak.',
}

export default function OverPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden order-2 md:order-1">
              <Image
                src="/images/josje-portrait.png"
                alt="Josje - eigenaar van HairsalonX"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-gold font-display italic text-lg mb-2">Over mij</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Hoi, ik ben Josje
              </h1>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Bij HairsalonX in Roermond draait alles om jou. In een warme en ontspannen sfeer
                  neem ik de tijd om écht naar je te luisteren.
                </p>
                <p>
                  Of je nu komt voor een frisse knipbeurt, een stralende haarkleur, een perfecte
                  krullenlook of een mooie set extensions — je bent van harte welkom.
                </p>
                <p>
                  Wat HairsalonX uniek maakt? Persoonlijke aandacht staat bij mij voorop. Als
                  krullen- én extension specialist zorg ik dat jij met een goed gevoel en een
                  glimlach de deur uitgaat.
                </p>
                <p>
                  Ik ben een trotse mama met een grote passie voor het vak. Mensen mooi maken — dát
                  is wat ik het allerliefste doe. Iedereen verdient het om zich zelfverzekerd en in
                  de watten gelegd te voelen, en daar zet ik me elke dag met liefde voor in.
                </p>
              </div>
              <Link href="/contact" className="btn-primary mt-8 inline-block">
                Maak een afspraak
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-center text-neutral-900 mb-12">
            Mijn specialisaties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: '🌀', title: 'Krullen Expert', text: 'Of je nu natuurlijke krullen hebt of droomt van de perfecte curl — ik weet precies hoe ik jouw krullen tot leven breng.' },
              { icon: '💫', title: 'Extensions Specialist', text: 'Meer volume, meer lengte, meer mogelijkheden. Ik breng extensions professioneel aan voor een natuurlijk en prachtig resultaat.' },
              { icon: '🎨', title: 'Kleurspecialist', text: 'Van subtiele highlights tot een complete transformatie. Met oog voor detail creëer ik de perfecte kleur die bij jou past.' },
              { icon: '✂️', title: 'Knippen', text: 'Een goede coupe is de basis van alles. Dames én heren zijn welkom voor een strakke, verzorgde look.' },
            ].map((s) => (
              <div key={s.title} className="flex gap-4 p-6 rounded-2xl bg-neutral-50">
                <span className="text-4xl">{s.icon}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
