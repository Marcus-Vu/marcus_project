/**
 * HAIRSALONX BOOKING API - SUPABASE CLIENT
 * 
 * This module initializes the Supabase client for database operations.
 * Requires the following environment variables in .env.local:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key
 * - SUPABASE_SERVICE_ROLE_KEY: (Server-side only) For admin operations
 * 
 * @see https://supabase.com/docs/reference/javascript/initializing
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Create a mock client for build-time when env vars are not set
function createMockClient(): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get() {
      return () => ({
        data: null,
        error: new Error('Supabase not configured'),
      })
    },
  })
}

// Client-side Supabase client (uses anon key)
export const supabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

// Server-side Supabase client (uses service role key for admin operations)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabaseClient

// Database schema for bookings table:
/*
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  service_duration INTEGER,           -- Duration in minutes
  service_price DECIMAL(10,2),        -- Price in euros
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',      -- pending, confirmed, cancelled
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for efficient date-based queries
CREATE INDEX idx_bookings_date ON bookings(booking_date);

-- Index for status queries
CREATE INDEX idx_bookings_status ON bookings(status);
*/