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
- **Auth/Database:** Supabase (auth, Postgres, RLS)
- **Fonts:** Instrument Sans (headings/display), Satoshi (body), IBM Plex Mono (labels/code)

## Project Structure

```
bulwark-research/
├── apps/
│   ├── web/                          # TanStack Start marketing site + client portal
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── __root.tsx        # Root layout (HTML shell, fonts, dot grid)
│   │   │   │   ├── index.tsx         # Homepage route
│   │   │   │   ├── pricing.tsx       # Pricing route
│   │   │   │   └── portal/           # Client portal (auth-gated)
│   │   │   │       ├── sign-in.tsx   # Email/password sign-in
│   │   │   │       ├── onboarding.tsx# Sign-up flow (email → profile → confirm)
│   │   │   │       ├── callback.tsx  # Supabase auth callback handler
│   │   │   │       ├── index.tsx     # Portal dashboard
│   │   │   │       └── engagements/  # Engagement CRUD
│   │   │   ├── components/           # React components (kebab-case files)
│   │   │   ├── data/                 # Shared data (plans, agents, research lenses)
│   │   │   ├── hooks/                # React hooks (use-scroll-reveal, use-require-auth)
│   │   │   ├── lib/                  # Utilities (supabase client, database types)
│   │   │   ├── styles/
│   │   │   │   └── global.css        # Design system (@theme tokens, animations)
│   │   │   └── router.tsx            # TanStack Router config
│   │   ├── public/                   # Static assets (favicons)
│   │   ├── supabase/migrations/      # SQL migrations (profiles, engagements)
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

## Design System ("Blueprint")

The visual identity is a technical blueprint aesthetic — clean white backgrounds, dot-grid patterns, registration marks at viewport corners, and sharp geometric elements with zero border-radius.

### Colors (defined in `apps/web/src/styles/global.css` `@theme` block)

**Light theme** — achromatic palette with a single signal red accent.

| Token | Value | Usage |
|---|---|---|
| `--color-white` | `#fdfdfd` | Page background |
| `--color-surface` | `#f4f4f5` | Card fills, input backgrounds |
| `--color-grid` | `#e8e8ec` | Dot grid, registration marks |
| `--color-border` | `#c8c8cf` | Borders, dividers, card edges |
| `--color-ink` | `#131316` | Primary text (dark) |
| `--color-secondary` | `#5a5a65` | Secondary text |
| `--color-dim` | `#9c9ca6` | Muted text, labels |
| `--color-ghost` | `#d5d5db` | Large section numbers, faint UI |
| `--color-signal` | `#e03e3e` | Primary accent (CTAs, active states) |
| `--color-signal-bg` | `#fef2f2` | Signal background (error states) |
| `--color-amber` | `#d9940a` | Secondary accent |
| `--color-emerald` | `#2d8a3e` | Success states |
| `--color-cyan` | `#0089a8` | Info accents |

### Font System

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | Instrument Sans | Headlines, section titles, buttons (uppercase, tracked) |
| `--font-sans` | Satoshi | Body text (default, via Fontshare) |
| `--font-mono` | IBM Plex Mono | Labels, overlines, code-style text, coordinates |

### Key CSS Classes

| Class | Purpose |
|---|---|
| `.bp-card` | Blueprint card — transparent bg, border, red hover accent, `border-radius: 0` |
| `.bp-card-filled` | Blueprint card with surface fill |
| `.btn-signal` | Primary CTA button (signal red border, fills on hover) |
| `.btn-outline` | Secondary button (border only, fills ink on hover) |
| `.overline-divider` | Mono label with flanking border lines |
| `.section-title` | Section headings (Instrument Sans, uppercase, tight leading) |
| `.bp-section` | Section with large ghost number + title + rule |
| `.crop-marks` | Print-style crop marks on corners of an element |
| `.dot-grid` | Fixed full-viewport dot grid background |
| `.registration-marks` | Crosshair marks at viewport corners |
| `.reveal` | Scroll-triggered slide-in animation (via `useScrollReveal` hook) |
| `.delay-{1-8}` | Stagger animation delays (0.1s increments) |
| `.dim-annotate` | Dimension annotations that appear on hover |
| `.bp-link` | Underline-draw-from-left link style |

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

### Supabase
- Client is lazy-initialized via `getSupabase()` from `~/lib/supabase` — never import a bare `supabase` constant
- Database types live in `~/lib/database.types.ts` — regenerate from migrations when schema changes
- Auth-gated portal pages use the `useRequireAuth()` hook from `~/hooks/use-require-auth`
- Always add explicit `.eq('user_id', session.user.id)` filters on queries — don't rely solely on RLS
- Env vars: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`)

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
- `routes/portal/` is the auth-gated client portal (sign-in, onboarding, dashboard, engagements)
- All pages share the same `__root.tsx` layout (dot grid, registration marks, coordinate markers)
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
