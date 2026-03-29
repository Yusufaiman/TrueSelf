# Category Color Theme System - Implementation Guide

## Overview

The category color theme system provides a unified, scalable color identity system for the TrueSelf app. Each of the 9 categories has a unique color palette that creates instant visual differentiation and semantic meaning.

---

## Theme Configuration

### Color Palette

| Category             | Color  | Primary      | Light        | Lighter     | Semantic                           |
| -------------------- | ------ | ------------ | ------------ | ----------- | ---------------------------------- |
| **Identity**         | Blue   | `blue-500`   | `blue-100`   | `blue-50`   | Clarity, self-understanding, trust |
| **Relationships**    | Pink   | `pink-500`   | `pink-100`   | `pink-50`   | Connection, emotion, intimacy      |
| **Career**           | Indigo | `indigo-500` | `indigo-100` | `indigo-50` | Ambition, purpose, growth          |
| **Life Direction**   | Purple | `purple-500` | `purple-100` | `purple-50` | Vision, direction, meaning         |
| **Mindset**          | Cyan   | `cyan-500`   | `cyan-100`   | `cyan-50`   | Clarity, expansion, perspective    |
| **Emotional Health** | Red    | `red-500`    | `red-100`    | `red-50`    | Vitality, emotion, intensity       |
| **Life Patterns**    | Amber  | `amber-500`  | `amber-100`  | `amber-50`  | Cycles, rhythm, awareness          |
| **Money**            | Green  | `green-500`  | `green-100`  | `green-50`  | Growth, abundance, stability       |
| **Reality Check**    | Slate  | `slate-500`  | `slate-100`  | `slate-50`  | Truth, clarity, objectivity        |

---

## Configuration File

**Location**: `/config/categoryTheme.ts`

This central configuration exports:

```typescript
// Get theme for a specific category
import {
  categoryThemes,
  getTheme,
  type CategoryKey,
} from "@/config/categoryTheme";

const identityTheme = getTheme("identity");
// Returns: { name, slug, primary, light, lighter, border, text, icon, gradient, rgb, semanticMeaning }

// Get all categories
import { getCategories } from "@/config/categoryTheme";
const allCategories = getCategories(); // Array with key, name, slug
```

---

## Usage Patterns

### 1. Using the CategoryPageWrapper (Easiest)

Wrap your entire category page with `CategoryPageWrapper` to apply all theme styles automatically:

```tsx
import { CategoryPageWrapper } from "@/components/ui/CategoryPageWrapper";

export default function MoneyPage() {
  return (
    <CategoryPageWrapper
      category="money"
      pageTitle="Understanding Your Relationship with Money"
      pageDescription="Discover your financial patterns and beliefs"
    >
      {/* Your page content */}
      <h2>Quiz Questions</h2>
      {/* ... */}
    </CategoryPageWrapper>
  );
}
```

**Features**:

- ✅ Gradient background (light to white)
- ✅ Category badge at top
- ✅ Themed borders and accents
- ✅ Responsive padding

---

### 2. Using Individual Theme Components

#### CategoryBadge

Small inline badge with category colors:

```tsx
import { CategoryBadge } from "@/components/ui/CategoryPageWrapper";

<CategoryBadge category="identity" />;
// Result: Blue badge with "Identity" text
```

#### CategoryButton

Primary button inheriting category color:

```tsx
import { CategoryButton } from "@/components/ui/CategoryPageWrapper";

<CategoryButton category="money" onClick={handleClick}>
  Continue →
</CategoryButton>;
// Result: Green button (Money theme)
```

#### CategoryCard

Card with subtle category tint:

```tsx
import { CategoryCard } from "@/components/ui/CategoryPageWrapper";

<CategoryCard category="relationships">
  <h3>Your Communication Style</h3>
  <p>Learn how you connect with others...</p>
</CategoryCard>;
// Result: Pink-tinted card with pink border
```

---

### 3. Accessing Theme Data Directly

For custom styling, access theme configuration:

```tsx
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";

function MyComponent({ category }: { category: CategoryKey }) {
  const theme = categoryThemes[category];

  return (
    <div style={{ borderColor: theme.border }}>
      <h2 style={{ color: theme.text }}>{theme.name}</h2>
      <p>{theme.semanticMeaning}</p>
    </div>
  );
}
```

---

### 4. Dynamic Color Application

When building custom styled components:

```tsx
function ProgressBar({
  category,
  percentage,
}: {
  category: CategoryKey;
  percentage: number;
}) {
  const theme = categoryThemes[category];

  // Use theme colors for bars, backgrounds, etc.
  return (
    <div style={{ backgroundColor: theme.light }}>
      <div
        style={{
          backgroundColor: theme.primary,
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}
```

---

## Design System Rules

### Apply Theme To:

1. **Page Badges** → Category badge at top
2. **Progress Bars** → Use `primary` color for fill
3. **Buttons** → `primary` as background, `text` for hover states
4. **Cards** → `lighter` background with `border` outline
5. **Icons** → `primary` color for category-related icons
6. **Headings** → Optional: `text` color for main headings
7. **Accent Lines** → Gradient from `lighter` to `primary`
8. **Section Highlights** → `light` background with `text` color
9. **Hover States** → Use `light` or lighter shade on hover
10. **Links** → `primary` color with `text` on hover

---

## Navbar Implementation

The navbar dropdown automatically applies category themes:

✅ Each category item shows its category color icon
✅ Hover background matches category's light tint
✅ Icon color matches category's primary color

**Navigation links**:

