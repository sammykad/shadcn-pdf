# Theme System Overhaul Plan

## Goal
Make the theme picker actually change PDF colors at runtime, so developers and end users can customize themes.

## Current State

The theme picker is **cosmetic only** — it changes the surrounding web page via CSS variables but the PDF always renders with hardcoded colors from `theme.ts`.

### Why It Doesn't Work

Every component imports `colors` from `theme.ts` at module scope:

```tsx
// This is static — evaluated once at import time
import { colors } from "@/components/pdf/theme";
```

Changing the theme at runtime has zero effect because the import binding is already resolved.

---

## Architecture Problems

### 1. Static Color Imports (Biggest Problem)

All 7 primitive components import `colors` directly:

| Component | File | Uses |
|-----------|------|------|
| PDFTable/Header/Footer/Row/Head/Cell/Caption | `table.tsx` | `colors.border`, `colors.foreground`, `colors.mutedForeground`, `colors.mutedBackground` |
| PDFSection, PDFField | `section.tsx` | `colors`, `spacing`, `radius`, `typography` |
| PDFCard, CardHeader, CardTitle, etc. | `card.tsx` | `colors.foreground`, `colors.mutedForeground`, `colors.border`, `colors.accent` |
| PDFBadge (all variants) | `badge.tsx` | `colors.primary`, `colors.accent`, `colors.destructive`, `colors.foreground`, `colors.background`, `colors.border`, `colors.success`, `colors.mutedForeground` |
| PDFDivider | `divider.tsx` | `colors.border` |
| PDFDocument, PDFPage, PDFHeader, PDFFooter | `document.tsx` | `colors`, `spacing`, `page` |
| PDFContainer, PDFText | `primitives.tsx` | `colors` (via `cva` variants) |

### 2. `tw()` Color Maps Are Frozen

```tsx
// tw.ts line 14 — evaluated once at module load
const { colors: C, spacing: S, radius: R, typography: T } = theme;

// COLOR_MAP is built once from static colors
const COLOR_MAP: Record<string, string> = { ... };
```

`className="text-foreground"` resolves to `#0a0a0a` forever. Changing the theme doesn't update `tw()` output.

### 3. `PDFProvider` Isn't Real React Context

```tsx
// provider.tsx — module-scoped mutable singleton
let currentTheme: PDFTheme = theme;

export function PDFProvider({ value, children }) {
  currentTheme = deepMerge(theme, value ?? {}); // mutates module var
  return <>{children}</>;
}

export function usePDFTheme() {
  return currentTheme; // returns module var, not context
}
```

- Not concurrent-safe (two PDFs would overwrite each other)
- Only works because React-PDF renders synchronously

### 4. Block `StyleSheet.create()` Freezes Styles

```tsx
// Every block does this at module scope
const styles = StyleSheet.create({
  header: { backgroundColor: theme.colors.background, ... },
  // theme.colors is the static import — frozen at call time
});
```

Even if `usePDFTheme()` returned different values, the StyleSheet is already frozen.

### 5. Hardcoded Hex Strings in Blocks

- `invoice.tsx`: `"#737373"`, `"#a1a1aa"`, `"#dc2626"` (lines 46, 58-67, 103-111)
- `salary-slip.tsx`: `"#737373"`, `"#a1a1aa"`, `"#dc2626"` (lines 61-85, 134-156)

These bypass the theme entirely.

### 6. Font Registration Is One-Time

```tsx
Font.register({ family, fonts }); // can't unregister
```

Swapping fonts per theme requires registering all variants upfront.

---

## Proposed Solution

### Phase 1: Real React Context (Foundation)

**Files:** `provider.tsx`

Replace the module-scoped singleton with proper React context:

```tsx
import { createContext, useContext } from "react";

const PDFThemeContext = createContext<PDFTheme>(theme);

export function PDFProvider({ value, children }) {
  const merged = useMemo(() => deepMerge(theme, value ?? {}), [value]);
  return (
    <PDFThemeContext.Provider value={merged}>
      {children}
    </PDFThemeContext.Provider>
  );
}

export function usePDFTheme() {
  return useContext(PDFThemeContext);
}
```

### Phase 2: Convert Primitive Components to Use Context

**Files:** `table.tsx`, `card.tsx`, `badge.tsx`, `divider.tsx`, `document.tsx`, `section.tsx`, `primitives.tsx`

Each component must:
1. Import `usePDFTheme` instead of `colors`
2. Call `usePDFTheme()` inside the component function
3. Derive colors from the returned theme object

Example — `PDFCard`:

```tsx
// BEFORE (static)
import { colors, spacing, radius } from "@/components/pdf/theme";

export function PDFCard({ children, className, style }) {
  return <View style={[{ borderColor: colors.border }, tw(className), style]}>...</View>;
}

// AFTER (dynamic)
import { usePDFTheme } from "@/components/pdf/provider";

export function PDFCard({ children, className, style }) {
  const t = usePDFTheme();
  return <View style={[{ borderColor: t.colors.border }, tw(className), style]}>...</View>;
}
```

**Impact:** ~15 components, each needs the same pattern.

### Phase 3: Make `tw()` Theme-Aware

**File:** `tw.ts`

Option A — Lazy resolution:
```tsx
// Don't build COLOR_MAP at module scope
// Instead, resolve colors at call time from current theme
function resolveColor(name: string): string {
  const t = usePDFTheme(); // or accept theme as param
  return t.colors[name] ?? PALETTE_COLORS[name] ?? name;
}
```

Option B — Rebuild maps on theme change:
```tsx
// Use a WeakMap or similar to cache per-theme
const mapCache = new WeakMap<PDFTheme, ColorMap>();

function getColorMap(theme: PDFTheme): ColorMap {
  if (!mapCache.has(theme)) {
    mapCache.set(theme, buildColorMap(theme));
  }
  return mapCache.get(theme)!;
}
```

