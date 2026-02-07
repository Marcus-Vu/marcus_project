import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, checkEmailService } from '@/lib/email';

// POST /api/email/send - Send an email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, template, data, from } = body;

    // Validate required fields
    if (!to || !template) {
      return NextResponse.json(
        { error: 'Missing required fields: to, template' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email - force test domain to avoid verification issues
    const result = await sendEmail({
      to,
      template,
      data: data || {},
      from: 'onboarding@resend.dev', // Hardcoded test domain
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, mock: result.mock },
        { status: result.mock ? 503 : 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
