'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type CookieCategory = 'essential' | 'analytics' | 'marketing'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always required
  analytics: false,
  marketing: false,
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-preferences')
    if (!stored) {
      setShowBanner(true)
    } else {
      setPreferences(JSON.parse(stored))
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs))
    setPreferences(prefs)
    setShowBanner(false)

    // Apply preferences
    if (!prefs.analytics) {
      // Disable analytics
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
    }
    if (!prefs.marketing) {
      // Disable marketing
      window.gtag?.('consent', 'update', { ad_storage: 'denied' })
    }
  }

  const acceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true })
  }

  const acceptEssentialOnly = () => {
    savePreferences({ essential: true, analytics: false, marketing: false })
  }

  const saveCustomPreferences = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-2xl z-50 animate-slide-up">
      <div className="container-narrow mx-auto px-4 py-4 md:py-6">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-display font-semibold text-neutral-900 mb-1">
                🍪 Cookie Instellingen
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
                Wij gebruiken cookies om je ervaring te verbeteren. 
                <Link href="/cookies" className="text-primary-600 hover:text-primary-700 underline ml-1">
                  Lees ons cookiebeleid
                </Link>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Instellingen
              </button>
              <button
                onClick={acceptEssentialOnly}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Alleen essentieel
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 rounded-lg transition-colors shadow-sm"
              >
                Alles accepteren
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-neutral-900">
                Cookie Voorkeuren
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
            </div>

            {/* Essential */}
            <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-neutral-900">Essentiële cookies</h4>
                  <span className="text-xs bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded">Verplicht</span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  Deze cookies zijn nodig voor de werking van de website en kunnen niet worden uitgeschakeld.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.essential}
                disabled
                className="w-5 h-5 accent-primary-500 cursor-not-allowed opacity-50"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">Analytische cookies</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Help ons de website te verbeteren door anoniem gebruik te analyseren.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-5 h-5 accent-primary-500 cursor-pointer"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">Marketing cookies</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Worden gebruikt om gepersonaliseerde advertenties te tonen.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="w-5 h-5 accent-primary-500 cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Terug
              </button>
              <button
                onClick={saveCustomPreferences}
                className="px-6 py-2 text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 rounded-lg transition-colors shadow-sm"
              >
                Voorkeuren opslaan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// TypeScript global for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}