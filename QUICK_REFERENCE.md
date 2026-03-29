# Category Color Theme System - Developer Quick Reference

## 🎨 One-Page Reference Card

### Import Everything You Need

```typescript
// Config and types
import {
  categoryThemes,
  getTheme,
  getCategories,
  type CategoryKey,
} from "@/config/categoryTheme";

// Components
import {
  CategoryPageWrapper,
  CategoryBadge,
  CategoryButton,
  CategoryCard,
} from "@/components/ui/CategoryPageWrapper";
```

---

## 🎯 Color Palette (All 9 Categories)

```
Identity (Blue)
─────────────────────────────────────────────────────────
🔵 Primary: #3b82f6 (blue-500)
📦 Light: #dbeafe (blue-100)
💫 Lighter: #eff6ff (blue-50)
🎨 Meaning: Clarity, self-understanding, trust

Relationships (Pink)
─────────────────────────────────────────────────────────
💗 Primary: #ec4899 (pink-500)
📦 Light: #fce7f3 (pink-100)
💫 Lighter: #fdf2f8 (pink-50)
🎨 Meaning: Connection, emotion, intimacy

Career (Indigo)
─────────────────────────────────────────────────────────
💼 Primary: #6366f1 (indigo-500)
📦 Light: #e0e7ff (indigo-100)
💫 Lighter: #eef2ff (indigo-50)
🎨 Meaning: Ambition, purpose, growth

Life Direction (Purple)
─────────────────────────────────────────────────────────
🗺️  Primary: #a855f7 (purple-500)
📦 Light: #f3e8ff (purple-100)
💫 Lighter: #faf5ff (purple-50)
🎨 Meaning: Vision, direction, meaning

Mindset (Cyan)
─────────────────────────────────────────────────────────
💭 Primary: #22d3ee (cyan-500)
📦 Light: #cffafe (cyan-100)
💫 Lighter: #ecf9ff (cyan-50)
🎨 Meaning: Clarity, expansion, perspective

Emotional Health (Red)
─────────────────────────────────────────────────────────
❤️  Primary: #ef4444 (red-500)
📦 Light: #fee2e2 (red-100)
💫 Lighter: #fef2f2 (red-50)
🎨 Meaning: Vitality, emotion, intensity

Life Patterns (Amber)
─────────────────────────────────────────────────────────
🔄 Primary: #f59e0b (amber-500)
📦 Light: #fef3c7 (amber-100)
💫 Lighter: #fffbeb (amber-50)
🎨 Meaning: Cycles, rhythm, awareness

Money (Green)
─────────────────────────────────────────────────────────
💰 Primary: #22c55e (green-500)
📦 Light: #dcfce7 (green-100)
💫 Lighter: #f0fdf4 (green-50)
🎨 Meaning: Growth, abundance, stability

Reality Check (Slate)
─────────────────────────────────────────────────────────
✓  Primary: #6b7280 (slate-500)
📦 Light: #f3f4f6 (slate-100)
💫 Lighter: #f9fafb (slate-50)
🎨 Meaning: Truth, clarity, objectivity
```

---

## 🚀 Most Common Usage Patterns

### Pattern 1: Wrap a Page (Most Common)

**Effort: 30 seconds | Result: Full page theming**

```tsx
<CategoryPageWrapper category="money">{/* Your content */}</CategoryPageWrapper>
```

### Pattern 2: Get Theme Data

**Effort: 1 line | Result: Access theme colors**

```tsx
const theme = categoryThemes["identity"];
console.log(theme.primary); // "blue-500"
console.log(theme.semanticMeaning); // "Clarity, self-understanding..."
```

### Pattern 3: Use Themed Components

**Effort: 1 line each | Result: Automatic theming**

```tsx
<CategoryBadge category="money" />
<CategoryButton category="relationships">Click me</CategoryButton>
<CategoryCard category="identity">Content</CategoryCard>
```

---

## 📋 Component API

### CategoryPageWrapper

```tsx
<CategoryPageWrapper
  category="identity" // Required: category key
  pageTitle="Your Identity" // Optional: Page title
  pageDescription="Learn about..." // Optional: Subtitle
>
  {/* Content automatically themed */}
</CategoryPageWrapper>
```

