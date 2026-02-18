# Agent Prompt: "The Blueprint" — Boutique Tech Consulting Website

> Copy everything below the line and pass it to your implementation agent.

---

## Prompt

Build a boutique technology consulting firm website called **[FIRM NAME]**. The site targets founders, solo developers, indie hackers, and startups who need digital consulting to scale or build. The creative direction is called **"The Blueprint"** — the website doesn't reference technical documents, it IS one. Every page feels like a living engineering specification.

### Hard Constraints

- **Light theme only**
- **Zero gradients anywhere** — all backgrounds are flat solid colors
- **Zero border-radius** — all elements are perfectly square (0px radius)
- **Zero box-shadows** — no shadows, no blur, no glass-morphism
- **Zero photography** — only SVG diagrams, line illustrations, and geometric elements
- **Production-grade code** — clean, semantic HTML, modular CSS, real interactivity

### Color Palette (Achromatic + Signal Red)

```css
:root {
  --white: #fdfdfd;       /* Page background */
  --surface: #f4f4f5;     /* Recessed panels, code blocks */
  --grid: #e8e8ec;        /* Dot-grid pattern, construction lines */
  --border: #c8c8cf;      /* Card borders, dividers */
  --ink: #131316;          /* Headlines, primary text */
  --secondary: #5a5a65;   /* Body text, descriptions */
  --dim: #9c9ca6;          /* Labels, annotations, coordinates */
  --ghost: #d5d5db;        /* Faint marks, large section numbers */
  --signal: #e03e3e;       /* Accent — CTAs, active states, annotation lines */
  --signal-bg: #fef2f2;   /* Flat tint behind signal elements */
}
```

**Signal red is used sparingly:** only on the primary CTA, active navigation indicator, dimension annotation lines on hover, and one accent element per section maximum. Everything else is grayscale. The restraint makes the red feel urgent and intentional.

### Typography

| Role | Font | Style |
|---|---|---|
| Headlines | **Instrument Sans** (condensed/wide) | ALL CAPS, letter-spacing: +0.04em, weight 600-700 |
| Body | **Satoshi** | Regular 400, line-height 1.7 |
| Mono / Labels | **IBM Plex Mono** | Weight 400-500, used for section numbers, tags, metadata |
| Annotations | **IBM Plex Mono** at 10px | letter-spacing: +0.08em, used for dimension labels and coordinates |

Headlines are always ALL CAPS with wide tracking. Monospace labels appear in `--dim` color at 10-11px — they are metadata, not content.

### Visual System

#### The Grid (Always Visible)
- A persistent **dot-grid** at 20px intervals covers the entire page background at ~6% opacity using `--grid` color
- At viewport edges, faint **coordinate markers** appear every 200px: `x:200`, `x:400` in `--dim` mono text
- **Registration marks** (crosshair + circle) sit in the four corners of the viewport, like a print proof sheet

#### Cards & Containers
- 1px solid `--border`, 0px border-radius (truly square)
- On hover: border transitions instantly to `--signal`, and a tiny dimension annotation appears showing the element's size
- Cards can have `--surface` background or be transparent
- No shadows. No blur. Ever.

#### Section Numbering
- Each major section has a large number in the left margin: `01`, `02`, `03`
- Set in `--ghost` color at ~120px, IBM Plex Mono
- The section title sits beside it, vertically centered
- A thin 1px horizontal rule extends from the title to the right edge of the viewport

#### Dimension Annotations (Signature Detail)
- On hover over key elements (cards, buttons, images), thin lines with measurement labels appear
- Example: hover over the CTA button → `↕ 48` above it and `↔ 200` beside it
- These use `--signal` colored lines with `--dim` text labels
- Implement via CSS `::before`/`::after` pseudo-elements that scale in on hover
- This is the single most memorable detail of the site — execute it well

#### Corner Crop Marks
- Key content blocks have small **crop marks** at their corners — 8px L-shaped lines in `--grid` color
- Reinforces the "print specification" feel

### Motion & Animation

#### Page Load Sequence (Orchestrated)
1. Dot-grid fades in (200ms)
2. Registration marks and coordinate markers appear (300ms)
3. Content sections stagger in from the left with slight horizontal translate (400-800ms, 100ms stagger between sections)
4. Section numbers count up from `00` to their final value (typewriter tick effect)

