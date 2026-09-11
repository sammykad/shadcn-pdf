# shadcn-pdf

Core utilities for [shadcn-pdf](https://github.com/sammykad/shadcn-pdf) — theme tokens, Tailwind-to-react-pdf style resolver, color palette, font registration, and a React context provider.

## Install

```bash
npm install shadcn-pdf
```

Peer dependencies: `react` and `@react-pdf/renderer`.

## Usage

```tsx
import { tw, theme, PDFProvider, registerPDFFonts, paletteColors } from "shadcn-pdf";

// Register fonts (call once)
registerPDFFonts();

// Use tw() for Tailwind-style classNames in react-pdf
<View style={tw("flex flex-col gap-2 p-4 bg-primary rounded-lg")}>
  <Text style={tw("text-sm font-bold")}>Hello</Text>
</View>

// Wrap your document with the theme provider
<PDFProvider value={{ colors: { primary: "#6366f1" } }}>
  <MyDocument />
</PDFProvider>
```

## Exports

| Export | Description |
|--------|-------------|
| `tw()` | Tailwind-style className → react-pdf Style resolver |
| `theme` | Design tokens: colors, typography, spacing, radius, fonts, page |
| `colors` | Theme color tokens |
| `typography` | Type scale (h1–h4, body, small, mono) |
| `spacing` | Spacing scale |
| `radius` | Border radius tokens |
| `palette` | Full Tailwind v4 color palette |
| `paletteColors` | Flattened `family-step` → hex map |
| `registerPDFFonts()` | Register Geist Sans with react-pdf |
| `useFontFamily()` | Get registered font family or fallback |
| `PDFProvider` | React context provider for theme overrides |
| `usePDFTheme()` | Access the current theme from context |

## License

ISC
