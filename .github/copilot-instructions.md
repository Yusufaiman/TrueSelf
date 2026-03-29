# TrueSelf Frontend Development Guidelines

This document provides workspace-specific instructions for developing the TrueSelf frontend UI.

## Project Overview

TrueSelf is a modern SaaS product frontend built with:

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (with @tailwindcss/postcss)
- **Component-based architecture**

This is a **UI skeleton** - no backend logic, authentication, or API integration.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Mode

```bash
npm run dev
```

App runs at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
npm start
```

### 4. Linting

```bash
npm run lint
```

## Project Structure

```
/app              → Next.js App Router pages & layouts
/components       → Reusable React components
  ├── /ui        → Base UI components (Button, Card, SectionWrapper)
  └── /sections  → Page sections (Navbar, Hero, Footer, etc.)
/styles           → Global CSS (globals.css with Tailwind)
/public           → Static assets
```

## Key Components

### UI Components (`/components/ui/`)

- **Button** - Customizable button with 3 variants & 3 sizes
- **Card** - Card container with hover effects
- **SectionWrapper** - Section layout with responsive spacing

### Section Components (`/components/sections/`)

All sections are modular and replaceable:

- Navbar, Hero, Problem, HowItWorks, QuizCategories
- Value, Pricing, FinalCTA, Footer

## Development Guidelines

### TypeScript

- Strict mode enabled (no implicit `any`)
- Use proper type annotations for props
- All components should be typed (`React.FC<Props>`)

### Styling

- Use Tailwind CSS utilities (no custom CSS unless necessary)
- Color palette: primary (#0f172a), accent (#3b82f6), light (#f8fafc)
- Responsive breakpoints: `md:` (768px), `lg:` (1024px)

### Components

- Keep components focused and single-responsibility
- Components should be importable and reusable
- Use `'use client'` for interactive components

### File Organization

- One component per file
- Use descriptive names (e.g., `HeroSection.tsx`, not `Hero.tsx`)
- Group related components in folders

## Important Notes

### What We Have ✅

- Clean scalable folder structure
- Reusable UI components with TypeScript
- Fully responsive landing page
- Modern, minimal SaaS design
- Working build system with Tailwind CSS v4

### What We Don't Have ❌

- Backend logic or API integration
- Authentication system
- Real data handling
- State management library
- Database integration

### Configuration Files

- `tsconfig.json` - TypeScript with `ignoreDeprecations: "6.0"` for TS6 compatibility
- `next.config.js` - Next.js with React strict mode
- `tailwind.config.ts` - Tailwind CSS with custom colors
- `postcss.config.js` - PostCSS with @tailwindcss/postcss
- `.eslintrc.json` - ESLint configuration
- `.vscode/` - Debug, tasks, and settings for VS Code

## Debugging & Development

### VS Code Setup

- Debug configuration in `.vscode/launch.json`
- Development tasks in `.vscode/tasks.json`
- Editor settings in `.vscode/settings.json`

### Running Debug

Press F5 in VS Code to start debugging with the Next.js dev server.

## Adding New Pages/Sections

1. **Create file** in `/components/sections/` or `/app/`
2. **Use existing components** for consistency
3. **Import in page.tsx** to add to home page
4. **Test responsiveness** at different breakpoints

## Common Tasks

### Change Brand Colors

Edit `tailwind.config.ts` colors in the theme.extend section.

### Add New Button Style

Add variant to `Button.tsx` component, then use in JSX.

### Create New Section Page

1. Create `SomePage.tsx` in `/app/`
2. Use `SectionWrapper` for layout
3. Import components as needed

## Next Steps for Production

1. **Phase 2**: Add routing, quizzes, and forms
2. **Phase 3**: Connect backend APIs
3. **Phase 4**: Add authentication
4. **Phase 5**: Deploy (Vercel, Netlify, AWS)

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [React Docs](https://react.dev)

---

**Last Updated**: March 2026  
**Status**: UI Skeleton - Production Ready ✓
