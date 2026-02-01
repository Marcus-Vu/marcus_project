import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden — HairsalonX',
  description: 'Algemene voorwaarden van HairsalonX. Lees onze voorwaarden voordat je een afspraak maakt.',
}

export default function VoorwaardenPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
        <div className="container-narrow mx-auto">
          <p className="text-gold font-display italic text-lg mb-2">Juridisch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Algemene Voorwaarden
          </h1>
          <p className="text-neutral-600">
            Laatst bijgewerkt: 1 februari 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto max-w-3xl">
          <div className="prose prose-neutral max-w-none">
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">1. Algemeen</h2>
            <p className="text-neutral-600 mb-6">
              Deze algemene voorwaarden zijn van toepassing op alle diensten die worden 
              aangeboden door HairsalonX, gevestigd in Roermond. Door het maken van een 
              afspraak ga je akkoord met deze voorwaarden.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">2. Afspraken</h2>
            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">2.1 Maken van afspraken</h3>
            <p className="text-neutral-600 mb-4">
              Afspraken kunnen worden gemaakt via telefoon, WhatsApp, e-mail of ons 
              online boekingssysteem. Je ontvangt een bevestiging van je afspraak.
            </p>

            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">2.2 Annuleren of wijzigen</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li>Afspraken kunnen tot <strong>24 uur van tevoren</strong> kosteloos worden geannuleerd of gewijzigd</li>
              <li>Bij annulering binnen 24 uur of no-show behouden wij het recht om 50% van de behandeling in rekening te brengen</li>
              <li>Voor late aankomst (meer dan 15 minuten) kunnen wij de behandeling inkorten of annuleren</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">3. Prijzen en betaling</h2>
            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">3.1 Prijzen</h3>
            <p className="text-neutral-600 mb-4">
              Alle prijzen op onze website zijn indicatief en inclusief BTW. De definitieve 
              prijs wordt bepaald op basis van de daadwerkelijke behandeling, haarlengte 
              en -dikte.
            </p>

            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">3.2 Betaling</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li>Betaling geschiedt contant of via pin na afloop van de behandeling</li>
              <li>Cadeaubonnen zijn alleen geldig bij HairsalonX en niet inwisselbaar voor contant geld</li>
              <li>Cadeaubonnen hebben een geldigheid van 1 jaar na aankoopdatum</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">4. Klachten</h2>
            <p className="text-neutral-600 mb-4">
              Mocht je niet tevreden zijn over de behandeling, meld dit dan binnen 
              <strong> 7 dagen</strong> na de behandeling. Wij zullen er alles aan doen 
              om een passende oplossing te vinden.
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li>Klachten kunnen worden gemeld via telefoon of e-mail</li>
              <li>Wij streven ernaar klachten binnen 5 werkdagen te behandelen</li>
              <li>Gerechtvaardigde klachten worden kosteloos hersteld</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">5. Aansprakelijkheid</h2>
            <p className="text-neutral-600 mb-6">
              HairsalonX is niet aansprakelijk voor schade aan kleding of eigendommen, 
              tenzij er sprake is van grove nalatigheid. Wij adviseren je waardevolle 
              spullen veilig op te bergen tijdens de behandeling.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">6. Gezondheid en veiligheid</h2>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li>Geef altijd eerlijk aan als je allergisch bent voor bepaalde producten</li>
              <li>Meld huidaandoeningen of medische klachten voorafgaand aan de behandeling</li>
              <li>Wij behouden ons het recht voor om een behandeling te weigeren bij gezondheidsrisico&apos;s</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">7. Kinderen</h2>
            <p className="text-neutral-600 mb-6">
              Kinderen tot 12 jaar moeten worden vergezeld door een volwassene. 
              Wij streven ernaar een veilige en kindvriendelijke omgeving te bieden.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">8. Wijzigingen voorwaarden</h2>
            <p className="text-neutral-600 mb-6">
              HairsalonX behoudt zich het recht voor om deze voorwaarden te wijzigen. 
              Wijzigingen worden van kracht zodra ze op deze pagina zijn gepubliceerd.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">9. Contact</h2>
            <div className="bg-neutral-50 p-6 rounded-xl mb-6">
              <p className="text-neutral-600">
                <strong>HairsalonX</strong><br />
                E-mail: info@hairsalonx.nl<br />
                Telefoon: 06 2702 0236<br />
                Adres: Roermond, Nederland
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
              Bekijk ook ons privacybeleid →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