- `/tests/identity/who-you-really-are` → Blue theme
- `/money` → Green theme
- `/relationships` → Pink theme
- etc.

---

## Creating New Category Pages

### Step 1: Create Page File

```tsx
// app/tests/[category]/page.tsx
"use client";

import { CategoryPageWrapper } from "@/components/ui/CategoryPageWrapper";
import { type CategoryKey } from "@/config/categoryTheme";

interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
  const category = params.category as CategoryKey;

  return (
    <CategoryPageWrapper
      category={category}
      pageTitle="Category-Specific Title"
      pageDescription="Description text"
    >
      {/* Content */}
    </CategoryPageWrapper>
  );
}
```

### Step 2: Style Internal Components

```tsx
import {
  CategoryButton,
  CategoryCard,
  CategoryBadge,
} from "@/components/ui/CategoryPageWrapper";

// Use these throughout your page - they auto-apply theme
```

---

## Tailwind CSS Integration

All color utilities are available:

```html
<!-- Direct Tailwind classes -->
<div class="bg-blue-50 border-2 border-blue-200 text-blue-700">
  Identity Section
</div>

<div class="bg-green-100 text-green-700">Money Badge</div>

<button class="bg-pink-500 hover:bg-pink-600 text-white">
  Relationships CTA
</button>
```

---

## Color References (Hex Values)

For custom inline styles:

```typescript
const colors = {
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
  },
  cyan: {
    50: "#ecf9ff",
    100: "#cffafe",
    200: "#a5f3fc",
    500: "#22d3ee",
    600: "#06b6d4",
    700: "#0891b2",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
  },
  slate: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
  },
};
```

---

## Semantic Meaning

Each color represents a concept:

- **Blue (Identity)**: Clear vision, understanding, trust
- **Pink (Relationships)**: Emotional connection, intimacy
- **Indigo (Career)**: Professional growth, ambition
- **Purple (Life Direction)**: Vision, meaning, direction
- **Cyan (Mindset)**: Mental clarity, expansion
- **Red (Emotional Health)**: Emotional vitality, intensity
- **Amber (Life Patterns)**: Cycles, rhythm, patterns
- **Green (Money)**: Growth, abundance, prosperity
- **Slate (Reality Check)**: Truth, objectivity, clarity

---

## Best Practices

### DO ✅

- ✅ Use `lighter` for backgrounds and `primary` for text/icons
- ✅ Use `light` for hover states on buttons
- ✅ Keep `primary` color for interactive elements
- ✅ Use consistent opacity for overlays (5-20% opacity)
- ✅ Apply theme to progress bars and indicators
- ✅ Use category colors to create visual hierarchy

### DON'T ❌

- ❌ Don't mix multiple color themes on one page
- ❌ Don't override category colors without a reason
- ❌ Don't use gray/neutral colors where category colors should apply
- ❌ Don't create custom colors outside the defined palette
- ❌ Don't forget to update icon colors when changing backgrounds

---

## Scalability

To add a new category:

1. **Update `categoryTheme.ts`**:

   ```typescript
   'new-category': {
     name: 'New Category',
     slug: 'new-category',
     primary: 'color-500',
     light: 'color-100',
     lighter: 'color-50',
     border: 'color-200',
     text: 'color-700',
     icon: 'color-500',
     gradient: { from: 'from-color-50', to: 'to-white' },
     rgb: '...',
     semanticMeaning: '...'
   }
   ```

2. **Update `tailwind.config.ts`** if new color doesn't exist

3. **Update `Navbar.tsx`** test categories list

4. **Use in pages** via `CategoryPageWrapper`

---

## Examples

### Complete Category Page Example

```tsx
"use client";

import {
  CategoryPageWrapper,
  CategoryButton,
  CategoryCard,
  CategoryBadge,
} from "@/components/ui/CategoryPageWrapper";
import { type CategoryKey } from "@/config/categoryTheme";

export default function MoneyPage() {
  return (
    <CategoryPageWrapper
      category="money"
      pageTitle="Your Money Mindset"
      pageDescription="Understand your relationship with wealth and financial behavior"
    >
      {/* Quiz Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <CategoryCard category="money">
          <h3 className="text-lg font-semibold mb-2">Question 1</h3>
          <p className="text-sm text-gray-600">How do you view saving money?</p>
        </CategoryCard>

        <CategoryCard category="money">
          <h3 className="text-lg font-semibold mb-2">Question 2</h3>
          <p className="text-sm text-gray-600">
            What does success mean financially?
          </p>
        </CategoryCard>
      </div>

      {/* CTA Button */}
      <CategoryButton category="money" onClick={() => {}}>
        See Your Results →
      </CategoryButton>
    </CategoryPageWrapper>
  );
}
```

---

## Troubleshooting

**Q: Colors not showing up?**

- Ensure Tailwind colors are defined in `tailwind.config.ts`
- Check that color names are spelled correctly
- Use inline styles as fallback

**Q: Dropdown icons all one color?**

- Navbar now applies category colors dynamically
- Each icon inherits its category's primary color
- Hover backgrounds match category's lighter shade

**Q: How to override category color?**

- Pass `style` prop to components
- Or use inline styles with `!important`
- Better: create variant components instead

---

## Files Modified

- ✅ `/config/categoryTheme.ts` - New config file
- ✅ `/tailwind.config.ts` - Added all color definitions
- ✅ `/components/sections/Navbar.tsx` - Updated dropdown
- ✅ `/components/ui/CategoryPageWrapper.tsx` - New reusable components

---

**Status**: ✅ Production Ready

The color theme system is fully implemented and ready for immediate use across all category pages.
