/**
 * HAIRSALONX BOOKING API - POST /api/bookings
 * 
 * Creates a new booking in the database and sends confirmation emails.
 * 
 * REQUEST BODY:
 * {
 *   service: {
 *     name: string,
 *     duration?: number,  // in minutes
 *     price?: number
 *   },
 *   date: string,         // YYYY-MM-DD
 *   time: string,         // HH:MM
 *   customer: {
 *     name: string,
 *     phone: string,
 *     email?: string,
 *     notes?: string
 *   }
 * }
 * 
 * RESPONSE:
 * - 201: Booking created successfully
 * - 400: Invalid request data
 * - 409: Time slot already booked
 * - 500: Server error
 * 
 * SIDE EFFECTS:
 * - Creates record in 'bookings' table
 * - Sends confirmation email to customer (if email provided)
 * - Sends notification email to admin (info@hairsalonx.nl)
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendCustomerConfirmation, sendAdminNotification } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { service, date, time, customer } = body
    
    if (!service?.name || !date || !time || !customer?.name || !customer?.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(time)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM' },
        { status: 400 }
      )
    }

    // Check if time slot is already booked
    // This prevents double bookings for the same date + time
    const { data: existingBooking, error: checkError } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('booking_time', time + ':00')  // Add seconds for TIME type
      .neq('status', 'cancelled')         // Ignore cancelled bookings
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows found (which is what we want)
      console.error('Error checking existing booking:', checkError)
      return NextResponse.json(
        { error: 'Failed to check availability' },
        { status: 500 }
      )
    }

    if (existingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      )
    }

    // Parse duration from string (e.g., "45 min" -> 45)
    let duration: number | null = null
    if (service.duration) {
      const durationMatch = String(service.duration).match(/(\d+)/)
      if (durationMatch) {
        duration = parseInt(durationMatch[1], 10)
      }
    }

    // Parse price from string (e.g., "€35" -> 35.00)
    let price: number | null = null
    if (service.price && service.price !== 'Op aanvraag') {
      const priceMatch = String(service.price).match(/[\d,.]+/)
      if (priceMatch) {
        price = parseFloat(priceMatch[0].replace(',', '.'))
      }
    }

    // Insert booking into database
    const { data: booking, error: insertError } = await supabaseAdmin
      .from('bookings')
      .insert({
        service_name: service.name,
        service_duration: duration,
        service_price: price,
        booking_date: date,
        booking_time: time + ':00',  // Add seconds for TIME type
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email || null,
        notes: customer.notes || null,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating booking:', insertError)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // Send confirmation emails (don't fail if email fails)
    try {
      await Promise.all([
        sendCustomerConfirmation(booking),
        sendAdminNotification(booking)
      ])
    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      // Don't return error - booking is still created
    }

    return NextResponse.json(
      { 
        success: true, 
        booking: {
          id: booking.id,
          service_name: booking.service_name,
          booking_date: booking.booking_date,
          booking_time: booking.booking_time,
          customer_name: booking.customer_name,
          status: booking.status
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error in POST /api/bookings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}