# Fix Disappearing Section (Client Logos Strip Above Revenue Engine)

A targeted fix to ensure the social proof / client logos section directly above **The Revenue Engine** (`Services.tsx`) remains permanently visible, stable, and never disappears upon scrolling.

---

### User Review & Root Cause Analysis

> [!IMPORTANT]
> **Root Cause Identified:**
> The section directly above "The Revenue Engine" is `Logos.tsx` (the client logos strip). It currently uses `motion.div` with `initial={{ opacity: 0, y: 10 }}` and dynamic `whileInView` viewport triggering. When scrolling near the top of the page, Framer Motion's viewport observer mistakenly triggers an exit state, dropping the entire section's opacity to `0` and preventing it from showing up again.

---

### 1. Proposed Solution

- **Permanent Visibility**: Remove the fragile `initial={{ opacity: 0 }}` and `whileInView` animation triggers on `Logos.tsx`.
- **Static DOM Stability**: Render the client logo cards with permanent `opacity: 100%`, immediate CSS hardware-accelerated transitions, and smooth hover micro-interactions (`hover:border-brand-primary/30 hover:bg-white/[0.04]`).
- **Section Integrity**: Ensure `Logos.tsx` is completely immune to viewport exit glitches or scroll jitter, remaining rock-solid across both mobile and desktop viewports.

---

### 2. Architecture & File Changes

```
src/
├── components/
│   └── Logos.tsx          <-- Replace motion.div opacity: 0 with stable CSS-rendered cards
└── pages/
    └── Home.tsx           <-- Confirm seamless flow between Hero -> Logos -> Services
```

---

### 3. Implementation Steps

1. **Update `src/components/Logos.tsx`**:
   - Eliminate `motion.div` and `whileInView` opacity animations that cause sudden disappearance on scroll.
   - Replace with native, performant `div` containers with permanent visibility and clean hover states.
2. **Compilation & Verification**:
   - Run `compile_applet` and `lint_applet` to verify zero errors.
   - Restart the dev server to ensure instant rendering.
