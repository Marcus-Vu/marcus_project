import Link from 'next/link'
import Image from 'next/image'
import { FadeInOnScroll } from '@/components/FadeInOnScroll'

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/images/hero-salon.jpg"
        alt="HairsalonX salon interieur"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="container-narrow mx-auto px-4 md:px-8 text-center relative z-10 pt-20">
        <p className="text-gold font-display italic text-lg md:text-xl mb-4 animate-fade-in-up">
          Welkom bij
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up-delay-1">
          Hairsalon<span className="text-primary-300">X</span>
        </h1>
        <p className="font-display text-xl md:text-2xl text-white/80 italic mb-8 max-w-2xl mx-auto animate-fade-in-up-delay-2">
          Haar zoals je het nog niet kende
        </p>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
          Persoonlijke aandacht in een warme, ontspannen sfeer in Roermond.
          Krullen, extensions, kleur of een frisse coupe — jij bent welkom.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
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
        <FadeInOnScroll>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-4">
            Waarom HairsalonX?
          </h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <p className="text-center text-neutral-500 mb-12 max-w-2xl mx-auto">
            Bij HairsalonX draait alles om jou. In een warme en ontspannen sfeer nemen we de tijd om écht naar je te luisteren.
          </p>
        </FadeInOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <FadeInOnScroll key={usp.title} delay={200 + index * 100}>
              <div className="text-center p-8 rounded-2xl bg-neutral-50 hover:bg-primary-50 hover-lift transition-colors duration-300 h-full">
                <span className="text-5xl mb-4 block">{usp.icon}</span>
                <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">{usp.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{usp.description}</p>
              </div>
            </FadeInOnScroll>
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
          <FadeInOnScroll direction="left">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden hover-scale">
              <Image
                src="/images/josje-portrait.jpg"
                alt="Josje - eigenaar van HairsalonX"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll direction="right" delay={200}>
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
          </FadeInOnScroll>
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
        <FadeInOnScroll>
          <p className="text-gold font-display italic text-lg mb-2">Onze specialisaties</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-12">
            Behandelingen
          </h2>
        </FadeInOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <FadeInOnScroll key={service.name} delay={index * 100}>
              <Link
                href="/behandelingen"
                className="block p-6 rounded-2xl bg-neutral-50 hover:bg-primary-50 hover-lift transition-all duration-300 group h-full"
              >
                <span className="text-4xl block mb-3">{service.icon}</span>
                <h3 className="font-display text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-neutral-500 text-sm mt-1">{service.desc}</p>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
        <FadeInOnScroll delay={400}>
          <Link href="/behandelingen" className="btn-primary mt-10 inline-block">
            Alle behandelingen & prijzen
          </Link>
        </FadeInOnScroll>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const reviews = [
    { name: 'Anna de Vries', initial: 'A', color: 'bg-pink-500', text: 'Eindelijk iemand die mijn krullen écht begrijpt! Josje nam uitgebreid de tijd om te kijken wat bij mijn haartype past. Resultaat is prachtig!', stars: 5, time: '2 weken geleden' },
    { name: 'Lisa van den Berg', initial: 'L', color: 'bg-blue-500', text: 'Wat een fijne salon! Voelde me meteen op mijn gemak. Josje luistert echt naar wat je wilt en geeft eerlijk advies.', stars: 5, time: '1 maand geleden' },
    { name: 'Sophie Kuijpers', initial: 'S', color: 'bg-emerald-500', text: 'Mijn extensions zien er zo natuurlijk uit dat niemand het verschil ziet! Hele fijne ervaring en top resultaat.', stars: 5, time: '1 maand geleden' },
    { name: 'Mara Willems', initial: 'M', color: 'bg-purple-500', text: 'Super blij met mijn nieuwe kleur! Josje had precies door wat ik bedoelde en het resultaat was nog mooier dan verwacht.', stars: 5, time: '3 weken geleden' },
  ]
  const avgRating = 5.0

  return (
    <section className="section-padding bg-neutral-900 text-white">
      <div className="container-narrow mx-auto">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <p className="text-gold font-display italic text-lg mb-2">Wat klanten zeggen</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Klantbeoordelingen</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-bold">{avgRating.toFixed(1)}</span>
              <div className="text-left">
                <div className="text-gold text-2xl">★★★★★</div>
                <p className="text-neutral-400 text-sm">{reviews.length} beoordelingen</p>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <FadeInOnScroll key={review.name} delay={index * 100}>
              <div className="bg-neutral-800/80 rounded-2xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className={`${review.color} w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0`}>{review.initial}</div>
                  <div className="flex-1">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center gap-2 mb-2"><span className="text-gold text-sm">{'★'.repeat(review.stars)}</span><span className="text-neutral-500 text-xs">{review.time}</span></div>
                    <p className="text-neutral-300 text-sm leading-relaxed">{review.text}</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
        <FadeInOnScroll delay={400}>
          <div className="text-center mt-10">
            <p className="text-neutral-400 mb-4">Blij met je bezoek?</p>
            <a href="https://g.page/r/hairsalonx-roermond/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-neutral-900 font-semibold py-3 px-6 rounded-full hover:bg-neutral-100 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Schrijf een review op Google
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-700 text-white text-center">
      <div className="container-narrow mx-auto">
        <FadeInOnScroll>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Klaar voor jouw nieuwe look?
          </h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">
            Kom binnen, voel je thuis, en ontdek wat HairsalonX voor jou kan betekenen.
          </p>
        </FadeInOnScroll>
        <FadeInOnScroll delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-full
                         hover:bg-neutral-100 transition-all duration-300 shadow-lg text-lg animate-pulse-subtle"
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
        </FadeInOnScroll>
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
