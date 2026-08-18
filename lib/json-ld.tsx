import Script from "next/script";
import { absoluteUrl } from "@/lib/utils";

export const JSON_LD_ID = {
  website: "https://shadcn-pdf.dev/#website",
  person: "https://shadcn-pdf.dev/#person",
};

export function JsonLdScript({ data }: { data: object }) {
  return (
    <Script
      id={`jsonld-${JSON.stringify(data).length}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function jsonLdBreadcrumbList(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}