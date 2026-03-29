# TrueSelf - Frontend UI Structure

A modern, clean, and scalable SaaS product frontend built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## 🎯 Project Overview

TrueSelf is a self-discovery platform that helps users understand their life patterns through structured quizzes. This is the **UI skeleton phase** - a complete landing page structure with reusable components and no backend logic, authentication, or API integration.

## 📁 Project Structure

```
trueself/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Global layout with Navbar & Footer
│   └── page.tsx                 # Home page (landing page)
│
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx           # Customizable button component
│   │   ├── Card.tsx             # Card wrapper with hover effects
│   │   └── SectionWrapper.tsx   # Section container with spacing
│   │
│   └── sections/                # Page sections (composable)
│       ├── Navbar.tsx           # Navigation bar with links & CTAs
│       ├── HeroSection.tsx      # Hero with headline and buttons
│       ├── ProblemSection.tsx   # Problem statement section
│       ├── HowItWorksSection.tsx # 3-step process explanation
│       ├── QuizCategoriesSection.tsx # Category cards preview
│       ├── ValueSection.tsx     # Value proposition
│       ├── PricingSection.tsx   # Pricing cards (Monthly/Yearly)
│       ├── FinalCTASection.tsx  # Final call-to-action
│       └── Footer.tsx           # Footer with links
│
├── styles/
│   └── globals.css              # Global styles & Tailwind directives
│
├── public/                      # Static assets (images, logos, etc.)
│
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎨 Component Architecture

### Reusable UI Components

#### `Button`

- **Variants**: `primary`, `secondary`, `outline`
- **Sizes**: `sm`, `md`, `lg`
- **Features**: Hover effects, smooth transitions, active state scaling

```tsx
<Button variant="primary" size="lg">
  Start Your First Quiz
</Button>
```

#### `Card`

- **Props**: `hover`, `variant` (default, elevated)
- **Features**: Smooth elevation on hover, border or shadow options
- **Use cases**: Feature cards, pricing cards, category cards

```tsx
<Card variant="elevated" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

#### `SectionWrapper`

- **Props**: `darkBg`, `id`, `className`
- **Features**: Responsive padding, max-width container, optional background
- **Use cases**: Wrapping full-width sections for consistent spacing

```tsx
<SectionWrapper id="section-id" darkBg>
  <h2>Section Title</h2>
  {/* content */}
</SectionWrapper>
```

### Page Sections

All sections are modular and can be:

- Reordered
- Positioned on different pages
- Customized independently
- Updated without affecting others

## 🎯 Landing Page Sections

1. **Navbar** - Sticky navigation with logo, links, and CTAs
2. **Hero Section** - Main headline with subtext and action buttons
3. **Problem Section** - Problem statement to establish relevance
4. **How It Works** - 3-step process explanation
5. **Quiz Categories** - 5 category cards for quiz types
6. **Value Section** - System vs. test differentiation
7. **Pricing Section** - Monthly (RM9.90) & Yearly (RM59) plans
8. **Final CTA** - Last call-to-action before footer
9. **Footer** - Brand, links, and copyright information

## 🎨 Design System

### Colors

- **Primary**: Blue (`#3b82f6`)
- **Background**: White (`#ffffff`)
- **Text**: Slate (`#1f2937`, `#0f172a`)
- **Light BG**: Slate 50 (`#f8fafc`)
- **Dark**: Slate 900 (`#0f172a`)

### Typography

- **Font Stack**: System fonts (SF Pro Display, Segoe UI, Roboto)
- **Heading**: Bold, large sizes (48px-64px)
- **Body**: Regular weight, readable line-height

### Spacing

- **Section Spacing**: 64px - 128px vertical padding
- **Component Gap**: 24px - 32px
- **Padding**: Responsive (6px - 12px horizontal)

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📋 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

- Strict mode enabled
- Path alias `@/*` for imports
- ES2020 target

### Tailwind (`tailwind.config.ts`)

- Custom colors (primary, accent, light)
- Responsive utilities
- Smooth animations and transitions

### Next.js (`next.config.js`)

- React strict mode enabled
- SWC minification for fast builds

## 📝 Notes

### What's Included ✅

- Clean, scalable folder structure
- Reusable UI components
- Responsive design (mobile-first)
- Tailwind CSS styling
- TypeScript for type safety
- Modern SaaS aesthetic
- Smooth animations and transitions
- Semantic HTML structure

### What's NOT Included ❌

- Backend logic or API calls
- Authentication system
- State management (Redux, Zustand, etc.)
- Real data handling
- Database integration
- Environment variables setup (if needed later)

## 🚀 Next Steps

### Phase 2: Interactivity

- Add routing for subpages
- Implement quiz pages
- Add form handling (contact, subscribe)
- Integrate analytics

### Phase 3: Backend Integration

- Connect to API endpoints
- Implement authentication
- Add quiz logic and scoring
- Set up database

### Phase 4: Deployment

- Deploy to Vercel, Netlify, or AWS
- Set up CI/CD pipeline
- Configure custom domain
- Monitor performance

## 🏗️ Customization Guide

### Adding New Sections

1. Create a new file in `components/sections/`
2. Use `SectionWrapper` and existing components
3. Import in `app/page.tsx`
4. Arrange in desired order

### Changing Colors

Edit `tailwind.config.ts`:

```tsx
colors: {
  primary: '#your-color',
  accent: '#your-color',
}
```

### Adjusting Spacing

Modify `@tailwind components` in `styles/globals.css` or use inline Tailwind utilities.

### Adding Images

Place images in `public/` folder and import:

```tsx
<img src="/image-name.png" alt="description" />
```

## 📱 Responsive Design

All components are mobile-first responsive:

- **Mobile**: 360px+ (default Tailwind)
- **Tablet**: 768px+ (`md:` prefix)
- **Desktop**: 1024px+ (`lg:` prefix)

Breakpoints follow Tailwind defaults and can be customized in `tailwind.config.ts`.

## 🔍 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Chrome Mobile

## 📄 License

[Specify your license here]

## 📞 Support

For questions or issues, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Built with ❤️ for TrueSelf**