**Note:** Option A is cleaner but requires `tw()` to be called inside a component (not at module scope). Option B works with the current API but adds complexity.

### Phase 4: Fix Block Styles

**Files:** `invoice.tsx`, `student-report.tsx`, `academic-report.tsx`, `progress-report.tsx`, `salary-slip.tsx`

1. Move `StyleSheet.create()` inside the component function (or use inline styles)
2. Replace hardcoded hex strings with theme references
3. Use `usePDFTheme()` for all color/spacing values

Example:
```tsx
// BEFORE
const styles = StyleSheet.create({
  row: { backgroundColor: theme.colors.muted, padding: theme.spacing[2] },
});

// AFTER
function MyBlock({ data }) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    row: { backgroundColor: t.colors.muted, padding: t.spacing[2] },
  });
  // ...
}
```

### Phase 5: Theme Picker → PDF Re-render

**Files:** `live-pdf-preview.tsx`, `app/api/preview/[name]/route.tsx`

1. Pass theme name as query param: `fetch(\`/api/preview/${name}?theme=${themeName}\`)`
2. API route resolves theme name → color map
3. Wrap component in `<PDFProvider value={resolvedTheme}>` before `renderToBuffer()`

```tsx
// route.tsx
export async function GET(req, { params }) {
  const { name } = await params;
  const themeName = req.nextUrl.searchParams.get("theme");
  const themeColors = resolveThemeColors(themeName); // oklch → hex

  const entry = blockComponents[name];
  const Component = (await entry.import()).default;

  const element = (
    <PDFProvider value={{ colors: themeColors }}>
      <Component data={entry.data} />
    </PDFProvider>
  );

  const buffer = await renderToBuffer(element);
  return new Response(buffer, { headers: { "Content-Type": "application/pdf" } });
}
```

### Phase 6: oklch → Hex Conversion

**New utility:** `lib/themes/convert-colors.ts`

shadcn/tweakcn themes use oklch colors:
```css
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
```

Components expect hex strings. Need a converter:
```tsx
import { oklch, formatHex } from "ocul ratio"; // or similar lib

function oklchToHex(oklchStr: string): string {
  const [l, c, h] = parseOklch(oklchStr);
  return formatHex(oklch(l, c, h));
}

function resolveThemeColors(themeName: string): Record<string, string> {
  const cssVars = getThemeCSSVars(themeName); // from shadcn/tweakcn
  return {
    background: oklchToHex(cssVars["--background"]),
    foreground: oklchToHex(cssVars["--foreground"]),
    // ... map all 11 colors
  };
}
```

### Phase 7: Font Flexibility

**File:** `fonts.ts`

Register multiple font families upfront, select per theme:
```tsx
Font.register({ family: "Geist Sans", fonts: [...] });
Font.register({ family: "Inter", fonts: [...] });
Font.register({ family: "Roboto", fonts: [...] });

// In PDFPage, select based on theme
const fontFamily = t.fonts?.sans ?? "Geist Sans";
```

---

## Effort Estimate

| Phase | Files Changed | Difficulty | Time |
|-------|--------------|------------|------|
| 1. Real React context | `provider.tsx` | Medium | 1-2 hours |
| 2. Convert primitives | 7 component files | **High** | 1-2 days |
| 3. Theme-aware `tw()` | `tw.ts` | High | 1 day |
| 4. Fix block styles | 6 block files | Medium | 1 day |
| 5. Theme picker → PDF | `live-pdf-preview.tsx`, `route.tsx` | Low | 2-3 hours |
| 6. oklch → hex converter | New utility | Medium | 1 day |
| 7. Font flexibility | `fonts.ts` | Medium | 2-3 hours |

**Total: ~5-7 days of focused work**

---

## What Ships First (Incremental Approach)

Don't try to do everything at once. Ship in phases:

1. **Phase 1+2** — Real context + convert primitives. This is the foundation. Without it, nothing else works.
2. **Phase 4** — Fix block styles. Now blocks can use dynamic themes.
3. **Phase 5+6** — Theme picker actually re-renders PDFs. oklch converter bridges CSS vars to component expectations.
4. **Phase 3** — Make `tw()` theme-aware. This is the polish step.
5. **Phase 7** — Font flexibility. Nice to have.

---

## Alternatives (Simpler Paths)

### Option A: Predefined Theme Presets (Much Easier)

Instead of full runtime theming, ship 3-5 color palettes:

```tsx
const themes = {
  default: { primary: "#18181b", background: "#ffffff", ... },
  ocean: { primary: "#0369a1", background: "#f0f9ff", ... },
  forest: { primary: "#166534", background: "#f0fdf4", ... },
  sunset: { primary: "#c2410c", background: "#fff7ed", ... },
};

// User picks a preset name, not a full theme
<PDFProvider value={themes.ocean}>
  <Invoice data={data} />
</PDFProvider>
```

**Effort:** 1-2 days. Just convert primitives to use context, ship preset palettes.

### Option B: CSS Variable Approach (Middle Ground)

Map theme colors to CSS variables that react-pdf can read:

```tsx
// In PDFPage
const t = usePDFTheme();
<View style={{ backgroundColor: t.colors.background }}>
```

This is essentially Phase 1+2 without the oklch converter or font flexibility.

**Effort:** 2-3 days.

---

## Decision Needed

Which approach do you want to pursue?

1. **Full runtime theming** (5-7 days) — complete overhaul, users can define any theme
2. **Predefined presets** (1-2 days) — ship 3-5 palettes, easy to extend
3. **Just fix the provider** (1 day) — make `PDFProvider` real context, primitives still static
