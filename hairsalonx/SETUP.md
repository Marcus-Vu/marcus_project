# HairsalonX Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Resend account (free tier: 3000 emails/month)

## 1. Install Dependencies

```bash
cd hairsalonx
npm install
```

## 2. Set Up Supabase

### Option A: Via Supabase Dashboard (Recommended)
1. Go to https://supabase.com/dashboard
2. Create new project
3. Go to Project Settings > API
4. Copy the URL and keys
5. Go to SQL Editor
6. Run the migration: `supabase/migrations/001_create_bookings.sql`

### Option B: Via CLI
```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```

## 3. Set Up Resend

1. Go to https://resend.com
2. Create account
3. Verify domain (info@hairsalonx.nl) OR use onboarding domain
4. Create API key
5. Copy the key

## 4. Configure Environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your actual values
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

## 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 6. Test Booking Flow

1. Go to Contact page
2. Try booking an appointment
3. Check Supabase table for record
4. Check email (customer + admin)

## Admin Dashboard

For now, use Supabase Dashboard > Table Editor to:
- View all bookings
- Update booking status (pending → confirmed → completed)
- Cancel bookings

Future: Build simple admin UI at /admin

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
Same as .env.local, set in hosting platform dashboard.

## Troubleshooting

### Booking fails with "Supabase not configured"
- Check .env.local exists with correct values
- Restart dev server after adding env vars

### Emails not sending
- Check Resend API key is valid
- Check from email is verified in Resend
- Check spam folders

### Time slots not loading
- Check Supabase connection
- Check RLS policies allow SELECT on bookings table

## Next Steps / TODO

- [ ] Build admin dashboard at /admin
- [ ] Add SMS reminders (Twilio)
- [ ] Add calendar sync (Google Calendar)
- [ ] Add cancellation links in emails
