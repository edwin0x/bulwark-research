# Bulwark Research: TanStack Start + Turborepo Migration Design

**Date:** 2026-02-17
**Status:** Approved

## Overview

Migrate the Bulwark Research marketing site from Astro (static site) to a Turborepo monorepo with TanStack Start (full-stack React) and a Hono API placeholder. Use Biome for linting/formatting, bun for package management, and TypeScript throughout.

## Approach

**Clean Scaffold + Manual Port** — create a fresh Turborepo monorepo from scratch, scaffold both apps, then port existing Astro content into React components. The site is only 2 pages, so the porting effort is modest.

## Monorepo Structure

```
bulwark-research/
├── apps/
│   ├── web/                          # TanStack Start marketing site
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── __root.tsx        # Root layout (HTML shell, fonts, grain)
│   │   │   │   ├── index.tsx         # Homepage route
│   │   │   │   └── pricing.tsx       # Pricing route
│   │   │   ├── components/
│   │   │   │   ├── navbar.tsx
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── problem.tsx
│   │   │   │   ├── manifesto.tsx
│   │   │   │   ├── how-it-works.tsx
│   │   │   │   ├── bento-grid.tsx
│   │   │   │   ├── report-preview.tsx
│   │   │   │   ├── testimonials.tsx
│   │   │   │   ├── pricing-cards.tsx
│   │   │   │   ├── comparison-table.tsx
│   │   │   │   ├── faq.tsx
│   │   │   │   ├── cta.tsx
│   │   │   │   └── footer.tsx
│   │   │   ├── data/
│   │   │   │   ├── plans.ts          # Pricing plans (deduped)
│   │   │   │   ├── agents.ts         # Bento grid agent data
│   │   │   │   └── steps.ts          # How-it-works steps
│   │   │   ├── hooks/
│   │   │   │   └── use-scroll-reveal.ts
│   │   │   ├── styles/
│   │   │   │   └── global.css        # Design system (ported as-is)
│   │   │   ├── router.tsx
│   │   │   └── routeTree.gen.ts      # Auto-generated
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   └── favicon.svg
│   │   ├── vite.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                          # Hono API placeholder
│       ├── src/
│       │   └── index.ts              # Health check endpoint
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── tsconfig/                     # Shared TypeScript configs
│       ├── base.json
│       ├── react.json
│       ├── node.json
│       └── package.json
│
├── turbo.json
├── biome.json
├── package.json                      # Root workspace
├── bun.lock
├── docs/
│   ├── business-overview.md
│   └── plans/
├── CLAUDE.md
└── .gitignore
```

## TanStack Start Configuration

### vite.config.ts (apps/web)

- `@tanstack/start/plugin` for SSR and file-based routing
- `@tailwindcss/vite` for Tailwind v4 (same plugin approach as current Astro config)
- Vinxi-powered (Vite-based) — native Tailwind v4 compatibility

### Root Route (__root.tsx)

- `head()` defines meta tags, Google Fonts links, global.css stylesheet link
- Renders `<html>` shell with `<HeadContent />`, `<Outlet />`, `<Scripts />`
- Body classes: `grain bg-ink text-paper`
- No shared navbar/footer in root (pages compose their own)

### Router (router.tsx)

- `createRouter()` with `scrollRestoration: true`
- Type-safe routing via generated `routeTree`

### Page Routes

- `index.tsx` composes: Navbar, Hero, Problem, Manifesto, HowItWorks, BentoGrid, ReportPreview, Testimonials, PricingCards, FAQ, CTA, Footer
- `pricing.tsx` composes: Navbar, PricingCards, ComparisonTable, FAQ (pricing-specific), CTA, Footer

## Turborepo Pipeline

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".output/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "check": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Root Scripts

- `dev` — `turbo run dev` (parallel dev servers)
- `build` — `turbo run build` (dependency-ordered builds)
- `lint` — `turbo run lint` (Biome across all packages)
- `check` — `turbo run check` (tsc type-checking)
- `format` — `biome format --write .`

## Tooling

### Biome (root biome.json)

- Single config at monorepo root
- TypeScript + React (JSX) formatting and linting
- Replaces ESLint + Prettier

### Shared TypeScript Configs (@bulwark/tsconfig)

- `base.json` — strict mode, ES2022, bundler module resolution
- `react.json` — extends base, JSX transform, React settings
- `node.json` — extends base, Node module resolution

## Component Conversion

| Astro Section | React Component | Notes |
|---|---|---|
| Navbar | `navbar.tsx` | TanStack `<Link>` for routing |
| Hero | `hero.tsx` | Input field + trust signals |
| Problem stats | `problem.tsx` | Stat cards |
| Manifesto | `manifesto.tsx` | Content block |
| How It Works | `how-it-works.tsx` | Steps + terminal viz |
| Bento Grid | `bento-grid.tsx` | Agent capability cards |
| Report Preview | `report-preview.tsx` | Mockup preview |
| Testimonials | `testimonials.tsx` | CSS marquee animation |
| Pricing Cards | `pricing-cards.tsx` | Shared, data from plans.ts |
| Comparison Table | `comparison-table.tsx` | Pricing page only |
| FAQ | `faq.tsx` | Accepts faqs prop |
| CTA | `cta.tsx` | Reusable CTA block |
| Footer | `footer.tsx` | Links + social icons |

### Scroll Reveal

- `useScrollReveal()` React hook wrapping IntersectionObserver
- Components use `ref={revealRef}` + initial opacity-0
- Replaces global `.reveal` class approach

### Data Deduplication

- `data/plans.ts` — single source of truth (was duplicated in both pages)
- `data/agents.ts` — bento grid agent capabilities
- `data/steps.ts` — how-it-works steps
- FAQ data stays inline per page (different content per page)

## API Placeholder (Hono)

- `apps/api/src/index.ts` — Hono app with `/health` endpoint
- Runs via `bun run src/index.ts`
- Minimal: no middleware, no database, no auth

## What Stays the Same

- All CSS classes (`card-glass`, `btn-glow`, `text-gradient-warm`, etc.)
- Font loading via Google Fonts in `<head>`
- `grain` overlay, all animations, all color tokens
- Design system in `global.css` with `@theme` block
- Tailwind v4 via Vite plugin

## Cleanup

- Remove `startup-idea-validator/` directory (legacy duplicate)
- Remove `BUSINESS_OVERVIEW.md` (duplicate of `docs/business-overview.md`)
- Remove Astro-specific files (`astro.config.mjs`, `.astro/`, etc.)
