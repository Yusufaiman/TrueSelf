# Webhook Testing Guide

Your Stripe webhook integration is ready. Here's how to test it locally.

## Option 1: Stripe CLI (Recommended)

### Install Stripe CLI on Windows

Choose one of these methods:

**Method A: Direct Download (Easiest)**

1. Download: https://github.com/stripe/stripe-cli/releases/latest (Windows AMD64 `.zip`)
2. Extract to folder (e.g., `C:\stripe-cli`)
3. Add to PATH:
   - Right-click "This PC" → Properties → Advanced system settings → Environment Variables
   - Edit `PATH` → Add: `C:\stripe-cli`
   - Restart PowerShell

**Method B: Scoop (if you have it)**

```powershell
scoop install stripe
```

**Method C: Chocolatey (if you have it)**

```powershell
choco install stripe
```

### Test Your Webhook

Once installed:

**Terminal 1 - Start your dev server:**

```bash
npm run dev
```

**Terminal 2 - Forward webhook events:**

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

(Or use your API key if needed: `stripe login --api-key YOUR_STRIPE_SECRET_KEY`)

**Expected output:**

```
> Ready! Your webhook signing secret is: whsec_xxxxxxxxxxxxxx
```

**Copy this signing secret** → Add to `.env.local`:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxx
```

### Test Checkout Flow

**Terminal 3 - Trigger a test event:**

While webhook listener is running, go to:

- Browser: http://localhost:3000/pricing
- Click "Get Started - Monthly"
- Use test card: **4242 4242 4242 4242**
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- Complete payment

**You should see in Terminal 2:**

```
2026-04-05 10:30:45   → checkout.session.completed
```

**Check Supabase:**

```sql
SELECT * FROM subscriptions WHERE user_id = 'YOUR_USER_ID' ORDER BY created_at DESC LIMIT 1;
```

Should show:

- `status: 'active'` ✅
- `plan: 'monthly'` ✅
- `stripe_subscription_id: sub_...` ✅

## Option 2: Stripe Dashboard Test Events (No CLI Needed)

If you can't install Stripe CLI:

1. Configure webhook in Stripe Dashboard first:
   - Stripe Test Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://your-production-domain.com/api/webhook`
   - Events: Check all 4 we need:
     - `checkout.session.completed`
     - `invoice.payment_failed`
     - `customer.subscription.deleted`
     - `customer.subscription.updated`

2. Once deployed to production, Stripe will send real events automatically.

3. To test locally before deploying:
   - Use **Option 1: Stripe CLI** (recommended)
   - Or deploy to test environment (Vercel, etc.)

## Option 3: Manual Testing Script

If neither CLI nor production deployment is feasible:

```bash
# Create test file: test-webhook.js
const fetch = require('node-fetch');
const crypto = require('crypto');

const secret = 'whsec_test_...';
const payload = JSON.stringify({
  id: 'evt_test_checkout',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_123',
      customer: 'cus_test_456',
      subscription: 'sub_test_789',
      metadata: { userId: 'test-user-id' }
    }
  }
});

const timestamp = Math.floor(Date.now() / 1000);
const signed_content = `${timestamp}.${payload}`;
const signature = crypto
  .createHmac('sha256', secret)
  .update(signed_content)
  .digest('hex');

const stripe_signature = `t=${timestamp},v1=${signature}`;

fetch('http://localhost:3000/api/webhook', {
  method: 'POST',
  body: payload,
  headers: { 'stripe-signature': stripe_signature }
}).then(r => r.text()).then(console.log);
```

Run: `node test-webhook.js`

## Webhook Event Details

Your webhook handler expects these events:

### 1. checkout.session.completed

```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_...",
      "customer": "cus_...",
      "subscription": "sub_...",
      "metadata": { "userId": "user-uuid" }
    }
  }
}
```

→ Creates subscription in Supabase with `status: 'active'`

### 2. invoice.payment_failed

```json
{
  "type": "invoice.payment_failed",
  "data": {
    "object": {
      "customer": "cus_...",
      "subscription": "sub_..."
    }
  }
}
```

→ Updates subscription to `status: 'past_due'`

### 3. customer.subscription.deleted

```json
{
  "type": "customer.subscription.deleted",
  "data": {
    "object": {
      "id": "sub_..."
    }
  }
}
```

→ Updates subscription to `status: 'cancelled'`

### 4. customer.subscription.updated

```json
{
  "type": "customer.subscription.updated",
  "data": {
    "object": {
      "id": "sub_...",
      "status": "active",
      "current_period_start": 1712361600,
      "current_period_end": 1715040000,
      "items": {
        "data": [{ "price": { "id": "price_monthly_or_yearly" } }]
      }
    }
  }
}
```

→ Syncs all subscription details in Supabase

## Troubleshooting

### Webhook not firing?

- [ ] Check Stripe Dashboard → Developers → Webhooks → Recent deliveries
- [ ] Verify webhook URL is correct
- [ ] Check `.env.local` has `STRIPE_WEBHOOK_SECRET`
- [ ] Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] Check application logs for errors

### "Payment failed" after checkout?

- [ ] Verify you added both price IDs to `.env.local`:
  - `NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY`
  - `NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY`
- [ ] Check these prices exist in Stripe Dashboard
- [ ] Verify Stripe keys haven't expired

### Subscription not saving to Supabase?

- [ ] Check Supabase subscriptions table exists
- [ ] Verify RLS policies are correct (see SUBSCRIPTIONS_TABLE_MIGRATION.sql)
- [ ] Check `SUPABASE_SERVICE_ROLE_KEY` is valid
- [ ] View Supabase logs for SQL errors

### 401 Unauthorized from Stripe?

- [ ] Verify `STRIPE_SECRET_KEY` in `.env.local`
- [ ] Check API key hasn't been revoked in Stripe Dashboard
- [ ] Restart dev server after env var changes

## After Webhook Testing ✅

Once verified locally:

1. **Get production domain** (e.g., mytrueself.app)
2. **Update webhook URL** in Stripe Dashboard:
   - Change from `localhost:3000` to your production domain
3. **Switch API keys** from test to live
4. **Deploy to production**
5. **Test with real payment** (£1 charge)

## Quick Checklist

- [ ] Stripe API keys in `.env.local`
- [ ] Stripe price IDs in `.env.local`
- [ ] Supabase credentials in `.env.local`
- [ ] Supabase subscriptions table migrated
- [ ] Webhook listener running (`stripe listen --forward-to ...`)
- [ ] Dev server running (`npm run dev`)
- [ ] Test payment processed
- [ ] Webhook event received in Terminal 2
- [ ] Subscription appears in Supabase
- [ ] Dashboard accessible after payment
- [ ] Cancel flow works

---

**Your webhook is ready to test!** Choose Option 1 (Stripe CLI) for best local testing experience.
