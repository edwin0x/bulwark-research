# About Page — Design Document

## Goal

Create an About page (`/about`) that positions Bulwark as an AI-native consulting firm democratizing market research for everyone — founders, indie hackers, vibe coders. Rebellious manifesto tone. No team info, no "agent swarm" language, no "budget alternative" framing.

## Key Positioning

- Bulwark is an **AI-native consulting firm**, not a chatbot wrapper
- It **democratizes** institutional-grade research — not "cheaper consulting"
- The tone is **anti-establishment**: consulting was gatekept, we opened the door
- Target audience: solo founders, indie hackers, vibe coders

---

## Page Structure

### Route: `/about`

### 1. Hero Section

- **Overline:** "About Bulwark" (using `overline-divider`)
- **Headline:** "Market research was gatekept." + "We opened the door." (second line: `italic font-accent text-gradient-warm`)
- **Subtext:** "Bulwark is an AI-native consulting firm that delivers institutional-grade research to anyone with an idea — no retainer, no RFP, no six-figure invoice."
- Standard centered layout, `section-title`, `text-muted` subtext, `reveal` animations

### 2. "What We Believe" — 4 Belief Cards

2x2 grid of `card-glass` cards. Each: bold statement headline + supporting paragraph.

| # | Headline | Copy |
|---|---|---|
| 1 | "Judgment is the last moat." | AI made execution free. Anyone can ship a product in a weekend. The founders who win aren't the fastest builders — they're the ones who know *what* to build. We exist to arm that judgment with data. |
| 2 | "Research shouldn't require a retainer." | For decades, serious market intelligence was locked behind consulting firms that charge $150K and take 8 weeks. That's not rigor — that's a toll booth. We removed the booth. |
| 3 | "Everyone deserves due diligence." | Solo founders. Indie hackers. Vibe coders. The person building at 2 AM in their apartment deserves the same quality research as a Series B company with a strategy team. We built Bulwark so they can have it. |
| 4 | "AI-native means rethinking the model." | We're not a consulting firm that uses AI. We're an AI-native firm that rethought consulting from scratch — what it covers, how fast it ships, and who gets access to it. |

Styling: headline in `text-paper font-semibold text-lg`, paragraph in `text-muted`, staggered `reveal delay-N`.

### 3. "Built For Builders" — Audience Section

- **Overline:** "Built For Builders"
- Three cards in horizontal row (stacks on mobile)
- Each: audience name + one-liner description
- Left border accent in vermillion (`border-l-2 border-vermillion`)

| Audience | Description |
|---|---|
| Solo Founders | Validating your first idea and need real data, not ChatGPT opinions |
| Indie Hackers | Shipping fast but want conviction that the market is real before you go all in |
| Vibe Coders | You can build anything in a weekend — Bulwark tells you if it's worth building |

### 4. "What We're Not" — Contrast Section

- **Overline:** "Clear On What We Are"
- Two-column layout, stacks on mobile

**Left — "We're not..."** (`text-dim`)
- A chatbot wrapper with a pretty UI
- A cheap alternative to real consulting
- A subscription that drains your runway
- A generic AI tool that hallucinates market data

**Right — "We are..."** (`text-paper`)
- An AI-native consulting firm, built from scratch
- Institutional-grade research, democratized
- One-time pricing because founders need cash flow
- Real internet-scale research with sourced findings

### 5. Bottom CTA

Reuse `<Cta>` component:
- **Overline:** "Join the Movement"
- **Title:** "The best ideas deserve real research." / *"Yours included."*
- **Subtitle:** "Your first validation is free. No credit card, no pitch deck, no gatekeepers."
- **Primary:** "Validate Your Idea — Free" → `/#hero-input`
- **Secondary:** "See Sample Report" → `/sample-report`

### 6. Footer

Reuse `<Footer>` component.

---

## Navigation Updates

- Add "About" to navbar desktop links (between FAQ and CTA area, or before "How it works")
- Extend `activePage` type to include `'about'`
- Update footer "About" `href="#"` → `<Link to="/about">`

---

## Design Tokens & Patterns Reused

| Pattern | Source |
|---|---|
| `card-glass` | `global.css` |
| `overline-divider` | `global.css` |
| `section-title` | `global.css` |
| `italic font-accent text-gradient-warm` | All section headers |
| `reveal` + `delay-N` | `useScrollReveal` hook |
| `btn-glow` / `btn-outline` | CTA buttons |
| `<Cta>` component | `components/cta.tsx` |
| `<Navbar>` with `activePage` | `components/navbar.tsx` |
| `<Footer>` | `components/footer.tsx` |
| Section spacing `py-24 px-6` | All existing sections |

---

## Files to Create

1. `apps/web/src/routes/about.tsx` — page route

## Files to Modify

1. `apps/web/src/components/navbar.tsx` — add About link, extend `activePage` type
2. `apps/web/src/components/footer.tsx` — change About `href="#"` → `<Link to="/about">`
