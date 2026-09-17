import type { MetadataRoute } from "next";

const BASE_URL = "https://shadcn-pdf.vercel.app";

const components = [
  "badge",
  "card",
  "divider",
  "document",
  "layout",
  "pdf-viewer",
  "section",
  "table",
  "theme",
  "typography",
];

const blocks = [
  { category: "finance", name: "invoice" },
  { category: "finance", name: "salary-slip" },
  { category: "education", name: "student-report" },
  { category: "education", name: "academic-report" },
  { category: "reports", name: "audit-log-report" },
];

const blockCategories = ["finance", "education", "reports", "healthcare", "documents"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/get-started`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/components`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blocks`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const componentPages: MetadataRoute.Sitemap = components.map((slug) => ({
    url: `${BASE_URL}/components/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = blockCategories.map((category) => ({
    url: `${BASE_URL}/blocks/${category}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blockPages: MetadataRoute.Sitemap = blocks.map(({ category, name }) => ({
    url: `${BASE_URL}/blocks/${category}/${name}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...componentPages, ...categoryPages, ...blockPages];
}