#### Hover Interactions
- **Cards:** border → `--signal` (instant), dimension annotations scale in from center
- **Links:** underline draws in from left to right (not instant)
- **Navigation:** active item gets a `--signal` dot indicator (not a background highlight)
- **CTA buttons:** background flips from transparent to `--signal` with `--white` text — instant hard cut, no fade

#### Scroll Behavior
- Coordinate markers in margins update to reflect scroll position (like a ruler)
- Section numbers have parallax-lite: they move at 0.9x scroll speed, creating subtle lag

### Page Structure (5 Pages)

#### 1. Homepage

**Hero (above the fold):**
- Left-aligned, occupying ~60% width
- Headline in Instrument Sans caps: e.g., `WE ARCHITECT WHAT YOU SHIP`
- One sentence in Satoshi below the headline
- Monospace descriptor beneath: `// Digital consulting for people who build`
- One CTA button with `--signal` styling
- Right 40%: a minimal SVG system diagram — boxes connected by thin lines, labeled with monospace text, with subtle node-pulse animation

**Capabilities Section:**
- 2×2 card grid with crop marks at the outer corners of the entire grid
- Each card: mono number prefix (`01`, `02`, `03`, `04`), title in caps, 2-line description in body text, one mono tag at bottom (`STRATEGY`, `ARCHITECTURE`, `ENGINEERING`, `GROWTH`)

**Process Section:**
- Horizontal numbered flow: `01 DISCOVER → 02 ARCHITECT → 03 BUILD → 04 MEASURE`
- Steps connected by thin lines with small arrow terminals
- Each step has a 1-line description below in `--secondary`

**Signal Section:**
- Full-width panel with `--surface` background
- One large stat in mono at ~48px: e.g., `93% of clients ship within 8 weeks`
- A pull-quote below in Satoshi italic

**Footer CTA:**
- Full-width `--ink` background with `--white` text (hard contrast flip)
- One headline, one `--signal` button with white text

#### 2. Services Page

- Left sidebar: vertical list of service categories, numbered in mono, acting as navigation
- Right content area: shows the selected service detail
- Each service block: title in caps, description in body, deliverables list (bulleted with crop marks instead of bullet dots), timeline in mono text

#### 3. About Page

- Philosophy section with large pull-quotes that have dimension annotations decorating them
- Principles: `PRINCIPLE 01` through `PRINCIPLE 05` with horizontal rules between each
- Team section: names with roles in mono only, one sentence each. No photos — optionally use minimal geometric avatars (single letter in a square)

#### 4. Case Studies Page

- Card grid layout
- Each card shows: mono category tag at top, anonymized client descriptor (`Series A Fintech`, `Pre-Seed Developer Tool`), one outcome metric in large mono type (`4.2x faster deployment`, `$2.1M saved in year one`), crop marks at all four corners

#### 5. Contact Page

- Centered and minimal
- Mono label above form: `// Start a conversation`
- Three fields maximum: name, email, brief description
- All inputs: 1px `--border`, 0px radius, `--surface` background
- Submit button: `--signal` background, white text, full-width or auto-width
- Below the form: a single line in `--dim` mono with response time: `Typical response: < 24 hours`

### What Makes This Unforgettable

1. **Dimension annotations on hover** — genuinely novel, perfectly on-concept. No other consulting site does this.
2. **Persistent coordinate system** — margins that show x/y coordinates updating on scroll.
3. **Zero-radius, zero-shadow discipline** — in a world of `rounded-xl` and `shadow-lg`, hard edges are striking.
4. **Signal red used surgically** — one color cutting through grayscale creates instant hierarchy.
5. **The site IS the artifact** — it doesn't describe "precision" with copy; it demonstrates it with execution.

### Tech Preferences (If Applicable)

- Use semantic HTML5 with CSS custom properties
- Prefer CSS-only animations where possible
- For React projects: use Framer Motion / Motion for orchestrated sequences
- Mobile: the coordinate system and dimension annotations hide on touch devices; the core grid, typography, and section numbering carry the concept
- Ensure all text meets WCAG AA contrast ratios against its background
