# TanStack Start + Turborepo Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the Bulwark Research marketing site from Astro to a Turborepo monorepo with TanStack Start (React) and a Hono API placeholder.

**Architecture:** Clean scaffold approach — create fresh monorepo structure, port design system and content into React components. Two apps (`web` + `api`), one shared package (`tsconfig`). Biome for linting/formatting, bun workspaces, Tailwind CSS v4 via Vite plugin.

**Tech Stack:** TanStack Start, TanStack Router, React, Tailwind CSS v4, Hono, Turborepo, Biome, bun, TypeScript

---

## Task 1: Scaffold Monorepo Root

**Files:**
- Create: `package.json` (overwrite existing)
- Create: `turbo.json`
- Create: `biome.json`
- Create: `.gitignore` (overwrite existing)

**Step 1: Create root package.json**

```json
{
  "name": "bulwark-research",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "check": "turbo run check",
    "format": "biome format --write ."
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "turbo": "^2.4.4"
  },
  "packageManager": "bun@1.2.0",
  "workspaces": ["apps/*", "packages/*"]
}
```

**Step 2: Create turbo.json**

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
    "lint": {},
    "check": {}
  }
}
```

**Step 3: Create biome.json**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  },
  "files": {
    "ignore": [
      "node_modules",
      "dist",
      ".output",
      "*.gen.ts",
      "bun.lock"
    ]
  }
}
```

**Step 4: Create .gitignore**

```
node_modules
dist
.output
.turbo
*.tsbuildinfo
bun.lock
.DS_Store
.env
.env.local
```

**Step 5: Create directory structure**

```bash
mkdir -p apps/web/src/{routes,components,data,hooks,styles}
mkdir -p apps/web/public
mkdir -p apps/api/src
mkdir -p packages/tsconfig
```

**Step 6: Commit**

```bash
git add package.json turbo.json biome.json .gitignore
git commit -m "chore: scaffold monorepo root with Turborepo, Biome, bun workspaces"
```

---

## Task 2: Create Shared TypeScript Config Package

**Files:**
- Create: `packages/tsconfig/package.json`
- Create: `packages/tsconfig/base.json`
- Create: `packages/tsconfig/react.json`
- Create: `packages/tsconfig/node.json`

**Step 1: Create packages/tsconfig/package.json**

```json
{
  "name": "@bulwark/tsconfig",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  }
}
```

**Step 2: Create packages/tsconfig/base.json**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true
  },
  "exclude": ["node_modules", "dist", ".output"]
}
```

**Step 3: Create packages/tsconfig/react.json**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

**Step 4: Create packages/tsconfig/node.json**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": ["bun-types"]
  }
}
```

**Step 5: Commit**

```bash
git add packages/tsconfig/
git commit -m "chore: add shared TypeScript config package (@bulwark/tsconfig)"
```

---

## Task 3: Scaffold TanStack Start Web App

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/src/router.tsx`
- Create: `apps/web/src/routes/__root.tsx`
- Copy: `public/favicon.ico` → `apps/web/public/favicon.ico`
- Copy: `public/favicon.svg` → `apps/web/public/favicon.svg`

**Step 1: Create apps/web/package.json**

```json
{
  "name": "@bulwark/web",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start",
    "lint": "biome check src/",
    "check": "tsc --noEmit"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.18",
    "@tanstack/react-router": "^1.114.3",
    "@tanstack/start": "^1.114.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwindcss": "^4.1.18",
    "vinxi": "^0.5.3"
  },
  "devDependencies": {
    "@bulwark/tsconfig": "workspace:*",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "typescript": "^5.8.3"
  }
}
```

**Step 2: Create apps/web/tsconfig.json**

```json
{
  "extends": "@bulwark/tsconfig/react.json",
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    },
    "tsBuildInfoFile": "./node_modules/.cache/tsbuildinfo.json"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "vite.config.ts"]
}
```

**Step 3: Create apps/web/vite.config.ts**

```ts
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/start/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tanstackStart(), tailwindcss()],
})
```

**Step 4: Create apps/web/src/router.tsx**

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
```

**Step 5: Create apps/web/src/routes/__root.tsx**

