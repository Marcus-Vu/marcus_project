/**
 * HAIRSALONX BOOKING API - GET /api/v1/:salonSlug/staff
 * 
 * Returns all active staff members for a specific salon.
 * 
 * PATH PARAMETERS:
 * - salonSlug: string (required) - The unique identifier for the salon (e.g., 'demo-salon')
 * 
 * RESPONSE:
 * - 200: { staff: StaffMember[], salon: object }
 * - 400: Missing or invalid salon slug
 * - 404: Salon not found
 * - 500: Server error
 * 
 * EXAMPLE RESPONSE:
 * {
 *   "staff": [
 *     {
 *       "id": "uuid",
 *       "name": "Josje",
 *       "role": "Eigenaar & Stylist",
 *       "bio": "Specialist in krullen en extensions...",
 *       "photo_url": "https://...",
 *       "specialties": ["Krullen", "Extensions", "Kleuren"],
 *       "display_order": 1
 *     }
 *   ],
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

    // Fetch active staff members for this salon
    const { data: staff, error: staffError } = await supabaseAdmin
      .from('staff')
      .select('id, name, role, bio, photo_url, email, phone, specialties, display_order, is_active')
      .eq('salon_id', salon.id)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('name', { ascending: true })

    if (staffError) {
      console.error('Error fetching staff:', staffError)
      return NextResponse.json(
        { error: 'Failed to fetch staff members', details: staffError.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        staff: staff || [],
        salon: {
          id: salon.id,
          name: salon.name,
          slug: salon.slug,
          email: salon.email,
          phone: salon.phone,
          address: salon.address
        },
        count: staff?.length || 0
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in GET /api/v1/:salonSlug/staff:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
