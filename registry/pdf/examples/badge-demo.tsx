import { View } from "@react-pdf/renderer";
import { PDFBadge } from "@/components/pdf/badge";

export default function PDFBadgeDemo() {
  return (
    <View style={{ flexDirection: "column", gap: 8 }}>
      <PDFBadge variant="default">Default</PDFBadge>
      <PDFBadge variant="secondary">Secondary</PDFBadge>
      <PDFBadge variant="success">Success</PDFBadge>
      <PDFBadge variant="destructive">Destructive</PDFBadge>
      <PDFBadge variant="outline">Outline</PDFBadge>
      <PDFBadge variant="ghost">Ghost</PDFBadge>
      <PDFBadge variant="link">Link</PDFBadge>
    </View>
  );
}