This is the HTML shell — equivalent of the current `Layout.astro`. It defines the `<head>` (fonts, meta, CSS), the `<body>` with grain overlay, and renders child routes via `<Outlet />`.

```tsx
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import appCss from '~/styles/global.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#09090b' },
      {
        name: 'description',
        content:
          'Everyone can build. Few know what to build. Get Big 4-quality due diligence on any startup idea — market research, competitor analysis, and financial projections delivered to your inbox in 30 minutes. First idea free.',
      },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600;1,700&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Archivo+Black&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="grain bg-ink text-paper">
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
```

**Step 6: Copy favicons**

```bash
cp public/favicon.ico apps/web/public/favicon.ico
cp public/favicon.svg apps/web/public/favicon.svg
```

**Step 7: Install dependencies and verify**

```bash
bun install
```

Run: `bun install` from the monorepo root.
Expected: Dependencies install successfully, workspace links resolve.

**Step 8: Commit**

```bash
git add apps/web/
git commit -m "feat: scaffold TanStack Start web app with router, root route, Tailwind v4"
```

---

## Task 4: Port Design System (global.css)

**Files:**
- Create: `apps/web/src/styles/global.css` (copy from `src/styles/global.css` — content is identical, no Astro-specific syntax)

**Step 1: Copy global.css**

The file is pure CSS with Tailwind v4 `@theme` block. No modifications needed — it works identically in TanStack Start's Vite setup.

```bash
cp src/styles/global.css apps/web/src/styles/global.css
```

**Step 2: Commit**

```bash
git add apps/web/src/styles/global.css
git commit -m "feat: port design system (global.css) to web app"
```

---

## Task 5: Create Data Files

**Files:**
- Create: `apps/web/src/data/plans.ts`
- Create: `apps/web/src/data/agents.ts`
- Create: `apps/web/src/data/steps.ts`

**Step 1: Create apps/web/src/data/plans.ts**

Extract the `plans` array from `index.astro` frontmatter. This is the single source of truth — both homepage and pricing page import from here.

```ts
export interface Plan {
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  cta: string
  featured: boolean
}

export const plans: Plan[] = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    desc: '10 validations every month, on us',
    features: [
      '10 validations/month',
      'Market size analysis',
      'Top 5 competitors',
      'Basic risk score',
      'PDF export',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '299',
    period: 'one-time',
    desc: '10 deep research credits — use anytime',
    features: [
      '10 deep research credits',
      'Full agent swarm analysis',
      'Monte Carlo financials',
      'GTM playbook',
      'Investor-ready reports',
      'Credits never expire',
    ],
    cta: 'Buy Credits',
    featured: true,
  },
  {
    name: 'Lifetime',
    price: '599',
    period: 'one-time',
    desc: '10 deep researches/month — forever',
    features: [
      '10 deep researches/month',
      'Everything in Pro',
      'Lifetime access',
      'Priority processing',
      'White-label reports',
      'Dedicated support',
    ],
    cta: 'Go Lifetime',
    featured: false,
  },
]
```

**Step 2: Create apps/web/src/data/agents.ts**

