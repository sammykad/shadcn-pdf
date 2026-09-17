# Agents Guide

## Project Overview

shadcn-pdf is a PDF component library for React + Next.js using `@react-pdf/renderer`. It follows the shadcn/ui registry pattern.

## Directory Structure

```
├── registry/                    # CORE: distributable source files
│   ├── __index__.ts             # Auto-generated from registry.json
│   └── pdf/
│       ├── core/                # Utilities (theme, tw, palette)
│       ├── components/          # UI components (table, card, badge, etc.)
│       ├── blocks/              # Complete document templates
│       └── examples/            # Demo files for docs
├── features/doc/content/        # MDX documentation files
│   ├── components/*.mdx         # Component docs
│   └── blog/*.mdx               # Blog posts
├── components/                  # Shared React components
│   ├── pdf-viewer.tsx           # Client-side PDF viewer
│   └── ui/                      # shadcn/ui primitives
├── lib/                         # Utilities and data access
│   ├── component-previews.tsx   # Demo preview registry
│   └── rehype-component.ts      # MDX plugin for code blocks
├── registry.json                # SOURCE OF TRUTH for shadcn CLI
├── packages/shadcn-pdf/         # npm package (separate)
└── scripts/                     # Build/generation scripts
```

## Key Rules

### 1. registry.json is the Source of Truth

All installable items are defined in `registry.json`. When adding/modifying components:

| Action | Files to Update |
|--------|-----------------|
| Add new component | `registry.json` → `registry/__index__.ts` → MDX doc → `component-previews.tsx` |
| Add new block | `registry.json` → `registry/__index__.ts` → `block-components.ts` → `generate-previews.tsx` |
| Remove component | `registry.json` → `registry/__index__.ts` → MDX doc → `component-previews.tsx` |
| Modify component | Source file only (auto-synced via `<ComponentSource>`) |

### 2. Component Documentation Checklist

When adding a new component, create/update these files:

```
1. registry/pdf/components/{name}.tsx          # Source component
2. registry/pdf/examples/{name}-demo.tsx       # Demo for docs
3. registry.json                               # Add entry (type: "registry:component")
4. scripts/generate-index.ts                   # Run to regenerate registry/__index__.ts
5. features/doc/content/components/{name}.mdx  # Documentation page
6. lib/component-previews.tsx                  # Add preview entry
7. lib/component-preview-paths.ts              # Add preview path
8. public/preview/{name}.pdf                   # Generate preview (npm run preview:gen)
```

### 3. Block Documentation Checklist

When adding a new block template, you **MUST** complete ALL of these steps:

```
1. registry/pdf/blocks/{name}.tsx              # Block component
2. registry.json                               # Add entry (type: "registry:block")
3. scripts/generate-index.ts                   # Add icon mapping + Run to regenerate registry/__index__.ts
4. scripts/{name}-data.ts                      # Sample data file
5. scripts/render-{name}.tsx                   # Dev render script
6. lib/block-components.ts                     # Add lazy import + sample data
7. scripts/generate-previews.tsx               # Add import + to BLOCKS record
8. public/preview/{name}.pdf                   # Generate preview (npm run preview:gen)
```

**CRITICAL: Do NOT skip any step. Each file is required for the block to work.**

| File | Purpose | How to update |
|------|---------|---------------|
| `registry/pdf/blocks/{name}.tsx` | Block component | Create new file |
| `registry.json` | Registry entry | Add object with `type: "registry:block"` |
| `scripts/generate-index.ts` | Icon mapping + auto-generate index | Add to `iconMap` + `imports` array, then run `npx tsx scripts/generate-index.ts` |
| `scripts/{name}-data.ts` | Sample data | Create new file exporting typed data |
| `scripts/render-{name}.tsx` | Dev render script | Create new file (copy pattern from `render-salary.tsx`) |
| `lib/block-components.ts` | Lazy import + data | Add entry to `blockComponents` record |
| `scripts/generate-previews.tsx` | Preview generation | Add import + entry to `BLOCKS` record |
| `public/preview/{name}.pdf` | Preview file | Run `npm run preview:gen` |

### 4. MDX Documentation Tags

Use these tags in MDX files (processed by `rehype-component.ts`):

