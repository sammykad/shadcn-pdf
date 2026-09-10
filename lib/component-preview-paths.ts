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

/**
 * Client-safe map of component name -> rendered PNG thumbnail path.
 * Used as the fast default preview image (avoids the browser PDF plugin).
 */
export const componentPreviewImagePaths: Record<string, string> = {
  theme: "/preview/theme.png",
  fonts: "/preview/fonts.png",
  layout: "/preview/layout.png",
  document: "/preview/document.png",
  section: "/preview/section.png",
  card: "/preview/card.png",
  typography: "/preview/typography.png",
  table: "/preview/table.png",
  badge: "/preview/badge.png",
  divider: "/preview/divider.png",
};