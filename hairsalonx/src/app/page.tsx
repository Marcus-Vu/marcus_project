import Link from 'next/link'
import Image from 'next/image'

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blush-light to-warm-50">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
      <div className="container-narrow mx-auto px-4 md:px-8 text-center relative z-10 pt-20">
        <p className="text-gold font-display italic text-lg md:text-xl mb-4 animate-fade-in">
          Welkom bij
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
          Hairsalon<span className="text-primary-500">X</span>
        </h1>
        <p className="font-display text-xl md:text-2xl text-neutral-600 italic mb-8 max-w-2xl mx-auto">
          Haar zoals je het nog niet kende
        </p>
        <p className="text-neutral-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Persoonlijke aandacht in een warme, ontspannen sfeer in Roermond.
          Krullen, extensions, kleur of een frisse coupe — jij bent welkom.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary text-lg">
            Boek je afspraak
          </Link>
          <Link href="/behandelingen" className="btn-secondary text-lg">
            Bekijk behandelingen
          </Link>
        </div>
      </div>
    </section>
  )
}

function USPSection() {
  const usps = [
    {
      icon: '✨',
      title: 'Krullen Specialist',
      description: 'Natuurlijke krullen, defined curls of een perfecte krullenlook — wij kennen het vak als geen ander.',
    },
    {
      icon: '💫',
      title: 'Extensions Expert',
      description: 'Meer volume, meer lengte, meer mogelijkheden. Professioneel aangebracht voor een natuurlijk resultaat.',
    },
    {
      icon: '💝',
      title: 'Persoonlijke Aandacht',
      description: 'Bij ons geen haast. We nemen de tijd om écht naar je te luisteren en samen het perfecte resultaat te creëren.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-4">
          Waarom HairsalonX?
        </h2>
        <p className="text-center text-neutral-500 mb-12 max-w-2xl mx-auto">
          Bij HairsalonX draait alles om jou. In een warme en ontspannen sfeer nemen we de tijd om écht naar je te luisteren.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp) => (
            <div key={usp.title} className="text-center p-8 rounded-2xl bg-neutral-50 hover:bg-primary-50 transition-colors duration-300">
              <span className="text-5xl mb-4 block">{usp.icon}</span>
              <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">{usp.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPreview() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-blush-light">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
            <Image
              src="/images/josje-portrait.png"
              alt="Josje - eigenaar van HairsalonX"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <p className="text-gold font-display italic text-lg mb-2">Het verhaal</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Achter HairsalonX staat Josje
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Een trotse mama met een grote passie voor het vak. Mensen mooi maken — dát is wat ze het allerliefste doet.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Iedereen verdient het om zich zelfverzekerd en in de watten gelegd te voelen, en daar zet zij zich elke dag met liefde voor in.
            </p>
            <Link href="/over" className="btn-secondary">
              Lees meer over Josje
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesPreview() {
  const services = [
    { name: 'Knippen', icon: '✂️', desc: 'Dames, heren en kinderen' },
    { name: 'Kleuren', icon: '🎨', desc: 'Van highlights tot full color' },
    { name: 'Krullen', icon: '🌀', desc: 'Specialist in curly hair' },
    { name: 'Extensions', icon: '💫', desc: 'Volume en lengte op maat' },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow mx-auto text-center">
        <p className="text-gold font-display italic text-lg mb-2">Onze specialisaties</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-12">
          Behandelingen
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.name}
              href="/behandelingen"
              className="p-6 rounded-2xl bg-neutral-50 hover:bg-primary-50 transition-all duration-300 group"
            >
              <span className="text-4xl block mb-3">{service.icon}</span>
              <h3 className="font-display text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-neutral-500 text-sm mt-1">{service.desc}</p>
            </Link>
          ))}
        </div>
        <Link href="/behandelingen" className="btn-primary mt-10 inline-block">
          Alle behandelingen & prijzen
        </Link>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const reviews = [
    { name: 'Anna M.', text: 'Eindelijk iemand die mijn krullen begrijpt! Josje is een topper.', stars: 5 },
    { name: 'Lisa V.', text: 'Super persoonlijke aandacht. Voelde me meteen op mijn gemak.', stars: 5 },
    { name: 'Sophie K.', text: 'Mijn extensions zien er zo natuurlijk uit. Heel blij!', stars: 5 },
  ]

  return (
    <section className="section-padding bg-neutral-900 text-white">
      <div className="container-narrow mx-auto text-center">
        <p className="text-gold font-display italic text-lg mb-2">Wat klanten zeggen</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
          Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-neutral-800 rounded-2xl p-8">
              <div className="text-gold text-xl mb-4">
                {'★'.repeat(review.stars)}
              </div>
              <p className="text-neutral-300 italic mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <p className="font-semibold text-white">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-700 text-white text-center">
      <div className="container-narrow mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
          Klaar voor jouw nieuwe look?
        </h2>
        <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">
          Kom binnen, voel je thuis, en ontdek wat HairsalonX voor jou kan betekenen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-full
                       hover:bg-neutral-100 transition-all duration-300 shadow-lg text-lg"
          >
            Boek je afspraak
          </Link>
          <a
            href="tel:0627020236"
            className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-full
                       hover:bg-white/10 transition-all duration-300 text-lg"
          >
            📞 Bel direct
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <USPSection />
      <AboutPreview />
      <ServicesPreview />
      <ReviewsSection />
      <CTASection />
    </>
  )
}
