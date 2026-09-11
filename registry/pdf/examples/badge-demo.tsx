import { PDFStack } from "@/components/pdf/layout";
import { PDFBadge } from "@/components/pdf/badge";

export default function PDFBadgeDemo() {
  return (
    <PDFStack gap={2}>
      <PDFBadge variant="default">Default</PDFBadge>
      <PDFBadge variant="secondary">Secondary</PDFBadge>
      <PDFBadge variant="success">Success</PDFBadge>
      <PDFBadge variant="destructive">Destructive</PDFBadge>
      <PDFBadge variant="outline">Outline</PDFBadge>
      <PDFBadge variant="ghost">Ghost</PDFBadge>
      <PDFBadge variant="link">Link</PDFBadge>
    </PDFStack>
  );
}