```ts
export interface Agent {
  name: string
  desc: string
  icon: string
  hex: string
}

export const agents: Agent[] = [
  { name: 'Market Sizing', desc: 'TAM, SAM, SOM with bottom-up and top-down modeling across 200+ industry databases', icon: '◎', hex: '#e5484d' },
  { name: 'Competitor Intel', desc: 'Internet-scale crawling of competitors — funding, hiring, product launches, positioning maps, moat analysis', icon: '◈', hex: '#ffb224' },
  { name: 'Business Model', desc: 'Revenue model stress-testing, unit economics simulation, pricing elasticity analysis', icon: '◇', hex: '#46a758' },
  { name: 'Technical Feasibility', desc: 'Architecture complexity scoring, build-vs-buy analysis, infrastructure cost modeling', icon: '⬡', hex: '#00a2c7' },
  { name: 'Risk Assessment', desc: 'Multi-dimensional risk matrix — market, execution, regulatory, financial, competitive', icon: '△', hex: '#e5484d' },
  { name: 'GTM Strategy', desc: 'Channel analysis, CAC modeling, launch sequence planning, growth lever identification', icon: '▷', hex: '#ffb224' },
  { name: 'Financial Projections', desc: '3-year P&L modeling, runway scenarios, funding requirement analysis, sensitivity tables', icon: '▢', hex: '#46a758' },
  { name: 'Executive Summary', desc: 'Cross-agent synthesis with weighted confidence scoring and go/no-go recommendation', icon: '◉', hex: '#00a2c7' },
]

export interface SwarmAgent {
  name: string
  hex: string
  pct: number
}

export const swarmAgents: SwarmAgent[] = [
  { name: 'Market Sizing', hex: '#e5484d', pct: 92 },
  { name: 'Competitor Intel', hex: '#ffb224', pct: 87 },
  { name: 'Business Model', hex: '#46a758', pct: 78 },
  { name: 'Technical Feasibility', hex: '#00a2c7', pct: 71 },
  { name: 'Risk Assessment', hex: '#e5484d', pct: 65 },
  { name: 'GTM Strategy', hex: '#ffb224', pct: 58 },
  { name: 'Financial Projections', hex: '#46a758', pct: 44 },
  { name: 'Synthesis Engine', hex: '#00a2c7', pct: 31 },
]
```

**Step 3: Create apps/web/src/data/steps.ts**

```ts
export interface Step {
  num: string
  title: string
  desc: string
  mono: string
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'Describe what you want to build',
    desc: 'Tell us the idea in plain language — the problem, the customer, the vision. No pitch deck required. Our system decomposes it into researchable dimensions.',
    mono: 'INPUT',
  },
  {
    num: '02',
    title: 'An agent swarm runs internet-scale research',
    desc: 'Dozens of specialized agents fan out across the internet — crawling databases, analyzing competitors, modeling financials, stress-testing assumptions — all in parallel.',
    mono: 'SWARM',
  },
  {
    num: '03',
    title: 'Get your report in 30 minutes',
    desc: "A synthesis engine cross-references every agent's findings, resolves conflicts, and scores confidence. Your report is delivered straight to your inbox — and available to download from the website anytime.",
    mono: 'DELIVER',
  },
]
```

**Step 4: Commit**

```bash
git add apps/web/src/data/
git commit -m "feat: extract shared data files (plans, agents, steps)"
```

---

## Task 6: Create useScrollReveal Hook

**Files:**
- Create: `apps/web/src/hooks/use-scroll-reveal.ts`

**Step 1: Create the hook**

This replaces the global IntersectionObserver script from `Layout.astro`. Instead of adding `.reveal` classes and a global observer, React components call this hook to get a ref that triggers the fade-up animation.

```ts
import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    // Observe the element and all .reveal children
    const revealElements = el.querySelectorAll('.reveal')
    for (const revealEl of revealElements) {
      observer.observe(revealEl)
    }
    if (el.classList.contains('reveal')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
```

**Step 2: Commit**

```bash
git add apps/web/src/hooks/
git commit -m "feat: add useScrollReveal hook (port of Astro IntersectionObserver)"
```

---

## Task 7: Port Shared Components (Navbar, Footer, PricingCards, FAQ, CTA)

These components are used by both pages.

**Files:**
- Create: `apps/web/src/components/navbar.tsx`
- Create: `apps/web/src/components/footer.tsx`
- Create: `apps/web/src/components/pricing-cards.tsx`
- Create: `apps/web/src/components/faq.tsx`
- Create: `apps/web/src/components/cta.tsx`

**Step 1: Create navbar.tsx**

Convert the `<nav>` from `index.astro` lines 82-109. Replace `<a href>` with TanStack `<Link>` for internal routes. Keep hash links as regular `<a>` tags.

