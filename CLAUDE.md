# Superpower Next.js Codebase Guide

## Project Overview

This is a **health tech marketing/e-commerce website** for Superpower, a biomarker testing subscription service. Built as a modern Next.js 16 application that reimplements a Webflow website with enhanced interactivity and performance.

- **Framework**: Next.js 16.2.3
- **Runtime**: React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Webflow CSS framework (static) + Tailwind CSS for new components
- **Build Status**: Production-ready with visual QA testing infrastructure

## Project Structure

```
superpower-nextjs/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage (/)
│   ├── layout.tsx               # Root layout with metadata & Webflow styles
│   ├── globals.css              # Minimal global CSS (Webflow CSS loads in layout)
│   ├── biomarkers/              # Biomarker catalog & detail pages
│   │   ├── page.tsx             # Biomarkers index page
│   │   └── [slug]/page.tsx      # Dynamic biomarker detail pages
│   ├── checkout/                # E-commerce checkout flow
│   │   ├── page.tsx             # Main checkout (email + order summary)
│   │   ├── tiers/page.tsx       # Membership tier selection
│   │   ├── gift/page.tsx        # Gift membership flow
│   │   └── layout.tsx           # Checkout layout wrapper
│   ├── how-it-works/page.tsx    # How the service works
│   ├── gift/page.tsx            # Gift membership landing
│   └── reviews/page.tsx         # Member testimonials
├── components/                   # React components
│   ├── shared/                  # Global components
│   │   ├── Navbar.tsx           # Navigation with dropdown menu
│   │   ├── Footer.tsx           # Footer with links & CTAs
│   │   ├── MembershipPricing.tsx # Dynamic pricing display
│   │   ├── ExitIntentModal.tsx  # Exit-intent CTA modal
│   │   └── WebflowPageId.tsx    # Metadata for Webflow page tracking
│   ├── homepage/                # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── QuickFeatures.tsx
│   │   ├── LabsSection.tsx
│   │   ├── TrustpilotStats.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TestimonialsSlider.tsx  # Video testimonials (Swiper-based)
│   │   ├── ClearMobileSection.tsx
│   │   ├── WhatsIncluded.tsx
│   │   ├── CliniciansSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── BiomarkersTestSection.tsx
│   │   └── CTASection.tsx
│   ├── biomarkers/              # Biomarker index & detail components
│   │   ├── BiomarkersIndex.tsx  # Main biomarker page layout
│   │   ├── BiomarkerDetailContent.tsx  # Detail page content rendering
│   │   ├── BiomarkerAccordion.tsx
│   │   ├── BiomarkerSearch.tsx
│   │   ├── CategorySidebar.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── ConfigBar.tsx
│   │   ├── LabTesting.tsx
│   │   ├── PanelLegend.tsx
│   │   ├── BiomarkerDefinition.tsx
│   │   ├── BiomarkerFAQs.tsx
│   │   └── BiomarkersStyles.tsx
│   ├── checkout/                # Checkout form components
│   │   ├── TierSelector.tsx
│   │   ├── TierFeatures.tsx
│   │   ├── TierOrderSummary.tsx
│   │   ├── OrderSummaryCarousel.tsx  # Product carousel
│   │   ├── EmailForm.tsx
│   │   ├── TiersPageClient.tsx
│   │   ├── MemberAvatars.tsx
│   │   ├── SuperpowerLogo.tsx
│   │   ├── BackButton.tsx
│   │   ├── CheckIcon.tsx
│   │   └── LockIcon.tsx
│   ├── how-it-works/            # How-it-works page sections
│   │   ├── HiwHero.tsx
│   │   ├── HiwTimeline.tsx
│   │   ├── ActionPlans.tsx
│   │   ├── MemberResults.tsx
│   │   ├── WeGuideYouSwiper.tsx
│   │   └── FaqSection.tsx
│   ├── gift/                    # Gift membership sections
│   │   ├── GiftHero.tsx
│   │   ├── GiftWhatsIncluded.tsx
│   │   ├── GiftTestimonials.tsx
│   │   ├── GiftScrollAnimation.tsx
│   │   └── GiftFinalCTA.tsx
│   └── reviews/                 # Reviews/testimonials sections
│       ├── PhotoGridHero.tsx
│       ├── MemberTestimonials.tsx
│       ├── HealthDeservesMore.tsx
│       ├── CenteredTestimonialSlider.tsx
│       ├── TestimonialQuoteSlider.tsx
│       ├── StoriesSlider.tsx
│       └── StickyTestimonials.tsx
├── data/                         # Static data & configuration
│   ├── biomarkers.json          # Biomarker catalog (panels, categories, biomarkers)
│   ├── biomarker-details.ts     # Detailed biomarker content (TypeScript interface + data)
│   └── homepage-biomarkers.json # Biomarkers featured on homepage
├── hooks/                        # Custom React hooks
│   └── useDynamicPricing.ts     # Coupon/Rewardful pricing hook
├── lib/                          # Utility functions (empty - reserved for future)
├── public/                       # Static assets
│   ├── css/                     # Webflow CSS files + custom fonts.css
│   ├── js/                      # JavaScript assets
│   ├── images/                  # Image assets
│   ├── videos/                  # Video files
│   └── fonts/                   # Font files (cache-controlled)
├── tests/
│   └── qa/
│       ├── visual-compare.spec.ts    # Playwright visual comparison tests
│       └── sections.config.ts        # QA test configuration
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # Original boilerplate README
```

