import type { Metadata } from 'next'
import GoogleMaps from '@/components/GoogleMaps'

export const metadata: Metadata = {
  title: 'Contact & Boeken — HairsalonX | Kapper Roermond',
  description: 'Maak een afspraak bij HairsalonX in Roermond. Bel, WhatsApp of boek online. Wij staan voor je klaar!',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
        <div className="container-narrow mx-auto text-center">
          <p className="text-gold font-display italic text-lg mb-2">Welkom</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Contact & Boeken
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Wil je een afspraak maken? Neem gerust contact op via telefoon, WhatsApp of email.
          </p>
        </div>
      </section>

      {/* Online Booking Widget */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-neutral-900 mb-2">Online Afspraak Maken</h2>
            <p className="text-neutral-600">Boek direct je afspraak in 3 simpele stappen</p>
          </div>
          <div className="max-w-2xl mx-auto bg-neutral-50 rounded-2xl p-6">
            {/* SalonBooker Widget Embed */}
            <iframe
              src="https://salonbooker-demo.vercel.app/widget/hairsalonx-roermond"
              className="w-full h-[600px] border-0 rounded-xl"
              title="Boek een afspraak bij HairsalonX"
              loading="lazy"
            />
            <p className="text-center text-neutral-400 text-sm mt-4">
              Powered by <a href="https://salonbooker.nl" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">SalonBooker</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8">Neem contact op</h2>
              <div className="space-y-6">
                <a href="tel:0627020236" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors">
                  <span className="text-3xl">📞</span>
                  <div>
                    <p className="font-semibold text-neutral-900">Telefoon</p>
                    <p className="text-primary-600">06 2702 0236</p>
                  </div>
                </a>
                <a href="https://wa.me/31627020236" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-green-50 transition-colors">
                  <span className="text-3xl">💬</span>
                  <div>
                    <p className="font-semibold text-neutral-900">WhatsApp</p>
                    <p className="text-green-600">Stuur een berichtje</p>
                  </div>
                </a>
                <a href="mailto:info@hairsalonx.nl" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors">
                  <span className="text-3xl">✉️</span>
                  <div>
                    <p className="font-semibold text-neutral-900">Email</p>
                    <p className="text-primary-600">info@hairsalonx.nl</p>
                  </div>
                </a>
                <a href="https://instagram.com/hairsalonx.remunj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-purple-50 transition-colors">
                  <span className="text-3xl">📸</span>
                  <div>
                    <p className="font-semibold text-neutral-900">Instagram</p>
                    <p className="text-purple-600">@hairsalonx.remunj</p>
                  </div>
                </a>
              </div>

              <div className="mt-8">
                <h3 className="font-display text-lg font-semibold text-neutral-900 mb-4">📍 Locatie</h3>
                <GoogleMaps address="Roermond, Limburg" />
                <p className="text-neutral-400 text-sm mt-2">
                  Exact adres volgt (binnenkort te updaten door Josje)
                </p>
              </div>
            </div>

            {/* Opening hours + booking */}
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8">Openingstijden</h2>
              <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                <table className="w-full">
                  <tbody className="divide-y divide-neutral-100">
                    {[
                      ['Maandag', 'Gesloten'],
                      ['Dinsdag', '09:00 – 17:30'],
                      ['Woensdag', '09:00 – 17:30'],
                      ['Donderdag', '09:00 – 20:00'],
                      ['Vrijdag', '09:00 – 17:30'],
                      ['Zaterdag', '09:00 – 16:00'],
                      ['Zondag', 'Gesloten'],
                    ].map(([day, hours]) => (
                      <tr key={day}>
                        <td className="py-3 font-medium text-neutral-900">{day}</td>
                        <td className={`py-3 text-right ${hours === 'Gesloten' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          {hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-neutral-400 text-xs mt-4">* Tijden onder voorbehoud. Neem contact op voor de actuele openingstijden.</p>
              </div>

              <div className="bg-primary-50 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">Direct boeken?</h3>
                <p className="text-neutral-600 mb-6">Bel of WhatsApp ons voor de snelste service.</p>
                <div className="flex flex-col gap-3">
                  <a href="tel:0627020236" className="btn-primary">
                    📞 Bel voor een afspraak
                  </a>
                  <a
                    href="https://wa.me/31627020236?text=Hoi!%20Ik%20wil%20graag%20een%20afspraak%20maken%20bij%20HairsalonX."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-all shadow-lg"
                  >
                    💬 WhatsApp ons
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