```mdx
<!-- Shows code from registry source (auto-formatted) -->
<ComponentSource name="badge" title="components/pdf/badge.tsx" />

<!-- Shows preview + code tabs (reads from registry/pdf/examples/) -->
<ComponentPreview name="badge">
  ```tsx
  // Fallback code (replaced at build time)
  ```
</ComponentPreview>

<!-- Shows code from example file (auto-formatted) -->
<CodeExample name="badge-demo" />

<!-- Auto-generated type table from source -->
<AutoTypeTable path="registry/pdf/core/theme.ts" name="PDFTheme" />
```

### 5. File Locations by Type

| File Type | Location |
|-----------|----------|
| Core utilities | `registry/pdf/core/` |
| UI components | `registry/pdf/components/` |
| Block templates | `registry/pdf/blocks/` |
| Demo examples | `registry/pdf/examples/` |
| Component docs | `features/doc/content/components/` |
| Blog posts | `features/doc/content/blog/` |
| Shared UI components | `components/ui/` |
| Client-side components | `components/` (root) |
| Build scripts | `scripts/` |

### 6. Registry Item Types

| Type | Description | Example |
|------|-------------|---------|
| `registry:item` | Standalone utility | `theme`, `palette`, `tw` |
| `registry:component` | Reusable UI component | `table`, `card`, `badge` |
| `registry:block` | Complete document template | `invoice`, `student-report` |
| `registry:example` | Demo file for docs | `badge-demo`, `table-demo` |

### 7. Common Commands

```bash
# Regenerate registry/__index__.ts from registry.json
npx tsx scripts/generate-index.ts

# Generate PDF/PNG previews
npm run preview:gen

# Validate registry.json (checks phantom deps, file paths, target paths)
npx tsx scripts/validate-registry.ts

# Start dev server
npm run dev
```

### 8. Import Path Conventions

- **Registry source files**: `@/registry/pdf/components/{name}`
- **When installed by users**: `~/components/pdf/{name}` (target in registry.json)
- **Shared UI components**: `@/components/ui/{name}`

### 9. Registry Dependencies

When one component depends on another, use the namespace format:

```json
"registryDependencies": ["sammykad/shadcn-pdf/tw", "sammykad/shadcn-pdf/theme"]
```

### 10. What NOT to Do

- Don't edit `registry/__index__.ts` directly - regenerate from `registry.json`
- Don't hardcode preview paths - use `lib/component-preview-paths.ts`
- Don't create MDX files without corresponding registry entries
- Don't forget to run `npm run preview:gen` after adding new components
now it's streamlined. Here's the simple workflow:
Add New Component
1. registry/pdf/components/{name}.tsx        # Create component
2. registry/pdf/examples/{name}-demo.tsx     # Create demo
3. registry.json                             # Add entry
4. Run: npx tsx scripts/generate-index.ts    # Auto-generate __index__.ts
5. features/doc/content/components/{name}.mdx # Create docs
6. lib/component-previews.tsx                # Add preview
7. lib/component-preview-paths.ts            # Add paths
8. Run: npm run preview:gen                  # Generate previews
Remove Component
1. Delete registry/pdf/components/{name}.tsx
2. Delete registry/pdf/examples/{name}-demo.tsx
3. Remove from registry.json
4. Run: npx tsx scripts/generate-index.ts
5. Delete features/doc/content/components/{name}.mdx
6. Remove from lib/component-previews.tsx
7. Remove from lib/component-preview-paths.ts
Update Component
1. Edit registry/pdf/components/{name}.tsx   # Only this file
   → MDX auto-syncs via <ComponentSource>
   → Preview auto-syncs via <ComponentPreview>
   → Usage auto-syncs via <CodeExample>
Add New Block
1. registry/pdf/blocks/{name}.tsx           # Create block component
2. registry.json                            # Add entry (type: "registry:block")
3. scripts/generate-index.ts                # Add icon mapping + Run to regenerate __index__.ts
4. scripts/{name}-data.ts                   # Create sample data file
5. scripts/render-{name}.tsx                # Create dev render script
6. lib/block-components.ts                  # Add lazy import + sample data
7. scripts/generate-previews.tsx            # Add import + BLOCKS entry
8. Run: npm run preview:gen                 # Generate preview PDF/PNG
Single Command Validation
npx tsx scripts/validate-registry.ts
This checks:
Phantom dependencies
Missing files
Invalid target paths
Duplicate names
No more guessing — the guide and validation script ensure you always know where to make changes.