## Build & Dev Scripts

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm start         # Start production server
```

The `package.json` is minimal with no dedicated test/lint scripts beyond Playwright QA.

## Tech Stack

### Core Dependencies
- **Next.js 16.2.3**: App Router, server components, automatic code splitting
- **React 19.2.4**: Latest with concurrent rendering
- **TypeScript 5**: Full type safety
- **Tailwind CSS 4.2.2**: Utility-first CSS (used for new checkout components)

### Animation & Interactivity
- **GSAP 3.14.2**: Advanced animations (timeline, tweens)
- **Lenis 1.3.21**: Smooth scrolling library
- **Swiper 8.4.7**: Touch-enabled carousels/sliders
- **Split Type 0.3.4**: Text animation utilities
- **Plyr 3.8.4**: Video player
- **HLS.js 1.6.15**: HTTP Live Streaming support
- **Tippy.js 6.3.7**: Tooltip library
- **Popper.js 2.11.8**: Positioning engine

### Utilities
- **libphonenumber-js 1.12.41**: Phone number validation & formatting

### Dev Dependencies
- **Playwright 1.59.1**: E2E testing with visual regression
- **pixelmatch 7.1.0**: Pixel-level image comparison
- **pngjs 7.0.0**: PNG image handling

## Styling Architecture

### CSS Strategy
1. **Webflow CSS** (primary): Static CSS exports from Webflow in `/public/css/`
   - `superpower-health.shared.d8d9f18d0.min.css` — Main Webflow stylesheet
   - `fonts.css` — Custom font declarations
   - All Webflow classes preserved (`.navbar`, `.button`, `.section_home-hero`, etc.)

2. **Tailwind CSS** (secondary): Used for new checkout components
   - Checkout page heavily uses Tailwind utilities (`px-4`, `md:grid-cols-2`, etc.)
   - Integrated via `@tailwindcss/postcss@4.2.2`
   - No custom Tailwind config file (uses defaults)

3. **Global CSS** (`app/globals.css`): Minimal, only overrides for Next.js quirks
   - Main styles come from `/public/css/`

### Webflow Integration
- **Anti-flicker styles** in `app/layout.tsx` for smooth IX2 animation reveals
- **WebflowPageId** component tracks Webflow page IDs for analytics
- **Classes preserved**: `.w-mod-js`, `.w--current`, `.w-inline-block`, etc.

## Key Features & Patterns

### Dynamic Pricing
- **useDynamicPricing hook** (`hooks/useDynamicPricing.ts`)
  - Base price: $19900 cents ($199/year)
  - Integrates with Rewardful affiliate platform
  - Supports URL query parameter `?accessCode=` for coupon codes
  - Fetches discount from `https://go-stripe.superpower.com/coupon?code={couponCode}`
  - Returns formatted prices (annual, monthly, cents, numbers)

### Biomarker Catalog
- 100+ biomarkers organized into 9 panels (Baseline, Advanced, Cardiovascular, Fertility, Metabolic, Autoimmunity, Nutrients, Methylation, Organ Age)
- Two data files:
  - `data/biomarkers.json` — Catalog structure (panels, categories, biomarkers)
  - `data/biomarker-details.ts` — Content for detail pages (sections, FAQs, similar biomarkers)
