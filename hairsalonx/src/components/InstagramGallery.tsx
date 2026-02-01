'use client'

import { useState } from 'react'
import Image from 'next/image'

// Static gallery data — easy to swap to real Instagram API later
// Replace these with actual Instagram post data when API is connected
const INSTAGRAM_POSTS = [
  {
    id: '1',
    caption: 'Prachtige krullen transformatie ✨ #krullenspecialist',
    category: 'Krullen',
    gradient: 'from-amber-200 to-rose-200',
    emoji: '🌀',
    image: '/images/curls-result.jpg',
  },
  {
    id: '2',
    caption: 'Balayage perfection 🎨 #balayage #haircolor',
    category: 'Kleuren',
    gradient: 'from-purple-200 to-pink-200',
    emoji: '🎨',
    image: '/images/color-result.jpg',
  },
  {
    id: '3',
    caption: 'Extensions voor extra volume 💇‍♀️ #extensions',
    category: 'Extensions',
    gradient: 'from-rose-200 to-orange-200',
    emoji: '✨',
    image: '/images/extensions-result.jpg',
  },
  {
    id: '4',
    caption: 'Blond bombshell look 💛 #blondhaar',
    category: 'Kleuren',
    gradient: 'from-yellow-200 to-amber-200',
    emoji: '💛',
  },
  {
    id: '5',
    caption: 'Curly bob = love 💕 #curlybob #krullen',
    category: 'Krullen',
    gradient: 'from-pink-200 to-fuchsia-200',
    emoji: '💕',
  },
  {
    id: '6',
    caption: 'Tape extensions voor natuurlijk volume #tapeextensions',
    category: 'Extensions',
    gradient: 'from-teal-200 to-cyan-200',
    emoji: '💎',
  },
  {
    id: '7',
    caption: 'Rode tinten voor de herfst 🍂 #herfsthaar',
    category: 'Kleuren',
    gradient: 'from-red-200 to-orange-200',
    emoji: '🍂',
  },
  {
    id: '8',
    caption: 'Bridal hair goals 👰 #bridalhair',
    category: 'Styling',
    gradient: 'from-slate-200 to-gray-200',
    emoji: '👰',
  },
  {
    id: '9',
    caption: 'Natural curls enhanced 🌿 #naturalcurls',
    category: 'Krullen',
    gradient: 'from-green-200 to-emerald-200',
    emoji: '🌿',
  },
  {
    id: '10',
    caption: 'Highlights die het verschil maken ☀️ #highlights',
    category: 'Kleuren',
    gradient: 'from-amber-100 to-yellow-200',
    emoji: '☀️',
  },
  {
    id: '11',
    caption: 'Volume boost met clip-ins 💫 #volumehaar',
    category: 'Extensions',
    gradient: 'from-violet-200 to-purple-200',
    emoji: '💫',
  },
  {
    id: '12',
    caption: 'Salon vibes ✂️ #hairsalonx #roermond',
    category: 'Salon',
    gradient: 'from-rose-100 to-pink-200',
    emoji: '✂️',
  },
]

const CATEGORIES = ['Alles', 'Krullen', 'Kleuren', 'Extensions', 'Styling', 'Salon']

const INSTAGRAM_URL = 'https://instagram.com/hairsalonx.remunj'

export default function InstagramGallery() {
  const [activeFilter, setActiveFilter] = useState('Alles')
  const [selectedPost, setSelectedPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null)

  const filteredPosts = activeFilter === 'Alles'
    ? INSTAGRAM_POSTS
    : INSTAGRAM_POSTS.filter(p => p.category === activeFilter)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === cat
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Instagram-style grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredPosts.map(post => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`group relative aspect-square rounded-xl ${post.image ? '' : `bg-gradient-to-br ${post.gradient}`} overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2`}
          >
            {post.image ? (
              <Image src={post.image} alt={post.caption} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {post.emoji}
                </span>
                <span className="text-xs text-neutral-700 font-medium opacity-70">
                  {post.category}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white text-sm font-medium px-3 text-center line-clamp-2">
                {post.caption}
              </span>
            </div>

            {/* Instagram icon */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox / detail overlay */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className={`relative w-full max-w-lg aspect-square rounded-2xl ${selectedPost.image ? '' : `bg-gradient-to-br ${selectedPost.gradient}`} flex flex-col items-center justify-center p-8 overflow-hidden`}
            onClick={e => e.stopPropagation()}
          >
            {selectedPost.image && (
              <Image src={selectedPost.image} alt={selectedPost.caption} fill className="object-cover" />
            )}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
              aria-label="Sluiten"
            >
              ✕
            </button>
            {!selectedPost.image && <span className="text-7xl mb-4">{selectedPost.emoji}</span>}
            <p className={`${selectedPost.image ? 'absolute bottom-16 z-10 text-white drop-shadow-lg' : 'text-neutral-800'} text-center font-medium text-lg mb-2`}>
              {selectedPost.caption}
            </p>
            <span className="text-sm text-neutral-600 bg-white/50 px-3 py-1 rounded-full">
              {selectedPost.category}
            </span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-sm text-neutral-700 underline hover:text-neutral-900"
            >
              Bekijk op Instagram →
            </a>
          </div>
        </div>
      )}

      {/* Instagram CTA */}
      <div className="text-center mt-12 space-y-4">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          Volg ons op Instagram
        </a>
        <p className="text-neutral-500">
          @hairsalonx.remunj • Dagelijks nieuwe inspiratie
        </p>
      </div>
    </div>
  )
}
