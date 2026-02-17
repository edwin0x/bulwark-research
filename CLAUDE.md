# Bulwark Research — Project Instructions

## What This Is

Bulwark Research is an AI-powered startup idea validator. Users describe a startup idea, an autonomous agent swarm runs internet-scale research, and a Big 4-quality intelligence brief is delivered to their inbox in ~30 minutes.

See `docs/business-overview.md` for the full business context.

---

## Tech Stack

- **Monorepo:** Turborepo with bun workspaces
- **Web framework:** TanStack Start (full-stack React, Vinxi/Vite-based)
- **Routing:** TanStack Router (file-based, type-safe)
- **API:** Hono (lightweight, edge-first)
- **Styling:** Tailwind CSS v4 (using `@theme` block for design tokens, not `tailwind.config`)
- **Linting/Formatting:** Biome (single config at monorepo root)
- **Package manager:** bun
- **Language:** TypeScript (strict mode)
- **Fonts:** Space Grotesk (headings), Playfair Display italic (accent), Manrope (body), JetBrains Mono (code/labels)

## Project Structure

```
bulwark-research/
├── apps/
│   ├── web/                          # TanStack Start marketing site
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── __root.tsx        # Root layout (HTML shell, fonts, grain)
│   │   │   │   ├── index.tsx         # Homepage route
│   │   │   │   └── pricing.tsx       # Pricing route
│   │   │   ├── components/           # React components (kebab-case files)
│   │   │   ├── data/                 # Shared data (plans, agents, steps)
│   │   │   ├── hooks/                # React hooks (use-scroll-reveal)
│   │   │   ├── styles/
│   │   │   │   └── global.css        # Design system (@theme tokens, animations)
│   │   │   └── router.tsx            # TanStack Router config
│   │   ├── public/                   # Static assets (favicons)
│   │   └── vite.config.ts            # TanStack Start + Tailwind v4 plugins
│   │
│   └── api/                          # Hono API placeholder
│       └── src/
│           └── index.ts              # Health check endpoint (port 3001)
│
├── packages/
│   └── tsconfig/                     # Shared TypeScript configs
│       ├── base.json                 # Strict base (ES2022, bundler resolution)
│       ├── react.json                # React apps (extends base)
│       └── node.json                 # Node/API apps (extends base)
│
├── turbo.json                        # Turborepo task pipeline
├── biome.json                        # Biome linting/formatting config
├── package.json                      # Root workspace config
└── docs/
    └── business-overview.md
```

---

## Design System

### Colors (defined in `apps/web/src/styles/global.css` `@theme` block)

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#09090b` | Background |
| `--color-ink-light` | `#141416` | Card backgrounds |
| `--color-ink-border` | `#2a2a2e` | Borders, dividers |
| `--color-paper` | `#fafaf9` | Primary text |
| `--color-ivory` | `#e8e8e3` | Secondary text |
| `--color-muted` | `#a1a09a` | Muted text |
| `--color-dim` | `#6f6d66` | Subtle text, labels |
| `--color-vermillion` | `#e5484d` | Primary accent (CTAs, highlights) |
| `--color-amber` | `#ffb224` | Secondary accent |
| `--color-emerald` | `#46a758` | Success states |
| `--color-cyan` | `#00a2c7` | Info accents |

### Font System

| Variable | Font | Usage |
|---|---|---|
| `--font-serif` | Space Grotesk | Headlines, section titles, prices |
| `--font-accent` | Playfair Display (italic only) | Emotional emphasis — always paired with `italic` and `text-gradient-warm` |
| `--font-sans` | Manrope | Body text (default) |
| `--font-mono` | JetBrains Mono | Labels, overlines, code-style text |

**Important:** The accent font pattern is always: `italic font-accent text-gradient-warm`. All 10+ instances follow this convention. Do not use Playfair Display in non-italic or non-gradient contexts.

### Key CSS Classes

| Class | Purpose |
|---|---|
| `.card-glass` | Glass-morphism card with hover glow |
| `.btn-glow` | Primary CTA button (vermillion with glow on hover) |
| `.btn-outline` | Secondary button (border only) |
| `.overline-divider` | Mono label with flanking gradient lines |
| `.section-title` | Section headings (Space Grotesk, tight leading) |
| `.text-gradient` | Paper-to-muted gradient text |
| `.text-gradient-warm` | Vermillion-to-amber gradient text |
| `.reveal` | Scroll-triggered fade-up animation (via `useScrollReveal` hook) |
| `.delay-{1-8}` | Stagger animation delays (0.1s increments) |
| `.grain` | Film grain overlay (applied to `<body>`) |

---

## Pricing Model

Credit-based, **no subscriptions**. This is a deliberate product decision.

| Plan | Price | Model |
|---|---|---|
| Free | $0 | 10 basic validations/month, forever |
| Pro | $299 | One-time credit pack (10 deep research credits, never expire) |
| Lifetime | $599 | One-time, 10 deep researches/month forever |

Plans data lives in `apps/web/src/data/plans.ts` — single source of truth for both pages.

---

## Conventions

### File Naming
- Use **kebab-case** for all file names (e.g., `pricing-cards.tsx`, not `PricingCards.tsx`)

### Monorepo
- Internal packages use `@bulwark/` scope (e.g., `@bulwark/tsconfig`, `@bulwark/web`)
- Workspace dependencies use `workspace:*` protocol
- Turborepo orchestrates builds/dev — use `turbo run <task>` from root

### CSS
- All design tokens live in `global.css` under `@theme` — Tailwind v4 auto-generates utility classes from these
- Prefer utility classes over custom CSS. Add to `global.css` only for reusable patterns
- New colors/fonts must be added to the `@theme` block to work as Tailwind utilities

### Components
- React components in `apps/web/src/components/` — named exports, kebab-case files
- Scroll reveal uses `useScrollReveal()` hook — wrap page content in a div with `ref={revealRef}`
- Internal routing uses TanStack `<Link>` component, hash links use regular `<a>` tags
- Shared data in `apps/web/src/data/` — typed exports with interfaces

### Content
- Copy should be concise, high-conviction, and avoid generic AI/startup jargon
- The tone is: "ex-McKinsey analyst writing for indie hackers" — rigorous but not corporate
- Key messaging pillars: **free first idea**, **30-minute delivery to inbox**, **downloadable from website**
- Time to deliver is **30 minutes** (not 5 minutes) — be consistent across all copy

### Pages
- `routes/index.tsx` contains the full homepage including a pricing section preview
- `routes/pricing.tsx` is the dedicated pricing page with comparison table and pricing-specific FAQ
- Both pages share the same `__root.tsx` layout and `global.css` design system
- Navigation links between pages use TanStack `<Link>` for routes, `<a>` for hash anchors

---

## Quick Reference

```bash
# Install dependencies
bun install

# Dev (all apps in parallel)
turbo run dev

# Build (all apps)
turbo run build

# Lint (Biome)
turbo run lint

# Type check
turbo run check

# Format
biome format --write .

# Dev single app
cd apps/web && bun run dev
cd apps/api && bun run dev
```
