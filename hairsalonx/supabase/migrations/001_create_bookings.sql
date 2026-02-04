-- HairsalonX Database Schema
-- Run this in Supabase SQL Editor after creating project

-- Bookings table
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
  status TEXT DEFAULT 'pending',      -- pending, confirmed, cancelled, completed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date_time ON bookings(booking_date, booking_time);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for booking form)
CREATE POLICY "Allow anonymous inserts" ON bookings
  FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous reads for availability checks
CREATE POLICY "Allow anonymous date checks" ON bookings
  FOR SELECT TO anon USING (true);

-- Note: For admin operations, use service_role key (bypasses RLS)
