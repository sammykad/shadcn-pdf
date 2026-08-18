/**
 * Client-safe map of component name -> rendered PDF preview path.
 * The PDFs are produced server-side by scripts/generate-previews.ts into public/preview/.
 */
export const componentPreviewPaths: Record<string, string> = {
  theme: "/preview/theme.pdf",
  fonts: "/preview/fonts.pdf",
  layout: "/preview/layout.pdf",
  document: "/preview/document.pdf",
  section: "/preview/section.pdf",
  card: "/preview/card.pdf",
  typography: "/preview/typography.pdf",
  table: "/preview/table.pdf",
  badge: "/preview/badge.pdf",
  divider: "/preview/divider.pdf",
};