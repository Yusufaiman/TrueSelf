# Stripe Integration Guide for TrueSelf

## Overview

This document describes the complete Stripe subscription system implementation for TrueSelf. Users must subscribe (monthly or yearly) to access the dashboard and tests.

## Architecture

```
User subscribes → Stripe Checkout → Payment Success → Webhook → Database Update → Dashboard Access
```

## Environment Variables

Add these to `.env.local`:

```
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe Price IDs (Create in Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=price_...
```

## Database Schema

### subscriptions table

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  status TEXT (active | inactive | cancelled | past_due),
  plan TEXT (monthly | yearly),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  amount_paid INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

Migration file: `/docs/SUBSCRIPTIONS_TABLE_MIGRATION.sql`

## API Endpoints

### 1. POST `/api/create-checkout-session`

Creates a Stripe checkout session.

**Request:**

```json
{
  "priceId": "price_xxx",
  "userId": "user-id",
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "url": "https://checkout.stripe.com/pay/cs_xxx"
}
```

### 2. POST `/api/webhook`

Handles Stripe webhook events. Stripe will call this endpoint for:

- `checkout.session.completed` - Creates subscription record
- `invoice.payment_failed` - Marks subscription as past_due
- `customer.subscription.deleted` - Marks subscription as cancelled
- `customer.subscription.updated` - Updates subscription details

**Webhook URL:** `https://mytrueself.app/api/webhook`

## File Structure

```
lib/
├── stripe.ts                    # Stripe client initialization
├── stripe-config.ts             # Price IDs configuration
└── subscription-context.tsx     # React context for subscription state

app/api/
├── create-checkout-session/route.ts  # Checkout creation
└── webhook/route.ts                  # Webhook handler

components/
├── sections/PricingSection.tsx  # Pricing cards with checkout buttons
└── RouteProtection.tsx          # Protects dashboard routes

docs/
└── SUBSCRIPTIONS_TABLE_MIGRATION.sql  # Database setup
```

## Setup Instructions

### Step 1: Create Stripe Products & Prices

1. Go to Stripe Dashboard → Products
2. Create product "TrueSelf Monthly"
   - Price: RM9.90
   - Billing period: Monthly
   - Copy `price_xxx` ID
3. Create product "TrueSelf Yearly"
   - Price: RM59
   - Billing period: Yearly
   - Copy `price_xxx` ID

### Step 2: Add Price IDs to .env.local

```
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_1TG...
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=price_1TG...
```

### Step 3: Run Supabase Migration

Execute SQL in `/docs/SUBSCRIPTIONS_TABLE_MIGRATION.sql` in Supabase SQL Editor

### Step 4: Configure Webhook

1. Stripe Dashboard → Webhooks
2. Add endpoint: `https://mytrueself.app/api/webhook`
3. Events to listen:
   - `checkout.session.completed`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
4. Copy signing secret to `STRIPE_WEBHOOK_SECRET`

### Step 5: Set Service Role Key

In Supabase, webhook handler needs service role to bypass RLS:

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (from Supabase settings)
```

## Flow Walkthrough

### Subscription Flow

1. **User clicks subscribe** on pricing page
2. **handleCheckout()** called with plan info
3. **Frontend sends** to `/api/create-checkout-session`
4. **Backend creates** Stripe checkout session
5. **User redirected** to Stripe checkout
6. **User enters payment** info
7. **Payment successful** → Stripe triggers webhook
8. **Webhook** updates Supabase subscriptions table
9. **useSubscription()** hook fetches subscription
10. **User can access** dashboard

### Route Protection

All dashboard routes wrapped with `<RouteProtection>`:

```typescript
// Checks:
1. User is logged in → Redirect to /auth/login
2. User has subscription → Redirect to /pricing
3. Subscription is active → Grant access
```

## Subscription Context

Hook to check subscription status anywhere in app:

```typescript
import { useSubscription } from "@/lib/subscription-context";

function Component() {
  const { isSubscribed, subscriptionPlan, isLoading } = useSubscription();

  if (isLoading) return <LoadingSpinner />;
  if (!isSubscribed) return <PleaseSubscribe />;

  return <PremiumContent />;
}
```

## Testing

### Local Testing

1. **Use Stripe test keys** (pk*test*..., sk*test*...)
2. **Test card numbers:**
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. **Webhook testing:** Use Stripe CLI
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

### Production

1. **Use Stripe live keys** (pk*live*..., sk*live*...)
2. **Update webhook URL** to production domain
3. **Test with real payment** (small amount)
4. **Monitor Stripe Dashboard** for events

## Error Handling

### Missing Configuration

If price IDs not configured:

- Error shown on pricing page
- Checkout button disabled
- Console warning printed

### Payment Failures

- Stripe handles card declines
- `invoice.payment_failed` webhook updates status to `past_due`
- User redirected to upgrade page

### Webhook Failures

- Signature verification fails → 400 error
- Database update fails → 500 error
- Logs printed to console for debugging

## Security

- **Webhook verification:** Stripe signature validated
- **Server-side checkout:** No direct card handling
- **Service role:** Only webhook handler uses it
- **RLS policies:** Users see only own subscription
- **Environment variables:** Keys never exposed to frontend

## Next Steps

### Production Deployment

1. Get live Stripe keys
2. Create live products & prices
3. Update .env on production
4. Configure webhook to production URL
5. Test with real payment
6. Monitor Supabase logs

### Features to Add

- [ ] Subscription management (upgrade/downgrade)
- [ ] Renewal reminders via email
- [ ] Invoice history
- [ ] Cancel subscription with feedback form
- [ ] Refund handling
- [ ] Trial period support

## Debugging

### Check Subscription in Database

```sql
SELECT * FROM subscriptions WHERE user_id = 'user-id';
```

### View Stripe Events

```bash
stripe events list
```

### Check Webhook Logs

Stripe Dashboard → Developers → Webhooks → Recent deliveries

### Console Logs

Server logs show:

- `✅ Subscription created for user:`
- `⚠️ Payment failed for customer:`
- `❌ Subscription cancelled:`
- `🔄 Subscription updated:`

## Support

For issues:

1. Check Stripe Dashboard for event logs
2. Verify webhook endpoint is receiving calls
3. Check Supabase subscriptions table
4. Review console logs for errors
5. Ensure all env variables are set
