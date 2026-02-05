'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Static gallery data — replacement for real Instagram API
const INSTAGRAM_POSTS = [
  {
    id: '1',
    caption: 'Prachtige krullen transformatie met onze curl-defining behandeling',
    category: 'Krullen',
    image: '/images/curls-result.jpg',
    likes: 47,
  },
  {
    id: '2',
    caption: 'Balayage perfection voor een natuurlijke zonovergoten look',
    category: 'Kleuren',
    image: '/images/color-result.jpg',
    likes: 62,
  },
  {
    id: '3',
    caption: 'Extensions voor extra volume en lengte, natuurlijk resultaat',
    category: 'Extensions',
    image: '/images/extensions-result.jpg',
    likes: 38,
  },
  {
    id: '4',
    caption: 'Blond specialist werk met koele toner voor frisse uitstraling',
    category: 'Kleuren',
    image: '/images/salon-interior.jpg',
    likes: 55,
  },
  {
    id: '5',
    caption: 'Curly bob knipbeurt met personaliseerde product advies',
    category: 'Krullen',
    image: '/images/hairstyle-curls.jpg',
    likes: 43,
  },
  {
    id: '6',
    caption: 'Tape extensions toegepast voor naadloze integratie',
    category: 'Extensions',
    image: '/images/josje-portrait.jpg',
    likes: 29,
  },
  {
    id: '7',
    caption: 'Warme koper tinten perfect voor het najaar',
    category: 'Kleuren',
    image: '/images/salon-interior.jpg',
    likes: 51,
  },
  {
    id: '8',
    caption: 'Bridal styling voor de mooiste dag van je leven',
    category: 'Styling',
    image: '/images/josje-portrait.jpg',
    likes: 67,
  },
  {
    id: '9',
    caption: 'Natural curls enhanced met onze curl-specialist',
    category: 'Krullen',
    image: '/images/hairstyle-curls.jpg',
    likes: 44,
  },
]

const CATEGORIES = ['Alles', 'Krullen', 'Kleuren', 'Extensions', 'Styling']

const INSTAGRAM_URL = 'https://instagram.com/hairsalonx.remunj'

export default function InstagramGallery() {
  const [activeFilter, setActiveFilter] = useState('Alles')
  const [selectedPost, setSelectedPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredPosts = activeFilter === 'Alles'
    ? INSTAGRAM_POSTS
    : INSTAGRAM_POSTS.filter(p => p.category === activeFilter)

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Instagram Gallery
        </h2>
        <p className="text-neutral-600 max-w-xl mx-auto">
          Volg ons voor dagelijkse inspiratie, behind-the-scenes en de nieuwste trends
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-neutral-900 text-white shadow-lg scale-105'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:shadow-md'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Instagram-style grid with masonry-like layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-5">
        {filteredPosts.map((post, index) => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <Image 
              src={post.image} 
              alt={post.caption}
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Hover content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="font-semibold">{post.likes}</span>
              </div>
              <span className="text-white/90 text-xs text-center line-clamp-2 font-medium">
                {post.category}
              </span>
            </div>

            {/* Category badge */}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image section */}
              <div className="relative w-full md:w-2/3 aspect-square bg-neutral-100">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.caption}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content section */}
              <div className="w-full md:w-1/3 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <div className="w-full h-full rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
                        HX
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">hairsalonx.remunj</p>
                    <p className="text-xs text-neutral-500">Roermond, Limburg</p>
                  </div>
                </div>

                <div className="flex-1">
                  <span className="inline-block bg-neutral-100 text-neutral-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {selectedPost.category}
                  </span>
                  <p className="text-neutral-800 text-sm leading-relaxed">
                    {selectedPost.caption}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center gap-4 text-neutral-600">
                    <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="text-sm font-medium">{selectedPost.likes} likes</span>
                    </button>
                  </div>

                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    Bekijk op Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Sluiten"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Instagram CTA */}
      <div className="text-center mt-14">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          Volg ons op Instagram
        </a>
        <p className="text-neutral-500 mt-4">
          @hairsalonx.remunj • Dagelijks nieuwe inspiratie en behandelingen
        </p>
      </div>
    </div>
  )
}
