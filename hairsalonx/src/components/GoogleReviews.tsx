'use client'

import { useState, useEffect } from 'react'
import { FadeInOnScroll } from '@/components/FadeInOnScroll'

interface Review {
  name: string
  text: string
  stars: number
  time?: string
  photo?: string
}

interface ReviewsData {
  reviews: Review[]
  source: string
  rating: number
  totalReviews: number
  error?: string
}

export default function GoogleReviews() {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews')
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError('Er is een fout opgetreden bij het laden van de reviews')
        console.error('Error fetching reviews:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Show skeleton loader while loading
  if (loading) {
    return (
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-narrow mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-neutral-700 rounded mx-auto mb-2"></div>
            <div className="h-10 w-48 bg-neutral-700 rounded mx-auto mb-12"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-800 rounded-2xl p-8 animate-pulse h-48">
                <div className="h-4 w-24 bg-neutral-700 rounded mb-4"></div>
                <div className="h-4 w-full bg-neutral-700 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-neutral-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show reviews (or fallback if error)
  const reviews = data?.reviews || [
    { name: 'Anna M.', text: 'Eindelijk iemand die mijn krullen begrijpt! Josje is een topper.', stars: 5 },
    { name: 'Lisa V.', text: 'Super persoonlijke aandacht. Voelde me meteen op mijn gemak.', stars: 5 },
    { name: 'Sophie K.', text: 'Mijn extensions zien er zo natuurlijk uit. Heel blij!', stars: 5 },
  ]

  return (
    <section className="section-padding bg-neutral-900 text-white">
      <div className="container-narrow mx-auto text-center">
        <FadeInOnScroll>
          <p className="text-gold font-display italic text-lg mb-2">Wat klanten zeggen</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Reviews
          </h2>
          {data?.source === 'google' && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex text-gold">
                {'★'.repeat(Math.round(data.rating))}
              </div>
              <span className="text-neutral-400">
                {data.rating.toFixed(1)} ({data.totalReviews} reviews)
              </span>
            </div>
          )}
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 5).map((review, index) => (
            <FadeInOnScroll key={`${review.name}-${index}`} delay={index * 150}>
              <div className="bg-neutral-800 rounded-2xl p-8 hover-lift h-full text-left">
                <div className="flex items-center gap-1 mb-4">
                  <div className="text-gold text-xl">
                    {'★'.repeat(review.stars)}
                  </div>
                  {review.time && (
                    <span className="text-neutral-500 text-sm ml-auto">{review.time}</span>
                  )}
                </div>
                <p className="text-neutral-300 italic mb-4 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {review.photo && (
                    <img 
                      src={review.photo} 
                      alt={review.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <p className="font-semibold text-white">{review.name}</p>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>

        {data?.source === 'google' && (
          <FadeInOnScroll delay={600}>
            <a 
              href="https://www.google.com/search?q=HairsalonX+Roermond" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Bekijk alle reviews op Google
            </a>
          </FadeInOnScroll>
        )}
      </div>
    </section>
  )
}
