# TrueSelf Subscription System - Implementation Guide

## Overview

TrueSelf has been converted from a freemium model to a **paid-only subscription model**. All users must maintain an active subscription to access psychological tests and features.

## Key Changes

### ✅ Billing Page (Updated)

- **Removed**: Free plan option
- **Removed**: Payment method management section
- **Removed**: Billing history section
- **Added**: Active subscription status display
- **Plans**: Monthly (RM9.90) and Yearly (RM59) with identical features
- **Current Plan State**: All subscribed users show yearly plan as active (demo mode)

### ✅ Navigation (Updated)

The Navbar now displays context-aware buttons based on subscription status:

1. **Not Logged In**
   - "Sign In" (left)
   - "Sign Up" (right, prominent)

2. **Logged In, Not Subscribed**
   - "View Plans" (left)
   - "Get Started" (right, prominent)

3. **Logged In, Subscribed**
   - "Dashboard" (left)
   - Profile menu with:
     - My Profile
     - Dashboard
     - **Billing** (NEW - shows subscription details)
     - Logout

### ✅ Pricing Page (Enhanced)

- **Removed**: Old feature descriptions (vague)
- **Added**: Complete feature list (10 items)
- **Features**: Same for both plans - distinction is only price/billing cycle
- **Buttons**: Link to signup with plan parameter (e.g., `/auth/signup?plan=yearly`)
- **Pricing**: RM9.90/month, RM59/year (50% savings)
- **Label**: Yearly plan shows RM4.92/month breakdown

## Subscription Context

### Location

`/lib/subscription-context.tsx`

### Hook

```typescript
const {
  isSubscribed,
  subscriptionPlan,
  isLoading,
  nextBillingDate,
  checkSubscription,
} = useSubscription();
```

### Properties

- `isSubscribed` (boolean) - User has active subscription
- `subscriptionPlan` ('monthly' | 'yearly' | null) - Current plan type
- `isLoading` (boolean) - Data is loading
- `nextBillingDate` (string | null) - Next billing date
- `checkSubscription` (function) - Manually refresh subscription data

### Usage

```typescript
'use client';

import { useSubscription } from '@/lib/subscription-context';

export function MyComponent() {
  const { isSubscribed, subscriptionPlan } = useSubscription();

  if (!isSubscribed) {
    return <p>Please subscribe to access this feature</p>;
  }

  return <p>Plan: {subscriptionPlan}</p>;
}
```

## Route Protection

### Location

`/components/RouteProtection.tsx`

### Usage

Wrap page content to require subscription:

```typescript
'use client';

import { RouteProtection } from '@/components/RouteProtection';

export default function TestPage() {
  return (
    <RouteProtection>
      <TestContent />
    </RouteProtection>
  );
}
```

### Behavior

- **Not logged in**: Redirects to `/auth/login?redirect=[original-path]`
- **No subscription**: Redirects to `/pricing?upgrade=required`
- **Wrong plan**: Redirects to `/pricing?plan=[required-plan]`

## Demo Mode

Currently, the system operates in **demo mode**:

- Any logged-in user is treated as subscribed
- Subscription plan defaults to "yearly"
- Next billing date: April 5, 2027 (hardcoded for demo)

### To Implement Production Mode:

1. **Create Supabase Table**

   ```sql
   CREATE TABLE subscriptions (
     id UUID PRIMARY KEY,
     user_id UUID NOT NULL REFERENCES auth.users(id),
     plan VARCHAR(20) NOT NULL CHECK (plan IN ('monthly', 'yearly')),
     status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'canceled', 'past_due')),
     current_period_start TIMESTAMP,
     current_period_end TIMESTAMP,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Update `useSubscription()` Hook**
   - Replace demo logic with real Supabase query
   - Fetch from `subscriptions` table
   - Check `status = 'active'` and `current_period_end > NOW()`

3. **Add Payment Integration**
   - Stripe or Paddle integration
   - Webhook handlers for subscription events
   - Checkout flow with plan selection

4. **Update Signup Flow**
   - Add plan selection to signup
   - Redirect to payment after signup
   - Create subscription record on successful payment

## Feature List

All plans include:
✓ Access to 50+ psychological tests
✓ Full category access (8 dimensions)
✓ Deep psychological insights
✓ Personalized recommendations
✓ Progress tracking & trend analysis
✓ Pattern recognition & insight loops
✓ Emotional & decision analysis
✓ Priority access to new tests
✓ Faster result processing
✓ Premium UI experience

## File Structure

```
components/
├── ClientProviders.tsx (UPDATED - added SubscriptionProvider)
├── RouteProtection.tsx (NEW)
├── dashboard/
│   └── BillingPage.tsx (COMPLETELY REWRITTEN)
└── sections/
    ├── Navbar.tsx (UPDATED - subscription-aware)
    └── PricingSection.tsx (ENHANCED)

lib/
└── subscription-context.tsx (NEW)
```

## Next Steps for Production

1. **Payment Integration**
   - Choose payment provider (Stripe, Paddle, etc.)
   - Implement checkout flow
   - Handle webhook subscriptions

2. **Subscription Data**
   - Create Supabase schema for subscriptions
   - Build queries for subscription status
   - Implement subscription management (upgrade/downgrade/cancel)

3. **Dashboard Features**
   - Subscription management page
   - Invoice history
   - Billing address management
   - Payment method management

4. **Emails**
   - Welcome email on subscription
   - Invoice/receipt emails
   - Renewal reminders
   - Cancellation confirmations

5. **Testing**
   - Mock payment flows
   - Test subscription transitions
   - Verify route protection
   - Test billing scenarios

## Summary of Pricing Changes

| Aspect       | Before      | After                       |
| ------------ | ----------- | --------------------------- |
| Free Plan    | ✓ Available | ✗ Removed                   |
| Monthly      | RM9.99      | RM9.90                      |
| Yearly       | RM59        | RM59                        |
| Savings %    | 50%         | 50%                         |
| Free Trial   | No          | To be added                 |
| Billing Page | Full        | Simplified (plan view only) |

## Questions?

Refer to the specific component files for implementation details:

- Subscription checks: `/lib/subscription-context.tsx`
- Route protection: `/components/RouteProtection.tsx`
- Billing UI: `/components/dashboard/BillingPage.tsx`
- Navigation: `/components/sections/Navbar.tsx`
