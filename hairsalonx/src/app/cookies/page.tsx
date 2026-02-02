import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookiebeleid — HairsalonX',
  description: 'Cookiebeleid van HairsalonX. Lees welke cookies wij gebruiken en waarom.',
}

export default function CookiePage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
        <div className="container-narrow mx-auto">
          <p className="text-gold font-display italic text-lg mb-2">Juridisch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Cookiebeleid
          </h1>
          <p className="text-neutral-600">
            Laatst bijgewerkt: 2 februari 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto max-w-3xl">
          <div className="prose prose-neutral max-w-none">
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">1. Wat zijn cookies?</h2>
            <p className="text-neutral-600 mb-6">
              Cookies zijn kleine tekstbestanden die worden opgeslagen op je computer, tablet of telefoon 
              wanneer je een website bezoekt. Ze worden gebruikt om de website te laten functioneren 
              of om informatie te verzamelen over je bezoek.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">2. Welke cookies gebruiken wij?</h2>
            <p className="text-neutral-600 mb-4">
              Wij gebruiken de volgende categorieën cookies:
            </p>

            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">2.1 Essentiële cookies</h3>
            <p className="text-neutral-600 mb-4">
              Deze cookies zijn strikt noodzakelijk voor de werking van de website. Ze kunnen niet 
              worden uitgeschakeld in onze systemen. Zij zorgen er bijvoorbeeld voor dat je veilig 
              door de website kunt navigeren en afspraken kunt maken.
            </p>
            <table className="w-full text-sm mb-6">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Cookie</th>
                  <th className="text-left p-3 font-semibold">Doel</th>
                  <th className="text-left p-3 font-semibold">Duur</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">cookie-preferences</td>
                  <td className="p-3">Bewaart je cookie-voorkeuren</td>
                  <td className="p-3">1 jaar</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">session</td>
                  <td className="p-3">Houdt je sessie bij tijdens het boeken</td>
                  <td className="p-3">Sessie</td>
                </tr>
              </tbody>
            </table>

            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">2.2 Analytische cookies</h3>
            <p className="text-neutral-600 mb-4">
              Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken. 
              Ze verzamelen informatie anoniem en helpen ons de website te verbeteren.
            </p>
            <table className="w-full text-sm mb-6">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Cookie</th>
                  <th className="text-left p-3 font-semibold">Doel</th>
                  <th className="text-left p-3 font-semibold">Duur</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">_ga</td>
                  <td className="p-3">Google Analytics - onderscheidt gebruikers</td>
                  <td className="p-3">2 jaar</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">_gid</td>
                  <td className="p-3">Google Analytics - onderscheidt gebruikers</td>
                  <td className="p-3">24 uur</td>
                </tr>
              </tbody>
            </table>

            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">2.3 Marketing cookies</h3>
            <p className="text-neutral-600 mb-6">
              Momenteel gebruiken wij geen marketing cookies. Mocht dit in de toekomst veranderen, 
              dan vragen wij eerst je toestemming.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">3. Cookies beheren</h2>
            <p className="text-neutral-600 mb-4">
              Je kunt je cookie-voorkeuren op elk moment wijzigen:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li>Klik op de cookie banner bij je eerste bezoek</li>
              <li>Gebruik de cookie instellingen knop (onderaan elke pagina)</li>
              <li>Verwijder cookies via je browser instellingen</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">4. Cookies uitschakelen</h2>
            <p className="text-neutral-600 mb-4">
              Je kunt cookies uitschakelen via je browser instellingen:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-6 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Firefox</a></li>
              <li><a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-in-microsoft-edge-b639d48b-9542-496f-9a3a-d66cc7d5835b" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Microsoft Edge</a></li>
            </ul>
            <p className="text-neutral-600 mb-6">
              <strong>Let op:</strong> Het uitschakelen van essentiële cookies kan ervoor zorgen 
              dat de website niet correct werkt.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">5. Wijzigingen</h2>
            <p className="text-neutral-600 mb-6">
              Wij kunnen dit cookiebeleid van tijd tot tijd wijzigen. Controleer deze pagina 
              regelmatig voor updates. Wijzigingen worden van kracht zodra ze op deze pagina 
              zijn gepubliceerd.
            </p>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">6. Contact</h2>
            <p className="text-neutral-600 mb-6">
              Voor vragen over dit cookiebeleid kun je contact met ons opnemen:
            </p>
            <div className="bg-neutral-50 p-6 rounded-xl mb-6">
              <p className="text-neutral-600">
                <strong>HairsalonX</strong><br />
                E-mail: info@hairsalonx.nl<br />
                Telefoon: 06 2702 0236<br />
                Adres: Roermond, Nederland
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200 flex gap-6">
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
              Privacybeleid →
            </Link>
            <Link href="/voorwaarden" className="text-primary-600 hover:text-primary-700 font-medium">
              Algemene voorwaarden →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}