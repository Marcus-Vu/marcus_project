import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacybeleid — HairsalonX',
  description: 'Privacybeleid van HairsalonX. Lees hoe wij omgaan met jouw persoonsgegevens.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
        <div className="container-narrow mx-auto">
          <p className="text-gold font-display italic text-lg mb-2">Juridisch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Privacybeleid
          </h1>
          <p className="text-neutral-600">
            Laatst bijgewerkt: 1 februari 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto max-w-3xl">
          <div className="prose prose-neutral max-w-none">
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">1. Wie zijn wij</h2>
            <p className="text-neutral-600 mb-6">
              HairsalonX is een eenmanszaak gevestigd in Roermond, Nederland. 
              Wij verzorgen kappersdiensten en hechten groot belang aan de bescherming 
              van jouw persoonsgegevens. Dit privacybeleid legt uit welke gegevens wij 
              verzamelen en hoe wij deze gebruiken.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">2. Welke gegevens verzamelen wij</h2>
            <p className="text-neutral-600 mb-4">Wij kunnen de volgende gegevens verzamelen:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li><strong>Contactgegevens:</strong> naam, telefoonnummer, e-mailadres</li>
              <li><strong>Afspraakgegevens:</strong> datum, tijd, behandeling</li>
              <li><strong>Betaalgegevens:</strong> alleen indien van toepassing</li>
              <li><strong>Websitegebruik:</strong> IP-adres, browser type, bezochte pagina&apos;s</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">3. Hoe gebruiken wij jouw gegevens</h2>
            <p className="text-neutral-600 mb-4">Wij gebruiken jouw gegevens voor:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li>Het maken en beheren van afspraken</li>
              <li>Het verzenden van herinneringen voor afspraken</li>
              <li>Het beantwoorden van vragen via contactformulier</li>
              <li>Het verbeteren van onze website en diensten</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">4. Bewaartermijn</h2>
            <p className="text-neutral-600 mb-6">
              Wij bewaren jouw gegevens niet langer dan nodig is voor het doel waarvoor 
              ze zijn verzameld. Afspraakgegevens worden maximaal 2 jaar bewaard. 
              Contactgegevens worden verwijderd wanneer je vraag is afgehandeld, 
              tenzij je toestemming geeft voor langer bewaren.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">5. Jouw rechten</h2>
            <p className="text-neutral-600 mb-4">Je hebt het recht om:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li>Inzage te vragen in je gegevens</li>
              <li>Je gegevens te laten corrigeren</li>
              <li>Je gegevens te laten verwijderen</li>
              <li>Bezwaar te maken tegen verwerking</li>
              <li>Je toestemming in te trekken</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">6. Cookies</h2>
            <p className="text-neutral-600 mb-6">
              Onze website gebruikt cookies. Essentiële cookies zijn noodzakelijk voor 
              de werking van de website en worden altijd geplaatst. Analytische cookies 
              helpen ons de website te verbeteren. Je kunt zelf kiezen welke cookies je 
              accepteert via onze cookie banner.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">7. Contact</h2>
            <p className="text-neutral-600 mb-6">
              Voor vragen over dit privacybeleid of je rechten kun je contact met ons opnemen:
            </p>
            <div className="bg-neutral-50 p-6 rounded-xl mb-6">
              <p className="text-neutral-600">
                <strong>HairsalonX</strong><br />
                Eigenaar: Josje<br />
                E-mail: info@hairsalonx.nl<br />
                Telefoon: 06 2702 0236<br />
                Adres: Roermond, Nederland
              </p>
            </div>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">8. Wijzigingen</h2>
            <p className="text-neutral-600 mb-6">
              Wij kunnen dit privacybeleid van tijd tot tijd wijzigen. Controleer deze 
              pagina regelmatig voor updates. Wijzigingen worden van kracht zodra ze 
              op deze pagina zijn gepubliceerd.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <Link href="/voorwaarden" className="text-primary-600 hover:text-primary-700 font-medium">
              Bekijk ook onze algemene voorwaarden →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
