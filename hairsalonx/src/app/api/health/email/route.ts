import { NextRequest, NextResponse } from 'next/server';
import { checkEmailService } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/health/email - Check email service health
export async function GET(request: NextRequest) {
  try {
    const emailHealth = await checkEmailService();
    
    // Check Supabase connection
    let supabaseHealth = { configured: false, status: 'unknown' };
    try {
      const { data, error } = await supabaseAdmin.from('salons').select('count').single();
      if (!error) {
        supabaseHealth = { configured: true, status: 'connected' };
      } else {
        supabaseHealth = { configured: false, status: 'error', error: error.message };
      }
    } catch (e) {
      supabaseHealth = { configured: false, status: 'error', error: 'Connection failed' };
    }

    // Overall status
    const overallStatus = emailHealth.configured && supabaseHealth.configured ? 'healthy' : 'degraded';
    const statusCode = overallStatus === 'healthy' ? 200 : 503;

    return NextResponse.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      services: {
        email: emailHealth,
        supabase: supabaseHealth,
      },
      environment: {
        node_env: process.env.NODE_ENV || 'development',
        has_resend_key: !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_mock_key',
        has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock'),
      },
    }, { status: statusCode });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
