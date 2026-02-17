# Bulwark Research — Project Instructions

## What This Is

Bulwark Research is an AI-powered startup idea validator. Users describe a startup idea, an autonomous agent swarm runs internet-scale research, and a Big 4-quality intelligence brief is delivered to their inbox in ~30 minutes.

See `docs/business-overview.md` for the full business context.

---

## Tech Stack

- **Framework:** Astro (static site generator)
- **Styling:** Tailwind CSS v4 (using `@theme` block for design tokens, not `tailwind.config`)
- **Package manager:** bun
- **Fonts:** Space Grotesk (headings), Playfair Display italic (accent), Manrope (body), JetBrains Mono (code/labels)
- **Build:** `npx astro build` → outputs to `dist/`
- **Preview:** `npx serve dist -l <port>`

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # Shared HTML shell — fonts, meta, scroll-reveal script
├── pages/
│   ├── index.astro            # Homepage — hero, problem, manifesto, how-it-works, bento, report preview, pricing, FAQ, CTA
│   └── pricing.astro          # Standalone pricing page — cards, comparison table, FAQ, CTA
└── styles/
    └── global.css             # Design system — @theme tokens, animations, utility classes
docs/
└── business-overview.md       # Business context, pricing model, positioning, target audience
```

---

## Design System

### Colors (defined in `global.css` `@theme` block)

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
| `.reveal` | Scroll-triggered fade-up animation (via IntersectionObserver in Layout.astro) |
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

The plans data is defined as a `const plans` array in the frontmatter of both `index.astro` and `pricing.astro`. Keep them in sync when modifying.

---

## Conventions

### File Naming
- Use **kebab-case** for all file names (e.g., `business-overview.md`, not `BUSINESS_OVERVIEW.md`)

### CSS
- All design tokens live in `global.css` under `@theme` — Tailwind v4 auto-generates utility classes from these
- Prefer utility classes over custom CSS. Add to `global.css` only for reusable patterns
- New colors/fonts must be added to the `@theme` block to work as Tailwind utilities

### Components
- This is a static Astro site — no client-side framework (React, Vue, etc.)
- Interactive behavior uses vanilla `<script>` tags in Layout.astro or page files
- The scroll-reveal system uses IntersectionObserver — add `.reveal` class to trigger fade-up on scroll

### Content
- Copy should be concise, high-conviction, and avoid generic AI/startup jargon
- The tone is: "ex-McKinsey analyst writing for indie hackers" — rigorous but not corporate
- Key messaging pillars: **free first idea**, **30-minute delivery to inbox**, **downloadable from website**
- Time to deliver is **30 minutes** (not 5 minutes) — be consistent across all copy

### Pages
- `index.astro` contains the full homepage including a pricing section preview
- `pricing.astro` is the dedicated pricing page with comparison table and pricing-specific FAQ
- Both pages share the same `Layout.astro` wrapper and `global.css` design system
- Navigation links between pages use absolute paths (`/pricing`, `/#how-it-works`)

---

## Quick Reference

```bash
# Install dependencies
bun install

# Build
npx astro build

# Preview locally
npx serve dist -l 4321

# Dev server (hot reload)
npx astro dev
```
