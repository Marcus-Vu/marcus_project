# Backend Architectuur Plan — HairsalonX Booking Systeem

## Situatie
Camilo heeft een mooie frontend booking flow gebouwd, maar:
- Geen backend (alleen console.log)
- Geen echte bevestigingen
- Geen agenda-sync voor Josje

## Opties

### Optie A: Salonized Widget (Aanbevolen — snelste)
**Kosten:** €15-25/maand
**Tijd:** 2-4 uur integratie

**Voordelen:**
- Werkt direct
- Josje beheert eigen agenda
- Automatische bevestigingen
- Geen onderhoud

**Nadelen:**
- Maandelijkse kosten
- Minder custom branding

**Implementatie:**
```html
<!-- Embed widget op contact pagina -->
<script src="https://app.salonized.com/booking.js" data-id="JOSJE_SALON_ID"></script>
```

---

### Optie B: Custom Backend (Meer werk, volledige controle)
**Kosten:** ~€0-10/maand (Supabase free tier + email)
**Tijd:** 2-3 dagen

**Stack:**
- **Database:** Supabase (PostgreSQL)
- **API:** Next.js API routes
- **Email:** Resend (gratis tot 3000/maand)
- **SMS:** Twilio (pay-per-use)
- **Auth:** Supabase Auth (voor Josje dashboard)

**Schema:**
```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  service_duration INTEGER, -- minutes
  service_price DECIMAL(10,2),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Time slots (voor availability)
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  booking_id UUID REFERENCES bookings(id)
);
```

**API Endpoints:**
```typescript
// POST /api/bookings — Nieuwe boeking
// GET /api/availability?date=2026-02-15 — Beschikbare tijden
// PATCH /api/bookings/:id — Update status (voor Josje)
// POST /api/bookings/:id/confirm — Bevestiging email versturen
```

**Email Templates:**
- Bevestiging klant
- Herinnering 24h van tevoren
- Notificatie naar Josje

---

## Team Taakverdeling

### Camilo (Frontend)
- [ ] Cookie banner + AVG compliance
- [ ] Instagram feed integratie
- [ ] Booking UI koppelen aan backend API

### Backend-Dev (Nieuwe agent)
- [ ] Supabase project opzetten
- [ ] Database schema + migrations
- [ ] API routes bouwen
- [ ] Email service (Resend)
- [ ] Josje dashboard (simpele admin)

### Maestro (Jij — Lead)
- [ ] Architectuur beslissing (Salonized vs Custom)
- [ ] Code review
- [ ] Deploy + test
- [ ] Documentatie

---

## Aanbeveling

**Korte termijn:** Salonized widget (vandaag live)
**Lange termijn:** Custom backend (als salon groeit)

Salonized geeft Josje direct een werkend systeem zonder dat wij onderhoud moeten doen. Als de salon groeit en specifieke wensen krijgt, kunnen we altijd nog custom bouwen.

## Next Steps

1. **Marcus beslist:** Salonized of Custom?
2. **Zodra besloten:**
   - Salonized: Ik fix de widget vandaag (2 uur)
   - Custom: Backend-dev agent start morgen (2-3 dagen)
