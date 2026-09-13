import { PDFContainer } from "@/components/pdf";
import { PDFBadge } from "@/components/pdf/badge";

export default function BadgeDemo() {
  return (
    <PDFContainer className="flex-row gap-2 flex-wrap p-4">
      <PDFBadge variant="default" className="px-3 py-1 text-xs font-medium">Default</PDFBadge>
      <PDFBadge variant="secondary" className="px-3 py-1 text-xs font-medium">Secondary</PDFBadge>
      <PDFBadge variant="success" className="px-3 py-1 text-xs font-medium">Success</PDFBadge>
      <PDFBadge variant="destructive" className="px-3 py-1 text-xs font-medium">Destructive</PDFBadge>
      <PDFBadge variant="outline" className="px-3 py-1 text-xs font-medium">Outline</PDFBadge>
      <PDFBadge variant="ghost" className="px-3 py-1 text-xs font-medium">Ghost</PDFBadge>
      <PDFBadge variant="link" className="px-3 py-1 text-xs font-medium">Link</PDFBadge>
    </PDFContainer>
  );
}
