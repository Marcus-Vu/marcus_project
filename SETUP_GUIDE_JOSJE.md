# HairsalonX Setup Gids — Voor Josje

## Wat hebben we gebouwd?

Een **werkend booking systeem** met:
- ✅ Online afspraak maken (klanten)
- ✅ Email bevestigingen (klanten + jij)
- ✅ Geen dubbele boekingen
- ✅ Agenda sync via database

## Wat jij moet doen (1x)

### Stap 1: Supabase account (Database)

1. Ga naar https://supabase.com
2. Maak gratis account aan
3. Klik "New Project"
4. Naam: `hairsalonx`
5. Wachtwoord: kies sterk wachtwoord
6. Klik "Create new project"

**Na 2 minuten:**
7. Ga naar "Project Settings" → "API"
8. Kopieer:
   - `Project URL` 
   - `anon public` key
   - `service_role` key

### Stap 2: Database tabel maken

In Supabase dashboard:
1. Ga naar "SQL Editor"
2. Klik "New query"
3. Plak dit:

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  service_duration INTEGER,
  service_price DECIMAL(10,2),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
```

4. Klik "Run"

### Stap 3: Resend account (Email)

1. Ga naar https://resend.com
2. Maak gratis account aan
3. Ga naar "API Keys"
4. Klik "Create API Key"
5. Kopieer de key

### Stap 4: Environment variables

Geef deze waarden aan Maestro:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_xxxxxxxx
```

Wij zetten ze in de website. Daarna werkt alles!

## Hoe werkt het?

### Voor klanten:
1. Kiest behandeling
2. Kiest datum & tijd
3. Vult gegevens in
4. Krijgt direct email bevestiging

### Voor jou:
- Je krijgt email voor elke nieuwe boeking
- Je ziet alle boekingen in Supabase dashboard
- Klanten kunnen annuleren via telefoon/WhatsApp

## Kosten

| Service | Kosten |
|---------|--------|
| Supabase | Gratis (tot 500MB, 2GB traffic) |
| Resend | Gratis (tot 3000 emails/maand) |
| **Totaal** | **€0** |

Als je salon groeit, worden het kleine kosten (€5-10/maand).

## Vragen?

Stuur Maestro een berichtje. We helpen je graag!
