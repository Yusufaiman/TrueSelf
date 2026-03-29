# Category Theme System - Quick Integration Examples

## Example 1: Wrap Existing Category Page

To add theme styling to any existing category page, simply wrap it with `CategoryPageWrapper`.

### Before (Generic):

```tsx
// app/tests/money/page.tsx
export default function MoneyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1>Money Test</h1>
      {/* content */}
    </div>
  );
}
```

### After (Themed):

```tsx
"use client";

import { CategoryPageWrapper } from "@/components/ui/CategoryPageWrapper";

export default function MoneyPage() {
  return (
    <CategoryPageWrapper
      category="money"
      pageTitle="Your Money Mindset"
      pageDescription="Discover your financial behavior patterns"
    >
      {/* Your existing content */}
      <h2>Questions</h2>
      {/* ... */}
    </CategoryPageWrapper>
  );
}
```

**Result**:

- ✅ Green gradient background
- ✅ Green "Money" badge at top
- ✅ Themed borders and accents
- ✅ Instant visual identity

---

## Example 2: Styled Quiz Card

Apply category colors to quiz components:

```tsx
import {
  CategoryCard,
  CategoryButton,
} from "@/components/ui/CategoryPageWrapper";

function QuizQuestion({ category, question }) {
  return (
    <CategoryCard category={category}>
      <h3 className="text-lg font-semibold mb-4">{question.text}</h3>

      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <label key={rating} className="flex items-center">
            <input type="radio" name="answer" value={rating} />
            <span className="ml-2">{"★".repeat(rating)}</span>
          </label>
        ))}
      </div>

      <CategoryButton category={category} className="mt-6">
        Next Question →
      </CategoryButton>
    </CategoryCard>
  );
}
```

**Result**:

- Pink card if category="relationships"
- Green card if category="money"
- Matching button color
- Professional appearance

---

## Example 3: Progress Bar with Category Color

```tsx
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";

function ProgressBar({
  category,
  current,
  total,
}: {
  category: CategoryKey;
  current: number;
  total: number;
}) {
  const theme = categoryThemes[category];

  // Hex color mapping
  const primaryColor: Record<string, string> = {
    "blue-500": "#3b82f6",
    "pink-500": "#ec4899",
    "indigo-500": "#6366f1",
    "purple-500": "#a855f7",
    "cyan-500": "#22d3ee",
    "red-500": "#ef4444",
    "amber-500": "#f59e0b",
    "green-500": "#22c55e",
    "slate-500": "#6b7280",
  };

  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Question {current}/{total}
        </span>
        <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: primaryColor[theme.primary] || "#6b7280",
          }}
          className="h-full transition-all duration-300"
        />
      </div>
    </div>
  );
}
```

**Usage**:

```tsx
<ProgressBar category="identity" current={3} total={35} />
// Shows blue progress bar
```

---

## Example 4: Result Card with Category Badge

```tsx
import {
  CategoryBadge,
  CategoryCard,
} from "@/components/ui/CategoryPageWrapper";
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";

function ResultCard({ category }: { category: CategoryKey }) {
  const theme = categoryThemes[category];

  return (
    <div>
      <CategoryBadge category={category} className="mb-4" />

      <h2 className="text-3xl font-bold mb-2">The {theme.name}</h2>

      <p className="text-gray-600 mb-6">{theme.semanticMeaning}</p>

      <CategoryCard category={category}>
        <p>
          You scored high in areas related to{" "}
          {theme.semanticMeaning.toLowerCase()}.
        </p>
      </CategoryCard>
    </div>
  );
}
```

---

## Example 5: Category Navigation

Show category links with icons and colors:

```tsx
import { categoryThemes, getCategories } from "@/config/categoryTheme";
import { CategoryButton } from "@/components/ui/CategoryPageWrapper";

function CategoryNav() {
  const categories = getCategories();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {categories.map(({ key, name }) => (
        <CategoryButton
          key={key}
          category={key}
          onClick={() => (window.location.href = `/tests/${key}`)}
          className="text-left"
        >
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-90">
              {categoryThemes[key].semanticMeaning}
            </div>
          </div>
        </CategoryButton>
      ))}
    </div>
  );
}
```

---

## Example 6: Dynamic Dimension Display

When displaying assessment dimensions with colors:

```tsx
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";

function DimensionScore({
  category,
  label,
  score,
}: {
  category: CategoryKey;
  label: string;
  score: number; // 0-100
}) {
  const theme = categoryThemes[category];

  const colorMap: Record<string, string> = {
    "blue-500": "#3b82f6",
    "pink-500": "#ec4899",
    "indigo-500": "#6366f1",
    "purple-500": "#a855f7",
    "cyan-500": "#22d3ee",
    "red-500": "#ef4444",
    "amber-500": "#f59e0b",
    "green-500": "#22c55e",
    "slate-500": "#6b7280",
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span style={{ color: colorMap[theme.primary] }} className="font-bold">
          {score}%
        </span>
      </div>

      <div
        className="h-3 rounded-full bg-gray-100 overflow-hidden"
        style={{ borderColor: colorMap[theme.primary] + "40" }}
      >
        <div
          style={{
            width: `${score}%`,
            backgroundColor: colorMap[theme.primary],
          }}
          className="h-full transition-all duration-500"
        />
      </div>
    </div>
  );
}
```

**Usage**:

```tsx
<DimensionScore category="identity" label="Self-Awareness" score={75} />
// Blue bar for identity category
```

---

## Example 7: Info Box / Alert with Category Color

```tsx
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";

function CategoryAlert({
  category,
  title,
  message,
}: {
  category: CategoryKey;
  title: string;
  message: string;
}) {
  const theme = categoryThemes[category];

  const bgMap: Record<string, Record<string, string>> = {
    "blue-500": { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8" },
    "pink-500": { bg: "#fdf2f8", border: "#fbcfe8", text: "#be185d" },
    "indigo-500": { bg: "#eef2ff", border: "#c7d2fe", text: "#4338ca" },
    "purple-500": { bg: "#faf5ff", border: "#e9d5ff", text: "#7e22ce" },
    "cyan-500": { bg: "#ecf9ff", border: "#a5f3fc", text: "#0891b2" },
    "red-500": { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c" },
    "amber-500": { bg: "#fffbeb", border: "#fde68a", text: "#b45309" },
    "green-500": { bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
    "slate-500": { bg: "#f9fafb", border: "#e5e7eb", text: "#374151" },
  };

  const colors = bgMap[theme.primary] || bgMap["slate-500"];

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderLeftWidth: "4px",
        borderLeftColor: colors.text,
      }}
      className="p-4 rounded-lg"
    >
      <h4 style={{ color: colors.text }} className="font-semibold mb-1">
        {title}
      </h4>
      <p style={{ color: colors.text }} className="text-sm opacity-80">
        {message}
      </p>
    </div>
  );
}
```

---

## Example 8: Multi-Step Form with Progress

```tsx
import {
  CategoryPageWrapper,
  CategoryButton,
} from "@/components/ui/CategoryPageWrapper";
import { type CategoryKey } from "@/config/categoryTheme";
import { ProgressBar } from "./ProgressBar";

export default function TestFlow({ category }: { category: CategoryKey }) {
  const [step, setStep] = useState(1);
  const totalSteps = 35;

  return (
    <CategoryPageWrapper category={category}>
      <ProgressBar category={category} current={step} total={totalSteps} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6">Question {step}</h2>

        {/* Question content */}

        <div className="flex gap-4 mt-8">
          <CategoryButton
            category={category}
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            ← Previous
          </CategoryButton>

          <CategoryButton
            category={category}
            onClick={() => setStep(step + 1)}
            disabled={step === totalSteps}
          >
            Next →
          </CategoryButton>
        </div>
      </div>
    </CategoryPageWrapper>
  );
}
```

---

## Example 9: Theme Toggle for Testing

Quick way to preview different category themes (development only):

```tsx
"use client";

import { useState } from "react";
import { CategoryPageWrapper } from "@/components/ui/CategoryPageWrapper";
import { getCategories, type CategoryKey } from "@/config/categoryTheme";

export default function ThemeTest() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("identity");
  const categories = getCategories();

  return (
    <CategoryPageWrapper
      category={selectedCategory}
      pageTitle={`Testing: ${categoryThemes[selectedCategory].name}`}
    >
      <div className="mb-8 p-4 bg-white rounded border">
        <p className="font-semibold mb-4">Select Theme:</p>
        <div className="grid grid-cols-3 gap-2">
          {categories.map(({ key, name }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-2 rounded ${
                selectedCategory === key ? "ring-2 font-bold" : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p>Theme is now applied to the entire page.</p>
        <p>
          Background gradient, badge, borders - all reflect the selected
          category.
        </p>
      </div>
    </CategoryPageWrapper>
  );
}
```

---

## Summary

| Component             | Use Case              | Example            |
| --------------------- | --------------------- | ------------------ |
| `CategoryPageWrapper` | Entire page theming   | Wrap page content  |
| `CategoryBadge`       | Inline category label | Show category name |
| `CategoryButton`      | Themed CTA button     | Quiz navigation    |
| `CategoryCard`        | Content container     | Quiz question card |
| `categoryThemes`      | Raw color access      | Custom styling     |
| `getTheme()`          | Get single theme      | Direct lookup      |
| `getCategories()`     | Get all categories    | List/map views     |

All components are fully typed with TypeScript and ready for production use.