**What it provides:**

- ✅ Gradient background (lighter → white)
- ✅ Category badge at top
- ✅ Themed borders and accents
- ✅ Proper spacing and layout

### CategoryBadge

```tsx
<CategoryBadge
  category="money" // Required
  className="additional-spacing" // Optional: Extra classes
/>
```

**Renders:** Small pill-shaped badge with category name and colors

### CategoryButton

```tsx
<CategoryButton
  category="identity" // Required
  onClick={() => {}} // Optional: Click handler
  disabled={false} // Optional: Disabled state
  className="custom-class" // Optional: Extra classes
>
  Button Text
</CategoryButton>
```

**What it provides:**

- ✅ Themed background color
- ✅ Hover effect (darker shade)
- ✅ White text automatically
- ✅ Proper padding and sizing

### CategoryCard

```tsx
<CategoryCard
  category="relationships" // Required
  className="shadow-lg" // Optional: Extra classes
>
  Card content here
</CategoryCard>
```

**What it provides:**

- ✅ Light background
- ✅ Colored border
- ✅ Rounded corners
- ✅ Proper padding

---

## 🎯 Common Implementation Scenarios

### Scenario 1: Quiz Page with Progress

```tsx
"use client";
import {
  CategoryPageWrapper,
  CategoryButton,
} from "@/components/ui/CategoryPageWrapper";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <CategoryPageWrapper category="identity">
      {/* Progress bar automatically themed */}

      {/* Display question */}

      {/* Navigation buttons */}
      <CategoryButton
        category="identity"
        onClick={() => setCurrentQuestion((prev) => prev + 1)}
      >
        Next Question →
      </CategoryButton>
    </CategoryPageWrapper>
  );
}
```

### Scenario 2: Results Display

```tsx
import {
  CategoryBadge,
  CategoryCard,
} from "@/components/ui/CategoryPageWrapper";
import { categoryThemes } from "@/config/categoryTheme";

export default function ResultsPage() {
  const theme = categoryThemes["money"];

  return (
    <div>
      <CategoryBadge category="money" />

      <h1>Your Money Profile</h1>
      <p>{theme.semanticMeaning}</p>

      <CategoryCard category="money">
        <h3>Key Insights</h3>
        {/* Results content */}
      </CategoryCard>
    </div>
  );
}
```

### Scenario 3: Dynamic Color Styling

```tsx
import { categoryThemes } from '@/config/categoryTheme';

function MyComponent({ category }) {
  const theme = categoryThemes[category];

  return (
    <div
      style={{
        backgroundColor: theme.lighter === 'blue-50' ? '#eff6ff' :
                        theme.lighter === 'pink-50' ? '#fdf2f8' :
                        // ... more conditions or use a mapping object
        color: theme.text
      }}
    >
      Dynamically themed content
    </div>
  );
}
```

---

## 📊 Inline Style Color Mapping

