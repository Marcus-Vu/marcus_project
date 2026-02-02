/**
 * HAIRSALONX BOOKING API - EMAIL SERVICE
 * 
 * This module handles email notifications using Resend.
 * Requires the following environment variable in .env.local:
 * - RESEND_API_KEY: Your Resend API key from https://resend.com
 * 
 * Email addresses:
 * - Customer: receives booking confirmation
 * - Admin (Josje): receives booking notification at info@hairsalonx.nl
 * 
 * @see https://resend.com/docs
 */

import { Resend } from 'resend'

// Initialize Resend with API key (only on server-side)
const resendApiKey = process.env.RESEND_API_KEY || ''

// Create Resend instance only if API key is available (server-side)
export const resend = (typeof window === 'undefined' && resendApiKey) 
  ? new Resend(resendApiKey) 
  : null

// Email addresses
export const ADMIN_EMAIL = 'info@hairsalonx.nl'
export const FROM_EMAIL = 'HairsalonX <info@hairsalonx.nl>'

/**
 * Booking data interface for email templates
 */
export interface BookingEmailData {
  id: string
  service_name: string
  service_duration?: number
  service_price?: number
  booking_date: string
  booking_time: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  notes?: string
  status: string
}

/**
 * Send booking confirmation email to customer
 */
export async function sendCustomerConfirmation(booking: BookingEmailData): Promise<void> {
  if (!resend || !booking.customer_email) return

  const formattedDate = new Date(booking.booking_date).toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const durationText = booking.service_duration 
    ? ` (${booking.service_duration} minuten)` 
    : ''

  const priceText = booking.service_price 
    ? ` - €${booking.service_price.toFixed(2)}` 
    : ''

  await resend.emails.send({
    from: FROM_EMAIL,
    to: booking.customer_email,
    subject: `Afspraak bevestigd - HairsalonX`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Afspraak bevestigd</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #c9a962;">Afspraak bevestigd!</h1>
          
          <p>Beste ${booking.customer_name},</p>
          
          <p>Je afspraak bij HairsalonX is succesvol geboekt. Hier zijn de details:</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">${booking.service_name}${durationText}${priceText}</h3>
            <p style="margin: 5px 0;"><strong>Datum:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Tijd:</strong> ${booking.booking_time}</p>
            ${booking.notes ? `<p style="margin: 5px 0;"><strong>Opmerkingen:</strong> ${booking.notes}</p>` : ''}
          </div>
          
          <p>Adres: Adresstraat 123, 1234 AB Amsterdam</p>
          
          <p>Wil je je afspraak wijzigen of annuleren? Neem dan contact met ons op via <a href="tel:+31612345678">06-12345678</a> of antwoord op deze e-mail.</p>
          
          <p style="margin-top: 30px;">
            Met vriendelijke groet,<br>
            <strong>Josje & Team HairsalonX</strong>
          </p>
        </div>
      </body>
      </html>
    `
  })
}

/**
 * Send booking notification email to admin (Josje)
 */
export async function sendAdminNotification(booking: BookingEmailData): Promise<void> {
  if (!resend) return

  const formattedDate = new Date(booking.booking_date).toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const durationText = booking.service_duration 
    ? ` (${booking.service_duration} min)` 
    : ''

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nieuwe afspraak: ${booking.customer_name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nieuwe afspraak</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #c9a962;">Nieuwe afspraak geboekt</h1>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">${booking.service_name}${durationText}</h3>
            <p style="margin: 5px 0;"><strong>Datum:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Tijd:</strong> ${booking.booking_time}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Klant:</strong> ${booking.customer_name}</p>
            <p style="margin: 5px 0;"><strong>Telefoon:</strong> ${booking.customer_phone}</p>
            ${booking.customer_email ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${booking.customer_email}</p>` : ''}
            ${booking.notes ? `<p style="margin: 5px 0;"><strong>Opmerkingen:</strong> ${booking.notes}</p>` : ''}
          </div>
          
          <p>Bevestig deze afspraak in het <a href="https://supabase.com/dashboard">admin dashboard</a>.</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Boeking ID: ${booking.id}<br>
            Status: ${booking.status}
          </p>
        </div>
      </body>
      </html>
    `
  })
}