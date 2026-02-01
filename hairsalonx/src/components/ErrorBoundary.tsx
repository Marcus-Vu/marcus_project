'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    // Here you could log to an error reporting service like Sentry
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4" role="alert" aria-live="assertive">
          <div className="text-center max-w-md">
            <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4">
              Oeps, er ging iets mis
            </h2>
            <p className="text-neutral-600 mb-6">
              Sorry voor het ongemak. Probeer de pagina te vernieuwen of neem contact met ons op.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
              aria-label="Vernieuw de pagina"
            >
              Pagina vernieuwen
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
