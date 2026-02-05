/**
 * HAIRSALONX BOOKING API - GET /api/v1/:salonSlug/services
 * 
 * Returns all active services for a specific salon, grouped by category.
 * 
 * PATH PARAMETERS:
 * - salonSlug: string (required) - The unique identifier for the salon (e.g., 'demo-salon')
 * 
 * RESPONSE:
 * - 200: { services: Service[], categories: string[], salon: object }
 * - 400: Missing or invalid salon slug
 * - 404: Salon not found
 * - 500: Server error
 * 
 * EXAMPLE RESPONSE:
 * {
 *   "services": [
 *     {
 *       "id": "uuid",
 *       "name": "Knippen dames",
 *       "description": "Inclusief wassen en stylen",
 *       "duration": 45,
 *       "price": 35.00,
 *       "category": "Knippen",
 *       "display_order": 1
 *     }
 *   ],
 *   "categories": ["Knippen", "Kleuren", "Krullen", "Extensions"],
 *   "salon": {
 *     "id": "uuid",
 *     "name": "Demo Salon",
 *     "slug": "demo-salon"
 *   }
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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

    // Check if salon exists
    const { data: salon, error: salonError } = await supabaseAdmin
      .from('salons')
      .select('id, name, slug, email, phone, address')
      .eq('slug', salonSlug)
      .single()

    if (salonError || !salon) {
      console.error('Salon not found:', salonSlug, salonError)
      return NextResponse.json(
        { error: 'Salon not found', slug: salonSlug },
        { status: 404 }
      )
    }

    // Fetch active services for this salon
    const { data: services, error: servicesError } = await supabaseAdmin
      .from('services')
      .select('id, name, description, duration, price, category, display_order, is_active')
      .eq('salon_id', salon.id)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('name', { ascending: true })

    if (servicesError) {
      console.error('Error fetching services:', servicesError)
      return NextResponse.json(
        { error: 'Failed to fetch services', details: servicesError.message },
        { status: 500 }
      )
    }

    // Extract unique categories in order of appearance
    const categories = Array.from(new Set(services?.map(s => s.category) || []))

    return NextResponse.json(
      {
        services: services || [],
        categories,
        salon: {
          id: salon.id,
          name: salon.name,
          slug: salon.slug,
          email: salon.email,
          phone: salon.phone,
          address: salon.address
        },
        count: services?.length || 0
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in GET /api/v1/:salonSlug/services:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
