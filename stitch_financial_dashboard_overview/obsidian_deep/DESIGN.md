# Obsidian Deep Design System

### 1. Overview & Creative North Star
**Creative North Star: The Sovereign Ledger**

Obsidian Deep is a high-end financial editorial system designed to convey stability, precision, and exclusivity. It departs from the "standard dashboard" aesthetic by treating data as a curated exhibit. The system utilizes a deep, mineral-toned dark mode paired with high-chroma accents (teal, gold, and crimson) to create a sense of focused intelligence. By employing intentional asymmetry and tonal depth over rigid lines, the design moves away from the utility-first mindset into the realm of luxury performance.

### 2. Colors
The palette is rooted in the depth of `Obsidian` (#121E20), utilizing a sophisticated range of surface containers to differentiate functional zones without the need for intrusive borders.

- **The "No-Line" Rule:** Sectioning is achieved through color blocking. Use `surface_container` (#1C1E22) for cards against the `background` (#121E20). Explicit 1px borders are restricted only to the most critical navigational breaks (sidebar, header) and should use `outline` (#274045) at low opacity.
- **Surface Hierarchy:** 
    - **Base:** `background` for the canvas.
    - **Level 1:** `surface_container` for secondary modules (e.g., Stats cards).
    - **Level 2:** `surface_container_high` for active inputs or interactive hover states.
- **Glass & Gradient Rule:** Floating headers and navigation components must utilize a `backdrop-blur` (12px minimum) with a 50% opacity fill of the surface color to maintain a sense of layered physical space.
- **Signature Textures:** Use the primary teal (`#135D6C`) with a 20% opacity glow (shadow-primary/20) for high-impact buttons and progress markers.

### 3. Typography
The system employs a dual-font strategy: **Plus Jakarta Sans** for high-impact display moments and **Manrope** for analytical data.

- **Display (1.875rem / 30px):** Bold weight, tight tracking. Used for primary balances and hero figures.
- **Headlines (1.25rem - 1.5rem):** Bold weight. Used for section headers like "Spending Breakdown."
- **Body & Labels (0.75rem - 0.875rem):** Medium weight for readability.
- **Micro-Data (10px):** Uppercase, 0.05em letter spacing. Used for supplemental meta-information like "TOTAL SPENT" inside charts.

The typography scale is intentionally varied to create a rhythmic hierarchy, moving from the massive 30px balance figures to the precise 12px time-stamps.

### 4. Elevation & Depth
Elevation is achieved through the **Layering Principle**, moving away from "floating" objects toward "stacked" surfaces.

- **Layering Principle:** Interactive cards use a `shadow-sm` for a subtle lift. Only primary CTA modules (like the Savings Progress card) should use `shadow-xl` to break the z-plane significantly.
- **Ambient Shadows:** 
    - `shadow-lg`: Used for primary action buttons with a color-matched tint (`#135D6C/20`).
    - `shadow-sm`: Standard card elevation.
- **The "Ghost Border" Fallback:** In high-density areas where color shift isn't enough, use a 1px stroke of `outline` (#274045).
- **Glassmorphism:** Navigation headers are fixed with `backdrop-blur-md` and `bg-background-dark/50` to create a permanent reference point that doesn't feel heavy.

### 5. Components
- **Buttons:** Primary buttons use a high-contrast teal background with white text, featuring `rounded-xl` (12px) corners and a 20% glow shadow.
- **Cards:** Cards are defined by `bg-surface-dark` and a subtle `border-border-dark`. They should never be sharp; `rounded-xl` is the standard.
- **Inputs:** Search bars use a `surface_container_high` fill without a border, relying on the contrast against the header for visibility. Focus states trigger a 2px `primary` ring.
- **Status Chips:** Use 10% opacity backgrounds of the status color (success/danger) with full-opacity text for a sophisticated, non-distracting notification style.

### 6. Do's and Don'ts
- **Do:** Use `primary/20` (teal tint) for active navigation states instead of solid fills.
- **Do:** Maintain generous spacing (`p-8`) between major layout sections to allow the dark theme to "breathe."
- **Don't:** Use pure white (#FFFFFF) for body text; use `on_surface_variant` (#97BDC4) to reduce eye strain in dark mode.
- **Don't:** Apply shadows to every card. Reserve elevation for the primary "Active" information of the page.
- **Don't:** Use sharp 0px corners. Financial data feels more approachable and modern with the `rounded-xl` (12px) standard.