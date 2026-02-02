'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Service {
  id: string
  name: string
  duration: string
  price: string
  category: string
}

const services: Service[] = [
  // Knippen
  { id: 'dames', name: 'Knippen dames', duration: '45 min', price: '€35', category: 'Knippen' },
  { id: 'heren', name: 'Knippen heren', duration: '30 min', price: '€25', category: 'Knippen' },
  { id: 'kinderen', name: 'Knippen kinderen', duration: '30 min', price: '€18', category: 'Knippen' },
  // Kleuren
  { id: 'fullcolor', name: 'Full color', duration: '90 min', price: '€55', category: 'Kleuren' },
  { id: 'highlights', name: 'Highlights / Lowlights', duration: '120 min', price: '€65', category: 'Kleuren' },
  { id: 'balayage', name: 'Balayage', duration: '150 min', price: '€85', category: 'Kleuren' },
  { id: 'uitgroei', name: 'Uitgroei bijwerken', duration: '75 min', price: '€45', category: 'Kleuren' },
  // Krullen
  { id: 'curlycut', name: 'Curly cut', duration: '60 min', price: '€45', category: 'Krullen' },
  { id: 'curldefining', name: 'Curl defining behandeling', duration: '45 min', price: '€35', category: 'Krullen' },
  // Extensions
  { id: 'extensions', name: 'Extensions (op aanvraag)', duration: '180 min', price: 'Op aanvraag', category: 'Extensions' },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00', '17:30',
  // Donderdag avond
  '18:00', '18:30', '19:00', '19:30'
]

export default function BookingSystem() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Naam moet minimaal 2 karakters bevatten'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefoonnummer is verplicht'
    } else if (!/^06[\s-]?[0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Voer een geldig Nederlands mobiel nummer in (06xxxxxxxx)'
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Voer een geldig e-mailadres in'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setStep(3)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
          customer: formData
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Er is een fout opgetreden')
      }
      
      console.log('Booking submitted successfully:', result)
      setStep(4)
    } catch (error: any) {
      console.error('Booking error:', error)
      setSubmitError(error.message || 'Er is een fout opgetreden bij het maken van de afspraak. Probeer het opnieuw of neem telefonisch contact op.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Skip Sundays and Mondays (gesloten)
      if (date.getDay() !== 0 && date.getDay() !== 1) {
        dates.push(date)
      }
    }
    return dates
  }

  const formatDate = (date: Date) => {
    const days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
    const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      full: date.toISOString().split('T')[0]
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8" role="form" aria-label="Afspraak boeken">
      {/* Progress Steps */}
      <nav aria-label="Boekingsstappen" className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}
              aria-current={step === s ? 'step' : undefined}
              aria-label={`Stap ${s} ${step > s ? '(voltooid)' : step === s ? '(huidig)' : ''}`}
            >
              {s}
            </div>
            {s < 3 && (
              <div 
                className={`w-16 h-1 mx-2 ${
                  step > s ? 'bg-primary-500' : 'bg-neutral-200'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </nav>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div>
          <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">Kies een behandeling</h3>
          <p className="text-neutral-500 mb-6">Selecteer de service die je wilt boeken</p>
          
          {['Knippen', 'Kleuren', 'Krullen', 'Extensions'].map((category) => (
            <div key={category} className="mb-6">
              <h4 className="font-display text-lg font-semibold text-neutral-900 mb-3">{category}</h4>
              <div className="space-y-2">
                {services.filter(s => s.category === category).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-neutral-100 hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                  >
                    <div>
                      <p className="font-semibold text-neutral-900">{service.name}</p>
                      <p className="text-sm text-neutral-500">{service.duration}</p>
                    </div>
                    <span className="font-display font-bold text-primary-600">{service.price}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && selectedService && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-neutral-900">Kies datum & tijd</h3>
              <p className="text-neutral-500">{selectedService.name} • {selectedService.duration}</p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Wijzig service
            </button>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <p className="font-semibold text-neutral-900 mb-3">Datum</p>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {generateDates().map((date) => {
                const formatted = formatDate(date)
                return (
                  <button
                    key={formatted.full}
                    onClick={() => setSelectedDate(formatted.full)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedDate === formatted.full
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    <p className="text-xs uppercase">{formatted.day}</p>
                    <p className="font-bold text-lg">{formatted.date}</p>
                    <p className="text-xs">{formatted.month}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="mb-6">
              <p className="font-semibold text-neutral-900 mb-3">Tijd</p>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-4 rounded-lg font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleDateTimeSelect}
            disabled={!selectedDate || !selectedTime}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Volgende stap
          </button>
        </div>
      )}

      {/* Step 3: Customer Details */}
      {step === 3 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-neutral-900">Jouw gegevens</h3>
              <p className="text-neutral-500">
                {selectedService?.name} • {selectedDate} • {selectedTime}
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Wijzig datum/tijd
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700" role="alert" aria-live="polite">
                <p className="font-medium">Er is een fout opgetreden</p>
                <p className="text-sm">{submitError}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Naam *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({...formData, name: e.target.value})
                  if (errors.name) setErrors({...errors, name: ''})
                }}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                }`}
                placeholder="Je volledige naam"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1" role="alert" aria-live="polite">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Telefoon *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({...formData, phone: e.target.value})
                  if (errors.phone) setErrors({...errors, phone: ''})
                }}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                  errors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                }`}
                placeholder="06 1234 5678"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1" role="alert" aria-live="polite">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value})
                  if (errors.email) setErrors({...errors, email: ''})
                }}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                }`}
                placeholder="je@email.nl (optioneel)"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1" role="alert" aria-live="polite">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Opmerkingen</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                placeholder="Bijv. allergieën, speciale wensen..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Bezig met boeken...
                  </>
                ) : (
                  'Bevestig afspraak'
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center mt-3">
                Door te boeken ga je akkoord met onze{' '}
                <a href="/voorwaarden" className="text-primary-600 hover:underline">algemene voorwaarden</a>
              </p>
            </div>
          </form>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">Afspraak bevestigd!</h3>
          <p className="text-neutral-600 mb-6">
            Bedankt {formData.name}! Je afspraak is succesvol geboekt.
          </p>
          <div className="bg-neutral-50 rounded-xl p-6 mb-6 text-left">
            <p className="font-semibold text-neutral-900">{selectedService?.name}</p>
            <p className="text-neutral-600">{selectedDate} om {selectedTime}</p>
            <p className="text-neutral-500 text-sm mt-2">{formData.phone}</p>
          </div>
          <p className="text-sm text-neutral-500 mb-6">
            Je ontvangt een bevestiging via {formData.email || 'SMS'}.
            <br />
            Tot snel bij HairsalonX!
          </p>
          <button
            onClick={() => {
              setStep(1)
              setSelectedService(null)
              setSelectedDate('')
              setSelectedTime('')
              setFormData({ name: '', email: '', phone: '', notes: '' })
              setErrors({})
            }}
            className="btn-secondary"
          >
            Nieuwe afspraak maken
          </button>
        </div>
      )}
    </div>
  )
}
