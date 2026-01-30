'use client'

import { useState } from 'react'

interface GoogleMapsProps {
  address?: string
  zoom?: number
}

export default function GoogleMaps({ 
  address = "Roermond, Nederland",
  zoom = 15 
}: GoogleMapsProps) {
  const [loaded, setLoaded] = useState(false)
  
  // Encode address for URL
  const encodedAddress = encodeURIComponent(address)
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2495.5!2d6.0!3d51.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c74b9f0c9e8a3f%3A0x3f3f3f3f3f3f3f3f!2s${encodedAddress}!5e0!3m2!1snl!2snl!4v1234567890`
  
  // Direct Google Maps link for route button
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  return (
    <div className="w-full">
      {/* Route button above map */}
      <div className="mb-4">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Routebeschrijving in Google Maps
        </a>
      </div>

      {/* Map container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto mb-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">Kaart wordt geladen...</p>
            </div>
          </div>
        )}
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          title="Locatie HairsalonX"
        />
      </div>
      
      {/* Address display */}
      <p className="text-sm text-neutral-500 mt-3">
        📍 {address}
      </p>
    </div>
  )
}
