import { PDFBadge } from "@/components/pdf/badge";
import { View } from "@react-pdf/renderer";

export default function BadgeDemo() {
  return (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
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
