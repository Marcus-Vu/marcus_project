/**
 * HAIRSALONX BOOKING API - GET /api/v1/:salonSlug/availability
 * 
 * Returns available time slots for a given date for a specific salon.
 * 
 * PATH PARAMETERS:
 * - salonSlug: string (required) - The unique identifier for the salon (e.g., 'demo-salon')
 * 
 * QUERY PARAMETERS:
 * - date: string (required) - Date in YYYY-MM-DD format
 * 
 * RESPONSE:
 * - 200: { availableSlots: string[], salon: object } - Array of available times (HH:MM)
 * - 400: Missing or invalid parameters
 * - 404: Salon not found
 * - 500: Server error
 * 
 * LOGIC:
 * - Validates salon exists in database
 * - Returns all time slots minus already booked slots
 * - Excludes past times for today
 * - Ignores cancelled bookings
 * - Salon is closed on Sunday (0) and Monday (1)
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Standard time slots for the salon
const STANDARD_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00', '17:30'
]

// Extended slots for Thursday evening
const THURSDAY_EXTENDED_SLOTS = [
  ...STANDARD_TIME_SLOTS,
  '18:00', '18:30', '19:00', '19:30'
]

export async function GET(
  request: NextRequest,
  { params }: { params: { salonSlug: string } }
) {
  try {
    const { salonSlug } = params

    // Validate salonSlug parameter
    if (!salonSlug) {
      return NextResponse.json(
        { error: 'Salon slug is required' },
        { status: 400 }
      )
    }

    // Get date from query parameters
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    // Validate date parameter
    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
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

    // Check if salon exists
    const { data: salon, error: salonError } = await supabaseAdmin
      .from('salons')
      .select('*')
      .eq('slug', salonSlug)
      .single()

    if (salonError || !salon) {
      console.error('Salon not found:', salonSlug, salonError)
      return NextResponse.json(
        { error: 'Salon not found', slug: salonSlug },
        { status: 404 }
      )
    }

    // Parse the date
    const requestedDate = new Date(date + 'T00:00:00')
    const dayOfWeek = requestedDate.getDay() // 0 = Sunday, 1 = Monday, etc.

    // Check if salon is closed (Sunday = 0, Monday = 1)
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return NextResponse.json(
        { 
          availableSlots: [], 
          message: 'Salon is closed on Sundays and Mondays',
          salon: {
            id: salon.id,
            name: salon.name,
            slug: salon.slug
          }
        },
        { status: 200 }
      )
    }

    // Determine which time slots to use
    // Thursday (4) has extended evening hours
    const isThursday = dayOfWeek === 4
    let allSlots = isThursday ? THURSDAY_EXTENDED_SLOTS : STANDARD_TIME_SLOTS

    // Get already booked slots for this date and salon
    const { data: bookedSlots, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .eq('salon_id', salon.id)
      .neq('status', 'cancelled')

    if (fetchError) {
      console.error('Error fetching booked slots:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch availability' },
        { status: 500 }
      )
    }

    // Extract booked times (remove seconds from TIME format)
    const bookedTimes = new Set(
      bookedSlots?.map(b => b.booking_time.substring(0, 5)) || []
    )

    // Filter out booked slots
    let availableSlots = allSlots.filter(slot => !bookedTimes.has(slot))

    // If the requested date is today, filter out past times
    const today = new Date()
    const isToday = requestedDate.toDateString() === today.toDateString()
    
    if (isToday) {
      const currentHour = today.getHours()
      const currentMinute = today.getMinutes()
      const currentTime = currentHour * 60 + currentMinute

      availableSlots = availableSlots.filter(slot => {
        const [hour, minute] = slot.split(':').map(Number)
        const slotTime = hour * 60 + minute
        // Require at least 1 hour notice for bookings
        return slotTime > currentTime + 60
      })
    }

    return NextResponse.json(
      { 
        availableSlots,
        date,
        isToday,
        totalSlots: allSlots.length,
        bookedCount: bookedTimes.size,
        salon: {
          id: salon.id,
          name: salon.name,
          slug: salon.slug
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in GET /api/v1/:salonSlug/availability:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
