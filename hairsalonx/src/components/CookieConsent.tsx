'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      setHasConsented(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setHasConsented(true)
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setHasConsented(false)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50 animate-slide-up">
      <div className="container-narrow mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-neutral-900 mb-1">
              🍪 Cookie Instellingen
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
              Wij gebruiken cookies om je ervaring te verbeteren. 
              Essentiële cookies zijn altijd actief voor de werking van de website. 
              <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline ml-1">
                Lees meer in ons privacybeleid
              </a>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Alleen essentiëel
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 rounded-lg transition-colors shadow-sm"
            >
              Alles accepteren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
