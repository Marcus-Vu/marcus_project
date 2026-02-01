/**
 * HAIRSALONX BOOKING API - PATCH /api/bookings/:id/confirm
 * 
 * Updates a booking status to 'confirmed'.
 * 
 * URL PARAMETERS:
 * - id: UUID of the booking to confirm
 * 
 * REQUEST BODY (optional):
 * {
 *   status?: string  - Can be 'confirmed' or 'cancelled'
 * }
 * 
 * RESPONSE:
 * - 200: Booking updated successfully
 * - 400: Invalid booking ID
 * - 404: Booking not found
 * - 500: Server error
 * 
 * USAGE:
 * Used by admin dashboard to confirm or cancel bookings.
 * Default action is to set status to 'confirmed'.
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Validate booking ID (UUID format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'Invalid booking ID format' },
        { status: 400 }
      )
    }

    // Parse request body for optional status override
    let newStatus = 'confirmed'
    try {
      const body = await request.json()
      if (body.status && ['confirmed', 'cancelled'].includes(body.status)) {
        newStatus = body.status
      }
    } catch {
      // No body provided, use default 'confirmed'
    }

    // Update booking status
    const { data: booking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }
      console.error('Error updating booking:', updateError)
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        message: `Booking ${newStatus} successfully`,
        booking: {
          id: booking.id,
          service_name: booking.service_name,
          booking_date: booking.booking_date,
          booking_time: booking.booking_time,
          customer_name: booking.customer_name,
          status: booking.status
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in PATCH /api/bookings/:id/confirm:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}