/**
 * HAIRSALONX BOOKING API - Root Endpoint
 * 
 * Returns API information and available endpoints.
 * 
 * GET /
 * Returns: API name, version, and available endpoints
 */

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    name: 'HairsalonX Booking API',
    version: '1.0.0',
    description: 'Multi-tenant booking system for hair salons',
    endpoints: {
      'GET /api': 'This documentation',
      'GET /api/v1/:salonSlug/availability?date=YYYY-MM-DD': 'Get available time slots for a salon on a specific date',
      'POST /api/v1/:salonSlug/bookings': 'Create a new booking for a salon',
      'GET /api/v1/:salonSlug/bookings/:id': 'Get booking details',
      'PATCH /api/v1/:salonSlug/bookings/:id/confirm': 'Confirm a booking',
      'GET /api/reviews': 'Get salon reviews'
    },
    documentation: 'See README.md for detailed API documentation'
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
