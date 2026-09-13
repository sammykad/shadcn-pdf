import { PDFBadge } from "@/components/pdf/badge";
import { PDFContainer } from "@/components/pdf";

export default function BadgeDemo() {
  return (
    <PDFContainer className="flex-row gap-2 flex-wrap">
      <PDFBadge variant="default">Default</PDFBadge>
      <PDFBadge variant="secondary">Secondary</PDFBadge>
      <PDFBadge variant="success">Success</PDFBadge>
      <PDFBadge variant="destructive">Destructive</PDFBadge>
      <PDFBadge variant="outline">Outline</PDFBadge>
      <PDFBadge variant="ghost">Ghost</PDFBadge>
      <PDFBadge variant="link">Link</PDFBadge>
    </PDFContainer>
  );
}
