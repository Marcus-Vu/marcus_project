-- HairsalonX Multi-Tenant Schema Migration
-- Run this in Supabase SQL Editor to set up the multi-tenant structure

-- =====================================================
-- 1. Create salons table
-- =====================================================
CREATE TABLE IF NOT EXISTS salons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  opening_hours JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_salons_slug ON salons(slug);

-- =====================================================
-- 2. Insert demo salon
-- =====================================================
INSERT INTO salons (slug, name, email, phone)
VALUES ('demo-salon', 'Demo Salon', 'info@demo-salon.com', '+31 6 12345678')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 3. Add salon_id to bookings table (if not exists)
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'salon_id'
  ) THEN
    -- Add salon_id column
    ALTER TABLE bookings ADD COLUMN salon_id UUID;
    
    -- Create foreign key constraint
    ALTER TABLE bookings 
      ADD CONSTRAINT fk_bookings_salon 
      FOREIGN KEY (salon_id) REFERENCES salons(id) ON DELETE CASCADE;
    
    -- Create indexes
    CREATE INDEX idx_bookings_salon ON bookings(salon_id);
    CREATE INDEX idx_bookings_salon_date ON bookings(salon_id, booking_date);
    
    -- Update existing bookings to use demo salon
    UPDATE bookings 
    SET salon_id = (SELECT id FROM salons WHERE slug = 'demo-salon')
    WHERE salon_id IS NULL;
    
    -- Make salon_id required for future inserts
    ALTER TABLE bookings ALTER COLUMN salon_id SET NOT NULL;
  END IF;
END $$;

-- =====================================================
-- 4. Enable RLS (Row Level Security) for multi-tenancy
-- =====================================================
-- Enable RLS on salons table
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;

-- Allow read access to all salons (public)
CREATE POLICY IF NOT EXISTS salons_select_public ON salons
  FOR SELECT USING (true);

-- Allow insert/update only with service role (admin)
CREATE POLICY IF NOT EXISTS salons_admin_all ON salons
  FOR ALL USING (auth.role() = 'service_role');

-- Enable RLS on bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow read access to bookings based on salon_id
CREATE POLICY IF NOT EXISTS bookings_select_public ON bookings
  FOR SELECT USING (true);

-- Allow insert/update with service role
CREATE POLICY IF NOT EXISTS bookings_admin_all ON bookings
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 5. Verify setup
-- =====================================================
SELECT 'Salons table created/updated' as status;
SELECT * FROM salons WHERE slug = 'demo-salon';