```tsx
import { Link } from '@tanstack/react-router'

export function Navbar({ activePage = 'home' }: { activePage?: 'home' | 'pricing' }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6 8V6H9V4h2v2h3V3.5L16 1.5l2 2V6h3V4h2v2h3v2c0 9-4 16-10 21C10 24 6 17 6 8zm3 1.5c0 7.5 3 13 7 16.5 4-3.5 7-9 7-16.5z" fill="currentColor" />
            <path d="M16 9.5h7c0 7.5-3 13-7 16.5z" fill="var(--color-vermillion)" />
          </svg>
          <span className="text-[14px] tracking-[0.06em] uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            Bulwark{' '}
            <span className="text-muted" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}>
              Research
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href={activePage === 'home' ? '#how-it-works' : '/#how-it-works'} className="hover:text-paper transition-colors duration-200">How it works</a>
          <a href={activePage === 'home' ? '#what-you-get' : '/#what-you-get'} className="hover:text-paper transition-colors duration-200">What you get</a>
          <Link to="/pricing" className={`transition-colors duration-200 ${activePage === 'pricing' ? 'text-paper' : 'hover:text-paper'}`}>Pricing</Link>
          <a href={activePage === 'home' ? '#faq' : '/#faq'} className="hover:text-paper transition-colors duration-200">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/pricing" className="hidden sm:inline-block text-sm text-muted hover:text-paper transition-colors">Sign in</Link>
          <a href={activePage === 'home' ? '#hero-input' : '/#hero-input'} className="btn-glow px-5 py-2 text-sm">Validate an Idea</a>
        </div>
      </div>
    </nav>
  )
}
```

**Step 2: Create footer.tsx**

Convert the `<footer>` from `index.astro` lines 737-804. Use TanStack `<Link>` for the `/pricing` route.

