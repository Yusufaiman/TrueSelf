# Stripe Integration - Setup Checklist

## ✅ Completed Implementation

- [x] Stripe package installed (`stripe` + `@stripe/stripe-js`)
- [x] Stripe client created (`/lib/stripe.ts`)
- [x] Stripe config file (`/lib/stripe-config.ts`)
- [x] Checkout session API (`/app/api/create-checkout-session/route.ts`)
- [x] Webhook handler (`/app/api/webhook/route.ts`)
- [x] Supabase migrations (`/docs/SUBSCRIPTIONS_TABLE_MIGRATION.sql`)
- [x] Subscription context updated (`/lib/subscription-context.tsx`)
- [x] Pricing page with checkout (`/components/sections/PricingSection.tsx`)
- [x] Billing page updated (`/components/dashboard/BillingPage.tsx`)
- [x] Checkout success component (`/components/checkout/CheckoutSuccessContent.tsx`)
- [x] Comprehensive documentation (`/docs/STRIPE_INTEGRATION.md`)

## 🚀 Quick Start (Next 30 minutes)

### 1. Add Stripe Price IDs to .env.local

Get these from Stripe Dashboard:

```bash
# Go to https://dashboard.stripe.com → Products → Add Product

# Product 1: TrueSelf Monthly
# Price: RM9.90
# Recurring: Monthly
# Copy Price ID:
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_1TG...

# Product 2: TrueSelf Yearly
# Price: RM59
# Recurring: Yearly
# Copy Price ID:
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=price_1TG...
```

### 2. Run Supabase Migration

In Supabase SQL Editor:

```sql
-- Paste contents of: /docs/SUBSCRIPTIONS_TABLE_MIGRATION.sql
-- Execute
```

### 3. Add Service Role Key to .env.local

From Supabase Settings → API → Service Role Key:

```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 4. Configure Webhook in Stripe

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `http://localhost:3000/api/webhook` (or production URL)
4. Events to listen for:
   - `checkout.session.completed`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
5. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET` in .env.local

### 5. Test Locally

```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Use Stripe CLI to forward webhooks
stripe listen --forward-to localhost:3000/api/webhook
# Copy webhook secret to .env.local

# Access http://localhost:3000/pricing
# Click "Get Started"
# Use test card: 4242 4242 4242 4242
# Fill any future date, any CVC
```

### 6. Verify Subscription Created

Check Supabase:

```sql
SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 1;
```

You should see:

- `user_id` ✓
- `status: 'active'` ✓
- `plan: 'monthly' or 'yearly'` ✓

## 📋 Full Env Variables

```bash
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Products
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 🔍 Testing Scenarios

### Success Path

1. Go to /pricing
2. Click "Get Started - Monthly"
3. Enter test card: 4242 4242 4242 4242
4. Any future date, any CVC
5. Check Supabase: subscription created with status: 'active'
6. Try to access dashboard without login: redirects to /pricing
7. Dashboard loads after subscription confirmed

### Logged Out Path

1. Don't log in
2. Click "Get Started"
3. Redirects to signup
4. After signup + payment, dashboard loads

### Payment Declined

1. Test card: 4000 0000 0000 0002
2. Payment fails
3. Redirects to /pricing
4. Supabase shows: status: 'past_due'

## 📊 What Should Happen

### User Flow

```
Not logged in → Sign up → Pricing page → Stripe checkout → Payment
  ↓
Webhook fires → Subscription saved → Dashboard accessible → ✅ Welcome!
```

### Key Files Updated

| File                                        | Change                           |
| ------------------------------------------- | -------------------------------- |
| `.env.local`                                | Added Stripe keys + price IDs    |
| `/lib/stripe.ts`                            | NEW - Stripe client              |
| `/lib/stripe-config.ts`                     | NEW - Price ID config            |
| `/lib/subscription-context.tsx`             | UPDATED - Fetch from Supabase    |
| `/app/api/create-checkout-session/route.ts` | NEW - Checkout API               |
| `/app/api/webhook/route.ts`                 | NEW - Webhook handler            |
| `/components/sections/PricingSection.tsx`   | UPDATED - Stripe checkout        |
| `/components/dashboard/BillingPage.tsx`     | UPDATED - Real subscription data |
| `/components/RouteProtection.tsx`           | Already checks subscriptions     |

## ⚠️ Common Issues

### "Stripe is not configured"

- Check `.env.local` has `NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY` and `NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY`
- Prices must be created in Stripe Dashboard first

### Webhook not firing

- Make sure webhook URL is correct
- Check Stripe Dashboard → Webhooks → Recent deliveries
- Use Stripe CLI to debug locally

### "No subscription found"

- Check Supabase subscriptions table has data
- Verify webhook runs without errors
- Check service role key is set

### Payment doesn't remember plan

- Test card fully loads checkout
- Check metadata in Stripe Dashboard
- Verify webhook receives session.metadata.userId

## 🎯 Next Steps After Setup

1. ✅ Build and verify (no errors)
2. ✅ Test payment flow locally
3. ✅ Verify subscription in database
4. ✅ Check dashboard only accessible post-payment
5. ✅ Deploy to production
6. ✅ Create live Stripe products
7. ✅ Update webhook URL to production
8. ✅ Test with real payment (£1)

## 🔐 Production Checklist

- [ ] Switch to Stripe live keys (pk*live*, sk*live*)
- [ ] Create live products in Stripe (RM9.90 monthly, RM59 yearly)
- [ ] Update webhook URL to production domain
- [ ] Test with real card (use £1 test)
- [ ] Monitor Stripe Dashboard for events
- [ ] Set up error alerting
- [ ] Create invoice email templates
- [ ] Document support process

## 📞 Support

If stuck:

1. Check Stripe Dashboard → Events → Failed events
2. Check Supabase Logs for webhook errors
3. Check console for client-side errors
4. Run: `stripe events list` to see all events
5. Check `.env.local` has all required variables

---

**Status**: Ready to build ✅
**Next**: Add price IDs to .env.local + run migration