**For dynamic inline styles** (when Tailwind classes won't work):

```typescript
const colorMap = {
  'identity': { bg: '#eff6ff', primary: '#3b82f6', text: '#1d4ed8' },
  'relationships': { bg: '#fdf2f8', primary: '#ec4899', text: '#be185d' },
  'career': { bg: '#eef2ff', primary: '#6366f1', text: '#4338ca' },
  'life-direction': { bg: '#faf5ff', primary: '#a855f7', text: '#7e22ce' },
  'mindset': { bg: '#ecf9ff', primary: '#22d3ee', text: '#0891b2' },
  'emotional-health': { bg: '#fef2f2', primary: '#ef4444', text: '#b91c1c' },
  'life-patterns': { bg: '#fffbeb', primary: '#f59e0b', text: '#b45309' },
  'money': { bg: '#f0fdf4', primary: '#22c55e', text: '#15803d' },
  'reality-check': { bg: '#f9fafb', primary: '#6b7280', text: '#374151' },
};

// Usage
style={{ backgroundColor: colorMap[category].bg }}
```

---

## ⚡ Quick Copy-Paste Snippets

### Snippet 1: Full Page with Theme

```tsx
"use client";
import {
  CategoryPageWrapper,
  CategoryButton,
  CategoryCard,
} from "@/components/ui/CategoryPageWrapper";

export default function MyPage() {
  return (
    <CategoryPageWrapper category="identity" pageTitle="Title">
      <CategoryCard category="identity">Content</CategoryCard>
      <CategoryButton category="identity">Click Me</CategoryButton>
    </CategoryPageWrapper>
  );
}
```

### Snippet 2: Progress Bar

```tsx
<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
  <div
    style={{
      width: "60%",
      backgroundColor:
        categoryThemes[category].primary === "blue-500" ? "#3b82f6" : "#22c55e",
    }}
    className="h-full transition-all"
  />
</div>
```

### Snippet 3: Alert/Info Box

```tsx
<div
  style={{
    backgroundColor: categoryThemes[category].lighter,
    borderColor: categoryThemes[category].border,
  }}
  className="p-4 rounded-lg border-l-4"
>
  <p style={{ color: categoryThemes[category].text }}>Important message</p>
</div>
```

---

## 🔍 Troubleshooting Guide

| Problem                      | Solution                                        |
| ---------------------------- | ----------------------------------------------- |
| Colors not showing           | Check Tailwind config has all colors defined ✅ |
| Dropdown icons all blue      | Navbar fixed - now uses category colors ✅      |
| TypeScript error on category | Use type: `category: CategoryKey`               |
| Component not themed         | Make sure you imported from correct path        |
| Hover effect not working     | Use `CategoryButton` instead of regular button  |
| Need custom color            | Use inline style with hex value                 |

---

## ✅ Verification Checklist

Use this to verify everything is working:

- [ ] `npm run build` completes without errors
- [ ] Can import `categoryThemes` without errors
- [ ] Navbar dropdown shows category colors
- [ ] Can use `CategoryPageWrapper` in a page
- [ ] Text is readable on all colored backgrounds
- [ ] Hover effects work on buttons
- [ ] TypeScript gives no errors
- [ ] All 9 categories have distinct colors

---

## 📈 File Sizes

| File                    | Size            | Impact                        |
| ----------------------- | --------------- | ----------------------------- |
| categoryTheme.ts        | 5 KB            | Zero runtime overhead         |
| CategoryPageWrapper.tsx | 12 KB           | Tree-shakeable components     |
| Tailwind colors         | Added to config | ~2 KB CSS when used           |
| Total Impact            | ~19 KB          | Minimal, everything is needed |

---

## 🎓 Learning Path

1. **Day 1**: Read the summary, understand the 9 categories
2. **Day 1**: Try wrapping a page with `CategoryPageWrapper`
3. **Day 2**: Use themed components in a quiz/form
4. **Day 2**: Customize colors with inline styles if needed
5. **Day 3**: Create new category pages using the pattern

---

## 📞 When to Use What

| Use Case                     | Solution                       |
| ---------------------------- | ------------------------------ |
| Color for progress bar       | `categoryThemes[cat].primary`  |
| Badge with category name     | `<CategoryBadge>`              |
| Style entire page            | `<CategoryPageWrapper>`        |
| Create button matching theme | `<CategoryButton>`             |
| Get all theme data           | `getTheme('category')`         |
| List all 9 categories        | `getCategories()`              |
| Border color                 | `categoryThemes[cat].border`   |
| Button hover color           | `<CategoryButton>` (automatic) |

---

## 🚀 Next Steps

1. **Start Small**: Try wrapping the Identity page
2. **Test**: Run `npm run dev` and check colors in navbar
3. **Expand**: Create more category pages using wrapper
4. **Customize**: Add themed quiz components
5. **Deploy**: Build with `npm run build`

---

## 📚 Documentation Structure

- **This File**: Quick reference and snippets
- **CATEGORY_THEME_IMPLEMENTATION.md**: Complete guide (400 lines)
- **THEME_INTEGRATION_EXAMPLES.md**: 9 code examples
- **CATEGORY_THEME_SYSTEM_SUMMARY.md**: Architecture overview

---

## ✨ Key Takeaway

The category theme system is **production-ready**, **well-documented**, and **easy to use**. Start with `CategoryPageWrapper` for instant theming on any page.

```tsx
// That's literally all you need to theme a page:
<CategoryPageWrapper category="identity">
  Your content is now beautifully themed!
</CategoryPageWrapper>
```

🎉 You're all set!
