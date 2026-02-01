-- ============================================================================
-- HAIRSALONX BOOKING DATABASE SCHEMA
-- ============================================================================
-- 
-- This SQL script sets up the database schema for the HairsalonX booking system.
-- Run this in your Supabase SQL Editor to create the necessary tables and indexes.
--
-- Instructions:
-- 1. Go to https://supabase.com and create a free project
-- 2. Open the SQL Editor in your project dashboard
-- 3. Copy and paste this entire script
-- 4. Click "Run" to execute
--
-- ============================================================================

-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  service_duration INTEGER,           -- Duration in minutes (e.g., 45, 90, 120)
  service_price DECIMAL(10,2),        -- Price in euros (e.g., 35.00, 55.00)
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',      -- Values: 'pending', 'confirmed', 'cancelled'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add table comment for documentation
COMMENT ON TABLE bookings IS 'Stores all salon booking appointments';

-- Add column comments
COMMENT ON COLUMN bookings.id IS 'Unique identifier for the booking (UUID)';
COMMENT ON COLUMN bookings.service_name IS 'Name of the service booked (e.g., "Knippen dames")';
COMMENT ON COLUMN bookings.service_duration IS 'Service duration in minutes';
COMMENT ON COLUMN bookings.service_price IS 'Service price in EUR';
COMMENT ON COLUMN bookings.booking_date IS 'Date of the appointment (YYYY-MM-DD)';
COMMENT ON COLUMN bookings.booking_time IS 'Time of the appointment (HH:MM:SS)';
COMMENT ON COLUMN bookings.customer_name IS 'Full name of the customer';
COMMENT ON COLUMN bookings.customer_phone IS 'Customer phone number (Dutch format preferred)';
COMMENT ON COLUMN bookings.customer_email IS 'Customer email address (optional)';
COMMENT ON COLUMN bookings.notes IS 'Additional notes or special requests';
COMMENT ON COLUMN bookings.status IS 'Booking status: pending, confirmed, or cancelled';
COMMENT ON COLUMN bookings.created_at IS 'Timestamp when booking was created';

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON bookings(booking_date, status);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for public booking form)
CREATE POLICY "Allow anonymous bookings" 
  ON bookings 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy to allow anonymous reads for availability checks
CREATE POLICY "Allow anonymous availability checks" 
  ON bookings 
  FOR SELECT 
  TO anon 
  USING (true);

-- Note: Admin operations should use the service role key
-- or be performed through a separate admin interface

-- ============================================================================
-- SAMPLE QUERIES (for reference)
-- ============================================================================

-- Get all bookings for a specific date
-- SELECT * FROM bookings WHERE booking_date = '2025-02-15';

-- Get all pending bookings
-- SELECT * FROM bookings WHERE status = 'pending' ORDER BY booking_date, booking_time;

-- Get bookings for next 7 days
-- SELECT * FROM bookings 
-- WHERE booking_date >= CURRENT_DATE 
--   AND booking_date <= CURRENT_DATE + INTERVAL '7 days'
-- ORDER BY booking_date, booking_time;

-- Count bookings by status
-- SELECT status, COUNT(*) FROM bookings GROUP BY status;

-- ============================================================================
-- NEXT STEPS AFTER RUNNING THIS SCRIPT
-- ============================================================================
-- 
-- 1. Copy your Supabase credentials to .env.local:
--    - Project URL: Settings > API > Project URL
--    - Anon Key: Settings > API > Project API keys > anon public
--    - Service Role Key: Settings > API > Project API keys > service_role (KEEP SECRET!)
--
-- 2. Sign up at https://resend.com and get your API key
--
-- 3. Update .env.local with all required variables
--