- Dynamic routes: `/biomarkers/[slug]` for individual biomarker pages
- Components: search, category sidebar, table of contents, detail content rendering

### Video Integration
- Testimonial videos use `<video>` elements with opacity fade-in on load
- `HLS.js` support for streaming
- `Plyr` video player for enhanced controls
- Swiper for video carousels

### Checkout Flow
- Multi-step checkout: Email → Payment (expandable)
- Tier selector component for membership options
- Order summary carousel (mobile + desktop versions)
- Integration points: Rewardful for affiliate tracking, Stripe for payment

## Next.js Configuration

- **Image Optimization**: `unoptimized: true` (uses Webflow CDN)
- **Remote Patterns**: Three allowed image hosts:
  - `cdn.prod.website-files.com` (Webflow CDN)
  - `assets.superpower.com`
  - `superpower-website.b-cdn.net`
- **Cache Headers**: `/fonts/*` and `/css/*` cached indefinitely (immutable)

## Testing & QA

### Visual Regression Testing
- **Playwright** configuration in `playwright.config.ts`
- **Test file**: `tests/qa/visual-compare.spec.ts`
- **Configuration**: `tests/qa/sections.config.ts` (defines pages to test)
- **Comparison**: Pixel-level comparison using `pixelmatch` between original Webflow site and Next.js version
- **Output**: Results saved to `qa-output/` directory

Example test:
```bash
npx playwright test
```

## TypeScript Configuration

- **Target**: ES2017
- **Strict Mode**: ✓ Enabled
- **Path Alias**: `@/*` → root directory
- **Type Checking**: Strict null checks, no emit without checking

## Important Context

### Webflow Migration
- This is a **faithful recreation** of a Webflow website in Next.js
- Preserves all Webflow CSS classes and HTML structure
- Introduces React interactivity while maintaining visual parity
- Visual QA ensures pixel-perfect alignment with original

### Component Philosophy
- Each section is self-contained, client or server component
- Minimal prop drilling; data usually inline or imported
- Webflow-native styling preferred over new CSS-in-JS

### Performance Considerations
- Lazy-loaded videos (opacity fade-in after canplay/loadeddata)
- Cache-controlled static assets (fonts, CSS)
- Next.js Image Optimization disabled (relies on remote CDNs)

## Common Tasks & Patterns

### Adding a New Page
1. Create file in `app/[route]/page.tsx`
2. Import shared components (Navbar, Footer)
3. Use Webflow CSS classes
4. Add metadata export for SEO

### Modifying Styles
- If class-based: Edit `/public/css/superpower-health.shared.*.min.css` or adjust in `app/layout.tsx`
- If component-specific: Use inline styles or new Tailwind utilities
- Avoid creating new global CSS files

### Testing Visual Changes
```bash
npx playwright test
```
Compares current state against original Webflow site.

### Integrating New Libraries
- Animations: Use GSAP or Swiper (already included)
- UI Components: Prefer Tailwind utilities over external component libraries
- Check `package.json` before adding duplicates

## Troubleshooting

**Issue**: Flash of unstyled content (FOUC)
- Solution: Anti-flicker styles in `layout.tsx` hide IX2-animated elements until page loads

**Issue**: Webflow CSS conflicts
- Solution: Use `!important` sparingly; prefer specificity or inline overrides

**Issue**: Video playback issues
- Solution: Use `.readyState >= 3` check before showing; supports HLS.js fallback

**Issue**: Coupon code not applying
- Solution: Check `useDynamicPricing` hook; verify Rewardful/accessCode parameter; check `/coupon` endpoint

## Future Enhancements

- [ ] Add ESLint + Prettier configuration
- [ ] Expand Playwright QA coverage
- [ ] Add API routes for backend integration
- [ ] Consider Storybook for component documentation
- [ ] Performance monitoring (Web Vitals)
- [ ] Accessibility audit (WCAG compliance)

---

**Last Updated**: Phase 3 (April 2026) — Added Playwright visual QA infrastructure
**Maintainer Notes**: See `AGENTS.md` for agent-specific guidance on Next.js 16 breaking changes.
