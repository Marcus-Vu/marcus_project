import { NextResponse } from 'next/server'

// Booking API Route
// Saves bookings to Supabase and sends email notification

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { service, date, time, customer } = body

    // Validate required fields
    if (!service || !date || !time || !customer?.name || !customer?.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create booking object
    const booking = {
      id: generateBookingId(),
      service: service.name,
      duration: service.duration,
      price: service.price,
      date,
      time,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email || null,
      notes: customer.notes || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // Try to save to Supabase if configured
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_ANON_KEY
    
    if (supabaseUrl && supabaseKey && 
        supabaseUrl !== 'your_supabase_url_here' && 
        supabaseKey !== 'your_supabase_anon_key_here') {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        const { error } = await supabase
          .from('bookings')
          .insert([booking])
        
        if (error) {
          console.error('Supabase error:', error)
        }
      } catch (dbError) {
        console.error('Database error:', dbError)
      }
    }

    // Try to send email notification if Resend is configured
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && resendKey !== 'your_resend_api_key_here') {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendKey)
        
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'boekingen@hairsalonx.nl',
          to: process.env.EMAIL_TO || 'info@hairsalonx.nl',
          subject: `Nieuwe afspraak: ${customer.name} - ${service.name}`,
          html: generateEmailTemplate(booking),
        })
      } catch (emailError) {
        console.error('Email error:', emailError)
      }
    }

    // Log booking (always works, even without external services)
    console.log('Booking received:', booking)

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: 'Afspraak succesvol ontvangen. Je ontvangt een bevestiging.',
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `HSX-${timestamp}-${random}`
}

function generateEmailTemplate(booking: any): string {
  return `
    <h2>Nieuwe afspraak bij HairsalonX</h2>
    <p><strong>Boeking ID:</strong> ${booking.id}</p>
    <hr />
    <h3>Behandeling</h3>
    <p><strong>Service:</strong> ${booking.service}</p>
    <p><strong>Duur:</strong> ${booking.duration}</p>
    <p><strong>Prijs:</strong> ${booking.price}</p>
    <hr />
    <h3>Datum & Tijd</h3>
    <p><strong>Datum:</strong> ${booking.date}</p>
    <p><strong>Tijd:</strong> ${booking.time}</p>
    <hr />
    <h3>Klantgegevens</h3>
    <p><strong>Naam:</strong> ${booking.customerName}</p>
    <p><strong>Telefoon:</strong> ${booking.customerPhone}</p>
    ${booking.customerEmail ? `<p><strong>Email:</strong> ${booking.customerEmail}</p>` : ''}
    ${booking.notes ? `<p><strong>Opmerkingen:</strong> ${booking.notes}</p>` : ''}
    <hr />
    <p><strong>Status:</strong> ${booking.status}</p>
    <p><strong>Aangemaakt op:</strong> ${new Date(booking.createdAt).toLocaleString('nl-NL')}</p>
  `
}