```tsx
import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="border-t border-ink-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 8V6H9V4h2v2h3V3.5L16 1.5l2 2V6h3V4h2v2h3v2c0 9-4 16-10 21C10 24 6 17 6 8zm3 1.5c0 7.5 3 13 7 16.5 4-3.5 7-9 7-16.5z" fill="currentColor" />
                <path d="M16 9.5h7c0 7.5-3 13-7 16.5z" fill="var(--color-vermillion)" />
              </svg>
              <span className="text-[14px] tracking-[0.06em] uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                Bulwark{' '}
                <span className="text-muted" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}>
                  Research
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm text-dim leading-relaxed max-w-xs">
              Big 4-quality due diligence for founders who know that judgment — not execution — is the real moat.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href="/#how-it-works" className="hover:text-paper transition-colors">How it works</a></li>
              <li><a href="/#what-you-get" className="hover:text-paper transition-colors">What you get</a></li>
              <li><Link to="/pricing" className="hover:text-paper transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-paper transition-colors">Sample Report</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href="#" className="hover:text-paper transition-colors">About</a></li>
              <li><a href="#" className="hover:text-paper transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-paper transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-paper transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href="#" className="hover:text-paper transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-paper transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-paper transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-ink-border mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-dim">&copy; 2026 Bulwark Research. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-dim hover:text-paper transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#" className="text-dim hover:text-paper transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="#" className="text-dim hover:text-paper transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Step 3: Create pricing-cards.tsx**

Shared pricing card grid. Used by both homepage (with reveal) and pricing page (with fade-up animations).

```tsx
import { plans } from '~/data/plans'

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {plans.map((plan, i) => (
        <div
          key={plan.name}
          className={`card-glass rounded-2xl p-8 reveal delay-${i + 2} ${plan.featured ? 'pricing-active' : ''} flex flex-col`}
        >
          {plan.featured && (
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-vermillion/10 border border-vermillion/20 font-mono text-[10px] text-vermillion uppercase tracking-widest">
                Best Value
              </span>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-serif text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-sm text-dim">{plan.desc}</p>
          </div>

          <div className="mb-8">
            <span className="font-serif text-4xl font-bold">
              {plan.price === '0' ? 'Free' : `$${plan.price}`}
            </span>
            {plan.price !== '0' && (
              <span className="text-sm text-dim ml-1">{plan.period}</span>
            )}
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <svg className="w-4 h-4 text-emerald shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-ivory">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${plan.featured ? 'btn-glow' : 'btn-outline'}`}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  )
}
```

**Step 4: Create faq.tsx**

Accepts faqs prop since homepage and pricing page have different FAQ content.

```tsx
interface FaqItem {
  q: string
  a: string
}

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={faq.q} className={`group card-glass rounded-xl reveal delay-${(i % 4) + 2}`}>
          <summary className="flex items-center justify-between cursor-pointer p-6 text-sm font-medium text-ivory hover:text-paper transition-colors list-none">
            {faq.q}
            <svg className="w-4 h-4 text-dim shrink-0 ml-4 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-sm text-muted leading-relaxed">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  )
}
```

**Step 5: Create cta.tsx**

Generic CTA section. Used at the bottom of both pages with different content.

```tsx
interface CtaProps {
  overline?: string
  title: React.ReactNode
  subtitle: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function Cta({ overline, title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CtaProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {overline && <div className="overline-divider max-w-md mx-auto mb-10 reveal">{overline}</div>}
        <h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">{title}</h2>
        <p className="text-muted mt-4 mb-10 reveal delay-2">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal delay-3">
          <a href={primaryHref} className="btn-glow px-8 py-3.5 text-sm">{primaryLabel}</a>
          {secondaryLabel && secondaryHref && (
            <a href={secondaryHref} className="btn-outline px-8 py-3.5 text-sm">{secondaryLabel}</a>
          )}
        </div>
      </div>
    </section>
  )
}
```

**Step 6: Commit**

```bash
git add apps/web/src/components/navbar.tsx apps/web/src/components/footer.tsx apps/web/src/components/pricing-cards.tsx apps/web/src/components/faq.tsx apps/web/src/components/cta.tsx
git commit -m "feat: port shared components (navbar, footer, pricing-cards, faq, cta)"
```

---

## Task 8: Port Homepage-Only Components

**Files:**
- Create: `apps/web/src/components/hero.tsx`
- Create: `apps/web/src/components/problem.tsx`
- Create: `apps/web/src/components/manifesto.tsx`
- Create: `apps/web/src/components/how-it-works.tsx`
- Create: `apps/web/src/components/bento-grid.tsx`
- Create: `apps/web/src/components/report-preview.tsx`
- Create: `apps/web/src/components/testimonials.tsx`

**Step 1: Create hero.tsx**

Convert `index.astro` lines 115-221. This is the hero section with headline, input field, trust signals, and scroll indicator. Port the inline SVGs for trust logos.

The JSX conversion requires: `class` → `className`, `fill-rule` → `fillRule`, `clip-rule` → `clipRule`, `stroke-linecap` → `strokeLinecap`, `stroke-linejoin` → `strokeLinejoin`, `stroke-width` → `strokeWidth`, self-closing tags, etc.

Write the full component from the Astro template at `src/pages/index.astro` lines 115-221.

**Step 2: Create problem.tsx**

Convert `index.astro` lines 227-251. The `stats` data array should be inlined in this component (only used here).

**Step 3: Create manifesto.tsx**

Convert `index.astro` lines 257-306. The "Why Bulwark Exists" section with manifesto copy and blockquote.

**Step 4: Create how-it-works.tsx**

Convert `index.astro` lines 313-408. Imports `steps` and `swarmAgents` from data files. Includes the terminal process visualization.

**Step 5: Create bento-grid.tsx**

Convert `index.astro` lines 415-443. Imports `agents` from data file. 8-card bento grid layout.

**Step 6: Create report-preview.tsx**

Convert `index.astro` lines 450-588. The report mockup with TAM/SAM/SOM, competitor landscape, and risk assessment.

**Step 7: Create testimonials.tsx**

Convert `index.astro` lines 594-610. Marquee with testimonial quotes. The `quotes` data should be inlined (only used here).

**Step 8: Commit**

```bash
git add apps/web/src/components/hero.tsx apps/web/src/components/problem.tsx apps/web/src/components/manifesto.tsx apps/web/src/components/how-it-works.tsx apps/web/src/components/bento-grid.tsx apps/web/src/components/report-preview.tsx apps/web/src/components/testimonials.tsx
git commit -m "feat: port homepage components (hero, problem, manifesto, how-it-works, bento-grid, report-preview, testimonials)"
```

---

## Task 9: Port Comparison Table Component

**Files:**
- Create: `apps/web/src/components/comparison-table.tsx`

**Step 1: Create comparison-table.tsx**

Convert `pricing.astro` lines 141-243. The feature comparison table with check/dash marks. This is pricing page only.

All the check SVGs can be extracted into a local `CheckIcon` component to avoid repetition.

**Step 2: Commit**

```bash
git add apps/web/src/components/comparison-table.tsx
git commit -m "feat: port comparison table component"
```

---

## Task 10: Wire Up Homepage Route

**Files:**
- Create: `apps/web/src/routes/index.tsx`

**Step 1: Create the homepage route**

Compose all homepage components. The route uses `createFileRoute` and sets page-specific head meta.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/navbar'
import { Hero } from '~/components/hero'
import { Problem } from '~/components/problem'
import { Manifesto } from '~/components/manifesto'
import { HowItWorks } from '~/components/how-it-works'
import { BentoGrid } from '~/components/bento-grid'
import { ReportPreview } from '~/components/report-preview'
import { Testimonials } from '~/components/testimonials'
import { PricingCards } from '~/components/pricing-cards'
import { Faq } from '~/components/faq'
import { Cta } from '~/components/cta'
import { Footer } from '~/components/footer'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

const faqs = [
  { q: 'How is this different from asking ChatGPT?', a: "ChatGPT gives you a single model's opinion. Bulwark deploys an entire swarm of specialized agents — each focused on one dimension of due diligence — that crawl the internet, cross-reference findings across thousands of sources, run financial simulations, and produce a structured report with confidence scores. It's the difference between asking a friend and hiring McKinsey." },
  { q: 'What kind of research report do I get?', a: 'A 30+ page intelligence brief covering every dimension McKinsey would analyze: market sizing (TAM/SAM/SOM), competitor landscape, business model viability, technical feasibility, risk matrix, GTM strategy, financial projections with Monte Carlo simulations, and an executive summary with a weighted go/no-go recommendation. Synthesized from 1,000+ data sources. Delivered to your inbox in about 30 minutes — and always available to download from your dashboard.' },
  { q: 'What do you mean by "agent swarm"?', a: "Instead of a single AI answering your question, Bulwark deploys dozens of specialized agents in parallel — each an expert in a specific domain. They independently research, then a synthesis engine cross-references their findings to resolve conflicts and produce a unified intelligence brief. It's how large consulting firms work, but at internet scale." },
  { q: 'Who is this for?', a: 'Any founder deciding what to build next. Solo founders validating their first idea. Serial entrepreneurs choosing between concepts. Venture studios evaluating deal flow. Anyone who believes taste and judgment matter more than execution speed.' },
  { q: 'Is my idea kept confidential?', a: 'Yes. Your ideas are encrypted at rest and in transit. We never share, sell, or use your data to train models. You own your data and can delete it at any time.' },
]

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Bulwark Research — AI-Powered Startup Idea Validation' },
      { property: 'og:title', content: 'Bulwark Research — AI-Powered Startup Idea Validation' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef}>
      <Navbar activePage="home" />
      <Hero />
      <Problem />
      <Manifesto />
      <HowItWorks />
      <BentoGrid />
      <ReportPreview />
      <Testimonials />
      <section id="pricing" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="overline-divider max-w-xs mx-auto mb-4 reveal">Pricing</div>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
              Big 4 rigor.<br />
              <span className="italic font-accent text-gradient-warm">Founder-friendly pricing.</span>
            </h2>
          </div>
          <PricingCards />
        </div>
      </section>
      <section id="faq" className="relative py-24 px-6">
        <div className="divider max-w-6xl mx-auto mb-24" />
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <div className="overline-divider max-w-xs mx-auto mb-4 reveal">FAQ</div>
            <h2 className="section-title text-3xl sm:text-4xl reveal delay-1">Common questions</h2>
          </div>
          <Faq faqs={faqs} />
        </div>
      </section>
      <Cta
        overline="The Last Moat"
        title={<>Taste decides what to build.<br /><span className="italic font-accent text-gradient-warm">Bulwark gives you the proof.</span></>}
        subtitle="Your first idea is free. Get a Big 4-quality dossier delivered to your inbox in 30 minutes — no credit card, no catch."
        primaryLabel="Validate Your Idea — Free"
        primaryHref="#hero-input"
        secondaryLabel="See Sample Report"
        secondaryHref="#"
      />
      <Footer />
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/src/routes/index.tsx
git commit -m "feat: wire up homepage route with all section components"
```

---

## Task 11: Wire Up Pricing Route

**Files:**
- Create: `apps/web/src/routes/pricing.tsx`

**Step 1: Create the pricing route**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/navbar'
import { PricingCards } from '~/components/pricing-cards'
import { ComparisonTable } from '~/components/comparison-table'
import { Faq } from '~/components/faq'
import { Footer } from '~/components/footer'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

const faqs = [
  { q: 'How is this different from asking ChatGPT?', a: "ChatGPT gives you a single model's opinion. Bulwark deploys an entire swarm of specialized agents — each focused on one dimension of due diligence — that crawl the internet, cross-reference findings across thousands of sources, run financial simulations, and produce a structured report with confidence scores. It's the difference between asking a friend and hiring McKinsey." },
  { q: 'What kind of research report do I get?', a: 'A 30+ page intelligence brief covering every dimension McKinsey would analyze: market sizing (TAM/SAM/SOM), competitor landscape, business model viability, technical feasibility, risk matrix, GTM strategy, financial projections with Monte Carlo simulations, and an executive summary with a weighted go/no-go recommendation. Synthesized from 1,000+ data sources. Delivered to your inbox in about 30 minutes — and always available to download from your dashboard.' },
  { q: 'Do Pro credits expire?', a: "No. Pro credits never expire — use them whenever you're ready. Buy once, validate on your own schedule. The Lifetime plan gives you 10 deep researches per month, forever, with no recurring charges." },
  { q: 'Is my idea kept confidential?', a: 'Yes. Your ideas are encrypted at rest and in transit. We never share, sell, or use your data to train models. You own your data and can delete it at any time.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex) and process payments securely through Stripe. Annual billing is available for Founder and Studio plans with a 20% discount.' },
]

export const Route = createFileRoute('/pricing')({
  head: () => ({
    meta: [
      { title: 'Pricing — Bulwark Research' },
      { name: 'description', content: 'Big 4 rigor at founder-friendly prices. Choose the plan that fits your validation needs.' },
      { property: 'og:title', content: 'Pricing — Bulwark Research' },
    ],
  }),
  component: PricingPage,
})

function PricingPage() {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef}>
      <Navbar activePage="pricing" />

      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">Pricing</div>
            <h1 className="section-title text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Big 4 rigor.<br />
              <span className="italic font-accent text-gradient-warm">Founder-friendly pricing.</span>
            </h1>
            <p className="text-lg text-muted max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Your first idea is free — report delivered to your inbox in 30 minutes. Also available to download from your dashboard anytime.
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      <ComparisonTable />

      <section className="relative py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <div className="overline-divider max-w-xs mx-auto mb-4 reveal">FAQ</div>
            <h2 className="section-title text-3xl sm:text-4xl reveal delay-1">Common questions</h2>
          </div>
          <Faq faqs={faqs} />
        </div>
      </section>

      <section className="relative py-24 px-6">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="section-title text-2xl sm:text-3xl mb-4 reveal">Still not sure?</h2>
          <p className="text-muted mb-8 reveal delay-1">
            Your first idea is free. Report delivered to your inbox in 30 minutes — no credit card required. Download it from the website anytime.
          </p>
          <a href="/#hero-input" className="btn-glow px-8 py-3.5 text-sm reveal delay-2">
            Validate Your First Idea — Free
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/src/routes/pricing.tsx
git commit -m "feat: wire up pricing route with comparison table and FAQ"
```

---

## Task 12: Scaffold Hono API Placeholder

**Files:**
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/src/index.ts`

**Step 1: Create apps/api/package.json**

```json
{
  "name": "@bulwark/api",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun run --hot src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target bun",
    "start": "bun run dist/index.js",
    "lint": "biome check src/",
    "check": "tsc --noEmit"
  },
  "dependencies": {
    "hono": "^4.7.4"
  },
  "devDependencies": {
    "@bulwark/tsconfig": "workspace:*",
    "@types/bun": "^1.2.4",
    "typescript": "^5.8.3"
  }
}
```

**Step 2: Create apps/api/tsconfig.json**

```json
{
  "extends": "@bulwark/tsconfig/node.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.cache/tsbuildinfo.json"
  },
  "include": ["src/**/*.ts"]
}
```

**Step 3: Create apps/api/src/index.ts**

```ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default {
  port: 3001,
  fetch: app.fetch,
}
```

**Step 4: Install dependencies**

```bash
bun install
```

**Step 5: Commit**

```bash
git add apps/api/
git commit -m "feat: scaffold Hono API placeholder with health check endpoint"
```

---

## Task 13: Clean Up Old Astro Files

**Files:**
- Remove: `src/` (entire directory)
- Remove: `astro.config.mjs`
- Remove: `startup-idea-validator/` (legacy duplicate)
- Remove: `BUSINESS_OVERVIEW.md` (duplicate)
- Remove: `.astro/` (build cache)
- Remove: `.vscode/` (Astro-specific config)
- Remove: `dist/` (old build output)
- Remove: `README.md` (Astro starter template readme)
- Keep: `docs/`, `CLAUDE.md`, `public/` (already copied to apps/web)

**Step 1: Remove old files**

```bash
rm -rf src/ astro.config.mjs startup-idea-validator/ BUSINESS_OVERVIEW.md .astro/ .vscode/ dist/ README.md public/ tsconfig.json
```

**Step 2: Update CLAUDE.md**

Update the CLAUDE.md to reflect the new monorepo structure. Key changes:
- Framework: Astro → TanStack Start
- Build commands: `npx astro build` → `turbo run build`
- Dev command: `npx astro dev` → `turbo run dev`
- Project structure: Update the tree to reflect monorepo layout
- Add Biome section
- Update Quick Reference commands

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old Astro files, update CLAUDE.md for monorepo"
```

---

## Task 14: Verify Build and Dev Server

**Step 1: Install all dependencies**

```bash
bun install
```

Run: `bun install` from monorepo root.
Expected: All workspace dependencies resolve, including `@bulwark/tsconfig` workspace links.

**Step 2: Run type checking**

```bash
turbo run check
```

Expected: No TypeScript errors in either `@bulwark/web` or `@bulwark/api`.

**Step 3: Run lint**

```bash
turbo run lint
```

Expected: No Biome errors. Fix any formatting/linting issues.

**Step 4: Run build**

```bash
turbo run build
```

Expected: Both apps build successfully. Web app outputs to `apps/web/.output/`, API outputs to `apps/api/dist/`.

**Step 5: Run dev servers**

```bash
turbo run dev
```

Expected: Both dev servers start. Web at `localhost:3000`, API at `localhost:3001`.

**Step 6: Verify pages render**

- Navigate to `http://localhost:3000` — homepage should render with all sections
- Navigate to `http://localhost:3000/pricing` — pricing page should render
- Navigate to `http://localhost:3001/health` — API returns `{ status: "ok" }`
- Verify scroll reveal animations work
- Verify the grain overlay renders
- Verify fonts load (Space Grotesk, Playfair Display, Manrope, JetBrains Mono)

**Step 7: Final commit**

```bash
git add -A
git commit -m "chore: verify build pipeline, fix any remaining issues"
```

---

## Summary

| Task | Description | Est. Files |
|------|-------------|-----------|
| 1 | Scaffold monorepo root | 4 |
| 2 | Shared tsconfig package | 4 |
| 3 | TanStack Start web app scaffold | 6 |
| 4 | Port global.css design system | 1 |
| 5 | Create data files | 3 |
| 6 | useScrollReveal hook | 1 |
| 7 | Shared components (navbar, footer, pricing-cards, faq, cta) | 5 |
| 8 | Homepage components (hero, problem, manifesto, how-it-works, bento-grid, report-preview, testimonials) | 7 |
| 9 | Comparison table component | 1 |
| 10 | Homepage route | 1 |
| 11 | Pricing route | 1 |
| 12 | Hono API placeholder | 3 |
| 13 | Clean up old Astro files | 0 (removals + CLAUDE.md update) |
| 14 | Verify build and dev | 0 (verification) |
