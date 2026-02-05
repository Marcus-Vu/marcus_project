-- HairsalonX Services and Staff Tables Migration
-- Run this in Supabase SQL Editor to add services and staff tables

-- =====================================================
-- 1. Create services table
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,           -- Duration in minutes
  price DECIMAL(10,2),                 -- Price in euros (NULL for 'Op aanvraag')
  category TEXT NOT NULL,              -- e.g., 'Knippen', 'Kleuren', 'Krullen', 'Extensions'
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for services
CREATE INDEX IF NOT EXISTS idx_services_salon ON services(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);

-- Add comments
COMMENT ON TABLE services IS 'Services offered by each salon';
COMMENT ON COLUMN services.duration IS 'Duration in minutes (e.g., 45, 90, 120)';
COMMENT ON COLUMN services.price IS 'Price in EUR (NULL for on request)';
COMMENT ON COLUMN services.category IS 'Service category (Knippen, Kleuren, Krullen, Extensions)';

-- =====================================================
-- 2. Create staff table
-- =====================================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,                  -- e.g., 'Stylist', 'Colorist', 'Assistant'
  bio TEXT,                            -- Short biography
  photo_url TEXT,                      -- URL to staff photo
  email TEXT,
  phone TEXT,
  specialties TEXT[],                  -- Array of specialties (e.g., ['Krullen', 'Extensions'])
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for staff
CREATE INDEX IF NOT EXISTS idx_staff_salon ON staff(salon_id);
CREATE INDEX IF NOT EXISTS idx_staff_active ON staff(is_active);

-- Add comments
COMMENT ON TABLE staff IS 'Staff members for each salon';
COMMENT ON COLUMN staff.role IS 'Job role/title (Stylist, Colorist, Assistant, etc.)';
COMMENT ON COLUMN staff.specialties IS 'Array of specialty services';

-- =====================================================
-- 3. Enable RLS (Row Level Security)
-- =====================================================

-- Services table policies
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS services_select_public ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY IF NOT EXISTS services_admin_all ON services
  FOR ALL USING (auth.role() = 'service_role');

-- Staff table policies
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS staff_select_public ON staff
  FOR SELECT USING (is_active = true);

CREATE POLICY IF NOT EXISTS staff_admin_all ON staff
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 4. Insert sample data for demo-salon
-- =====================================================
DO $$
DECLARE
  demo_salon_id UUID;
BEGIN
  -- Get demo-salon ID
  SELECT id INTO demo_salon_id FROM salons WHERE slug = 'demo-salon' LIMIT 1;
  
  -- Only insert if demo-salon exists and has no services yet
  IF demo_salon_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM services WHERE salon_id = demo_salon_id) THEN
    -- Insert Knippen services
    INSERT INTO services (salon_id, name, description, duration, price, category, display_order) VALUES
    (demo_salon_id, 'Knippen dames', 'Inclusief wassen en stylen', 45, 35.00, 'Knippen', 1),
    (demo_salon_id, 'Knippen heren', 'Inclusief wassen', 30, 25.00, 'Knippen', 2),
    (demo_salon_id, 'Knippen kinderen', 'Tot 12 jaar', 30, 18.00, 'Knippen', 3);
    
    -- Insert Kleuren services
    INSERT INTO services (salon_id, name, description, duration, price, category, display_order) VALUES
    (demo_salon_id, 'Full color', 'Complete kleurbehandeling', 90, 55.00, 'Kleuren', 4),
    (demo_salon_id, 'Highlights / Lowlights', 'Gedeeltelijke kleur', 120, 65.00, 'Kleuren', 5),
    (demo_salon_id, 'Balayage', 'Natuurlijke verloop kleuring', 150, 85.00, 'Kleuren', 6),
    (demo_salon_id, 'Uitgroei bijwerken', 'Bijwerken van uitgroei', 75, 45.00, 'Kleuren', 7);
    
    -- Insert Krullen services
    INSERT INTO services (salon_id, name, description, duration, price, category, display_order) VALUES
    (demo_salon_id, 'Curly cut', 'Specialistische krullenknip', 60, 45.00, 'Krullen', 8),
    (demo_salon_id, 'Curl defining behandeling', 'Definieer je krullen', 45, 35.00, 'Krullen', 9);
    
    -- Insert Extensions services
    INSERT INTO services (salon_id, name, description, duration, price, category, display_order) VALUES
    (demo_salon_id, 'Extensions', 'Volume en lengte op maat', 180, NULL, 'Extensions', 10);
  END IF;
  
  -- Insert staff members if none exist
  IF demo_salon_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM staff WHERE salon_id = demo_salon_id) THEN
    INSERT INTO staff (salon_id, name, role, bio, specialties, display_order) VALUES
    (demo_salon_id, 'Josje', 'Eigenaar & Stylist', 'Specialist in krullen en extensions met meer dan 15 jaar ervaring.', ARRAY['Krullen', 'Extensions', 'Kleuren'], 1),
    (demo_salon_id, 'Emma', 'Colorist', 'Expert in kleurtechnieken en balayage.', ARRAY['Kleuren', 'Balayage', 'Highlights'], 2),
    (demo_salon_id, 'Lisa', 'Stylist', 'Gespecialiseerd in knippen en styling.', ARRAY['Knippen', 'Styling'], 3);
  END IF;
END $$;

-- =====================================================
-- 5. Create triggers for updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 6. Verify setup
-- =====================================================
SELECT 'Services and staff tables created' as status;
SELECT 
  s.slug as salon_slug,
  COUNT(DISTINCT sv.id) as service_count,
  COUNT(DISTINCT st.id) as staff_count
FROM salons s
LEFT JOIN services sv ON sv.salon_id = s.id
LEFT JOIN staff st ON st.salon_id = s.id
WHERE s.slug = 'demo-salon'
GROUP BY s.slug;
